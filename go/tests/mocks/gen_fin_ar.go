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

// generateSalesInvoices creates 40 sales invoice records with embedded lines
func generateSalesInvoices(store *MockDataStore) []*fin.SalesInvoice {
	invoices := make([]*fin.SalesInvoice, 40)
	descriptions := []string{"Software License", "Consulting Services", "Support Contract"}
	statuses := []fin.InvoiceStatus{
		fin.InvoiceStatus_INVOICE_STATUS_APPROVED,
		fin.InvoiceStatus_INVOICE_STATUS_PARTIALLY_PAID,
		fin.InvoiceStatus_INVOICE_STATUS_PAID,
		fin.InvoiceStatus_INVOICE_STATUS_OVERDUE,
	}

	lineIdx := 1
	for i := 0; i < 40; i++ {
		custIdx := i % len(store.CustomerIDs)
		periodIdx := 12 + (i % 12)
		if periodIdx >= len(store.FiscalPeriodIDs) {
			periodIdx = i % len(store.FiscalPeriodIDs)
		}
		status := statuses[i%len(statuses)]

		invoiceDate := time.Date(2025, time.Month(i%12+1), (i%28)+1, 0, 0, 0, 0, time.UTC)
		dueDate := invoiceDate.AddDate(0, 0, 30)

		subtotal := int64(rand.Intn(98001)+2000) * 100
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

		arAccountIdx := 1
		if arAccountIdx >= len(store.AccountIDs) {
			arAccountIdx = 0
		}

		invoiceID := fmt.Sprintf("sinv-%04d", i+1)

		// Generate embedded lines (3 per invoice)
		lines := make([]*fin.SalesInvoiceLine, 3)
		for lineNum := 1; lineNum <= 3; lineNum++ {
			quantity := float64(rand.Intn(50) + 1)
			unitPrice := int64(rand.Intn(9901)+100) * 100
			lineAmount := int64(quantity) * unitPrice
			lineTax := lineAmount * 7 / 100

			lines[lineNum-1] = &fin.SalesInvoiceLine{
				LineId:      fmt.Sprintf("siln-%04d", lineIdx),
				InvoiceId:   invoiceID,
				LineNumber:  int32(lineNum),
				AccountId:   store.AccountIDs[rand.Intn(len(store.AccountIDs))],
				Description: descriptions[lineNum-1],
				Quantity:    quantity,
				UnitPrice:   money(store, unitPrice),
				LineAmount:  money(store, lineAmount),
				TaxCodeId:   store.TaxCodeIDs[rand.Intn(len(store.TaxCodeIDs))],
				TaxAmount:   money(store, lineTax),
				AuditInfo:   createAuditInfo(),
			}
			lineIdx++
		}

		invoices[i] = &fin.SalesInvoice{
			InvoiceId:       invoiceID,
			InvoiceNumber:   fmt.Sprintf("SI-%06d", i+1),
			CustomerId:      store.CustomerIDs[custIdx],
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
			ArAccountId:     store.AccountIDs[arAccountIdx],
			SalesOrderId:    pickRef(store.SalesOrderIDs, i),
			DeliveryOrderId: pickRef(store.SalesDeliveryOrderIDs, i),
			Description:     fmt.Sprintf("Sales Invoice for Customer %s", store.CustomerIDs[custIdx]),
			AuditInfo:       createAuditInfo(),
			Lines:           lines,
		}
	}

	return invoices
}

// generateCustomerPayments creates 30 customer payment records with embedded applications
func generateCustomerPayments(store *MockDataStore) []*fin.CustomerPayment {
	payments := make([]*fin.CustomerPayment, 30)
	methods := []fin.PaymentMethod{
		fin.PaymentMethod_PAYMENT_METHOD_ACH,
		fin.PaymentMethod_PAYMENT_METHOD_CHECK,
		fin.PaymentMethod_PAYMENT_METHOD_WIRE,
		fin.PaymentMethod_PAYMENT_METHOD_CREDIT_CARD,
	}

	bankAccountId := ""
	if len(store.BankAccountIDs) > 0 {
		bankAccountId = store.BankAccountIDs[0]
	}

	for i := 0; i < 30; i++ {
		custIdx := i % len(store.CustomerIDs)
		paymentDate := time.Now().AddDate(0, 0, -rand.Intn(90))
		amount := int64(rand.Intn(98001)+2000) * 100
		method := methods[i%len(methods)]

		checkNum := ""
		if method == fin.PaymentMethod_PAYMENT_METHOD_CHECK {
			checkNum = fmt.Sprintf("%06d", rand.Intn(999999)+1)
		}

		paymentID := fmt.Sprintf("cpmt-%04d", i+1)
		invoiceIdx := i % len(store.SalesInvoiceIDs)

		// Generate embedded payment application (1 per payment)
		appliedAmount := int64(rand.Intn(98001)+2000) * 100
		discountTaken := int64(0)
		if rand.Intn(4) == 0 {
			discountTaken = appliedAmount * int64(rand.Intn(3)+1) / 100
		}

		applications := []*fin.PaymentApplication{
			{
				ApplicationId: fmt.Sprintf("papp-%04d", i+1),
				PaymentId:     paymentID,
				InvoiceId:     store.SalesInvoiceIDs[invoiceIdx],
				AppliedAmount: money(store, appliedAmount),
				DiscountTaken: money(store, discountTaken),
				AuditInfo:     createAuditInfo(),
			},
		}

		payments[i] = &fin.CustomerPayment{
			PaymentId:     paymentID,
			CustomerId:    store.CustomerIDs[custIdx],
			PaymentDate:   paymentDate.Unix(),
			Amount:        money(store, amount),
			PaymentMethod: method,
			Status:        fin.PaymentStatus_PAYMENT_STATUS_COMPLETED,
			BankAccountId: bankAccountId,
			CheckNumber:   checkNum,
			Reference:     fmt.Sprintf("PAY-REF-%04d", i+1),
			AuditInfo:     createAuditInfo(),
			Applications:  applications,
		}
	}

	return payments
}

// generateCreditMemos creates 5 credit memo records
func generateCreditMemos(store *MockDataStore) []*fin.CreditMemo {
	memos := make([]*fin.CreditMemo, 5)
	reasons := []string{
		"Product return", "Service credit", "Billing error",
		"Loyalty discount", "Volume adjustment",
	}

	for i := 0; i < 5; i++ {
		custIdx := i % len(store.CustomerIDs)
		invoiceIdx := i % len(store.SalesInvoiceIDs)
		amount := int64(rand.Intn(4501)+500) * 100

		memos[i] = &fin.CreditMemo{
			CreditMemoId:      genID("cmemo", i),
			MemoNumber:        fmt.Sprintf("CM-%06d", i+1),
			CustomerId:        store.CustomerIDs[custIdx],
			OriginalInvoiceId: store.SalesInvoiceIDs[invoiceIdx],
			MemoDate:          time.Now().Unix(),
			Amount:            money(store, amount),
			Status:            fin.CreditMemoStatus_CREDIT_MEMO_STATUS_APPROVED,
			Reason:            reasons[i],
			Description:       fmt.Sprintf("Credit memo: %s", reasons[i]),
			AuditInfo:         createAuditInfo(),
		}
	}

	return memos
}

// generateDunningLetters creates 5 dunning letter records
func generateDunningLetters(store *MockDataStore) []*fin.DunningLetter {
	letters := make([]*fin.DunningLetter, 5)
	levels := []fin.DunningLevel{
		fin.DunningLevel_DUNNING_LEVEL_REMINDER,
		fin.DunningLevel_DUNNING_LEVEL_FIRST_NOTICE,
		fin.DunningLevel_DUNNING_LEVEL_SECOND_NOTICE,
		fin.DunningLevel_DUNNING_LEVEL_FINAL_NOTICE,
		fin.DunningLevel_DUNNING_LEVEL_COLLECTION,
	}

	for i := 0; i < 5; i++ {
		custIdx := i % len(store.CustomerIDs)
		daysOverdue := int32(30 + rand.Intn(91))

		letterDate := time.Now().AddDate(0, 0, -rand.Intn(30))
		dueDate := time.Now().AddDate(0, 0, -int(daysOverdue))
		totalOverdue := int64(rand.Intn(98001)+2000) * 100

		numInvoices := rand.Intn(3) + 1
		invoiceIDs := make([]string, numInvoices)
		for j := 0; j < numInvoices; j++ {
			invIdx := (i*3 + j) % len(store.SalesInvoiceIDs)
			invoiceIDs[j] = store.SalesInvoiceIDs[invIdx]
		}

		isSent := i < 3
		var sentDate int64
		if isSent {
			sentDate = letterDate.Unix()
		}

		letters[i] = &fin.DunningLetter{
			LetterId:     genID("dunl", i),
			CustomerId:   store.CustomerIDs[custIdx],
			DunningLevel: levels[i],
			LetterDate:   letterDate.Unix(),
			DueDate:      dueDate.Unix(),
			TotalOverdue: money(store, totalOverdue),
			DaysOverdue:  daysOverdue,
			InvoiceIds:   invoiceIDs,
			IsSent:       isSent,
			SentDate:     sentDate,
			Notes:        fmt.Sprintf("Dunning notice level %d for overdue invoices", i+1),
			AuditInfo:    createAuditInfo(),
		}
	}

	return letters
}
