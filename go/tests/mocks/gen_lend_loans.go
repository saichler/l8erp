/*
(C) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

// gen_lend_loans.go
// Generates:
// - Loan (10 records, with embedded disbursements, fees, amortization)
// - CreditLine (8 records, with embedded drawdowns, repayments)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/lend"
)

// generateLoans creates loan records with embedded child data
func generateLoans(store *MockDataStore) []*lend.Loan {
	loanStatuses := []lend.LoanStatus{
		lend.LoanStatus_LOAN_STATUS_ACTIVE,
		lend.LoanStatus_LOAN_STATUS_ACTIVE,
		lend.LoanStatus_LOAN_STATUS_ACTIVE,
		lend.LoanStatus_LOAN_STATUS_ACTIVE,
		lend.LoanStatus_LOAN_STATUS_PENDING,
		lend.LoanStatus_LOAN_STATUS_PENDING,
		lend.LoanStatus_LOAN_STATUS_DELINQUENT,
		lend.LoanStatus_LOAN_STATUS_PAID_OFF,
		lend.LoanStatus_LOAN_STATUS_CLOSED,
		lend.LoanStatus_LOAN_STATUS_RESTRUCTURED,
	}

	count := 10
	loans := make([]*lend.Loan, count)

	for i := 0; i < count; i++ {
		status := loanStatuses[i%len(loanStatuses)]
		origAmount := int64((rand.Intn(200) + 50) * 100000) // $50K-$2.5M cents
		termMonths := int32(12 + rand.Intn(49)*6)
		interestRate := 4.5 + float64(rand.Intn(50))/10.0
		origDate := time.Now().AddDate(-rand.Intn(3), -rand.Intn(12), 0)
		maturityDate := origDate.AddDate(0, int(termMonths), 0)
		paymentsMade := int32(rand.Intn(int(termMonths)))
		paymentsRemaining := termMonths - paymentsMade

		// Calculate outstanding amounts
		paidRatio := float64(paymentsMade) / float64(termMonths)
		outPrincipal := int64(float64(origAmount) * (1.0 - paidRatio))
		outInterest := int64(float64(origAmount) * interestRate / 100.0 / 12.0)
		outFees := int64(rand.Intn(50000))

		loan := &lend.Loan{
			LoanId:               genID("loan", i),
			LoanNumber:           fmt.Sprintf("LN-%06d", 200000+i),
			ProductId:            pickRef(store.LendProductIDs, i),
			ApplicationId:        pickRef(store.LendApplicationIDs, i),
			CustomerId:           pickRef(store.CustomerIDs, i),
			Status:               status,
			OriginalAmount:       money(store, origAmount),
			OutstandingPrincipal: money(store, outPrincipal),
			OutstandingInterest:  money(store, outInterest),
			OutstandingFees:      money(store, outFees),
			TotalBalance:         money(store, outPrincipal+outInterest+outFees),
			InterestRate:         interestRate,
			InterestType:         lend.LendInterestType_LEND_INTEREST_TYPE_FIXED,
			PaymentFrequency:     lend.LendFrequency_LEND_FREQUENCY_MONTHLY,
			PaymentAmount:        money(store, origAmount/int64(termMonths)+outInterest),
			TermMonths:           termMonths,
			OriginationDate:      origDate.Unix(),
			MaturityDate:         maturityDate.Unix(),
			FirstPaymentDate:     origDate.AddDate(0, 1, 0).Unix(),
			NextPaymentDate:      time.Now().AddDate(0, 0, rand.Intn(30)).Unix(),
			PaymentsMade:         paymentsMade,
			PaymentsRemaining:    paymentsRemaining,
			LoanOfficerId:        pickRef(store.EmployeeIDs, i),
			BankAccountId:        pickRef(store.AccountIDs, i),
			GlReceivableAccountId: pickRef(store.AccountIDs, i+1),
			CurrencyId:           pickRef(store.CurrencyIDs, i),
			AuditInfo:            createAuditInfo(),
		}

		if paymentsMade > 0 {
			loan.LastPaymentDate = time.Now().AddDate(0, 0, -rand.Intn(30)-1).Unix()
		}
		if status == lend.LoanStatus_LOAN_STATUS_DELINQUENT {
			loan.DaysPastDue = int32(rand.Intn(90) + 30)
		}

		// Embed 1-2 disbursements
		disbCount := 1 + rand.Intn(2)
		loan.Disbursements = make([]*lend.LoanDisbursement, disbCount)
		for j := 0; j < disbCount; j++ {
			disbAmount := origAmount / int64(disbCount)
			loan.Disbursements[j] = &lend.LoanDisbursement{
				DisbursementId:   fmt.Sprintf("disb-%03d-%02d", i+1, j+1),
				Amount:           money(store, disbAmount),
				DisbursementDate: origDate.AddDate(0, 0, j*7).Unix(),
				Status:           lend.LendDisbursementStatus_LEND_DISBURSEMENT_STATUS_COMPLETED,
				BankAccountId:    pickRef(store.AccountIDs, i),
				ReferenceNumber:  fmt.Sprintf("DISB-REF-%06d", rand.Intn(999999)),
				Notes:            fmt.Sprintf("Disbursement %d of %d", j+1, disbCount),
			}
		}

		// Embed 1-2 fees
		feeCount := 1 + rand.Intn(2)
		feeTypes := []lend.LendFeeType{
			lend.LendFeeType_LEND_FEE_TYPE_ORIGINATION,
			lend.LendFeeType_LEND_FEE_TYPE_SERVICE,
			lend.LendFeeType_LEND_FEE_TYPE_APPRAISAL,
		}
		loan.Fees = make([]*lend.LoanFee, feeCount)
		for j := 0; j < feeCount; j++ {
			feeAmount := int64(rand.Intn(500000) + 50000)
			loan.Fees[j] = &lend.LoanFee{
				FeeId:        fmt.Sprintf("fee-%03d-%02d", i+1, j+1),
				FeeType:      feeTypes[j%len(feeTypes)],
				Amount:       money(store, feeAmount),
				AssessedDate: origDate.AddDate(0, 0, j*30).Unix(),
				PaidDate:     origDate.AddDate(0, 0, j*30+5).Unix(),
				IsPaid:       true,
				Description:  fmt.Sprintf("Fee: %s", feeTypes[j%len(feeTypes)].String()),
			}
		}

		// Embed 3-6 amortization lines
		amortCount := minInt(int(termMonths), 3+rand.Intn(4))
		loan.AmortizationSchedule = make([]*lend.LoanAmortizationLine, amortCount)
		remaining := origAmount
		for j := 0; j < amortCount; j++ {
			principal := origAmount / int64(termMonths)
			interest := remaining * int64(interestRate*100) / 100 / 12 / 100
			payment := principal + interest
			remaining -= principal

			loan.AmortizationSchedule[j] = &lend.LoanAmortizationLine{
				PeriodNumber:     int32(j + 1),
				DueDate:          origDate.AddDate(0, j+1, 0).Unix(),
				PaymentAmount:    money(store, payment),
				PrincipalAmount:  money(store, principal),
				InterestAmount:   money(store, interest),
				RemainingBalance: money(store, remaining),
				IsPaid:           j < int(paymentsMade),
			}
		}

		loans[i] = loan
	}
	return loans
}

// generateCreditLines creates credit line records with embedded child data
func generateCreditLines(store *MockDataStore) []*lend.CreditLine {
	clStatuses := []lend.CreditLineStatus{
		lend.CreditLineStatus_CREDIT_LINE_STATUS_ACTIVE,
		lend.CreditLineStatus_CREDIT_LINE_STATUS_ACTIVE,
		lend.CreditLineStatus_CREDIT_LINE_STATUS_ACTIVE,
		lend.CreditLineStatus_CREDIT_LINE_STATUS_ACTIVE,
		lend.CreditLineStatus_CREDIT_LINE_STATUS_PENDING,
		lend.CreditLineStatus_CREDIT_LINE_STATUS_FROZEN,
		lend.CreditLineStatus_CREDIT_LINE_STATUS_CLOSED,
		lend.CreditLineStatus_CREDIT_LINE_STATUS_EXPIRED,
	}

	count := 8
	creditLines := make([]*lend.CreditLine, count)

	for i := 0; i < count; i++ {
		status := clStatuses[i%len(clStatuses)]
		creditLimit := int64((rand.Intn(100) + 25) * 100000) // $25K-$1.25M cents
		outstandingPct := float64(rand.Intn(70)+10) / 100.0
		outstanding := int64(float64(creditLimit) * outstandingPct)
		available := creditLimit - outstanding
		interestRate := 5.0 + float64(rand.Intn(80))/10.0
		accrued := int64(float64(outstanding) * interestRate / 100.0 / 12.0)
		openDate := time.Now().AddDate(-rand.Intn(3), -rand.Intn(12), 0)
		expDate := openDate.AddDate(3, 0, 0)

		cl := &lend.CreditLine{
			CreditLineId:          genID("cln", i),
			CreditLineNumber:      fmt.Sprintf("CL-%06d", 300000+i),
			ProductId:             pickRef(store.LendProductIDs, i+2),
			ApplicationId:         pickRef(store.LendApplicationIDs, i+3),
			CustomerId:            pickRef(store.CustomerIDs, i+2),
			Status:                status,
			CreditLimit:           money(store, creditLimit),
			AvailableBalance:      money(store, available),
			OutstandingBalance:    money(store, outstanding),
			AccruedInterest:       money(store, accrued),
			InterestRate:          interestRate,
			InterestType:          lend.LendInterestType_LEND_INTEREST_TYPE_VARIABLE,
			PaymentFrequency:      lend.LendFrequency_LEND_FREQUENCY_MONTHLY,
			MinimumPayment:        money(store, outstanding/20),
			OpeningDate:           openDate.Unix(),
			ExpirationDate:        expDate.Unix(),
			NextPaymentDate:       time.Now().AddDate(0, 0, rand.Intn(30)).Unix(),
			LastActivityDate:      time.Now().AddDate(0, 0, -rand.Intn(60)).Unix(),
			LoanOfficerId:         pickRef(store.EmployeeIDs, i+3),
			BankAccountId:         pickRef(store.AccountIDs, i+2),
			GlReceivableAccountId: pickRef(store.AccountIDs, i+3),
			CurrencyId:            pickRef(store.CurrencyIDs, i),
			AuditInfo:             createAuditInfo(),
		}

		if status == lend.CreditLineStatus_CREDIT_LINE_STATUS_FROZEN {
			cl.DaysPastDue = int32(rand.Intn(60) + 15)
		}

		// Embed 2-4 drawdowns
		ddCount := 2 + rand.Intn(3)
		cl.Drawdowns = make([]*lend.CreditLineDrawdown, ddCount)
		for j := 0; j < ddCount; j++ {
			ddAmount := int64(rand.Intn(int(creditLimit/3)) + 100000)
			cl.Drawdowns[j] = &lend.CreditLineDrawdown{
				DrawdownId:      fmt.Sprintf("dd-%03d-%02d", i+1, j+1),
				Amount:          money(store, ddAmount),
				DrawdownDate:    openDate.AddDate(0, j+1, rand.Intn(15)).Unix(),
				Purpose:         lendPurposes[(i+j)%len(lendPurposes)],
				ReferenceNumber: fmt.Sprintf("DD-REF-%06d", rand.Intn(999999)),
			}
		}

		// Embed 1-3 repayments
		rpCount := 1 + rand.Intn(3)
		cl.Repayments = make([]*lend.CreditLineRepayment, rpCount)
		for j := 0; j < rpCount; j++ {
			rpAmount := int64(rand.Intn(int(creditLimit/4)) + 50000)
			cl.Repayments[j] = &lend.CreditLineRepayment{
				RepaymentId:     fmt.Sprintf("rp-%03d-%02d", i+1, j+1),
				Amount:          money(store, rpAmount),
				RepaymentDate:   openDate.AddDate(0, j+2, rand.Intn(15)).Unix(),
				ReferenceNumber: fmt.Sprintf("RP-REF-%06d", rand.Intn(999999)),
			}
		}

		creditLines[i] = cl
	}
	return creditLines
}
