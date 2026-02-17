/*
© 2025 Sharon Aicler (saichler@gmail.com)
Mock data phase runners for PRJ, BI, DOC, ECOM, COMP modules
*/
package mocks

func runPRJPhases(client *HCMClient, store *MockDataStore) {
	runPhase("PRJ Phase 1: Foundation", func() error { return generatePrjPhase1(client, store) })

	runPhase("PRJ Phase 2: Projects (with children)", func() error { return generatePrjPhase2(client, store) })

	runPhase("PRJ Phase 3: Resources (with skills)", func() error { return generatePrjPhase3(client, store) })

	runPhase("PRJ Phase 4: Resource Management", func() error { return generatePrjPhase4(client, store) })

	runPhase("PRJ Phase 5: Time & Expense (with entries)", func() error { return generatePrjPhase5(client, store) })

	runPhase("PRJ Phase 6: Billing (with milestones/lines)", func() error { return generatePrjPhase6(client, store) })

	runPhase("PRJ Phase 7: Analytics", func() error { return generatePrjPhase7(client, store) })
}

func runBIPhases(client *HCMClient, store *MockDataStore) {
	runPhase("BI Phase 1: Foundation (reports, dashboards, KPIs with embedded children)", func() error { return generateBiPhase1(client, store) })

	runPhase("BI Phase 2: Analytics (models with embedded predictions)", func() error { return generateBiPhase2(client, store) })

	runPhase("BI Phase 3: Data Management (ETL jobs with embedded schedules)", func() error { return generateBiPhase3(client, store) })
}

func runDOCPhases(client *HCMClient, store *MockDataStore) {
	runPhase("DOC Phase 1: Compliance Foundation", func() error { return generateDocPhase1(client, store) })

	runPhase("DOC Phase 2: Storage Foundation", func() error { return generateDocPhase2(client, store) })

	runPhase("DOC Phase 3: Documents (with embedded versions, checkouts, comments, signatures, attachments, access logs, audit trails)", func() error { return generateDocPhase3(client, store) })

	runPhase("DOC Phase 4: Workflow (with embedded steps)", func() error { return generateDocPhase4(client, store) })

	runPhase("DOC Phase 5: Integration (templates with embedded fields, email captures, scan jobs)", func() error { return generateDocPhase5(client, store) })

	runPhase("DOC Phase 6: Compliance (legal holds, archive jobs)", func() error { return generateDocPhase6(client, store) })
}

func runECOMPhases(client *HCMClient, store *MockDataStore) {
	runPhase("ECOM Phase 1: Catalog Foundation", func() error { return generateEcomPhase1(client, store) })

	runPhase("ECOM Phase 2: Products", func() error { return generateEcomPhase2(client, store) })

	runPhase("ECOM Phase 3: Customers", func() error { return generateEcomPhase3(client, store) })

	runPhase("ECOM Phase 4: Promotions & Methods", func() error { return generateEcomPhase4(client, store) })

	runPhase("ECOM Phase 5: Orders", func() error { return generateEcomPhase5(client, store) })
}

func runCOMPPhases(client *HCMClient, store *MockDataStore) {
	runPhase("COMP Phase 1: Foundation (regulations with embedded requirements/violations/statuses, policies, insurance)", func() error { return generateCompPhase1(client, store) })

	runPhase("COMP Phase 2: Core (approval matrices, risk registers with embedded assessments/mitigation plans, audit schedules with embedded reports, controls with embedded assessments/segregation rules)", func() error { return generateCompPhase2(client, store) })

	runPhase("COMP Phase 3: Events (certifications, incidents, audit findings with embedded remediation actions)", func() error { return generateCompPhase3(client, store) })

	runPhase("COMP Phase 4: Reports (compliance reports)", func() error { return generateCompPhase4(client, store) })
}
