/*
 * FIN (Financial) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
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
	"github.com/saichler/l8erp/go/erp/fin/vendors"
	"github.com/saichler/l8erp/go/erp/fin/vendorstatements"
	"github.com/saichler/l8erp/go/erp/fin/withholdingtaxconfigs"
	"github.com/saichler/l8types/go/ifs"
)

func activateFinServices(nic ifs.IVNic) {
	// General Ledger
	accounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	journalentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	journalentrylines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	fiscalyears.Activate(common.DB_CREDS, common.DB_NAME, nic)
	fiscalperiods.Activate(common.DB_CREDS, common.DB_NAME, nic)
	currencies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	exchangerates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	accountbalances.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Accounts Payable
	vendors.Activate(common.DB_CREDS, common.DB_NAME, nic)
	vendorcontacts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	purchaseinvoices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	purchaseinvoicelines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	paymentschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	vendorpayments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	paymentallocations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	vendorstatements.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Accounts Receivable
	customers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customercontacts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesinvoices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesinvoicelines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customerpayments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	paymentapplications.Activate(common.DB_CREDS, common.DB_NAME, nic)
	creditmemos.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dunningletters.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Cash Management
	bankaccounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	banktransactions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bankreconciliations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	cashforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	fundtransfers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	pettycash.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Fixed Assets
	assets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assetcategories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	depreciationschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assetdisposals.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assettransfers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assetmaintenance.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assetrevaluations.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Budgeting and Planning
	budgets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	budgetlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	budgettransfers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	budgetscenarios.Activate(common.DB_CREDS, common.DB_NAME, nic)
	capitalexpenditures.Activate(common.DB_CREDS, common.DB_NAME, nic)
	forecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Tax Management
	taxcodes.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxjurisdictions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxreturns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxexemptions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	withholdingtaxconfigs.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
