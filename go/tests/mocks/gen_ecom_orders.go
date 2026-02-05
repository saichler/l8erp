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
package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8erp/go/types/erp"
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
		customerID := ""
		if len(store.EcomCustomerIDs) > 0 {
			customerID = store.EcomCustomerIDs[i%len(store.EcomCustomerIDs)]
		}

		shippingMethodID := ""
		if len(store.EcomShippingIDs) > 0 {
			shippingMethodID = store.EcomShippingIDs[i%len(store.EcomShippingIDs)]
		}

		paymentMethodID := ""
		if len(store.EcomPaymentIDs) > 0 {
			paymentMethodID = store.EcomPaymentIDs[i%len(store.EcomPaymentIDs)]
		}

		warehouseID := ""
		if len(store.SCMWarehouseIDs) > 0 {
			warehouseID = store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)]
		}

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

		orders[i] = &ecom.EcomOrder{
			OrderId:          fmt.Sprintf("eco-%03d", i+1),
			OrderNumber:      fmt.Sprintf("ORD-%06d", i+1),
			CustomerId:       customerID,
			Status:           orderStatus,
			PaymentStatus:    paymentStatuses[i%len(paymentStatuses)],
			OrderDate:        orderDate.Unix(),
			Subtotal:         &erp.Money{Amount: subtotal, CurrencyCode: "USD"},
			DiscountAmount:   &erp.Money{Amount: discountAmount, CurrencyCode: "USD"},
			ShippingAmount:   &erp.Money{Amount: shippingAmount, CurrencyCode: "USD"},
			TaxAmount:        &erp.Money{Amount: taxAmount, CurrencyCode: "USD"},
			TotalAmount:      &erp.Money{Amount: totalAmount, CurrencyCode: "USD"},
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
		}
	}
	return orders
}

// generateEcomOrderLines creates order line item records (2-3 lines per order)
func generateEcomOrderLines(store *MockDataStore) []*ecom.EcomOrderLine {
	count := len(store.EcomOrderIDs) * 3
	if count == 0 {
		count = 120
	}

	lines := make([]*ecom.EcomOrderLine, 0, count)
	idx := 1

	for oIdx, orderID := range store.EcomOrderIDs {
		linesPerOrder := rand.Intn(2) + 2 // 2-3 lines per order
		for j := 0; j < linesPerOrder; j++ {
			productID := ""
			if len(store.EcomProductIDs) > 0 {
				productID = store.EcomProductIDs[(oIdx*3+j)%len(store.EcomProductIDs)]
			}

			variantID := ""
			if len(store.EcomVariantIDs) > 0 {
				variantID = store.EcomVariantIDs[(oIdx*3+j)%len(store.EcomVariantIDs)]
			}

			productName := ecomProductNames[(oIdx*3+j)%len(ecomProductNames)]
			quantity := int32(rand.Intn(5) + 1)
			unitPrice := int64(rand.Intn(50000) + 1000) // $10 - $500
			discountAmount := int64(float64(unitPrice) * float64(quantity) * float64(rand.Intn(15)) / 100)
			taxAmount := int64((float64(unitPrice)*float64(quantity) - float64(discountAmount)) * 0.08)
			lineTotal := int64(unitPrice)*int64(quantity) - discountAmount + taxAmount

			lines = append(lines, &ecom.EcomOrderLine{
				LineId:         fmt.Sprintf("eol-%03d", idx),
				OrderId:        orderID,
				ProductId:      productID,
				VariantId:      variantID,
				Sku:            fmt.Sprintf("SKU-%05d", (oIdx*3+j)%99999+1),
				Name:           productName,
				Quantity:       quantity,
				UnitPrice:      &erp.Money{Amount: unitPrice, CurrencyCode: "USD"},
				DiscountAmount: &erp.Money{Amount: discountAmount, CurrencyCode: "USD"},
				TaxAmount:      &erp.Money{Amount: taxAmount, CurrencyCode: "USD"},
				LineTotal:      &erp.Money{Amount: lineTotal, CurrencyCode: "USD"},
				Weight:         float64(rand.Intn(500)+100) / 100.0, // 1.0 - 6.0 lbs
				IsGift:         idx%10 == 0,
				GiftMessage:    "",
				AuditInfo:      createAuditInfo(),
			})
			idx++
		}
	}
	return lines
}

// generateEcomOrderStatuses creates order status history records (2 entries per order)
func generateEcomOrderStatuses(store *MockDataStore) []*ecom.EcomOrderStatusHistory {
	statusProgression := []ecom.EcomOrderStatus{
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_PENDING,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_CONFIRMED,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_PROCESSING,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_SHIPPED,
		ecom.EcomOrderStatus_ECOM_ORDER_STATUS_DELIVERED,
	}

	count := len(store.EcomOrderIDs) * 2
	if count == 0 {
		count = 80
	}

	histories := make([]*ecom.EcomOrderStatusHistory, 0, count)
	idx := 1

	for oIdx, orderID := range store.EcomOrderIDs {
		orderDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))

		// Create 2 status transitions per order
		for j := 0; j < 2; j++ {
			prevStatusIdx := j
			newStatusIdx := j + 1
			if newStatusIdx >= len(statusProgression) {
				newStatusIdx = len(statusProgression) - 1
			}

			changedBy := ""
			if len(store.EmployeeIDs) > 0 {
				changedBy = store.EmployeeIDs[(oIdx*2+j)%len(store.EmployeeIDs)]
			}

			changedAt := orderDate.Add(time.Duration(j*24+rand.Intn(24)) * time.Hour)

			histories = append(histories, &ecom.EcomOrderStatusHistory{
				StatusId:       fmt.Sprintf("eosh-%03d", idx),
				OrderId:        orderID,
				PreviousStatus: statusProgression[prevStatusIdx],
				NewStatus:      statusProgression[newStatusIdx],
				ChangedAt:      changedAt.Unix(),
				ChangedBy:      changedBy,
				Notes:          fmt.Sprintf("Status updated to %s", statusProgression[newStatusIdx].String()),
				NotifyCustomer: j == 0, // Notify on first status change
				AuditInfo:      createAuditInfo(),
			})
			idx++
		}
	}
	return histories
}

// generateEcomReturns creates return/RMA request records (20% of orders)
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
		orderID := ""
		if len(store.EcomOrderIDs) > 0 {
			orderID = store.EcomOrderIDs[i%len(store.EcomOrderIDs)]
		}

		customerID := ""
		if len(store.EcomCustomerIDs) > 0 {
			customerID = store.EcomCustomerIDs[i%len(store.EcomCustomerIDs)]
		}

		approvedBy := ""
		if len(store.EmployeeIDs) > 0 {
			approvedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

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

		returns[i] = &ecom.EcomReturn{
			ReturnId:        fmt.Sprintf("ert-%03d", i+1),
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
			RefundAmount:    &erp.Money{Amount: refundAmount, CurrencyCode: "USD"},
			RefundMethod:    refundMethods[i%len(refundMethods)],
			ApprovedBy:      approvedBy,
			TrackingNumber:  trackingNumber,
			ShippingCarrier: ecomShippingCarriers[i%len(ecomShippingCarriers)],
			AuditInfo:       createAuditInfo(),
		}
	}
	return returns
}

// generateEcomReturnLines creates return line item records (1-2 lines per return)
func generateEcomReturnLines(store *MockDataStore) []*ecom.EcomReturnLine {
	returnReasons := []string{
		"Defective product",
		"Wrong item received",
		"Not as described",
		"Changed mind",
	}

	conditions := []string{
		"New", "Used", "Damaged", "Defective",
	}

	count := len(store.EcomReturnIDs) * 2
	if count == 0 {
		count = 16
	}

	lines := make([]*ecom.EcomReturnLine, 0, count)
	idx := 1

	for rIdx, returnID := range store.EcomReturnIDs {
		linesPerReturn := rand.Intn(2) + 1 // 1-2 lines per return
		for j := 0; j < linesPerReturn; j++ {
			orderLineID := ""
			if len(store.EcomOrderLineIDs) > 0 {
				orderLineID = store.EcomOrderLineIDs[(rIdx*2+j)%len(store.EcomOrderLineIDs)]
			}

			productID := ""
			if len(store.EcomProductIDs) > 0 {
				productID = store.EcomProductIDs[(rIdx*2+j)%len(store.EcomProductIDs)]
			}

			variantID := ""
			if len(store.EcomVariantIDs) > 0 {
				variantID = store.EcomVariantIDs[(rIdx*2+j)%len(store.EcomVariantIDs)]
			}

			productName := ecomProductNames[(rIdx*2+j)%len(ecomProductNames)]
			quantity := int32(rand.Intn(3) + 1)
			refundAmount := int64(rand.Intn(10000000) + 50000) // $500 - $100k

			lines = append(lines, &ecom.EcomReturnLine{
				LineId:       fmt.Sprintf("erl-%03d", idx),
				ReturnId:     returnID,
				OrderLineId:  orderLineID,
				ProductId:    productID,
				VariantId:    variantID,
				Sku:          fmt.Sprintf("SKU-%05d", (rIdx*2+j)%99999+1),
				Name:         productName,
				Quantity:     quantity,
				RefundAmount: &erp.Money{Amount: refundAmount, CurrencyCode: "USD"},
				Reason:       returnReasons[(rIdx*2+j)%len(returnReasons)],
				Condition:    conditions[(rIdx*2+j)%len(conditions)],
				Restock:      (rIdx*2+j)%3 != 0, // 2/3 get restocked
				AuditInfo:    createAuditInfo(),
			})
			idx++
		}
	}
	return lines
}
