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
package main

// Generates:
// - BiReport
// - BiReportTemplate
// - BiReportSchedule
// - BiReportExecution
// - BiReportAccess
// - BiReportSubscription

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/bi"
)

// generateBiReports creates report definition records
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
			AuditInfo: createAuditInfo(),
		}
	}
	return reports
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

// generateBiReportSchedules creates report schedule records
func generateBiReportSchedules(store *MockDataStore) []*bi.BiReportSchedule {
	count := 12

	// Flavorable frequency distributions: 35% DAILY, 30% WEEKLY, 25% MONTHLY, 10% QUARTERLY
	frequencies := []bi.BiScheduleFrequency{
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_DAILY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_DAILY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_DAILY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_DAILY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_WEEKLY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_WEEKLY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_WEEKLY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_MONTHLY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_MONTHLY,
		bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_QUARTERLY,
	}

	exportFormats := []bi.BiExportFormat{
		bi.BiExportFormat_BI_EXPORT_FORMAT_PDF,
		bi.BiExportFormat_BI_EXPORT_FORMAT_EXCEL,
		bi.BiExportFormat_BI_EXPORT_FORMAT_CSV,
	}

	runTimes := []string{"06:00", "08:00", "12:00", "18:00", "22:00"}

	scheduleNames := []string{
		"Daily Sales Report Schedule", "Weekly Finance Summary", "Monthly Executive Report",
		"Daily Inventory Update", "Weekly HR Metrics", "Monthly Operations Review",
		"Quarterly Business Review", "Daily Customer Activity", "Weekly Production Summary",
		"Monthly Compliance Report", "Daily Transaction Log", "Weekly Marketing Report",
	}

	schedules := make([]*bi.BiReportSchedule, count)
	for i := 0; i < count; i++ {
		reportID := pickRef(store.BiReportIDs, i)

		startDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		endDate := startDate.AddDate(1, 0, 0)
		lastRun := time.Now().AddDate(0, 0, -rand.Intn(7))
		nextRun := time.Now().AddDate(0, 0, rand.Intn(7)+1)

		schedules[i] = &bi.BiReportSchedule{
			ScheduleId:    genID("sch", i),
			ReportId:      reportID,
			Name:          scheduleNames[i%len(scheduleNames)],
			Description:   fmt.Sprintf("Automated schedule for %s", scheduleNames[i%len(scheduleNames)]),
			Frequency:     frequencies[i%len(frequencies)],
			StartDate:     startDate.Unix(),
			EndDate:       endDate.Unix(),
			RunTime:       runTimes[i%len(runTimes)],
			DayOfWeek:     int32(i % 7),
			DayOfMonth:    int32((i % 28) + 1),
			NextRun:       nextRun.Unix(),
			LastRun:       lastRun.Unix(),
			OutputFormat:  exportFormats[i%len(exportFormats)],
			DeliveryEmail: fmt.Sprintf("reports+schedule%d@company.com", i+1),
			IsActive:      i < 10, // 83% active
			Parameters: map[string]string{
				"include_charts": "true",
				"detail_level":   "summary",
			},
			AuditInfo: createAuditInfo(),
		}
	}
	return schedules
}

// generateBiReportExecutions creates report execution records
func generateBiReportExecutions(store *MockDataStore) []*bi.BiReportExecution {
	count := 30

	// Flavorable status distributions: 70% COMPLETED, 15% RUNNING, 10% FAILED, 5% CANCELLED
	executionStatuses := []bi.BiExecutionStatus{
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_COMPLETED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_COMPLETED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_COMPLETED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_COMPLETED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_COMPLETED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_COMPLETED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_COMPLETED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_RUNNING,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_FAILED,
		bi.BiExecutionStatus_BI_EXECUTION_STATUS_CANCELLED,
	}

	exportFormats := []bi.BiExportFormat{
		bi.BiExportFormat_BI_EXPORT_FORMAT_PDF,
		bi.BiExportFormat_BI_EXPORT_FORMAT_EXCEL,
		bi.BiExportFormat_BI_EXPORT_FORMAT_CSV,
		bi.BiExportFormat_BI_EXPORT_FORMAT_HTML,
	}

	errorMessages := []string{
		"",
		"",
		"",
		"Connection timeout to data source",
		"Insufficient permissions for query",
		"Data source unavailable",
	}

	executions := make([]*bi.BiReportExecution, count)
	for i := 0; i < count; i++ {
		reportID := pickRef(store.BiReportIDs, i)

		scheduleID := ""
		if len(store.BiReportScheduleIDs) > 0 && i%2 == 0 { // 50% scheduled executions
			scheduleID = store.BiReportScheduleIDs[i%len(store.BiReportScheduleIDs)]
		}

		executedBy := pickRef(store.EmployeeIDs, i)

		startTime := time.Now().AddDate(0, 0, -rand.Intn(30)).Add(time.Duration(-rand.Intn(24)) * time.Hour)
		executionDuration := time.Duration(rand.Intn(300)+10) * time.Second
		endTime := startTime.Add(executionDuration)

		status := executionStatuses[i%len(executionStatuses)]
		var errorMessage string
		if status == bi.BiExecutionStatus_BI_EXECUTION_STATUS_FAILED {
			errorMessage = errorMessages[rand.Intn(len(errorMessages)-3)+3]
		}

		rowCount := int32(rand.Intn(10000) + 100)
		fileSize := int64(rowCount) * int64(rand.Intn(100)+50) // Approximate bytes per row

		executions[i] = &bi.BiReportExecution{
			ExecutionId:  genID("exe", i),
			ReportId:     reportID,
			ScheduleId:   scheduleID,
			Status:       status,
			StartTime:    startTime.Unix(),
			EndTime:      endTime.Unix(),
			ExecutedBy:   executedBy,
			RowCount:     rowCount,
			FileSize:     fileSize,
			OutputPath:   fmt.Sprintf("/reports/output/%s/report-%03d.%s", time.Now().Format("2006-01"), i+1, "pdf"),
			OutputFormat: exportFormats[i%len(exportFormats)],
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

// generateBiReportAccess creates report access control records
func generateBiReportAccess(store *MockDataStore) []*bi.BiReportAccess {
	count := 20

	// Flavorable access level distributions: 50% VIEW, 25% EXECUTE, 15% EDIT, 10% ADMIN
	accessLevels := []bi.BiAccessLevel{
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EXECUTE,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EXECUTE,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EDIT,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EDIT,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_ADMIN,
	}

	principalTypes := []string{"USER", "ROLE"}

	roleNames := []string{"report-viewers", "report-analysts", "report-admins", "finance-team", "sales-managers"}

	accessRecords := make([]*bi.BiReportAccess, count)
	for i := 0; i < count; i++ {
		reportID := pickRef(store.BiReportIDs, i)

		principalType := principalTypes[i%len(principalTypes)]
		var principalID string
		if principalType == "USER" && len(store.EmployeeIDs) > 0 {
			principalID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		} else {
			principalID = roleNames[i%len(roleNames)]
		}

		grantedBy := pickRef(store.EmployeeIDs, (i+5))

		grantedDate := time.Now().AddDate(0, -rand.Intn(12), -rand.Intn(28))
		var expiryDate int64
		if i%4 == 0 { // 25% have expiry dates
			expiryDate = grantedDate.AddDate(1, 0, 0).Unix()
		}

		accessRecords[i] = &bi.BiReportAccess{
			AccessId:      genID("acc", i),
			ReportId:      reportID,
			PrincipalId:   principalID,
			PrincipalType: principalType,
			AccessLevel:   accessLevels[i%len(accessLevels)],
			GrantedDate:   grantedDate.Unix(),
			GrantedBy:     grantedBy,
			ExpiryDate:    expiryDate,
			AuditInfo:     createAuditInfo(),
		}
	}
	return accessRecords
}

// generateBiReportSubscriptions creates report subscription records
func generateBiReportSubscriptions(store *MockDataStore) []*bi.BiReportSubscription {
	count := 15

	// Flavorable format distributions: 40% PDF, 35% EXCEL, 25% CSV
	exportFormats := []bi.BiExportFormat{
		bi.BiExportFormat_BI_EXPORT_FORMAT_PDF,
		bi.BiExportFormat_BI_EXPORT_FORMAT_PDF,
		bi.BiExportFormat_BI_EXPORT_FORMAT_PDF,
		bi.BiExportFormat_BI_EXPORT_FORMAT_PDF,
		bi.BiExportFormat_BI_EXPORT_FORMAT_EXCEL,
		bi.BiExportFormat_BI_EXPORT_FORMAT_EXCEL,
		bi.BiExportFormat_BI_EXPORT_FORMAT_EXCEL,
		bi.BiExportFormat_BI_EXPORT_FORMAT_CSV,
		bi.BiExportFormat_BI_EXPORT_FORMAT_CSV,
		bi.BiExportFormat_BI_EXPORT_FORMAT_CSV,
	}

	subscriptions := make([]*bi.BiReportSubscription, count)
	for i := 0; i < count; i++ {
		reportID := pickRef(store.BiReportIDs, i)

		scheduleID := pickRef(store.BiReportScheduleIDs, i)

		subscriberID := pickRef(store.EmployeeIDs, i)

		subscriptions[i] = &bi.BiReportSubscription{
			SubscriptionId: genID("sub", i),
			ReportId:       reportID,
			ScheduleId:     scheduleID,
			SubscriberId:   subscriberID,
			Format:         exportFormats[i%len(exportFormats)],
			DeliveryEmail:  fmt.Sprintf("user%d@company.com", i+1),
			IncludeEmpty:   i%5 == 0, // 20% include empty reports
			IsActive:       i < 12,   // 80% active
			AuditInfo:      createAuditInfo(),
		}
	}
	return subscriptions
}
