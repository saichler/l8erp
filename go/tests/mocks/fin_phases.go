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

	"github.com/saichler/l8erp/go/types/fin"
)

// FIN Phase 1: Foundation
func generateFinPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Currencies
	fmt.Printf("  Creating Currencies...")
	currencies := generateCurrencies()
	if err := client.post("/erp/40/Currency", &fin.CurrencyList{List: currencies}); err != nil {
		return fmt.Errorf("currencies: %w", err)
	}
	for _, c := range currencies {
		store.CurrencyIDs = append(store.CurrencyIDs, c.CurrencyId)
	}
	fmt.Printf(" %d created\n", len(currencies))

	// Generate Fiscal Years
	fmt.Printf("  Creating Fiscal Years...")
	fiscalYears := generateFiscalYears()
	if err := client.post("/erp/40/FiscalYr", &fin.FiscalYearList{List: fiscalYears}); err != nil {
		return fmt.Errorf("fiscal years: %w", err)
	}
	for _, fy := range fiscalYears {
		store.FiscalYearIDs = append(store.FiscalYearIDs, fy.FiscalYearId)
	}
	fmt.Printf(" %d created\n", len(fiscalYears))

	// Generate Asset Categories
	fmt.Printf("  Creating Asset Categories...")
	assetCategories := generateAssetCategories()
	if err := client.post("/erp/40/AstCat", &fin.AssetCategoryList{List: assetCategories}); err != nil {
		return fmt.Errorf("asset categories: %w", err)
	}
	for _, ac := range assetCategories {
		store.AssetCategoryIDs = append(store.AssetCategoryIDs, ac.CategoryId)
	}
	fmt.Printf(" %d created\n", len(assetCategories))

	// Generate Tax Jurisdictions
	fmt.Printf("  Creating Tax Jurisdictions...")
	taxJurisdictions := generateTaxJurisdictions()
	if err := client.post("/erp/40/TaxJuris", &fin.TaxJurisdictionList{List: taxJurisdictions}); err != nil {
		return fmt.Errorf("tax jurisdictions: %w", err)
	}
	for _, tj := range taxJurisdictions {
		store.TaxJurisdictionIDs = append(store.TaxJurisdictionIDs, tj.JurisdictionId)
	}
	fmt.Printf(" %d created\n", len(taxJurisdictions))

	return nil
}

// FIN Phase 2: Core Financial
func generateFinPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Fiscal Periods
	fmt.Printf("  Creating Fiscal Periods...")
	fiscalPeriods := generateFiscalPeriods(store)
	if err := client.post("/erp/40/FiscalPd", &fin.FiscalPeriodList{List: fiscalPeriods}); err != nil {
		return fmt.Errorf("fiscal periods: %w", err)
	}
	for _, fp := range fiscalPeriods {
		store.FiscalPeriodIDs = append(store.FiscalPeriodIDs, fp.FiscalPeriodId)
	}
	fmt.Printf(" %d created\n", len(fiscalPeriods))

	// Generate Accounts
	fmt.Printf("  Creating Accounts...")
	accounts := generateAccounts(store)
	if err := client.post("/erp/40/Account", &fin.AccountList{List: accounts}); err != nil {
		return fmt.Errorf("accounts: %w", err)
	}
	for _, a := range accounts {
		store.AccountIDs = append(store.AccountIDs, a.AccountId)
	}
	fmt.Printf(" %d created\n", len(accounts))

	// Generate Tax Codes
	fmt.Printf("  Creating Tax Codes...")
	taxCodes := generateTaxCodes(store)
	if err := client.post("/erp/40/TaxCode", &fin.TaxCodeList{List: taxCodes}); err != nil {
		return fmt.Errorf("tax codes: %w", err)
	}
	for _, tc := range taxCodes {
		store.TaxCodeIDs = append(store.TaxCodeIDs, tc.TaxCodeId)
	}
	fmt.Printf(" %d created\n", len(taxCodes))

	return nil
}

// FIN Phase 3: Entity Master
func generateFinPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Vendors
	fmt.Printf("  Creating Vendors...")
	vendors := generateVendors(store)
	if err := client.post("/erp/40/Vendor", &fin.VendorList{List: vendors}); err != nil {
		return fmt.Errorf("vendors: %w", err)
	}
	for _, v := range vendors {
		store.VendorIDs = append(store.VendorIDs, v.VendorId)
	}
	fmt.Printf(" %d created\n", len(vendors))

	// Generate Vendor Contacts
	fmt.Printf("  Creating Vendor Contacts...")
	vendorContacts := generateVendorContacts(store)
	if err := client.post("/erp/40/VndrCont", &fin.VendorContactList{List: vendorContacts}); err != nil {
		return fmt.Errorf("vendor contacts: %w", err)
	}
	for _, vc := range vendorContacts {
		store.VendorContactIDs = append(store.VendorContactIDs, vc.ContactId)
	}
	fmt.Printf(" %d created\n", len(vendorContacts))

	// Generate Customers
	fmt.Printf("  Creating Customers...")
	customers := generateCustomers(store)
	if err := client.post("/erp/40/Customer", &fin.CustomerList{List: customers}); err != nil {
		return fmt.Errorf("customers: %w", err)
	}
	for _, c := range customers {
		store.CustomerIDs = append(store.CustomerIDs, c.CustomerId)
	}
	fmt.Printf(" %d created\n", len(customers))

	// Generate Customer Contacts
	fmt.Printf("  Creating Customer Contacts...")
	customerContacts := generateCustomerContacts(store)
	if err := client.post("/erp/40/CustCont", &fin.CustomerContactList{List: customerContacts}); err != nil {
		return fmt.Errorf("customer contacts: %w", err)
	}
	for _, cc := range customerContacts {
		store.CustomerContactIDs = append(store.CustomerContactIDs, cc.ContactId)
	}
	fmt.Printf(" %d created\n", len(customerContacts))

	// Generate Bank Accounts
	fmt.Printf("  Creating Bank Accounts...")
	bankAccounts := generateBankAccounts(store)
	if err := client.post("/erp/40/BankAcct", &fin.BankAccountList{List: bankAccounts}); err != nil {
		return fmt.Errorf("bank accounts: %w", err)
	}
	for _, ba := range bankAccounts {
		store.BankAccountIDs = append(store.BankAccountIDs, ba.BankAccountId)
	}
	fmt.Printf(" %d created\n", len(bankAccounts))

	// Generate Exchange Rates
	fmt.Printf("  Creating Exchange Rates...")
	exchangeRates := generateExchangeRates(store)
	if err := client.post("/erp/40/XchgRate", &fin.ExchangeRateList{List: exchangeRates}); err != nil {
		return fmt.Errorf("exchange rates: %w", err)
	}
	for _, er := range exchangeRates {
		store.ExchangeRateIDs = append(store.ExchangeRateIDs, er.ExchangeRateId)
	}
	fmt.Printf(" %d created\n", len(exchangeRates))

	return nil
}

// FIN Phase 4: Configuration
func generateFinPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Tax Rules
	fmt.Printf("  Creating Tax Rules...")
	taxRules := generateTaxRules(store)
	if err := client.post("/erp/40/TaxRule", &fin.TaxRuleList{List: taxRules}); err != nil {
		return fmt.Errorf("tax rules: %w", err)
	}
	for _, tr := range taxRules {
		store.TaxRuleIDs = append(store.TaxRuleIDs, tr.RuleId)
	}
	fmt.Printf(" %d created\n", len(taxRules))

	// Generate Tax Exemptions
	fmt.Printf("  Creating Tax Exemptions...")
	taxExemptions := generateTaxExemptions(store)
	if err := client.post("/erp/40/TaxExmpt", &fin.TaxExemptionList{List: taxExemptions}); err != nil {
		return fmt.Errorf("tax exemptions: %w", err)
	}
	for _, te := range taxExemptions {
		store.TaxExemptionIDs = append(store.TaxExemptionIDs, te.ExemptionId)
	}
	fmt.Printf(" %d created\n", len(taxExemptions))

	// Generate Withholding Tax Configs
	fmt.Printf("  Creating Withholding Tax Configs...")
	whTaxConfigs := generateWithholdingTaxConfigs(store)
	if err := client.post("/erp/40/WhtTxCfg", &fin.WithholdingTaxConfigList{List: whTaxConfigs}); err != nil {
		return fmt.Errorf("withholding tax configs: %w", err)
	}
	for _, wc := range whTaxConfigs {
		store.WHTaxConfigIDs = append(store.WHTaxConfigIDs, wc.ConfigId)
	}
	fmt.Printf(" %d created\n", len(whTaxConfigs))

	// Generate Budgets
	fmt.Printf("  Creating Budgets...")
	budgets := generateBudgets(store)
	if err := client.post("/erp/40/Budget", &fin.BudgetList{List: budgets}); err != nil {
		return fmt.Errorf("budgets: %w", err)
	}
	for _, b := range budgets {
		store.BudgetIDs = append(store.BudgetIDs, b.BudgetId)
	}
	fmt.Printf(" %d created\n", len(budgets))

	// Generate Budget Lines
	fmt.Printf("  Creating Budget Lines...")
	budgetLines := generateBudgetLines(store)
	if err := client.post("/erp/40/BdgtLine", &fin.BudgetLineList{List: budgetLines}); err != nil {
		return fmt.Errorf("budget lines: %w", err)
	}
	for _, bl := range budgetLines {
		store.BudgetLineIDs = append(store.BudgetLineIDs, bl.LineId)
	}
	fmt.Printf(" %d created\n", len(budgetLines))

	// Generate Budget Transfers
	fmt.Printf("  Creating Budget Transfers...")
	budgetTransfers := generateBudgetTransfers(store)
	if err := client.post("/erp/40/BdgtXfer", &fin.BudgetTransferList{List: budgetTransfers}); err != nil {
		return fmt.Errorf("budget transfers: %w", err)
	}
	for _, bt := range budgetTransfers {
		store.BudgetTransferIDs = append(store.BudgetTransferIDs, bt.TransferId)
	}
	fmt.Printf(" %d created\n", len(budgetTransfers))

	// Generate Budget Scenarios
	fmt.Printf("  Creating Budget Scenarios...")
	budgetScenarios := generateBudgetScenarios(store)
	if err := client.post("/erp/40/BdgtScen", &fin.BudgetScenarioList{List: budgetScenarios}); err != nil {
		return fmt.Errorf("budget scenarios: %w", err)
	}
	for _, bs := range budgetScenarios {
		store.BudgetScenarioIDs = append(store.BudgetScenarioIDs, bs.ScenarioId)
	}
	fmt.Printf(" %d created\n", len(budgetScenarios))

	// Generate Capital Expenditures
	fmt.Printf("  Creating Capital Expenditures...")
	capExpenditures := generateCapitalExpenditures(store)
	if err := client.post("/erp/40/CapEx", &fin.CapitalExpenditureList{List: capExpenditures}); err != nil {
		return fmt.Errorf("capital expenditures: %w", err)
	}
	for _, ce := range capExpenditures {
		store.CapExIDs = append(store.CapExIDs, ce.CapexId)
	}
	fmt.Printf(" %d created\n", len(capExpenditures))

	// Generate Forecasts
	fmt.Printf("  Creating Forecasts...")
	forecasts := generateForecasts(store)
	if err := client.post("/erp/40/Forecast", &fin.ForecastList{List: forecasts}); err != nil {
		return fmt.Errorf("forecasts: %w", err)
	}
	for _, f := range forecasts {
		store.ForecastIDs = append(store.ForecastIDs, f.ForecastId)
	}
	fmt.Printf(" %d created\n", len(forecasts))

	return nil
}

// FIN Phase 5: AP Transactions
func generateFinPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Purchase Invoices
	fmt.Printf("  Creating Purchase Invoices...")
	purchaseInvoices := generatePurchaseInvoices(store)
	if err := client.post("/erp/40/PurchInv", &fin.PurchaseInvoiceList{List: purchaseInvoices}); err != nil {
		return fmt.Errorf("purchase invoices: %w", err)
	}
	for _, pi := range purchaseInvoices {
		store.PurchaseInvoiceIDs = append(store.PurchaseInvoiceIDs, pi.InvoiceId)
	}
	fmt.Printf(" %d created\n", len(purchaseInvoices))

	// Generate Purchase Invoice Lines
	fmt.Printf("  Creating Purchase Invoice Lines...")
	purchaseInvoiceLines := generatePurchaseInvoiceLines(store)
	if err := client.post("/erp/40/PurchLine", &fin.PurchaseInvoiceLineList{List: purchaseInvoiceLines}); err != nil {
		return fmt.Errorf("purchase invoice lines: %w", err)
	}
	for _, pl := range purchaseInvoiceLines {
		store.PurchaseInvoiceLineIDs = append(store.PurchaseInvoiceLineIDs, pl.LineId)
	}
	fmt.Printf(" %d created\n", len(purchaseInvoiceLines))

	// Generate Payment Schedules
	fmt.Printf("  Creating Payment Schedules...")
	paymentSchedules := generatePaymentSchedules(store)
	if err := client.post("/erp/40/PmtSched", &fin.PaymentScheduleList{List: paymentSchedules}); err != nil {
		return fmt.Errorf("payment schedules: %w", err)
	}
	for _, ps := range paymentSchedules {
		store.PaymentScheduleIDs = append(store.PaymentScheduleIDs, ps.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(paymentSchedules))

	// Generate Vendor Payments
	fmt.Printf("  Creating Vendor Payments...")
	vendorPayments := generateVendorPayments(store)
	if err := client.post("/erp/40/VndrPmt", &fin.VendorPaymentList{List: vendorPayments}); err != nil {
		return fmt.Errorf("vendor payments: %w", err)
	}
	for _, vp := range vendorPayments {
		store.VendorPaymentIDs = append(store.VendorPaymentIDs, vp.PaymentId)
	}
	fmt.Printf(" %d created\n", len(vendorPayments))

	// Generate Payment Allocations
	fmt.Printf("  Creating Payment Allocations...")
	paymentAllocations := generatePaymentAllocations(store)
	if err := client.post("/erp/40/PmtAlloc", &fin.PaymentAllocationList{List: paymentAllocations}); err != nil {
		return fmt.Errorf("payment allocations: %w", err)
	}
	for _, pa := range paymentAllocations {
		store.PaymentAllocationIDs = append(store.PaymentAllocationIDs, pa.AllocationId)
	}
	fmt.Printf(" %d created\n", len(paymentAllocations))

	// Generate Vendor Statements
	fmt.Printf("  Creating Vendor Statements...")
	vendorStatements := generateVendorStatements(store)
	if err := client.post("/erp/40/VndrStmt", &fin.VendorStatementList{List: vendorStatements}); err != nil {
		return fmt.Errorf("vendor statements: %w", err)
	}
	for _, vs := range vendorStatements {
		store.VendorStatementIDs = append(store.VendorStatementIDs, vs.StatementId)
	}
	fmt.Printf(" %d created\n", len(vendorStatements))

	return nil
}
