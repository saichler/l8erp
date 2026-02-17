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

// gen_comp_audit.go
// Generates:
// - CompAuditSchedule (10 records, with embedded reports)
// - CompAuditFinding (15 records, with embedded remediation actions)
//
// Note: CompAuditReport is now embedded in CompAuditSchedule
// Note: CompRemediationAction is now embedded in CompAuditFinding

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompAuditSchedules creates audit schedule records with embedded reports
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
		leadAuditorID := pickRef(store.EmployeeIDs, i)

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

		// Status distribution
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
			actualCost = budget + int64((rand.Intn(20)-10)*1000)
		}

		auditFirm := ""
		if auditTypes[i%len(auditTypes)] == comp.CompAuditType_COMP_AUDIT_TYPE_EXTERNAL {
			auditFirm = compAuditFirms[i%len(compAuditFirms)]
		}

		schedules[i] = &comp.CompAuditSchedule{
			ScheduleId:           genID("caud", i),
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
			Budget:               money(store, budget),
			ActualCost:           money(store, actualCost),
			RelatedRegulationIds: relatedRegulationIDs,
			AuditInfo:            createAuditInfo(),
			Reports:              genCompAuditReports(store, i),
		}
	}
	return schedules
}

// genCompAuditReports generates embedded audit report records for an audit schedule
func genCompAuditReports(store *MockDataStore, schedIdx int) []*comp.CompAuditReport {
	if schedIdx%3 != 0 { // Only some schedules have reports
		return nil
	}
	count := 1

	auditStatuses := []comp.CompAuditStatus{
		comp.CompAuditStatus_COMP_AUDIT_STATUS_DRAFT_REPORT,
		comp.CompAuditStatus_COMP_AUDIT_STATUS_FINAL_REPORT,
		comp.CompAuditStatus_COMP_AUDIT_STATUS_CLOSED,
	}

	reports := make([]*comp.CompAuditReport, count)
	for j := 0; j < count; j++ {
		idx := schedIdx*10 + j
		leadAuditorID := pickRef(store.EmployeeIDs, idx)

		draftDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		finalDate := draftDate.AddDate(0, 0, rand.Intn(14)+7)
		distributionDate := finalDate.AddDate(0, 0, rand.Intn(7)+1)

		status := auditStatuses[schedIdx%len(auditStatuses)]

		reports[j] = &comp.CompAuditReport{
			ReportId:          genID("crpt", idx),
			ReportNumber:      fmt.Sprintf("RPT-%04d-%02d", time.Now().Year(), idx+1),
			Title:             fmt.Sprintf("Audit Report: %s", compAuditNames[schedIdx%len(compAuditNames)]),
			Status:            status,
			ExecutiveSummary:  fmt.Sprintf("This audit report summarizes the findings from the %s audit.", compAuditNames[schedIdx%len(compAuditNames)]),
			ScopeDescription: fmt.Sprintf("Review of %s processes and controls", compAuditNames[schedIdx%len(compAuditNames)]),
			Methodology:      "The audit was conducted in accordance with professional auditing standards",
			OverallOpinion:    compOverallOpinions[schedIdx%len(compOverallOpinions)],
			FindingsCritical:  int32(rand.Intn(2)),
			FindingsHigh:      int32(rand.Intn(4)),
			FindingsMedium:    int32(rand.Intn(6) + 1),
			FindingsLow:       int32(rand.Intn(5) + 1),
			DraftDate:         draftDate.Unix(),
			FinalDate:         finalDate.Unix(),
			DistributionDate:  distributionDate.Unix(),
			DistributionList:  []string{"Audit Committee", "Executive Management", "Board of Directors"},
			LeadAuditorId:     leadAuditorID,
			AuditInfo:         createAuditInfo(),
		}
	}
	return reports
}

// generateCompAuditFindings creates audit finding records with embedded remediation actions
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
		auditScheduleID := pickRef(store.CompAuditScheduleIDs, i)
		responsibleID := pickRef(store.ManagerIDs, i)

		relatedControlIDs := []string{}
		if len(store.CompControlIDs) > 0 {
			relatedControlIDs = []string{store.CompControlIDs[i%len(store.CompControlIDs)]}
		}

		discoveryDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		dueDate := discoveryDate.AddDate(0, 0, rand.Intn(90)+30)

		// Severity distribution
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

		// Status distribution
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
			FindingId:         genID("cfnd", i),
			AuditScheduleId:   auditScheduleID,
			FindingNumber:     fmt.Sprintf("FND-%04d-%02d", time.Now().Year(), i+1),
			Title:             compFindingTitles[i],
			Description:       fmt.Sprintf("Audit finding: %s. Requires management attention.", compFindingTitles[i]),
			Severity:          severity,
			Status:            status,
			Condition:         fmt.Sprintf("Control gaps identified in %s process", compFindingTitles[i]),
			Criteria:          "Controls should be designed and operating effectively per policy requirements",
			Cause:             fmt.Sprintf("Insufficient oversight and monitoring of %s activities", compFindingTitles[i]),
			Effect:            "Increased risk of errors, fraud, or non-compliance",
			Recommendation:    fmt.Sprintf("Implement enhanced controls and monitoring for %s", compFindingTitles[i]),
			ManagementResponse: "Management agrees with finding and will implement remediation plan",
			ResponsibleId:     responsibleID,
			DiscoveryDate:     discoveryDate.Unix(),
			DueDate:           dueDate.Unix(),
			RelatedControlIds: relatedControlIDs,
			RepeatFinding:     i < 3,
			AuditInfo:         createAuditInfo(),
			Actions:           genCompRemediationActions(store, i),
		}

		if status == comp.CompFindingStatus_COMP_FINDING_STATUS_CLOSED {
			findings[i].ClosedDate = time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(28)).Unix()
		}

		if findings[i].RepeatFinding && i > 0 {
			findings[i].PriorFindingId = fmt.Sprintf("cfnd-%03d-prior", i)
		}
	}
	return findings
}

// genCompRemediationActions generates embedded remediation action records for an audit finding
func genCompRemediationActions(store *MockDataStore, findingIdx int) []*comp.CompRemediationAction {
	if findingIdx%3 != 0 { // Only some findings have remediation actions
		return nil
	}
	count := 1 + findingIdx%2

	remediationStatuses := []comp.CompRemediationStatus{
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_IN_PROGRESS,
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED,
		comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_NOT_STARTED,
	}

	actionTitles := []string{
		"Update Control Documentation", "Implement Access Controls",
		"Enhance Monitoring Procedures", "Conduct Staff Training",
		"Revise Process Workflows", "Deploy Technical Solutions",
	}

	actions := make([]*comp.CompRemediationAction, count)
	for j := 0; j < count; j++ {
		idx := findingIdx*10 + j
		ownerID := pickRef(store.EmployeeIDs, idx)
		verifierID := pickRef(store.ManagerIDs, idx)
		assignedDate := time.Now().AddDate(0, -rand.Intn(4), -rand.Intn(28))
		dueDate := assignedDate.AddDate(0, 0, rand.Intn(60)+30)
		status := remediationStatuses[(findingIdx+j)%len(remediationStatuses)]

		percentComplete := int32(0)
		completionDate := int64(0)
		verificationDate := int64(0)

		switch status {
		case comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_NOT_STARTED:
			percentComplete = 0
		case comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_IN_PROGRESS:
			percentComplete = int32(rand.Intn(70) + 10)
		case comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED:
			percentComplete = 100
			completionDate = time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(28)).Unix()
		}

		estimatedCost := int64((rand.Intn(20) + 5) * 1000)
		actualCost := int64(0)
		if status == comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED {
			actualCost = estimatedCost + int64((rand.Intn(10)-5)*1000)
		}

		isOverdue := dueDate.Before(time.Now()) &&
			status != comp.CompRemediationStatus_COMP_REMEDIATION_STATUS_COMPLETED

		actions[j] = &comp.CompRemediationAction{
			ActionId:         genID("crem", idx),
			ActionNumber:     fmt.Sprintf("ACT-%04d-%02d", time.Now().Year(), idx+1),
			Title:            actionTitles[idx%len(actionTitles)],
			Description:      fmt.Sprintf("Remediation action: %s to address audit finding", actionTitles[idx%len(actionTitles)]),
			Status:           status,
			OwnerId:          ownerID,
			AssignedDate:     assignedDate.Unix(),
			DueDate:          dueDate.Unix(),
			CompletionDate:   completionDate,
			VerificationDate: verificationDate,
			VerifierId:       verifierID,
			ProgressNotes:    fmt.Sprintf("Progress on %s: %d%% complete", actionTitles[idx%len(actionTitles)], percentComplete),
			PercentComplete:  percentComplete,
			EstimatedCost:    money(store, estimatedCost),
			ActualCost:       money(store, actualCost),
			IsOverdue:        isOverdue,
			ExtensionCount:   int32(rand.Intn(2)),
			AuditInfo:        createAuditInfo(),
		}

		if actions[j].ExtensionCount > 0 {
			actions[j].ExtensionReason = "Additional time needed due to resource constraints"
		}
	}
	return actions
}
