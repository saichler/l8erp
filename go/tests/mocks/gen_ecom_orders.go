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

	"github.com/saichler/l8erp/go/types/ecom"
)

// generateEcomOrders creates e-commerce order records
func generateEcomOrders(store *MockDataStore) []*ecom.EcomOrder {
	orderStatuses := []ecom.EcomOrderStatus{
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_PENDING,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_CONFIRMED,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_CONFIRMED,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_PROCESSING,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_PROCESSING,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_SHIPPED,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_SHIPPED,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_DELIVERED,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_DELIVERED,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_CANCELLED,
	}

	paymentStatuses := []ecom.EcomPaymentStatus{
		ecom.EcomPaymentStatus_ECOM_PAYMENT_STATUS_PENDING,
		ecom.EcomPaymentStatus_ECOM_PAYMENT_STATUS_AUTHORIZED,
		ecom.EcomPaymentStatus_ECOM_PAYMENT_STATUS_CAPTURED,
		ecom.EcomPaymentStatus_ECOM_PAYMENT_STATUS_CAPTURED,
		ecom.EcomPaymentStatus_ECOM_PAYMENT_STATUS_CAPTURED,
		ecom.EcomPaymentStatus_ECOM_PAYMENT_STATUS_CAPTURED,
		ecom.EcomPaymentStatus_ECOM_PAYMENT_STATUS_FAILED,
		ecom.EcomPaymentStatus_ECOM_PAYMENT_STATUS_REFUNDED,
	}

	count := 40
	orders := make([]*ecom.EcomOrder, count)

	for i := 0; i < count; i++ {
		customerID := pickRef(store.EcomCustomerIDs, i)

		shippingMethodID := pickRef(store.EcomShippingIDs, i)

		paymentMethodID := pickRef(store.EcomPaymentIDs, i)

		warehouseID := pickRef(store.SCMWarehouseIDs, i)

		orderDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		orderStatus := orderStatuses[i%len(orderStatuses)]

		// Calculate dates based on status
		var shippedDate, deliveredDate int64
		if orderStatus == ecom.EcomOrderStatus_ECOM_ORDER_STATUS_SHIPPED ||
			orderStatus == ecom.EcomOrderStatus_ECOM_ORDER_STATUS_DELIVERED {
			shippedDate = orderDate.AddDate(0, 0, rand.Intn(3)+1).Unix()
		}
		if orderStatus == ecom.EcomOrderStatus_ECOM_ORDER_STATUS_DELIVERED {
			deliveredDate = orderDate.AddDate(0, 0, rand.Intn(5)+3).Unix()
		}

		// Calculate amounts
		subtotal := int64(rand.Intn(50000000) + 500000) // $5k - $500k in cents
		discountAmount := subtotal * int64(rand.Intn(15)) / 100
		shippingAmount := int64(rand.Intn(5000) + 500) // $5 - $50
		taxAmount := (subtotal - discountAmount) * int64(rand.Intn(10)+5) / 100
		totalAmount := subtotal - discountAmount + shippingAmount + taxAmount

		trackingNumber := ""
		if orderStatus == ecom.EcomOrderStatus_ECOM_ORDER_STATUS_SHIPPED ||
			orderStatus == ecom.EcomOrderStatus_ECOM_ORDER_STATUS_DELIVERED {
			trackingNumber = fmt.Sprintf("TRK%09d", rand.Intn(999999999))
		}

		// Generate 2-3 embedded order lines
		linesPerOrder := rand.Intn(2) + 2
		lines := make([]*ecom.EcomOrderLine, linesPerOrder)
		for j := 0; j < linesPerOrder; j++ {
			productID := pickRef(store.EcomProductIDs, (i*3 + j))
			productName := ecomProductNames[(i*3+j)%len(ecomProductNames)]
			qty := int32(rand.Intn(5) + 1)
			unitPr := int64(rand.Intn(50000) + 1000)
			disc := int64(float64(unitPr) * float64(qty) * float64(rand.Intn(15)) / 100)
			tax := int64((float64(unitPr)*float64(qty) - float64(disc)) * 0.08)
			lineTotal := int64(unitPr)*int64(qty) - disc + tax
			lines[j] = &ecom.EcomOrderLine{
				LineId:         fmt.Sprintf("eol-%03d", i*3+j+1),
				ProductId:      productID,
				VariantId:      "",
				Sku:            fmt.Sprintf("SKU-%05d", (i*3+j)%99999+1),
				Name:           productName,
				Quantity:       qty,
				UnitPrice:      money(store, unitPr),
				DiscountAmount: money(store, disc),
				TaxAmount:      money(store, tax),
				LineTotal:      money(store, lineTotal),
				Weight:         float64(rand.Intn(500)+100) / 100.0,
				IsGift:         (i*3+j+1)%10 == 0,
				AuditInfo:      createAuditInfo(),
			}
		}

		// Generate 2 embedded status history entries
		statusProgression := []ecom.EcomOrderStatus{
			ecom.EcomOrderStatus_ECOM_ORDER_STATUS_PENDING,
			ecom.EcomOrderStatus_ECOM_ORDER_STATUS_CONFIRMED,
			ecom.EcomOrderStatus_ECOM_ORDER_STATUS_PROCESSING,
			ecom.EcomOrderStatus_ECOM_ORDER_STATUS_SHIPPED,
			ecom.EcomOrderStatus_ECOM_ORDER_STATUS_DELIVERED,
		}
		statusHistory := make([]*ecom.EcomOrderStatusHistory, 2)
		for j := 0; j < 2; j++ {
			prevIdx := j
			newIdx := j + 1
			if newIdx >= len(statusProgression) {
				newIdx = len(statusProgression) - 1
			}
			changedBy := pickRef(store.EmployeeIDs, (i*2 + j))
			changedAt := orderDate.Add(time.Duration(j*24+rand.Intn(24)) * time.Hour)
			statusHistory[j] = &ecom.EcomOrderStatusHistory{
				StatusId:       fmt.Sprintf("eosh-%03d", i*2+j+1),
				PreviousStatus: statusProgression[prevIdx],
				NewStatus:      statusProgression[newIdx],
				ChangedAt:      changedAt.Unix(),
				ChangedBy:      changedBy,
				Notes:          fmt.Sprintf("Status updated to %s", statusProgression[newIdx].String()),
				NotifyCustomer: j == 0,
				AuditInfo:      createAuditInfo(),
			}
		}

		orders[i] = &ecom.EcomOrder{
			OrderId:          genID("eco", i),
			OrderNumber:      fmt.Sprintf("ORD-%06d", i+1),
			CustomerId:       customerID,
			Status:           orderStatus,
			PaymentStatus:    paymentStatuses[i%len(paymentStatuses)],
			OrderDate:        orderDate.Unix(),
			Subtotal:         money(store, subtotal),
			DiscountAmount:   money(store, discountAmount),
			ShippingAmount:   money(store, shippingAmount),
			TaxAmount:        money(store, taxAmount),
			TotalAmount:      money(store, totalAmount),
			CouponCode:       ecomCouponCodes[i%len(ecomCouponCodes)],
			ShippingMethodId: shippingMethodID,
			PaymentMethodId:  paymentMethodID,
			BillingAddress:   createAddress(),
			ShippingAddress:  createAddress(),
			Notes:            fmt.Sprintf("E-commerce order %d", i+1),
			CustomerNotes:    "",
			IpAddress:        fmt.Sprintf("192.168.%d.%d", rand.Intn(255), rand.Intn(255)),
			UserAgent:        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
			WarehouseId:      warehouseID,
			ShippedDate:      shippedDate,
			DeliveredDate:    deliveredDate,
			TrackingNumber:   trackingNumber,
			AuditInfo:        createAuditInfo(),
			Lines:            lines,
			StatusHistory:    statusHistory,
		}
	}
	return orders
}

// generateEcomReturns creates return/RMA request records with embedded lines (20% of orders)
func generateEcomReturns(store *MockDataStore) []*ecom.EcomReturn {
	returnStatuses := []ecom.EcomReturnStatus{
		ecom.EcomReturnStatus_ECOM_RETURN_STATUS_REQUESTED,
		ecom.EcomReturnStatus_ECOM_RETURN_STATUS_APPROVED,
		ecom.EcomReturnStatus_ECOM_RETURN_STATUS_APPROVED,
		ecom.EcomReturnStatus_ECOM_RETURN_STATUS_RECEIVED,
		ecom.EcomReturnStatus_ECOM_RETURN_STATUS_RECEIVED,
		ecom.EcomReturnStatus_ECOM_RETURN_STATUS_INSPECTED,
		ecom.EcomReturnStatus_ECOM_RETURN_STATUS_REFUNDED,
		ecom.EcomReturnStatus_ECOM_RETURN_STATUS_REJECTED,
	}

	returnReasons := []string{
		"Defective product",
		"Wrong item received",
		"Not as described",
		"Changed mind",
		"Better price found",
		"Arrived too late",
	}

	refundMethods := []string{
		"Original payment method",
		"Store credit",
		"Gift card",
		"Bank transfer",
	}

	count := 8 // 20% of 40 orders
	returns := make([]*ecom.EcomReturn, count)

	for i := 0; i < count; i++ {
		orderID := pickRef(store.EcomOrderIDs, i)

		customerID := pickRef(store.EcomCustomerIDs, i)

		approvedBy := pickRef(store.EmployeeIDs, i)

		requestedDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		returnStatus := returnStatuses[i%len(returnStatuses)]

		// Calculate dates based on status
		var approvedDate, receivedDate, refundedDate int64
		if returnStatus != ecom.EcomReturnStatus_ECOM_RETURN_STATUS_REQUESTED &&
			returnStatus != ecom.EcomReturnStatus_ECOM_RETURN_STATUS_REJECTED {
			approvedDate = requestedDate.AddDate(0, 0, rand.Intn(3)+1).Unix()
		}
		if returnStatus == ecom.EcomReturnStatus_ECOM_RETURN_STATUS_RECEIVED ||
			returnStatus == ecom.EcomReturnStatus_ECOM_RETURN_STATUS_INSPECTED ||
			returnStatus == ecom.EcomReturnStatus_ECOM_RETURN_STATUS_REFUNDED {
			receivedDate = requestedDate.AddDate(0, 0, rand.Intn(7)+5).Unix()
		}
		if returnStatus == ecom.EcomReturnStatus_ECOM_RETURN_STATUS_REFUNDED {
			refundedDate = requestedDate.AddDate(0, 0, rand.Intn(5)+10).Unix()
		}

		refundAmount := int64(rand.Intn(20000000) + 100000) // $1k - $200k

		trackingNumber := ""
		if returnStatus != ecom.EcomReturnStatus_ECOM_RETURN_STATUS_REQUESTED {
			trackingNumber = fmt.Sprintf("RET%09d", rand.Intn(999999999))
		}

		// Generate 1-2 embedded return lines
		rlReasons := []string{"Defective product", "Wrong item received", "Not as described", "Changed mind"}
		rlConditions := []string{"New", "Used", "Damaged", "Defective"}
		linesPerReturn := rand.Intn(2) + 1
		retLines := make([]*ecom.EcomReturnLine, linesPerReturn)
		for j := 0; j < linesPerReturn; j++ {
			productID := pickRef(store.EcomProductIDs, (i*2 + j))
			productName := ecomProductNames[(i*2+j)%len(ecomProductNames)]
			retLines[j] = &ecom.EcomReturnLine{
				LineId:       fmt.Sprintf("erl-%03d", i*2+j+1),
				OrderLineId:  "",
				ProductId:    productID,
				VariantId:    "",
				Sku:          fmt.Sprintf("SKU-%05d", (i*2+j)%99999+1),
				Name:         productName,
				Quantity:     int32(rand.Intn(3) + 1),
				RefundAmount: money(store, int64(rand.Intn(10000000)+50000)),
				Reason:       rlReasons[(i*2+j)%len(rlReasons)],
				Condition:    rlConditions[(i*2+j)%len(rlConditions)],
				Restock:      (i*2+j)%3 != 0,
				AuditInfo:    createAuditInfo(),
			}
		}

		returns[i] = &ecom.EcomReturn{
			ReturnId:        genID("ert", i),
			ReturnNumber:    fmt.Sprintf("RMA-%06d", i+1),
			OrderId:         orderID,
			CustomerId:      customerID,
			Status:          returnStatus,
			Reason:          returnReasons[i%len(returnReasons)],
			Notes:           fmt.Sprintf("Return request %d", i+1),
			RequestedDate:   requestedDate.Unix(),
			ApprovedDate:    approvedDate,
			ReceivedDate:    receivedDate,
			RefundedDate:    refundedDate,
			RefundAmount:    money(store, refundAmount),
			RefundMethod:    refundMethods[i%len(refundMethods)],
			ApprovedBy:      approvedBy,
			TrackingNumber:  trackingNumber,
			ShippingCarrier: ecomShippingCarriers[i%len(ecomShippingCarriers)],
			AuditInfo:       createAuditInfo(),
			Lines:           retLines,
		}
	}
	return returns
}
