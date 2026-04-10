/*
(C) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

// gen_lend_foundation.go
// Generates:
// - LendProduct (12 records)

import (
	"fmt"

	"github.com/saichler/l8erp/go/types/lend"
)

// generateLendProducts creates lending product definitions
func generateLendProducts(store *MockDataStore) []*lend.LendProduct {
	// Map product index to type: first 6 are the 6 types, rest cycle
	productTypes := []lend.LendProductType{
		lend.LendProductType_LEND_PRODUCT_TYPE_TERM_LOAN,
		lend.LendProductType_LEND_PRODUCT_TYPE_LINE_OF_CREDIT,
		lend.LendProductType_LEND_PRODUCT_TYPE_BRIDGE_LOAN,
		lend.LendProductType_LEND_PRODUCT_TYPE_EQUIPMENT_LOAN,
		lend.LendProductType_LEND_PRODUCT_TYPE_WORKING_CAPITAL,
		lend.LendProductType_LEND_PRODUCT_TYPE_SBA_LOAN,
	}

	interestTypes := []lend.LendInterestType{
		lend.LendInterestType_LEND_INTEREST_TYPE_FIXED,
		lend.LendInterestType_LEND_INTEREST_TYPE_VARIABLE,
		lend.LendInterestType_LEND_INTEREST_TYPE_FIXED,
		lend.LendInterestType_LEND_INTEREST_TYPE_FIXED,
		lend.LendInterestType_LEND_INTEREST_TYPE_VARIABLE,
		lend.LendInterestType_LEND_INTEREST_TYPE_HYBRID,
	}

	frequencies := []lend.LendFrequency{
		lend.LendFrequency_LEND_FREQUENCY_MONTHLY,
		lend.LendFrequency_LEND_FREQUENCY_MONTHLY,
		lend.LendFrequency_LEND_FREQUENCY_MONTHLY,
		lend.LendFrequency_LEND_FREQUENCY_MONTHLY,
		lend.LendFrequency_LEND_FREQUENCY_QUARTERLY,
		lend.LendFrequency_LEND_FREQUENCY_MONTHLY,
	}

	count := len(lendProductNames)
	products := make([]*lend.LendProduct, count)

	for i := 0; i < count; i++ {
		// 75% active, 17% draft, 8% discontinued
		status := lend.LendProductStatus_LEND_PRODUCT_STATUS_ACTIVE
		if i >= count*75/100 && i < count*92/100 {
			status = lend.LendProductStatus_LEND_PRODUCT_STATUS_DRAFT
		} else if i >= count*92/100 {
			status = lend.LendProductStatus_LEND_PRODUCT_STATUS_DISCONTINUED
		}

		baseRate := 4.5 + float64(i%5)*0.75
		minAmount := int64((i%5+1) * 1000000)  // $10K-$50K in cents
		maxAmount := int64((i%5+1) * 50000000) // $500K-$2.5M in cents

		products[i] = &lend.LendProduct{
			ProductId:                 genID("lprd", i),
			ProductCode:               lendProductCodes[i%len(lendProductCodes)],
			Name:                      lendProductNames[i],
			Description:               fmt.Sprintf("Lending product: %s", lendProductNames[i]),
			ProductType:               productTypes[i%len(productTypes)],
			Status:                    status,
			InterestType:              interestTypes[i%len(interestTypes)],
			BaseInterestRate:          baseRate,
			MaxInterestRate:           baseRate + 4.0,
			MinInterestRate:           baseRate - 1.5,
			MinLoanAmount:             money(store, minAmount),
			MaxLoanAmount:             money(store, maxAmount),
			MinTermMonths:             int32(6 + (i%4)*6),
			MaxTermMonths:             int32(60 + (i%4)*60),
			PaymentFrequency:          frequencies[i%len(frequencies)],
			OriginationFeePct:         0.5 + float64(i%4)*0.5,
			LateFeePct:               3.0 + float64(i%3),
			GracePeriodDays:           int32(10 + (i%3)*5),
			PrepaymentPenalty:         i%3 == 0,
			CollateralRequired:        i%2 == 0,
			MinCreditScore:            620 + float64(i%4)*20,
			GlReceivableAccountId:     pickRef(store.AccountIDs, i),
			GlInterestIncomeAccountId: pickRef(store.AccountIDs, i+1),
			GlFeeIncomeAccountId:      pickRef(store.AccountIDs, i+2),
			CurrencyId:                pickRef(store.CurrencyIDs, i),
			IsActive:                  status == lend.LendProductStatus_LEND_PRODUCT_STATUS_ACTIVE,
			AuditInfo:                 createAuditInfo(),
		}
	}
	return products
}
