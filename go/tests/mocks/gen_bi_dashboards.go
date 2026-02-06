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
// - BiDashboard
// - BiDashboardWidget
// - BiKPI
// - BiKPIThreshold
// - BiDrilldown
// - BiDashboardShare

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/bi"
)

// generateBiDashboards creates dashboard records
func generateBiDashboards(store *MockDataStore) []*bi.BiDashboard {
	count := 10

	// Flavorable status distribution: 60% PUBLISHED, 25% DRAFT, 15% ARCHIVED
	statuses := []bi.BiDashboardStatus{
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_PUBLISHED,
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_PUBLISHED,
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_PUBLISHED,
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_PUBLISHED,
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_PUBLISHED,
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_PUBLISHED,
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_DRAFT,
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_DRAFT,
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_DRAFT,
		bi.BiDashboardStatus_BI_DASHBOARD_STATUS_ARCHIVED,
	}

	names := []string{
		"Executive Summary Dashboard",
		"Sales Performance Overview",
		"Financial Health Monitor",
		"HR Analytics Dashboard",
		"Operations Metrics",
		"Customer Insights",
		"Supply Chain Overview",
		"Project Portfolio Dashboard",
		"Manufacturing KPIs",
		"Revenue Analytics",
	}

	categories := []string{"Executive", "Sales", "Finance", "HR", "Operations", "Customer", "Supply Chain", "Projects", "Manufacturing", "Revenue"}
	refreshIntervals := []int32{60, 300, 600, 900, 1800, 3600}
	layoutConfigs := []string{
		`{"columns": 3, "rows": 4, "gap": 16}`,
		`{"columns": 2, "rows": 3, "gap": 12}`,
		`{"columns": 4, "rows": 3, "gap": 20}`,
	}

	dashboards := make([]*bi.BiDashboard, count)
	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)

		dashboards[i] = &bi.BiDashboard{
			DashboardId:     genID("dash", i),
			Code:            genCode("DASH", i),
			Name:            names[i%len(names)],
			Description:     fmt.Sprintf("Dashboard for %s metrics and analytics", categories[i%len(categories)]),
			Status:          statuses[i%len(statuses)],
			Category:        categories[i%len(categories)],
			OwnerId:         ownerID,
			IsDefault:       i == 0, // First dashboard is default
			IsPublic:        i%3 != 0,
			RefreshInterval: refreshIntervals[i%len(refreshIntervals)],
			LayoutConfig:    layoutConfigs[i%len(layoutConfigs)],
			AuditInfo:       createAuditInfo(),
		}
	}
	return dashboards
}

// generateBiDashboardWidgets creates dashboard widget records
func generateBiDashboardWidgets(store *MockDataStore) []*bi.BiDashboardWidget {
	count := 40

	// Flavorable widget type distribution: 40% CHART, 25% KPI, 15% TABLE, 10% GAUGE, 10% other
	widgetTypes := []bi.BiWidgetType{
		bi.BiWidgetType_BI_WIDGET_TYPE_CHART,
		bi.BiWidgetType_BI_WIDGET_TYPE_CHART,
		bi.BiWidgetType_BI_WIDGET_TYPE_CHART,
		bi.BiWidgetType_BI_WIDGET_TYPE_CHART,
		bi.BiWidgetType_BI_WIDGET_TYPE_KPI,
		bi.BiWidgetType_BI_WIDGET_TYPE_KPI,
		bi.BiWidgetType_BI_WIDGET_TYPE_KPI,
		bi.BiWidgetType_BI_WIDGET_TYPE_TABLE,
		bi.BiWidgetType_BI_WIDGET_TYPE_TABLE,
		bi.BiWidgetType_BI_WIDGET_TYPE_GAUGE,
	}

	// Flavorable chart type distribution: 30% BAR, 25% LINE, 20% PIE, 15% AREA, 10% other
	chartTypes := []bi.BiChartType{
		bi.BiChartType_BI_CHART_TYPE_BAR,
		bi.BiChartType_BI_CHART_TYPE_BAR,
		bi.BiChartType_BI_CHART_TYPE_BAR,
		bi.BiChartType_BI_CHART_TYPE_LINE,
		bi.BiChartType_BI_CHART_TYPE_LINE,
		bi.BiChartType_BI_CHART_TYPE_LINE,
		bi.BiChartType_BI_CHART_TYPE_PIE,
		bi.BiChartType_BI_CHART_TYPE_PIE,
		bi.BiChartType_BI_CHART_TYPE_AREA,
		bi.BiChartType_BI_CHART_TYPE_DONUT,
	}

	names := []string{
		"Revenue Trend",
		"Sales by Region",
		"Customer Acquisition",
		"Monthly Expenses",
		"Employee Headcount",
		"Order Pipeline",
		"Inventory Levels",
		"Project Status",
		"Quality Metrics",
		"Profit Margin",
	}

	widgets := make([]*bi.BiDashboardWidget, count)
	for i := 0; i < count; i++ {
		dashboardID := pickRef(store.BiDashboardIDs, i)

		dataSourceID := pickRef(store.BiDataSourceIDs, i)

		reportID := pickRef(store.BiReportIDs, i)

		kpiID := pickRef(store.BiKPIIDs, i)

		// Grid positioning: 4 widgets per row
		posX := int32((i % 4) * 3)
		posY := int32((i / 4) * 2)

		widgets[i] = &bi.BiDashboardWidget{
			WidgetId:        genID("wdgt", i),
			DashboardId:     dashboardID,
			Name:            fmt.Sprintf("%s %d", names[i%len(names)], (i/len(names))+1),
			Description:     fmt.Sprintf("Widget displaying %s data", names[i%len(names)]),
			WidgetType:      widgetTypes[i%len(widgetTypes)],
			ChartType:       chartTypes[i%len(chartTypes)],
			DataSourceId:    dataSourceID,
			ReportId:        reportID,
			KpiId:           kpiID,
			PositionX:       posX,
			PositionY:       posY,
			Width:           int32(rand.Intn(3) + 2), // 2-4 columns
			Height:          int32(rand.Intn(2) + 1), // 1-2 rows
			Query:           fmt.Sprintf("SELECT * FROM metrics WHERE category = '%s'", names[i%len(names)]),
			Config:          fmt.Sprintf(`{"theme": "default", "animation": true, "legend": %t}`, i%2 == 0),
			RefreshInterval: int32((rand.Intn(6) + 1) * 60), // 60-360 seconds
			AuditInfo:       createAuditInfo(),
		}
	}
	return widgets
}

// generateBiKPIs creates KPI records
func generateBiKPIs(store *MockDataStore) []*bi.BiKPI {
	count := 15

	// Flavorable status distribution: 60% ON_TARGET, 25% AT_RISK, 15% OFF_TARGET
	statuses := []bi.BiKPIStatus{
		bi.BiKPIStatus_BI_KPI_STATUS_ON_TARGET,
		bi.BiKPIStatus_BI_KPI_STATUS_ON_TARGET,
		bi.BiKPIStatus_BI_KPI_STATUS_ON_TARGET,
		bi.BiKPIStatus_BI_KPI_STATUS_ON_TARGET,
		bi.BiKPIStatus_BI_KPI_STATUS_ON_TARGET,
		bi.BiKPIStatus_BI_KPI_STATUS_ON_TARGET,
		bi.BiKPIStatus_BI_KPI_STATUS_AT_RISK,
		bi.BiKPIStatus_BI_KPI_STATUS_AT_RISK,
		bi.BiKPIStatus_BI_KPI_STATUS_AT_RISK,
		bi.BiKPIStatus_BI_KPI_STATUS_OFF_TARGET,
	}

	// Flavorable trend distribution: 50% UP, 30% FLAT, 20% DOWN
	trends := []bi.BiTrendDirection{
		bi.BiTrendDirection_BI_TREND_DIRECTION_UP,
		bi.BiTrendDirection_BI_TREND_DIRECTION_UP,
		bi.BiTrendDirection_BI_TREND_DIRECTION_UP,
		bi.BiTrendDirection_BI_TREND_DIRECTION_UP,
		bi.BiTrendDirection_BI_TREND_DIRECTION_UP,
		bi.BiTrendDirection_BI_TREND_DIRECTION_FLAT,
		bi.BiTrendDirection_BI_TREND_DIRECTION_FLAT,
		bi.BiTrendDirection_BI_TREND_DIRECTION_FLAT,
		bi.BiTrendDirection_BI_TREND_DIRECTION_DOWN,
		bi.BiTrendDirection_BI_TREND_DIRECTION_DOWN,
	}

	names := []string{
		"Revenue Growth Rate",
		"Customer Satisfaction Score",
		"Employee Retention Rate",
		"Net Promoter Score",
		"Gross Profit Margin",
		"Order Fulfillment Rate",
		"Inventory Turnover",
		"Average Order Value",
		"Customer Acquisition Cost",
		"Time to Market",
		"Defect Rate",
		"On-Time Delivery",
		"Resource Utilization",
		"Project Success Rate",
		"Cash Flow Ratio",
	}

	categories := []string{"Financial", "Customer", "Operations", "HR", "Quality"}
	units := []string{"%", "$", "days", "score", "ratio"}
	formulas := []string{
		"(current_revenue - previous_revenue) / previous_revenue * 100",
		"total_satisfied / total_responses * 100",
		"retained_employees / total_employees * 100",
		"promoters - detractors",
		"(revenue - cost) / revenue * 100",
	}

	kpis := make([]*bi.BiKPI, count)
	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)

		dataSourceID := pickRef(store.BiDataSourceIDs, i)

		targetValue := float64(rand.Intn(100) + 50)
		variancePercent := (rand.Float64()*30 - 15)
		currentValue := targetValue * (1 + variancePercent/100)
		previousValue := targetValue * (1 + (rand.Float64()*20-10)/100)

		kpis[i] = &bi.BiKPI{
			KpiId:              genID("kpi", i),
			Code:               genCode("KPI", i),
			Name:               names[i%len(names)],
			Description:        fmt.Sprintf("Measures %s for organizational performance", names[i%len(names)]),
			Category:           categories[i%len(categories)],
			Unit:               units[i%len(units)],
			DataSourceId:       dataSourceID,
			CalculationFormula: formulas[i%len(formulas)],
			CurrentValue:       currentValue,
			TargetValue:        targetValue,
			PreviousValue:      previousValue,
			Status:             statuses[i%len(statuses)],
			Trend:              trends[i%len(trends)],
			OwnerId:            ownerID,
			RefreshInterval:    int32((rand.Intn(6) + 1) * 3600), // 1-6 hours
			LastUpdated:        time.Now().AddDate(0, 0, -rand.Intn(7)).Unix(),
			IsActive:           i%5 != 0, // 80% active
			AuditInfo:          createAuditInfo(),
		}
	}
	return kpis
}

// generateBiKPIThresholds creates KPI threshold records
func generateBiKPIThresholds(store *MockDataStore) []*bi.BiKPIThreshold {
	count := 30

	// Flavorable operator distribution
	operators := []bi.BiThresholdOperator{
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_LESS_THAN,
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_LESS_THAN,
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_GREATER_THAN,
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_GREATER_THAN,
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_LESS_EQUAL,
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_GREATER_EQUAL,
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_BETWEEN,
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_EQUAL,
	}

	severities := []string{"WARNING", "CRITICAL"}
	names := []string{
		"Below Target Warning",
		"Critical Low Threshold",
		"Above Target Alert",
		"Performance Warning",
		"Range Violation",
	}

	thresholds := make([]*bi.BiKPIThreshold, count)
	for i := 0; i < count; i++ {
		kpiID := pickRef(store.BiKPIIDs, i)

		operator := operators[i%len(operators)]
		value := float64(rand.Intn(100) + 10)
		valueUpper := float64(0)
		if operator == bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_BETWEEN {
			valueUpper = value + float64(rand.Intn(50)+10)
		}

		var lastTriggered int64
		if i%3 == 0 {
			lastTriggered = time.Now().AddDate(0, 0, -rand.Intn(30)).Unix()
		}

		thresholds[i] = &bi.BiKPIThreshold{
			ThresholdId:       genID("kthr", i),
			KpiId:             kpiID,
			Name:              fmt.Sprintf("%s %d", names[i%len(names)], (i/len(names))+1),
			Description:       fmt.Sprintf("Threshold rule for KPI monitoring at level %d", i+1),
			Operator:          operator,
			Value:             value,
			ValueUpper:        valueUpper,
			Severity:          severities[i%len(severities)],
			NotificationEmail: fmt.Sprintf("alert%d@company.com", (i%5)+1),
			IsActive:          i%4 != 0, // 75% active
			LastTriggered:     lastTriggered,
			AuditInfo:         createAuditInfo(),
		}
	}
	return thresholds
}

// generateBiDrilldowns creates drilldown configuration records
func generateBiDrilldowns(store *MockDataStore) []*bi.BiDrilldown {
	count := 20

	sourceFields := []string{
		"region",
		"product_category",
		"customer_segment",
		"time_period",
		"department",
		"sales_rep",
		"order_status",
		"inventory_location",
	}

	targetParameters := []string{
		"filter_region",
		"filter_category",
		"filter_segment",
		"date_range",
		"dept_filter",
		"rep_filter",
		"status_filter",
		"location_filter",
	}

	drilldowns := make([]*bi.BiDrilldown, count)
	for i := 0; i < count; i++ {
		sourceReportID := pickRef(store.BiReportIDs, i)

		sourceWidgetID := pickRef(store.BiDashboardWidgetIDs, i)

		targetReportID := pickRef(store.BiReportIDs, (i+3))

		targetDashboardID := pickRef(store.BiDashboardIDs, (i+1))

		drilldowns[i] = &bi.BiDrilldown{
			DrilldownId:       genID("drld", i),
			Name:              fmt.Sprintf("Drilldown %d: %s Detail", i+1, sourceFields[i%len(sourceFields)]),
			Description:       fmt.Sprintf("Drilldown from %s to detailed view", sourceFields[i%len(sourceFields)]),
			SourceReportId:    sourceReportID,
			SourceWidgetId:    sourceWidgetID,
			TargetReportId:    targetReportID,
			TargetDashboardId: targetDashboardID,
			SourceField:       sourceFields[i%len(sourceFields)],
			TargetParameter:   targetParameters[i%len(targetParameters)],
			IsActive:          i%5 != 0, // 80% active
			AuditInfo:         createAuditInfo(),
		}
	}
	return drilldowns
}

// generateBiDashboardShares creates dashboard share records
func generateBiDashboardShares(store *MockDataStore) []*bi.BiDashboardShare {
	count := 25

	// Flavorable access level distribution: 50% VIEW, 30% EXECUTE, 15% EDIT, 5% ADMIN
	accessLevels := []bi.BiAccessLevel{
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EXECUTE,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EXECUTE,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EXECUTE,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EDIT,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_ADMIN,
	}

	sharedWithTypes := []string{"USER", "USER", "USER", "ROLE"}

	shares := make([]*bi.BiDashboardShare, count)
	for i := 0; i < count; i++ {
		dashboardID := pickRef(store.BiDashboardIDs, i)

		sharedBy := pickRef(store.EmployeeIDs, i)

		sharedWithType := sharedWithTypes[i%len(sharedWithTypes)]
		var sharedWithID string
		if sharedWithType == "USER" && len(store.EmployeeIDs) > 0 {
			sharedWithID = store.EmployeeIDs[(i+5)%len(store.EmployeeIDs)]
		} else {
			sharedWithID = fmt.Sprintf("role-%03d", (i%5)+1)
		}

		sharedDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		var expiryDate int64
		if i%4 == 0 {
			expiryDate = sharedDate.AddDate(1, 0, 0).Unix() // 1 year expiry
		}

		shares[i] = &bi.BiDashboardShare{
			ShareId:        genID("dshr", i),
			DashboardId:    dashboardID,
			SharedWithId:   sharedWithID,
			SharedWithType: sharedWithType,
			AccessLevel:    accessLevels[i%len(accessLevels)],
			SharedDate:     sharedDate.Unix(),
			SharedBy:       sharedBy,
			ExpiryDate:     expiryDate,
			AuditInfo:      createAuditInfo(),
		}
	}
	return shares
}
