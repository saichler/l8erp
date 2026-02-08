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

// gen_comp_regulatory.go
// Generates:
// - CompRequirement (20 records) - references CompRegulation
// - CompComplianceStatus (25 records) - references CompRequirement
// - CompCertification (8 records) - references CompRegulation
// - CompViolationRecord (10 records) - references CompRequirement

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompRequirements creates compliance requirement records
func generateCompRequirements(store *MockDataStore) []*comp.CompRequirement {
	severityLevels := []comp.CompSeverityLevel{
		comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL,
		comp.CompSeverityLevel_COMP_SEVERITY_HIGH,
		comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM,
		comp.CompSeverityLevel_COMP_SEVERITY_LOW,
		comp.CompSeverityLevel_COMP_SEVERITY_INFORMATIONAL,
	}

	requirementTitles := []string{
		"Access Control Implementation", "Data Encryption Requirements",
		"Audit Logging Mandatory", "Password Complexity Standards",
		"Multi-Factor Authentication", "Data Retention Policy",
		"Incident Reporting Timeline", "Risk Assessment Frequency",
		"Vendor Due Diligence", "Employee Training Requirement",
		"Change Management Process", "Backup and Recovery Testing",
		"Network Segmentation", "Vulnerability Scanning Schedule",
		"Penetration Testing Annual", "Business Continuity Plan",
		"Disaster Recovery Testing", "Data Classification",
		"Privacy Impact Assessment", "Third-Party Risk Review",
	}

	evidenceReqs := []string{
		"Access logs", "Configuration screenshots", "Policy documents",
		"Training records", "Test results", "Audit reports",
		"Approval records", "Assessment documentation",
	}

	count := minInt(len(requirementTitles), 20)
	requirements := make([]*comp.CompRequirement, count)

	for i := 0; i < count; i++ {
		regulationID := pickRef(store.CompRegulationIDs, i)

		ownerID := pickRef(store.EmployeeIDs, i)

		// Priority distribution: 20% Critical, 30% High, 35% Medium, 15% Low
		var priority comp.CompSeverityLevel
		if i < 4 {
			priority = comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL
		} else if i < 10 {
			priority = comp.CompSeverityLevel_COMP_SEVERITY_HIGH
		} else if i < 17 {
			priority = comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM
		} else {
			priority = severityLevels[i%len(severityLevels)]
		}

		requirements[i] = &comp.CompRequirement{
			RequirementId:        genID("creq", i),
			RegulationId:         regulationID,
			Code:                 fmt.Sprintf("REQ-%04d", 4000+i+1),
			Title:                requirementTitles[i],
			Description:          fmt.Sprintf("Compliance requirement for %s as mandated by applicable regulations", requirementTitles[i]),
			Guidance:             fmt.Sprintf("Organizations must implement %s controls to meet this requirement", requirementTitles[i]),
			Priority:             priority,
			IsMandatory:          i < 15, // First 15 are mandatory
			ReviewFrequencyDays:  int32((rand.Intn(4) + 1) * 90), // 90, 180, 270, or 360 days
			ControlObjective:     fmt.Sprintf("Ensure %s is properly implemented and maintained", requirementTitles[i]),
			EvidenceRequirements: evidenceReqs[:rand.Intn(4)+2],
			OwnerId:              ownerID,
			IsActive:             i < 18, // First 18 are active
			AuditInfo:            createAuditInfo(),
		}

		// Set parent requirement for some (hierarchy)
		if i > 5 && i%3 == 0 && i < count-1 {
			requirements[i].ParentRequirementId = fmt.Sprintf("creq-%03d", (i%5)+1)
		}
	}
	return requirements
}

// generateCompComplianceStatuses creates compliance status records
func generateCompComplianceStatuses(store *MockDataStore) []*comp.CompComplianceStatus {
	statusTypes := []comp.CompComplianceStatusType{
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_COMPLIANT,
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_PARTIALLY_COMPLIANT,
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_NON_COMPLIANT,
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_UNDER_REVIEW,
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_EXEMPT,
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_NOT_APPLICABLE,
	}

	entityTypes := []string{"Department", "Process", "System", "Application", "Business Unit"}

	gapDescriptions := []string{
		"Missing documentation", "Control not fully implemented",
		"Testing not completed", "Monitoring gaps identified",
		"Training incomplete", "Policy update needed",
	}

	count := 25
	statuses := make([]*comp.CompComplianceStatus, count)

	for i := 0; i < count; i++ {
		requirementID := pickRef(store.CompRequirementIDs, i)

		assessorID := pickRef(store.EmployeeIDs, i)

		assessmentDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		nextReviewDate := assessmentDate.AddDate(0, rand.Intn(6)+3, 0)

		// Status distribution: 60% Compliant, 20% Partially Compliant, 10% Non-Compliant, 10% Other
		var status comp.CompComplianceStatusType
		if i < 15 {
			status = comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_COMPLIANT
		} else if i < 20 {
			status = comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_PARTIALLY_COMPLIANT
		} else if i < 22 {
			status = comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_NON_COMPLIANT
		} else {
			status = statusTypes[i%len(statusTypes)]
		}

		// Compliance score based on status
		var complianceScore float64
		switch status {
		case comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_COMPLIANT:
			complianceScore = float64(90 + rand.Intn(11)) // 90-100
		case comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_PARTIALLY_COMPLIANT:
			complianceScore = float64(60 + rand.Intn(30)) // 60-89
		case comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_NON_COMPLIANT:
			complianceScore = float64(rand.Intn(60)) // 0-59
		default:
			complianceScore = float64(50 + rand.Intn(50))
		}

		gaps := []string{}
		if status != comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_COMPLIANT {
			gaps = gapDescriptions[:rand.Intn(3)+1]
		}

		statuses[i] = &comp.CompComplianceStatus{
			StatusId:        genID("csts", i),
			RequirementId:   requirementID,
			EntityType:      entityTypes[i%len(entityTypes)],
			EntityId:        fmt.Sprintf("entity-%03d", rand.Intn(50)+1),
			Status:          status,
			AssessmentDate:  assessmentDate.Unix(),
			NextReviewDate:  nextReviewDate.Unix(),
			AssessorId:      assessorID,
			Notes:           fmt.Sprintf("Assessment of compliance status for requirement %s", requirementID),
			ComplianceScore: complianceScore,
			GapDescriptions: gaps,
			AuditInfo:       createAuditInfo(),
		}
	}
	return statuses
}

// generateCompCertifications creates certification records
func generateCompCertifications(store *MockDataStore) []*comp.CompCertification {
	certStatuses := []comp.CompCertificationStatus{
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_ACTIVE,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_ACTIVE,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_ACTIVE,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_PENDING,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_UNDER_RENEWAL,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_EXPIRED,
	}

	locations := []string{"Headquarters", "Data Center East", "Data Center West", "Regional Office"}
	processes := []string{"IT Operations", "Customer Service", "Finance", "HR", "Engineering"}

	count := minInt(len(compCertificationNames), 8)
	certifications := make([]*comp.CompCertification, count)

	for i := 0; i < count; i++ {
		regulationID := pickRef(store.CompRegulationIDs, i)

		responsibleID := pickRef(store.EmployeeIDs, i)

		issueDate := time.Now().AddDate(-rand.Intn(2), -rand.Intn(6), 0)
		expiryDate := issueDate.AddDate(3, 0, 0) // 3 year validity

		certCost := int64((rand.Intn(50) + 10) * 1000) // $10K to $60K

		certifications[i] = &comp.CompCertification{
			CertificationId:   genID("ccrt", i),
			Name:              compCertificationNames[i],
			Description:       fmt.Sprintf("Organizational certification for %s compliance", compCertificationNames[i]),
			IssuingBody:       compIssuingBodies[i%len(compIssuingBodies)],
			CertificateNumber: fmt.Sprintf("CERT-%06d", 500000+rand.Intn(500000)),
			Status:            certStatuses[i%len(certStatuses)],
			IssueDate:         issueDate.Unix(),
			ExpiryDate:        expiryDate.Unix(),
			Scope:             fmt.Sprintf("All operations related to %s", compCertificationNames[i]),
			CoveredLocations:  locations[:rand.Intn(3)+1],
			CoveredProcesses:  processes[:rand.Intn(4)+1],
			RegulationId:      regulationID,
			ResponsibleId:     responsibleID,
			CertificationCost: money(store, certCost),
			RenewalLeadDays: int32(90),
			AuditInfo:       createAuditInfo(),
		}
	}
	return certifications
}

// generateCompViolationRecords creates violation record entries
func generateCompViolationRecords(store *MockDataStore) []*comp.CompViolationRecord {
	severityLevels := []comp.CompSeverityLevel{
		comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL,
		comp.CompSeverityLevel_COMP_SEVERITY_HIGH,
		comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM,
		comp.CompSeverityLevel_COMP_SEVERITY_LOW,
	}

	findingStatuses := []comp.CompFindingStatus{
		comp.CompFindingStatus_COMP_FINDING_STATUS_OPEN,
		comp.CompFindingStatus_COMP_FINDING_STATUS_IN_REMEDIATION,
		comp.CompFindingStatus_COMP_FINDING_STATUS_PENDING_VERIFICATION,
		comp.CompFindingStatus_COMP_FINDING_STATUS_CLOSED,
		comp.CompFindingStatus_COMP_FINDING_STATUS_RISK_ACCEPTED,
	}

	violationTitles := []string{
		"Unauthorized Access Detected", "Policy Violation - Data Handling",
		"Control Failure - Authentication", "Non-Compliance - Training",
		"Documentation Gap", "Process Deviation", "System Misconfiguration",
		"Security Incident", "Audit Finding", "Policy Breach",
	}

	rootCauses := []string{
		"Insufficient training", "System configuration error",
		"Process not followed", "Lack of awareness", "Technical failure",
	}

	entityTypes := []string{"Employee", "System", "Process", "Vendor", "Department"}

	count := minInt(len(violationTitles), 10)
	violations := make([]*comp.CompViolationRecord, count)

	for i := 0; i < count; i++ {
		requirementID := pickRef(store.CompRequirementIDs, i)

		discoveredByID := pickRef(store.EmployeeIDs, i)

		assignedToID := pickRef(store.ManagerIDs, i)

		discoveryDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		dueDate := discoveryDate.AddDate(0, 0, rand.Intn(60)+30) // 30-90 days after discovery

		potentialPenalty := int64((rand.Intn(100) + 10) * 1000) // $10K to $110K
		actualPenalty := int64(0)

		// Status distribution: 30% Open, 40% In Remediation, 20% Closed, 10% Risk Accepted
		var status comp.CompFindingStatus
		if i < 3 {
			status = comp.CompFindingStatus_COMP_FINDING_STATUS_OPEN
		} else if i < 7 {
			status = comp.CompFindingStatus_COMP_FINDING_STATUS_IN_REMEDIATION
		} else if i < 9 {
			status = comp.CompFindingStatus_COMP_FINDING_STATUS_CLOSED
			actualPenalty = int64(rand.Intn(int(potentialPenalty)))
		} else {
			status = findingStatuses[i%len(findingStatuses)]
		}

		// Severity distribution: 10% Critical, 30% High, 40% Medium, 20% Low
		var severity comp.CompSeverityLevel
		if i < 1 {
			severity = comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL
		} else if i < 4 {
			severity = comp.CompSeverityLevel_COMP_SEVERITY_HIGH
		} else if i < 8 {
			severity = comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM
		} else {
			severity = severityLevels[i%len(severityLevels)]
		}

		violations[i] = &comp.CompViolationRecord{
			ViolationId:     genID("cvio", i),
			RequirementId:   requirementID,
			ViolationNumber: fmt.Sprintf("VIO-%04d-%02d", time.Now().Year(), i+1),
			Title:           violationTitles[i],
			Description:     fmt.Sprintf("Violation identified: %s. Requires immediate attention and remediation.", violationTitles[i]),
			Severity:        severity,
			Status:          status,
			DiscoveryDate:   discoveryDate.Unix(),
			DiscoveredById:  discoveredByID,
			AssignedToId:    assignedToID,
			EntityType:      entityTypes[i%len(entityTypes)],
			EntityId:        fmt.Sprintf("ent-%03d", rand.Intn(100)+1),
			RootCause:       rootCauses[i%len(rootCauses)],
			CorrectiveAction: fmt.Sprintf("Implement corrective measures to address %s", violationTitles[i]),
			DueDate:         dueDate.Unix(),
			PotentialPenalty: money(store, potentialPenalty),
			ActualPenalty: money(store, actualPenalty),
			AuditInfo: createAuditInfo(),
		}

		// Set closed date for closed violations
		if status == comp.CompFindingStatus_COMP_FINDING_STATUS_CLOSED {
			violations[i].ClosedDate = time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28)).Unix()
		}
	}
	return violations
}
