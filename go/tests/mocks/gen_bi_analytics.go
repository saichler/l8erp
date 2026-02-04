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
// - BiDataCube
// - BiAnalysisModel
// - BiPrediction
// - BiTrendAnalysis
// - BiScenario
// - BiBenchmark

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/bi"
)

// Data cube names for OLAP structures
var dataCubeNames = []string{
	"Sales Performance Cube", "Financial Analysis Cube", "Customer Behavior Cube",
	"Inventory Analytics Cube", "HR Metrics Cube", "Production Performance Cube",
	"Supply Chain Cube", "Marketing ROI Cube",
}

// Dimensions for data cubes
var cubeDimensions = [][]string{
	{"Region", "Product", "Time", "Customer Segment"},
	{"Account", "Department", "Period", "Cost Center"},
	{"Customer", "Channel", "Time", "Product Category"},
	{"Warehouse", "Item", "Time", "Supplier"},
	{"Department", "Employee Type", "Period", "Location"},
	{"Production Line", "Product", "Shift", "Time"},
	{"Supplier", "Material", "Region", "Time"},
	{"Campaign", "Channel", "Audience", "Time"},
}

// Measures for data cubes
var cubeMeasures = [][]string{
	{"Revenue", "Units Sold", "Discount Amount", "Profit Margin"},
	{"Balance", "Debit", "Credit", "Variance"},
	{"Transactions", "Average Order Value", "Lifetime Value", "Churn Rate"},
	{"Quantity On Hand", "Reorder Point", "Turnover Rate", "Days of Supply"},
	{"Headcount", "Turnover Rate", "Avg Tenure", "Cost Per Hire"},
	{"Output", "Defect Rate", "Cycle Time", "OEE"},
	{"Lead Time", "Fill Rate", "Cost", "On Time Delivery"},
	{"Impressions", "Conversions", "Cost Per Acquisition", "ROI"},
}

// Analysis model names
var analysisModelNames = []string{
	"Revenue Prediction Model", "Customer Churn Predictor", "Demand Forecasting Model",
	"Credit Risk Assessment", "Employee Attrition Model", "Price Optimization Model",
	"Fraud Detection Model", "Inventory Replenishment Model", "Quality Prediction Model",
	"Campaign Response Model",
}

// ML algorithms
var mlAlgorithms = []string{
	"Linear Regression", "Random Forest", "XGBoost", "Neural Network",
	"Logistic Regression", "K-Means Clustering", "LSTM", "Gradient Boosting",
	"Support Vector Machine", "Decision Tree",
}

// Feature variable sets
var featureVariableSets = [][]string{
	{"sales_amount", "customer_tenure", "region_code", "product_category"},
	{"usage_frequency", "support_tickets", "payment_history", "contract_length"},
	{"historical_demand", "seasonality_index", "promotion_flag", "price_point"},
	{"credit_score", "income_level", "debt_ratio", "employment_status"},
	{"tenure", "salary", "performance_score", "promotion_history"},
}

// Prediction names
var predictionNames = []string{
	"Q1 Revenue Forecast", "Churn Risk Batch", "Weekly Demand Prediction",
	"Credit Score Update", "Attrition Risk Assessment", "Price Point Analysis",
	"Fraud Detection Scan", "Reorder Calculation", "Quality Score Prediction",
	"Campaign Response Estimate", "Sales Territory Forecast", "Inventory Optimization",
	"Customer Lifetime Value", "Product Recommendation", "Resource Allocation",
	"Maintenance Prediction", "Capacity Planning", "Lead Scoring",
	"Sentiment Analysis", "Market Trend Forecast",
}

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

// generateDataCubes creates OLAP data cube records
func generateDataCubes(store *MockDataStore) []*bi.BiDataCube {
	count := 8

	refreshSchedules := []string{"DAILY", "HOURLY", "WEEKLY", "REAL_TIME"}

	cubes := make([]*bi.BiDataCube, count)
	for i := 0; i < count; i++ {
		dataSourceID := ""
		if len(store.BiDataSourceIDs) > 0 {
			dataSourceID = store.BiDataSourceIDs[i%len(store.BiDataSourceIDs)]
		}

		lastRefresh := time.Now().Add(-time.Duration(rand.Intn(24)) * time.Hour)
		rowCount := int64(rand.Intn(1000000) + 10000)

		// 85% active cubes
		isActive := i < 7

		cubes[i] = &bi.BiDataCube{
			CubeId:          fmt.Sprintf("cube-%03d", i+1),
			Name:            dataCubeNames[i%len(dataCubeNames)],
			Description:     fmt.Sprintf("OLAP cube for %s analysis", dataCubeNames[i%len(dataCubeNames)]),
			DataSourceId:    dataSourceID,
			Dimensions:      cubeDimensions[i%len(cubeDimensions)],
			Measures:        cubeMeasures[i%len(cubeMeasures)],
			RefreshSchedule: refreshSchedules[i%len(refreshSchedules)],
			LastRefresh:     lastRefresh.Unix(),
			RowCount:        rowCount,
			IsActive:        isActive,
			AuditInfo:       createAuditInfo(),
		}
	}
	return cubes
}

// generateAnalysisModels creates ML/analysis model records
func generateAnalysisModels(store *MockDataStore) []*bi.BiAnalysisModel {
	count := 10

	// Flavorable model type distribution: 40% REGRESSION, 25% CLASSIFICATION, 15% TIME_SERIES, 10% CLUSTERING, 10% ANOMALY
	modelTypes := []bi.BiModelType{
		bi.BiModelType_BI_MODEL_TYPE_REGRESSION,
		bi.BiModelType_BI_MODEL_TYPE_REGRESSION,
		bi.BiModelType_BI_MODEL_TYPE_REGRESSION,
		bi.BiModelType_BI_MODEL_TYPE_REGRESSION,
		bi.BiModelType_BI_MODEL_TYPE_CLASSIFICATION,
		bi.BiModelType_BI_MODEL_TYPE_CLASSIFICATION,
		bi.BiModelType_BI_MODEL_TYPE_CLASSIFICATION,
		bi.BiModelType_BI_MODEL_TYPE_TIME_SERIES,
		bi.BiModelType_BI_MODEL_TYPE_CLUSTERING,
		bi.BiModelType_BI_MODEL_TYPE_ANOMALY_DETECTION,
	}

	// Flavorable status distribution: 50% DEPLOYED, 20% VALIDATED, 15% TRAINING, 10% DRAFT, 5% RETIRED
	modelStatuses := []bi.BiModelStatus{
		bi.BiModelStatus_BI_MODEL_STATUS_DEPLOYED,
		bi.BiModelStatus_BI_MODEL_STATUS_DEPLOYED,
		bi.BiModelStatus_BI_MODEL_STATUS_DEPLOYED,
		bi.BiModelStatus_BI_MODEL_STATUS_DEPLOYED,
		bi.BiModelStatus_BI_MODEL_STATUS_DEPLOYED,
		bi.BiModelStatus_BI_MODEL_STATUS_VALIDATED,
		bi.BiModelStatus_BI_MODEL_STATUS_VALIDATED,
		bi.BiModelStatus_BI_MODEL_STATUS_TRAINING,
		bi.BiModelStatus_BI_MODEL_STATUS_DRAFT,
		bi.BiModelStatus_BI_MODEL_STATUS_RETIRED,
	}

	targetVariables := []string{
		"revenue", "churn_flag", "demand_quantity", "risk_score", "attrition_flag",
		"optimal_price", "fraud_probability", "reorder_quantity", "quality_score", "response_probability",
	}

	hyperparameters := []string{
		`{"learning_rate": 0.01, "max_depth": 6, "n_estimators": 100}`,
		`{"C": 1.0, "kernel": "rbf", "gamma": "scale"}`,
		`{"hidden_layers": [128, 64, 32], "dropout": 0.2, "epochs": 100}`,
		`{"n_clusters": 5, "init": "k-means++", "max_iter": 300}`,
		`{"threshold": 0.5, "window_size": 14, "contamination": 0.1}`,
	}

	models := make([]*bi.BiAnalysisModel, count)
	for i := 0; i < count; i++ {
		dataSourceID := ""
		if len(store.BiDataSourceIDs) > 0 {
			dataSourceID = store.BiDataSourceIDs[i%len(store.BiDataSourceIDs)]
		}

		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		trainingDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		lastPrediction := trainingDate.Add(time.Duration(rand.Intn(30*24)) * time.Hour)

		// Generate realistic accuracy metrics (70-98%)
		accuracy := 0.70 + rand.Float64()*0.28
		precision := 0.65 + rand.Float64()*0.30
		recall := 0.60 + rand.Float64()*0.35

		models[i] = &bi.BiAnalysisModel{
			ModelId:          fmt.Sprintf("model-%03d", i+1),
			Name:             analysisModelNames[i%len(analysisModelNames)],
			Description:      fmt.Sprintf("Machine learning model for %s", analysisModelNames[i%len(analysisModelNames)]),
			ModelType:        modelTypes[i%len(modelTypes)],
			Status:           modelStatuses[i%len(modelStatuses)],
			DataSourceId:     dataSourceID,
			TargetVariable:   targetVariables[i%len(targetVariables)],
			FeatureVariables: featureVariableSets[i%len(featureVariableSets)],
			Algorithm:        mlAlgorithms[i%len(mlAlgorithms)],
			Hyperparameters:  hyperparameters[i%len(hyperparameters)],
			Accuracy:         accuracy,
			PrecisionScore:   precision,
			RecallScore:      recall,
			TrainingDate:     trainingDate.Unix(),
			LastPrediction:   lastPrediction.Unix(),
			OwnerId:          ownerID,
			AuditInfo:        createAuditInfo(),
		}
	}
	return models
}

// generatePredictions creates prediction result records
func generatePredictions(store *MockDataStore) []*bi.BiPrediction {
	count := 20

	inputDataSamples := []string{
		`{"customer_id": "C001", "tenure": 24, "monthly_spend": 150}`,
		`{"product_id": "P100", "region": "WEST", "season": "Q4"}`,
		`{"employee_id": "E050", "department": "Sales", "performance": 4.2}`,
		`{"order_id": "ORD-5000", "amount": 2500, "items": 5}`,
		`{"lead_id": "L200", "source": "Web", "engagement_score": 75}`,
	}

	outputDataSamples := []string{
		`{"prediction": 0.85, "segment": "high_value", "recommendation": "retain"}`,
		`{"forecast": 15000, "confidence_interval": [12000, 18000]}`,
		`{"risk_score": 0.25, "factors": ["tenure", "performance"]}`,
		`{"fraud_probability": 0.02, "flags": []}`,
		`{"conversion_probability": 0.65, "next_action": "follow_up"}`,
	}

	predictions := make([]*bi.BiPrediction, count)
	for i := 0; i < count; i++ {
		modelID := ""
		if len(store.BiAnalysisModelIDs) > 0 {
			modelID = store.BiAnalysisModelIDs[i%len(store.BiAnalysisModelIDs)]
		}

		predictedBy := ""
		if len(store.EmployeeIDs) > 0 {
			predictedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		predictionDate := time.Now().AddDate(0, 0, -rand.Intn(30))

		// Confidence ranges from 0.65 to 0.98
		confidence := 0.65 + rand.Float64()*0.33

		predictions[i] = &bi.BiPrediction{
			PredictionId:   fmt.Sprintf("pred-%03d", i+1),
			ModelId:        modelID,
			Name:           predictionNames[i%len(predictionNames)],
			Description:    fmt.Sprintf("Prediction run for %s", predictionNames[i%len(predictionNames)]),
			PredictionDate: predictionDate.Unix(),
			InputData:      inputDataSamples[i%len(inputDataSamples)],
			OutputData:     outputDataSamples[i%len(outputDataSamples)],
			Confidence:     confidence,
			PredictedBy:    predictedBy,
			Notes:          fmt.Sprintf("Batch prediction run #%d", i+1),
			AuditInfo:      createAuditInfo(),
		}
	}
	return predictions
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
