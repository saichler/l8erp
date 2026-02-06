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

	"github.com/saichler/l8erp/go/types/fin"
)

// FIN Phase 6: AR Transactions
func generateFinPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate Sales Invoices
	salesInvoices := generateSalesInvoices(store)
	if err := runOp(client, "Sales Invoices", "/erp/40/SalesInv", &fin.SalesInvoiceList{List: salesInvoices}, extractIDs(salesInvoices, func(e *fin.SalesInvoice) string { return e.InvoiceId }), &store.SalesInvoiceIDs); err != nil {
		return err
	}

	// Generate Sales Invoice Lines
	salesInvoiceLines := generateSalesInvoiceLines(store)
	if err := runOp(client, "Sales Invoice Lines", "/erp/40/SalesLine", &fin.SalesInvoiceLineList{List: salesInvoiceLines}, extractIDs(salesInvoiceLines, func(e *fin.SalesInvoiceLine) string { return e.LineId }), &store.SalesInvoiceLineIDs); err != nil {
		return err
	}

	// Generate Customer Payments
	customerPayments := generateCustomerPayments(store)
	if err := runOp(client, "Customer Payments", "/erp/40/CustPmt", &fin.CustomerPaymentList{List: customerPayments}, extractIDs(customerPayments, func(e *fin.CustomerPayment) string { return e.PaymentId }), &store.CustomerPaymentIDs); err != nil {
		return err
	}

	// Generate Payment Applications
	paymentApplications := generatePaymentApplications(store)
	if err := runOp(client, "Payment Applications", "/erp/40/PmtApp", &fin.PaymentApplicationList{List: paymentApplications}, extractIDs(paymentApplications, func(e *fin.PaymentApplication) string { return e.ApplicationId }), &store.PaymentAppIDs); err != nil {
		return err
	}

	// Generate Credit Memos
	creditMemos := generateCreditMemos(store)
	if err := runOp(client, "Credit Memos", "/erp/40/CrdtMemo", &fin.CreditMemoList{List: creditMemos}, extractIDs(creditMemos, func(e *fin.CreditMemo) string { return e.CreditMemoId }), &store.CreditMemoIDs); err != nil {
		return err
	}

	// Generate Dunning Letters
	dunningLetters := generateDunningLetters(store)
	if err := runOp(client, "Dunning Letters", "/erp/40/DunLtr", &fin.DunningLetterList{List: dunningLetters}, extractIDs(dunningLetters, func(e *fin.DunningLetter) string { return e.LetterId }), &store.DunningLetterIDs); err != nil {
		return err
	}

	return nil
}

// FIN Phase 7: GL Transactions
func generateFinPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Journal Entries
	journalEntries := generateJournalEntries(store)
	if err := runOp(client, "Journal Entries", "/erp/40/JrnlEntry", &fin.JournalEntryList{List: journalEntries}, extractIDs(journalEntries, func(e *fin.JournalEntry) string { return e.JournalEntryId }), &store.JournalEntryIDs); err != nil {
		return err
	}

	// Generate Journal Entry Lines
	journalEntryLines := generateJournalEntryLines(store)
	if err := runOp(client, "Journal Entry Lines", "/erp/40/JrnlLine", &fin.JournalEntryLineList{List: journalEntryLines}, extractIDs(journalEntryLines, func(e *fin.JournalEntryLine) string { return e.LineId }), &store.JournalEntryLineIDs); err != nil {
		return err
	}

	// Generate Account Balances
	accountBalances := generateAccountBalances(store)
	if err := runOp(client, "Account Balances", "/erp/40/AcctBal", &fin.AccountBalanceList{List: accountBalances}, extractIDs(accountBalances, func(e *fin.AccountBalance) string { return e.BalanceId }), &store.AccountBalanceIDs); err != nil {
		return err
	}

	return nil
}

// FIN Phase 8: Cash & Assets
func generateFinPhase8(client *HCMClient, store *MockDataStore) error {
	// Generate Bank Transactions
	bankTransactions := generateBankTransactions(store)
	if err := runOp(client, "Bank Transactions", "/erp/40/BankTxn", &fin.BankTransactionList{List: bankTransactions}, extractIDs(bankTransactions, func(e *fin.BankTransaction) string { return e.TransactionId }), &store.BankTransactionIDs); err != nil {
		return err
	}

	// Generate Bank Reconciliations
	bankReconciliations := generateBankReconciliations(store)
	if err := runOp(client, "Bank Reconciliations", "/erp/40/BankRec", &fin.BankReconciliationList{List: bankReconciliations}, extractIDs(bankReconciliations, func(e *fin.BankReconciliation) string { return e.ReconciliationId }), &store.BankReconIDs); err != nil {
		return err
	}

	// Generate Cash Forecasts
	cashForecasts := generateCashForecasts(store)
	if err := runOp(client, "Cash Forecasts", "/erp/40/CashFcst", &fin.CashForecastList{List: cashForecasts}, extractIDs(cashForecasts, func(e *fin.CashForecast) string { return e.ForecastId }), &store.CashForecastIDs); err != nil {
		return err
	}

	// Generate Fund Transfers
	fundTransfers := generateFundTransfers(store)
	if err := runOp(client, "Fund Transfers", "/erp/40/FundXfer", &fin.FundTransferList{List: fundTransfers}, extractIDs(fundTransfers, func(e *fin.FundTransfer) string { return e.TransferId }), &store.FundTransferIDs); err != nil {
		return err
	}

	// Generate Petty Cash
	pettyCash := generatePettyCash(store)
	if err := runOp(client, "Petty Cash", "/erp/40/PettyCash", &fin.PettyCashList{List: pettyCash}, extractIDs(pettyCash, func(e *fin.PettyCash) string { return e.PettyCashId }), &store.PettyCashIDs); err != nil {
		return err
	}

	// Generate Assets
	assets := generateAssets(store)
	if err := runOp(client, "Assets", "/erp/40/Asset", &fin.AssetList{List: assets}, extractIDs(assets, func(e *fin.Asset) string { return e.AssetId }), &store.AssetIDs); err != nil {
		return err
	}

	// Generate Depreciation Schedules
	depreciationSchedules := generateDepreciationSchedules(store)
	if err := runOp(client, "Depreciation Schedules", "/erp/40/DeprSched", &fin.DepreciationScheduleList{List: depreciationSchedules}, extractIDs(depreciationSchedules, func(e *fin.DepreciationSchedule) string { return e.ScheduleId }), &store.DepreciationIDs); err != nil {
		return err
	}

	// Generate Asset Disposals
	assetDisposals := generateAssetDisposals(store)
	if err := runOp(client, "Asset Disposals", "/erp/40/AstDisp", &fin.AssetDisposalList{List: assetDisposals}, extractIDs(assetDisposals, func(e *fin.AssetDisposal) string { return e.DisposalId }), &store.AssetDisposalIDs); err != nil {
		return err
	}

	// Generate Asset Transfers
	assetTransfers := generateAssetTransfers(store)
	if err := runOp(client, "Asset Transfers", "/erp/40/AstXfer", &fin.AssetTransferList{List: assetTransfers}, extractIDs(assetTransfers, func(e *fin.AssetTransfer) string { return e.TransferId }), &store.AssetTransferIDs); err != nil {
		return err
	}

	// Generate Asset Maintenance
	assetMaintenance := generateAssetMaintenance(store)
	if err := runOp(client, "Asset Maintenance", "/erp/40/AstMaint", &fin.AssetMaintenanceList{List: assetMaintenance}, extractIDs(assetMaintenance, func(e *fin.AssetMaintenance) string { return e.MaintenanceId }), &store.AssetMaintenanceIDs); err != nil {
		return err
	}

	// Generate Asset Revaluations
	assetRevaluations := generateAssetRevaluations(store)
	if err := runOp(client, "Asset Revaluations", "/erp/40/AstReval", &fin.AssetRevaluationList{List: assetRevaluations}, extractIDs(assetRevaluations, func(e *fin.AssetRevaluation) string { return e.RevaluationId }), &store.AssetRevaluationIDs); err != nil {
		return err
	}

	return nil
}

// FIN Phase 9: Tax Filing
func generateFinPhase9(client *HCMClient, store *MockDataStore) error {
	// Generate Tax Returns
	taxReturns := generateTaxReturns(store)
	if err := runOp(client, "Tax Returns", "/erp/40/TaxRtn", &fin.TaxReturnList{List: taxReturns}, extractIDs(taxReturns, func(e *fin.TaxReturn) string { return e.ReturnId }), &store.TaxReturnIDs); err != nil {
		return err
	}

	return nil
}
