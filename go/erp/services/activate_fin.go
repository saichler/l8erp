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

func collectFinActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// General Ledger
		func() { accounts.Activate(creds, dbname, nic) },
		func() { journalentries.Activate(creds, dbname, nic) },
		func() { fiscalyears.Activate(creds, dbname, nic) },
		func() { currencies.Activate(creds, dbname, nic) },
		func() { exchangerates.Activate(creds, dbname, nic) },
		// Accounts Payable
		func() { vendors.Activate(creds, dbname, nic) },
		func() { purchaseinvoices.Activate(creds, dbname, nic) },
		func() { paymentschedules.Activate(creds, dbname, nic) },
		func() { vendorpayments.Activate(creds, dbname, nic) },
		func() { vendorstatements.Activate(creds, dbname, nic) },
		// Accounts Receivable
		func() { customers.Activate(creds, dbname, nic) },
		func() { salesinvoices.Activate(creds, dbname, nic) },
		func() { customerpayments.Activate(creds, dbname, nic) },
		func() { creditmemos.Activate(creds, dbname, nic) },
		func() { dunningletters.Activate(creds, dbname, nic) },
		// Cash Management
		func() { bankaccounts.Activate(creds, dbname, nic) },
		func() { cashforecasts.Activate(creds, dbname, nic) },
		func() { fundtransfers.Activate(creds, dbname, nic) },
		func() { pettycash.Activate(creds, dbname, nic) },
		// Fixed Assets
		func() { assets.Activate(creds, dbname, nic) },
		func() { assetcategories.Activate(creds, dbname, nic) },
		// Budgeting and Planning
		func() { budgets.Activate(creds, dbname, nic) },
		func() { capitalexpenditures.Activate(creds, dbname, nic) },
		func() { forecasts.Activate(creds, dbname, nic) },
		// Tax Management
		func() { taxcodes.Activate(creds, dbname, nic) },
		func() { taxjurisdictions.Activate(creds, dbname, nic) },
		func() { taxrules.Activate(creds, dbname, nic) },
		func() { taxexemptions.Activate(creds, dbname, nic) },
	}
}
