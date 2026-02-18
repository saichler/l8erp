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
package productionorders

import (
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newMfgProductionOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[mfg.MfgProductionOrder]("MfgProductionOrder",
		func(e *mfg.MfgProductionOrder) { common.GenerateID(&e.ProdOrderId) }).
		StatusTransition(productionOrderTransitions()).
		Require(func(e *mfg.MfgProductionOrder) string { return e.ProdOrderId }, "ProdOrderId").
		Enum(func(e *mfg.MfgProductionOrder) int32 { return int32(e.Status) }, mfg.MfgProductionOrderStatus_name, "Status").
		OptionalMoney(func(e *mfg.MfgProductionOrder) *erp.Money { return e.TotalEstimatedCost }, "TotalEstimatedCost").
		OptionalMoney(func(e *mfg.MfgProductionOrder) *erp.Money { return e.TotalActualCost }, "TotalActualCost").
		Build()
}

func productionOrderTransitions() *common.StatusTransitionConfig[mfg.MfgProductionOrder] {
	return &common.StatusTransitionConfig[mfg.MfgProductionOrder]{
		StatusGetter:  func(e *mfg.MfgProductionOrder) int32 { return int32(e.Status) },
		StatusSetter:  func(e *mfg.MfgProductionOrder, s int32) { e.Status = mfg.MfgProductionOrderStatus(s) },
		FilterBuilder: func(e *mfg.MfgProductionOrder) *mfg.MfgProductionOrder {
			return &mfg.MfgProductionOrder{ProdOrderId: e.ProdOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 5},    // PLANNED → CONFIRMED, CANCELLED
			2: {3, 5},    // CONFIRMED → IN_PROGRESS, CANCELLED
			3: {4, 5},    // IN_PROGRESS → COMPLETED, CANCELLED
		},
		StatusNames: mfg.MfgProductionOrderStatus_name,
	}
}
