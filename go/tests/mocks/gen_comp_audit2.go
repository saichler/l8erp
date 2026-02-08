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

// gen_comp_audit2.go
// Generates:
// - CompRemediationAction (12 records) - references CompAuditFinding
// - CompAuditReport (8 records) - references CompAuditSchedule
// - CompComplianceReport (6 records) - references CompRegulation

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompRemediationActions creates remediation action records
func generateCompRemediationActions(store *MockDataStore) []*comp.CompRemediationAction {
	remediationStatuses := []comp.CompRemediationStatus{
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_NOT_STARTED,
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_IN_PROGRESS,
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED,
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_VERIFIED,
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_OVERDUE,
	}

	actionTitles := []string{
		"Update Control Documentation", "Implement Access Controls",
		"Enhance Monitoring Procedures", "Conduct Staff Training",
		"Revise Process Workflows", "Deploy Technical Solutions",
		"Strengthen Segregation of Duties", "Improve Reporting Mechanisms",
		"Establish Review Procedures", "Update Risk Assessments",
		"Implement Automated Controls", "Enhance Exception Handling",
	}

	count := minInt(len(actionTitles), 12)
	actions := make([]*comp.CompRemediationAction, count)

	for i := 0; i < count; i++ {
		findingID := pickRef(store.CompAuditFindingIDs, i)

		ownerID := pickRef(store.EmployeeIDs, i)

		verifierID := pickRef(store.ManagerIDs, i)

		assignedDate := time.Now().AddDate(0, -rand.Intn(4), -rand.Intn(28))
		dueDate := assignedDate.AddDate(0, 0, rand.Intn(60)+30) // 1-3 months

		// Status distribution: 15% Not Started, 35% In Progress, 30% Completed, 15% Verified, 5% Overdue
		var status comp.CompRemediationStatus
		if i < 2 {
			status = comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_NOT_STARTED
		} else if i < 6 {
			status = comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_IN_PROGRESS
		} else if i < 10 {
			status = comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED
		} else if i < 11 {
			status = comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_VERIFIED
		} else {
			status = remediationStatuses[i%len(remediationStatuses)]
		}

		percentComplete := int32(0)
		completionDate := int64(0)
		verificationDate := int64(0)

		switch status {
		case comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_NOT_STARTED:
			percentComplete = 0
		case comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_IN_PROGRESS:
			percentComplete = int32(rand.Intn(70) + 10) // 10-80%
		case comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED:
			percentComplete = 100
			completionDate = time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(28)).Unix()
		case comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_VERIFIED:
			percentComplete = 100
			completionDate = time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(28)).Unix()
			verificationDate = time.Now().AddDate(0, 0, -rand.Intn(14)).Unix()
		case comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_OVERDUE:
			percentComplete = int32(rand.Intn(50) + 20) // 20-70%
		}

		estimatedCost := int64((rand.Intn(20) + 5) * 1000) // $5K to $25K
		actualCost := int64(0)
		if status == comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED ||
			status == comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_VERIFIED {
			actualCost = estimatedCost + int64((rand.Intn(10)-5)*1000) // +/- $5K variance
		}

		isOverdue := dueDate.Before(time.Now()) && status != comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED &&
			status != comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_VERIFIED

		actions[i] = &comp.CompRemediationAction{
			ActionId:         genID("crem", i),
			FindingId:        findingID,
			ActionNumber:     fmt.Sprintf("ACT-%04d-%02d", time.Now().Year(), i+1),
			Title:            actionTitles[i],
			Description:      fmt.Sprintf("Remediation action: %s to address audit finding", actionTitles[i]),
			Status:           status,
			OwnerId:          ownerID,
			AssignedDate:     assignedDate.Unix(),
			DueDate:          dueDate.Unix(),
			CompletionDate:   completionDate,
			VerificationDate: verificationDate,
			VerifierId:       verifierID,
			ProgressNotes:    fmt.Sprintf("Progress on %s: %d%% complete", actionTitles[i], percentComplete),
			PercentComplete:  percentComplete,
			EstimatedCost: money(store, estimatedCost),
			ActualCost: money(store, actualCost),
			IsOverdue:      isOverdue,
			ExtensionCount: int32(rand.Intn(2)),
			AuditInfo:      createAuditInfo(),
		}

		if actions[i].ExtensionCount > 0 {
			actions[i].ExtensionReason = "Additional time needed due to resource constraints"
		}
	}
	return actions
}

// generateCompAuditReports creates audit report records
func generateCompAuditReports(store *MockDataStore) []*comp.CompAuditReport {
	auditStatuses := []comp.CompAuditStatus{
		comp.CompAuditStatus_COMP_AUDIT_STATUS_DRAFT_REPORT,
		comp.CompAuditStatus_COMP_AUDIT_STATUS_FINAL_REPORT,
		comp.CompAuditStatus_COMP_AUDIT_STATUS_CLOSED,
	}

	count := 8
	reports := make([]*comp.CompAuditReport, count)

	for i := 0; i < count; i++ {
		auditScheduleID := pickRef(store.CompAuditScheduleIDs, i)

		leadAuditorID := pickRef(store.EmployeeIDs, i)

		draftDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		finalDate := draftDate.AddDate(0, 0, rand.Intn(14)+7) // 1-3 weeks after draft
		distributionDate := finalDate.AddDate(0, 0, rand.Intn(7)+1)

		// Status distribution: 40% Draft Report, 60% Final/Closed
		var status comp.CompAuditStatus
		if i < 3 {
			status = comp.CompAuditStatus_COMP_AUDIT_STATUS_DRAFT_REPORT
		} else {
			status = auditStatuses[i%len(auditStatuses)]
		}

		// Finding counts
		findingsCritical := int32(rand.Intn(2))
		findingsHigh := int32(rand.Intn(4))
		findingsMedium := int32(rand.Intn(6) + 1)
		findingsLow := int32(rand.Intn(5) + 1)

		reports[i] = &comp.CompAuditReport{
			ReportId:         genID("crpt", i),
			AuditScheduleId:  auditScheduleID,
			ReportNumber:     fmt.Sprintf("RPT-%04d-%02d", time.Now().Year(), i+1),
			Title:            fmt.Sprintf("Audit Report: %s", compAuditNames[i%len(compAuditNames)]),
			Status:           status,
			ExecutiveSummary: fmt.Sprintf("This audit report summarizes the findings from the %s audit engagement.", compAuditNames[i%len(compAuditNames)]),
			ScopeDescription: fmt.Sprintf("The audit scope included review of %s processes and controls", compAuditNames[i%len(compAuditNames)]),
			Methodology:      "The audit was conducted in accordance with professional auditing standards",
			OverallOpinion:   compOverallOpinions[i%len(compOverallOpinions)],
			FindingsCritical: findingsCritical,
			FindingsHigh:     findingsHigh,
			FindingsMedium:   findingsMedium,
			FindingsLow:      findingsLow,
			DraftDate:        draftDate.Unix(),
			FinalDate:        finalDate.Unix(),
			DistributionDate: distributionDate.Unix(),
			DistributionList: []string{"Audit Committee", "Executive Management", "Board of Directors"},
			LeadAuditorId:    leadAuditorID,
			AuditInfo:        createAuditInfo(),
		}
	}
	return reports
}

// generateCompComplianceReports creates compliance report records
func generateCompComplianceReports(store *MockDataStore) []*comp.CompComplianceReport {
	reportTypes := []string{"Quarterly", "Annual", "Ad-hoc"}
	statusOptions := []string{"Draft", "Under Review", "Final"}

	count := 6
	reports := make([]*comp.CompComplianceReport, count)

	for i := 0; i < count; i++ {
		regulationID := pickRef(store.CompRegulationIDs, i)

		preparedByID := pickRef(store.EmployeeIDs, i)

		approvedByID := pickRef(store.ManagerIDs, i)

		// Calculate period based on report type
		periodEnd := time.Now().AddDate(0, -rand.Intn(3), 0)
		var periodStart time.Time
		if reportTypes[i%len(reportTypes)] == "Annual" {
			periodStart = periodEnd.AddDate(-1, 0, 0)
		} else {
			periodStart = periodEnd.AddDate(0, -3, 0)
		}

		reportDate := periodEnd.AddDate(0, 0, rand.Intn(14)+7)

		// Compliance metrics
		requirementsTotal := int32(rand.Intn(30) + 20)                                          // 20-50 requirements
		requirementsCompliant := int32(float64(requirementsTotal) * (0.6 + rand.Float64()*0.3)) // 60-90%
		requirementsPartial := int32(rand.Intn(int(requirementsTotal-requirementsCompliant)/2 + 1))
		requirementsNonCompliant := requirementsTotal - requirementsCompliant - requirementsPartial

		overallComplianceRate := float64(requirementsCompliant) / float64(requirementsTotal) * 100

		// Status distribution: 20% Draft, 30% Under Review, 50% Final
		var status string
		if i < 1 {
			status = "Draft"
		} else if i < 3 {
			status = "Under Review"
		} else {
			status = statusOptions[i%len(statusOptions)]
		}

		reports[i] = &comp.CompComplianceReport{
			ReportId:                 genID("ccmp", i),
			ReportNumber:             fmt.Sprintf("COMP-%04d-%02d", time.Now().Year(), i+1),
			Title:                    fmt.Sprintf("%s Compliance Report - Q%d %d", reportTypes[i%len(reportTypes)], (int(periodEnd.Month())-1)/3+1, periodEnd.Year()),
			ReportType:               reportTypes[i%len(reportTypes)],
			RegulationId:             regulationID,
			PeriodStart:              periodStart.Unix(),
			PeriodEnd:                periodEnd.Unix(),
			Status:                   status,
			ExecutiveSummary:         fmt.Sprintf("This report summarizes the organization's compliance status for the reporting period."),
			OverallComplianceRate:    overallComplianceRate,
			RequirementsTotal:        requirementsTotal,
			RequirementsCompliant:    requirementsCompliant,
			RequirementsPartial:      requirementsPartial,
			RequirementsNonCompliant: requirementsNonCompliant,
			OpenViolations:           int32(rand.Intn(5)),
			OpenFindings:             int32(rand.Intn(8) + 2),
			OverdueRemediations:      int32(rand.Intn(4)),
			KeyAchievements:          "Improved compliance posture through enhanced controls and monitoring",
			AreasOfConcern:           "Some control gaps identified requiring attention in next quarter",
			Recommendations:          "Continue strengthening compliance program and address identified gaps",
			ReportDate:               reportDate.Unix(),
			PreparedById:             preparedByID,
			ApprovedById:             approvedByID,
			DistributionList:         []string{"Compliance Committee", "Executive Management", "Board of Directors"},
			AuditInfo:                createAuditInfo(),
		}
	}
	return reports
}
