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

// generateSalesQuotations creates quotation records with embedded lines
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

		subtotal := int64(rand.Intn(50000000) + 500000)
		discountTotal := subtotal * int64(rand.Intn(15)) / 100
		taxTotal := (subtotal - discountTotal) * int64(rand.Intn(10)+5) / 100
		totalAmount := subtotal - discountTotal + taxTotal

		// Embed quotation lines (3 per quotation)
		lines := make([]*sales.SalesQuotationLine, 3)
		for j := 0; j < 3; j++ {
			itemID := pickRef(store.ItemIDs, (i*3 + j))
			qty := float64(rand.Intn(10) + 1)
			up := int64(rand.Intn(100000) + 5000)
			dp := float64(rand.Intn(15))
			da := int64(float64(up) * qty * dp / 100)
			ta := int64((float64(up)*qty - float64(da)) * 0.08)
			lt := int64(float64(up)*qty) - da + ta
			lines[j] = &sales.SalesQuotationLine{
				LineId:          fmt.Sprintf("sql-%03d", i*3+j+1),
				LineNumber:      int32(j + 1),
				ItemId:          itemID,
				Description:     itemNames[(i*3+j)%len(itemNames)],
				Quantity:        qty,
				UnitOfMeasure:   "EA",
				UnitPrice:       money(store, up),
				DiscountPercent: dp,
				DiscountAmount:  money(store, da),
				TaxAmount:       money(store, ta),
				LineTotal:       money(store, lt),
			}
		}

		quotations[i] = &sales.SalesQuotation{
			QuotationId:     genID("sq", i),
			QuotationNumber: fmt.Sprintf("QT-%04d", rand.Intn(9000)+1000),
			CustomerId:      customerID,
			SalespersonId:   salespersonID,
			QuotationDate:   quotationDate.Unix(),
			ValidUntil:      validUntil.Unix(),
			Status:          statuses[i%len(statuses)],
			PaymentTerms:    "Net 30",
			CurrencyId:      pickRef(store.CurrencyIDs, i),
			Subtotal:        money(store, subtotal),
			DiscountTotal:   money(store, discountTotal),
			TaxTotal:        money(store, taxTotal),
			TotalAmount:     money(store, totalAmount),
			Notes:           fmt.Sprintf("Quotation for customer %d", i+1),
			AuditInfo:       createAuditInfo(),
			Lines:           lines,
		}
	}
	return quotations
}

// generateSalesOrders creates sales order records with embedded lines, allocations, and back orders
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
	allocStatuses := []sales.SalesAllocationStatus{
		sales.SalesAllocationStatus_ALLOCATION_STATUS_PENDING,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_ALLOCATED,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_ALLOCATED,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_ALLOCATED,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_RELEASED,
		sales.SalesAllocationStatus_ALLOCATION_STATUS_RELEASED,
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

		// Embed order lines (3 per order)
		lines := make([]*sales.SalesOrderLine, 3)
		for j := 0; j < 3; j++ {
			itemID := pickRef(store.ItemIDs, (i*3 + j))
			qty := float64(rand.Intn(20) + 1)
			shipped := 0.0
			if i%3 == 0 {
				shipped = qty
			} else if i%3 == 1 {
				shipped = float64(int(qty) / 2)
			}
			up := int64(rand.Intn(100000) + 5000)
			dp := float64(rand.Intn(15))
			da := int64(float64(up) * qty * dp / 100)
			ta := int64((float64(up)*qty - float64(da)) * 0.08)
			lt := int64(float64(up)*qty) - da + ta

			lines[j] = &sales.SalesOrderLine{
				LineId:          fmt.Sprintf("sol-%03d", i*3+j+1),
				LineNumber:      int32(j + 1),
				ItemId:          itemID,
				Description:     itemNames[(i*3+j)%len(itemNames)],
				Quantity:        qty,
				ShippedQuantity: shipped,
				UnitOfMeasure:   "EA",
				UnitPrice:       money(store, up),
				DiscountPercent: dp,
				DiscountAmount:  money(store, da),
				TaxAmount:       money(store, ta),
				LineTotal:       money(store, lt),
			}
		}

		// Embed allocations (1 per line)
		allocations := make([]*sales.SalesOrderAllocation, 3)
		for j := 0; j < 3; j++ {
			allocations[j] = &sales.SalesOrderAllocation{
				AllocationId:      fmt.Sprintf("soa-%03d", i*3+j+1),
				LineId:            lines[j].LineId,
				ItemId:            lines[j].ItemId,
				WarehouseId:       warehouseID,
				AllocatedQuantity: lines[j].Quantity,
				Status:            allocStatuses[(i*3+j)%len(allocStatuses)],
			}
		}

		// Embed back orders (~50% of orders)
		var backOrders []*sales.SalesBackOrder
		if i%2 == 0 {
			backOrders = []*sales.SalesBackOrder{{
				BackOrderId:       fmt.Sprintf("sbo-%03d", i/2+1),
				LineId:            lines[0].LineId,
				ItemId:            lines[0].ItemId,
				BackOrderQuantity: float64(rand.Intn(10) + 1),
				ExpectedDate:      time.Now().AddDate(0, 0, rand.Intn(30)+7).Unix(),
				Status:            "PENDING",
				Notes:             fmt.Sprintf("Back order for item shortage %d", i/2+1),
			}}
		}

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
			CurrencyId:            pickRef(store.CurrencyIDs, i),
			WarehouseId:           warehouseID,
			Subtotal:              money(store, subtotal),
			DiscountTotal:         money(store, discountTotal),
			TaxTotal:              money(store, taxTotal),
			TotalAmount:           money(store, totalAmount),
			Notes:                 fmt.Sprintf("Sales order for customer %d", i+1),
			AuditInfo:             createAuditInfo(),
			Lines:                 lines,
			Allocations:           allocations,
			BackOrders:            backOrders,
		}
	}
	return orders
}

// generateSalesReturnOrders creates return order records with embedded lines
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
	reasonCodes := []string{"DEFECT", "WRONG_ITEM", "CHANGED_MIND", "DAMAGED", "NOT_AS_DESC", "DUPLICATE"}
	conditions := []string{"NEW", "USED", "DAMAGED", "DEFECTIVE"}
	dispositions := []string{"RESTOCK", "REPAIR", "SCRAP", "RETURN_TO_VENDOR"}

	count := 15
	returns := make([]*sales.SalesReturnOrder, count)
	for i := 0; i < count; i++ {
		orderID := pickRef(store.SalesOrderIDs, i)
		customerID := pickRef(store.CustomerIDs, i)
		warehouseID := pickRef(store.SCMWarehouseIDs, i)
		returnDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		refundAmount := int64(rand.Intn(20000000) + 100000)

		// Embed return lines (2 per return)
		lines := make([]*sales.SalesReturnOrderLine, 2)
		for j := 0; j < 2; j++ {
			itemID := pickRef(store.ItemIDs, (i*2 + j))
			qty := float64(rand.Intn(5) + 1)
			up := int64(rand.Intn(100000) + 5000)
			lt := int64(float64(up) * qty)
			lines[j] = &sales.SalesReturnOrderLine{
				LineId:        fmt.Sprintf("srol-%03d", i*2+j+1),
				LineNumber:    int32(j + 1),
				ItemId:        itemID,
				Description:   fmt.Sprintf("Return line item %d", i*2+j+1),
				Quantity:      qty,
				UnitOfMeasure: "EA",
				UnitPrice:     money(store, up),
				LineTotal:     money(store, lt),
				Condition:     conditions[(i*2+j)%len(conditions)],
				Disposition:   dispositions[(i*2+j)%len(dispositions)],
			}
		}

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
			Lines:             lines,
		}
	}
	return returns
}
