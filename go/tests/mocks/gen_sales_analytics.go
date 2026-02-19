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

import (
	"fmt"
	"math/rand"
	"time"

	l8api "github.com/saichler/l8types/go/types/l8api"
	"github.com/saichler/l8erp/go/types/sales"
)

// generateSalesCommissionPlans creates commission plan records with embedded calculations
func generateSalesCommissionPlans(store *MockDataStore) []*sales.SalesCommissionPlan {
	commissionTypes := []sales.SalesCommissionType{
		sales.SalesCommissionType_COMMISSION_TYPE_PERCENTAGE,
		sales.SalesCommissionType_COMMISSION_TYPE_FIXED,
		sales.SalesCommissionType_COMMISSION_TYPE_TIERED,
	}

	calcStatuses := []string{"PENDING", "APPROVED", "PAID", "CANCELLED"}

	plans := make([]*sales.SalesCommissionPlan, len(salesCommissionPlanNames))
	for i, name := range salesCommissionPlanNames {
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0)

		plan := &sales.SalesCommissionPlan{
			PlanId:         genID("scpl", i),
			Name:           name,
			Description:    fmt.Sprintf("Commission plan: %s", name),
			CommissionType: commissionTypes[i%len(commissionTypes)],
			EffectiveDate:  effectiveDate.Unix(),
			ExpiryDate:     expiryDate.Unix(),
			IsActive:       i < 6,
			AppliesTo:      "ALL",
			AuditInfo:      createAuditInfo(),
		}

		if commissionTypes[i%len(commissionTypes)] == sales.SalesCommissionType_COMMISSION_TYPE_PERCENTAGE {
			plan.BaseRate = float64(rand.Intn(10)+5) / 100
		} else if commissionTypes[i%len(commissionTypes)] == sales.SalesCommissionType_COMMISSION_TYPE_FIXED {
			plan.BaseAmount = money(store, int64(rand.Intn(50000)+5000))
		}

		// Embed commission calculations (3 per plan)
		calcs := make([]*sales.SalesCommissionCalc, 3)
		for j := 0; j < 3; j++ {
			salespersonID := pickRef(store.EmployeeIDs, (i*3 + j))
			orderID := pickRef(store.SalesOrderIDs, (i*3 + j))
			calcDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))

			salesAmount := int64(rand.Intn(50000000) + 500000)
			commissionRate := float64(rand.Intn(10)+5) / 100
			commissionAmount := int64(float64(salesAmount) * commissionRate)

			cStatus := calcStatuses[(i*3+j)%len(calcStatuses)]
			var paidDate int64
			if cStatus == "PAID" {
				paidDate = calcDate.AddDate(0, 0, rand.Intn(30)+15).Unix()
			}

			calcs[j] = &sales.SalesCommissionCalc{
				CalcId:           fmt.Sprintf("scc-%03d", i*3+j+1),
				SalespersonId:    salespersonID,
				SalesOrderId:     orderID,
				CalculationDate:  calcDate.Unix(),
				SalesAmount:      money(store, salesAmount),
				CommissionRate:   commissionRate,
				CommissionAmount: money(store, commissionAmount),
				Status:           cStatus,
				PaidDate:         paidDate,
				Notes:            fmt.Sprintf("Commission calculation %d", i*3+j+1),
			}
		}
		plan.Calculations = calcs

		plans[i] = plan
	}
	return plans
}

// generateSalesTargets creates sales target records
func generateSalesTargets(store *MockDataStore) []*sales.SalesTarget {
	periodTypes := []l8api.L8PeriodType{
		l8api.L8PeriodType_Monthly,
		l8api.L8PeriodType_Monthly,
		l8api.L8PeriodType_Quarterly,
		l8api.L8PeriodType_Quarterly,
		l8api.L8PeriodType_Yearly,
	}

	count := 20
	targets := make([]*sales.SalesTarget, count)
	for i := 0; i < count; i++ {
		salespersonID := pickRef(store.EmployeeIDs, i)
		territoryID := pickRef(store.SalesTerritoryIDs, i)

		pt := periodTypes[i%len(periodTypes)]
		var pv l8api.L8PeriodValue
		switch pt {
		case l8api.L8PeriodType_Monthly:
			pv = l8api.L8PeriodValue((i % 12) + 1) // January-December
		case l8api.L8PeriodType_Quarterly:
			pv = l8api.L8PeriodValue((i % 4) + 13) // Q1-Q4
		case l8api.L8PeriodType_Yearly:
			pv = l8api.L8PeriodValue_invalid_period_value
		}

		targetAmount := int64(rand.Intn(100000000) + 10000000)
		achievedAmount := targetAmount * int64(rand.Intn(120)+50) / 100
		achievementPercent := float64(achievedAmount) / float64(targetAmount) * 100

		targets[i] = &sales.SalesTarget{
			TargetId:      genID("stgt", i),
			Name:          fmt.Sprintf("Sales Target %d - %d", i+1, 2025),
			SalespersonId: salespersonID,
			TerritoryId:   territoryID,
			Period: &l8api.L8Period{
				PeriodType:  pt,
				PeriodYear:  2025,
				PeriodValue: pv,
			},
			TargetAmount:       money(store, targetAmount),
			AchievedAmount:     money(store, achievedAmount),
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

	periodTypes := []l8api.L8PeriodType{
		l8api.L8PeriodType_Monthly,
		l8api.L8PeriodType_Monthly,
		l8api.L8PeriodType_Quarterly,
		l8api.L8PeriodType_Quarterly,
		l8api.L8PeriodType_Yearly,
	}

	count := 20
	forecasts := make([]*sales.SalesForecast, count)
	for i := 0; i < count; i++ {
		salespersonID := pickRef(store.EmployeeIDs, i)
		territoryID := pickRef(store.SalesTerritoryIDs, i)
		customerID := pickRef(store.CustomerIDs, i)

		pt := periodTypes[i%len(periodTypes)]
		var pv l8api.L8PeriodValue
		switch pt {
		case l8api.L8PeriodType_Monthly:
			pv = l8api.L8PeriodValue((i % 12) + 1)
		case l8api.L8PeriodType_Quarterly:
			pv = l8api.L8PeriodValue((i % 4) + 13)
		case l8api.L8PeriodType_Yearly:
			pv = l8api.L8PeriodValue_invalid_period_value
		}

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
			ForecastId:    genID("sfcs", i),
			Name:          fmt.Sprintf("Forecast %d - %d", i+1, 2025),
			SalespersonId: salespersonID,
			TerritoryId:   territoryID,
			CustomerId:    customerID,
			Category:      category,
			Period: &l8api.L8Period{
				PeriodType:  pt,
				PeriodYear:  2025,
				PeriodValue: pv,
			},
			ForecastAmount:    money(store, forecastAmount),
			WeightedAmount:    money(store, weightedAmount),
			Probability:       probability,
			ExpectedCloseDate: expectedCloseDate.Unix(),
			Notes:             fmt.Sprintf("Forecast for period %d", i+1),
			AuditInfo:         createAuditInfo(),
		}
	}
	return forecasts
}
