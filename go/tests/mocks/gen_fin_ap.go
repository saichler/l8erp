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

	"github.com/saichler/l8erp/go/types/fin"
)

// generatePurchaseInvoices creates 30 purchase invoice records with embedded lines
func generatePurchaseInvoices(store *MockDataStore) []*fin.PurchaseInvoice {
	invoices := make([]*fin.PurchaseInvoice, 30)
	lineDescriptions := []string{
		"Office Supplies", "Consulting Services", "IT Equipment",
		"Software Licenses", "Maintenance Services", "Raw Materials",
		"Shipping & Freight", "Professional Services", "Utilities", "Marketing Materials",
	}
	expenseAccountStart := 8
	if expenseAccountStart >= len(store.AccountIDs) {
		expenseAccountStart = 0
	}

	statuses := []fin.InvoiceStatus{
		fin.InvoiceStatus_INVOICE_STATUS_APPROVED,
		fin.InvoiceStatus_INVOICE_STATUS_PARTIALLY_PAID,
		fin.InvoiceStatus_INVOICE_STATUS_PAID,
		fin.InvoiceStatus_INVOICE_STATUS_OVERDUE,
	}

	lineIdx := 1
	for i := 0; i < 30; i++ {
		vendorId := store.VendorIDs[i%len(store.VendorIDs)]
		invoiceDate := time.Date(2025, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)
		dueDate := invoiceDate.AddDate(0, 0, 30)
		status := statuses[i%len(statuses)]

		periodIdx := 12 + (i % 12)
		if periodIdx >= len(store.FiscalPeriodIDs) {
			periodIdx = len(store.FiscalPeriodIDs) - 1
		}

		subtotal := int64(rand.Intn(4900000)+100000) + 100
		taxAmount := subtotal * 7 / 100
		totalAmount := subtotal + taxAmount

		var amountPaid int64
		switch status {
		case fin.InvoiceStatus_INVOICE_STATUS_PAID:
			amountPaid = totalAmount
		case fin.InvoiceStatus_INVOICE_STATUS_PARTIALLY_PAID:
			amountPaid = totalAmount * int64(rand.Intn(70)+10) / 100
		}
		balanceDue := totalAmount - amountPaid

		apAccountIdx := 6
		if apAccountIdx >= len(store.AccountIDs) {
			apAccountIdx = len(store.AccountIDs) - 1
		}

		invoiceID := genID("pinv", i)

		// Generate embedded lines (3 per invoice)
		lines := make([]*fin.PurchaseInvoiceLine, 3)
		for lineNum := int32(1); lineNum <= 3; lineNum++ {
			quantity := float64(rand.Intn(100) + 1)
			unitPrice := int64(rand.Intn(499000) + 1000)
			lineAmount := int64(quantity) * unitPrice
			lineTax := lineAmount * 7 / 100

			accountIdx := expenseAccountStart + (lineIdx % (len(store.AccountIDs) - expenseAccountStart))
			if accountIdx >= len(store.AccountIDs) {
				accountIdx = expenseAccountStart
			}

			lines[lineNum-1] = &fin.PurchaseInvoiceLine{
				LineId:      fmt.Sprintf("piln-%04d", lineIdx),
				InvoiceId:   invoiceID,
				LineNumber:  lineNum,
				AccountId:   store.AccountIDs[accountIdx],
				Description: lineDescriptions[rand.Intn(len(lineDescriptions))],
				Quantity:    quantity,
				UnitPrice:   money(store, unitPrice),
				LineAmount:  money(store, lineAmount),
				TaxCodeId:   store.TaxCodeIDs[rand.Intn(len(store.TaxCodeIDs))],
				TaxAmount:   money(store, lineTax),
				AuditInfo:   createAuditInfo(),
			}
			lineIdx++
		}

		invoices[i] = &fin.PurchaseInvoice{
			InvoiceId:       invoiceID,
			InvoiceNumber:   fmt.Sprintf("PI-%06d", i+1),
			VendorId:        vendorId,
			InvoiceDate:     invoiceDate.Unix(),
			DueDate:         dueDate.Unix(),
			CurrencyId:      store.CurrencyIDs[0],
			FiscalPeriodId:  store.FiscalPeriodIDs[periodIdx],
			Status:          status,
			Subtotal:        money(store, subtotal),
			TaxAmount:       money(store, taxAmount),
			TotalAmount:     money(store, totalAmount),
			AmountPaid:      money(store, amountPaid),
			BalanceDue:      money(store, balanceDue),
			PaymentTermDays: 30,
			ApAccountId:     store.AccountIDs[apAccountIdx],
			Description:     fmt.Sprintf("Purchase Invoice from vendor %s", vendorId),
			AuditInfo:       createAuditInfo(),
			Lines:           lines,
		}
	}

	return invoices
}

// generatePaymentSchedules creates 1 schedule per invoice = 30 total
func generatePaymentSchedules(store *MockDataStore) []*fin.PaymentSchedule {
	schedules := make([]*fin.PaymentSchedule, 30)

	for i := 0; i < 30; i++ {
		invoiceId := store.PurchaseInvoiceIDs[i]
		vendorId := store.VendorIDs[i%len(store.VendorIDs)]

		scheduledDate := time.Date(2025, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC).AddDate(0, 0, 30)
		amount := int64(rand.Intn(4900000)+100000) + 100
		isPaid := (i % 4) == 2

		schedules[i] = &fin.PaymentSchedule{
			ScheduleId:    genID("psched", i),
			VendorId:      vendorId,
			InvoiceId:     invoiceId,
			ScheduledDate: scheduledDate.Unix(),
			Amount:        money(store, amount),
			IsPaid:        isPaid,
			Notes:         fmt.Sprintf("Payment schedule for invoice %s", invoiceId),
			AuditInfo:     createAuditInfo(),
		}
	}

	return schedules
}

// generateVendorPayments creates 20 vendor payment records with embedded allocations
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

		paymentID := genID("vpmt", i)
		invoiceId := store.PurchaseInvoiceIDs[i%len(store.PurchaseInvoiceIDs)]

		// Generate embedded allocation (1 per payment)
		var discountAmount int64
		if rand.Intn(3) == 0 {
			discountAmount = amount * int64(rand.Intn(3)+1) / 100
		}

		allocations := []*fin.PaymentAllocation{
			{
				AllocationId:    genID("palloc", i),
				PaymentId:       paymentID,
				InvoiceId:       invoiceId,
				AllocatedAmount: money(store, amount),
				DiscountTaken:   money(store, discountAmount),
				AuditInfo:       createAuditInfo(),
			},
		}

		payments[i] = &fin.VendorPayment{
			PaymentId:     paymentID,
			VendorId:      vendorId,
			PaymentDate:   paymentDate.Unix(),
			Amount:        money(store, amount),
			PaymentMethod: method,
			Status:        fin.PaymentStatus_PAYMENT_STATUS_COMPLETED,
			BankAccountId: store.BankAccountIDs[0],
			CheckNumber:   checkNumber,
			Reference:     fmt.Sprintf("REF-%06d", i+1),
			Notes:         fmt.Sprintf("Payment to vendor %s", vendorId),
			AuditInfo:     createAuditInfo(),
			Allocations:   allocations,
		}
	}

	return payments
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
			OpeningBalance: money(store, openingBalance),
			TotalInvoices:  money(store, totalInvoices),
			TotalPayments:  money(store, totalPayments),
			ClosingBalance: money(store, closingBalance),
			Notes:          fmt.Sprintf("Monthly statement for vendor %s", vendorId),
			AuditInfo:      createAuditInfo(),
		}
	}

	return statements
}
