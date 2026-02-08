/*
© 2025 Sharon Aicler (saichler@gmail.com)
Mock data phase runners for Sales, MFG, CRM modules
*/
package mocks

func runSalesPhases(client *HCMClient, store *MockDataStore) {
	runPhase("Sales Phase 1: Foundation", func() error { return generateSalesPhase1(client, store) })

	runPhase("Sales Phase 2: Customer & Partners", func() error { return generateSalesPhase2(client, store) })

	runPhase("Sales Phase 3: Pricing Setup", func() error { return generateSalesPhase3(client, store) })

	runPhase("Sales Phase 4: Quotations", func() error { return generateSalesPhase4(client, store) })

	runPhase("Sales Phase 5: Orders", func() error { return generateSalesPhase5(client, store) })

	runPhase("Sales Phase 6: Shipping", func() error { return generateSalesPhase6(client, store) })

	runPhase("Sales Phase 7: Billing", func() error { return generateSalesPhase7(client, store) })

	runPhase("Sales Phase 8: Analytics", func() error { return generateSalesPhase8(client, store) })
}

func runMFGPhases(client *HCMClient, store *MockDataStore) {
	runPhase("MFG Phase 1: Foundation", func() error { return generateMfgPhase1(client, store) })

	runPhase("MFG Phase 2: Engineering & Quality Plans", func() error { return generateMfgPhase2(client, store) })

	runPhase("MFG Phase 3: Work Orders & Production", func() error { return generateMfgPhase3(client, store) })

	runPhase("MFG Phase 4: Shop Floor", func() error { return generateMfgPhase4(client, store) })

	runPhase("MFG Phase 5: Quality Transactions", func() error { return generateMfgPhase5(client, store) })

	runPhase("MFG Phase 6: Planning", func() error { return generateMfgPhase6(client, store) })

	runPhase("MFG Phase 7: Costing", func() error { return generateMfgPhase7(client, store) })
}

func runCRMPhases(client *HCMClient, store *MockDataStore) {
	runPhase("CRM Phase 1: Leads Foundation", func() error { return generateCrmPhase1(client, store) })

	runPhase("CRM Phase 2: Opportunity Stages", func() error { return generateCrmPhase2(client, store) })

	runPhase("CRM Phase 3: Accounts & Contacts", func() error { return generateCrmPhase3(client, store) })

	runPhase("CRM Phase 4: Marketing", func() error { return generateCrmPhase4(client, store) })

	runPhase("CRM Phase 5: Leads", func() error { return generateCrmPhase5(client, store) })

	runPhase("CRM Phase 6: Opportunities", func() error { return generateCrmPhase6(client, store) })

	runPhase("CRM Phase 7: Account Management", func() error { return generateCrmPhase7(client, store) })

	runPhase("CRM Phase 8: Customer Service", func() error { return generateCrmPhase8(client, store) })

	runPhase("CRM Phase 9: Field Service", func() error { return generateCrmPhase9(client, store) })
}
