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
package serviceorders

import (
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/crm"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newCrmServiceOrderServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&crm.CrmServiceOrder{}, vnic).
		StatusTransition(crmServiceOrderTransitions()).
		Require(func(v interface{}) string { return v.(*crm.CrmServiceOrder).OrderId }, "OrderId").
		Require(func(v interface{}) string { return v.(*crm.CrmServiceOrder).AccountId }, "AccountId").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmServiceOrder).OrderType) }, crm.CrmServiceOrderType_name, "OrderType").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmServiceOrder).Priority) }, crm.CrmServiceOrderPriority_name, "Priority").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmServiceOrder).Status) }, crm.CrmServiceOrderStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*crm.CrmServiceOrder).EstimatedCost }, "EstimatedCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*crm.CrmServiceOrder).ActualCost }, "ActualCost").
		Build()
}

func crmServiceOrderTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*crm.CrmServiceOrder).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*crm.CrmServiceOrder).Status = crm.CrmServiceOrderStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*crm.CrmServiceOrder);
			return &crm.CrmServiceOrder{OrderId: e.OrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 5},    // NEW → SCHEDULED, CANCELLED
			2: {3, 5},    // SCHEDULED → IN_PROGRESS, CANCELLED
			3: {4, 5},    // IN_PROGRESS → COMPLETED, CANCELLED
		},
		StatusNames: crm.CrmServiceOrderStatus_name,
	}
}
