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
package deliveryorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/sales"
	"time"
)

func newDeliveryOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesDeliveryOrder]("SalesDeliveryOrder",
		func(e *sales.SalesDeliveryOrder) { common.GenerateID(&e.DeliveryOrderId) }).
		StatusTransition(deliveryOrderTransitions()).
		After(cascadeCreateSalesInvoice).
		Require(func(e *sales.SalesDeliveryOrder) string { return e.DeliveryOrderId }, "DeliveryOrderId").
		Require(func(e *sales.SalesDeliveryOrder) string { return e.SalesOrderId }, "SalesOrderId").
		Require(func(e *sales.SalesDeliveryOrder) string { return e.CustomerId }, "CustomerId").
		Enum(func(e *sales.SalesDeliveryOrder) int32 { return int32(e.Status) }, sales.SalesDeliveryStatus_name, "Status").
		OptionalMoney(func(e *sales.SalesDeliveryOrder) *erp.Money { return e.ShippingCost }, "ShippingCost").
		Build()
}

// cascadeCreateSalesInvoice auto-creates a sales invoice when a delivery is completed.
func cascadeCreateSalesInvoice(delivery *sales.SalesDeliveryOrder, action ifs.Action, vnic ifs.IVNic) error {
	if delivery.Status != sales.SalesDeliveryStatus_DELIVERY_STATUS_DELIVERED {
		return nil
	}
	exists, err := common.EntityExists("SalesInv", 40,
		&fin.SalesInvoice{DeliveryOrderId: delivery.DeliveryOrderId}, vnic)
	if err != nil || exists {
		return err
	}
	// Look up the sales order for pricing info
	var order *sales.SalesOrder
	if delivery.SalesOrderId != "" {
		order, _ = common.GetEntity("SalesOrder", 60,
			&sales.SalesOrder{SalesOrderId: delivery.SalesOrderId}, vnic)
	}
	lines := make([]*fin.SalesInvoiceLine, len(delivery.Lines))
	for i, dl := range delivery.Lines {
		line := &fin.SalesInvoiceLine{
			LineNumber:  dl.LineNumber,
			Description: dl.Description,
			Quantity:    dl.Quantity,
		}
		// Copy pricing from order lines if available
		if order != nil {
			for _, ol := range order.Lines {
				if ol.LineId == dl.SalesOrderLineId {
					line.UnitPrice = ol.UnitPrice
					line.LineAmount = ol.LineTotal
					line.TaxAmount = ol.TaxAmount
					break
				}
			}
		}
		lines[i] = line
	}
	now := time.Now().Unix()
	invoice := &fin.SalesInvoice{
		CustomerId:      delivery.CustomerId,
		SalesOrderId:    delivery.SalesOrderId,
		DeliveryOrderId: delivery.DeliveryOrderId,
		InvoiceDate:     now,
		DueDate:         now + 30*24*3600, // 30-day terms
		Status:          fin.InvoiceStatus_INVOICE_STATUS_DRAFT,
		PaymentTermDays: 30,
		Lines:           lines,
		AuditInfo:       &erp.AuditInfo{},
	}
	// Copy totals from order if available
	if order != nil {
		invoice.Subtotal = order.Subtotal
		invoice.TaxAmount = order.TaxTotal
		invoice.TotalAmount = order.TotalAmount
		invoice.BalanceDue = order.TotalAmount
		invoice.CurrencyId = order.CurrencyId
	}
	_, err = common.PostEntity("SalesInv", 40, invoice, vnic)
	return err
}

func deliveryOrderTransitions() *common.StatusTransitionConfig[sales.SalesDeliveryOrder] {
	return &common.StatusTransitionConfig[sales.SalesDeliveryOrder]{
		StatusGetter:  func(e *sales.SalesDeliveryOrder) int32 { return int32(e.Status) },
		StatusSetter:  func(e *sales.SalesDeliveryOrder, s int32) { e.Status = sales.SalesDeliveryStatus(s) },
		FilterBuilder: func(e *sales.SalesDeliveryOrder) *sales.SalesDeliveryOrder {
			return &sales.SalesDeliveryOrder{DeliveryOrderId: e.DeliveryOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 6},    // PLANNED → PICKING, FAILED
			2: {3, 6},    // PICKING → PACKED, FAILED
			3: {4, 6},    // PACKED → SHIPPED, FAILED
			4: {5, 6},    // SHIPPED → DELIVERED, FAILED
		},
		StatusNames: sales.SalesDeliveryStatus_name,
	}
}
