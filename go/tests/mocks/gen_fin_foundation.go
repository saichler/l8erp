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
	"time"

	"github.com/saichler/l8erp/go/types/fin"
)

// generateCurrencies creates currency records
func generateCurrencies() []*fin.Currency {
	type currencyDef struct {
		code          string
		name          string
		symbol        string
		decimalPlaces int32
	}
	defs := []currencyDef{
		{"USD", "US Dollar", "$", 2},
		{"EUR", "Euro", "\u20ac", 2},
		{"GBP", "British Pound", "\u00a3", 2},
		{"JPY", "Japanese Yen", "\u00a5", 0},
		{"CAD", "Canadian Dollar", "C$", 2},
	}

	currencies := make([]*fin.Currency, len(defs))
	for i, d := range defs {
		currencies[i] = &fin.Currency{
			CurrencyId:    fmt.Sprintf("cur-%03d", i+1),
			Code:          d.code,
			Name:          d.name,
			Symbol:        d.symbol,
			DecimalPlaces: d.decimalPlaces,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		}
	}
	return currencies
}

// generateFiscalYears creates fiscal year records
func generateFiscalYears() []*fin.FiscalYear {
	years := make([]*fin.FiscalYear, 2)

	years[0] = &fin.FiscalYear{
		FiscalYearId: "fy-001",
		YearName:     "FY2024",
		StartDate:    time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		EndDate:      time.Date(2024, 12, 31, 23, 59, 59, 0, time.UTC).Unix(),
		IsClosed:     true,
		IsActive:     false,
		AuditInfo:    createAuditInfo(),
	}

	years[1] = &fin.FiscalYear{
		FiscalYearId: "fy-002",
		YearName:     "FY2025",
		StartDate:    time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		EndDate:      time.Date(2025, 12, 31, 23, 59, 59, 0, time.UTC).Unix(),
		IsClosed:     false,
		IsActive:     true,
		AuditInfo:    createAuditInfo(),
	}

	return years
}

// generateAssetCategories creates asset category records
func generateAssetCategories() []*fin.AssetCategory {
	usefulLifeMonths := []int32{36, 60, 36, 84, 60, 120, 84, 120}

	categories := make([]*fin.AssetCategory, len(assetCategoryNames))
	for i, name := range assetCategoryNames {
		categories[i] = &fin.AssetCategory{
			CategoryId:                fmt.Sprintf("acat-%03d", i+1),
			Name:                      name,
			Code:                      fmt.Sprintf("AC%03d", i+1),
			Description:               fmt.Sprintf("Category for %s", name),
			DefaultDepreciationMethod: fin.DepreciationMethod_DEPRECIATION_METHOD_STRAIGHT_LINE,
			DefaultUsefulLifeMonths:   usefulLifeMonths[i],
			IsActive:                  true,
			AuditInfo:                 createAuditInfo(),
		}
	}
	return categories
}

// generateTaxJurisdictions creates tax jurisdiction records
func generateTaxJurisdictions() []*fin.TaxJurisdiction {
	stateCodes := []string{"", "CA", "NY", "TX", "IL"}

	jurisdictions := make([]*fin.TaxJurisdiction, len(taxJurisdictionNames))
	for i, name := range taxJurisdictionNames {
		j := &fin.TaxJurisdiction{
			JurisdictionId: fmt.Sprintf("tjur-%03d", i+1),
			Name:           name,
			Code:           fmt.Sprintf("TJ%03d", i+1),
			CountryCode:    "US",
			IsActive:       true,
			AuditInfo:      createAuditInfo(),
		}

		if i == 0 {
			j.Level = fin.JurisdictionLevel_JURISDICTION_LEVEL_FEDERAL
		} else {
			j.Level = fin.JurisdictionLevel_JURISDICTION_LEVEL_STATE
			j.ParentJurisdictionId = "tjur-001"
			j.StateCode = stateCodes[i]
		}

		jurisdictions[i] = j
	}
	return jurisdictions
}

// generateFiscalPeriods creates fiscal period records (12 per fiscal year)
func generateFiscalPeriods(store *MockDataStore) []*fin.FiscalPeriod {
	now := time.Now()
	periods := make([]*fin.FiscalPeriod, 0, 24)
	idx := 1

	yearConfigs := []struct {
		fiscalYearID string
		yearName     string
		year         int
	}{
		{store.FiscalYearIDs[0], "FY2024", 2024},
		{store.FiscalYearIDs[1], "FY2025", 2025},
	}

	for _, yc := range yearConfigs {
		for month := 1; month <= 12; month++ {
			startDate := time.Date(yc.year, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
			endDate := startDate.AddDate(0, 1, -1)
			endDate = time.Date(endDate.Year(), endDate.Month(), endDate.Day(), 23, 59, 59, 0, time.UTC)

			var status fin.FiscalPeriodStatus
			if yc.year == 2024 {
				status = fin.FiscalPeriodStatus_FISCAL_PERIOD_STATUS_CLOSED
			} else {
				periodEnd := time.Date(yc.year, time.Month(month), endDate.Day(), 23, 59, 59, 0, time.UTC)
				if periodEnd.Before(now) {
					status = fin.FiscalPeriodStatus_FISCAL_PERIOD_STATUS_CLOSED
				} else {
					status = fin.FiscalPeriodStatus_FISCAL_PERIOD_STATUS_OPEN
				}
			}

			periods = append(periods, &fin.FiscalPeriod{
				FiscalPeriodId: fmt.Sprintf("fp-%03d", idx),
				FiscalYearId:   yc.fiscalYearID,
				PeriodName:     fmt.Sprintf("%s-M%02d", yc.yearName, month),
				PeriodNumber:   int32(month),
				StartDate:      startDate.Unix(),
				EndDate:        endDate.Unix(),
				Status:         status,
				AuditInfo:      createAuditInfo(),
			})
			idx++
		}
	}
	return periods
}

// generateAccounts creates the chart of accounts
func generateAccounts(store *MockDataStore) []*fin.Account {
	type accountDef struct {
		number      string
		name        string
		accountType fin.AccountType
		balance     fin.BalanceType
	}

	defs := []accountDef{
		// Assets (1000-1110)
		{"1000", "Cash", fin.AccountType_ACCOUNT_TYPE_ASSET, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"1010", "Accounts Receivable", fin.AccountType_ACCOUNT_TYPE_ASSET, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"1020", "Inventory", fin.AccountType_ACCOUNT_TYPE_ASSET, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"1030", "Prepaid Expenses", fin.AccountType_ACCOUNT_TYPE_ASSET, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"1100", "Fixed Assets", fin.AccountType_ACCOUNT_TYPE_ASSET, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"1110", "Accumulated Depreciation", fin.AccountType_ACCOUNT_TYPE_ASSET, fin.BalanceType_BALANCE_TYPE_DEBIT},
		// Liabilities (2000-2030)
		{"2000", "Accounts Payable", fin.AccountType_ACCOUNT_TYPE_LIABILITY, fin.BalanceType_BALANCE_TYPE_CREDIT},
		{"2010", "Accrued Liabilities", fin.AccountType_ACCOUNT_TYPE_LIABILITY, fin.BalanceType_BALANCE_TYPE_CREDIT},
		{"2020", "Notes Payable", fin.AccountType_ACCOUNT_TYPE_LIABILITY, fin.BalanceType_BALANCE_TYPE_CREDIT},
		{"2030", "Tax Payable", fin.AccountType_ACCOUNT_TYPE_LIABILITY, fin.BalanceType_BALANCE_TYPE_CREDIT},
		// Equity (3000-3010)
		{"3000", "Common Stock", fin.AccountType_ACCOUNT_TYPE_EQUITY, fin.BalanceType_BALANCE_TYPE_CREDIT},
		{"3010", "Retained Earnings", fin.AccountType_ACCOUNT_TYPE_EQUITY, fin.BalanceType_BALANCE_TYPE_CREDIT},
		// Revenue (4000-4020)
		{"4000", "Sales Revenue", fin.AccountType_ACCOUNT_TYPE_REVENUE, fin.BalanceType_BALANCE_TYPE_CREDIT},
		{"4010", "Service Revenue", fin.AccountType_ACCOUNT_TYPE_REVENUE, fin.BalanceType_BALANCE_TYPE_CREDIT},
		{"4020", "Interest Income", fin.AccountType_ACCOUNT_TYPE_REVENUE, fin.BalanceType_BALANCE_TYPE_CREDIT},
		// Expenses (5000-5100)
		{"5000", "Cost of Goods Sold", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5010", "Salaries Expense", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5020", "Rent Expense", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5030", "Utilities Expense", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5040", "Depreciation Expense", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5050", "Insurance Expense", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5060", "Office Supplies Expense", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5070", "Travel Expense", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5080", "Marketing Expense", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5090", "Professional Fees", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
		{"5100", "Miscellaneous Expense", fin.AccountType_ACCOUNT_TYPE_EXPENSE, fin.BalanceType_BALANCE_TYPE_DEBIT},
	}

	usdCurrencyID := store.CurrencyIDs[0]
	accounts := make([]*fin.Account, len(defs))
	for i, d := range defs {
		accounts[i] = &fin.Account{
			AccountId:     fmt.Sprintf("acct-%03d", i+1),
			AccountNumber: d.number,
			Name:          d.name,
			Description:   fmt.Sprintf("GL account for %s", d.name),
			AccountType:   d.accountType,
			NormalBalance: d.balance,
			CurrencyId:    usdCurrencyID,
			IsActive:      true,
			IsHeader:      false,
			AuditInfo:     createAuditInfo(),
		}
	}
	return accounts
}

// generateTaxCodes creates tax code records
func generateTaxCodes(store *MockDataStore) []*fin.TaxCode {
	type taxCodeDef struct {
		name    string
		rate    float64
		taxType fin.TaxType
	}

	defs := []taxCodeDef{
		{"Sales Tax 7%", 7.0, fin.TaxType_TAX_TYPE_SALES},
		{"Sales Tax Reduced 3.5%", 3.5, fin.TaxType_TAX_TYPE_SALES},
		{"Purchase Tax 7%", 7.0, fin.TaxType_TAX_TYPE_PURCHASE},
		{"Income Tax Federal 21%", 21.0, fin.TaxType_TAX_TYPE_INCOME},
		{"Income Tax State 8.84%", 8.84, fin.TaxType_TAX_TYPE_INCOME},
		{"Withholding 30%", 30.0, fin.TaxType_TAX_TYPE_WITHHOLDING},
		{"Withholding Reduced 15%", 15.0, fin.TaxType_TAX_TYPE_WITHHOLDING},
		{"Excise 10%", 10.0, fin.TaxType_TAX_TYPE_EXCISE},
		{"Payroll Tax 7.65%", 7.65, fin.TaxType_TAX_TYPE_PAYROLL},
		{"VAT 10%", 10.0, fin.TaxType_TAX_TYPE_VALUE_ADDED},
	}

	// Tax Payable account is acct-010 (account number 2030)
	taxPayableAccountID := store.AccountIDs[9]

	taxCodes := make([]*fin.TaxCode, len(defs))
	for i, d := range defs {
		taxCodes[i] = &fin.TaxCode{
			TaxCodeId:   fmt.Sprintf("tc-%03d", i+1),
			Code:        fmt.Sprintf("TX%03d", i+1),
			Name:        d.name,
			Description: fmt.Sprintf("Tax code for %s", d.name),
			TaxType:     d.taxType,
			Rate:        d.rate,
			GlAccountId: taxPayableAccountID,
			IsActive:    true,
			AuditInfo:   createAuditInfo(),
		}
	}
	return taxCodes
}
