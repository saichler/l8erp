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

func testServiceGettersFIN(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := accountbalances.AccountBalance("test-id", vnic); err != nil {
		log.Fail(t, "AccountBalance getter failed: ", err.Error())
	}
	if _, err := accounts.Account("test-id", vnic); err != nil {
		log.Fail(t, "Account getter failed: ", err.Error())
	}
	if _, err := assetcategories.AssetCategory("test-id", vnic); err != nil {
		log.Fail(t, "AssetCategory getter failed: ", err.Error())
	}
	if _, err := assetdisposals.AssetDisposal("test-id", vnic); err != nil {
		log.Fail(t, "AssetDisposal getter failed: ", err.Error())
	}
	if _, err := assetmaintenance.AssetMaintenance("test-id", vnic); err != nil {
		log.Fail(t, "AssetMaintenance getter failed: ", err.Error())
	}
	if _, err := assetrevaluations.AssetRevaluation("test-id", vnic); err != nil {
		log.Fail(t, "AssetRevaluation getter failed: ", err.Error())
	}
	if _, err := assets.Asset("test-id", vnic); err != nil {
		log.Fail(t, "Asset getter failed: ", err.Error())
	}
	if _, err := assettransfers.AssetTransfer("test-id", vnic); err != nil {
		log.Fail(t, "AssetTransfer getter failed: ", err.Error())
	}
	if _, err := bankaccounts.BankAccount("test-id", vnic); err != nil {
		log.Fail(t, "BankAccount getter failed: ", err.Error())
	}
	if _, err := bankreconciliations.BankReconciliation("test-id", vnic); err != nil {
		log.Fail(t, "BankReconciliation getter failed: ", err.Error())
	}
	if _, err := banktransactions.BankTransaction("test-id", vnic); err != nil {
		log.Fail(t, "BankTransaction getter failed: ", err.Error())
	}
	if _, err := budgetlines.BudgetLine("test-id", vnic); err != nil {
		log.Fail(t, "BudgetLine getter failed: ", err.Error())
	}
	if _, err := budgets.Budget("test-id", vnic); err != nil {
		log.Fail(t, "Budget getter failed: ", err.Error())
	}
	if _, err := budgetscenarios.BudgetScenario("test-id", vnic); err != nil {
		log.Fail(t, "BudgetScenario getter failed: ", err.Error())
	}
	if _, err := budgettransfers.BudgetTransfer("test-id", vnic); err != nil {
		log.Fail(t, "BudgetTransfer getter failed: ", err.Error())
	}
	if _, err := capitalexpenditures.CapitalExpenditure("test-id", vnic); err != nil {
		log.Fail(t, "CapitalExpenditure getter failed: ", err.Error())
	}
	if _, err := cashforecasts.CashForecast("test-id", vnic); err != nil {
		log.Fail(t, "CashForecast getter failed: ", err.Error())
	}
	if _, err := creditmemos.CreditMemo("test-id", vnic); err != nil {
		log.Fail(t, "CreditMemo getter failed: ", err.Error())
	}
	if _, err := currencies.Currency("test-id", vnic); err != nil {
		log.Fail(t, "Currency getter failed: ", err.Error())
	}
	if _, err := customercontacts.CustomerContact("test-id", vnic); err != nil {
		log.Fail(t, "CustomerContact getter failed: ", err.Error())
	}
	if _, err := customerpayments.CustomerPayment("test-id", vnic); err != nil {
		log.Fail(t, "CustomerPayment getter failed: ", err.Error())
	}
	if _, err := customers.Customer("test-id", vnic); err != nil {
		log.Fail(t, "Customer getter failed: ", err.Error())
	}
	if _, err := depreciationschedules.DepreciationSchedule("test-id", vnic); err != nil {
		log.Fail(t, "DepreciationSchedule getter failed: ", err.Error())
	}
	if _, err := dunningletters.DunningLetter("test-id", vnic); err != nil {
		log.Fail(t, "DunningLetter getter failed: ", err.Error())
	}
	if _, err := exchangerates.ExchangeRate("test-id", vnic); err != nil {
		log.Fail(t, "ExchangeRate getter failed: ", err.Error())
	}
	if _, err := fiscalperiods.FiscalPeriod("test-id", vnic); err != nil {
		log.Fail(t, "FiscalPeriod getter failed: ", err.Error())
	}
	if _, err := fiscalyears.FiscalYear("test-id", vnic); err != nil {
		log.Fail(t, "FiscalYear getter failed: ", err.Error())
	}
	if _, err := forecasts.Forecast("test-id", vnic); err != nil {
		log.Fail(t, "Forecast getter failed: ", err.Error())
	}
	if _, err := fundtransfers.FundTransfer("test-id", vnic); err != nil {
		log.Fail(t, "FundTransfer getter failed: ", err.Error())
	}
	if _, err := journalentries.JournalEntry("test-id", vnic); err != nil {
		log.Fail(t, "JournalEntry getter failed: ", err.Error())
	}
	if _, err := journalentrylines.JournalEntryLine("test-id", vnic); err != nil {
		log.Fail(t, "JournalEntryLine getter failed: ", err.Error())
	}
	if _, err := paymentallocations.PaymentAllocation("test-id", vnic); err != nil {
		log.Fail(t, "PaymentAllocation getter failed: ", err.Error())
	}
	if _, err := paymentapplications.PaymentApplication("test-id", vnic); err != nil {
		log.Fail(t, "PaymentApplication getter failed: ", err.Error())
	}
	if _, err := paymentschedules.PaymentSchedule("test-id", vnic); err != nil {
		log.Fail(t, "PaymentSchedule getter failed: ", err.Error())
	}
	if _, err := pettycash.PettyCash("test-id", vnic); err != nil {
		log.Fail(t, "PettyCash getter failed: ", err.Error())
	}
	if _, err := purchaseinvoicelines.PurchaseInvoiceLine("test-id", vnic); err != nil {
		log.Fail(t, "PurchaseInvoiceLine getter failed: ", err.Error())
	}
	if _, err := purchaseinvoices.PurchaseInvoice("test-id", vnic); err != nil {
		log.Fail(t, "PurchaseInvoice getter failed: ", err.Error())
	}
	if _, err := salesinvoicelines.SalesInvoiceLine("test-id", vnic); err != nil {
		log.Fail(t, "SalesInvoiceLine getter failed: ", err.Error())
	}
	if _, err := salesinvoices.SalesInvoice("test-id", vnic); err != nil {
		log.Fail(t, "SalesInvoice getter failed: ", err.Error())
	}
	if _, err := taxcodes.TaxCode("test-id", vnic); err != nil {
		log.Fail(t, "TaxCode getter failed: ", err.Error())
	}
	if _, err := taxexemptions.TaxExemption("test-id", vnic); err != nil {
		log.Fail(t, "TaxExemption getter failed: ", err.Error())
	}
	if _, err := taxjurisdictions.TaxJurisdiction("test-id", vnic); err != nil {
		log.Fail(t, "TaxJurisdiction getter failed: ", err.Error())
	}
	if _, err := taxreturns.TaxReturn("test-id", vnic); err != nil {
		log.Fail(t, "TaxReturn getter failed: ", err.Error())
	}
	if _, err := taxrules.TaxRule("test-id", vnic); err != nil {
		log.Fail(t, "TaxRule getter failed: ", err.Error())
	}
	if _, err := vendorcontacts.VendorContact("test-id", vnic); err != nil {
		log.Fail(t, "VendorContact getter failed: ", err.Error())
	}
	if _, err := vendorpayments.VendorPayment("test-id", vnic); err != nil {
		log.Fail(t, "VendorPayment getter failed: ", err.Error())
	}
	if _, err := vendorstatements.VendorStatement("test-id", vnic); err != nil {
		log.Fail(t, "VendorStatement getter failed: ", err.Error())
	}
	if _, err := vendors.Vendor("test-id", vnic); err != nil {
		log.Fail(t, "Vendor getter failed: ", err.Error())
	}
	if _, err := withholdingtaxconfigs.WithholdingTaxConfig("test-id", vnic); err != nil {
		log.Fail(t, "WithholdingTaxConfig getter failed: ", err.Error())
	}
}
