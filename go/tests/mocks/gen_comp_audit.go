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

// gen_comp_audit.go
// Generates:
// - CompAuditSchedule (10 records) - references Department, Employee, CompRegulation
// - CompAuditFinding (15 records) - references CompAuditSchedule, CompControl, CompRequirement
// - CompRemediationAction (12 records) - references CompAuditFinding
// - CompAuditReport (8 records) - references CompAuditSchedule
// - CompComplianceReport (6 records) - references CompRegulation

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8erp/go/types/erp"
)

// generateCompAuditSchedules creates audit schedule records
func generateCompAuditSchedules(store *MockDataStore) []*comp.CompAuditSchedule {
	auditTypes := []comp.CompAuditType{
		comp.CompAuditType_COMP_AUDIT_TYPE_INTERNAL,
		comp.CompAuditType_COMP_AUDIT_TYPE_EXTERNAL,
		comp.CompAuditType_COMP_AUDIT_TYPE_REGULATORY,
		comp.CompAuditType_COMP_AUDIT_TYPE_COMPLIANCE,
		comp.CompAuditType_COMP_AUDIT_TYPE_OPERATIONAL,
		comp.CompAuditType_COMP_AUDIT_TYPE_FINANCIAL,
		comp.CompAuditType_COMP_AUDIT_TYPE_IT,
	}

	auditStatuses := []comp.CompAuditStatus{
		comp.CompAuditStatus_COMP_AUDIT_STATUS_PLANNED,
		comp.CompAuditStatus_COMP_AUDIT_STATUS_IN_PROGRESS,
		comp.CompAuditStatus_COMP_AUDIT_STATUS_FIELDWORK_COMPLETE,
		comp.CompAuditStatus_COMP_AUDIT_STATUS_DRAFT_REPORT,
		comp.CompAuditStatus_COMP_AUDIT_STATUS_FINAL_REPORT,
		comp.CompAuditStatus_COMP_AUDIT_STATUS_CLOSED,
	}

	count := minInt(len(compAuditNames), 10)
	schedules := make([]*comp.CompAuditSchedule, count)

	for i := 0; i < count; i++ {
		leadAuditorID := ""
		if len(store.EmployeeIDs) > 0 {
			leadAuditorID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		auditorIDs := []string{}
		if len(store.EmployeeIDs) > 2 {
			auditorIDs = []string{
				store.EmployeeIDs[(i+1)%len(store.EmployeeIDs)],
				store.EmployeeIDs[(i+2)%len(store.EmployeeIDs)],
			}
		}

		departments := []string{}
		if len(store.DepartmentIDs) > 0 {
			departments = []string{store.DepartmentIDs[i%len(store.DepartmentIDs)]}
		}

		relatedRegulationIDs := []string{}
		if len(store.CompRegulationIDs) > 0 {
			relatedRegulationIDs = []string{store.CompRegulationIDs[i%len(store.CompRegulationIDs)]}
		}

		plannedStartDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		plannedEndDate := plannedStartDate.AddDate(0, 0, rand.Intn(30)+14) // 2-6 weeks

		// Status distribution: 20% Planned, 30% In Progress, 20% Fieldwork Complete, 15% Draft Report, 15% Final/Closed
		var status comp.CompAuditStatus
		if i < 2 {
			status = comp.CompAuditStatus_COMP_AUDIT_STATUS_PLANNED
		} else if i < 5 {
			status = comp.CompAuditStatus_COMP_AUDIT_STATUS_IN_PROGRESS
		} else if i < 7 {
			status = comp.CompAuditStatus_COMP_AUDIT_STATUS_FIELDWORK_COMPLETE
		} else if i < 8 {
			status = comp.CompAuditStatus_COMP_AUDIT_STATUS_DRAFT_REPORT
		} else {
			status = auditStatuses[i%len(auditStatuses)]
		}

		actualStartDate := int64(0)
		actualEndDate := int64(0)
		if status != comp.CompAuditStatus_COMP_AUDIT_STATUS_PLANNED {
			actualStartDate = plannedStartDate.Add(time.Duration(rand.Intn(7)-3) * 24 * time.Hour).Unix()
		}
		if status == comp.CompAuditStatus_COMP_AUDIT_STATUS_CLOSED {
			actualEndDate = plannedEndDate.Add(time.Duration(rand.Intn(14)-7) * 24 * time.Hour).Unix()
		}

		budget := int64((rand.Intn(50) + 20) * 1000) // $20K to $70K
		actualCost := int64(0)
		if status != comp.CompAuditStatus_COMP_AUDIT_STATUS_PLANNED {
			actualCost = budget + int64((rand.Intn(20)-10)*1000) // +/- $10K variance
		}

		auditFirm := ""
		if auditTypes[i%len(auditTypes)] == comp.CompAuditType_COMP_AUDIT_TYPE_EXTERNAL {
			auditFirm = compAuditFirms[i%len(compAuditFirms)]
		}

		schedules[i] = &comp.CompAuditSchedule{
			ScheduleId:           fmt.Sprintf("caud-%03d", i+1),
			Name:                 compAuditNames[i],
			Description:          fmt.Sprintf("Audit engagement for %s", compAuditNames[i]),
			AuditType:            auditTypes[i%len(auditTypes)],
			Status:               status,
			FiscalYear:           int32(time.Now().Year()),
			AuditScope:           fmt.Sprintf("Review of %s processes and controls", compAuditNames[i]),
			Departments:          departments,
			Processes:            compProcessAreas[:rand.Intn(3)+2],
			PlannedStartDate:     plannedStartDate.Unix(),
			PlannedEndDate:       plannedEndDate.Unix(),
			ActualStartDate:      actualStartDate,
			ActualEndDate:        actualEndDate,
			LeadAuditorId:        leadAuditorID,
			AuditorIds:           auditorIDs,
			AuditFirm:            auditFirm,
			Budget: &erp.Money{
				Amount:       budget,
				CurrencyCode: "USD",
			},
			ActualCost: &erp.Money{
				Amount:       actualCost,
				CurrencyCode: "USD",
			},
			RelatedRegulationIds: relatedRegulationIDs,
			AuditInfo:            createAuditInfo(),
		}
	}
	return schedules
}

// generateCompAuditFindings creates audit finding records
func generateCompAuditFindings(store *MockDataStore) []*comp.CompAuditFinding {
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

	count := minInt(len(compFindingTitles), 15)
	findings := make([]*comp.CompAuditFinding, count)

	for i := 0; i < count; i++ {
		auditScheduleID := ""
		if len(store.CompAuditScheduleIDs) > 0 {
			auditScheduleID = store.CompAuditScheduleIDs[i%len(store.CompAuditScheduleIDs)]
		}

		responsibleID := ""
		if len(store.ManagerIDs) > 0 {
			responsibleID = store.ManagerIDs[i%len(store.ManagerIDs)]
		}

		relatedControlIDs := []string{}
		if len(store.CompControlIDs) > 0 {
			relatedControlIDs = []string{store.CompControlIDs[i%len(store.CompControlIDs)]}
		}

		relatedRequirementIDs := []string{}
		if len(store.CompRequirementIDs) > 0 {
			relatedRequirementIDs = []string{store.CompRequirementIDs[i%len(store.CompRequirementIDs)]}
		}

		discoveryDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		dueDate := discoveryDate.AddDate(0, 0, rand.Intn(90)+30) // 1-4 months

		// Severity distribution: 10% Critical, 25% High, 40% Medium, 25% Low
		var severity comp.CompSeverityLevel
		if i < 2 {
			severity = comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL
		} else if i < 5 {
			severity = comp.CompSeverityLevel_COMP_SEVERITY_HIGH
		} else if i < 11 {
			severity = comp.CompSeverityLevel_COMP_SEVERITY_MEDIUM
		} else {
			severity = severityLevels[i%len(severityLevels)]
		}

		// Status distribution: 25% Open, 35% In Remediation, 15% Pending Verification, 20% Closed, 5% Risk Accepted
		var status comp.CompFindingStatus
		if i < 4 {
			status = comp.CompFindingStatus_COMP_FINDING_STATUS_OPEN
		} else if i < 9 {
			status = comp.CompFindingStatus_COMP_FINDING_STATUS_IN_REMEDIATION
		} else if i < 11 {
			status = comp.CompFindingStatus_COMP_FINDING_STATUS_PENDING_VERIFICATION
		} else if i < 14 {
			status = comp.CompFindingStatus_COMP_FINDING_STATUS_CLOSED
		} else {
			status = findingStatuses[i%len(findingStatuses)]
		}

		findings[i] = &comp.CompAuditFinding{
			FindingId:             fmt.Sprintf("cfnd-%03d", i+1),
			AuditScheduleId:       auditScheduleID,
			FindingNumber:         fmt.Sprintf("FND-%04d-%02d", time.Now().Year(), i+1),
			Title:                 compFindingTitles[i],
			Description:           fmt.Sprintf("Audit finding: %s. Requires management attention and remediation.", compFindingTitles[i]),
			Severity:              severity,
			Status:                status,
			Condition:             fmt.Sprintf("Control gaps identified in %s process", compFindingTitles[i]),
			Criteria:              fmt.Sprintf("Controls should be designed and operating effectively per policy requirements"),
			Cause:                 fmt.Sprintf("Insufficient oversight and monitoring of %s activities", compFindingTitles[i]),
			Effect:                fmt.Sprintf("Increased risk of errors, fraud, or non-compliance"),
			Recommendation:        fmt.Sprintf("Implement enhanced controls and monitoring for %s", compFindingTitles[i]),
			ManagementResponse:    fmt.Sprintf("Management agrees with finding and will implement remediation plan"),
			ResponsibleId:         responsibleID,
			DiscoveryDate:         discoveryDate.Unix(),
			DueDate:               dueDate.Unix(),
			RelatedControlIds:     relatedControlIDs,
			RelatedRequirementIds: relatedRequirementIDs,
			RepeatFinding:         i < 3, // First 3 are repeat findings
			AuditInfo:             createAuditInfo(),
		}

		// Set closed date for closed findings
		if status == comp.CompFindingStatus_COMP_FINDING_STATUS_CLOSED {
			findings[i].ClosedDate = time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(28)).Unix()
		}

		// Set prior finding ID for repeat findings
		if findings[i].RepeatFinding && i > 0 {
			findings[i].PriorFindingId = fmt.Sprintf("cfnd-%03d-prior", i)
		}
	}
	return findings
}

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
		findingID := ""
		if len(store.CompAuditFindingIDs) > 0 {
			findingID = store.CompAuditFindingIDs[i%len(store.CompAuditFindingIDs)]
		}

		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		verifierID := ""
		if len(store.ManagerIDs) > 0 {
			verifierID = store.ManagerIDs[i%len(store.ManagerIDs)]
		}

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
			ActionId:        fmt.Sprintf("crem-%03d", i+1),
			FindingId:       findingID,
			ActionNumber:    fmt.Sprintf("ACT-%04d-%02d", time.Now().Year(), i+1),
			Title:           actionTitles[i],
			Description:     fmt.Sprintf("Remediation action: %s to address audit finding", actionTitles[i]),
			Status:          status,
			OwnerId:         ownerID,
			AssignedDate:    assignedDate.Unix(),
			DueDate:         dueDate.Unix(),
			CompletionDate:  completionDate,
			VerificationDate: verificationDate,
			VerifierId:      verifierID,
			ProgressNotes:   fmt.Sprintf("Progress on %s: %d%% complete", actionTitles[i], percentComplete),
			PercentComplete: percentComplete,
			EstimatedCost: &erp.Money{
				Amount:       estimatedCost,
				CurrencyCode: "USD",
			},
			ActualCost: &erp.Money{
				Amount:       actualCost,
				CurrencyCode: "USD",
			},
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
		auditScheduleID := ""
		if len(store.CompAuditScheduleIDs) > 0 {
			auditScheduleID = store.CompAuditScheduleIDs[i%len(store.CompAuditScheduleIDs)]
		}

		leadAuditorID := ""
		if len(store.EmployeeIDs) > 0 {
			leadAuditorID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

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
			ReportId:         fmt.Sprintf("crpt-%03d", i+1),
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
		regulationID := ""
		if len(store.CompRegulationIDs) > 0 {
			regulationID = store.CompRegulationIDs[i%len(store.CompRegulationIDs)]
		}

		preparedByID := ""
		if len(store.EmployeeIDs) > 0 {
			preparedByID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		approvedByID := ""
		if len(store.ManagerIDs) > 0 {
			approvedByID = store.ManagerIDs[i%len(store.ManagerIDs)]
		}

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
		requirementsTotal := int32(rand.Intn(30) + 20)     // 20-50 requirements
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
			ReportId:                 fmt.Sprintf("ccmp-%03d", i+1),
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
