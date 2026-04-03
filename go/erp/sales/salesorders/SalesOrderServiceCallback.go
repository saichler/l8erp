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
	"reflect"
	l8c "github.com/saichler/l8common/go/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)


func toSlice(slice interface{}) []interface{} {
	v := reflect.ValueOf(slice)
	result := make([]interface{}, v.Len())
	for i := 0; i < v.Len(); i++ {
		result[i] = v.Index(i).Interface()
	}
	return result
}

func newSalesOrderServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&sales.SalesOrder{}, vnic).
		StatusTransition(salesOrderTransitions()).
		After(cascadeCancelDeliveryOrders).
		After(cascadeCreateDeliveryOrder).
		After(calculateCommission).
		Custom(computePricing).
		Custom(applyTaxRules).
		Compute(computeSalesOrderTotals).
		Custom(validateCreditLimit).
		Require(func(v interface{}) string { return v.(*sales.SalesOrder).SalesOrderId }, "SalesOrderId").
		Require(func(v interface{}) string { return v.(*sales.SalesOrder).CustomerId }, "CustomerId").
		Require(func(v interface{}) string { return v.(*sales.SalesOrder).CurrencyId }, "CurrencyId").
		Enum(func(v interface{}) int32 { return int32(v.(*sales.SalesOrder).Status) }, sales.SalesOrderStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesOrder).Subtotal }, "Subtotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesOrder).DiscountTotal }, "DiscountTotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesOrder).TaxTotal }, "TaxTotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesOrder).TotalAmount }, "TotalAmount").
		DateAfter(func(v interface{}) int64 { return v.(*sales.SalesOrder).RequestedDeliveryDate }, func(v interface{}) int64 { return v.(*sales.SalesOrder).OrderDate }, "RequestedDeliveryDate", "OrderDate").
		Build()
}

// cascadeCancelDeliveryOrders marks related delivery orders as FAILED
// when a sales order is cancelled.
func cascadeCancelDeliveryOrders(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	order := v.(*sales.SalesOrder)
	if order.Status != sales.SalesOrderStatus_SALES_ORDER_STATUS_CANCELLED {
		return nil
	}
	childrenRaw, err := common.GetEntities("DlvryOrder", 60, &sales.SalesDeliveryOrder{SalesOrderId: order.SalesOrderId}, vnic)
	children := make([]*sales.SalesDeliveryOrder, 0, len(childrenRaw))
	for _, ri := range childrenRaw { children = append(children, ri.(*sales.SalesDeliveryOrder)) }
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
func cascadeCreateDeliveryOrder(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	order := v.(*sales.SalesOrder)
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
		AuditInfo:           &l8common.AuditInfo{},
	}, vnic)
	return err
}

func computeSalesOrderTotals(v interface{}) error {
	o := v.(*sales.SalesOrder)
	subtotal := int64(0)
	currencyId := ""
	for _, line := range o.Lines {
		if line.UnitPrice == nil {
			continue
		}
		if currencyId == "" {
			currencyId = line.UnitPrice.CurrencyId
		}
		gross := int64(line.Quantity * float64(line.UnitPrice.Amount))
		subtotal += gross
		if line.DiscountPercent > 0 && line.DiscountAmount == nil {
			line.DiscountAmount = &l8common.Money{
				Amount:     int64(float64(gross) * line.DiscountPercent / 100),
				CurrencyId: currencyId,
			}
		}
		disc := int64(0)
		if line.DiscountAmount != nil {
			disc = line.DiscountAmount.Amount
		}
		tax := int64(0)
		if line.TaxAmount != nil {
			tax = line.TaxAmount.Amount
		}
		line.LineTotal = &l8common.Money{Amount: gross - disc + tax, CurrencyId: currencyId}
	}
	if currencyId == "" {
		return nil
	}
	o.Subtotal = &l8common.Money{Amount: subtotal, CurrencyId: currencyId}
	o.DiscountTotal = l8c.SumLineMoney(toSlice(o.Lines), func(v interface{}) *l8common.Money { return v.(*sales.SalesOrderLine).DiscountAmount })
	o.TaxTotal = l8c.SumLineMoney(toSlice(o.Lines), func(v interface{}) *l8common.Money { return v.(*sales.SalesOrderLine).TaxAmount })
	o.TotalAmount = l8c.MoneyAdd(l8c.MoneySubtract(o.Subtotal, o.DiscountTotal), o.TaxTotal)
	return nil
}

func salesOrderTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*sales.SalesOrder).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*sales.SalesOrder).Status = sales.SalesOrderStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*sales.SalesOrder);
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
