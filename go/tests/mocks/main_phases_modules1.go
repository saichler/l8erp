/*
© 2025 Sharon Aicler (saichler@gmail.com)
Mock data phase runners for HCM, FIN, SCM modules
*/
package main

import (
	"fmt"
	"os"
)

func runHCMPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("Phase 1: Foundation Objects\n")
	fmt.Printf("---------------------------\n")
	if err := generatePhase1(client, store); err != nil {
		fmt.Printf("Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 2: Core Organizational Structure\n")
	fmt.Printf("--------------------------------------\n")
	if err := generatePhase2(client, store); err != nil {
		fmt.Printf("Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 3: Employees & Configuration\n")
	fmt.Printf("-----------------------------------\n")
	if err := generatePhase3(client, store); err != nil {
		fmt.Printf("Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 4: Employee-Dependent Objects\n")
	fmt.Printf("------------------------------------\n")
	if err := generatePhase4(client, store); err != nil {
		fmt.Printf("Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 5: Transaction & Additional Objects\n")
	fmt.Printf("------------------------------------------\n")
	if err := generatePhase5(client, store); err != nil {
		fmt.Printf("Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 6: Talent Acquisition\n")
	fmt.Printf("---------------------------\n")
	if err := generatePhase6(client, store); err != nil {
		fmt.Printf("Phase 6 failed: %v\n", err)
		os.Exit(1)
	}
}

func runFINPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nFIN Phase 1: Foundation\n")
	fmt.Printf("-----------------------\n")
	if err := generateFinPhase1(client, store); err != nil {
		fmt.Printf("FIN Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 2: Core Financial\n")
	fmt.Printf("---------------------------\n")
	if err := generateFinPhase2(client, store); err != nil {
		fmt.Printf("FIN Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 3: Entity Master\n")
	fmt.Printf("--------------------------\n")
	if err := generateFinPhase3(client, store); err != nil {
		fmt.Printf("FIN Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 4: Configuration\n")
	fmt.Printf("--------------------------\n")
	if err := generateFinPhase4(client, store); err != nil {
		fmt.Printf("FIN Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 5: AP Transactions\n")
	fmt.Printf("----------------------------\n")
	if err := generateFinPhase5(client, store); err != nil {
		fmt.Printf("FIN Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 6: AR Transactions\n")
	fmt.Printf("----------------------------\n")
	if err := generateFinPhase6(client, store); err != nil {
		fmt.Printf("FIN Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 7: GL Transactions\n")
	fmt.Printf("----------------------------\n")
	if err := generateFinPhase7(client, store); err != nil {
		fmt.Printf("FIN Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 8: Cash & Assets\n")
	fmt.Printf("--------------------------\n")
	if err := generateFinPhase8(client, store); err != nil {
		fmt.Printf("FIN Phase 8 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 9: Tax Filing\n")
	fmt.Printf("-----------------------\n")
	if err := generateFinPhase9(client, store); err != nil {
		fmt.Printf("FIN Phase 9 failed: %v\n", err)
		os.Exit(1)
	}
}

func runSCMPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nSCM Phase 1: Foundation\n")
	fmt.Printf("-----------------------\n")
	if err := generateScmPhase1(client, store); err != nil {
		fmt.Printf("SCM Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 2: Inventory Core\n")
	fmt.Printf("---------------------------\n")
	if err := generateScmPhase2(client, store); err != nil {
		fmt.Printf("SCM Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 3: Procurement\n")
	fmt.Printf("------------------------\n")
	if err := generateScmPhase3(client, store); err != nil {
		fmt.Printf("SCM Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 4: Purchase Orders\n")
	fmt.Printf("----------------------------\n")
	if err := generateScmPhase4(client, store); err != nil {
		fmt.Printf("SCM Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 5: Warehouse Operations\n")
	fmt.Printf("----------------------------------\n")
	if err := generateScmPhase5(client, store); err != nil {
		fmt.Printf("SCM Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 6: Inventory Transactions\n")
	fmt.Printf("------------------------------------\n")
	if err := generateScmPhase6(client, store); err != nil {
		fmt.Printf("SCM Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 7: Logistics\n")
	fmt.Printf("----------------------\n")
	if err := generateScmPhase7(client, store); err != nil {
		fmt.Printf("SCM Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 8: Planning\n")
	fmt.Printf("---------------------\n")
	if err := generateScmPhase8(client, store); err != nil {
		fmt.Printf("SCM Phase 8 failed: %v\n", err)
		os.Exit(1)
	}
}
