/*
© 2025 Sharon Aicler (saichler@gmail.com)
Mock data phase runners for PRJ, BI, DOC, ECOM, COMP modules
*/
package mocks

func runPRJPhases(client *HCMClient, store *MockDataStore) {
	runPhase("PRJ Phase 1: Foundation", func() error { return generatePrjPhase1(client, store) })

	runPhase("PRJ Phase 2: Projects & Phases", func() error { return generatePrjPhase2(client, store) })

	runPhase("PRJ Phase 3: Resources", func() error { return generatePrjPhase3(client, store) })

	runPhase("PRJ Phase 4: Project Details", func() error { return generatePrjPhase4(client, store) })

	runPhase("PRJ Phase 5: Resource Management", func() error { return generatePrjPhase5(client, store) })

	runPhase("PRJ Phase 6: Time & Expense", func() error { return generatePrjPhase6(client, store) })

	runPhase("PRJ Phase 7: Billing", func() error { return generatePrjPhase7(client, store) })

	runPhase("PRJ Phase 8: Analytics", func() error { return generatePrjPhase8(client, store) })
}

func runBIPhases(client *HCMClient, store *MockDataStore) {
	runPhase("BI Phase 1: Foundation", func() error { return generateBiPhase1(client, store) })

	runPhase("BI Phase 2: Report Management", func() error { return generateBiPhase2(client, store) })

	runPhase("BI Phase 3: Dashboard Management", func() error { return generateBiPhase3(client, store) })

	runPhase("BI Phase 4: Analytics", func() error { return generateBiPhase4(client, store) })

	runPhase("BI Phase 5: Data Management", func() error { return generateBiPhase5(client, store) })
}

func runDOCPhases(client *HCMClient, store *MockDataStore) {
	runPhase("DOC Phase 1: Compliance Foundation", func() error { return generateDocPhase1(client, store) })

	runPhase("DOC Phase 2: Storage Foundation", func() error { return generateDocPhase2(client, store) })

	runPhase("DOC Phase 3: Documents & Versions", func() error { return generateDocPhase3(client, store) })

	runPhase("DOC Phase 4: Workflow", func() error { return generateDocPhase4(client, store) })

	runPhase("DOC Phase 5: Integration", func() error { return generateDocPhase5(client, store) })

	runPhase("DOC Phase 6: Compliance", func() error { return generateDocPhase6(client, store) })
}

func runECOMPhases(client *HCMClient, store *MockDataStore) {
	runPhase("ECOM Phase 1: Catalog Foundation", func() error { return generateEcomPhase1(client, store) })

	runPhase("ECOM Phase 2: Products", func() error { return generateEcomPhase2(client, store) })

	runPhase("ECOM Phase 3: Customers", func() error { return generateEcomPhase3(client, store) })

	runPhase("ECOM Phase 4: Promotions & Methods", func() error { return generateEcomPhase4(client, store) })

	runPhase("ECOM Phase 5: Orders", func() error { return generateEcomPhase5(client, store) })
}

func runCOMPPhases(client *HCMClient, store *MockDataStore) {
	runPhase("COMP Phase 1: Foundation", func() error { return generateCompPhase1(client, store) })

	runPhase("COMP Phase 2: Core", func() error { return generateCompPhase2(client, store) })

	runPhase("COMP Phase 3: Assessments", func() error { return generateCompPhase3(client, store) })

	runPhase("COMP Phase 4: Events", func() error { return generateCompPhase4(client, store) })

	runPhase("COMP Phase 5: Reports", func() error { return generateCompPhase5(client, store) })
}
