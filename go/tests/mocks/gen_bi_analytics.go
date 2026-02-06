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

// gen_bi_analytics.go
// Generates:
// - BiDataCube
// - BiAnalysisModel
// - BiPrediction

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

// generateDataCubes creates OLAP data cube records
func generateDataCubes(store *MockDataStore) []*bi.BiDataCube {
	count := 8

	refreshSchedules := []string{"DAILY", "HOURLY", "WEEKLY", "REAL_TIME"}

	cubes := make([]*bi.BiDataCube, count)
	for i := 0; i < count; i++ {
		dataSourceID := pickRef(store.BiDataSourceIDs, i)

		lastRefresh := time.Now().Add(-time.Duration(rand.Intn(24)) * time.Hour)
		rowCount := int64(rand.Intn(1000000) + 10000)

		// 85% active cubes
		isActive := i < 7

		cubes[i] = &bi.BiDataCube{
			CubeId:          genID("cube", i),
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
		dataSourceID := pickRef(store.BiDataSourceIDs, i)

		ownerID := pickRef(store.EmployeeIDs, i)

		trainingDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		lastPrediction := trainingDate.Add(time.Duration(rand.Intn(30*24)) * time.Hour)

		// Generate realistic accuracy metrics (70-98%)
		accuracy := 0.70 + rand.Float64()*0.28
		precision := 0.65 + rand.Float64()*0.30
		recall := 0.60 + rand.Float64()*0.35

		models[i] = &bi.BiAnalysisModel{
			ModelId:          genID("model", i),
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
		modelID := pickRef(store.BiAnalysisModelIDs, i)

		predictedBy := pickRef(store.EmployeeIDs, i)

		predictionDate := time.Now().AddDate(0, 0, -rand.Intn(30))

		// Confidence ranges from 0.65 to 0.98
		confidence := 0.65 + rand.Float64()*0.33

		predictions[i] = &bi.BiPrediction{
			PredictionId:   genID("pred", i),
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
