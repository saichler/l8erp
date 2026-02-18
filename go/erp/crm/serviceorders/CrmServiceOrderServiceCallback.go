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
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newCrmServiceOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[crm.CrmServiceOrder]("CrmServiceOrder",
		func(e *crm.CrmServiceOrder) { common.GenerateID(&e.OrderId) }).
		StatusTransition(crmServiceOrderTransitions()).
		Require(func(e *crm.CrmServiceOrder) string { return e.OrderId }, "OrderId").
		Require(func(e *crm.CrmServiceOrder) string { return e.AccountId }, "AccountId").
		Enum(func(e *crm.CrmServiceOrder) int32 { return int32(e.OrderType) }, crm.CrmServiceOrderType_name, "OrderType").
		Enum(func(e *crm.CrmServiceOrder) int32 { return int32(e.Priority) }, crm.CrmServiceOrderPriority_name, "Priority").
		Enum(func(e *crm.CrmServiceOrder) int32 { return int32(e.Status) }, crm.CrmServiceOrderStatus_name, "Status").
		OptionalMoney(func(e *crm.CrmServiceOrder) *erp.Money { return e.EstimatedCost }, "EstimatedCost").
		OptionalMoney(func(e *crm.CrmServiceOrder) *erp.Money { return e.ActualCost }, "ActualCost").
		Build()
}

func crmServiceOrderTransitions() *common.StatusTransitionConfig[crm.CrmServiceOrder] {
	return &common.StatusTransitionConfig[crm.CrmServiceOrder]{
		StatusGetter:  func(e *crm.CrmServiceOrder) int32 { return int32(e.Status) },
		StatusSetter:  func(e *crm.CrmServiceOrder, s int32) { e.Status = crm.CrmServiceOrderStatus(s) },
		FilterBuilder: func(e *crm.CrmServiceOrder) *crm.CrmServiceOrder {
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
