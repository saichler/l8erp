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

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
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
			Budget: money(store, budget),
			ActualCost: money(store, actualCost),
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
		auditScheduleID := pickRef(store.CompAuditScheduleIDs, i)

		responsibleID := pickRef(store.ManagerIDs, i)

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
			FindingId:             genID("cfnd", i),
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
