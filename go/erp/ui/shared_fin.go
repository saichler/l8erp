package ui

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func registerFinTypes(resources ifs.IResources) {
	// General Ledger
	common.RegisterType(resources, &fin.Account{}, &fin.AccountList{}, "AccountId")
	common.RegisterType(resources, &fin.JournalEntry{}, &fin.JournalEntryList{}, "JournalEntryId")
	common.RegisterType(resources, &fin.FiscalYear{}, &fin.FiscalYearList{}, "FiscalYearId")
	common.RegisterType(resources, &fin.Currency{}, &fin.CurrencyList{}, "CurrencyId")
	common.RegisterType(resources, &fin.ExchangeRate{}, &fin.ExchangeRateList{}, "ExchangeRateId")

	// Accounts Payable
	common.RegisterType(resources, &fin.Vendor{}, &fin.VendorList{}, "VendorId")
	common.RegisterType(resources, &fin.PurchaseInvoice{}, &fin.PurchaseInvoiceList{}, "InvoiceId")
	common.RegisterType(resources, &fin.PaymentSchedule{}, &fin.PaymentScheduleList{}, "ScheduleId")
	common.RegisterType(resources, &fin.VendorPayment{}, &fin.VendorPaymentList{}, "PaymentId")
	common.RegisterType(resources, &fin.VendorStatement{}, &fin.VendorStatementList{}, "StatementId")

	// Accounts Receivable
	common.RegisterType(resources, &fin.Customer{}, &fin.CustomerList{}, "CustomerId")
	common.RegisterType(resources, &fin.SalesInvoice{}, &fin.SalesInvoiceList{}, "InvoiceId")
	common.RegisterType(resources, &fin.CustomerPayment{}, &fin.CustomerPaymentList{}, "PaymentId")
	common.RegisterType(resources, &fin.CreditMemo{}, &fin.CreditMemoList{}, "CreditMemoId")
	common.RegisterType(resources, &fin.DunningLetter{}, &fin.DunningLetterList{}, "LetterId")

	// Cash Management
	common.RegisterType(resources, &fin.BankAccount{}, &fin.BankAccountList{}, "BankAccountId")
	common.RegisterType(resources, &fin.CashForecast{}, &fin.CashForecastList{}, "ForecastId")
	common.RegisterType(resources, &fin.FundTransfer{}, &fin.FundTransferList{}, "TransferId")
	common.RegisterType(resources, &fin.PettyCash{}, &fin.PettyCashList{}, "PettyCashId")

	// Fixed Assets
	common.RegisterType(resources, &fin.Asset{}, &fin.AssetList{}, "AssetId")
	common.RegisterType(resources, &fin.AssetCategory{}, &fin.AssetCategoryList{}, "CategoryId")

	// Budgeting
	common.RegisterType(resources, &fin.Budget{}, &fin.BudgetList{}, "BudgetId")
	common.RegisterType(resources, &fin.CapitalExpenditure{}, &fin.CapitalExpenditureList{}, "CapexId")
	common.RegisterType(resources, &fin.Forecast{}, &fin.ForecastList{}, "ForecastId")

	// Tax
	common.RegisterType(resources, &fin.TaxCode{}, &fin.TaxCodeList{}, "TaxCodeId")
	common.RegisterType(resources, &fin.TaxJurisdiction{}, &fin.TaxJurisdictionList{}, "JurisdictionId")
	common.RegisterType(resources, &fin.TaxRule{}, &fin.TaxRuleList{}, "RuleId")
	common.RegisterType(resources, &fin.TaxExemption{}, &fin.TaxExemptionList{}, "ExemptionId")

	// Reports
	common.RegisterType(resources, &fin.FinReport{}, &fin.FinReportList{}, "ReportId")
}
