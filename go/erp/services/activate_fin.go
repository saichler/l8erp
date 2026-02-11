/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/fin/accounts"
	"github.com/saichler/l8erp/go/erp/fin/assetcategories"
	"github.com/saichler/l8erp/go/erp/fin/assets"
	"github.com/saichler/l8erp/go/erp/fin/bankaccounts"
	"github.com/saichler/l8erp/go/erp/fin/budgets"
	"github.com/saichler/l8erp/go/erp/fin/capitalexpenditures"
	"github.com/saichler/l8erp/go/erp/fin/cashforecasts"
	"github.com/saichler/l8erp/go/erp/fin/creditmemos"
	"github.com/saichler/l8erp/go/erp/fin/currencies"
	"github.com/saichler/l8erp/go/erp/fin/customerpayments"
	"github.com/saichler/l8erp/go/erp/fin/customers"
	"github.com/saichler/l8erp/go/erp/fin/dunningletters"
	"github.com/saichler/l8erp/go/erp/fin/exchangerates"
	"github.com/saichler/l8erp/go/erp/fin/fiscalyears"
	"github.com/saichler/l8erp/go/erp/fin/forecasts"
	"github.com/saichler/l8erp/go/erp/fin/fundtransfers"
	"github.com/saichler/l8erp/go/erp/fin/journalentries"
	"github.com/saichler/l8erp/go/erp/fin/paymentschedules"
	"github.com/saichler/l8erp/go/erp/fin/pettycash"
	"github.com/saichler/l8erp/go/erp/fin/purchaseinvoices"
	"github.com/saichler/l8erp/go/erp/fin/salesinvoices"
	"github.com/saichler/l8erp/go/erp/fin/taxcodes"
	"github.com/saichler/l8erp/go/erp/fin/taxexemptions"
	"github.com/saichler/l8erp/go/erp/fin/taxjurisdictions"
	"github.com/saichler/l8erp/go/erp/fin/taxrules"
	"github.com/saichler/l8erp/go/erp/fin/vendorpayments"
	"github.com/saichler/l8erp/go/erp/fin/vendors"
	"github.com/saichler/l8erp/go/erp/fin/vendorstatements"
)

func ActivateFinServices(creds, dbname string, nic ifs.IVNic) {
	// General Ledger
	accounts.Activate(creds, dbname, nic)
	journalentries.Activate(creds, dbname, nic)
	fiscalyears.Activate(creds, dbname, nic)
	currencies.Activate(creds, dbname, nic)
	exchangerates.Activate(creds, dbname, nic)
	// Accounts Payable
	vendors.Activate(creds, dbname, nic)
	purchaseinvoices.Activate(creds, dbname, nic)
	paymentschedules.Activate(creds, dbname, nic)
	vendorpayments.Activate(creds, dbname, nic)
	vendorstatements.Activate(creds, dbname, nic)
	// Accounts Receivable
	customers.Activate(creds, dbname, nic)
	salesinvoices.Activate(creds, dbname, nic)
	customerpayments.Activate(creds, dbname, nic)
	creditmemos.Activate(creds, dbname, nic)
	dunningletters.Activate(creds, dbname, nic)
	// Cash Management
	bankaccounts.Activate(creds, dbname, nic)
	cashforecasts.Activate(creds, dbname, nic)
	fundtransfers.Activate(creds, dbname, nic)
	pettycash.Activate(creds, dbname, nic)
	// Fixed Assets
	assets.Activate(creds, dbname, nic)
	assetcategories.Activate(creds, dbname, nic)
	// Budgeting and Planning
	budgets.Activate(creds, dbname, nic)
	capitalexpenditures.Activate(creds, dbname, nic)
	forecasts.Activate(creds, dbname, nic)
	// Tax Management
	taxcodes.Activate(creds, dbname, nic)
	taxjurisdictions.Activate(creds, dbname, nic)
	taxrules.Activate(creds, dbname, nic)
	taxexemptions.Activate(creds, dbname, nic)
}
