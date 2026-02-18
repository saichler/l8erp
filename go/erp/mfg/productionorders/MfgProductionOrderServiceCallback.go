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
		After(cascadeCreateWorkOrders).
		Require(func(e *mfg.MfgProductionOrder) string { return e.ProdOrderId }, "ProdOrderId").
		Enum(func(e *mfg.MfgProductionOrder) int32 { return int32(e.Status) }, mfg.MfgProductionOrderStatus_name, "Status").
		OptionalMoney(func(e *mfg.MfgProductionOrder) *erp.Money { return e.TotalEstimatedCost }, "TotalEstimatedCost").
		OptionalMoney(func(e *mfg.MfgProductionOrder) *erp.Money { return e.TotalActualCost }, "TotalActualCost").
		Build()
}

// cascadeCreateWorkOrders auto-creates work orders when a production order is confirmed.
func cascadeCreateWorkOrders(order *mfg.MfgProductionOrder, action ifs.Action, vnic ifs.IVNic) error {
	if order.Status != mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_CONFIRMED {
		return nil
	}
	for _, line := range order.Lines {
		if line.ItemId == "" {
			continue
		}
		// Skip if work order already linked
		if line.WorkOrderId != "" {
			continue
		}
		// Look up BOM for this item
		bom, _ := common.GetEntity("MfgBom", 70,
			&mfg.MfgBom{ItemId: line.ItemId}, vnic)
		var bomId, routingId string
		var operations []*mfg.MfgWorkOrderOp
		if bom != nil {
			bomId = bom.BomId
		}
		// Look up routing for this item to get operations
		routing, _ := common.GetEntity("MfgRouting", 70,
			&mfg.MfgRouting{ItemId: line.ItemId}, vnic)
		if routing != nil {
			routingId = routing.RoutingId
			operations = make([]*mfg.MfgWorkOrderOp, len(routing.Operations))
			for i, op := range routing.Operations {
				operations[i] = &mfg.MfgWorkOrderOp{
					OperationNumber:    op.OperationNumber,
					OperationName:      op.OperationName,
					WorkCenterId:       op.WorkCenterId,
					SetupTimePlanned:   op.SetupTime,
					RunTimePlanned:     op.RunTime,
					RoutingOperationId: op.OperationId,
					AuditInfo:          &erp.AuditInfo{},
				}
			}
		}
		wo := &mfg.MfgWorkOrder{
			ItemId:          line.ItemId,
			BomId:           bomId,
			RoutingId:       routingId,
			QuantityOrdered: line.QuantityOrdered,
			Status:          mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_PLANNED,
			SalesOrderId:    order.SalesOrderId,
			Priority:        order.Priority,
			Operations:      operations,
			AuditInfo:       &erp.AuditInfo{},
		}
		if _, err := common.PostEntity("MfgWorkOrd", 70, wo, vnic); err != nil {
			return err
		}
	}
	return nil
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
