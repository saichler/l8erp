/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

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

// Generates:
// - BiReport (with embedded: executions, access_controls, subscriptions, schedules)
// - BiReportTemplate

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/bi"
)

// generateBiReports creates report definition records with embedded children
func generateBiReports(store *MockDataStore) []*bi.BiReport {
	count := 15

	// Flavorable status distributions: 60% PUBLISHED, 20% DRAFT, 15% ARCHIVED, 5% DEPRECATED
	reportStatuses := []bi.BiReportStatus{
		bi.BiReportStatus_BI_REPORT_STATUS_PUBLISHED,
		bi.BiReportStatus_BI_REPORT_STATUS_PUBLISHED,
		bi.BiReportStatus_BI_REPORT_STATUS_PUBLISHED,
		bi.BiReportStatus_BI_REPORT_STATUS_PUBLISHED,
		bi.BiReportStatus_BI_REPORT_STATUS_PUBLISHED,
		bi.BiReportStatus_BI_REPORT_STATUS_PUBLISHED,
		bi.BiReportStatus_BI_REPORT_STATUS_DRAFT,
		bi.BiReportStatus_BI_REPORT_STATUS_DRAFT,
		bi.BiReportStatus_BI_REPORT_STATUS_ARCHIVED,
		bi.BiReportStatus_BI_REPORT_STATUS_DEPRECATED,
	}

	// Flavorable type distributions: 40% STANDARD, 25% SCHEDULED, 20% AD_HOC, 10% DASHBOARD, 5% INTERACTIVE
	reportTypes := []bi.BiReportType{
		bi.BiReportType_BI_REPORT_TYPE_STANDARD,
		bi.BiReportType_BI_REPORT_TYPE_STANDARD,
		bi.BiReportType_BI_REPORT_TYPE_STANDARD,
		bi.BiReportType_BI_REPORT_TYPE_STANDARD,
		bi.BiReportType_BI_REPORT_TYPE_SCHEDULED,
		bi.BiReportType_BI_REPORT_TYPE_SCHEDULED,
		bi.BiReportType_BI_REPORT_TYPE_SCHEDULED,
		bi.BiReportType_BI_REPORT_TYPE_AD_HOC,
		bi.BiReportType_BI_REPORT_TYPE_AD_HOC,
		bi.BiReportType_BI_REPORT_TYPE_DASHBOARD,
	}

	exportFormats := []bi.BiExportFormat{
		bi.BiExportFormat_BI_EXPORT_FORMAT_PDF,
		bi.BiExportFormat_BI_EXPORT_FORMAT_EXCEL,
		bi.BiExportFormat_BI_EXPORT_FORMAT_CSV,
		bi.BiExportFormat_BI_EXPORT_FORMAT_HTML,
		bi.BiExportFormat_BI_EXPORT_FORMAT_JSON,
	}

	categories := []string{"Finance", "Sales", "Operations", "HR", "Inventory", "Customer", "Executive"}

	queries := []string{
		"SELECT * FROM sales_summary WHERE period = :period",
		"SELECT * FROM financial_metrics WHERE year = :year",
		"SELECT * FROM employee_stats GROUP BY department",
		"SELECT * FROM inventory_levels WHERE warehouse_id = :warehouse",
		"SELECT * FROM customer_orders WHERE status = :status",
	}

	reports := make([]*bi.BiReport, count)
	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)
		dataSourceID := pickRef(store.BiDataSourceIDs, i)
		templateID := pickRef(store.BiReportTemplateIDs, i)
		lastExecuted := time.Now().AddDate(0, 0, -rand.Intn(30))

		reports[i] = &bi.BiReport{
			ReportId:       genID("rpt", i),
			Code:           genCode("RPT", i),
			Name:           biReportNames[i%len(biReportNames)],
			Description:    fmt.Sprintf("Comprehensive %s for business analytics", biReportNames[i%len(biReportNames)]),
			ReportType:     reportTypes[i%len(reportTypes)],
			Status:         reportStatuses[i%len(reportStatuses)],
			Category:       categories[i%len(categories)],
			OwnerId:        ownerID,
			DataSourceId:   dataSourceID,
			TemplateId:     templateID,
			Query:          queries[i%len(queries)],
			DefaultFormat:  exportFormats[i%len(exportFormats)],
			IsPublic:       i%3 == 0, // 33% public
			LastExecuted:   lastExecuted.Unix(),
			ExecutionCount: int32(rand.Intn(500) + 10),
			Parameters: map[string]string{
				"period": "current_month",
				"format": "detailed",
			},
			Executions:     generateReportExecutionsInline(i, store),
			AccessControls: generateReportAccessInline(i, store),
			Subscriptions:  generateReportSubscriptionsInline(i, store),
			Schedules:      generateReportSchedulesInline(i, exportFormats),
			AuditInfo:      createAuditInfo(),
		}
	}
	return reports
}

// generateReportSchedulesInline creates 2 embedded report schedules per report
func generateReportSchedulesInline(parentIdx int, exportFormats []bi.BiExportFormat) []*bi.BiReportSchedule {
	frequencies := []bi.BiScheduleFrequency{
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_DAILY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_WEEKLY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_MONTHLY,
	}
	runTimes := []string{"06:00", "08:00", "12:00", "18:00", "22:00"}
	scheduleNames := []string{"Morning Report", "Evening Report", "Weekly Summary"}

	schedules := make([]*bi.BiReportSchedule, 2)
	for j := 0; j < 2; j++ {
		idx := parentIdx*2 + j
		startDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		endDate := startDate.AddDate(1, 0, 0)
		lastRun := time.Now().AddDate(0, 0, -rand.Intn(7))
		nextRun := time.Now().AddDate(0, 0, rand.Intn(7)+1)

		schedules[j] = &bi.BiReportSchedule{
			ScheduleId:    genID("sch", idx),
			Name:          fmt.Sprintf("%s %d", scheduleNames[j%len(scheduleNames)], parentIdx+1),
			Description:   fmt.Sprintf("Automated schedule for report %d", parentIdx+1),
			Frequency:     frequencies[idx%len(frequencies)],
			StartDate:     startDate.Unix(),
			EndDate:       endDate.Unix(),
			RunTime:       runTimes[idx%len(runTimes)],
			DayOfWeek:     int32(idx % 7),
			DayOfMonth:    int32((idx % 28) + 1),
			NextRun:       nextRun.Unix(),
			LastRun:       lastRun.Unix(),
			OutputFormat:  exportFormats[idx%len(exportFormats)],
			DeliveryEmail: fmt.Sprintf("reports+schedule%d@company.com", idx+1),
			IsActive:      j == 0, // First schedule active
			Parameters: map[string]string{
				"include_charts": "true",
				"detail_level":   "summary",
			},
			AuditInfo: createAuditInfo(),
		}
	}
	return schedules
}

// generateReportExecutionsInline creates 2 embedded executions per report
func generateReportExecutionsInline(parentIdx int, store *MockDataStore) []*bi.BiReportExecution {
	executionStatuses := []bi.BiExecutionStatus{
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_COMPLETED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_COMPLETED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_RUNNING,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_FAILED,
	}
	exportFormats := []bi.BiExportFormat{
		bi.BiExportFormat_BI_EXPORT_FORMAT_PDF,
		bi.BiExportFormat_BI_EXPORT_FORMAT_EXCEL,
		bi.BiExportFormat_BI_EXPORT_FORMAT_CSV,
	}

	executions := make([]*bi.BiReportExecution, 2)
	for j := 0; j < 2; j++ {
		idx := parentIdx*2 + j
		executedBy := pickRef(store.EmployeeIDs, idx)
		startTime := time.Now().AddDate(0, 0, -rand.Intn(30)).Add(time.Duration(-rand.Intn(24)) * time.Hour)
		endTime := startTime.Add(time.Duration(rand.Intn(300)+10) * time.Second)
		status := executionStatuses[idx%len(executionStatuses)]
		var errorMessage string
		if status == bi.BiExecutionStatus_BI_EXECUTION_STATUS_FAILED {
			errorMessage = "Connection timeout to data source"
		}
		rowCount := int32(rand.Intn(10000) + 100)

		executions[j] = &bi.BiReportExecution{
			ExecutionId:  genID("exe", idx),
			ScheduleId:   fmt.Sprintf("sch-%03d", idx+1),
			Status:       status,
			StartTime:    startTime.Unix(),
			EndTime:      endTime.Unix(),
			ExecutedBy:   executedBy,
			RowCount:     rowCount,
			FileSize:     int64(rowCount) * int64(rand.Intn(100)+50),
			OutputPath:   fmt.Sprintf("/reports/output/%s/report-%03d.pdf", time.Now().Format("2006-01"), idx+1),
			OutputFormat: exportFormats[idx%len(exportFormats)],
			ErrorMessage: errorMessage,
			Parameters: map[string]string{
				"start_date": time.Now().AddDate(0, -1, 0).Format("2006-01-02"),
				"end_date":   time.Now().Format("2006-01-02"),
			},
			AuditInfo: createAuditInfo(),
		}
	}
	return executions
}

// generateReportAccessInline creates 2 embedded access control records per report
func generateReportAccessInline(parentIdx int, store *MockDataStore) []*bi.BiReportAccess {
	accessLevels := []bi.BiAccessLevel{
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EXECUTE,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EDIT,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_ADMIN,
	}
	roleNames := []string{"report-viewers", "report-analysts", "report-admins", "finance-team"}

	accesses := make([]*bi.BiReportAccess, 2)
	for j := 0; j < 2; j++ {
		idx := parentIdx*2 + j
		grantedBy := pickRef(store.EmployeeIDs, idx+5)
		grantedDate := time.Now().AddDate(0, -rand.Intn(12), -rand.Intn(28))

		var principalID string
		principalType := "USER"
		if j%2 == 0 {
			principalID = pickRef(store.EmployeeIDs, idx)
		} else {
			principalType = "ROLE"
			principalID = roleNames[idx%len(roleNames)]
		}

		var expiryDate int64
		if j == 0 {
			expiryDate = grantedDate.AddDate(1, 0, 0).Unix()
		}

		accesses[j] = &bi.BiReportAccess{
			AccessId:      genID("acc", idx),
			PrincipalId:   principalID,
			PrincipalType: principalType,
			AccessLevel:   accessLevels[idx%len(accessLevels)],
			GrantedDate:   grantedDate.Unix(),
			GrantedBy:     grantedBy,
			ExpiryDate:    expiryDate,
			AuditInfo:     createAuditInfo(),
		}
	}
	return accesses
}

// generateReportSubscriptionsInline creates 2 embedded subscriptions per report
func generateReportSubscriptionsInline(parentIdx int, store *MockDataStore) []*bi.BiReportSubscription {
	exportFormats := []bi.BiExportFormat{
		bi.BiExportFormat_BI_EXPORT_FORMAT_PDF,
		bi.BiExportFormat_BI_EXPORT_FORMAT_EXCEL,
		bi.BiExportFormat_BI_EXPORT_FORMAT_CSV,
	}

	subs := make([]*bi.BiReportSubscription, 2)
	for j := 0; j < 2; j++ {
		idx := parentIdx*2 + j
		subscriberID := pickRef(store.EmployeeIDs, idx)

		subs[j] = &bi.BiReportSubscription{
			SubscriptionId: genID("sub", idx),
			ScheduleId:     fmt.Sprintf("sch-%03d", idx+1),
			SubscriberId:   subscriberID,
			Format:         exportFormats[idx%len(exportFormats)],
			DeliveryEmail:  fmt.Sprintf("user%d@company.com", idx+1),
			IncludeEmpty:   j == 0,
			IsActive:       true,
			AuditInfo:      createAuditInfo(),
		}
	}
	return subs
}

// generateBiReportTemplates creates report template records
func generateBiReportTemplates(store *MockDataStore) []*bi.BiReportTemplate {
	count := 8

	// Flavorable type distributions: 50% STANDARD, 25% SCHEDULED, 25% AD_HOC
	reportTypes := []bi.BiReportType{
		bi.BiReportType_BI_REPORT_TYPE_STANDARD,
		bi.BiReportType_BI_REPORT_TYPE_STANDARD,
		bi.BiReportType_BI_REPORT_TYPE_STANDARD,
		bi.BiReportType_BI_REPORT_TYPE_STANDARD,
		bi.BiReportType_BI_REPORT_TYPE_SCHEDULED,
		bi.BiReportType_BI_REPORT_TYPE_SCHEDULED,
		bi.BiReportType_BI_REPORT_TYPE_AD_HOC,
		bi.BiReportType_BI_REPORT_TYPE_AD_HOC,
	}

	templateNames := []string{
		"Standard Financial Report", "Sales Performance Template", "Operational Metrics Template",
		"Executive Summary Template", "HR Analytics Template", "Inventory Status Template",
		"Customer Analysis Template", "Production Report Template",
	}

	categories := []string{"Finance", "Sales", "Operations", "Executive", "HR", "Inventory", "Customer", "Production"}

	layoutTemplates := []string{
		`{"header": true, "footer": true, "columns": 3, "orientation": "portrait"}`,
		`{"header": true, "footer": false, "columns": 2, "orientation": "landscape"}`,
		`{"header": true, "footer": true, "columns": 1, "orientation": "portrait"}`,
	}

	styleTemplates := []string{
		`{"font": "Arial", "fontSize": 10, "headerColor": "#003366", "accentColor": "#0066CC"}`,
		`{"font": "Helvetica", "fontSize": 11, "headerColor": "#336633", "accentColor": "#66CC66"}`,
		`{"font": "Times New Roman", "fontSize": 12, "headerColor": "#663333", "accentColor": "#CC6666"}`,
	}

	templates := make([]*bi.BiReportTemplate, count)
	for i := 0; i < count; i++ {
		templates[i] = &bi.BiReportTemplate{
			TemplateId:     genID("tpl", i),
			Name:           templateNames[i%len(templateNames)],
			Description:    fmt.Sprintf("Template for creating %s reports", templateNames[i%len(templateNames)]),
			ReportType:     reportTypes[i%len(reportTypes)],
			Category:       categories[i%len(categories)],
			LayoutTemplate: layoutTemplates[i%len(layoutTemplates)],
			StyleTemplate:  styleTemplates[i%len(styleTemplates)],
			IsActive:       i < 6, // First 6 are active (75%)
			AuditInfo:      createAuditInfo(),
		}
	}
	return templates
}
