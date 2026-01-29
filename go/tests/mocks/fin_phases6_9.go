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

// FIN Phase 6: AR Transactions
func generateFinPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate Sales Invoices
	fmt.Printf("  Creating Sales Invoices...")
	salesInvoices := generateSalesInvoices(store)
	if err := client.post("/erp/40/SalesInv", &fin.SalesInvoiceList{List: salesInvoices}); err != nil {
		return fmt.Errorf("sales invoices: %w", err)
	}
	for _, si := range salesInvoices {
		store.SalesInvoiceIDs = append(store.SalesInvoiceIDs, si.InvoiceId)
	}
	fmt.Printf(" %d created\n", len(salesInvoices))

	// Generate Sales Invoice Lines
	fmt.Printf("  Creating Sales Invoice Lines...")
	salesInvoiceLines := generateSalesInvoiceLines(store)
	if err := client.post("/erp/40/SalesLine", &fin.SalesInvoiceLineList{List: salesInvoiceLines}); err != nil {
		return fmt.Errorf("sales invoice lines: %w", err)
	}
	for _, sl := range salesInvoiceLines {
		store.SalesInvoiceLineIDs = append(store.SalesInvoiceLineIDs, sl.LineId)
	}
	fmt.Printf(" %d created\n", len(salesInvoiceLines))

	// Generate Customer Payments
	fmt.Printf("  Creating Customer Payments...")
	customerPayments := generateCustomerPayments(store)
	if err := client.post("/erp/40/CustPmt", &fin.CustomerPaymentList{List: customerPayments}); err != nil {
		return fmt.Errorf("customer payments: %w", err)
	}
	for _, cp := range customerPayments {
		store.CustomerPaymentIDs = append(store.CustomerPaymentIDs, cp.PaymentId)
	}
	fmt.Printf(" %d created\n", len(customerPayments))

	// Generate Payment Applications
	fmt.Printf("  Creating Payment Applications...")
	paymentApplications := generatePaymentApplications(store)
	if err := client.post("/erp/40/PmtApp", &fin.PaymentApplicationList{List: paymentApplications}); err != nil {
		return fmt.Errorf("payment applications: %w", err)
	}
	for _, pa := range paymentApplications {
		store.PaymentAppIDs = append(store.PaymentAppIDs, pa.ApplicationId)
	}
	fmt.Printf(" %d created\n", len(paymentApplications))

	// Generate Credit Memos
	fmt.Printf("  Creating Credit Memos...")
	creditMemos := generateCreditMemos(store)
	if err := client.post("/erp/40/CrdtMemo", &fin.CreditMemoList{List: creditMemos}); err != nil {
		return fmt.Errorf("credit memos: %w", err)
	}
	for _, cm := range creditMemos {
		store.CreditMemoIDs = append(store.CreditMemoIDs, cm.CreditMemoId)
	}
	fmt.Printf(" %d created\n", len(creditMemos))

	// Generate Dunning Letters
	fmt.Printf("  Creating Dunning Letters...")
	dunningLetters := generateDunningLetters(store)
	if err := client.post("/erp/40/DunLtr", &fin.DunningLetterList{List: dunningLetters}); err != nil {
		return fmt.Errorf("dunning letters: %w", err)
	}
	for _, dl := range dunningLetters {
		store.DunningLetterIDs = append(store.DunningLetterIDs, dl.LetterId)
	}
	fmt.Printf(" %d created\n", len(dunningLetters))

	return nil
}

// FIN Phase 7: GL Transactions
func generateFinPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Journal Entries
	fmt.Printf("  Creating Journal Entries...")
	journalEntries := generateJournalEntries(store)
	if err := client.post("/erp/40/JrnlEntry", &fin.JournalEntryList{List: journalEntries}); err != nil {
		return fmt.Errorf("journal entries: %w", err)
	}
	for _, je := range journalEntries {
		store.JournalEntryIDs = append(store.JournalEntryIDs, je.JournalEntryId)
	}
	fmt.Printf(" %d created\n", len(journalEntries))

	// Generate Journal Entry Lines
	fmt.Printf("  Creating Journal Entry Lines...")
	journalEntryLines := generateJournalEntryLines(store)
	if err := client.post("/erp/40/JrnlLine", &fin.JournalEntryLineList{List: journalEntryLines}); err != nil {
		return fmt.Errorf("journal entry lines: %w", err)
	}
	for _, jl := range journalEntryLines {
		store.JournalEntryLineIDs = append(store.JournalEntryLineIDs, jl.LineId)
	}
	fmt.Printf(" %d created\n", len(journalEntryLines))

	// Generate Account Balances
	fmt.Printf("  Creating Account Balances...")
	accountBalances := generateAccountBalances(store)
	if err := client.post("/erp/40/AcctBal", &fin.AccountBalanceList{List: accountBalances}); err != nil {
		return fmt.Errorf("account balances: %w", err)
	}
	for _, ab := range accountBalances {
		store.AccountBalanceIDs = append(store.AccountBalanceIDs, ab.BalanceId)
	}
	fmt.Printf(" %d created\n", len(accountBalances))

	return nil
}

// FIN Phase 8: Cash & Assets
func generateFinPhase8(client *HCMClient, store *MockDataStore) error {
	// Generate Bank Transactions
	fmt.Printf("  Creating Bank Transactions...")
	bankTransactions := generateBankTransactions(store)
	if err := client.post("/erp/40/BankTxn", &fin.BankTransactionList{List: bankTransactions}); err != nil {
		return fmt.Errorf("bank transactions: %w", err)
	}
	for _, bt := range bankTransactions {
		store.BankTransactionIDs = append(store.BankTransactionIDs, bt.TransactionId)
	}
	fmt.Printf(" %d created\n", len(bankTransactions))

	// Generate Bank Reconciliations
	fmt.Printf("  Creating Bank Reconciliations...")
	bankReconciliations := generateBankReconciliations(store)
	if err := client.post("/erp/40/BankRec", &fin.BankReconciliationList{List: bankReconciliations}); err != nil {
		return fmt.Errorf("bank reconciliations: %w", err)
	}
	for _, br := range bankReconciliations {
		store.BankReconIDs = append(store.BankReconIDs, br.ReconciliationId)
	}
	fmt.Printf(" %d created\n", len(bankReconciliations))

	// Generate Cash Forecasts
	fmt.Printf("  Creating Cash Forecasts...")
	cashForecasts := generateCashForecasts(store)
	if err := client.post("/erp/40/CashFcst", &fin.CashForecastList{List: cashForecasts}); err != nil {
		return fmt.Errorf("cash forecasts: %w", err)
	}
	for _, cf := range cashForecasts {
		store.CashForecastIDs = append(store.CashForecastIDs, cf.ForecastId)
	}
	fmt.Printf(" %d created\n", len(cashForecasts))

	// Generate Fund Transfers
	fmt.Printf("  Creating Fund Transfers...")
	fundTransfers := generateFundTransfers(store)
	if err := client.post("/erp/40/FundXfer", &fin.FundTransferList{List: fundTransfers}); err != nil {
		return fmt.Errorf("fund transfers: %w", err)
	}
	for _, ft := range fundTransfers {
		store.FundTransferIDs = append(store.FundTransferIDs, ft.TransferId)
	}
	fmt.Printf(" %d created\n", len(fundTransfers))

	// Generate Petty Cash
	fmt.Printf("  Creating Petty Cash...")
	pettyCash := generatePettyCash(store)
	if err := client.post("/erp/40/PettyCash", &fin.PettyCashList{List: pettyCash}); err != nil {
		return fmt.Errorf("petty cash: %w", err)
	}
	for _, pc := range pettyCash {
		store.PettyCashIDs = append(store.PettyCashIDs, pc.PettyCashId)
	}
	fmt.Printf(" %d created\n", len(pettyCash))

	// Generate Assets
	fmt.Printf("  Creating Assets...")
	assets := generateAssets(store)
	if err := client.post("/erp/40/Asset", &fin.AssetList{List: assets}); err != nil {
		return fmt.Errorf("assets: %w", err)
	}
	for _, a := range assets {
		store.AssetIDs = append(store.AssetIDs, a.AssetId)
	}
	fmt.Printf(" %d created\n", len(assets))

	// Generate Depreciation Schedules
	fmt.Printf("  Creating Depreciation Schedules...")
	depreciationSchedules := generateDepreciationSchedules(store)
	if err := client.post("/erp/40/DeprSched", &fin.DepreciationScheduleList{List: depreciationSchedules}); err != nil {
		return fmt.Errorf("depreciation schedules: %w", err)
	}
	for _, ds := range depreciationSchedules {
		store.DepreciationIDs = append(store.DepreciationIDs, ds.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(depreciationSchedules))

	// Generate Asset Disposals
	fmt.Printf("  Creating Asset Disposals...")
	assetDisposals := generateAssetDisposals(store)
	if err := client.post("/erp/40/AstDisp", &fin.AssetDisposalList{List: assetDisposals}); err != nil {
		return fmt.Errorf("asset disposals: %w", err)
	}
	for _, ad := range assetDisposals {
		store.AssetDisposalIDs = append(store.AssetDisposalIDs, ad.DisposalId)
	}
	fmt.Printf(" %d created\n", len(assetDisposals))

	// Generate Asset Transfers
	fmt.Printf("  Creating Asset Transfers...")
	assetTransfers := generateAssetTransfers(store)
	if err := client.post("/erp/40/AstXfer", &fin.AssetTransferList{List: assetTransfers}); err != nil {
		return fmt.Errorf("asset transfers: %w", err)
	}
	for _, at := range assetTransfers {
		store.AssetTransferIDs = append(store.AssetTransferIDs, at.TransferId)
	}
	fmt.Printf(" %d created\n", len(assetTransfers))

	// Generate Asset Maintenance
	fmt.Printf("  Creating Asset Maintenance...")
	assetMaintenance := generateAssetMaintenance(store)
	if err := client.post("/erp/40/AstMaint", &fin.AssetMaintenanceList{List: assetMaintenance}); err != nil {
		return fmt.Errorf("asset maintenance: %w", err)
	}
	for _, am := range assetMaintenance {
		store.AssetMaintenanceIDs = append(store.AssetMaintenanceIDs, am.MaintenanceId)
	}
	fmt.Printf(" %d created\n", len(assetMaintenance))

	// Generate Asset Revaluations
	fmt.Printf("  Creating Asset Revaluations...")
	assetRevaluations := generateAssetRevaluations(store)
	if err := client.post("/erp/40/AstReval", &fin.AssetRevaluationList{List: assetRevaluations}); err != nil {
		return fmt.Errorf("asset revaluations: %w", err)
	}
	for _, ar := range assetRevaluations {
		store.AssetRevaluationIDs = append(store.AssetRevaluationIDs, ar.RevaluationId)
	}
	fmt.Printf(" %d created\n", len(assetRevaluations))

	return nil
}

// FIN Phase 9: Tax Filing
func generateFinPhase9(client *HCMClient, store *MockDataStore) error {
	// Generate Tax Returns
	fmt.Printf("  Creating Tax Returns...")
	taxReturns := generateTaxReturns(store)
	if err := client.post("/erp/40/TaxRtn", &fin.TaxReturnList{List: taxReturns}); err != nil {
		return fmt.Errorf("tax returns: %w", err)
	}
	for _, tr := range taxReturns {
		store.TaxReturnIDs = append(store.TaxReturnIDs, tr.ReturnId)
	}
	fmt.Printf(" %d created\n", len(taxReturns))

	return nil
}
