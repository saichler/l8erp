/*
(C) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

// gen_lend_payments.go
// Generates:
// - LendPayment (20 records, with embedded allocations)
// - LendCollateral (12 records, with embedded valuations)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/lend"
)

// generateLendPayments creates payment records
func generateLendPayments(store *MockDataStore) []*lend.LendPayment {
	payStatuses := []lend.LendPaymentStatus{
		lend.LendPaymentStatus_LEND_PAYMENT_STATUS_APPLIED,
		lend.LendPaymentStatus_LEND_PAYMENT_STATUS_APPLIED,
		lend.LendPaymentStatus_LEND_PAYMENT_STATUS_APPLIED,
		lend.LendPaymentStatus_LEND_PAYMENT_STATUS_RECEIVED,
		lend.LendPaymentStatus_LEND_PAYMENT_STATUS_RECEIVED,
		lend.LendPaymentStatus_LEND_PAYMENT_STATUS_SCHEDULED,
		lend.LendPaymentStatus_LEND_PAYMENT_STATUS_SCHEDULED,
		lend.LendPaymentStatus_LEND_PAYMENT_STATUS_REVERSED,
		lend.LendPaymentStatus_LEND_PAYMENT_STATUS_FAILED,
	}

	payMethods := []lend.LendPaymentMethod{
		lend.LendPaymentMethod_LEND_PAYMENT_METHOD_ACH,
		lend.LendPaymentMethod_LEND_PAYMENT_METHOD_ACH,
		lend.LendPaymentMethod_LEND_PAYMENT_METHOD_AUTO_DEBIT,
		lend.LendPaymentMethod_LEND_PAYMENT_METHOD_WIRE,
		lend.LendPaymentMethod_LEND_PAYMENT_METHOD_CHECK,
	}

	count := 20
	payments := make([]*lend.LendPayment, count)

	for i := 0; i < count; i++ {
		status := payStatuses[i%len(payStatuses)]
		method := payMethods[i%len(payMethods)]
		payAmount := int64((rand.Intn(50) + 5) * 100000) // $5K-$55K cents
		dueDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		payDate := dueDate.AddDate(0, 0, rand.Intn(5)-2)
		isLate := payDate.After(dueDate)

		payment := &lend.LendPayment{
			PaymentId:       genID("lpay", i),
			PaymentNumber:   fmt.Sprintf("PMT-%06d", 400000+i),
			CustomerId:      pickRef(store.CustomerIDs, i),
			Status:          status,
			Amount:          money(store, payAmount),
			PaymentDate:     payDate.Unix(),
			DueDate:         dueDate.Unix(),
			PaymentMethod:   method,
			ReferenceNumber: fmt.Sprintf("PMT-REF-%06d", rand.Intn(999999)),
			BankAccountId:   pickRef(store.AccountIDs, i),
			IsExtraPayment:  i%7 == 0,
			IsLate:          isLate,
			Notes:           fmt.Sprintf("Payment %d", i+1),
			AuditInfo:       createAuditInfo(),
		}

		// Assign to either a loan or credit line
		if i%3 == 0 && len(store.CreditLineIDs) > 0 {
			payment.CreditLineId = pickRef(store.CreditLineIDs, i)
		} else {
			payment.LoanId = pickRef(store.LoanIDs, i)
		}

		if isLate {
			payment.LateFee = money(store, int64(rand.Intn(50000)+5000))
		}

		// Embed 1 payment allocation
		principalPct := 0.6 + float64(rand.Intn(20))/100.0
		principalAmt := int64(float64(payAmount) * principalPct)
		interestAmt := int64(float64(payAmount) * (1.0 - principalPct) * 0.8)
		feesAmt := int64(float64(payAmount) * (1.0 - principalPct) * 0.15)
		escrowAmt := payAmount - principalAmt - interestAmt - feesAmt

		payment.Allocations = []*lend.PaymentAllocation{
			{
				AllocationId: fmt.Sprintf("alloc-%03d-01", i+1),
				Principal:    money(store, principalAmt),
				Interest:     money(store, interestAmt),
				Fees:         money(store, feesAmt),
				Escrow:       money(store, escrowAmt),
			},
		}

		payments[i] = payment
	}
	return payments
}

// generateLendCollateral creates collateral records with embedded valuations
func generateLendCollateral(store *MockDataStore) []*lend.LendCollateral {
	colTypes := []lend.LendCollateralType{
		lend.LendCollateralType_LEND_COLLATERAL_TYPE_REAL_ESTATE,
		lend.LendCollateralType_LEND_COLLATERAL_TYPE_EQUIPMENT,
		lend.LendCollateralType_LEND_COLLATERAL_TYPE_INVENTORY,
		lend.LendCollateralType_LEND_COLLATERAL_TYPE_ACCOUNTS_RECEIVABLE,
		lend.LendCollateralType_LEND_COLLATERAL_TYPE_VEHICLE,
		lend.LendCollateralType_LEND_COLLATERAL_TYPE_SECURITIES,
		lend.LendCollateralType_LEND_COLLATERAL_TYPE_CASH_DEPOSIT,
		lend.LendCollateralType_LEND_COLLATERAL_TYPE_OTHER,
	}

	count := len(lendCollateralNames)
	collaterals := make([]*lend.LendCollateral, count)

	for i := 0; i < count; i++ {
		// 75% pledged, rest vary
		status := lend.LendCollateralStatus_LEND_COLLATERAL_STATUS_PLEDGED
		if i >= count*75/100 {
			statuses := []lend.LendCollateralStatus{
				lend.LendCollateralStatus_LEND_COLLATERAL_STATUS_RELEASED,
				lend.LendCollateralStatus_LEND_COLLATERAL_STATUS_SEIZED,
				lend.LendCollateralStatus_LEND_COLLATERAL_STATUS_LIQUIDATED,
			}
			status = statuses[(i-count*75/100)%len(statuses)]
		}

		pledgedValue := int64((rand.Intn(500) + 50) * 100000) // $50K-$5.5M cents
		currentValue := pledgedValue + int64(rand.Intn(2000000)-1000000)
		if currentValue < 0 {
			currentValue = pledgedValue / 2
		}

		pledgeDate := time.Now().AddDate(-rand.Intn(3), -rand.Intn(12), 0)

		col := &lend.LendCollateral{
			CollateralId:      genID("lcol", i),
			CustomerId:        pickRef(store.CustomerIDs, i),
			Name:              lendCollateralNames[i],
			Description:       fmt.Sprintf("Collateral: %s", lendCollateralNames[i]),
			CollateralType:    colTypes[i%len(colTypes)],
			Status:            status,
			PledgedValue:      money(store, pledgedValue),
			CurrentValue:      money(store, currentValue),
			SerialNumber:      fmt.Sprintf("SN-%08d", rand.Intn(99999999)),
			Location:          lendCollateralLocations[i%len(lendCollateralLocations)],
			InsurancePolicy:   fmt.Sprintf("POL-%06d", rand.Intn(999999)),
			PledgeDate:        pledgeDate.Unix(),
			LastValuationDate: time.Now().AddDate(0, -rand.Intn(6), 0).Unix(),
			Notes:             fmt.Sprintf("Collateral pledged for lending"),
			AuditInfo:         createAuditInfo(),
		}

		// Assign to either a loan or credit line
		if i%3 == 0 && len(store.CreditLineIDs) > 0 {
			col.CreditLineId = pickRef(store.CreditLineIDs, i)
		} else {
			col.LoanId = pickRef(store.LoanIDs, i)
		}

		if status == lend.LendCollateralStatus_LEND_COLLATERAL_STATUS_RELEASED {
			col.ReleaseDate = pledgeDate.AddDate(1, rand.Intn(12), 0).Unix()
		}

		// Embed 2-3 valuations
		valCount := 2 + rand.Intn(2)
		col.Valuations = make([]*lend.CollateralValuation, valCount)
		for j := 0; j < valCount; j++ {
			valDate := pledgeDate.AddDate(0, j*6, rand.Intn(15))
			valAmount := pledgedValue + int64(rand.Intn(2000000)-1000000)
			if valAmount < 0 {
				valAmount = pledgedValue / 2
			}
			col.Valuations[j] = &lend.CollateralValuation{
				ValuationId:    fmt.Sprintf("val-%03d-%02d", i+1, j+1),
				AppraisedValue: money(store, valAmount),
				ValuationDate:  valDate.Unix(),
				Appraiser:      lendAppraisers[j%len(lendAppraisers)],
				Notes:          fmt.Sprintf("Valuation #%d for %s", j+1, lendCollateralNames[i]),
			}
		}

		collaterals[i] = col
	}
	return collaterals
}
