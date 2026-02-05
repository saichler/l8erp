/*
(C) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package main

// comp_phases.go
// COMP Module ServiceArea = 110
// Phase orchestration for Compliance module mock data generation

import (
	"fmt"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompPhase1 generates foundation objects (no dependencies except HCM)
// - CompRegulation (10 records)
// - CompControl (15 records)
// - CompPolicyDocument (10 records)
// - CompInsurancePolicy (8 records)
func generateCompPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate CompRegulations (no store dependencies)
	regulations := generateCompRegulations()
	err := client.post("/erp/110/CompReg", &comp.CompRegulationList{List: regulations})
	if err != nil {
		return fmt.Errorf("failed to create CompRegulations: %w", err)
	}
	for _, r := range regulations {
		store.CompRegulationIDs = append(store.CompRegulationIDs, r.RegulationId)
	}
	fmt.Printf("  Created %d CompRegulations\n", len(regulations))

	// Generate CompControls
	controls := generateCompControls(store)
	err = client.post("/erp/110/CompCtrl", &comp.CompControlList{List: controls})
	if err != nil {
		return fmt.Errorf("failed to create CompControls: %w", err)
	}
	for _, c := range controls {
		store.CompControlIDs = append(store.CompControlIDs, c.ControlId)
	}
	fmt.Printf("  Created %d CompControls\n", len(controls))

	// Generate CompPolicyDocuments
	policies := generateCompPolicyDocuments(store)
	err = client.post("/erp/110/CompPolicy", &comp.CompPolicyDocumentList{List: policies})
	if err != nil {
		return fmt.Errorf("failed to create CompPolicyDocuments: %w", err)
	}
	for _, p := range policies {
		store.CompPolicyDocumentIDs = append(store.CompPolicyDocumentIDs, p.PolicyId)
	}
	fmt.Printf("  Created %d CompPolicyDocuments\n", len(policies))

	// Generate CompInsurancePolicies
	insurances := generateCompInsurancePolicies(store)
	err = client.post("/erp/110/CompInsur", &comp.CompInsurancePolicyList{List: insurances})
	if err != nil {
		return fmt.Errorf("failed to create CompInsurancePolicies: %w", err)
	}
	for _, i := range insurances {
		store.CompInsurancePolicyIDs = append(store.CompInsurancePolicyIDs, i.InsuranceId)
	}
	fmt.Printf("  Created %d CompInsurancePolicies\n", len(insurances))

	return nil
}

// generateCompPhase2 generates core objects (depend on Phase 1)
// - CompRequirement (20 records) - references CompRegulation
// - CompApprovalMatrix (12 records) - references Department, Employee
// - CompSegregationRule (10 records) - references CompControl
// - CompRiskRegister (15 records) - references Department, Employee, CompControl, CompRequirement
// - CompAuditSchedule (10 records) - references Department, Employee, CompRegulation
func generateCompPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate CompRequirements
	requirements := generateCompRequirements(store)
	err := client.post("/erp/110/CompReq", &comp.CompRequirementList{List: requirements})
	if err != nil {
		return fmt.Errorf("failed to create CompRequirements: %w", err)
	}
	for _, r := range requirements {
		store.CompRequirementIDs = append(store.CompRequirementIDs, r.RequirementId)
	}
	fmt.Printf("  Created %d CompRequirements\n", len(requirements))

	// Generate CompApprovalMatrices
	matrices := generateCompApprovalMatrices(store)
	err = client.post("/erp/110/CompAprvMx", &comp.CompApprovalMatrixList{List: matrices})
	if err != nil {
		return fmt.Errorf("failed to create CompApprovalMatrices: %w", err)
	}
	for _, m := range matrices {
		store.CompApprovalMatrixIDs = append(store.CompApprovalMatrixIDs, m.MatrixId)
	}
	fmt.Printf("  Created %d CompApprovalMatrices\n", len(matrices))

	// Generate CompSegregationRules
	rules := generateCompSegregationRules(store)
	err = client.post("/erp/110/CompSegrul", &comp.CompSegregationRuleList{List: rules})
	if err != nil {
		return fmt.Errorf("failed to create CompSegregationRules: %w", err)
	}
	for _, r := range rules {
		store.CompSegregationRuleIDs = append(store.CompSegregationRuleIDs, r.RuleId)
	}
	fmt.Printf("  Created %d CompSegregationRules\n", len(rules))

	// Generate CompRiskRegisters
	risks := generateCompRiskRegisters(store)
	err = client.post("/erp/110/CompRisk", &comp.CompRiskRegisterList{List: risks})
	if err != nil {
		return fmt.Errorf("failed to create CompRiskRegisters: %w", err)
	}
	for _, r := range risks {
		store.CompRiskRegisterIDs = append(store.CompRiskRegisterIDs, r.RiskId)
	}
	fmt.Printf("  Created %d CompRiskRegisters\n", len(risks))

	// Generate CompAuditSchedules
	schedules := generateCompAuditSchedules(store)
	err = client.post("/erp/110/CompAudSch", &comp.CompAuditScheduleList{List: schedules})
	if err != nil {
		return fmt.Errorf("failed to create CompAuditSchedules: %w", err)
	}
	for _, s := range schedules {
		store.CompAuditScheduleIDs = append(store.CompAuditScheduleIDs, s.ScheduleId)
	}
	fmt.Printf("  Created %d CompAuditSchedules\n", len(schedules))

	return nil
}

// generateCompPhase3 generates assessments (depend on Phase 2)
// - CompComplianceStatus (25 records) - references CompRequirement
// - CompControlAssessment (20 records) - references CompControl, CompAuditSchedule
// - CompCertification (8 records) - references CompRegulation
// - CompRiskAssessment (20 records) - references CompRiskRegister
// - CompMitigationPlan (10 records) - references CompRiskRegister, CompControl
func generateCompPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate CompComplianceStatuses
	statuses := generateCompComplianceStatuses(store)
	err := client.post("/erp/110/CompStatus", &comp.CompComplianceStatusList{List: statuses})
	if err != nil {
		return fmt.Errorf("failed to create CompComplianceStatuses: %w", err)
	}
	for _, s := range statuses {
		store.CompComplianceStatusIDs = append(store.CompComplianceStatusIDs, s.StatusId)
	}
	fmt.Printf("  Created %d CompComplianceStatuses\n", len(statuses))

	// Generate CompControlAssessments
	assessments := generateCompControlAssessments(store)
	err = client.post("/erp/110/CompCtrlAs", &comp.CompControlAssessmentList{List: assessments})
	if err != nil {
		return fmt.Errorf("failed to create CompControlAssessments: %w", err)
	}
	for _, a := range assessments {
		store.CompControlAssessmentIDs = append(store.CompControlAssessmentIDs, a.AssessmentId)
	}
	fmt.Printf("  Created %d CompControlAssessments\n", len(assessments))

	// Generate CompCertifications
	certifications := generateCompCertifications(store)
	err = client.post("/erp/110/CompCert", &comp.CompCertificationList{List: certifications})
	if err != nil {
		return fmt.Errorf("failed to create CompCertifications: %w", err)
	}
	for _, c := range certifications {
		store.CompCertificationIDs = append(store.CompCertificationIDs, c.CertificationId)
	}
	fmt.Printf("  Created %d CompCertifications\n", len(certifications))

	// Generate CompRiskAssessments
	riskAssessments := generateCompRiskAssessments(store)
	err = client.post("/erp/110/CompRiskAs", &comp.CompRiskAssessmentList{List: riskAssessments})
	if err != nil {
		return fmt.Errorf("failed to create CompRiskAssessments: %w", err)
	}
	for _, r := range riskAssessments {
		store.CompRiskAssessmentIDs = append(store.CompRiskAssessmentIDs, r.AssessmentId)
	}
	fmt.Printf("  Created %d CompRiskAssessments\n", len(riskAssessments))

	// Generate CompMitigationPlans
	plans := generateCompMitigationPlans(store)
	err = client.post("/erp/110/CompMitig", &comp.CompMitigationPlanList{List: plans})
	if err != nil {
		return fmt.Errorf("failed to create CompMitigationPlans: %w", err)
	}
	for _, p := range plans {
		store.CompMitigationPlanIDs = append(store.CompMitigationPlanIDs, p.PlanId)
	}
	fmt.Printf("  Created %d CompMitigationPlans\n", len(plans))

	return nil
}

// generateCompPhase4 generates events (depend on Phase 2 and 3)
// - CompViolationRecord (10 records) - references CompRequirement
// - CompIncident (12 records) - references CompRiskRegister
// - CompAuditFinding (15 records) - references CompAuditSchedule, CompControl, CompRequirement
func generateCompPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate CompViolationRecords
	violations := generateCompViolationRecords(store)
	err := client.post("/erp/110/CompVioltn", &comp.CompViolationRecordList{List: violations})
	if err != nil {
		return fmt.Errorf("failed to create CompViolationRecords: %w", err)
	}
	for _, v := range violations {
		store.CompViolationRecordIDs = append(store.CompViolationRecordIDs, v.ViolationId)
	}
	fmt.Printf("  Created %d CompViolationRecords\n", len(violations))

	// Generate CompIncidents
	incidents := generateCompIncidents(store)
	err = client.post("/erp/110/CompIncdnt", &comp.CompIncidentList{List: incidents})
	if err != nil {
		return fmt.Errorf("failed to create CompIncidents: %w", err)
	}
	for _, i := range incidents {
		store.CompIncidentIDs = append(store.CompIncidentIDs, i.IncidentId)
	}
	fmt.Printf("  Created %d CompIncidents\n", len(incidents))

	// Generate CompAuditFindings
	findings := generateCompAuditFindings(store)
	err = client.post("/erp/110/CompAudFnd", &comp.CompAuditFindingList{List: findings})
	if err != nil {
		return fmt.Errorf("failed to create CompAuditFindings: %w", err)
	}
	for _, f := range findings {
		store.CompAuditFindingIDs = append(store.CompAuditFindingIDs, f.FindingId)
	}
	fmt.Printf("  Created %d CompAuditFindings\n", len(findings))

	return nil
}

// generateCompPhase5 generates reports (depend on Phase 4)
// - CompRemediationAction (12 records) - references CompAuditFinding
// - CompAuditReport (8 records) - references CompAuditSchedule
// - CompComplianceReport (6 records) - references CompRegulation
func generateCompPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate CompRemediationActions
	actions := generateCompRemediationActions(store)
	err := client.post("/erp/110/CompRemed", &comp.CompRemediationActionList{List: actions})
	if err != nil {
		return fmt.Errorf("failed to create CompRemediationActions: %w", err)
	}
	for _, a := range actions {
		store.CompRemediationActionIDs = append(store.CompRemediationActionIDs, a.ActionId)
	}
	fmt.Printf("  Created %d CompRemediationActions\n", len(actions))

	// Generate CompAuditReports
	auditReports := generateCompAuditReports(store)
	err = client.post("/erp/110/CompAudRpt", &comp.CompAuditReportList{List: auditReports})
	if err != nil {
		return fmt.Errorf("failed to create CompAuditReports: %w", err)
	}
	for _, r := range auditReports {
		store.CompAuditReportIDs = append(store.CompAuditReportIDs, r.ReportId)
	}
	fmt.Printf("  Created %d CompAuditReports\n", len(auditReports))

	// Generate CompComplianceReports
	complianceReports := generateCompComplianceReports(store)
	err = client.post("/erp/110/CompCmpRpt", &comp.CompComplianceReportList{List: complianceReports})
	if err != nil {
		return fmt.Errorf("failed to create CompComplianceReports: %w", err)
	}
	for _, r := range complianceReports {
		store.CompComplianceReportIDs = append(store.CompComplianceReportIDs, r.ReportId)
	}
	fmt.Printf("  Created %d CompComplianceReports\n", len(complianceReports))

	return nil
}
