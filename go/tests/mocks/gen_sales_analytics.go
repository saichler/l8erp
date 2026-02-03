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

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

// generateSalesCommissionPlans creates commission plan records
func generateSalesCommissionPlans() []*sales.SalesCommissionPlan {
	commissionTypes := []sales.SalesCommissionType{
		sales.SalesCommissionType_COMMISSION_TYPE_PERCENTAGE,
		sales.SalesCommissionType_COMMISSION_TYPE_FIXED,
		sales.SalesCommissionType_COMMISSION_TYPE_TIERED,
	}

	plans := make([]*sales.SalesCommissionPlan, len(salesCommissionPlanNames))
	for i, name := range salesCommissionPlanNames {
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0)

		plan := &sales.SalesCommissionPlan{
			PlanId:         fmt.Sprintf("scpl-%03d", i+1),
			Name:           name,
			Description:    fmt.Sprintf("Commission plan: %s", name),
			CommissionType: commissionTypes[i%len(commissionTypes)],
			EffectiveDate:  effectiveDate.Unix(),
			ExpiryDate:     expiryDate.Unix(),
			IsActive:       i < 6, // First 6 are active
			AppliesTo:      "ALL",
			AuditInfo:      createAuditInfo(),
		}

		if commissionTypes[i%len(commissionTypes)] == sales.SalesCommissionType_COMMISSION_TYPE_PERCENTAGE {
			plan.BaseRate = float64(rand.Intn(10)+5) / 100 // 5-15%
		} else if commissionTypes[i%len(commissionTypes)] == sales.SalesCommissionType_COMMISSION_TYPE_FIXED {
			plan.BaseAmount = &erp.Money{
				Amount:       int64(rand.Intn(50000) + 5000),
				CurrencyCode: "USD",
			}
		}

		plans[i] = plan
	}
	return plans
}

// generateSalesCommissionCalcs creates commission calculation records
func generateSalesCommissionCalcs(store *MockDataStore) []*sales.SalesCommissionCalc {
	statuses := []string{"PENDING", "APPROVED", "PAID", "CANCELLED"}

	count := 25
	calcs := make([]*sales.SalesCommissionCalc, count)
	for i := 0; i < count; i++ {
		planID := ""
		if len(store.SalesCommissionPlanIDs) > 0 {
			planID = store.SalesCommissionPlanIDs[i%len(store.SalesCommissionPlanIDs)]
		}

		salespersonID := ""
		if len(store.EmployeeIDs) > 0 {
			salespersonID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		orderID := ""
		if len(store.SalesOrderIDs) > 0 {
			orderID = store.SalesOrderIDs[i%len(store.SalesOrderIDs)]
		}

		calcDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))

		salesAmount := int64(rand.Intn(50000000) + 500000)
		commissionRate := float64(rand.Intn(10)+5) / 100
		commissionAmount := int64(float64(salesAmount) * commissionRate)

		status := statuses[i%len(statuses)]
		var paidDate int64
		if status == "PAID" {
			paidDate = calcDate.AddDate(0, 0, rand.Intn(30)+15).Unix()
		}

		calcs[i] = &sales.SalesCommissionCalc{
			CalcId:           fmt.Sprintf("scc-%03d", i+1),
			PlanId:           planID,
			SalespersonId:    salespersonID,
			SalesOrderId:     orderID,
			CalculationDate:  calcDate.Unix(),
			SalesAmount:      &erp.Money{Amount: salesAmount, CurrencyCode: "USD"},
			CommissionRate:   commissionRate,
			CommissionAmount: &erp.Money{Amount: commissionAmount, CurrencyCode: "USD"},
			Status:           status,
			PaidDate:         paidDate,
			Notes:            fmt.Sprintf("Commission calculation for order %d", i+1),
			AuditInfo:        createAuditInfo(),
		}
	}
	return calcs
}

// generateSalesTerritoryAssigns creates territory assignment records
func generateSalesTerritoryAssigns(store *MockDataStore) []*sales.SalesTerritoryAssign {
	count := minInt(20, len(store.SalesTerritoryIDs)*2)
	if count == 0 {
		count = 20
	}

	assigns := make([]*sales.SalesTerritoryAssign, count)
	for i := 0; i < count; i++ {
		territoryID := ""
		if len(store.SalesTerritoryIDs) > 0 {
			territoryID = store.SalesTerritoryIDs[i%len(store.SalesTerritoryIDs)]
		}

		salespersonID := ""
		if len(store.EmployeeIDs) > 0 {
			salespersonID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		startDate := time.Now().AddDate(0, -rand.Intn(12), 0)
		var endDate int64
		if i%4 == 0 { // 25% have end dates
			endDate = startDate.AddDate(1, 0, 0).Unix()
		}

		assigns[i] = &sales.SalesTerritoryAssign{
			AssignmentId:      fmt.Sprintf("sta-%03d", i+1),
			TerritoryId:       territoryID,
			SalespersonId:     salespersonID,
			StartDate:         startDate.Unix(),
			EndDate:           endDate,
			IsPrimary:         i%2 == 0, // Alternate primary
			AllocationPercent: float64(rand.Intn(50)+50) / 100, // 50-100%
			Notes:             fmt.Sprintf("Territory assignment %d", i+1),
			AuditInfo:         createAuditInfo(),
		}
	}
	return assigns
}

// generateSalesTargets creates sales target records
func generateSalesTargets(store *MockDataStore) []*sales.SalesTarget {
	periods := []sales.SalesTargetPeriod{
		sales.SalesTargetPeriod_TARGET_PERIOD_MONTHLY,
		sales.SalesTargetPeriod_TARGET_PERIOD_MONTHLY,
		sales.SalesTargetPeriod_TARGET_PERIOD_QUARTERLY,
		sales.SalesTargetPeriod_TARGET_PERIOD_QUARTERLY,
		sales.SalesTargetPeriod_TARGET_PERIOD_ANNUAL,
	}

	count := 20
	targets := make([]*sales.SalesTarget, count)
	for i := 0; i < count; i++ {
		salespersonID := ""
		if len(store.EmployeeIDs) > 0 {
			salespersonID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		territoryID := ""
		if len(store.SalesTerritoryIDs) > 0 {
			territoryID = store.SalesTerritoryIDs[i%len(store.SalesTerritoryIDs)]
		}

		period := periods[i%len(periods)]
		year := 2025
		quarter := int32((i % 4) + 1)
		month := int32((i % 12) + 1)

		targetAmount := int64(rand.Intn(100000000) + 10000000) // $100k - $1M
		achievedAmount := targetAmount * int64(rand.Intn(120)+50) / 100
		achievementPercent := float64(achievedAmount) / float64(targetAmount) * 100

		targets[i] = &sales.SalesTarget{
			TargetId:           fmt.Sprintf("stgt-%03d", i+1),
			Name:               fmt.Sprintf("Sales Target %d - Q%d %d", i+1, quarter, year),
			SalespersonId:      salespersonID,
			TerritoryId:        territoryID,
			Period:             period,
			Year:               int32(year),
			Quarter:            quarter,
			Month:              month,
			TargetAmount:       &erp.Money{Amount: targetAmount, CurrencyCode: "USD"},
			AchievedAmount:     &erp.Money{Amount: achievedAmount, CurrencyCode: "USD"},
			AchievementPercent: achievementPercent,
			Notes:              fmt.Sprintf("Target for period %d", i+1),
			AuditInfo:          createAuditInfo(),
		}
	}
	return targets
}

// generateSalesForecasts creates sales forecast records
func generateSalesForecasts(store *MockDataStore) []*sales.SalesForecast {
	categories := []sales.SalesForecastCategory{
		sales.SalesForecastCategory_FORECAST_CATEGORY_PIPELINE,
		sales.SalesForecastCategory_FORECAST_CATEGORY_PIPELINE,
		sales.SalesForecastCategory_FORECAST_CATEGORY_BEST_CASE,
		sales.SalesForecastCategory_FORECAST_CATEGORY_COMMITTED,
		sales.SalesForecastCategory_FORECAST_CATEGORY_CLOSED,
	}

	count := 20
	forecasts := make([]*sales.SalesForecast, count)
	for i := 0; i < count; i++ {
		salespersonID := ""
		if len(store.EmployeeIDs) > 0 {
			salespersonID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		territoryID := ""
		if len(store.SalesTerritoryIDs) > 0 {
			territoryID = store.SalesTerritoryIDs[i%len(store.SalesTerritoryIDs)]
		}

		customerID := ""
		if len(store.CustomerIDs) > 0 {
			customerID = store.CustomerIDs[i%len(store.CustomerIDs)]
		}

		year := 2025
		quarter := int32((i % 4) + 1)
		month := int32((i % 12) + 1)

		forecastAmount := int64(rand.Intn(50000000) + 5000000)
		category := categories[i%len(categories)]
		probability := 0.0
		switch category {
		case sales.SalesForecastCategory_FORECAST_CATEGORY_PIPELINE:
			probability = float64(rand.Intn(30) + 10)
		case sales.SalesForecastCategory_FORECAST_CATEGORY_BEST_CASE:
			probability = float64(rand.Intn(20) + 40)
		case sales.SalesForecastCategory_FORECAST_CATEGORY_COMMITTED:
			probability = float64(rand.Intn(20) + 70)
		case sales.SalesForecastCategory_FORECAST_CATEGORY_CLOSED:
			probability = 100.0
		}
		weightedAmount := int64(float64(forecastAmount) * probability / 100)
		expectedCloseDate := time.Now().AddDate(0, rand.Intn(6), rand.Intn(28))

		forecasts[i] = &sales.SalesForecast{
			ForecastId:        fmt.Sprintf("sfcs-%03d", i+1),
			Name:              fmt.Sprintf("Forecast %d - Q%d %d", i+1, quarter, year),
			SalespersonId:     salespersonID,
			TerritoryId:       territoryID,
			CustomerId:        customerID,
			Category:          category,
			Year:              int32(year),
			Quarter:           quarter,
			Month:             month,
			ForecastAmount:    &erp.Money{Amount: forecastAmount, CurrencyCode: "USD"},
			WeightedAmount:    &erp.Money{Amount: weightedAmount, CurrencyCode: "USD"},
			Probability:       probability,
			ExpectedCloseDate: expectedCloseDate.Unix(),
			Notes:             fmt.Sprintf("Forecast for period %d", i+1),
			AuditInfo:         createAuditInfo(),
		}
	}
	return forecasts
}
