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

	"github.com/saichler/l8erp/go/types/fin"
)

// FIN Phase 1: Foundation
func generateFinPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Currencies
	currencies := generateCurrencies()
	if err := runOp(client, "Currencies", "/erp/40/Currency", &fin.CurrencyList{List: currencies}, extractIDs(currencies, func(e *fin.Currency) string { return e.CurrencyId }), &store.CurrencyIDs); err != nil {
		return err
	}

	// Generate Asset Categories
	assetCategories := generateAssetCategories()
	if err := runOp(client, "Asset Categories", "/erp/40/AstCat", &fin.AssetCategoryList{List: assetCategories}, extractIDs(assetCategories, func(e *fin.AssetCategory) string { return e.CategoryId }), &store.AssetCategoryIDs); err != nil {
		return err
	}

	// Generate Tax Jurisdictions (must be before FiscalYears since TaxReturns are now embedded)
	taxJurisdictions := generateTaxJurisdictions()
	if err := runOp(client, "Tax Jurisdictions", "/erp/40/TaxJuris", &fin.TaxJurisdictionList{List: taxJurisdictions}, extractIDs(taxJurisdictions, func(e *fin.TaxJurisdiction) string { return e.JurisdictionId }), &store.TaxJurisdictionIDs); err != nil {
		return err
	}

	// Generate Fiscal Years (with embedded Periods and TaxReturns; populates store.FiscalPeriodIDs)
	fiscalYears := generateFiscalYears(store)
	if err := runOp(client, "Fiscal Years", "/erp/40/FiscalYr", &fin.FiscalYearList{List: fiscalYears}, extractIDs(fiscalYears, func(e *fin.FiscalYear) string { return e.FiscalYearId }), &store.FiscalYearIDs); err != nil {
		return err
	}

	return nil
}

// FIN Phase 2: Core Financial
func generateFinPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Accounts (with embedded AccountBalances)
	accounts := generateAccounts(store)
	if err := runOp(client, "Accounts", "/erp/40/Account", &fin.AccountList{List: accounts}, extractIDs(accounts, func(e *fin.Account) string { return e.AccountId }), &store.AccountIDs); err != nil {
		return err
	}

	// Generate Tax Codes
	taxCodes := generateTaxCodes(store)
	if err := runOp(client, "Tax Codes", "/erp/40/TaxCode", &fin.TaxCodeList{List: taxCodes}, extractIDs(taxCodes, func(e *fin.TaxCode) string { return e.TaxCodeId }), &store.TaxCodeIDs); err != nil {
		return err
	}

	return nil
}

// FIN Phase 3: Entity Master
func generateFinPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Vendors (with embedded VendorContacts and WithholdingTaxConfigs)
	vendors := generateVendors(store)
	if err := runOp(client, "Vendors", "/erp/40/Vendor", &fin.VendorList{List: vendors}, extractIDs(vendors, func(e *fin.Vendor) string { return e.VendorId }), &store.VendorIDs); err != nil {
		return err
	}

	// Generate Customers (with embedded CustomerContacts)
	customers := generateCustomers(store)
	if err := runOp(client, "Customers", "/erp/40/Customer", &fin.CustomerList{List: customers}, extractIDs(customers, func(e *fin.Customer) string { return e.CustomerId }), &store.CustomerIDs); err != nil {
		return err
	}

	// Generate Bank Accounts (with embedded Transactions and Reconciliations)
	bankAccounts := generateBankAccounts(store)
	if err := runOp(client, "Bank Accounts", "/erp/40/BankAcct", &fin.BankAccountList{List: bankAccounts}, extractIDs(bankAccounts, func(e *fin.BankAccount) string { return e.BankAccountId }), &store.BankAccountIDs); err != nil {
		return err
	}

	// Generate Exchange Rates
	exchangeRates := generateExchangeRates(store)
	if err := runOp(client, "Exchange Rates", "/erp/40/XchgRate", &fin.ExchangeRateList{List: exchangeRates}, extractIDs(exchangeRates, func(e *fin.ExchangeRate) string { return e.ExchangeRateId }), &store.ExchangeRateIDs); err != nil {
		return err
	}

	return nil
}

// FIN Phase 4: Configuration
func generateFinPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Tax Rules
	taxRules := generateTaxRules(store)
	if err := runOp(client, "Tax Rules", "/erp/40/TaxRule", &fin.TaxRuleList{List: taxRules}, extractIDs(taxRules, func(e *fin.TaxRule) string { return e.RuleId }), &store.TaxRuleIDs); err != nil {
		return err
	}

	// Generate Tax Exemptions
	taxExemptions := generateTaxExemptions(store)
	if err := runOp(client, "Tax Exemptions", "/erp/40/TaxExmpt", &fin.TaxExemptionList{List: taxExemptions}, extractIDs(taxExemptions, func(e *fin.TaxExemption) string { return e.ExemptionId }), &store.TaxExemptionIDs); err != nil {
		return err
	}

	// Generate Budgets (with embedded Lines, Scenarios, and Transfers)
	budgets := generateBudgets(store)
	if err := runOp(client, "Budgets", "/erp/40/Budget", &fin.BudgetList{List: budgets}, extractIDs(budgets, func(e *fin.Budget) string { return e.BudgetId }), &store.BudgetIDs); err != nil {
		return err
	}

	// Generate Capital Expenditures
	capExpenditures := generateCapitalExpenditures(store)
	if err := runOp(client, "Capital Expenditures", "/erp/40/CapEx", &fin.CapitalExpenditureList{List: capExpenditures}, extractIDs(capExpenditures, func(e *fin.CapitalExpenditure) string { return e.CapexId }), &store.CapExIDs); err != nil {
		return err
	}

	// Generate Forecasts
	forecasts := generateForecasts(store)
	if err := runOp(client, "Forecasts", "/erp/40/Forecast", &fin.ForecastList{List: forecasts}, extractIDs(forecasts, func(e *fin.Forecast) string { return e.ForecastId }), &store.ForecastIDs); err != nil {
		return err
	}

	return nil
}

// FIN Phase 5: AP Transactions
func generateFinPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Purchase Invoices (with embedded Lines)
	purchaseInvoices := generatePurchaseInvoices(store)
	if err := runOp(client, "Purchase Invoices", "/erp/40/PurchInv", &fin.PurchaseInvoiceList{List: purchaseInvoices}, extractIDs(purchaseInvoices, func(e *fin.PurchaseInvoice) string { return e.InvoiceId }), &store.PurchaseInvoiceIDs); err != nil {
		return err
	}

	// Generate Payment Schedules
	paymentSchedules := generatePaymentSchedules(store)
	if err := runOp(client, "Payment Schedules", "/erp/40/PmtSched", &fin.PaymentScheduleList{List: paymentSchedules}, extractIDs(paymentSchedules, func(e *fin.PaymentSchedule) string { return e.ScheduleId }), &store.PaymentScheduleIDs); err != nil {
		return err
	}

	// Generate Vendor Payments (with embedded Allocations)
	vendorPayments := generateVendorPayments(store)
	if err := runOp(client, "Vendor Payments", "/erp/40/VndrPmt", &fin.VendorPaymentList{List: vendorPayments}, extractIDs(vendorPayments, func(e *fin.VendorPayment) string { return e.PaymentId }), &store.VendorPaymentIDs); err != nil {
		return err
	}

	// Generate Vendor Statements
	vendorStatements := generateVendorStatements(store)
	if err := runOp(client, "Vendor Statements", "/erp/40/VndrStmt", &fin.VendorStatementList{List: vendorStatements}, extractIDs(vendorStatements, func(e *fin.VendorStatement) string { return e.StatementId }), &store.VendorStatementIDs); err != nil {
		return err
	}

	return nil
}
