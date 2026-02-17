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

// gen_comp_foundation.go
// Generates:
// - CompRegulation (10 records, with embedded requirements which embed violations and statuses)
// - CompControl (15 records, with embedded assessments and segregation_rules)
// - CompPolicyDocument (10 records)
// - CompInsurancePolicy (8 records)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompRegulations creates compliance regulation records with embedded requirements
func generateCompRegulations(store *MockDataStore) []*comp.CompRegulation {
	regulationTypes := []comp.CompRegulationType{
		comp.CompRegulationType_COMP_REGULATION_TYPE_SOX,
		comp.CompRegulationType_COMP_REGULATION_TYPE_GDPR,
		comp.CompRegulationType_COMP_REGULATION_TYPE_HIPAA,
		comp.CompRegulationType_COMP_REGULATION_TYPE_PCI_DSS,
		comp.CompRegulationType_COMP_REGULATION_TYPE_FDA,
		comp.CompRegulationType_COMP_REGULATION_TYPE_INDUSTRY_SPECIFIC,
		comp.CompRegulationType_COMP_REGULATION_TYPE_INTERNAL_POLICY,
		comp.CompRegulationType_COMP_REGULATION_TYPE_ENVIRONMENTAL,
		comp.CompRegulationType_COMP_REGULATION_TYPE_EXPORT_CONTROL,
		comp.CompRegulationType_COMP_REGULATION_TYPE_OTHER,
	}

	count := minInt(len(compRegulationNames), 10)
	regulations := make([]*comp.CompRegulation, count)

	for i := 0; i < count; i++ {
		effectiveDate := time.Now().AddDate(-rand.Intn(3), -rand.Intn(12), 0)
		sunsetDate := effectiveDate.AddDate(5, 0, 0) // 5 years validity

		regulations[i] = &comp.CompRegulation{
			RegulationId:         genID("creg", i),
			Code:                 fmt.Sprintf("REG-%04d", 1000+i+1),
			Name:                 compRegulationNames[i],
			Description:          fmt.Sprintf("Compliance requirements for %s framework", compRegulationNames[i]),
			RegulationType:       regulationTypes[i%len(regulationTypes)],
			Jurisdiction:         compJurisdictions[i%len(compJurisdictions)],
			IssuingBody:          compIssuingBodies[i%len(compIssuingBodies)],
			EffectiveDate:        effectiveDate.Unix(),
			SunsetDate:           sunsetDate.Unix(),
			Version:              fmt.Sprintf("%d.%d", rand.Intn(3)+1, rand.Intn(5)),
			SourceUrl:            fmt.Sprintf("https://regulations.example.com/%s", genID("reg", i)),
			IsActive:             i < 8, // First 8 are active
			ApplicableIndustries: compIndustries[:rand.Intn(4)+2],
			ApplicableRegions:    compJurisdictions[:rand.Intn(3)+1],
			AuditInfo:            createAuditInfo(),
			Requirements:         genCompRequirements(store, i),
		}
	}
	return regulations
}

// genCompRequirements generates embedded requirement records for a regulation
func genCompRequirements(store *MockDataStore, regIdx int) []*comp.CompRequirement {
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
	}

	evidenceReqs := []string{
		"Access logs", "Configuration screenshots", "Policy documents",
		"Training records", "Test results", "Audit reports",
	}

	count := 2 + regIdx%3 // 2-4 requirements per regulation
	requirements := make([]*comp.CompRequirement, count)

	for j := 0; j < count; j++ {
		ownerID := pickRef(store.EmployeeIDs, regIdx*10+j)

		// Priority distribution
		var priority comp.CompSeverityLevel
		if j == 0 {
			priority = comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL
		} else if j < 2 {
			priority = comp.CompSeverityLevel_COMP_SEVERITY_HIGH
		} else {
			priority = severityLevels[(regIdx+j)%len(severityLevels)]
		}

		titleIdx := (regIdx*10 + j) % len(requirementTitles)
		requirements[j] = &comp.CompRequirement{
			RequirementId:        genID("creq", regIdx*10+j),
			Code:                 fmt.Sprintf("REQ-%04d", 4000+regIdx*10+j+1),
			Title:                requirementTitles[titleIdx],
			Description:          fmt.Sprintf("Compliance requirement for %s as mandated by applicable regulations", requirementTitles[titleIdx]),
			Guidance:             fmt.Sprintf("Organizations must implement %s controls to meet this requirement", requirementTitles[titleIdx]),
			Priority:             priority,
			IsMandatory:          j < 2,
			ReviewFrequencyDays:  int32((rand.Intn(4) + 1) * 90),
			ControlObjective:     fmt.Sprintf("Ensure %s is properly implemented and maintained", requirementTitles[titleIdx]),
			EvidenceRequirements: evidenceReqs[:rand.Intn(4)+2],
			OwnerId:             ownerID,
			IsActive:            true,
			AuditInfo:           createAuditInfo(),
			Violations:          genCompViolations(store, regIdx, j),
			Statuses:            genCompStatuses(store, regIdx, j),
		}

		// Set parent requirement for some (hierarchy within this regulation)
		if j > 1 {
			requirements[j].ParentRequirementId = requirements[0].RequirementId
		}
	}
	return requirements
}

// genCompViolations generates embedded violation records for a requirement
func genCompViolations(store *MockDataStore, regIdx int, reqIdx int) []*comp.CompViolationRecord {
	if (regIdx+reqIdx)%3 != 0 { // Only some requirements have violations
		return nil
	}
	count := 1 + (regIdx+reqIdx)%2

	severityLevels := []comp.CompSeverityLevel{
		comp.CompSeverityLevel_COMP_SEVERITY_HIGH,
		comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM,
		comp.CompSeverityLevel_COMP_SEVERITY_LOW,
	}

	findingStatuses := []comp.CompFindingStatus{
		comp.CompFindingStatus_COMP_FINDING_STATUS_OPEN,
		comp.CompFindingStatus_COMP_FINDING_STATUS_IN_REMEDIATION,
		comp.CompFindingStatus_COMP_FINDING_STATUS_CLOSED,
	}

	violationTitles := []string{
		"Unauthorized Access Detected", "Policy Violation - Data Handling",
		"Control Failure - Authentication", "Non-Compliance - Training",
		"Documentation Gap",
	}

	entityTypes := []string{"Employee", "System", "Process", "Vendor", "Department"}

	violations := make([]*comp.CompViolationRecord, count)
	for k := 0; k < count; k++ {
		idx := regIdx*100 + reqIdx*10 + k
		discoveredByID := pickRef(store.EmployeeIDs, idx)
		assignedToID := pickRef(store.ManagerIDs, idx)
		discoveryDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		dueDate := discoveryDate.AddDate(0, 0, rand.Intn(60)+30)
		status := findingStatuses[k%len(findingStatuses)]
		potentialPenalty := int64((rand.Intn(100) + 10) * 1000)
		actualPenalty := int64(0)
		if status == comp.CompFindingStatus_COMP_FINDING_STATUS_CLOSED {
			actualPenalty = int64(rand.Intn(int(potentialPenalty)))
		}

		violations[k] = &comp.CompViolationRecord{
			ViolationId:      genID("cvio", idx),
			ViolationNumber:  fmt.Sprintf("VIO-%04d-%02d", time.Now().Year(), idx+1),
			Title:            violationTitles[idx%len(violationTitles)],
			Description:      fmt.Sprintf("Violation identified: %s", violationTitles[idx%len(violationTitles)]),
			Severity:         severityLevels[k%len(severityLevels)],
			Status:           status,
			DiscoveryDate:    discoveryDate.Unix(),
			DiscoveredById:   discoveredByID,
			AssignedToId:     assignedToID,
			EntityType:       entityTypes[idx%len(entityTypes)],
			EntityId:         fmt.Sprintf("ent-%03d", rand.Intn(100)+1),
			RootCause:        "Process not followed",
			CorrectiveAction: fmt.Sprintf("Implement corrective measures"),
			DueDate:          dueDate.Unix(),
			PotentialPenalty:  money(store, potentialPenalty),
			ActualPenalty:     money(store, actualPenalty),
			AuditInfo:        createAuditInfo(),
		}
		if status == comp.CompFindingStatus_COMP_FINDING_STATUS_CLOSED {
			violations[k].ClosedDate = time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28)).Unix()
		}
	}
	return violations
}

// genCompStatuses generates embedded compliance status records for a requirement
func genCompStatuses(store *MockDataStore, regIdx int, reqIdx int) []*comp.CompComplianceStatus {
	count := 1 + (regIdx+reqIdx)%3 // 1-3 statuses per requirement

	statusTypes := []comp.CompComplianceStatusType{
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_COMPLIANT,
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_COMPLIANT,
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_PARTIALLY_COMPLIANT,
		comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_NON_COMPLIANT,
	}

	entityTypes := []string{"Department", "Process", "System", "Application", "Business Unit"}

	statuses := make([]*comp.CompComplianceStatus, count)
	for k := 0; k < count; k++ {
		idx := regIdx*100 + reqIdx*10 + k
		assessorID := pickRef(store.EmployeeIDs, idx)
		assessmentDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		nextReviewDate := assessmentDate.AddDate(0, rand.Intn(6)+3, 0)
		status := statusTypes[(regIdx+reqIdx+k)%len(statusTypes)]

		var complianceScore float64
		switch status {
		case comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_COMPLIANT:
			complianceScore = float64(90 + rand.Intn(11))
		case comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_PARTIALLY_COMPLIANT:
			complianceScore = float64(60 + rand.Intn(30))
		case comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_NON_COMPLIANT:
			complianceScore = float64(rand.Intn(60))
		default:
			complianceScore = float64(50 + rand.Intn(50))
		}

		gaps := []string{}
		if status != comp.CompComplianceStatusType_COMP_COMPLIANCE_STATUS_COMPLIANT {
			gaps = []string{"Missing documentation", "Control not fully implemented"}
		}

		statuses[k] = &comp.CompComplianceStatus{
			StatusId:        genID("csts", idx),
			EntityType:      entityTypes[idx%len(entityTypes)],
			EntityId:        fmt.Sprintf("entity-%03d", rand.Intn(50)+1),
			Status:          status,
			AssessmentDate:  assessmentDate.Unix(),
			NextReviewDate:  nextReviewDate.Unix(),
			AssessorId:      assessorID,
			Notes:           fmt.Sprintf("Assessment of compliance status for requirement %d", reqIdx+1),
			ComplianceScore: complianceScore,
			GapDescriptions: gaps,
			AuditInfo:       createAuditInfo(),
		}
	}
	return statuses
}

// generateCompControls creates internal control records with embedded assessments and segregation rules
func generateCompControls(store *MockDataStore) []*comp.CompControl {
	controlTypes := []comp.CompControlType{
		comp.CompControlType_COMP_CONTROL_TYPE_PREVENTIVE,
		comp.CompControlType_COMP_CONTROL_TYPE_DETECTIVE,
		comp.CompControlType_COMP_CONTROL_TYPE_CORRECTIVE,
		comp.CompControlType_COMP_CONTROL_TYPE_COMPENSATING,
		comp.CompControlType_COMP_CONTROL_TYPE_DIRECTIVE,
	}

	count := minInt(len(compControlNames), 15)
	controls := make([]*comp.CompControl, count)

	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)
		departmentID := pickRef(store.DepartmentIDs, i)

		controls[i] = &comp.CompControl{
			ControlId:         genID("cctl", i),
			Code:              fmt.Sprintf("CTL-%04d", 2000+i+1),
			Name:              compControlNames[i],
			Description:       fmt.Sprintf("Internal control for %s", compControlNames[i]),
			ControlType:       controlTypes[i%len(controlTypes)],
			ControlObjective:  fmt.Sprintf("Ensure %s is properly managed and monitored", compControlNames[i]),
			ProcessArea:       compProcessAreas[i%len(compProcessAreas)],
			DepartmentId:      departmentID,
			OwnerId:           ownerID,
			IsKeyControl:      i < 8,
			IsAutomated:       i%3 == 0,
			TestFrequencyDays: int32((rand.Intn(4) + 1) * 30),
			TestProcedure:     fmt.Sprintf("Review and test %s control effectiveness through sampling and walkthrough", compControlNames[i]),
			IsActive:          i < 13,
			AuditInfo:         createAuditInfo(),
			Assessments:       genCompControlAssessments(store, i),
			SegregationRules:  genCompSegregationRules(store, i),
		}
	}
	return controls
}

// genCompControlAssessments generates embedded assessment records for a control
func genCompControlAssessments(store *MockDataStore, ctlIdx int) []*comp.CompControlAssessment {
	if ctlIdx%3 != 0 { // Only some controls have assessments
		return nil
	}
	count := 1 + ctlIdx%2

	effectivenessLevels := []comp.CompControlEffectiveness{
		comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_EFFECTIVE,
		comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_EFFECTIVE,
		comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_PARTIALLY_EFFECTIVE,
		comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_INEFFECTIVE,
	}

	testResults := []string{
		"Control operating as designed",
		"Control operating effectively with minor deviations",
		"Control requires improvement",
		"Control not operating as designed",
	}

	conclusions := []string{
		"Control is operating effectively and meeting control objectives",
		"Control is partially effective with identified gaps requiring remediation",
		"Control deficiency identified requiring management attention",
	}

	assessments := make([]*comp.CompControlAssessment, count)
	for j := 0; j < count; j++ {
		idx := ctlIdx*10 + j
		assessorID := pickRef(store.EmployeeIDs, idx)
		auditScheduleID := pickRef(store.CompAuditScheduleIDs, idx)
		assessmentDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		nextAssessmentDate := assessmentDate.AddDate(0, rand.Intn(6)+3, 0)
		effectiveness := effectivenessLevels[(ctlIdx+j)%len(effectivenessLevels)]

		sampleSize := int32(rand.Intn(45) + 5)
		exceptionsFound := int32(0)
		exceptionDetails := ""
		if effectiveness != comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_EFFECTIVE {
			exceptionsFound = int32(rand.Intn(int(sampleSize/4)) + 1)
			exceptionDetails = fmt.Sprintf("Found %d exceptions out of %d samples tested.", exceptionsFound, sampleSize)
		}

		assessments[j] = &comp.CompControlAssessment{
			AssessmentId:       genID("ccas", idx),
			AssessmentDate:     assessmentDate.Unix(),
			AssessorId:         assessorID,
			Effectiveness:      effectiveness,
			TestPerformed:      "Performed walkthrough and sample testing of control activities",
			TestResults:        testResults[int(effectiveness)%len(testResults)],
			SampleSize:         sampleSize,
			ExceptionsFound:    exceptionsFound,
			ExceptionDetails:   exceptionDetails,
			Conclusion:         conclusions[int(effectiveness)%len(conclusions)],
			Recommendations:    "Continue monitoring control effectiveness and address any identified gaps",
			NextAssessmentDate: nextAssessmentDate.Unix(),
			AuditScheduleId:    auditScheduleID,
			AuditInfo:          createAuditInfo(),
		}
	}
	return assessments
}

// genCompSegregationRules generates embedded segregation of duties rules for a control
func genCompSegregationRules(store *MockDataStore, ctlIdx int) []*comp.CompSegregationRule {
	if ctlIdx%5 != 0 { // Only some controls have segregation rules
		return nil
	}
	count := 1

	riskLevels := []comp.CompSeverityLevel{
		comp.CompSeverityLevel_COMP_SEVERITY_HIGH,
		comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM,
	}

	rules := make([]*comp.CompSegregationRule, count)
	for j := 0; j < count; j++ {
		idx := ctlIdx*10 + j
		ownerID := pickRef(store.EmployeeIDs, idx)

		funcAIdx := idx * 2
		funcBIdx := idx*2 + 1
		if funcAIdx >= len(compSoDFunctions) {
			funcAIdx = idx % len(compSoDFunctions)
		}
		if funcBIdx >= len(compSoDFunctions) {
			funcBIdx = (idx + 1) % len(compSoDFunctions)
		}

		rules[j] = &comp.CompSegregationRule{
			RuleId:                genID("csod", idx),
			Code:                  fmt.Sprintf("SOD-%04d", 5000+idx+1),
			Name:                  fmt.Sprintf("SoD Rule: %s vs %s", compSoDFunctions[funcAIdx], compSoDFunctions[funcBIdx]),
			Description:           fmt.Sprintf("Segregation of duties rule preventing same user from performing %s and %s", compSoDFunctions[funcAIdx], compSoDFunctions[funcBIdx]),
			ConflictingFunctionA:  compSoDFunctions[funcAIdx],
			ConflictingFunctionB:  compSoDFunctions[funcBIdx],
			RiskLevel:             riskLevels[idx%len(riskLevels)],
			MitigationControl:     "Implement compensating controls including review and approval by independent party",
			IsActive:              true,
			OwnerId:               ownerID,
			ApplicableRoleIds:     []string{fmt.Sprintf("role-%03d", (idx%3)+1)},
			BusinessJustification: fmt.Sprintf("Required to prevent fraud and errors in %s processes", compSoDFunctions[funcAIdx]),
			AuditInfo:             createAuditInfo(),
		}
	}
	return rules
}

// generateCompPolicyDocuments creates policy document records
func generateCompPolicyDocuments(store *MockDataStore) []*comp.CompPolicyDocument {
	policyStatuses := []string{"Draft", "Under Review", "Approved", "Retired"}

	count := minInt(len(compPolicyTitles), 10)
	policies := make([]*comp.CompPolicyDocument, count)

	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)
		approverID := pickRef(store.ManagerIDs, i)
		departmentID := pickRef(store.DepartmentIDs, i)

		effectiveDate := time.Now().AddDate(-rand.Intn(2), -rand.Intn(6), 0)
		reviewDate := effectiveDate.AddDate(0, 6, 0)
		nextReviewDate := time.Now().AddDate(0, rand.Intn(6)+1, 0)

		// Status distribution: 70% Approved, 15% Under Review, 10% Draft, 5% Retired
		var status string
		if i < 7 {
			status = "Approved"
		} else if i < 9 {
			status = "Under Review"
		} else {
			status = policyStatuses[i%len(policyStatuses)]
		}

		policies[i] = &comp.CompPolicyDocument{
			PolicyId:               genID("cpol", i),
			Code:                   fmt.Sprintf("POL-%04d", 3000+i+1),
			Title:                  compPolicyTitles[i],
			Description:            fmt.Sprintf("Organizational policy governing %s", compPolicyTitles[i]),
			PolicyType:             compPolicyTypes[i%len(compPolicyTypes)],
			DepartmentId:           departmentID,
			OwnerId:                ownerID,
			ApproverId:             approverID,
			Version:                fmt.Sprintf("%d.%d", rand.Intn(5)+1, rand.Intn(3)),
			EffectiveDate:          effectiveDate.Unix(),
			ReviewDate:             reviewDate.Unix(),
			NextReviewDate:         nextReviewDate.Unix(),
			ReviewFrequencyDays:    int32(365), // Annual review
			Status:                 status,
			RequiresAcknowledgment: i%2 == 0,
			AuditInfo:              createAuditInfo(),
		}
	}
	return policies
}

// generateCompInsurancePolicies creates insurance policy records
func generateCompInsurancePolicies(store *MockDataStore) []*comp.CompInsurancePolicy {
	premiumFrequencies := []string{"Annual", "Monthly", "Quarterly"}
	insuranceStatuses := []string{"Active", "Active", "Active", "Pending Renewal", "Expired"}

	count := minInt(len(compInsuranceTypes), 8)
	insurances := make([]*comp.CompInsurancePolicy, count)

	for i := 0; i < count; i++ {
		responsibleID := pickRef(store.EmployeeIDs, i)

		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0) // 1 year policy

		coverageAmount := int64((rand.Intn(9)+1) * 1000000) // $1M to $10M
		deductible := int64((rand.Intn(5) + 1) * 10000)     // $10K to $50K
		premium := int64((rand.Intn(50) + 10) * 1000)       // $10K to $60K

		insurances[i] = &comp.CompInsurancePolicy{
			InsuranceId:      genID("cins", i),
			PolicyNumber:     fmt.Sprintf("INS-%06d", 100000+rand.Intn(900000)),
			Name:             fmt.Sprintf("%s Policy", compInsuranceTypes[i]),
			Description:      fmt.Sprintf("Insurance coverage for %s risks", compInsuranceTypes[i]),
			PolicyType:       compInsuranceTypes[i],
			Provider:         compInsuranceProviders[i%len(compInsuranceProviders)],
			Broker:           fmt.Sprintf("%s Insurance Brokers", lastNames[i%len(lastNames)]),
			CoverageAmount:   money(store, coverageAmount),
			Deductible:       money(store, deductible),
			Premium:          money(store, premium),
			PremiumFrequency: premiumFrequencies[i%len(premiumFrequencies)],
			EffectiveDate:    effectiveDate.Unix(),
			ExpiryDate:       expiryDate.Unix(),
			Status:           insuranceStatuses[i%len(insuranceStatuses)],
			CoveredRisks:     compRiskTitles[:rand.Intn(4)+2],
			ContactName:      randomName(),
			ContactPhone:     randomPhone(),
			ContactEmail:     fmt.Sprintf("insurance%d@%s.com", i+1, compInsuranceProviders[i%len(compInsuranceProviders)]),
			RenewalLeadDays:  int32(60),
			ResponsibleId:    responsibleID,
			AuditInfo:        createAuditInfo(),
		}
	}
	return insurances
}
