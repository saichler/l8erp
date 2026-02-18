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
package workorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgWorkOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[mfg.MfgWorkOrder]("MfgWorkOrder",
		func(e *mfg.MfgWorkOrder) { common.GenerateID(&e.WorkOrderId) }).
		StatusTransition(workOrderTransitions()).
		Require(func(e *mfg.MfgWorkOrder) string { return e.WorkOrderId }, "WorkOrderId").
		Require(func(e *mfg.MfgWorkOrder) string { return e.ItemId }, "ItemId").
		Enum(func(e *mfg.MfgWorkOrder) int32 { return int32(e.Status) }, mfg.MfgWorkOrderStatus_name, "Status").
		OptionalMoney(func(e *mfg.MfgWorkOrder) *erp.Money { return e.EstimatedCost }, "EstimatedCost").
		OptionalMoney(func(e *mfg.MfgWorkOrder) *erp.Money { return e.ActualCost }, "ActualCost").
		DateAfter(func(e *mfg.MfgWorkOrder) int64 { return e.PlannedEndDate }, func(e *mfg.MfgWorkOrder) int64 { return e.PlannedStartDate }, "PlannedEndDate", "PlannedStartDate").
		DateAfter(func(e *mfg.MfgWorkOrder) int64 { return e.ActualEndDate }, func(e *mfg.MfgWorkOrder) int64 { return e.ActualStartDate }, "ActualEndDate", "ActualStartDate").
		Build()
}

func workOrderTransitions() *common.StatusTransitionConfig[mfg.MfgWorkOrder] {
	return &common.StatusTransitionConfig[mfg.MfgWorkOrder]{
		StatusGetter:  func(e *mfg.MfgWorkOrder) int32 { return int32(e.Status) },
		StatusSetter:  func(e *mfg.MfgWorkOrder, s int32) { e.Status = mfg.MfgWorkOrderStatus(s) },
		FilterBuilder: func(e *mfg.MfgWorkOrder) *mfg.MfgWorkOrder {
			return &mfg.MfgWorkOrder{WorkOrderId: e.WorkOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 7},    // PLANNED → RELEASED, CANCELLED
			2: {3, 4, 7}, // RELEASED → IN_PROGRESS, ON_HOLD, CANCELLED
			3: {5, 4, 7}, // IN_PROGRESS → COMPLETED, ON_HOLD, CANCELLED
			4: {2, 3},    // ON_HOLD → RELEASED, IN_PROGRESS
			5: {6},       // COMPLETED → CLOSED
		},
		StatusNames: mfg.MfgWorkOrderStatus_name,
	}
}
