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

	"github.com/saichler/l8erp/go/types/fin"
)

// generateTaxRules creates tax rule records linking tax codes to jurisdictions
func generateTaxRules(store *MockDataStore) []*fin.TaxRule {
	ruleNames := []string{
		"Federal Income Tax Rule",
		"CA Sales Tax Rule",
		"NY State Income Tax Rule",
		"TX Property Tax Rule",
		"Federal FICA Tax Rule",
		"CA State Income Tax Rule",
		"FL Sales Tax Rule",
		"Federal Excise Tax Rule",
	}
	rates := []float64{22.0, 7.25, 6.85, 1.8, 7.65, 9.3, 6.0, 3.0}

	rules := make([]*fin.TaxRule, len(ruleNames))
	for i, name := range ruleNames {
		rules[i] = &fin.TaxRule{
			RuleId:         genID("trule", i),
			TaxCodeId:      store.TaxCodeIDs[i%len(store.TaxCodeIDs)],
			JurisdictionId: store.TaxJurisdictionIDs[i%len(store.TaxJurisdictionIDs)],
			Name:           name,
			Rate:           rates[i],
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:       true,
			AuditInfo:      createAuditInfo(),
		}
	}
	return rules
}

// generateTaxExemptions creates tax exemption records
func generateTaxExemptions(store *MockDataStore) []*fin.TaxExemption {
	reasons := []string{"Non-profit organization", "Government entity", "Interstate commerce", "Resale certificate"}
	exemptions := make([]*fin.TaxExemption, 4)
	for i := 0; i < 4; i++ {
		ex := &fin.TaxExemption{
			ExemptionId:     genID("texmpt", i),
			TaxCodeId:       store.TaxCodeIDs[i%len(store.TaxCodeIDs)],
			ExemptionNumber: fmt.Sprintf("EX%06d", rand.Intn(999999)+1),
			Reason:          reasons[i],
			EffectiveDate:   time.Date(2024, time.Month(i+1), 1, 0, 0, 0, 0, time.UTC).Unix(),
			ExpirationDate:  time.Date(2026, time.Month(i+1), 1, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:        true,
			AuditInfo:       createAuditInfo(),
		}
		// First two have CustomerId, last two have VendorId
		if i < 2 {
			ex.CustomerId = store.CustomerIDs[i%len(store.CustomerIDs)]
		} else {
			ex.VendorId = store.VendorIDs[i%len(store.VendorIDs)]
		}
		exemptions[i] = ex
	}
	return exemptions
}

// generateWithholdingTaxConfigs creates withholding tax configuration records
func generateWithholdingTaxConfigs(store *MockDataStore) []*fin.WithholdingTaxConfig {
	whRates := []float64{30.0, 15.0, 10.0, 25.0}
	thresholds := []int64{500000, 1000000, 250000, 750000} // in cents

	configs := make([]*fin.WithholdingTaxConfig, 4)
	for i := 0; i < 4; i++ {
		configs[i] = &fin.WithholdingTaxConfig{
			ConfigId:        genID("whtc", i),
			VendorId:        store.VendorIDs[i%len(store.VendorIDs)],
			TaxCodeId:       store.TaxCodeIDs[i%len(store.TaxCodeIDs)],
			WithholdingRate: whRates[i],
			ThresholdAmount: money(thresholds[i]),
			EffectiveDate:   time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:        true,
			AuditInfo:       createAuditInfo(),
		}
	}
	return configs
}

// generateBudgets creates budget records, one per HCM department
func generateBudgets(store *MockDataStore) []*fin.Budget {
	budgets := make([]*fin.Budget, len(departmentNames))
	for i, name := range departmentNames {
		totalAmount := int64(rand.Intn(400000_00)+100000_00) // $100k-$500k in cents
		budgets[i] = &fin.Budget{
			BudgetId:     genID("bdgt", i),
			BudgetName:   fmt.Sprintf("Operating Budget - %s", name),
			Description:  fmt.Sprintf("FY2025 operating budget for %s department", name),
			BudgetType:   fin.BudgetType_BUDGET_TYPE_DEPARTMENTAL,
			Status:       fin.BudgetStatus_BUDGET_STATUS_ACTIVE,
			FiscalYearId: store.FiscalYearIDs[1], // 2025
			DepartmentId: store.DepartmentIDs[i],
			TotalAmount:  money(totalAmount),
			ApprovedBy:   "mock-generator",
			ApprovedDate: time.Date(2025, 1, 15, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:    createAuditInfo(),
		}
	}
	return budgets
}

// generateBudgetLines creates budget line records, 5 per budget
func generateBudgetLines(store *MockDataStore) []*fin.BudgetLine {
	lines := make([]*fin.BudgetLine, 0, len(store.BudgetIDs)*5)
	lineIdx := 1

	for _, budgetID := range store.BudgetIDs {
		for j := 0; j < 5; j++ {
			budgeted := int64(rand.Intn(50000_00) + 10000_00) // $10k-$60k in cents
			actual := int64(float64(budgeted) * (0.5 + rand.Float64()*0.6))
			variance := budgeted - actual
			// Use 2025 fiscal periods (indices 12-23)
			periodIdx := 12 + (j*2)%12
			if periodIdx >= len(store.FiscalPeriodIDs) {
				periodIdx = len(store.FiscalPeriodIDs) - 1
			}
			lines = append(lines, &fin.BudgetLine{
				LineId:         fmt.Sprintf("bln-%03d", lineIdx),
				BudgetId:       budgetID,
				AccountId:      store.AccountIDs[(lineIdx-1)%len(store.AccountIDs)],
				FiscalPeriodId: store.FiscalPeriodIDs[periodIdx],
				BudgetedAmount: money(budgeted),
				ActualAmount:   money(actual),
				Variance:       money(variance),
				Description:    fmt.Sprintf("Budget line %d", lineIdx),
				AuditInfo:      createAuditInfo(),
			})
			lineIdx++
		}
	}
	return lines
}

// generateBudgetTransfers creates budget transfer records
func generateBudgetTransfers(store *MockDataStore) []*fin.BudgetTransfer {
	transfers := make([]*fin.BudgetTransfer, 5)
	reasons := []string{
		"Reallocation for Q2 priorities",
		"Department restructuring",
		"Emergency fund transfer",
		"Seasonal adjustment",
		"Project budget reallocation",
	}

	for i := 0; i < 5; i++ {
		fromIdx := (i * 2) % len(store.BudgetLineIDs)
		toIdx := (i*2 + 1) % len(store.BudgetLineIDs)
		transfers[i] = &fin.BudgetTransfer{
			TransferId:       genID("bxfr", i),
			FromBudgetLineId: store.BudgetLineIDs[fromIdx],
			ToBudgetLineId:   store.BudgetLineIDs[toIdx],
			Amount:           money(int64(rand.Intn(10000_00) + 1000_00)),
			TransferDate:     time.Now().Unix(),
			Reason:           reasons[i],
			ApprovedBy:       "mock-generator",
			ApprovedDate:     time.Now().Unix(),
			AuditInfo:        createAuditInfo(),
		}
	}
	return transfers
}

// generateBudgetScenarios creates budget scenario records
func generateBudgetScenarios(store *MockDataStore) []*fin.BudgetScenario {
	scenarios := []*fin.BudgetScenario{
		{
			ScenarioId:       "bscn-001",
			ScenarioName:     "Conservative",
			Description:      "Conservative budget scenario with 10% reduction",
			BaseBudgetId:     store.BudgetIDs[0],
			AdjustmentFactor: 90,
			IsActive:         false,
			AuditInfo:        createAuditInfo(),
		},
		{
			ScenarioId:       "bscn-002",
			ScenarioName:     "Moderate",
			Description:      "Moderate budget scenario matching base budget",
			BaseBudgetId:     store.BudgetIDs[0],
			AdjustmentFactor: 100,
			IsActive:         true,
			AuditInfo:        createAuditInfo(),
		},
		{
			ScenarioId:       "bscn-003",
			ScenarioName:     "Aggressive",
			Description:      "Aggressive growth scenario with 15% increase",
			BaseBudgetId:     store.BudgetIDs[0],
			AdjustmentFactor: 115,
			IsActive:         false,
			AuditInfo:        createAuditInfo(),
		},
	}
	return scenarios
}

// generateCapitalExpenditures creates capital expenditure records
func generateCapitalExpenditures(store *MockDataStore) []*fin.CapitalExpenditure {
	projects := []struct {
		name          string
		description   string
		status        fin.CapexStatus
		requested     int64
		approved      int64
		justification string
	}{
		{"Server Room Upgrade", "Upgrade data center servers and cooling", fin.CapexStatus_CAPEX_STATUS_APPROVED, 250000_00, 230000_00, "End-of-life hardware replacement"},
		{"Office Renovation", "Renovate 3rd floor office space", fin.CapexStatus_CAPEX_STATUS_IN_PROGRESS, 180000_00, 175000_00, "Improve workspace productivity"},
		{"Fleet Replacement", "Replace aging company vehicles", fin.CapexStatus_CAPEX_STATUS_PROPOSED, 320000_00, 0, "Maintenance costs exceed replacement value"},
		{"Software Platform", "New enterprise software platform", fin.CapexStatus_CAPEX_STATUS_APPROVED, 500000_00, 480000_00, "Digital transformation initiative"},
		{"Warehouse Expansion", "Expand warehouse capacity by 30%", fin.CapexStatus_CAPEX_STATUS_PROPOSED, 750000_00, 0, "Accommodate projected growth"},
	}

	items := make([]*fin.CapitalExpenditure, len(projects))
	for i, p := range projects {
		items[i] = &fin.CapitalExpenditure{
			CapexId:                genID("capx", i),
			ProjectName:            p.name,
			Description:            p.description,
			DepartmentId:           store.DepartmentIDs[i%len(store.DepartmentIDs)],
			FiscalYearId:           store.FiscalYearIDs[1], // 2025
			Status:                 p.status,
			RequestedAmount:        money(p.requested),
			ApprovedAmount:         money(p.approved),
			RequestedDate:          time.Date(2025, 1, 15, 0, 0, 0, 0, time.UTC).Unix(),
			RequestedBy:            "mock-generator",
			ApprovedBy:             "mock-generator",
			ExpectedCompletionDate: time.Date(2025, 12, 31, 0, 0, 0, 0, time.UTC).Unix(),
			Justification:          p.justification,
			AuditInfo:              createAuditInfo(),
		}
	}
	return items
}

// generateForecasts creates forecast records
func generateForecasts(store *MockDataStore) []*fin.Forecast {
	forecastDefs := []struct {
		name         string
		ftype        fin.ForecastType
		projected    int64
		actual       int64
		periodMonth  time.Month
		periodMonths int
	}{
		{"Q1 Revenue Forecast", fin.ForecastType_FORECAST_TYPE_REVENUE, 2500000_00, 2650000_00, 1, 3},
		{"Q2 Revenue Forecast", fin.ForecastType_FORECAST_TYPE_REVENUE, 2800000_00, 2750000_00, 4, 3},
		{"Q3 Revenue Forecast", fin.ForecastType_FORECAST_TYPE_REVENUE, 3000000_00, 0, 7, 3},
		{"Q4 Revenue Forecast", fin.ForecastType_FORECAST_TYPE_REVENUE, 3200000_00, 0, 10, 3},
		{"Annual Cash Flow Forecast", fin.ForecastType_FORECAST_TYPE_CASH_FLOW, 1500000_00, 1420000_00, 1, 12},
		{"Q1 Expense Forecast", fin.ForecastType_FORECAST_TYPE_EXPENSE, 1800000_00, 1850000_00, 1, 3},
		{"Q2 Expense Forecast", fin.ForecastType_FORECAST_TYPE_EXPENSE, 1900000_00, 1870000_00, 4, 3},
		{"Annual Balance Sheet Forecast", fin.ForecastType_FORECAST_TYPE_BALANCE_SHEET, 12000000_00, 0, 1, 12},
		{"H1 Cash Flow Forecast", fin.ForecastType_FORECAST_TYPE_CASH_FLOW, 800000_00, 780000_00, 1, 6},
		{"H2 Cash Flow Forecast", fin.ForecastType_FORECAST_TYPE_CASH_FLOW, 900000_00, 0, 7, 6},
	}

	forecasts := make([]*fin.Forecast, len(forecastDefs))
	for i, f := range forecastDefs {
		variance := f.projected - f.actual
		periodStart := time.Date(2025, f.periodMonth, 1, 0, 0, 0, 0, time.UTC)
		periodEnd := periodStart.AddDate(0, f.periodMonths, -1)

		forecasts[i] = &fin.Forecast{
			ForecastId:      genID("fcst", i),
			ForecastName:    f.name,
			Description:     fmt.Sprintf("FY2025 %s", f.name),
			ForecastType:    f.ftype,
			FiscalYearId:    store.FiscalYearIDs[1], // 2025
			ForecastDate:    time.Now().Unix(),
			PeriodStart:     periodStart.Unix(),
			PeriodEnd:       periodEnd.Unix(),
			ProjectedAmount: money(f.projected),
			ActualAmount:    money(f.actual),
			Variance:        money(variance),
			AuditInfo:       createAuditInfo(),
		}
	}
	return forecasts
}
