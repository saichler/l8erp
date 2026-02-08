package tests

import (
	"github.com/saichler/l8erp/go/erp/fin/accountbalances"
	"github.com/saichler/l8erp/go/erp/fin/accounts"
	"github.com/saichler/l8erp/go/erp/fin/assetcategories"
	"github.com/saichler/l8erp/go/erp/fin/assetdisposals"
	"github.com/saichler/l8erp/go/erp/fin/assetmaintenance"
	"github.com/saichler/l8erp/go/erp/fin/assetrevaluations"
	"github.com/saichler/l8erp/go/erp/fin/assets"
	"github.com/saichler/l8erp/go/erp/fin/assettransfers"
	"github.com/saichler/l8erp/go/erp/fin/bankaccounts"
	"github.com/saichler/l8erp/go/erp/fin/bankreconciliations"
	"github.com/saichler/l8erp/go/erp/fin/banktransactions"
	"github.com/saichler/l8erp/go/erp/fin/budgetlines"
	"github.com/saichler/l8erp/go/erp/fin/budgets"
	"github.com/saichler/l8erp/go/erp/fin/budgetscenarios"
	"github.com/saichler/l8erp/go/erp/fin/budgettransfers"
	"github.com/saichler/l8erp/go/erp/fin/capitalexpenditures"
	"github.com/saichler/l8erp/go/erp/fin/cashforecasts"
	"github.com/saichler/l8erp/go/erp/fin/creditmemos"
	"github.com/saichler/l8erp/go/erp/fin/currencies"
	"github.com/saichler/l8erp/go/erp/fin/customercontacts"
	"github.com/saichler/l8erp/go/erp/fin/customerpayments"
	"github.com/saichler/l8erp/go/erp/fin/customers"
	"github.com/saichler/l8erp/go/erp/fin/depreciationschedules"
	"github.com/saichler/l8erp/go/erp/fin/dunningletters"
	"github.com/saichler/l8erp/go/erp/fin/exchangerates"
	"github.com/saichler/l8erp/go/erp/fin/fiscalperiods"
	"github.com/saichler/l8erp/go/erp/fin/fiscalyears"
	"github.com/saichler/l8erp/go/erp/fin/forecasts"
	"github.com/saichler/l8erp/go/erp/fin/fundtransfers"
	"github.com/saichler/l8erp/go/erp/fin/journalentries"
	"github.com/saichler/l8erp/go/erp/fin/journalentrylines"
	"github.com/saichler/l8erp/go/erp/fin/paymentallocations"
	"github.com/saichler/l8erp/go/erp/fin/paymentapplications"
	"github.com/saichler/l8erp/go/erp/fin/paymentschedules"
	"github.com/saichler/l8erp/go/erp/fin/pettycash"
	"github.com/saichler/l8erp/go/erp/fin/purchaseinvoicelines"
	"github.com/saichler/l8erp/go/erp/fin/purchaseinvoices"
	"github.com/saichler/l8erp/go/erp/fin/salesinvoicelines"
	"github.com/saichler/l8erp/go/erp/fin/salesinvoices"
	"github.com/saichler/l8erp/go/erp/fin/taxcodes"
	"github.com/saichler/l8erp/go/erp/fin/taxexemptions"
	"github.com/saichler/l8erp/go/erp/fin/taxjurisdictions"
	"github.com/saichler/l8erp/go/erp/fin/taxreturns"
	"github.com/saichler/l8erp/go/erp/fin/taxrules"
	"github.com/saichler/l8erp/go/erp/fin/vendorcontacts"
	"github.com/saichler/l8erp/go/erp/fin/vendorpayments"
	"github.com/saichler/l8erp/go/erp/fin/vendorstatements"
	"github.com/saichler/l8erp/go/erp/fin/vendors"
	"github.com/saichler/l8erp/go/erp/fin/withholdingtaxconfigs"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersFIN(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := accountbalances.AccountBalances(vnic); !ok || h == nil {
		log.Fail(t, "AccountBalance service handler not found")
	}
	if h, ok := accounts.Accounts(vnic); !ok || h == nil {
		log.Fail(t, "Account service handler not found")
	}
	if h, ok := assetcategories.AssetCategories(vnic); !ok || h == nil {
		log.Fail(t, "AssetCategory service handler not found")
	}
	if h, ok := assetdisposals.AssetDisposals(vnic); !ok || h == nil {
		log.Fail(t, "AssetDisposal service handler not found")
	}
	if h, ok := assetmaintenance.AssetMaintenances(vnic); !ok || h == nil {
		log.Fail(t, "AssetMaintenance service handler not found")
	}
	if h, ok := assetrevaluations.AssetRevaluations(vnic); !ok || h == nil {
		log.Fail(t, "AssetRevaluation service handler not found")
	}
	if h, ok := assets.Assets(vnic); !ok || h == nil {
		log.Fail(t, "Asset service handler not found")
	}
	if h, ok := assettransfers.AssetTransfers(vnic); !ok || h == nil {
		log.Fail(t, "AssetTransfer service handler not found")
	}
	if h, ok := bankaccounts.BankAccounts(vnic); !ok || h == nil {
		log.Fail(t, "BankAccount service handler not found")
	}
	if h, ok := bankreconciliations.BankReconciliations(vnic); !ok || h == nil {
		log.Fail(t, "BankReconciliation service handler not found")
	}
	if h, ok := banktransactions.BankTransactions(vnic); !ok || h == nil {
		log.Fail(t, "BankTransaction service handler not found")
	}
	if h, ok := budgetlines.BudgetLines(vnic); !ok || h == nil {
		log.Fail(t, "BudgetLine service handler not found")
	}
	if h, ok := budgets.Budgets(vnic); !ok || h == nil {
		log.Fail(t, "Budget service handler not found")
	}
	if h, ok := budgetscenarios.BudgetScenarios(vnic); !ok || h == nil {
		log.Fail(t, "BudgetScenario service handler not found")
	}
	if h, ok := budgettransfers.BudgetTransfers(vnic); !ok || h == nil {
		log.Fail(t, "BudgetTransfer service handler not found")
	}
	if h, ok := capitalexpenditures.CapitalExpenditures(vnic); !ok || h == nil {
		log.Fail(t, "CapitalExpenditure service handler not found")
	}
	if h, ok := cashforecasts.CashForecasts(vnic); !ok || h == nil {
		log.Fail(t, "CashForecast service handler not found")
	}
	if h, ok := creditmemos.CreditMemos(vnic); !ok || h == nil {
		log.Fail(t, "CreditMemo service handler not found")
	}
	if h, ok := currencies.Currencies(vnic); !ok || h == nil {
		log.Fail(t, "Currency service handler not found")
	}
	if h, ok := customercontacts.CustomerContacts(vnic); !ok || h == nil {
		log.Fail(t, "CustomerContact service handler not found")
	}
	if h, ok := customerpayments.CustomerPayments(vnic); !ok || h == nil {
		log.Fail(t, "CustomerPayment service handler not found")
	}
	if h, ok := customers.Customers(vnic); !ok || h == nil {
		log.Fail(t, "Customer service handler not found")
	}
	if h, ok := depreciationschedules.DepreciationSchedules(vnic); !ok || h == nil {
		log.Fail(t, "DepreciationSchedule service handler not found")
	}
	if h, ok := dunningletters.DunningLetters(vnic); !ok || h == nil {
		log.Fail(t, "DunningLetter service handler not found")
	}
	if h, ok := exchangerates.ExchangeRates(vnic); !ok || h == nil {
		log.Fail(t, "ExchangeRate service handler not found")
	}
	if h, ok := fiscalperiods.FiscalPeriods(vnic); !ok || h == nil {
		log.Fail(t, "FiscalPeriod service handler not found")
	}
	if h, ok := fiscalyears.FiscalYears(vnic); !ok || h == nil {
		log.Fail(t, "FiscalYear service handler not found")
	}
	if h, ok := forecasts.Forecasts(vnic); !ok || h == nil {
		log.Fail(t, "Forecast service handler not found")
	}
	if h, ok := fundtransfers.FundTransfers(vnic); !ok || h == nil {
		log.Fail(t, "FundTransfer service handler not found")
	}
	if h, ok := journalentries.JournalEntries(vnic); !ok || h == nil {
		log.Fail(t, "JournalEntry service handler not found")
	}
	if h, ok := journalentrylines.JournalEntryLines(vnic); !ok || h == nil {
		log.Fail(t, "JournalEntryLine service handler not found")
	}
	if h, ok := paymentallocations.PaymentAllocations(vnic); !ok || h == nil {
		log.Fail(t, "PaymentAllocation service handler not found")
	}
	if h, ok := paymentapplications.PaymentApplications(vnic); !ok || h == nil {
		log.Fail(t, "PaymentApplication service handler not found")
	}
	if h, ok := paymentschedules.PaymentSchedules(vnic); !ok || h == nil {
		log.Fail(t, "PaymentSchedule service handler not found")
	}
	if h, ok := pettycash.PettyCashes(vnic); !ok || h == nil {
		log.Fail(t, "PettyCash service handler not found")
	}
	if h, ok := purchaseinvoicelines.PurchaseInvoiceLines(vnic); !ok || h == nil {
		log.Fail(t, "PurchaseInvoiceLine service handler not found")
	}
	if h, ok := purchaseinvoices.PurchaseInvoices(vnic); !ok || h == nil {
		log.Fail(t, "PurchaseInvoice service handler not found")
	}
	if h, ok := salesinvoicelines.SalesInvoiceLines(vnic); !ok || h == nil {
		log.Fail(t, "SalesInvoiceLine service handler not found")
	}
	if h, ok := salesinvoices.SalesInvoices(vnic); !ok || h == nil {
		log.Fail(t, "SalesInvoice service handler not found")
	}
	if h, ok := taxcodes.TaxCodes(vnic); !ok || h == nil {
		log.Fail(t, "TaxCode service handler not found")
	}
	if h, ok := taxexemptions.TaxExemptions(vnic); !ok || h == nil {
		log.Fail(t, "TaxExemption service handler not found")
	}
	if h, ok := taxjurisdictions.TaxJurisdictions(vnic); !ok || h == nil {
		log.Fail(t, "TaxJurisdiction service handler not found")
	}
	if h, ok := taxreturns.TaxReturns(vnic); !ok || h == nil {
		log.Fail(t, "TaxReturn service handler not found")
	}
	if h, ok := taxrules.TaxRules(vnic); !ok || h == nil {
		log.Fail(t, "TaxRule service handler not found")
	}
	if h, ok := vendorcontacts.VendorContacts(vnic); !ok || h == nil {
		log.Fail(t, "VendorContact service handler not found")
	}
	if h, ok := vendorpayments.VendorPayments(vnic); !ok || h == nil {
		log.Fail(t, "VendorPayment service handler not found")
	}
	if h, ok := vendorstatements.VendorStatements(vnic); !ok || h == nil {
		log.Fail(t, "VendorStatement service handler not found")
	}
	if h, ok := vendors.Vendors(vnic); !ok || h == nil {
		log.Fail(t, "Vendor service handler not found")
	}
	if h, ok := withholdingtaxconfigs.WithholdingTaxConfigs(vnic); !ok || h == nil {
		log.Fail(t, "WithholdingTaxConfig service handler not found")
	}
}
