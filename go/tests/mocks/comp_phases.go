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
package mocks

// comp_phases.go
// COMP Module ServiceArea = 110
// Phase orchestration for Compliance module mock data generation

import (
	"fmt"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompPhase1 generates foundation objects
// - CompRegulation (with embedded requirements, which embed violations and statuses)
// - CompControl (with embedded assessments and segregation_rules)
// - CompPolicyDocument
// - CompInsurancePolicy
func generateCompPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate CompRegulations (with embedded requirements/violations/statuses)
	regulations := generateCompRegulations(store)
	_, err := client.Post("/erp/110/CompReg", &comp.CompRegulationList{List: regulations})
	if err != nil {
		return fmt.Errorf("failed to create CompRegulations: %w", err)
	}
	for _, r := range regulations {
		store.CompRegulationIDs = append(store.CompRegulationIDs, r.RegulationId)
	}
	fmt.Printf("  Created %d CompRegulations (with embedded requirements, violations, statuses)\n", len(regulations))

	// Generate CompPolicyDocuments
	policies := generateCompPolicyDocuments(store)
	_, err = client.Post("/erp/110/CompPolicy", &comp.CompPolicyDocumentList{List: policies})
	if err != nil {
		return fmt.Errorf("failed to create CompPolicyDocuments: %w", err)
	}
	for _, p := range policies {
		store.CompPolicyDocumentIDs = append(store.CompPolicyDocumentIDs, p.PolicyId)
	}
	fmt.Printf("  Created %d CompPolicyDocuments\n", len(policies))

	// Generate CompInsurancePolicies
	insurances := generateCompInsurancePolicies(store)
	_, err = client.Post("/erp/110/CompInsur", &comp.CompInsurancePolicyList{List: insurances})
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
// - CompApprovalMatrix
// - CompRiskRegister (with embedded assessments and mitigation_plans)
// - CompAuditSchedule (with embedded reports)
// Note: CompControl needs CompAuditScheduleIDs for embedded assessments, so it runs in this phase
func generateCompPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate CompApprovalMatrices
	matrices := generateCompApprovalMatrices(store)
	_, err := client.Post("/erp/110/CompAprvMx", &comp.CompApprovalMatrixList{List: matrices})
	if err != nil {
		return fmt.Errorf("failed to create CompApprovalMatrices: %w", err)
	}
	for _, m := range matrices {
		store.CompApprovalMatrixIDs = append(store.CompApprovalMatrixIDs, m.MatrixId)
	}
	fmt.Printf("  Created %d CompApprovalMatrices\n", len(matrices))

	// Generate CompRiskRegisters (with embedded assessments and mitigation_plans)
	risks := generateCompRiskRegisters(store)
	_, err = client.Post("/erp/110/CompRisk", &comp.CompRiskRegisterList{List: risks})
	if err != nil {
		return fmt.Errorf("failed to create CompRiskRegisters: %w", err)
	}
	for _, r := range risks {
		store.CompRiskRegisterIDs = append(store.CompRiskRegisterIDs, r.RiskId)
	}
	fmt.Printf("  Created %d CompRiskRegisters (with embedded assessments, mitigation plans)\n", len(risks))

	// Generate CompAuditSchedules (with embedded reports)
	schedules := generateCompAuditSchedules(store)
	_, err = client.Post("/erp/110/CompAudSch", &comp.CompAuditScheduleList{List: schedules})
	if err != nil {
		return fmt.Errorf("failed to create CompAuditSchedules: %w", err)
	}
	for _, s := range schedules {
		store.CompAuditScheduleIDs = append(store.CompAuditScheduleIDs, s.ScheduleId)
	}
	fmt.Printf("  Created %d CompAuditSchedules (with embedded reports)\n", len(schedules))

	// Generate CompControls (with embedded assessments and segregation_rules)
	// Controls reference CompAuditScheduleIDs via embedded assessments, so must run after schedules
	controls := generateCompControls(store)
	_, err = client.Post("/erp/110/CompCtrl", &comp.CompControlList{List: controls})
	if err != nil {
		return fmt.Errorf("failed to create CompControls: %w", err)
	}
	for _, c := range controls {
		store.CompControlIDs = append(store.CompControlIDs, c.ControlId)
	}
	fmt.Printf("  Created %d CompControls (with embedded assessments, segregation rules)\n", len(controls))

	return nil
}

// generateCompPhase3 generates events (depend on Phase 2)
// - CompCertification
// - CompIncident
// - CompAuditFinding (with embedded remediation actions)
func generateCompPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate CompCertifications
	certifications := generateCompCertifications(store)
	_, err := client.Post("/erp/110/CompCert", &comp.CompCertificationList{List: certifications})
	if err != nil {
		return fmt.Errorf("failed to create CompCertifications: %w", err)
	}
	for _, c := range certifications {
		store.CompCertificationIDs = append(store.CompCertificationIDs, c.CertificationId)
	}
	fmt.Printf("  Created %d CompCertifications\n", len(certifications))

	// Generate CompIncidents
	incidents := generateCompIncidents(store)
	_, err = client.Post("/erp/110/CompIncdnt", &comp.CompIncidentList{List: incidents})
	if err != nil {
		return fmt.Errorf("failed to create CompIncidents: %w", err)
	}
	for _, i := range incidents {
		store.CompIncidentIDs = append(store.CompIncidentIDs, i.IncidentId)
	}
	fmt.Printf("  Created %d CompIncidents\n", len(incidents))

	// Generate CompAuditFindings (with embedded remediation actions)
	findings := generateCompAuditFindings(store)
	_, err = client.Post("/erp/110/CompAudFnd", &comp.CompAuditFindingList{List: findings})
	if err != nil {
		return fmt.Errorf("failed to create CompAuditFindings: %w", err)
	}
	for _, f := range findings {
		store.CompAuditFindingIDs = append(store.CompAuditFindingIDs, f.FindingId)
	}
	fmt.Printf("  Created %d CompAuditFindings (with embedded remediation actions)\n", len(findings))

	return nil
}

// generateCompPhase4 generates reports (depend on Phase 3)
// - CompComplianceReport
func generateCompPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate CompComplianceReports
	complianceReports := generateCompComplianceReports(store)
	_, err := client.Post("/erp/110/CompCmpRpt", &comp.CompComplianceReportList{List: complianceReports})
	if err != nil {
		return fmt.Errorf("failed to create CompComplianceReports: %w", err)
	}
	for _, r := range complianceReports {
		store.CompComplianceReportIDs = append(store.CompComplianceReportIDs, r.ReportId)
	}
	fmt.Printf("  Created %d CompComplianceReports\n", len(complianceReports))

	return nil
}
