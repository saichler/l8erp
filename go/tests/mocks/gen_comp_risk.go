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

// gen_comp_risk.go
// Generates:
// - CompRiskRegister (15 records, with embedded assessments and mitigation_plans)
// - CompIncident (12 records) - references CompRiskRegister
//
// Note: CompRiskAssessment and CompMitigationPlan are now
// embedded in CompRiskRegister

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompRiskRegisters creates risk register entries with embedded assessments and mitigation plans
func generateCompRiskRegisters(store *MockDataStore) []*comp.CompRiskRegister {
	riskCategories := []comp.CompRiskCategory{
		comp.CompRiskCategory_COMP_RISK_CATEGORY_OPERATIONAL,
		comp.CompRiskCategory_COMP_RISK_CATEGORY_FINANCIAL,
		comp.CompRiskCategory_COMP_RISK_CATEGORY_STRATEGIC,
		comp.CompRiskCategory_COMP_RISK_CATEGORY_COMPLIANCE,
		comp.CompRiskCategory_COMP_RISK_CATEGORY_REPUTATIONAL,
		comp.CompRiskCategory_COMP_RISK_CATEGORY_TECHNOLOGY,
		comp.CompRiskCategory_COMP_RISK_CATEGORY_LEGAL,
	}

	riskStatuses := []comp.CompRiskStatus{
		comp.CompRiskStatus_COMP_RISK_STATUS_IDENTIFIED,
		comp.CompRiskStatus_COMP_RISK_STATUS_ASSESSED,
		comp.CompRiskStatus_COMP_RISK_STATUS_MITIGATING,
		comp.CompRiskStatus_COMP_RISK_STATUS_ACCEPTED,
		comp.CompRiskStatus_COMP_RISK_STATUS_TRANSFERRED,
		comp.CompRiskStatus_COMP_RISK_STATUS_CLOSED,
	}

	count := minInt(len(compRiskTitles), 15)
	risks := make([]*comp.CompRiskRegister, count)

	for i := 0; i < count; i++ {
		departmentID := pickRef(store.DepartmentIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)

		relatedControlIDs := []string{}
		if len(store.CompControlIDs) > 0 {
			relatedControlIDs = []string{store.CompControlIDs[i%len(store.CompControlIDs)]}
		}

		identifiedDate := time.Now().AddDate(-rand.Intn(2), -rand.Intn(6), 0)
		lastReviewDate := time.Now().AddDate(0, -rand.Intn(3), 0)
		nextReviewDate := time.Now().AddDate(0, rand.Intn(3)+1, 0)

		// Risk scores (1-5 scale)
		inherentLikelihood := int32(rand.Intn(4) + 2) // 2-5
		inherentImpact := int32(rand.Intn(4) + 2)     // 2-5
		inherentRiskScore := inherentLikelihood * inherentImpact

		// Residual scores (after controls) - generally lower
		residualLikelihood := int32(maxInt(1, int(inherentLikelihood)-rand.Intn(2)))
		residualImpact := int32(maxInt(1, int(inherentImpact)-rand.Intn(2)))
		residualRiskScore := residualLikelihood * residualImpact

		// Status distribution
		var status comp.CompRiskStatus
		if i < 3 {
			status = comp.CompRiskStatus_COMP_RISK_STATUS_IDENTIFIED
		} else if i < 7 {
			status = comp.CompRiskStatus_COMP_RISK_STATUS_ASSESSED
		} else if i < 11 {
			status = comp.CompRiskStatus_COMP_RISK_STATUS_MITIGATING
		} else if i < 13 {
			status = comp.CompRiskStatus_COMP_RISK_STATUS_ACCEPTED
		} else {
			status = riskStatuses[i%len(riskStatuses)]
		}

		potentialImpact := int64((rand.Intn(100) + 10) * 10000) // $100K to $1.1M

		risks[i] = &comp.CompRiskRegister{
			RiskId:                   genID("crsk", i),
			Code:                     fmt.Sprintf("RISK-%04d", 6000+i+1),
			Title:                    compRiskTitles[i],
			Description:              fmt.Sprintf("Risk assessment for %s including potential business impact", compRiskTitles[i]),
			Category:                 riskCategories[i%len(riskCategories)],
			Status:                   status,
			DepartmentId:             departmentID,
			OwnerId:                  ownerID,
			InherentLikelihood:       inherentLikelihood,
			InherentImpact:           inherentImpact,
			InherentRiskScore:        inherentRiskScore,
			ResidualLikelihood:       residualLikelihood,
			ResidualImpact:           residualImpact,
			ResidualRiskScore:        residualRiskScore,
			RiskResponse:             compRiskResponses[i%len(compRiskResponses)],
			PotentialFinancialImpact: money(store, potentialImpact),
			IdentifiedDate:           identifiedDate.Unix(),
			LastReviewDate:           lastReviewDate.Unix(),
			NextReviewDate:           nextReviewDate.Unix(),
			RelatedControlIds:        relatedControlIDs,
			TriggerEvents:            compTriggerEvents[i%len(compTriggerEvents)],
			AuditInfo:                createAuditInfo(),
			Assessments:              genCompRiskAssessments(store, i),
			MitigationPlans:          genCompMitigationPlans(store, i),
		}
	}
	return risks
}

// genCompRiskAssessments generates embedded risk assessment records for a risk register
func genCompRiskAssessments(store *MockDataStore, riskIdx int) []*comp.CompRiskAssessment {
	count := 1 + riskIdx%2 // 1-2 assessments per risk

	controlEffectiveness := []string{
		"Controls operating effectively",
		"Controls partially effective - some gaps identified",
		"Controls need significant improvement",
	}

	assessments := make([]*comp.CompRiskAssessment, count)
	for j := 0; j < count; j++ {
		idx := riskIdx*10 + j
		assessorID := pickRef(store.EmployeeIDs, idx)
		assessmentDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))

		likelihoodRating := int32(rand.Intn(4) + 1) // 1-5
		impactRating := int32(rand.Intn(4) + 1)     // 1-5
		riskScore := likelihoodRating * impactRating
		requiresEscalation := riskScore >= 16

		assessments[j] = &comp.CompRiskAssessment{
			AssessmentId:            genID("cras", idx),
			AssessmentDate:          assessmentDate.Unix(),
			AssessorId:              assessorID,
			LikelihoodRating:        likelihoodRating,
			ImpactRating:            impactRating,
			RiskScore:               riskScore,
			LikelihoodJustification: fmt.Sprintf("Based on historical data, likelihood rated as %d/5", likelihoodRating),
			ImpactJustification:     fmt.Sprintf("Potential financial and operational impact rated as %d/5", impactRating),
			ControlEffectiveness:    controlEffectiveness[int(likelihoodRating)%len(controlEffectiveness)],
			Recommendations:         "Continue monitoring and strengthen controls as needed",
			StatusChangeNotes:       fmt.Sprintf("Assessment completed on %s", assessmentDate.Format("2006-01-02")),
			RequiresEscalation:      requiresEscalation,
			AuditInfo:               createAuditInfo(),
		}
	}
	return assessments
}

// genCompMitigationPlans generates embedded mitigation plan records for a risk register
func genCompMitigationPlans(store *MockDataStore, riskIdx int) []*comp.CompMitigationPlan {
	if riskIdx%3 != 0 { // Only some risks have mitigation plans
		return nil
	}
	count := 1

	remediationStatuses := []comp.CompRemediationStatus{
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_IN_PROGRESS,
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED,
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_NOT_STARTED,
	}

	plans := make([]*comp.CompMitigationPlan, count)
	for j := 0; j < count; j++ {
		idx := riskIdx*10 + j
		ownerID := pickRef(store.EmployeeIDs, idx)

		relatedControlIDs := []string{}
		if len(store.CompControlIDs) > 0 {
			relatedControlIDs = []string{store.CompControlIDs[idx%len(store.CompControlIDs)]}
		}

		startDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		targetDate := startDate.AddDate(0, rand.Intn(6)+3, 0)
		status := remediationStatuses[riskIdx%len(remediationStatuses)]

		estimatedCost := int64((rand.Intn(50) + 10) * 1000) // $10K to $60K
		actualCost := int64(0)
		completionDate := int64(0)

		if status == comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED {
			completionDate = time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(28)).Unix()
			actualCost = estimatedCost + int64((rand.Intn(20)-10)*1000)
		}

		targetRiskReduction := int32(rand.Intn(10) + 5)

		plans[j] = &comp.CompMitigationPlan{
			PlanId:              genID("cmit", idx),
			Name:                fmt.Sprintf("Mitigation Plan: %s", compMitigationStrategies[riskIdx%len(compMitigationStrategies)]),
			Description:         fmt.Sprintf("Risk mitigation plan through %s strategy", compMitigationStrategies[riskIdx%len(compMitigationStrategies)]),
			Strategy:            compMitigationStrategies[riskIdx%len(compMitigationStrategies)],
			Status:              status,
			OwnerId:             ownerID,
			StartDate:           startDate.Unix(),
			TargetDate:          targetDate.Unix(),
			CompletionDate:      completionDate,
			EstimatedCost:       money(store, estimatedCost),
			ActualCost:          money(store, actualCost),
			TargetRiskReduction: targetRiskReduction,
			SuccessCriteria:     fmt.Sprintf("Risk score reduced by at least %d points", targetRiskReduction),
			ProgressNotes:       "Implementation progress tracked against milestones",
			ActionItems:         []string{"Assess current state", "Design solution", "Implement controls", "Test effectiveness"},
			RelatedControlIds:   relatedControlIDs,
			AuditInfo:           createAuditInfo(),
		}
	}
	return plans
}

// generateCompIncidents creates incident records
func generateCompIncidents(store *MockDataStore) []*comp.CompIncident {
	severityLevels := []comp.CompSeverityLevel{
		comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL,
		comp.CompSeverityLevel_COMP_SEVERITY_HIGH,
		comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM,
		comp.CompSeverityLevel_COMP_SEVERITY_LOW,
	}

	incidentStatuses := []comp.CompIncidentStatus{
		comp.CompIncidentStatus_COMP_INCIDENT_STATUS_REPORTED,
		comp.CompIncidentStatus_COMP_INCIDENT_STATUS_INVESTIGATING,
		comp.CompIncidentStatus_COMP_INCIDENT_STATUS_CONTAINED,
		comp.CompIncidentStatus_COMP_INCIDENT_STATUS_RESOLVED,
		comp.CompIncidentStatus_COMP_INCIDENT_STATUS_CLOSED,
	}

	riskCategories := []comp.CompRiskCategory{
		comp.CompRiskCategory_COMP_RISK_CATEGORY_OPERATIONAL,
		comp.CompRiskCategory_COMP_RISK_CATEGORY_TECHNOLOGY,
		comp.CompRiskCategory_COMP_RISK_CATEGORY_COMPLIANCE,
		comp.CompRiskCategory_COMP_RISK_CATEGORY_FINANCIAL,
	}

	incidentTitles := []string{
		"Security Breach Detected", "System Outage", "Data Integrity Issue",
		"Process Failure", "Compliance Violation", "Fraud Attempt",
		"Third-Party Incident", "Environmental Event", "Safety Incident",
		"Communication Breakdown", "Access Control Failure", "System Misconfiguration",
	}

	rootCauses := []string{
		"Human error", "System failure", "Process gap",
		"External attack", "Configuration error", "Inadequate controls",
	}

	count := minInt(len(incidentTitles), 12)
	incidents := make([]*comp.CompIncident, count)

	for i := 0; i < count; i++ {
		reportedByID := pickRef(store.EmployeeIDs, i)
		assignedToID := pickRef(store.ManagerIDs, i)
		departmentID := pickRef(store.DepartmentIDs, i)
		relatedRiskID := pickRef(store.CompRiskRegisterIDs, i)

		occurredDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		discoveredDate := occurredDate.Add(time.Duration(rand.Intn(24)) * time.Hour)
		reportedDate := discoveredDate.Add(time.Duration(rand.Intn(4)) * time.Hour)

		// Severity distribution
		var severity comp.CompSeverityLevel
		if i < 1 {
			severity = comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL
		} else if i < 4 {
			severity = comp.CompSeverityLevel_COMP_SEVERITY_HIGH
		} else if i < 9 {
			severity = comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM
		} else {
			severity = severityLevels[i%len(severityLevels)]
		}

		// Status distribution
		var status comp.CompIncidentStatus
		if i < 2 {
			status = comp.CompIncidentStatus_COMP_INCIDENT_STATUS_REPORTED
		} else if i < 5 {
			status = comp.CompIncidentStatus_COMP_INCIDENT_STATUS_INVESTIGATING
		} else if i < 7 {
			status = comp.CompIncidentStatus_COMP_INCIDENT_STATUS_CONTAINED
		} else if i < 10 {
			status = comp.CompIncidentStatus_COMP_INCIDENT_STATUS_RESOLVED
		} else {
			status = incidentStatuses[i%len(incidentStatuses)]
		}

		financialImpact := int64((rand.Intn(50) + 5) * 1000)
		peopleAffected := int32(rand.Intn(100) + 1)

		incidents[i] = &comp.CompIncident{
			IncidentId:           genID("cinc", i),
			IncidentNumber:       fmt.Sprintf("INC-%04d-%02d", time.Now().Year(), i+1),
			Title:                incidentTitles[i],
			Description:          fmt.Sprintf("Incident report: %s. Requires investigation and remediation.", incidentTitles[i]),
			Severity:             severity,
			Status:               status,
			Category:             riskCategories[i%len(riskCategories)],
			OccurredDate:         occurredDate.Unix(),
			DiscoveredDate:       discoveredDate.Unix(),
			ReportedDate:         reportedDate.Unix(),
			ReportedById:         reportedByID,
			AssignedToId:         assignedToID,
			DepartmentId:         departmentID,
			RootCause:            rootCauses[i%len(rootCauses)],
			ImmediateAction:      fmt.Sprintf("Containment measures implemented for %s", incidentTitles[i]),
			CorrectiveAction:     "Implement corrective measures to address root cause",
			PreventiveAction:     "Strengthen controls to prevent recurrence",
			FinancialImpact:      money(store, financialImpact),
			PeopleAffected:       peopleAffected,
			RegulatoryReportable: i < 3,
			RelatedRiskId:        relatedRiskID,
			LessonsLearned:       "Review and update incident response procedures",
			AuditInfo:            createAuditInfo(),
		}

		if status == comp.CompIncidentStatus_COMP_INCIDENT_STATUS_CLOSED {
			incidents[i].ClosedDate = time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(28)).Unix()
		}
	}
	return incidents
}

// maxInt returns the maximum of two integers
func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}
