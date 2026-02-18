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
package salesorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

func newSalesOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesOrder]("SalesOrder",
		func(e *sales.SalesOrder) { common.GenerateID(&e.SalesOrderId) }).
		StatusTransition(salesOrderTransitions()).
		After(cascadeCancelDeliveryOrders).
		After(cascadeCreateDeliveryOrder).
		Require(func(e *sales.SalesOrder) string { return e.SalesOrderId }, "SalesOrderId").
		Require(func(e *sales.SalesOrder) string { return e.CustomerId }, "CustomerId").
		Require(func(e *sales.SalesOrder) string { return e.CurrencyId }, "CurrencyId").
		Enum(func(e *sales.SalesOrder) int32 { return int32(e.Status) }, sales.SalesOrderStatus_name, "Status").
		OptionalMoney(func(e *sales.SalesOrder) *erp.Money { return e.Subtotal }, "Subtotal").
		OptionalMoney(func(e *sales.SalesOrder) *erp.Money { return e.DiscountTotal }, "DiscountTotal").
		OptionalMoney(func(e *sales.SalesOrder) *erp.Money { return e.TaxTotal }, "TaxTotal").
		OptionalMoney(func(e *sales.SalesOrder) *erp.Money { return e.TotalAmount }, "TotalAmount").
		DateAfter(func(e *sales.SalesOrder) int64 { return e.RequestedDeliveryDate }, func(e *sales.SalesOrder) int64 { return e.OrderDate }, "RequestedDeliveryDate", "OrderDate").
		Build()
}

// cascadeCancelDeliveryOrders marks related delivery orders as FAILED
// when a sales order is cancelled.
func cascadeCancelDeliveryOrders(order *sales.SalesOrder, action ifs.Action, vnic ifs.IVNic) error {
	if order.Status != sales.SalesOrderStatus_SALES_ORDER_STATUS_CANCELLED {
		return nil
	}
	children, err := common.GetEntities("DlvryOrder", 60,
		&sales.SalesDeliveryOrder{SalesOrderId: order.SalesOrderId}, vnic)
	if err != nil {
		return err
	}
	for _, child := range children {
		s := int32(child.Status)
		if s == 5 || s == 6 { // DELIVERED or FAILED — skip terminal
			continue
		}
		child.Status = sales.SalesDeliveryStatus_DELIVERY_STATUS_FAILED
		if err := common.PutEntity("DlvryOrder", 60, child, vnic); err != nil {
			return err
		}
	}
	return nil
}

// cascadeCreateDeliveryOrder auto-creates a delivery order when a sales order is confirmed.
func cascadeCreateDeliveryOrder(order *sales.SalesOrder, action ifs.Action, vnic ifs.IVNic) error {
	if order.Status != sales.SalesOrderStatus_SALES_ORDER_STATUS_CONFIRMED {
		return nil
	}
	exists, err := common.EntityExists("DlvryOrder", 60,
		&sales.SalesDeliveryOrder{SalesOrderId: order.SalesOrderId}, vnic)
	if err != nil || exists {
		return err
	}
	lines := make([]*sales.SalesDeliveryLine, len(order.Lines))
	for i, ol := range order.Lines {
		lines[i] = &sales.SalesDeliveryLine{
			LineNumber:       ol.LineNumber,
			SalesOrderLineId: ol.LineId,
			ItemId:           ol.ItemId,
			Description:      ol.Description,
			Quantity:         ol.Quantity,
			UnitOfMeasure:    ol.UnitOfMeasure,
		}
	}
	_, err = common.PostEntity("DlvryOrder", 60, &sales.SalesDeliveryOrder{
		SalesOrderId:        order.SalesOrderId,
		CustomerId:          order.CustomerId,
		WarehouseId:         order.WarehouseId,
		PlannedDeliveryDate: order.RequestedDeliveryDate,
		Status:              sales.SalesDeliveryStatus_DELIVERY_STATUS_PLANNED,
		Lines:               lines,
		AuditInfo:           &erp.AuditInfo{},
	}, vnic)
	return err
}

func salesOrderTransitions() *common.StatusTransitionConfig[sales.SalesOrder] {
	return &common.StatusTransitionConfig[sales.SalesOrder]{
		StatusGetter:  func(e *sales.SalesOrder) int32 { return int32(e.Status) },
		StatusSetter:  func(e *sales.SalesOrder, s int32) { e.Status = sales.SalesOrderStatus(s) },
		FilterBuilder: func(e *sales.SalesOrder) *sales.SalesOrder {
			return &sales.SalesOrder{SalesOrderId: e.SalesOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 7},    // DRAFT → CONFIRMED, CANCELLED
			2: {3, 7},    // CONFIRMED → IN_PROGRESS, CANCELLED
			3: {4, 5, 7}, // IN_PROGRESS → PARTIALLY_SHIPPED, SHIPPED, CANCELLED
			4: {5, 7},    // PARTIALLY_SHIPPED → SHIPPED, CANCELLED
			5: {6},       // SHIPPED → DELIVERED
		},
		StatusNames: sales.SalesOrderStatus_name,
	}
}
