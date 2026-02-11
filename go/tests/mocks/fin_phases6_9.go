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
package mocks

import (

	"github.com/saichler/l8erp/go/types/fin"
)

// FIN Phase 6: AR Transactions
func generateFinPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate Sales Invoices (with embedded Lines)
	salesInvoices := generateSalesInvoices(store)
	if err := runOp(client, "Sales Invoices", "/erp/40/SalesInv", &fin.SalesInvoiceList{List: salesInvoices}, extractIDs(salesInvoices, func(e *fin.SalesInvoice) string { return e.InvoiceId }), &store.SalesInvoiceIDs); err != nil {
		return err
	}

	// Generate Customer Payments (with embedded Applications)
	customerPayments := generateCustomerPayments(store)
	if err := runOp(client, "Customer Payments", "/erp/40/CustPmt", &fin.CustomerPaymentList{List: customerPayments}, extractIDs(customerPayments, func(e *fin.CustomerPayment) string { return e.PaymentId }), &store.CustomerPaymentIDs); err != nil {
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
	// Generate Journal Entries (with embedded Lines)
	journalEntries := generateJournalEntries(store)
	if err := runOp(client, "Journal Entries", "/erp/40/JrnlEntry", &fin.JournalEntryList{List: journalEntries}, extractIDs(journalEntries, func(e *fin.JournalEntry) string { return e.JournalEntryId }), &store.JournalEntryIDs); err != nil {
		return err
	}

	return nil
}

// FIN Phase 8: Cash & Assets
func generateFinPhase8(client *HCMClient, store *MockDataStore) error {
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

	// Generate Assets (with embedded DepreciationSchedules, Disposals, Transfers, Maintenance, Revaluations)
	assets := generateAssets(store)
	if err := runOp(client, "Assets", "/erp/40/Asset", &fin.AssetList{List: assets}, extractIDs(assets, func(e *fin.Asset) string { return e.AssetId }), &store.AssetIDs); err != nil {
		return err
	}

	return nil
}
