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

	"github.com/saichler/l8erp/go/types/erp"
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
			CurrencyId:    genID("cur", i),
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

// generateFiscalYears creates fiscal year records with embedded periods and tax returns.
// Populates store.FiscalPeriodIDs for cross-reference by other generators.
func generateFiscalYears(store *MockDataStore) []*fin.FiscalYear {
	now := time.Now()
	periodIdx := 1

	yearConfigs := []struct {
		id       string
		name     string
		year     int
		isClosed bool
		isActive bool
	}{
		{"fy-001", "FY2024", 2024, true, false},
		{"fy-002", "FY2025", 2025, false, true},
	}

	years := make([]*fin.FiscalYear, len(yearConfigs))
	for yi, yc := range yearConfigs {
		// Generate embedded fiscal periods (12 per year)
		periods := make([]*fin.FiscalPeriod, 12)
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

			fpID := fmt.Sprintf("fp-%03d", periodIdx)
			periods[month-1] = &fin.FiscalPeriod{
				FiscalPeriodId: fpID,
				FiscalYearId:   yc.id,
				PeriodName:     fmt.Sprintf("%s-M%02d", yc.name, month),
				PeriodNumber:   int32(month),
				StartDate:      startDate.Unix(),
				EndDate:        endDate.Unix(),
				Status:         status,
				AuditInfo:      createAuditInfo(),
			}
			store.FiscalPeriodIDs = append(store.FiscalPeriodIDs, fpID)
			periodIdx++
		}

		// Generate embedded tax returns (quarterly, only for FY2025)
		var returns []*fin.TaxReturn
		if yc.year == 2025 {
			returns = generateTaxReturnsForYear(store)
		}

		years[yi] = &fin.FiscalYear{
			FiscalYearId: yc.id,
			YearName:     yc.name,
			StartDate:    time.Date(yc.year, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			EndDate:      time.Date(yc.year, 12, 31, 23, 59, 59, 0, time.UTC).Unix(),
			IsClosed:     yc.isClosed,
			IsActive:     yc.isActive,
			AuditInfo:    createAuditInfo(),
			Periods:      periods,
			Returns:      returns,
		}
	}

	return years
}

// generateTaxReturnsForYear creates quarterly tax return records embedded in FiscalYear
func generateTaxReturnsForYear(store *MockDataStore) []*fin.TaxReturn {
	returns := make([]*fin.TaxReturn, 4)

	quarterEndMonths := []time.Month{time.March, time.June, time.September, time.December}
	dueDateMonths := []time.Month{time.April, time.July, time.October, time.January}
	dueDateYears := []int{2025, 2025, 2025, 2026}

	// FiscalPeriodIDs indices 12-23 are 2025 monthly periods
	// Quarter end periods: March=14, June=17, September=20, December=23
	quarterPeriodIndices := []int{14, 17, 20, 23}

	for i := 0; i < 4; i++ {
		periodIdx := quarterPeriodIndices[i]
		if periodIdx >= len(store.FiscalPeriodIDs) {
			periodIdx = len(store.FiscalPeriodIDs) - 1
		}

		status := fin.TaxReturnStatus_TAX_RETURN_STATUS_FILED
		if i == 3 {
			status = fin.TaxReturnStatus_TAX_RETURN_STATUS_DRAFT
		}

		taxableAmount := int64(rand.Intn(5000000)+1000000) * 100
		taxRate := 21
		taxAmount := taxableAmount * int64(taxRate) / 100

		var amountPaid, amountDue int64
		if status == fin.TaxReturnStatus_TAX_RETURN_STATUS_FILED {
			amountPaid = taxAmount
			amountDue = 0
		} else {
			amountPaid = 0
			amountDue = taxAmount
		}

		quarterEnd := time.Date(2025, quarterEndMonths[i], 1, 0, 0, 0, 0, time.UTC)
		quarterEnd = quarterEnd.AddDate(0, 1, -1)
		dueDate := time.Date(dueDateYears[i], dueDateMonths[i], 15, 0, 0, 0, 0, time.UTC)

		jurisdictionID := ""
		if len(store.TaxJurisdictionIDs) > 0 {
			jurisdictionID = store.TaxJurisdictionIDs[0]
		}

		ret := &fin.TaxReturn{
			ReturnId:       genID("txrtn", i),
			JurisdictionId: jurisdictionID,
			FiscalPeriodId: store.FiscalPeriodIDs[periodIdx],
			TaxType:        fin.TaxType_TAX_TYPE_INCOME,
			Status:         status,
			DueDate:        dueDate.Unix(),
			TaxableAmount:  &erp.Money{Amount: taxableAmount, CurrencyId: pickRef(store.CurrencyIDs, 0)},
			TaxAmount:      &erp.Money{Amount: taxAmount, CurrencyId: pickRef(store.CurrencyIDs, 0)},
			AmountPaid:     &erp.Money{Amount: amountPaid, CurrencyId: pickRef(store.CurrencyIDs, 0)},
			AmountDue:      &erp.Money{Amount: amountDue, CurrencyId: pickRef(store.CurrencyIDs, 0)},
			Notes:          fmt.Sprintf("Q%d 2025 Federal Income Tax Return", i+1),
			AuditInfo:      createAuditInfo(),
		}

		if status == fin.TaxReturnStatus_TAX_RETURN_STATUS_FILED {
			ret.FilingDate = quarterEnd.AddDate(0, 0, 30).Unix()
			ret.FiledBy = "mock-generator"
			ret.ConfirmationNumber = fmt.Sprintf("FED-2025-Q%d-%06d", i+1, rand.Intn(1000000))
		}

		returns[i] = ret
	}

	return returns
}

// generateAssetCategories creates asset category records
func generateAssetCategories() []*fin.AssetCategory {
	usefulLifeMonths := []int32{36, 60, 36, 84, 60, 120, 84, 120}

	categories := make([]*fin.AssetCategory, len(assetCategoryNames))
	for i, name := range assetCategoryNames {
		categories[i] = &fin.AssetCategory{
			CategoryId:                genID("acat", i),
			Name:                      name,
			Code:                      genCode("AC", i),
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
			JurisdictionId: genID("tjur", i),
			Name:           name,
			Code:           genCode("TJ", i),
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

// generateAccounts creates the chart of accounts with embedded balances
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
	numPeriods := 6
	balIdx := 1

	accounts := make([]*fin.Account, len(defs))
	for i, d := range defs {
		accountID := genID("acct", i)

		// Generate embedded balances for first 10 accounts
		var balances []*fin.AccountBalance
		if i < 10 {
			balances = make([]*fin.AccountBalance, numPeriods)
			var ytdDebit, ytdCredit int64
			for p := 0; p < numPeriods; p++ {
				periodIdx := 12 + p // 2025 periods
				if periodIdx >= len(store.FiscalPeriodIDs) {
					periodIdx = len(store.FiscalPeriodIDs) - 1
				}
				beginningBalance := int64(rand.Intn(500000)+10000) * 100
				periodDebit := int64(rand.Intn(100000)+5000) * 100
				periodCredit := int64(rand.Intn(80000)+3000) * 100
				endingBalance := beginningBalance + periodDebit - periodCredit
				ytdDebit += periodDebit
				ytdCredit += periodCredit

				balances[p] = &fin.AccountBalance{
					BalanceId:        fmt.Sprintf("abal-%03d", balIdx),
					AccountId:        accountID,
					FiscalPeriodId:   store.FiscalPeriodIDs[periodIdx],
					BeginningBalance: money(store, beginningBalance),
					PeriodDebit:      money(store, periodDebit),
					PeriodCredit:     money(store, periodCredit),
					EndingBalance:    money(store, endingBalance),
					YtdDebit:         money(store, ytdDebit),
					YtdCredit:        money(store, ytdCredit),
					AuditInfo:        createAuditInfo(),
				}
				balIdx++
			}
		}

		accounts[i] = &fin.Account{
			AccountId:     accountID,
			AccountNumber: d.number,
			Name:          d.name,
			Description:   fmt.Sprintf("GL account for %s", d.name),
			AccountType:   d.accountType,
			NormalBalance: d.balance,
			CurrencyId:    usdCurrencyID,
			IsActive:      true,
			IsHeader:      false,
			AuditInfo:     createAuditInfo(),
			Balances:      balances,
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
			TaxCodeId:   genID("tc", i),
			Code:        genCode("TX", i),
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
