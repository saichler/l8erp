/*
© 2025 Sharon Aicler (saichler@gmail.com)
Mock data phase runners for PRJ, BI, DOC, ECOM, COMP modules
*/
package main

import (
	"fmt"
	"os"
)

func runPRJPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nPRJ Phase 1: Foundation\n")
	fmt.Printf("-----------------------\n")
	if err := generatePrjPhase1(client, store); err != nil {
		fmt.Printf("PRJ Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 2: Projects & Phases\n")
	fmt.Printf("------------------------------\n")
	if err := generatePrjPhase2(client, store); err != nil {
		fmt.Printf("PRJ Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 3: Resources\n")
	fmt.Printf("----------------------\n")
	if err := generatePrjPhase3(client, store); err != nil {
		fmt.Printf("PRJ Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 4: Project Details\n")
	fmt.Printf("----------------------------\n")
	if err := generatePrjPhase4(client, store); err != nil {
		fmt.Printf("PRJ Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 5: Resource Management\n")
	fmt.Printf("---------------------------------\n")
	if err := generatePrjPhase5(client, store); err != nil {
		fmt.Printf("PRJ Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 6: Time & Expense\n")
	fmt.Printf("---------------------------\n")
	if err := generatePrjPhase6(client, store); err != nil {
		fmt.Printf("PRJ Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 7: Billing\n")
	fmt.Printf("--------------------\n")
	if err := generatePrjPhase7(client, store); err != nil {
		fmt.Printf("PRJ Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 8: Analytics\n")
	fmt.Printf("----------------------\n")
	if err := generatePrjPhase8(client, store); err != nil {
		fmt.Printf("PRJ Phase 8 failed: %v\n", err)
		os.Exit(1)
	}
}

func runBIPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nBI Phase 1: Foundation\n")
	fmt.Printf("----------------------\n")
	if err := generateBiPhase1(client, store); err != nil {
		fmt.Printf("BI Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nBI Phase 2: Report Management\n")
	fmt.Printf("-----------------------------\n")
	if err := generateBiPhase2(client, store); err != nil {
		fmt.Printf("BI Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nBI Phase 3: Dashboard Management\n")
	fmt.Printf("--------------------------------\n")
	if err := generateBiPhase3(client, store); err != nil {
		fmt.Printf("BI Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nBI Phase 4: Analytics\n")
	fmt.Printf("---------------------\n")
	if err := generateBiPhase4(client, store); err != nil {
		fmt.Printf("BI Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nBI Phase 5: Data Management\n")
	fmt.Printf("---------------------------\n")
	if err := generateBiPhase5(client, store); err != nil {
		fmt.Printf("BI Phase 5 failed: %v\n", err)
		os.Exit(1)
	}
}

func runDOCPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nDOC Phase 1: Compliance Foundation\n")
	fmt.Printf("-----------------------------------\n")
	if err := generateDocPhase1(client, store); err != nil {
		fmt.Printf("DOC Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nDOC Phase 2: Storage Foundation\n")
	fmt.Printf("--------------------------------\n")
	if err := generateDocPhase2(client, store); err != nil {
		fmt.Printf("DOC Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nDOC Phase 3: Documents & Versions\n")
	fmt.Printf("----------------------------------\n")
	if err := generateDocPhase3(client, store); err != nil {
		fmt.Printf("DOC Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nDOC Phase 4: Workflow\n")
	fmt.Printf("---------------------\n")
	if err := generateDocPhase4(client, store); err != nil {
		fmt.Printf("DOC Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nDOC Phase 5: Integration\n")
	fmt.Printf("------------------------\n")
	if err := generateDocPhase5(client, store); err != nil {
		fmt.Printf("DOC Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nDOC Phase 6: Compliance\n")
	fmt.Printf("-----------------------\n")
	if err := generateDocPhase6(client, store); err != nil {
		fmt.Printf("DOC Phase 6 failed: %v\n", err)
		os.Exit(1)
	}
}

func runECOMPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nECOM Phase 1: Catalog Foundation\n")
	fmt.Printf("---------------------------------\n")
	if err := generateEcomPhase1(client, store); err != nil {
		fmt.Printf("ECOM Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nECOM Phase 2: Products\n")
	fmt.Printf("----------------------\n")
	if err := generateEcomPhase2(client, store); err != nil {
		fmt.Printf("ECOM Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nECOM Phase 3: Customers\n")
	fmt.Printf("-----------------------\n")
	if err := generateEcomPhase3(client, store); err != nil {
		fmt.Printf("ECOM Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nECOM Phase 4: Promotions & Methods\n")
	fmt.Printf("-----------------------------------\n")
	if err := generateEcomPhase4(client, store); err != nil {
		fmt.Printf("ECOM Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nECOM Phase 5: Orders\n")
	fmt.Printf("--------------------\n")
	if err := generateEcomPhase5(client, store); err != nil {
		fmt.Printf("ECOM Phase 5 failed: %v\n", err)
		os.Exit(1)
	}
}

func runCOMPPhases(client *HCMClient, store *MockDataStore) {
	fmt.Printf("\nCOMP Phase 1: Foundation\n")
	fmt.Printf("------------------------\n")
	if err := generateCompPhase1(client, store); err != nil {
		fmt.Printf("COMP Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCOMP Phase 2: Core\n")
	fmt.Printf("------------------\n")
	if err := generateCompPhase2(client, store); err != nil {
		fmt.Printf("COMP Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCOMP Phase 3: Assessments\n")
	fmt.Printf("-------------------------\n")
	if err := generateCompPhase3(client, store); err != nil {
		fmt.Printf("COMP Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCOMP Phase 4: Events\n")
	fmt.Printf("--------------------\n")
	if err := generateCompPhase4(client, store); err != nil {
		fmt.Printf("COMP Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCOMP Phase 5: Reports\n")
	fmt.Printf("---------------------\n")
	if err := generateCompPhase5(client, store); err != nil {
		fmt.Printf("COMP Phase 5 failed: %v\n", err)
		os.Exit(1)
	}
}
