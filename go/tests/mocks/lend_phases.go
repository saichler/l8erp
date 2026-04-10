/*
(C) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

// lend_phases.go
// LEND Module ServiceArea = 130
// Phase orchestration for Lending module mock data generation

import (
	"fmt"

	"github.com/saichler/l8erp/go/types/lend"
)

// generateLendPhase1 generates foundation objects (LendProduct)
func generateLendPhase1(client *HCMClient, store *MockDataStore) error {
	products := generateLendProducts(store)
	_, err := client.Post("/erp/130/LendProd", &lend.LendProductList{List: products})
	if err != nil {
		return fmt.Errorf("failed to create LendProducts: %w", err)
	}
	for _, p := range products {
		store.LendProductIDs = append(store.LendProductIDs, p.ProductId)
	}
	fmt.Printf("  Created %d LendProducts\n", len(products))
	return nil
}

// generateLendPhase2 generates applications (depend on products, customers)
func generateLendPhase2(client *HCMClient, store *MockDataStore) error {
	applications := generateLendApplications(store)
	_, err := client.Post("/erp/130/LendApp", &lend.LendApplicationList{List: applications})
	if err != nil {
		return fmt.Errorf("failed to create LendApplications: %w", err)
	}
	for _, a := range applications {
		store.LendApplicationIDs = append(store.LendApplicationIDs, a.ApplicationId)
	}
	fmt.Printf("  Created %d LendApplications (with embedded documents)\n", len(applications))
	return nil
}

// generateLendPhase3 generates loans and credit lines (depend on products, applications)
func generateLendPhase3(client *HCMClient, store *MockDataStore) error {
	loans := generateLoans(store)
	_, err := client.Post("/erp/130/LendLoan", &lend.LoanList{List: loans})
	if err != nil {
		return fmt.Errorf("failed to create Loans: %w", err)
	}
	for _, l := range loans {
		store.LoanIDs = append(store.LoanIDs, l.LoanId)
	}
	fmt.Printf("  Created %d Loans (with embedded disbursements, fees, amortization)\n", len(loans))

	creditLines := generateCreditLines(store)
	_, err = client.Post("/erp/130/CreditLn", &lend.CreditLineList{List: creditLines})
	if err != nil {
		return fmt.Errorf("failed to create CreditLines: %w", err)
	}
	for _, cl := range creditLines {
		store.CreditLineIDs = append(store.CreditLineIDs, cl.CreditLineId)
	}
	fmt.Printf("  Created %d CreditLines (with embedded drawdowns, repayments)\n", len(creditLines))

	return nil
}

// generateLendPhase4 generates payments and collateral (depend on loans, credit lines)
func generateLendPhase4(client *HCMClient, store *MockDataStore) error {
	payments := generateLendPayments(store)
	_, err := client.Post("/erp/130/LendPay", &lend.LendPaymentList{List: payments})
	if err != nil {
		return fmt.Errorf("failed to create LendPayments: %w", err)
	}
	for _, p := range payments {
		store.LendPaymentIDs = append(store.LendPaymentIDs, p.PaymentId)
	}
	fmt.Printf("  Created %d LendPayments (with embedded allocations)\n", len(payments))

	collateral := generateLendCollateral(store)
	_, err = client.Post("/erp/130/LendCltrl", &lend.LendCollateralList{List: collateral})
	if err != nil {
		return fmt.Errorf("failed to create LendCollateral: %w", err)
	}
	for _, c := range collateral {
		store.LendCollateralIDs = append(store.LendCollateralIDs, c.CollateralId)
	}
	fmt.Printf("  Created %d LendCollateral (with embedded valuations)\n", len(collateral))

	return nil
}

// runLENDPhases runs all Lending module phases in order
func runLENDPhases(client *HCMClient, store *MockDataStore) {
	fmt.Println("\n=== LEND Module ===")
	runPhase("LEND Phase 1: Foundation (Products)", func() error {
		return generateLendPhase1(client, store)
	})
	runPhase("LEND Phase 2: Applications", func() error {
		return generateLendPhase2(client, store)
	})
	runPhase("LEND Phase 3: Loans & Credit Lines", func() error {
		return generateLendPhase3(client, store)
	})
	runPhase("LEND Phase 4: Payments & Collateral", func() error {
		return generateLendPhase4(client, store)
	})
}
