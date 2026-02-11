package ui

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func registerFinTypes(resources ifs.IResources) {
	// General Ledger
	common.RegisterType[fin.Account, fin.AccountList](resources, "AccountId")
	common.RegisterType[fin.JournalEntry, fin.JournalEntryList](resources, "JournalEntryId")
	common.RegisterType[fin.FiscalYear, fin.FiscalYearList](resources, "FiscalYearId")
	common.RegisterType[fin.Currency, fin.CurrencyList](resources, "CurrencyId")
	common.RegisterType[fin.ExchangeRate, fin.ExchangeRateList](resources, "ExchangeRateId")

	// Accounts Payable
	common.RegisterType[fin.Vendor, fin.VendorList](resources, "VendorId")
	common.RegisterType[fin.PurchaseInvoice, fin.PurchaseInvoiceList](resources, "InvoiceId")
	common.RegisterType[fin.PaymentSchedule, fin.PaymentScheduleList](resources, "ScheduleId")
	common.RegisterType[fin.VendorPayment, fin.VendorPaymentList](resources, "PaymentId")
	common.RegisterType[fin.VendorStatement, fin.VendorStatementList](resources, "StatementId")

	// Accounts Receivable
	common.RegisterType[fin.Customer, fin.CustomerList](resources, "CustomerId")
	common.RegisterType[fin.SalesInvoice, fin.SalesInvoiceList](resources, "InvoiceId")
	common.RegisterType[fin.CustomerPayment, fin.CustomerPaymentList](resources, "PaymentId")
	common.RegisterType[fin.CreditMemo, fin.CreditMemoList](resources, "CreditMemoId")
	common.RegisterType[fin.DunningLetter, fin.DunningLetterList](resources, "LetterId")

	// Cash Management
	common.RegisterType[fin.BankAccount, fin.BankAccountList](resources, "BankAccountId")
	common.RegisterType[fin.CashForecast, fin.CashForecastList](resources, "ForecastId")
	common.RegisterType[fin.FundTransfer, fin.FundTransferList](resources, "TransferId")
	common.RegisterType[fin.PettyCash, fin.PettyCashList](resources, "PettyCashId")

	// Fixed Assets
	common.RegisterType[fin.Asset, fin.AssetList](resources, "AssetId")
	common.RegisterType[fin.AssetCategory, fin.AssetCategoryList](resources, "CategoryId")

	// Budgeting
	common.RegisterType[fin.Budget, fin.BudgetList](resources, "BudgetId")
	common.RegisterType[fin.CapitalExpenditure, fin.CapitalExpenditureList](resources, "CapexId")
	common.RegisterType[fin.Forecast, fin.ForecastList](resources, "ForecastId")

	// Tax
	common.RegisterType[fin.TaxCode, fin.TaxCodeList](resources, "TaxCodeId")
	common.RegisterType[fin.TaxJurisdiction, fin.TaxJurisdictionList](resources, "JurisdictionId")
	common.RegisterType[fin.TaxRule, fin.TaxRuleList](resources, "RuleId")
	common.RegisterType[fin.TaxExemption, fin.TaxExemptionList](resources, "ExemptionId")
}
