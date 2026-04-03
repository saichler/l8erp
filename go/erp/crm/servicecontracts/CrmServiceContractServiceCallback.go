/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package servicecontracts

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmServiceContractServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&crm.CrmServiceContract{}, vnic).
		StatusTransition(crmServiceContractTransitions()).
		After(cascadeCancelServiceOrders).
		Require(func(v interface{}) string { return v.(*crm.CrmServiceContract).ContractId }, "ContractId").
		Require(func(v interface{}) string { return v.(*crm.CrmServiceContract).AccountId }, "AccountId").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmServiceContract).ContractType) }, crm.CrmContractType_name, "ContractType").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmServiceContract).Status) }, crm.CrmContractStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*crm.CrmServiceContract).ContractValue }, "ContractValue").
		DateAfter(func(v interface{}) int64 { return v.(*crm.CrmServiceContract).EndDate }, func(v interface{}) int64 { return v.(*crm.CrmServiceContract).StartDate }, "EndDate", "StartDate").
		Build()
}

// cascadeCancelServiceOrders marks related service orders as CANCELLED
// when a service contract is expired or cancelled.
func cascadeCancelServiceOrders(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	contract := v.(*crm.CrmServiceContract)
	s := int32(contract.Status)
	if s != 3 && s != 4 { // Only trigger on EXPIRED(3) or CANCELLED(4)
		return nil
	}
	childrenRaw, err := common.GetEntities("CrmSvcOrd", 80, &crm.CrmServiceOrder{ContractId: contract.ContractId}, vnic)
	children := make([]*crm.CrmServiceOrder, 0, len(childrenRaw))
	for _, ri := range childrenRaw { children = append(children, ri.(*crm.CrmServiceOrder)) }
	if err != nil {
		return err
	}
	for _, child := range children {
		cs := int32(child.Status)
		if cs == 4 || cs == 5 { // COMPLETED or CANCELLED — skip terminal
			continue
		}
		child.Status = crm.CrmServiceOrderStatus_CRM_SERVICE_ORDER_STATUS_CANCELLED
		if err := common.PutEntity("CrmSvcOrd", 80, child, vnic); err != nil {
			return err
		}
	}
	return nil
}

func crmServiceContractTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*crm.CrmServiceContract).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*crm.CrmServiceContract).Status = crm.CrmContractStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*crm.CrmServiceContract);
			return &crm.CrmServiceContract{ContractId: e.ContractId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 4},    // DRAFT → ACTIVE, CANCELLED
			2: {3, 4},    // ACTIVE → EXPIRED, CANCELLED
		},
		StatusNames: crm.CrmContractStatus_name,
	}
}
