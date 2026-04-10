/*
(C) 2025 Sharon Aicler (saichler@gmail.com)
LEND module ID store for mock data generation
*/
package mocks

// LENDStore holds generated IDs for Lending module
type LENDStore struct {
	// LEND Phase 1: Foundation (Products)
	LendProductIDs []string

	// LEND Phase 2: Applications
	LendApplicationIDs []string

	// LEND Phase 3: Loans and Credit Lines
	LoanIDs      []string
	CreditLineIDs []string

	// LEND Phase 4: Payments and Collateral
	LendPaymentIDs    []string
	LendCollateralIDs []string
}
