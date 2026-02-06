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

// gen_bi_analytics2.go
// Generates:
// - BiTrendAnalysis
// - BiScenario
// - BiBenchmark

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/bi"
)

// Trend analysis names
var trendAnalysisNames = []string{
	"Revenue Growth Trend", "Customer Acquisition Trend", "Cost Reduction Trend",
	"Productivity Improvement Trend", "Quality Metrics Trend", "Market Share Trend",
	"Employee Satisfaction Trend", "Inventory Efficiency Trend", "Delivery Performance Trend",
	"Customer Satisfaction Trend", "Profit Margin Trend", "Order Volume Trend",
	"Return Rate Trend", "Processing Time Trend", "Energy Consumption Trend",
}

// Metrics for trend analysis
var trendMetrics = []string{
	"Revenue", "Customer Count", "Operating Costs", "Productivity Index",
	"Defect Rate", "Market Share %", "eNPS Score", "Inventory Turnover",
	"On-Time Delivery %", "NPS Score", "Gross Margin", "Order Count",
	"Return Rate", "Avg Processing Time", "Energy Usage KWH",
}

// Scenario names
var scenarioNames = []string{
	"Best Case Growth", "Conservative Estimate", "Market Downturn",
	"Expansion Scenario", "Cost Optimization", "Digital Transformation",
	"Supply Chain Disruption", "Competitive Response", "Regulatory Impact",
	"Innovation Investment",
}

// Scenario assumptions
var scenarioAssumptions = []string{
	`{"revenue_growth": 15, "cost_increase": 5, "market_share": 25}`,
	`{"revenue_growth": 5, "cost_increase": 3, "market_share": 20}`,
	`{"revenue_growth": -10, "cost_increase": 8, "market_share": 15}`,
	`{"new_markets": 3, "investment": 5000000, "timeline_months": 18}`,
	`{"cost_reduction": 20, "automation_level": 60, "headcount_change": -10}`,
	`{"tech_investment": 3000000, "efficiency_gain": 25, "training_cost": 500000}`,
	`{"supply_delay_days": 14, "cost_increase": 30, "alternative_suppliers": 2}`,
	`{"price_adjustment": -5, "marketing_spend": 2000000, "market_share_target": 28}`,
	`{"compliance_cost": 1000000, "timeline_months": 12, "penalty_risk": 0}`,
	`{"rd_investment": 4000000, "time_to_market": 24, "expected_revenue": 15000000}`,
}

// Benchmark names
var benchmarkNames = []string{
	"Revenue Per Employee", "Customer Acquisition Cost", "Inventory Turnover",
	"Employee Turnover Rate", "Gross Profit Margin", "Days Sales Outstanding",
	"Order Fulfillment Rate", "Customer Lifetime Value", "Operating Expense Ratio",
	"Return on Assets", "Net Promoter Score", "First Contact Resolution",
}

// Benchmark categories
var benchmarkCategories = []string{
	"Financial Performance", "Customer Metrics", "Operational Efficiency",
	"Human Resources", "Sales & Marketing", "Supply Chain",
}

// Industries for benchmarking
var benchmarkIndustries = []string{
	"Technology", "Manufacturing", "Healthcare", "Retail",
	"Financial Services", "Energy", "Telecommunications", "Consumer Goods",
}

// generateTrendAnalyses creates trend analysis records
func generateTrendAnalyses(store *MockDataStore) []*bi.BiTrendAnalysis {
	count := 15

	timePeriods := []string{"DAILY", "WEEKLY", "MONTHLY", "QUARTERLY"}

	// Flavorable direction distribution: 45% UP, 30% FLAT, 25% DOWN
	directions := []bi.BiTrendDirection{
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

	analyses := make([]*bi.BiTrendAnalysis, count)
	for i := 0; i < count; i++ {
		dataSourceID := ""
		if len(store.BiDataSourceIDs) > 0 {
			dataSourceID = store.BiDataSourceIDs[i%len(store.BiDataSourceIDs)]
		}

		analyzedBy := ""
		if len(store.EmployeeIDs) > 0 {
			analyzedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		endDate := time.Now().AddDate(0, 0, -rand.Intn(7))
		startDate := endDate.AddDate(0, -rand.Intn(6)-1, 0)
		analysisDate := endDate.Add(time.Duration(rand.Intn(24)) * time.Hour)

		direction := directions[i%len(directions)]

		// Generate change percent based on direction
		var changePercent float64
		var slope float64
		switch direction {
		case bi.BiTrendDirection_BI_TREND_DIRECTION_UP:
			changePercent = rand.Float64()*25 + 5 // 5% to 30% increase
			slope = rand.Float64()*2 + 0.5
		case bi.BiTrendDirection_BI_TREND_DIRECTION_DOWN:
			changePercent = -(rand.Float64()*20 + 3) // -3% to -23% decrease
			slope = -(rand.Float64()*1.5 + 0.3)
		default:
			changePercent = rand.Float64()*4 - 2 // -2% to 2% flat
			slope = rand.Float64()*0.2 - 0.1
		}

		// R-squared from 0.65 to 0.98
		rSquared := 0.65 + rand.Float64()*0.33

		analyses[i] = &bi.BiTrendAnalysis{
			AnalysisId:     fmt.Sprintf("trend-%03d", i+1),
			Name:           trendAnalysisNames[i%len(trendAnalysisNames)],
			Description:    fmt.Sprintf("Trend analysis for %s over time", trendMetrics[i%len(trendMetrics)]),
			DataSourceId:   dataSourceID,
			Metric:         trendMetrics[i%len(trendMetrics)],
			TimePeriod:     timePeriods[i%len(timePeriods)],
			StartDate:      startDate.Unix(),
			EndDate:        endDate.Unix(),
			Direction:      direction,
			Slope:          slope,
			RSquared:       rSquared,
			ChangePercent:  changePercent,
			AnalysisResult: fmt.Sprintf(`{"data_points": %d, "outliers": %d, "seasonality": %t}`, rand.Intn(100)+20, rand.Intn(5), i%2 == 0),
			AnalysisDate:   analysisDate.Unix(),
			AnalyzedBy:     analyzedBy,
			AuditInfo:      createAuditInfo(),
		}
	}
	return analyses
}

// generateScenarios creates what-if scenario records
func generateScenarios(store *MockDataStore) []*bi.BiScenario {
	count := 10

	// Flavorable type distribution: 30% BASELINE, 25% OPTIMISTIC, 25% PESSIMISTIC, 20% CUSTOM
	scenarioTypes := []bi.BiScenarioType{
		bi.BiScenarioType_BI_SCENARIO_TYPE_BASELINE,
		bi.BiScenarioType_BI_SCENARIO_TYPE_BASELINE,
		bi.BiScenarioType_BI_SCENARIO_TYPE_BASELINE,
		bi.BiScenarioType_BI_SCENARIO_TYPE_OPTIMISTIC,
		bi.BiScenarioType_BI_SCENARIO_TYPE_OPTIMISTIC,
		bi.BiScenarioType_BI_SCENARIO_TYPE_PESSIMISTIC,
		bi.BiScenarioType_BI_SCENARIO_TYPE_PESSIMISTIC,
		bi.BiScenarioType_BI_SCENARIO_TYPE_PESSIMISTIC,
		bi.BiScenarioType_BI_SCENARIO_TYPE_CUSTOM,
		bi.BiScenarioType_BI_SCENARIO_TYPE_CUSTOM,
	}

	variableModifications := []string{
		`{"revenue": 1.15, "costs": 1.05, "headcount": 1.10}`,
		`{"revenue": 1.05, "costs": 1.03, "headcount": 1.02}`,
		`{"revenue": 0.90, "costs": 1.08, "headcount": 0.95}`,
		`{"market_expansion": true, "new_products": 3, "investment": 5000000}`,
		`{"automation": 0.60, "efficiency_gain": 0.25}`,
	}

	scenarioResults := []string{
		`{"projected_revenue": 12000000, "projected_profit": 2400000, "roi": 0.20}`,
		`{"projected_revenue": 10500000, "projected_profit": 1890000, "roi": 0.18}`,
		`{"projected_revenue": 9000000, "projected_profit": 900000, "roi": 0.10}`,
		`{"new_market_revenue": 3000000, "payback_months": 24}`,
		`{"cost_savings": 1500000, "implementation_cost": 500000, "net_benefit": 1000000}`,
	}

	scenarios := make([]*bi.BiScenario, count)
	for i := 0; i < count; i++ {
		dataSourceID := ""
		if len(store.BiDataSourceIDs) > 0 {
			dataSourceID = store.BiDataSourceIDs[i%len(store.BiDataSourceIDs)]
		}

		createdBy := ""
		if len(store.EmployeeIDs) > 0 {
			createdBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		// Base scenario for derived scenarios (first 3 are base scenarios)
		baseScenarioID := ""
		if i >= 3 && i < count {
			baseScenarioID = fmt.Sprintf("scen-%03d", (i%3)+1)
		}

		createdDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))

		// 80% active scenarios
		isActive := i < 8

		scenarios[i] = &bi.BiScenario{
			ScenarioId:     fmt.Sprintf("scen-%03d", i+1),
			Name:           scenarioNames[i%len(scenarioNames)],
			Description:    fmt.Sprintf("What-if scenario: %s", scenarioNames[i%len(scenarioNames)]),
			ScenarioType:   scenarioTypes[i%len(scenarioTypes)],
			BaseScenarioId: baseScenarioID,
			DataSourceId:   dataSourceID,
			Assumptions:    scenarioAssumptions[i%len(scenarioAssumptions)],
			Variables:      variableModifications[i%len(variableModifications)],
			Results:        scenarioResults[i%len(scenarioResults)],
			CreatedDate:    createdDate.Unix(),
			CreatedBy:      createdBy,
			IsActive:       isActive,
			AuditInfo:      createAuditInfo(),
		}
	}
	return scenarios
}

// generateBenchmarks creates benchmark comparison records
func generateBenchmarks(store *MockDataStore) []*bi.BiBenchmark {
	count := 12

	benchmarkSources := []string{
		"Gartner Industry Report", "McKinsey Global Survey", "Industry Association Data",
		"Competitor Analysis", "Internal Historical Data", "Bureau of Labor Statistics",
	}

	regions := []string{"North America", "EMEA", "APAC", "Global", "Latin America"}

	benchmarks := make([]*bi.BiBenchmark, count)
	for i := 0; i < count; i++ {
		periodEnd := time.Now().AddDate(0, 0, -rand.Intn(30))
		periodStart := periodEnd.AddDate(-1, 0, 0)
		lastUpdated := periodEnd.Add(time.Duration(rand.Intn(7*24)) * time.Hour)

		// Generate realistic internal and benchmark values based on metric
		var internalValue, benchmarkValue float64
		switch i % 6 {
		case 0: // Revenue per employee (thousands)
			internalValue = float64(rand.Intn(100) + 150) // $150k - $250k
			benchmarkValue = float64(rand.Intn(80) + 180) // $180k - $260k
		case 1: // Customer acquisition cost
			internalValue = float64(rand.Intn(100) + 50) // $50 - $150
			benchmarkValue = float64(rand.Intn(80) + 60) // $60 - $140
		case 2: // Inventory turnover
			internalValue = float64(rand.Intn(8) + 4) // 4-12 times
			benchmarkValue = float64(rand.Intn(6) + 6) // 6-12 times
		case 3: // Employee turnover rate %
			internalValue = float64(rand.Intn(10) + 8) // 8-18%
			benchmarkValue = float64(rand.Intn(8) + 10) // 10-18%
		case 4: // Gross profit margin %
			internalValue = float64(rand.Intn(20) + 25) // 25-45%
			benchmarkValue = float64(rand.Intn(15) + 30) // 30-45%
		default: // Days sales outstanding
			internalValue = float64(rand.Intn(30) + 30) // 30-60 days
			benchmarkValue = float64(rand.Intn(20) + 35) // 35-55 days
		}

		variance := internalValue - benchmarkValue
		variancePercent := (variance / benchmarkValue) * 100

		benchmarks[i] = &bi.BiBenchmark{
			BenchmarkId:     fmt.Sprintf("bench-%03d", i+1),
			Name:            benchmarkNames[i%len(benchmarkNames)],
			Description:     fmt.Sprintf("Industry benchmark comparison for %s", benchmarkNames[i%len(benchmarkNames)]),
			Category:        benchmarkCategories[i%len(benchmarkCategories)],
			Metric:          benchmarkNames[i%len(benchmarkNames)],
			InternalValue:   internalValue,
			BenchmarkValue:  benchmarkValue,
			BenchmarkSource: benchmarkSources[i%len(benchmarkSources)],
			Industry:        benchmarkIndustries[i%len(benchmarkIndustries)],
			Region:          regions[i%len(regions)],
			Variance:        variance,
			VariancePercent: variancePercent,
			PeriodStart:     periodStart.Unix(),
			PeriodEnd:       periodEnd.Unix(),
			LastUpdated:     lastUpdated.Unix(),
			AuditInfo:       createAuditInfo(),
		}
	}
	return benchmarks
}
