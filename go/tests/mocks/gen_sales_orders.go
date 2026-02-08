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
package mocks

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/sales"
)

// generateSalesQuotations creates quotation records
func generateSalesQuotations(store *MockDataStore) []*sales.SalesQuotation {
	statuses := []sales.SalesQuotationStatus{
		sales.SalesQuotationStatus_QUOTATION_STATUS_DRAFT,
		sales.SalesQuotationStatus_QUOTATION_STATUS_SENT,
		sales.SalesQuotationStatus_QUOTATION_STATUS_ACCEPTED,
		sales.SalesQuotationStatus_QUOTATION_STATUS_ACCEPTED,
		sales.SalesQuotationStatus_QUOTATION_STATUS_ACCEPTED,
		sales.SalesQuotationStatus_QUOTATION_STATUS_REJECTED,
		sales.SalesQuotationStatus_QUOTATION_STATUS_EXPIRED,
	}

	count := 25
	quotations := make([]*sales.SalesQuotation, count)
	for i := 0; i < count; i++ {
		customerID := pickRef(store.CustomerIDs, i)

		salespersonID := pickRef(store.EmployeeIDs, i)

		quotationDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		validUntil := quotationDate.AddDate(0, 0, 30)

		subtotal := int64(rand.Intn(50000000) + 500000) // $5k - $500k
		discountTotal := subtotal * int64(rand.Intn(15)) / 100
		taxTotal := (subtotal - discountTotal) * int64(rand.Intn(10)+5) / 100
		totalAmount := subtotal - discountTotal + taxTotal

		quotations[i] = &sales.SalesQuotation{
			QuotationId:     genID("sq", i),
			QuotationNumber: fmt.Sprintf("QT-%04d", rand.Intn(9000)+1000),
			CustomerId:      customerID,
			SalespersonId:   salespersonID,
			QuotationDate:   quotationDate.Unix(),
			ValidUntil:      validUntil.Unix(),
			Status:          statuses[i%len(statuses)],
			PaymentTerms:    "Net 30",
			CurrencyId: pickRef(store.CurrencyIDs, i),
			Subtotal:        money(store, subtotal),
			DiscountTotal:   money(store, discountTotal),
			TaxTotal:        money(store, taxTotal),
			TotalAmount:     money(store, totalAmount),
			Notes:           fmt.Sprintf("Quotation for customer %d", i+1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return quotations
}

// generateSalesQuotationLines creates quotation line records (3 per quotation)
func generateSalesQuotationLines(store *MockDataStore) []*sales.SalesQuotationLine {
	return genLines(store.SalesQuotationIDs, 3, func(idx, qIdx, j int, quotationID string) *sales.SalesQuotationLine {
		itemID := ""
		description := fmt.Sprintf("Line item %d", idx)
		if len(store.ItemIDs) > 0 {
			itemID = store.ItemIDs[(qIdx*3+j)%len(store.ItemIDs)]
			description = itemNames[(qIdx*3+j)%len(itemNames)]
		}

		quantity := float64(rand.Intn(10) + 1)
		unitPrice := int64(rand.Intn(100000) + 5000)
		discountPercent := float64(rand.Intn(15))
		discountAmount := int64(float64(unitPrice) * quantity * discountPercent / 100)
		taxAmount := int64((float64(unitPrice)*quantity - float64(discountAmount)) * 0.08)
		lineTotal := int64(float64(unitPrice)*quantity) - discountAmount + taxAmount

		return &sales.SalesQuotationLine{
			LineId:          fmt.Sprintf("sql-%03d", idx),
			QuotationId:     quotationID,
			LineNumber:      int32(j + 1),
			ItemId:          itemID,
			Description:     description,
			Quantity:        quantity,
			UnitOfMeasure:   "EA",
			UnitPrice:       money(store, unitPrice),
			DiscountPercent: discountPercent,
			DiscountAmount:  money(store, discountAmount),
			TaxAmount:       money(store, taxAmount),
			LineTotal:       money(store, lineTotal),
			AuditInfo:       createAuditInfo(),
		}
	})
}

// generateSalesOrders creates sales order records
func generateSalesOrders(store *MockDataStore) []*sales.SalesOrder {
	statuses := []sales.SalesOrderStatus{
		sales.SalesOrderStatus_SALES_ORDER_STATUS_DRAFT,
		sales.SalesOrderStatus_SALES_ORDER_STATUS_CONFIRMED,
		sales.SalesOrderStatus_SALES_ORDER_STATUS_CONFIRMED,
		sales.SalesOrderStatus_SALES_ORDER_STATUS_IN_PROGRESS,
		sales.SalesOrderStatus_SALES_ORDER_STATUS_IN_PROGRESS,
		sales.SalesOrderStatus_SALES_ORDER_STATUS_PARTIALLY_SHIPPED,
		sales.SalesOrderStatus_SALES_ORDER_STATUS_SHIPPED,
		sales.SalesOrderStatus_SALES_ORDER_STATUS_DELIVERED,
		sales.SalesOrderStatus_SALES_ORDER_STATUS_DELIVERED,
		sales.SalesOrderStatus_SALES_ORDER_STATUS_CANCELLED,
	}

	count := 30
	orders := make([]*sales.SalesOrder, count)
	for i := 0; i < count; i++ {
		customerID := pickRef(store.CustomerIDs, i)

		salespersonID := pickRef(store.EmployeeIDs, i)

		quotationID := ""
		if len(store.SalesQuotationIDs) > 0 && i < len(store.SalesQuotationIDs) {
			quotationID = store.SalesQuotationIDs[i%len(store.SalesQuotationIDs)]
		}

		warehouseID := pickRef(store.SCMWarehouseIDs, i)

		orderDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		requestedDate := orderDate.AddDate(0, 0, rand.Intn(14)+7)

		subtotal := int64(rand.Intn(50000000) + 500000)
		discountTotal := subtotal * int64(rand.Intn(15)) / 100
		shippingAmount := int64(rand.Intn(50000) + 5000)
		taxTotal := (subtotal - discountTotal + shippingAmount) * int64(rand.Intn(10)+5) / 100
		totalAmount := subtotal - discountTotal + shippingAmount + taxTotal

		orders[i] = &sales.SalesOrder{
			SalesOrderId:          genID("so", i),
			OrderNumber:           fmt.Sprintf("SO-%04d", rand.Intn(9000)+1000),
			CustomerId:            customerID,
			SalespersonId:         salespersonID,
			QuotationId:           quotationID,
			OrderDate:             orderDate.Unix(),
			RequestedDeliveryDate: requestedDate.Unix(),
			Status:                statuses[i%len(statuses)],
			PaymentTerms:          "Net 30",
			CurrencyId: pickRef(store.CurrencyIDs, i),
			WarehouseId:           warehouseID,
			Subtotal:              money(store, subtotal),
			DiscountTotal:         money(store, discountTotal),
			TaxTotal:              money(store, taxTotal),
			TotalAmount:           money(store, totalAmount),
			Notes:                 fmt.Sprintf("Sales order for customer %d", i+1),
			AuditInfo:             createAuditInfo(),
		}
	}
	return orders
}

// generateSalesOrderLines creates sales order line records (3 per order)
func generateSalesOrderLines(store *MockDataStore) []*sales.SalesOrderLine {
	return genLines(store.SalesOrderIDs, 3, func(idx, oIdx, j int, orderID string) *sales.SalesOrderLine {
		itemID := ""
		description := fmt.Sprintf("Order line item %d", idx)
		if len(store.ItemIDs) > 0 {
			itemID = store.ItemIDs[(oIdx*3+j)%len(store.ItemIDs)]
			description = itemNames[(oIdx*3+j)%len(itemNames)]
		}

		quantity := float64(rand.Intn(20) + 1)
		shippedQty := 0.0
		if oIdx%3 == 0 { // Some orders are fully shipped
			shippedQty = quantity
		} else if oIdx%3 == 1 { // Some are partially shipped
			shippedQty = float64(int(quantity) / 2)
		}

		unitPrice := int64(rand.Intn(100000) + 5000)
		discountPercent := float64(rand.Intn(15))
		discountAmount := int64(float64(unitPrice) * quantity * discountPercent / 100)
		taxAmount := int64((float64(unitPrice)*quantity - float64(discountAmount)) * 0.08)
		lineTotal := int64(float64(unitPrice)*quantity) - discountAmount + taxAmount

		return &sales.SalesOrderLine{
			LineId:          fmt.Sprintf("sol-%03d", idx),
			SalesOrderId:    orderID,
			LineNumber:      int32(j + 1),
			ItemId:          itemID,
			Description:     description,
			Quantity:        quantity,
			ShippedQuantity: shippedQty,
			UnitOfMeasure:   "EA",
			UnitPrice:       money(store, unitPrice),
			DiscountPercent: discountPercent,
			DiscountAmount:  money(store, discountAmount),
			TaxAmount:       money(store, taxAmount),
			LineTotal:       money(store, lineTotal),
			AuditInfo:       createAuditInfo(),
		}
	})
}

// generateSalesReturnOrders creates sales return order records
func generateSalesReturnOrders(store *MockDataStore) []*sales.SalesReturnOrder {
	statuses := []sales.SalesReturnStatus{
		sales.SalesReturnStatus_RETURN_STATUS_REQUESTED,
		sales.SalesReturnStatus_RETURN_STATUS_APPROVED,
		sales.SalesReturnStatus_RETURN_STATUS_APPROVED,
		sales.SalesReturnStatus_RETURN_STATUS_RECEIVED,
		sales.SalesReturnStatus_RETURN_STATUS_RECEIVED,
		sales.SalesReturnStatus_RETURN_STATUS_INSPECTED,
		sales.SalesReturnStatus_RETURN_STATUS_PROCESSED,
		sales.SalesReturnStatus_RETURN_STATUS_REJECTED,
	}

	reasonCodes := []string{
		"DEFECT", "WRONG_ITEM", "CHANGED_MIND",
		"DAMAGED", "NOT_AS_DESC", "DUPLICATE",
	}

	count := 15
	returns := make([]*sales.SalesReturnOrder, count)
	for i := 0; i < count; i++ {
		orderID := pickRef(store.SalesOrderIDs, i)

		customerID := pickRef(store.CustomerIDs, i)

		warehouseID := pickRef(store.SCMWarehouseIDs, i)

		returnDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))

		refundAmount := int64(rand.Intn(20000000) + 100000)

		returns[i] = &sales.SalesReturnOrder{
			ReturnOrderId:     genID("sro", i),
			ReturnNumber:      fmt.Sprintf("RMA-%04d", rand.Intn(9000)+1000),
			SalesOrderId:      orderID,
			CustomerId:        customerID,
			ReturnDate:        returnDate.Unix(),
			Status:            statuses[i%len(statuses)],
			ReasonCode:        reasonCodes[i%len(reasonCodes)],
			ReasonDescription: fmt.Sprintf("Customer reported issue: %s", reasonCodes[i%len(reasonCodes)]),
			RefundAmount:      money(store, refundAmount),
			WarehouseId:       warehouseID,
			Notes:             fmt.Sprintf("Return request %d", i+1),
			AuditInfo:         createAuditInfo(),
		}
	}
	return returns
}

// generateSalesOrderAllocations creates order allocation records
func generateSalesOrderAllocations(store *MockDataStore) []*sales.SalesOrderAllocation {
	statuses := []sales.SalesAllocationStatus{
		sales.SalesAllocationStatus_ALLOCATION_STATUS_PENDING,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_ALLOCATED,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_ALLOCATED,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_ALLOCATED,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_RELEASED,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_RELEASED,
	}

	count := len(store.SalesOrderLineIDs)
	if count == 0 {
		count = 30
	}

	allocations := make([]*sales.SalesOrderAllocation, count)
	for i := 0; i < count; i++ {
		orderID := ""
		lineID := ""
		if len(store.SalesOrderIDs) > 0 {
			orderID = store.SalesOrderIDs[i%len(store.SalesOrderIDs)]
		}
		if len(store.SalesOrderLineIDs) > 0 {
			lineID = store.SalesOrderLineIDs[i%len(store.SalesOrderLineIDs)]
		}

		itemID := pickRef(store.ItemIDs, i)

		warehouseID := pickRef(store.SCMWarehouseIDs, i)

		allocations[i] = &sales.SalesOrderAllocation{
			AllocationId:      genID("soa", i),
			SalesOrderId:      orderID,
			LineId:            lineID,
			ItemId:            itemID,
			WarehouseId:       warehouseID,
			AllocatedQuantity: float64(rand.Intn(20) + 1),
			Status:            statuses[i%len(statuses)],
			AuditInfo:         createAuditInfo(),
		}
	}
	return allocations
}

// generateSalesBackOrders creates back order records
func generateSalesBackOrders(store *MockDataStore) []*sales.SalesBackOrder {
	count := 15
	backOrders := make([]*sales.SalesBackOrder, count)

	for i := 0; i < count; i++ {
		orderID := ""
		lineID := ""
		if len(store.SalesOrderIDs) > 0 {
			orderID = store.SalesOrderIDs[i%len(store.SalesOrderIDs)]
		}
		if len(store.SalesOrderLineIDs) > 0 {
			lineID = store.SalesOrderLineIDs[i%len(store.SalesOrderLineIDs)]
		}

		itemID := pickRef(store.ItemIDs, i)

		expectedDate := time.Now().AddDate(0, 0, rand.Intn(30)+7)

		backOrders[i] = &sales.SalesBackOrder{
			BackOrderId:       genID("sbo", i),
			SalesOrderId:      orderID,
			LineId:            lineID,
			ItemId:            itemID,
			BackOrderQuantity: float64(rand.Intn(10) + 1),
			ExpectedDate:      expectedDate.Unix(),
			Status:            "PENDING",
			Notes:             fmt.Sprintf("Back order for item shortage %d", i+1),
			AuditInfo:         createAuditInfo(),
		}
	}
	return backOrders
}

// generateSalesReturnOrderLines creates return order line records
func generateSalesReturnOrderLines(store *MockDataStore) []*sales.SalesReturnOrderLine {
	conditions := []string{"NEW", "USED", "DAMAGED", "DEFECTIVE"}
	dispositions := []string{"RESTOCK", "REPAIR", "SCRAP", "RETURN_TO_VENDOR"}

	return genLines(store.SalesReturnOrderIDs, 2, func(idx, rIdx, j int, returnOrderID string) *sales.SalesReturnOrderLine {
		itemID := pickRef(store.ItemIDs, (rIdx*2+j))

		qty := float64(rand.Intn(5) + 1)
		unitPrice := int64(rand.Intn(100000) + 5000)
		lineTotal := int64(float64(unitPrice) * qty)

		return &sales.SalesReturnOrderLine{
			LineId:        fmt.Sprintf("srol-%03d", idx),
			ReturnOrderId: returnOrderID,
			LineNumber:    int32(j + 1),
			ItemId:        itemID,
			Description:   fmt.Sprintf("Return line item %d", idx),
			Quantity:      qty,
			UnitOfMeasure: "EA",
			UnitPrice:     money(store, unitPrice),
			LineTotal:     money(store, lineTotal),
			Condition:     conditions[(rIdx*2+j)%len(conditions)],
			Disposition:   dispositions[(rIdx*2+j)%len(dispositions)],
			AuditInfo:     createAuditInfo(),
		}
	})
}
