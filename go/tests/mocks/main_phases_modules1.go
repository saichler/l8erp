/*
© 2025 Sharon Aicler (saichler@gmail.com)
Mock data phase runners for HCM, FIN, SCM modules
*/
package mocks

func runHCMPhases(client *HCMClient, store *MockDataStore) {
	runPhase("Phase 1: Foundation Objects", func() error { return generatePhase1(client, store) })

	runPhase("Phase 2: Core Organizational Structure", func() error { return generatePhase2(client, store) })

	runPhase("Phase 3: Employees & Configuration", func() error { return generatePhase3(client, store) })

	runPhase("Phase 4: Employee-Dependent Objects", func() error { return generatePhase4(client, store) })

	runPhase("Phase 5: Transaction & Additional Objects", func() error { return generatePhase5(client, store) })

	runPhase("Phase 6: Talent Acquisition", func() error { return generatePhase6(client, store) })
}

// runFINFoundation runs FIN Phases 1-3 (no HCM dependency — provides CurrencyIDs for all modules)
func runFINFoundation(client *HCMClient, store *MockDataStore) {
	runPhase("FIN Phase 1: Foundation", func() error { return generateFinPhase1(client, store) })

	runPhase("FIN Phase 2: Core Financial", func() error { return generateFinPhase2(client, store) })

	runPhase("FIN Phase 3: Entity Master", func() error { return generateFinPhase3(client, store) })
}

// runFINRemaining runs FIN Phases 4-8 (needs HCM DepartmentIDs, EmployeeIDs)
func runFINRemaining(client *HCMClient, store *MockDataStore) {
	runPhase("FIN Phase 4: Configuration", func() error { return generateFinPhase4(client, store) })

	runPhase("FIN Phase 5: AP Transactions", func() error { return generateFinPhase5(client, store) })

	runPhase("FIN Phase 6: AR Transactions", func() error { return generateFinPhase6(client, store) })

	runPhase("FIN Phase 7: GL Transactions", func() error { return generateFinPhase7(client, store) })

	runPhase("FIN Phase 8: Cash & Assets", func() error { return generateFinPhase8(client, store) })
}

func runSCMPhases(client *HCMClient, store *MockDataStore) {
	runPhase("SCM Phase 1: Foundation", func() error { return generateScmPhase1(client, store) })

	runPhase("SCM Phase 2: Inventory Core", func() error { return generateScmPhase2(client, store) })

	runPhase("SCM Phase 3: Procurement", func() error { return generateScmPhase3(client, store) })

	runPhase("SCM Phase 4: Purchase Orders", func() error { return generateScmPhase4(client, store) })

	runPhase("SCM Phase 5: Warehouse Operations", func() error { return generateScmPhase5(client, store) })

	runPhase("SCM Phase 6: Inventory Transactions", func() error { return generateScmPhase6(client, store) })

	runPhase("SCM Phase 7: Logistics", func() error { return generateScmPhase7(client, store) })

	runPhase("SCM Phase 8: Planning", func() error { return generateScmPhase8(client, store) })
}
