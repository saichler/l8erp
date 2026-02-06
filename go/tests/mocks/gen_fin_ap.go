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

	"github.com/saichler/l8erp/go/types/fin"
)

// generatePurchaseInvoices creates 30 purchase invoice records
func generatePurchaseInvoices(store *MockDataStore) []*fin.PurchaseInvoice {
	invoices := make([]*fin.PurchaseInvoice, 30)

	statuses := []fin.InvoiceStatus{
		fin.InvoiceStatus_INVOICE_STATUS_APPROVED,
		fin.InvoiceStatus_INVOICE_STATUS_PARTIALLY_PAID,
		fin.InvoiceStatus_INVOICE_STATUS_PAID,
		fin.InvoiceStatus_INVOICE_STATUS_OVERDUE,
	}

	for i := 0; i < 30; i++ {
		vendorId := store.VendorIDs[i%len(store.VendorIDs)]
		invoiceDate := time.Date(2025, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)
		dueDate := invoiceDate.AddDate(0, 0, 30)
		status := statuses[i%len(statuses)]

		// Fiscal period: 2025 periods are at indices 12-23
		periodIdx := 12 + (i % 12)
		if periodIdx >= len(store.FiscalPeriodIDs) {
			periodIdx = len(store.FiscalPeriodIDs) - 1
		}

		subtotal := int64(rand.Intn(4900000)+100000) + 100 // 1000_00 to 50000_00 cents
		taxAmount := subtotal * 7 / 100
		totalAmount := subtotal + taxAmount

		var amountPaid int64
		switch status {
		case fin.InvoiceStatus_INVOICE_STATUS_PAID:
			amountPaid = totalAmount
		case fin.InvoiceStatus_INVOICE_STATUS_PARTIALLY_PAID:
			amountPaid = totalAmount * int64(rand.Intn(70)+10) / 100
		case fin.InvoiceStatus_INVOICE_STATUS_APPROVED:
			amountPaid = 0
		case fin.InvoiceStatus_INVOICE_STATUS_OVERDUE:
			amountPaid = 0
		}
		balanceDue := totalAmount - amountPaid

		// AP account is typically at index 6
		apAccountIdx := 6
		if apAccountIdx >= len(store.AccountIDs) {
			apAccountIdx = len(store.AccountIDs) - 1
		}

		invoices[i] = &fin.PurchaseInvoice{
			InvoiceId:      genID("pinv", i),
			InvoiceNumber:  fmt.Sprintf("PI-%06d", i+1),
			VendorId:       vendorId,
			InvoiceDate:    invoiceDate.Unix(),
			DueDate:        dueDate.Unix(),
			CurrencyId:     store.CurrencyIDs[0],
			FiscalPeriodId: store.FiscalPeriodIDs[periodIdx],
			Status:         status,
			Subtotal:       money(subtotal),
			TaxAmount:      money(taxAmount),
			TotalAmount:    money(totalAmount),
			AmountPaid:     money(amountPaid),
			BalanceDue:     money(balanceDue),
			PaymentTermDays: 30,
			ApAccountId:    store.AccountIDs[apAccountIdx],
			Description:    fmt.Sprintf("Purchase Invoice from vendor %s", vendorId),
			AuditInfo:      createAuditInfo(),
		}
	}

	return invoices
}

// generatePurchaseInvoiceLines creates 3 lines per invoice = 90 total
func generatePurchaseInvoiceLines(store *MockDataStore) []*fin.PurchaseInvoiceLine {
	lines := make([]*fin.PurchaseInvoiceLine, 0, 90)

	descriptions := []string{
		"Office Supplies",
		"Consulting Services",
		"IT Equipment",
		"Software Licenses",
		"Maintenance Services",
		"Raw Materials",
		"Shipping & Freight",
		"Professional Services",
		"Utilities",
		"Marketing Materials",
	}

	// Expense accounts are typically in the higher indices
	expenseAccountStart := 8
	if expenseAccountStart >= len(store.AccountIDs) {
		expenseAccountStart = 0
	}

	idx := 1
	for i := 0; i < len(store.PurchaseInvoiceIDs); i++ {
		invoiceId := store.PurchaseInvoiceIDs[i]
		for lineNum := int32(1); lineNum <= 3; lineNum++ {
			quantity := float64(rand.Intn(100) + 1)
			unitPrice := int64(rand.Intn(499000)+1000) // 10_00 to 5000_00 cents
			lineAmount := int64(quantity) * unitPrice
			taxAmount := lineAmount * 7 / 100

			accountIdx := expenseAccountStart + (idx % (len(store.AccountIDs) - expenseAccountStart))
			if accountIdx >= len(store.AccountIDs) {
				accountIdx = expenseAccountStart
			}

			lines = append(lines, &fin.PurchaseInvoiceLine{
				LineId:      fmt.Sprintf("piln-%04d", idx),
				InvoiceId:   invoiceId,
				LineNumber:  lineNum,
				AccountId:   store.AccountIDs[accountIdx],
				Description: descriptions[rand.Intn(len(descriptions))],
				Quantity:    quantity,
				UnitPrice:   money(unitPrice),
				LineAmount:  money(lineAmount),
				TaxCodeId:   store.TaxCodeIDs[rand.Intn(len(store.TaxCodeIDs))],
				TaxAmount:   money(taxAmount),
				AuditInfo:   createAuditInfo(),
			})
			idx++
		}
	}

	return lines
}

// generatePaymentSchedules creates 1 schedule per invoice = 30 total
func generatePaymentSchedules(store *MockDataStore) []*fin.PaymentSchedule {
	schedules := make([]*fin.PaymentSchedule, 30)

	for i := 0; i < 30; i++ {
		invoiceId := store.PurchaseInvoiceIDs[i]
		vendorId := store.VendorIDs[i%len(store.VendorIDs)]

		// Schedule date = invoice date + 30 days (due date)
		scheduledDate := time.Date(2025, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC).AddDate(0, 0, 30)
		amount := int64(rand.Intn(4900000)+100000) + 100

		// Determine if paid based on invoice index matching status pattern
		// Statuses cycle: APPROVED, PARTIALLY_PAID, PAID, OVERDUE
		isPaid := (i % 4) == 2 // PAID status

		schedules[i] = &fin.PaymentSchedule{
			ScheduleId:    genID("psched", i),
			VendorId:      vendorId,
			InvoiceId:     invoiceId,
			ScheduledDate: scheduledDate.Unix(),
			Amount:        money(amount),
			IsPaid:        isPaid,
			Notes:         fmt.Sprintf("Payment schedule for invoice %s", invoiceId),
			AuditInfo:     createAuditInfo(),
		}
	}

	return schedules
}

// generateVendorPayments creates 20 vendor payment records
func generateVendorPayments(store *MockDataStore) []*fin.VendorPayment {
	payments := make([]*fin.VendorPayment, 20)

	methods := []fin.PaymentMethod{
		fin.PaymentMethod_PAYMENT_METHOD_ACH,
		fin.PaymentMethod_PAYMENT_METHOD_CHECK,
		fin.PaymentMethod_PAYMENT_METHOD_WIRE,
	}

	for i := 0; i < 20; i++ {
		vendorId := store.VendorIDs[i%len(store.VendorIDs)]
		paymentDate := time.Now().AddDate(0, 0, -rand.Intn(90))
		amount := int64(rand.Intn(4900000)+100000) + 100
		method := methods[i%len(methods)]

		checkNumber := ""
		if method == fin.PaymentMethod_PAYMENT_METHOD_CHECK {
			checkNumber = fmt.Sprintf("CHK-%06d", rand.Intn(999999)+1)
		}

		payments[i] = &fin.VendorPayment{
			PaymentId:     genID("vpmt", i),
			VendorId:      vendorId,
			PaymentDate:   paymentDate.Unix(),
			Amount:        money(amount),
			PaymentMethod: method,
			Status:        fin.PaymentStatus_PAYMENT_STATUS_COMPLETED,
			BankAccountId: store.BankAccountIDs[0],
			CheckNumber:   checkNumber,
			Reference:     fmt.Sprintf("REF-%06d", i+1),
			Notes:         fmt.Sprintf("Payment to vendor %s", vendorId),
			AuditInfo:     createAuditInfo(),
		}
	}

	return payments
}

// generatePaymentAllocations creates 1 allocation per payment = 20 total
func generatePaymentAllocations(store *MockDataStore) []*fin.PaymentAllocation {
	allocations := make([]*fin.PaymentAllocation, 20)

	for i := 0; i < 20; i++ {
		paymentId := store.VendorPaymentIDs[i]
		invoiceId := store.PurchaseInvoiceIDs[i%len(store.PurchaseInvoiceIDs)]
		amount := int64(rand.Intn(4900000)+100000) + 100

		// Discount: 0 or small amount
		var discountAmount int64
		if rand.Intn(3) == 0 {
			discountAmount = amount * int64(rand.Intn(3)+1) / 100
		}

		allocations[i] = &fin.PaymentAllocation{
			AllocationId:    genID("palloc", i),
			PaymentId:       paymentId,
			InvoiceId:       invoiceId,
			AllocatedAmount: money(amount),
			DiscountTaken:   money(discountAmount),
			AuditInfo:       createAuditInfo(),
		}
	}

	return allocations
}

// generateVendorStatements creates 1 statement per vendor = 15 total
func generateVendorStatements(store *MockDataStore) []*fin.VendorStatement {
	statements := make([]*fin.VendorStatement, 15)

	now := time.Now()
	periodStart := time.Date(now.Year(), now.Month()-1, 1, 0, 0, 0, 0, time.UTC)
	periodEnd := periodStart.AddDate(0, 1, -1)

	for i := 0; i < 15; i++ {
		vendorId := store.VendorIDs[i%len(store.VendorIDs)]
		openingBalance := int64(rand.Intn(5000000) + 100000)
		totalInvoices := int64(rand.Intn(3000000) + 50000)
		totalPayments := int64(rand.Intn(2500000) + 50000)
		closingBalance := openingBalance + totalInvoices - totalPayments

		statements[i] = &fin.VendorStatement{
			StatementId:    genID("vstmt", i),
			VendorId:       vendorId,
			StatementDate:  now.Unix(),
			PeriodStart:    periodStart.Unix(),
			PeriodEnd:      periodEnd.Unix(),
			OpeningBalance: money(openingBalance),
			TotalInvoices:  money(totalInvoices),
			TotalPayments:  money(totalPayments),
			ClosingBalance: money(closingBalance),
			Notes:          fmt.Sprintf("Monthly statement for vendor %s", vendorId),
			AuditInfo:      createAuditInfo(),
		}
	}

	return statements
}
