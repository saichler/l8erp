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

	// Generate Fiscal Years
	fiscalYears := generateFiscalYears()
	if err := runOp(client, "Fiscal Years", "/erp/40/FiscalYr", &fin.FiscalYearList{List: fiscalYears}, extractIDs(fiscalYears, func(e *fin.FiscalYear) string { return e.FiscalYearId }), &store.FiscalYearIDs); err != nil {
		return err
	}

	// Generate Asset Categories
	assetCategories := generateAssetCategories()
	if err := runOp(client, "Asset Categories", "/erp/40/AstCat", &fin.AssetCategoryList{List: assetCategories}, extractIDs(assetCategories, func(e *fin.AssetCategory) string { return e.CategoryId }), &store.AssetCategoryIDs); err != nil {
		return err
	}

	// Generate Tax Jurisdictions
	taxJurisdictions := generateTaxJurisdictions()
	if err := runOp(client, "Tax Jurisdictions", "/erp/40/TaxJuris", &fin.TaxJurisdictionList{List: taxJurisdictions}, extractIDs(taxJurisdictions, func(e *fin.TaxJurisdiction) string { return e.JurisdictionId }), &store.TaxJurisdictionIDs); err != nil {
		return err
	}

	return nil
}

// FIN Phase 2: Core Financial
func generateFinPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Fiscal Periods
	fiscalPeriods := generateFiscalPeriods(store)
	if err := runOp(client, "Fiscal Periods", "/erp/40/FiscalPd", &fin.FiscalPeriodList{List: fiscalPeriods}, extractIDs(fiscalPeriods, func(e *fin.FiscalPeriod) string { return e.FiscalPeriodId }), &store.FiscalPeriodIDs); err != nil {
		return err
	}

	// Generate Accounts
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
	// Generate Vendors
	vendors := generateVendors(store)
	if err := runOp(client, "Vendors", "/erp/40/Vendor", &fin.VendorList{List: vendors}, extractIDs(vendors, func(e *fin.Vendor) string { return e.VendorId }), &store.VendorIDs); err != nil {
		return err
	}

	// Generate Vendor Contacts
	vendorContacts := generateVendorContacts(store)
	if err := runOp(client, "Vendor Contacts", "/erp/40/VndrCont", &fin.VendorContactList{List: vendorContacts}, extractIDs(vendorContacts, func(e *fin.VendorContact) string { return e.ContactId }), &store.VendorContactIDs); err != nil {
		return err
	}

	// Generate Customers
	customers := generateCustomers(store)
	if err := runOp(client, "Customers", "/erp/40/Customer", &fin.CustomerList{List: customers}, extractIDs(customers, func(e *fin.Customer) string { return e.CustomerId }), &store.CustomerIDs); err != nil {
		return err
	}

	// Generate Customer Contacts
	customerContacts := generateCustomerContacts(store)
	if err := runOp(client, "Customer Contacts", "/erp/40/CustCont", &fin.CustomerContactList{List: customerContacts}, extractIDs(customerContacts, func(e *fin.CustomerContact) string { return e.ContactId }), &store.CustomerContactIDs); err != nil {
		return err
	}

	// Generate Bank Accounts
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

	// Generate Withholding Tax Configs
	whTaxConfigs := generateWithholdingTaxConfigs(store)
	if err := runOp(client, "Withholding Tax Configs", "/erp/40/WhtTxCfg", &fin.WithholdingTaxConfigList{List: whTaxConfigs}, extractIDs(whTaxConfigs, func(e *fin.WithholdingTaxConfig) string { return e.ConfigId }), &store.WHTaxConfigIDs); err != nil {
		return err
	}

	// Generate Budgets
	budgets := generateBudgets(store)
	if err := runOp(client, "Budgets", "/erp/40/Budget", &fin.BudgetList{List: budgets}, extractIDs(budgets, func(e *fin.Budget) string { return e.BudgetId }), &store.BudgetIDs); err != nil {
		return err
	}

	// Generate Budget Lines
	budgetLines := generateBudgetLines(store)
	if err := runOp(client, "Budget Lines", "/erp/40/BdgtLine", &fin.BudgetLineList{List: budgetLines}, extractIDs(budgetLines, func(e *fin.BudgetLine) string { return e.LineId }), &store.BudgetLineIDs); err != nil {
		return err
	}

	// Generate Budget Transfers
	budgetTransfers := generateBudgetTransfers(store)
	if err := runOp(client, "Budget Transfers", "/erp/40/BdgtXfer", &fin.BudgetTransferList{List: budgetTransfers}, extractIDs(budgetTransfers, func(e *fin.BudgetTransfer) string { return e.TransferId }), &store.BudgetTransferIDs); err != nil {
		return err
	}

	// Generate Budget Scenarios
	budgetScenarios := generateBudgetScenarios(store)
	if err := runOp(client, "Budget Scenarios", "/erp/40/BdgtScen", &fin.BudgetScenarioList{List: budgetScenarios}, extractIDs(budgetScenarios, func(e *fin.BudgetScenario) string { return e.ScenarioId }), &store.BudgetScenarioIDs); err != nil {
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
	// Generate Purchase Invoices
	purchaseInvoices := generatePurchaseInvoices(store)
	if err := runOp(client, "Purchase Invoices", "/erp/40/PurchInv", &fin.PurchaseInvoiceList{List: purchaseInvoices}, extractIDs(purchaseInvoices, func(e *fin.PurchaseInvoice) string { return e.InvoiceId }), &store.PurchaseInvoiceIDs); err != nil {
		return err
	}

	// Generate Purchase Invoice Lines
	purchaseInvoiceLines := generatePurchaseInvoiceLines(store)
	if err := runOp(client, "Purchase Invoice Lines", "/erp/40/PurchLine", &fin.PurchaseInvoiceLineList{List: purchaseInvoiceLines}, extractIDs(purchaseInvoiceLines, func(e *fin.PurchaseInvoiceLine) string { return e.LineId }), &store.PurchaseInvoiceLineIDs); err != nil {
		return err
	}

	// Generate Payment Schedules
	paymentSchedules := generatePaymentSchedules(store)
	if err := runOp(client, "Payment Schedules", "/erp/40/PmtSched", &fin.PaymentScheduleList{List: paymentSchedules}, extractIDs(paymentSchedules, func(e *fin.PaymentSchedule) string { return e.ScheduleId }), &store.PaymentScheduleIDs); err != nil {
		return err
	}

	// Generate Vendor Payments
	vendorPayments := generateVendorPayments(store)
	if err := runOp(client, "Vendor Payments", "/erp/40/VndrPmt", &fin.VendorPaymentList{List: vendorPayments}, extractIDs(vendorPayments, func(e *fin.VendorPayment) string { return e.PaymentId }), &store.VendorPaymentIDs); err != nil {
		return err
	}

	// Generate Payment Allocations
	paymentAllocations := generatePaymentAllocations(store)
	if err := runOp(client, "Payment Allocations", "/erp/40/PmtAlloc", &fin.PaymentAllocationList{List: paymentAllocations}, extractIDs(paymentAllocations, func(e *fin.PaymentAllocation) string { return e.AllocationId }), &store.PaymentAllocationIDs); err != nil {
		return err
	}

	// Generate Vendor Statements
	vendorStatements := generateVendorStatements(store)
	if err := runOp(client, "Vendor Statements", "/erp/40/VndrStmt", &fin.VendorStatementList{List: vendorStatements}, extractIDs(vendorStatements, func(e *fin.VendorStatement) string { return e.StatementId }), &store.VendorStatementIDs); err != nil {
		return err
	}

	return nil
}
