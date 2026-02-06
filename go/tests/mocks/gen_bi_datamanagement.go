/*
© 2025 Sharon Aicler (saichler@gmail.com)

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
// - BiDataSource
// - BiETLJob
// - BiETLSchedule

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/bi"
)

// generateDataSources creates data source configuration records
func generateDataSources() []*bi.BiDataSource {
	count := 10

	// Flavorable source type distributions: 40% DATABASE, 30% DATA_WAREHOUSE, 20% API, 10% FILE/STREAM
	sourceTypes := []bi.BiDataSourceType{
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_DATABASE,
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_DATABASE,
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_DATABASE,
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_DATABASE,
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_DATA_WAREHOUSE,
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_DATA_WAREHOUSE,
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_DATA_WAREHOUSE,
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_API,
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_API,
		bi.BiDataSourceType_BI_DATA_SOURCE_TYPE_FILE,
	}

	// Flavorable connection status: 70% CONNECTED, 20% DISCONNECTED, 10% ERROR
	connectionStatuses := []bi.BiConnectionStatus{
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_CONNECTED,
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_CONNECTED,
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_CONNECTED,
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_CONNECTED,
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_CONNECTED,
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_CONNECTED,
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_CONNECTED,
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_DISCONNECTED,
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_DISCONNECTED,
		bi.BiConnectionStatus_BI_CONNECTION_STATUS_ERROR,
	}

	sourceNames := []string{
		"ERP Production Database",
		"Sales Data Warehouse",
		"HR Management System",
		"CRM Analytics Store",
		"Financial Reporting DB",
		"Supply Chain Database",
		"Customer Analytics API",
		"Marketing Data Lake",
		"Inventory Management System",
		"Order Processing Database",
	}

	hosts := []string{
		"db-prod-01.internal.company.com",
		"dw-analytics.internal.company.com",
		"hr-db.internal.company.com",
		"crm-store.internal.company.com",
		"fin-reporting.internal.company.com",
		"scm-db.internal.company.com",
		"api.crm-analytics.company.com",
		"datalake.internal.company.com",
		"inv-db.internal.company.com",
		"orders-db.internal.company.com",
	}

	databases := []string{
		"erp_production",
		"sales_dwh",
		"hr_management",
		"crm_analytics",
		"financial_reports",
		"supply_chain",
		"customer_data",
		"marketing_data",
		"inventory_mgmt",
		"order_processing",
	}

	schemas := []string{"public", "dbo", "analytics", "reporting", "data"}
	ports := []int32{5432, 3306, 1433, 5439, 443}

	sources := make([]*bi.BiDataSource, count)
	for i := 0; i < count; i++ {
		lastConnected := time.Now().AddDate(0, 0, -rand.Intn(7))
		lastSync := lastConnected.AddDate(0, 0, -rand.Intn(3))

		sources[i] = &bi.BiDataSource{
			SourceId:         genID("bds", i),
			Name:             sourceNames[i%len(sourceNames)],
			Description:      fmt.Sprintf("Data source configuration for %s", sourceNames[i%len(sourceNames)]),
			SourceType:       sourceTypes[i%len(sourceTypes)],
			ConnectionString: fmt.Sprintf("Host=%s;Database=%s;Port=%d", hosts[i%len(hosts)], databases[i%len(databases)], ports[i%len(ports)]),
			Host:             hosts[i%len(hosts)],
			Port:             ports[i%len(ports)],
			Database:         databases[i%len(databases)],
			Username:         fmt.Sprintf("bi_service_%d", i+1),
			Schema:           schemas[i%len(schemas)],
			ConnectionStatus: connectionStatuses[i%len(connectionStatuses)],
			LastConnected:    lastConnected.Unix(),
			LastSync:         lastSync.Unix(),
			IsActive:         i < 8, // 80% active
			AuditInfo:        createAuditInfo(),
		}
	}
	return sources
}

// generateETLJobs creates ETL job definition records
func generateETLJobs(store *MockDataStore) []*bi.BiETLJob {
	count := 12

	// Flavorable ETL status: 40% COMPLETED, 30% IDLE, 15% RUNNING, 10% PAUSED, 5% FAILED
	etlStatuses := []bi.BiETLStatus{
		bi.BiETLStatus_BI_ETL_STATUS_COMPLETED,
		bi.BiETLStatus_BI_ETL_STATUS_COMPLETED,
		bi.BiETLStatus_BI_ETL_STATUS_COMPLETED,
		bi.BiETLStatus_BI_ETL_STATUS_COMPLETED,
		bi.BiETLStatus_BI_ETL_STATUS_IDLE,
		bi.BiETLStatus_BI_ETL_STATUS_IDLE,
		bi.BiETLStatus_BI_ETL_STATUS_IDLE,
		bi.BiETLStatus_BI_ETL_STATUS_RUNNING,
		bi.BiETLStatus_BI_ETL_STATUS_RUNNING,
		bi.BiETLStatus_BI_ETL_STATUS_PAUSED,
	}

	jobNames := []string{
		"Daily Sales Extract",
		"Customer Master Sync",
		"Inventory Snapshot Load",
		"Financial Transaction ETL",
		"HR Employee Data Refresh",
		"Order History Archive",
		"Product Catalog Sync",
		"Vendor Master Update",
		"Marketing Campaign Load",
		"Supply Chain Analytics ETL",
		"Customer Behavior Extract",
		"Revenue Recognition Load",
	}

	extractQueries := []string{
		"SELECT * FROM sales WHERE date >= CURRENT_DATE - INTERVAL '1 day'",
		"SELECT * FROM customers WHERE modified_date > :last_extract",
		"SELECT * FROM inventory_snapshot WHERE snapshot_date = CURRENT_DATE",
		"SELECT * FROM financial_transactions WHERE posted_date = CURRENT_DATE",
		"SELECT * FROM employees WHERE status = 'ACTIVE'",
		"SELECT * FROM orders WHERE order_date < CURRENT_DATE - INTERVAL '90 days'",
		"SELECT * FROM products WHERE last_updated > :last_extract",
		"SELECT * FROM vendors WHERE status IN ('ACTIVE', 'PREFERRED')",
		"SELECT * FROM campaigns WHERE start_date <= CURRENT_DATE",
		"SELECT * FROM supply_chain_metrics WHERE metric_date = CURRENT_DATE",
		"SELECT * FROM customer_events WHERE event_date = CURRENT_DATE",
		"SELECT * FROM revenue_schedules WHERE recognition_date = CURRENT_DATE",
	}

	loadModes := []string{"APPEND", "REPLACE", "MERGE"}

	jobs := make([]*bi.BiETLJob, count)
	for i := 0; i < count; i++ {
		sourceID := ""
		targetID := ""
		if len(store.BiDataSourceIDs) > 0 {
			sourceID = store.BiDataSourceIDs[i%len(store.BiDataSourceIDs)]
			targetID = store.BiDataSourceIDs[(i+1)%len(store.BiDataSourceIDs)]
		}

		ownerID := pickRef(store.EmployeeIDs, i)

		lastRun := time.Now().AddDate(0, 0, -rand.Intn(7))
		lastSuccess := lastRun
		status := etlStatuses[i%len(etlStatuses)]

		// If status is FAILED, set lastSuccess to earlier
		errorMessage := ""
		if status == bi.BiETLStatus_BI_ETL_STATUS_FAILED {
			lastSuccess = lastRun.AddDate(0, 0, -rand.Intn(3)-1)
			errorMessage = "Connection timeout: Unable to reach source database"
		}

		rowsProcessed := int64(rand.Intn(500000) + 10000)
		rowsFailed := int64(0)
		if status == bi.BiETLStatus_BI_ETL_STATUS_FAILED {
			rowsFailed = int64(rand.Intn(1000) + 100)
		}

		jobs[i] = &bi.BiETLJob{
			JobId:           genID("betl", i),
			Name:            jobNames[i%len(jobNames)],
			Description:     fmt.Sprintf("ETL job for %s data extraction and loading", jobNames[i%len(jobNames)]),
			SourceId:        sourceID,
			TargetId:        targetID,
			Status:          status,
			ExtractQuery:    extractQueries[i%len(extractQueries)],
			TransformConfig: fmt.Sprintf(`{"mappings": [{"source": "field_%d", "target": "column_%d"}]}`, i+1, i+1),
			LoadTarget:      fmt.Sprintf("dwh_stage_%d", i+1),
			LoadMode:        loadModes[i%len(loadModes)],
			LastRun:         lastRun.Unix(),
			LastSuccess:     lastSuccess.Unix(),
			RowsProcessed:   rowsProcessed,
			RowsFailed:      rowsFailed,
			ErrorMessage:    errorMessage,
			OwnerId:         ownerID,
			IsActive:        i < 10, // ~83% active
			AuditInfo:       createAuditInfo(),
		}
	}
	return jobs
}

// generateETLSchedules creates ETL schedule records
func generateETLSchedules(store *MockDataStore) []*bi.BiETLSchedule {
	count := 10

	// Flavorable frequency distributions: 40% DAILY, 30% WEEKLY, 20% MONTHLY, 10% OTHER
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

	scheduleNames := []string{
		"Daily Sales Sync Schedule",
		"Weekly Customer Update",
		"Monthly Financial Close",
		"Daily Inventory Refresh",
		"Weekly HR Data Sync",
		"Daily Order Processing",
		"Weekly Vendor Update",
		"Monthly Analytics Refresh",
		"Quarterly Report Generation",
		"Daily Marketing Sync",
	}

	runTimes := []string{"02:00", "03:00", "04:00", "05:00", "06:00", "22:00", "23:00"}

	schedules := make([]*bi.BiETLSchedule, count)
	for i := 0; i < count; i++ {
		jobID := pickRef(store.BiETLJobIDs, i)

		startDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		endDate := time.Now().AddDate(1, 0, 0)
		lastRun := time.Now().AddDate(0, 0, -rand.Intn(7))
		nextRun := time.Now().AddDate(0, 0, rand.Intn(7)+1)

		schedules[i] = &bi.BiETLSchedule{
			ScheduleId:  genID("bsch", i),
			JobId:       jobID,
			Name:        scheduleNames[i%len(scheduleNames)],
			Description: fmt.Sprintf("Schedule configuration for %s", scheduleNames[i%len(scheduleNames)]),
			Frequency:   frequencies[i%len(frequencies)],
			StartDate:   startDate.Unix(),
			EndDate:     endDate.Unix(),
			RunTime:     runTimes[i%len(runTimes)],
			DayOfWeek:   int32(i%7 + 1),  // 1-7 for Sunday-Saturday
			DayOfMonth:  int32(i%28 + 1), // 1-28
			NextRun:     nextRun.Unix(),
			LastRun:     lastRun.Unix(),
			IsActive:    i < 8, // 80% active
			AuditInfo:   createAuditInfo(),
		}
	}
	return schedules
}
