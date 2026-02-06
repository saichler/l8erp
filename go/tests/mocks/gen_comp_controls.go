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

// gen_comp_controls.go
// Generates:
// - CompApprovalMatrix (12 records) - references Department, Employee
// - CompSegregationRule (10 records) - references CompControl
// - CompControlAssessment (20 records) - references CompControl, CompAuditSchedule

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8erp/go/types/erp"
)

// generateCompApprovalMatrices creates approval authority records
func generateCompApprovalMatrices(store *MockDataStore) []*comp.CompApprovalMatrix {
	count := minInt(len(compTransactionTypes), 12)
	matrices := make([]*comp.CompApprovalMatrix, count)

	for i := 0; i < count; i++ {
		departmentID := pickRef(store.DepartmentIDs, i)

		escalationToID := pickRef(store.ManagerIDs, i)

		thresholdMin := int64((i + 1) * 1000)                     // $1K to $12K
		thresholdMax := int64((i + 1) * 10000)                    // $10K to $120K
		requiredApprovals := int32(minInt(rand.Intn(3)+1, i+1))   // 1-3 approvals

		matrices[i] = &comp.CompApprovalMatrix{
			MatrixId:      genID("capm", i),
			Name:          fmt.Sprintf("%s Approval Matrix", compTransactionTypes[i]),
			Description:   fmt.Sprintf("Approval authority matrix for %s transactions", compTransactionTypes[i]),
			TransactionType: compTransactionTypes[i],
			DepartmentId:    departmentID,
			ThresholdMin: &erp.Money{
				Amount:       thresholdMin * 100, // Convert to cents
				CurrencyCode: "USD",
			},
			ThresholdMax: money(thresholdMax * 100),
			ApproverRoleIds:    []string{fmt.Sprintf("role-%03d", (i%5)+1), fmt.Sprintf("role-%03d", (i%5)+6)},
			RequiredApprovals:  requiredApprovals,
			RequiresSequential: i%3 == 0,
			EscalationDays:     int32(rand.Intn(5) + 2), // 2-6 days
			EscalationToId:     escalationToID,
			IsActive:           i < 10, // First 10 are active
			Priority:           int32(i + 1),
			AuditInfo:          createAuditInfo(),
		}
	}
	return matrices
}

// generateCompSegregationRules creates segregation of duties rules
func generateCompSegregationRules(store *MockDataStore) []*comp.CompSegregationRule {
	riskLevels := []comp.CompSeverityLevel{
		comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL,
		comp.CompSeverityLevel_COMP_SEVERITY_HIGH,
		comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM,
		comp.CompSeverityLevel_COMP_SEVERITY_LOW,
	}

	count := minInt(len(compSoDFunctions)/2, 10)
	rules := make([]*comp.CompSegregationRule, count)

	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)

		controlID := pickRef(store.CompControlIDs, i)

		// Risk level distribution: 10% Critical, 30% High, 40% Medium, 20% Low
		var riskLevel comp.CompSeverityLevel
		if i < 1 {
			riskLevel = comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL
		} else if i < 4 {
			riskLevel = comp.CompSeverityLevel_COMP_SEVERITY_HIGH
		} else if i < 8 {
			riskLevel = comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM
		} else {
			riskLevel = riskLevels[i%len(riskLevels)]
		}

		funcAIdx := i * 2
		funcBIdx := i*2 + 1
		if funcBIdx >= len(compSoDFunctions) {
			funcBIdx = 0
		}

		rules[i] = &comp.CompSegregationRule{
			RuleId:               genID("csod", i),
			Code:                 fmt.Sprintf("SOD-%04d", 5000+i+1),
			Name:                 fmt.Sprintf("SoD Rule: %s vs %s", compSoDFunctions[funcAIdx], compSoDFunctions[funcBIdx]),
			Description:          fmt.Sprintf("Segregation of duties rule preventing same user from performing %s and %s", compSoDFunctions[funcAIdx], compSoDFunctions[funcBIdx]),
			ConflictingFunctionA: compSoDFunctions[funcAIdx],
			ConflictingFunctionB: compSoDFunctions[funcBIdx],
			RiskLevel:            riskLevel,
			MitigationControl:    fmt.Sprintf("Implement compensating controls including review and approval by independent party"),
			ControlId:            controlID,
			IsActive:             i < 8, // First 8 are active
			OwnerId:              ownerID,
			ApplicableRoleIds:    []string{fmt.Sprintf("role-%03d", (i%3)+1)},
			BusinessJustification: fmt.Sprintf("Required to prevent fraud and errors in %s processes", compSoDFunctions[funcAIdx]),
			AuditInfo:            createAuditInfo(),
		}
	}
	return rules
}

// generateCompControlAssessments creates control assessment records
func generateCompControlAssessments(store *MockDataStore) []*comp.CompControlAssessment {
	effectivenessLevels := []comp.CompControlEffectiveness{
		comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_EFFECTIVE,
		comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_EFFECTIVE,
		comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_PARTIALLY_EFFECTIVE,
		comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_INEFFECTIVE,
		comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_NOT_TESTED,
	}

	testResults := []string{
		"Control operating as designed",
		"Control operating effectively with minor deviations",
		"Control requires improvement",
		"Control not operating as designed",
		"Unable to complete testing",
	}

	conclusions := []string{
		"Control is operating effectively and meeting control objectives",
		"Control is partially effective with identified gaps requiring remediation",
		"Control deficiency identified requiring management attention",
		"Control failure identified requiring immediate remediation",
	}

	count := 20
	assessments := make([]*comp.CompControlAssessment, count)

	for i := 0; i < count; i++ {
		controlID := pickRef(store.CompControlIDs, i)

		assessorID := pickRef(store.EmployeeIDs, i)

		auditScheduleID := pickRef(store.CompAuditScheduleIDs, i)

		assessmentDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		nextAssessmentDate := assessmentDate.AddDate(0, rand.Intn(6)+3, 0)

		// Effectiveness distribution: 50% Effective, 25% Partially Effective, 15% Ineffective, 10% Not Tested
		var effectiveness comp.CompControlEffectiveness
		if i < 10 {
			effectiveness = comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_EFFECTIVE
		} else if i < 15 {
			effectiveness = comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_PARTIALLY_EFFECTIVE
		} else if i < 18 {
			effectiveness = comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_INEFFECTIVE
		} else {
			effectiveness = effectivenessLevels[i%len(effectivenessLevels)]
		}

		sampleSize := int32(rand.Intn(45) + 5) // 5-50 samples
		exceptionsFound := int32(0)
		exceptionDetails := ""

		if effectiveness != comp.CompControlEffectiveness_COMP_CONTROL_EFFECTIVENESS_EFFECTIVE {
			exceptionsFound = int32(rand.Intn(int(sampleSize/4)) + 1)
			exceptionDetails = fmt.Sprintf("Found %d exceptions out of %d samples tested. Issues include documentation gaps and timing delays.", exceptionsFound, sampleSize)
		}

		assessments[i] = &comp.CompControlAssessment{
			AssessmentId:       genID("ccas", i),
			ControlId:          controlID,
			AssessmentDate:     assessmentDate.Unix(),
			AssessorId:         assessorID,
			Effectiveness:      effectiveness,
			TestPerformed:      fmt.Sprintf("Performed walkthrough and sample testing of control activities"),
			TestResults:        testResults[int(effectiveness)%len(testResults)],
			SampleSize:         sampleSize,
			ExceptionsFound:    exceptionsFound,
			ExceptionDetails:   exceptionDetails,
			Conclusion:         conclusions[int(effectiveness)%len(conclusions)],
			Recommendations:    fmt.Sprintf("Continue monitoring control effectiveness and address any identified gaps"),
			NextAssessmentDate: nextAssessmentDate.Unix(),
			AuditScheduleId:    auditScheduleID,
			AuditInfo:          createAuditInfo(),
		}
	}
	return assessments
}
