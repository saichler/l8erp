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
	common.RegisterType[fin.JournalEntryLine, fin.JournalEntryLineList](resources, "LineId")
	common.RegisterType[fin.FiscalYear, fin.FiscalYearList](resources, "FiscalYearId")
	common.RegisterType[fin.FiscalPeriod, fin.FiscalPeriodList](resources, "FiscalPeriodId")
	common.RegisterType[fin.Currency, fin.CurrencyList](resources, "CurrencyId")
	common.RegisterType[fin.ExchangeRate, fin.ExchangeRateList](resources, "ExchangeRateId")
	common.RegisterType[fin.AccountBalance, fin.AccountBalanceList](resources, "BalanceId")

	// Accounts Payable
	common.RegisterType[fin.Vendor, fin.VendorList](resources, "VendorId")
	common.RegisterType[fin.VendorContact, fin.VendorContactList](resources, "ContactId")
	common.RegisterType[fin.PurchaseInvoice, fin.PurchaseInvoiceList](resources, "InvoiceId")
	common.RegisterType[fin.PurchaseInvoiceLine, fin.PurchaseInvoiceLineList](resources, "LineId")
	common.RegisterType[fin.PaymentSchedule, fin.PaymentScheduleList](resources, "ScheduleId")
	common.RegisterType[fin.VendorPayment, fin.VendorPaymentList](resources, "PaymentId")
	common.RegisterType[fin.PaymentAllocation, fin.PaymentAllocationList](resources, "AllocationId")
	common.RegisterType[fin.VendorStatement, fin.VendorStatementList](resources, "StatementId")

	// Accounts Receivable
	common.RegisterType[fin.Customer, fin.CustomerList](resources, "CustomerId")
	common.RegisterType[fin.CustomerContact, fin.CustomerContactList](resources, "ContactId")
	common.RegisterType[fin.SalesInvoice, fin.SalesInvoiceList](resources, "InvoiceId")
	common.RegisterType[fin.SalesInvoiceLine, fin.SalesInvoiceLineList](resources, "LineId")
	common.RegisterType[fin.CustomerPayment, fin.CustomerPaymentList](resources, "PaymentId")
	common.RegisterType[fin.PaymentApplication, fin.PaymentApplicationList](resources, "ApplicationId")
	common.RegisterType[fin.CreditMemo, fin.CreditMemoList](resources, "CreditMemoId")
	common.RegisterType[fin.DunningLetter, fin.DunningLetterList](resources, "LetterId")

	// Cash Management
	common.RegisterType[fin.BankAccount, fin.BankAccountList](resources, "BankAccountId")
	common.RegisterType[fin.BankTransaction, fin.BankTransactionList](resources, "TransactionId")
	common.RegisterType[fin.BankReconciliation, fin.BankReconciliationList](resources, "ReconciliationId")
	common.RegisterType[fin.CashForecast, fin.CashForecastList](resources, "ForecastId")
	common.RegisterType[fin.FundTransfer, fin.FundTransferList](resources, "TransferId")
	common.RegisterType[fin.PettyCash, fin.PettyCashList](resources, "PettyCashId")

	// Fixed Assets
	common.RegisterType[fin.Asset, fin.AssetList](resources, "AssetId")
	common.RegisterType[fin.AssetCategory, fin.AssetCategoryList](resources, "CategoryId")
	common.RegisterType[fin.DepreciationSchedule, fin.DepreciationScheduleList](resources, "ScheduleId")
	common.RegisterType[fin.AssetDisposal, fin.AssetDisposalList](resources, "DisposalId")
	common.RegisterType[fin.AssetTransfer, fin.AssetTransferList](resources, "TransferId")
	common.RegisterType[fin.AssetMaintenance, fin.AssetMaintenanceList](resources, "MaintenanceId")
	common.RegisterType[fin.AssetRevaluation, fin.AssetRevaluationList](resources, "RevaluationId")

	// Budgeting
	common.RegisterType[fin.Budget, fin.BudgetList](resources, "BudgetId")
	common.RegisterType[fin.BudgetLine, fin.BudgetLineList](resources, "LineId")
	common.RegisterType[fin.BudgetTransfer, fin.BudgetTransferList](resources, "TransferId")
	common.RegisterType[fin.BudgetScenario, fin.BudgetScenarioList](resources, "ScenarioId")
	common.RegisterType[fin.CapitalExpenditure, fin.CapitalExpenditureList](resources, "CapexId")
	common.RegisterType[fin.Forecast, fin.ForecastList](resources, "ForecastId")

	// Tax
	common.RegisterType[fin.TaxCode, fin.TaxCodeList](resources, "TaxCodeId")
	common.RegisterType[fin.TaxJurisdiction, fin.TaxJurisdictionList](resources, "JurisdictionId")
	common.RegisterType[fin.TaxRule, fin.TaxRuleList](resources, "RuleId")
	common.RegisterType[fin.TaxReturn, fin.TaxReturnList](resources, "ReturnId")
	common.RegisterType[fin.TaxExemption, fin.TaxExemptionList](resources, "ExemptionId")
	common.RegisterType[fin.WithholdingTaxConfig, fin.WithholdingTaxConfigList](resources, "ConfigId")
}
