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
package mocks

// Generates:
// - BiDashboard (with embedded: widgets, shares, drilldowns)
// - BiKPI (with embedded: thresholds)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/bi"
)

// generateBiDashboards creates dashboard records with embedded widgets, shares, drilldowns
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
			Widgets:         generateWidgetsInline(i, store),
			Shares:          generateSharesInline(i, store),
			Drilldowns:      generateDrilldownsInline(i, store),
			AuditInfo:       createAuditInfo(),
		}
	}
	return dashboards
}

// generateWidgetsInline creates 3 embedded widgets per dashboard
func generateWidgetsInline(parentIdx int, store *MockDataStore) []*bi.BiDashboardWidget {
	widgetTypes := []bi.BiWidgetType{
		bi.BiWidgetType_BI_WIDGET_TYPE_CHART,
		bi.BiWidgetType_BI_WIDGET_TYPE_KPI,
		bi.BiWidgetType_BI_WIDGET_TYPE_TABLE,
	}
	chartTypes := []bi.BiChartType{
		bi.BiChartType_BI_CHART_TYPE_BAR,
		bi.BiChartType_BI_CHART_TYPE_LINE,
		bi.BiChartType_BI_CHART_TYPE_PIE,
	}
	widgetNames := []string{"Revenue Trend", "Sales by Region", "Customer Acquisition", "Monthly Expenses"}

	widgets := make([]*bi.BiDashboardWidget, 3)
	for j := 0; j < 3; j++ {
		idx := parentIdx*3 + j
		dataSourceID := pickRef(store.BiDataSourceIDs, idx)
		reportID := pickRef(store.BiReportIDs, idx)
		kpiID := pickRef(store.BiKPIIDs, idx)
		posX := int32(j * 3)
		posY := int32(parentIdx % 4)

		widgets[j] = &bi.BiDashboardWidget{
			WidgetId:        genID("wdgt", idx),
			Name:            fmt.Sprintf("%s %d", widgetNames[j%len(widgetNames)], parentIdx+1),
			Description:     fmt.Sprintf("Widget displaying %s data", widgetNames[j%len(widgetNames)]),
			WidgetType:      widgetTypes[j%len(widgetTypes)],
			ChartType:       chartTypes[j%len(chartTypes)],
			DataSourceId:    dataSourceID,
			ReportId:        reportID,
			KpiId:           kpiID,
			PositionX:       posX,
			PositionY:       posY,
			Width:           int32(rand.Intn(3) + 2),
			Height:          int32(rand.Intn(2) + 1),
			Query:           fmt.Sprintf("SELECT * FROM metrics WHERE category = '%s'", widgetNames[j%len(widgetNames)]),
			Config:          fmt.Sprintf(`{"theme": "default", "animation": true, "legend": %t}`, j%2 == 0),
			RefreshInterval: int32((rand.Intn(6) + 1) * 60),
			AuditInfo:       createAuditInfo(),
		}
	}
	return widgets
}

// generateSharesInline creates 2 embedded shares per dashboard
func generateSharesInline(parentIdx int, store *MockDataStore) []*bi.BiDashboardShare {
	accessLevels := []bi.BiAccessLevel{
		bi.BiAccessLevel_BI_ACCESS_LEVEL_VIEW,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EXECUTE,
		bi.BiAccessLevel_BI_ACCESS_LEVEL_EDIT,
	}

	shares := make([]*bi.BiDashboardShare, 2)
	for j := 0; j < 2; j++ {
		idx := parentIdx*2 + j
		sharedBy := pickRef(store.EmployeeIDs, idx)

		var sharedWithID, sharedWithType string
		if j%2 == 0 {
			sharedWithType = "USER"
			sharedWithID = pickRef(store.EmployeeIDs, idx+5)
		} else {
			sharedWithType = "ROLE"
			sharedWithID = fmt.Sprintf("role-%03d", (idx%5)+1)
		}

		sharedDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		var expiryDate int64
		if j == 0 {
			expiryDate = sharedDate.AddDate(1, 0, 0).Unix()
		}

		shares[j] = &bi.BiDashboardShare{
			ShareId:        genID("dshr", idx),
			SharedWithId:   sharedWithID,
			SharedWithType: sharedWithType,
			AccessLevel:    accessLevels[idx%len(accessLevels)],
			SharedDate:     sharedDate.Unix(),
			SharedBy:       sharedBy,
			ExpiryDate:     expiryDate,
			AuditInfo:      createAuditInfo(),
		}
	}
	return shares
}

// generateDrilldownsInline creates 2 embedded drilldowns per dashboard
func generateDrilldownsInline(parentIdx int, store *MockDataStore) []*bi.BiDrilldown {
	sourceFields := []string{"region", "product_category", "customer_segment", "time_period", "department"}
	targetParameters := []string{"filter_region", "filter_category", "filter_segment", "date_range", "dept_filter"}

	drilldowns := make([]*bi.BiDrilldown, 2)
	for j := 0; j < 2; j++ {
		idx := parentIdx*2 + j
		sourceReportID := pickRef(store.BiReportIDs, idx)
		targetReportID := pickRef(store.BiReportIDs, idx+3)
		targetDashboardID := pickRef(store.BiDashboardIDs, idx+1)

		drilldowns[j] = &bi.BiDrilldown{
			DrilldownId:       genID("drld", idx),
			Name:              fmt.Sprintf("Drilldown %d: %s Detail", idx+1, sourceFields[idx%len(sourceFields)]),
			Description:       fmt.Sprintf("Drilldown from %s to detailed view", sourceFields[idx%len(sourceFields)]),
			SourceReportId:    sourceReportID,
			SourceWidgetId:    fmt.Sprintf("wdgt-%03d", idx+1),
			TargetReportId:    targetReportID,
			TargetDashboardId: targetDashboardID,
			SourceField:       sourceFields[idx%len(sourceFields)],
			TargetParameter:   targetParameters[idx%len(targetParameters)],
			IsActive:          j == 0,
			AuditInfo:         createAuditInfo(),
		}
	}
	return drilldowns
}

// generateBiKPIs creates KPI records with embedded thresholds
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
		"Revenue Growth Rate", "Customer Satisfaction Score", "Employee Retention Rate",
		"Net Promoter Score", "Gross Profit Margin", "Order Fulfillment Rate",
		"Inventory Turnover", "Average Order Value", "Customer Acquisition Cost",
		"Time to Market", "Defect Rate", "On-Time Delivery",
		"Resource Utilization", "Project Success Rate", "Cash Flow Ratio",
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
			RefreshInterval:    int32((rand.Intn(6) + 1) * 3600),
			LastUpdated:        time.Now().AddDate(0, 0, -rand.Intn(7)).Unix(),
			IsActive:           i%5 != 0,
			Thresholds:         generateThresholdsInline(i),
			AuditInfo:          createAuditInfo(),
		}
	}
	return kpis
}

// generateThresholdsInline creates 2 embedded thresholds per KPI
func generateThresholdsInline(parentIdx int) []*bi.BiKPIThreshold {
	operators := []bi.BiThresholdOperator{
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_LESS_THAN,
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_GREATER_THAN,
		bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_BETWEEN,
	}
	severities := []string{"WARNING", "CRITICAL"}
	names := []string{"Below Target Warning", "Critical Low Threshold", "Above Target Alert"}

	thresholds := make([]*bi.BiKPIThreshold, 2)
	for j := 0; j < 2; j++ {
		idx := parentIdx*2 + j
		operator := operators[idx%len(operators)]
		value := float64(rand.Intn(100) + 10)
		valueUpper := float64(0)
		if operator == bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_BETWEEN {
			valueUpper = value + float64(rand.Intn(50)+10)
		}

		var lastTriggered int64
		if j == 0 {
			lastTriggered = time.Now().AddDate(0, 0, -rand.Intn(30)).Unix()
		}

		thresholds[j] = &bi.BiKPIThreshold{
			ThresholdId:       genID("kthr", idx),
			Name:              fmt.Sprintf("%s %d", names[idx%len(names)], parentIdx+1),
			Description:       fmt.Sprintf("Threshold rule for KPI monitoring at level %d", idx+1),
			Operator:          operator,
			Value:             value,
			ValueUpper:        valueUpper,
			Severity:          severities[j%len(severities)],
			NotificationEmail: fmt.Sprintf("alert%d@company.com", (idx%5)+1),
			IsActive:          j == 0,
			LastTriggered:     lastTriggered,
			AuditInfo:         createAuditInfo(),
		}
	}
	return thresholds
}
