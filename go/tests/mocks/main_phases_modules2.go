/*
© 2025 Sharon Aicler (saichler@gmail.com)
Mock data phase runners for Sales, MFG, CRM modules
*/
package main

import (
	"fmt"
	"os"
)

func runSalesPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nSales Phase 1: Foundation\n")
	fmt.Printf("-------------------------\n")
	if err := generateSalesPhase1(client, store); err != nil {
		fmt.Printf("Sales Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 2: Customer & Partners\n")
	fmt.Printf("-----------------------------------\n")
	if err := generateSalesPhase2(client, store); err != nil {
		fmt.Printf("Sales Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 3: Pricing Setup\n")
	fmt.Printf("----------------------------\n")
	if err := generateSalesPhase3(client, store); err != nil {
		fmt.Printf("Sales Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 4: Quotations\n")
	fmt.Printf("-------------------------\n")
	if err := generateSalesPhase4(client, store); err != nil {
		fmt.Printf("Sales Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 5: Orders\n")
	fmt.Printf("---------------------\n")
	if err := generateSalesPhase5(client, store); err != nil {
		fmt.Printf("Sales Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 6: Shipping\n")
	fmt.Printf("-----------------------\n")
	if err := generateSalesPhase6(client, store); err != nil {
		fmt.Printf("Sales Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 7: Billing\n")
	fmt.Printf("----------------------\n")
	if err := generateSalesPhase7(client, store); err != nil {
		fmt.Printf("Sales Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 8: Analytics\n")
	fmt.Printf("------------------------\n")
	if err := generateSalesPhase8(client, store); err != nil {
		fmt.Printf("Sales Phase 8 failed: %v\n", err)
		os.Exit(1)
	}
}

func runMFGPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nMFG Phase 1: Foundation\n")
	fmt.Printf("-----------------------\n")
	if err := generateMfgPhase1(client, store); err != nil {
		fmt.Printf("MFG Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 2: Engineering & Quality Plans\n")
	fmt.Printf("-----------------------------------------\n")
	if err := generateMfgPhase2(client, store); err != nil {
		fmt.Printf("MFG Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 3: Work Orders & Production\n")
	fmt.Printf("--------------------------------------\n")
	if err := generateMfgPhase3(client, store); err != nil {
		fmt.Printf("MFG Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 4: Shop Floor\n")
	fmt.Printf("-----------------------\n")
	if err := generateMfgPhase4(client, store); err != nil {
		fmt.Printf("MFG Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 5: Quality Transactions\n")
	fmt.Printf("----------------------------------\n")
	if err := generateMfgPhase5(client, store); err != nil {
		fmt.Printf("MFG Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 6: Planning\n")
	fmt.Printf("---------------------\n")
	if err := generateMfgPhase6(client, store); err != nil {
		fmt.Printf("MFG Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 7: Costing\n")
	fmt.Printf("--------------------\n")
	if err := generateMfgPhase7(client, store); err != nil {
		fmt.Printf("MFG Phase 7 failed: %v\n", err)
		os.Exit(1)
	}
}

func runCRMPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nCRM Phase 1: Leads Foundation\n")
	fmt.Printf("-----------------------------\n")
	if err := generateCrmPhase1(client, store); err != nil {
		fmt.Printf("CRM Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 2: Opportunity Stages\n")
	fmt.Printf("--------------------------------\n")
	if err := generateCrmPhase2(client, store); err != nil {
		fmt.Printf("CRM Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 3: Accounts & Contacts\n")
	fmt.Printf("---------------------------------\n")
	if err := generateCrmPhase3(client, store); err != nil {
		fmt.Printf("CRM Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 4: Marketing\n")
	fmt.Printf("-----------------------\n")
	if err := generateCrmPhase4(client, store); err != nil {
		fmt.Printf("CRM Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 5: Leads\n")
	fmt.Printf("------------------\n")
	if err := generateCrmPhase5(client, store); err != nil {
		fmt.Printf("CRM Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 6: Opportunities\n")
	fmt.Printf("--------------------------\n")
	if err := generateCrmPhase6(client, store); err != nil {
		fmt.Printf("CRM Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 7: Account Management\n")
	fmt.Printf("--------------------------------\n")
	if err := generateCrmPhase7(client, store); err != nil {
		fmt.Printf("CRM Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 8: Customer Service\n")
	fmt.Printf("-----------------------------\n")
	if err := generateCrmPhase8(client, store); err != nil {
		fmt.Printf("CRM Phase 8 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 9: Field Service\n")
	fmt.Printf("--------------------------\n")
	if err := generateCrmPhase9(client, store); err != nil {
		fmt.Printf("CRM Phase 9 failed: %v\n", err)
		os.Exit(1)
	}
}
