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
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

// generateJournalEntries creates journal entry records for GL transactions
func generateJournalEntries(store *MockDataStore) []*fin.JournalEntry {
	entries := make([]*fin.JournalEntry, 20)

	descriptions := []string{
		"Monthly payroll accrual",
		"Depreciation - Building",
		"Revenue recognition - Q1",
		"Rent expense - Office",
		"Insurance prepaid amortization",
		"Utilities expense accrual",
		"Accounts receivable adjustment",
		"Inventory write-down",
		"Depreciation - Equipment",
		"Sales tax remittance",
		"Interest income accrual",
		"Bad debt expense",
		"Revenue recognition - Q2",
		"Lease payment allocation",
		"Travel expense reimbursement",
		"Consulting fee accrual",
		"Depreciation - Vehicles",
		"Revenue recognition - Q3",
		"Year-end closing entry",
		"Bonus accrual",
	}

	sources := []string{"Manual", "Auto-Post", "System"}

	for i := 0; i < 20; i++ {
		entryDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 0, 0, 0, 0, time.UTC)

		// FiscalPeriodIDs indices 12-23 are the 2025 periods
		periodIdx := 12 + (i % 12)
		if periodIdx >= len(store.FiscalPeriodIDs) {
			periodIdx = len(store.FiscalPeriodIDs) - 1
		}

		status := fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_POSTED
		if i == 18 || i == 19 {
			status = fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_DRAFT
		}

		totalAmount := int64(rand.Intn(95001)+5000) * 100 // 5000_00 to 100000_00 cents

		entry := &fin.JournalEntry{
			JournalEntryId: fmt.Sprintf("je-%03d", i+1),
			EntryNumber:    fmt.Sprintf("JE-%06d", i+1),
			EntryDate:      entryDate.Unix(),
			FiscalPeriodId: store.FiscalPeriodIDs[periodIdx],
			Description:    descriptions[i],
			Source:         sources[i%len(sources)],
			Reference:      fmt.Sprintf("REF-%06d", i+1),
			Status:         status,
			TotalAmount:    &erp.Money{Amount: totalAmount, CurrencyCode: "USD"},
			AuditInfo:      createAuditInfo(),
		}

		if status == fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_POSTED {
			entry.PostedBy = "mock-generator"
			entry.PostedDate = entryDate.AddDate(0, 0, 1).Unix()
		}

		entries[i] = entry
	}

	return entries
}

// generateJournalEntryLines creates journal entry line records
// For each journal entry, generates 3 lines where:
// line 1: debit amount X, credit 0
// line 2: debit amount Y, credit 0
// line 3: debit 0, credit X+Y (ensures total debits = total credits)
func generateJournalEntryLines(store *MockDataStore) []*fin.JournalEntryLine {
	lines := make([]*fin.JournalEntryLine, 0, 60)
	lineIdx := 1

	lineDescriptions := []string{
		"Expense account debit",
		"Accrual account debit",
		"Offsetting credit entry",
	}

	for i := 0; i < len(store.JournalEntryIDs); i++ {
		journalEntryID := store.JournalEntryIDs[i]

		// Generate balanced amounts: debit1 + debit2 = credit3
		debit1 := int64(rand.Intn(30000)+2000) * 100
		debit2 := int64(rand.Intn(20000)+1000) * 100
		credit3 := debit1 + debit2

		// Line 1: debit
		acctIdx1 := (i * 3) % len(store.AccountIDs)
		lines = append(lines, &fin.JournalEntryLine{
			LineId:         fmt.Sprintf("jel-%03d", lineIdx),
			JournalEntryId: journalEntryID,
			LineNumber:     1,
			AccountId:      store.AccountIDs[acctIdx1],
			Description:    lineDescriptions[0],
			DebitAmount:    &erp.Money{Amount: debit1, CurrencyCode: "USD"},
			CreditAmount:   &erp.Money{Amount: 0, CurrencyCode: "USD"},
			AuditInfo:      createAuditInfo(),
		})
		lineIdx++

		// Line 2: debit
		acctIdx2 := (i*3 + 1) % len(store.AccountIDs)
		lines = append(lines, &fin.JournalEntryLine{
			LineId:         fmt.Sprintf("jel-%03d", lineIdx),
			JournalEntryId: journalEntryID,
			LineNumber:     2,
			AccountId:      store.AccountIDs[acctIdx2],
			Description:    lineDescriptions[1],
			DebitAmount:    &erp.Money{Amount: debit2, CurrencyCode: "USD"},
			CreditAmount:   &erp.Money{Amount: 0, CurrencyCode: "USD"},
			AuditInfo:      createAuditInfo(),
		})
		lineIdx++

		// Line 3: credit = debit1 + debit2
		acctIdx3 := (i*3 + 2) % len(store.AccountIDs)
		lines = append(lines, &fin.JournalEntryLine{
			LineId:         fmt.Sprintf("jel-%03d", lineIdx),
			JournalEntryId: journalEntryID,
			LineNumber:     3,
			AccountId:      store.AccountIDs[acctIdx3],
			Description:    lineDescriptions[2],
			DebitAmount:    &erp.Money{Amount: 0, CurrencyCode: "USD"},
			CreditAmount:   &erp.Money{Amount: credit3, CurrencyCode: "USD"},
			AuditInfo:      createAuditInfo(),
		})
		lineIdx++
	}

	return lines
}

// generateAccountBalances creates account balance records for the first 10 accounts
// across 6 monthly fiscal periods in 2025
func generateAccountBalances(store *MockDataStore) []*fin.AccountBalance {
	numAccounts := 10
	if numAccounts > len(store.AccountIDs) {
		numAccounts = len(store.AccountIDs)
	}
	numPeriods := 6
	balances := make([]*fin.AccountBalance, 0, numAccounts*numPeriods)
	balIdx := 1

	for a := 0; a < numAccounts; a++ {
		accountID := store.AccountIDs[a]
		var ytdDebit, ytdCredit int64

		for p := 0; p < numPeriods; p++ {
			// FiscalPeriodIDs indices 12-23 are 2025 periods
			periodIdx := 12 + p
			if periodIdx >= len(store.FiscalPeriodIDs) {
				periodIdx = len(store.FiscalPeriodIDs) - 1
			}

			beginningBalance := int64(rand.Intn(500000)+10000) * 100
			periodDebit := int64(rand.Intn(100000)+5000) * 100
			periodCredit := int64(rand.Intn(80000)+3000) * 100
			endingBalance := beginningBalance + periodDebit - periodCredit

			ytdDebit += periodDebit
			ytdCredit += periodCredit

			balances = append(balances, &fin.AccountBalance{
				BalanceId:        fmt.Sprintf("abal-%03d", balIdx),
				AccountId:        accountID,
				FiscalPeriodId:   store.FiscalPeriodIDs[periodIdx],
				BeginningBalance: &erp.Money{Amount: beginningBalance, CurrencyCode: "USD"},
				PeriodDebit:      &erp.Money{Amount: periodDebit, CurrencyCode: "USD"},
				PeriodCredit:     &erp.Money{Amount: periodCredit, CurrencyCode: "USD"},
				EndingBalance:    &erp.Money{Amount: endingBalance, CurrencyCode: "USD"},
				YtdDebit:         &erp.Money{Amount: ytdDebit, CurrencyCode: "USD"},
				YtdCredit:        &erp.Money{Amount: ytdCredit, CurrencyCode: "USD"},
				AuditInfo:        createAuditInfo(),
			})
			balIdx++
		}
	}

	return balances
}

// generateTaxReturns creates quarterly tax return records for 2025
func generateTaxReturns(store *MockDataStore) []*fin.TaxReturn {
	returns := make([]*fin.TaxReturn, 4)

	// Quarter end months: March(3), June(6), September(9), December(12)
	quarterEndMonths := []time.Month{time.March, time.June, time.September, time.December}
	// Due dates: 15th of month after quarter end
	dueDateMonths := []time.Month{time.April, time.July, time.October, time.January}
	dueDateYears := []int{2025, 2025, 2025, 2026}

	// FiscalPeriodIDs indices 12-23 are 2025 monthly periods
	// Quarter end periods: March=14, June=17, September=20, December=23
	quarterPeriodIndices := []int{14, 17, 20, 23}

	for i := 0; i < 4; i++ {
		periodIdx := quarterPeriodIndices[i]
		if periodIdx >= len(store.FiscalPeriodIDs) {
			periodIdx = len(store.FiscalPeriodIDs) - 1
		}

		// Q1-Q3 = FILED, Q4 = DRAFT
		status := fin.TaxReturnStatus_TAX_RETURN_STATUS_FILED
		if i == 3 {
			status = fin.TaxReturnStatus_TAX_RETURN_STATUS_DRAFT
		}

		taxableAmount := int64(rand.Intn(5000000)+1000000) * 100
		taxRate := 21 // Corporate tax rate %
		taxAmount := taxableAmount * int64(taxRate) / 100

		var amountPaid, amountDue int64
		if status == fin.TaxReturnStatus_TAX_RETURN_STATUS_FILED {
			amountPaid = taxAmount
			amountDue = 0
		} else {
			amountPaid = 0
			amountDue = taxAmount
		}

		quarterEnd := time.Date(2025, quarterEndMonths[i], 1, 0, 0, 0, 0, time.UTC)
		quarterEnd = quarterEnd.AddDate(0, 1, -1) // Last day of quarter end month
		dueDate := time.Date(dueDateYears[i], dueDateMonths[i], 15, 0, 0, 0, 0, time.UTC)

		jurisdictionID := ""
		if len(store.TaxJurisdictionIDs) > 0 {
			jurisdictionID = store.TaxJurisdictionIDs[0]
		}

		ret := &fin.TaxReturn{
			ReturnId:       fmt.Sprintf("txrtn-%03d", i+1),
			JurisdictionId: jurisdictionID,
			FiscalPeriodId: store.FiscalPeriodIDs[periodIdx],
			TaxType:        fin.TaxType_TAX_TYPE_INCOME,
			Status:         status,
			DueDate:        dueDate.Unix(),
			TaxableAmount:  &erp.Money{Amount: taxableAmount, CurrencyCode: "USD"},
			TaxAmount:      &erp.Money{Amount: taxAmount, CurrencyCode: "USD"},
			AmountPaid:     &erp.Money{Amount: amountPaid, CurrencyCode: "USD"},
			AmountDue:      &erp.Money{Amount: amountDue, CurrencyCode: "USD"},
			Notes:          fmt.Sprintf("Q%d 2025 Federal Income Tax Return", i+1),
			AuditInfo:      createAuditInfo(),
		}

		if status == fin.TaxReturnStatus_TAX_RETURN_STATUS_FILED {
			ret.FilingDate = quarterEnd.AddDate(0, 0, 30).Unix()
			ret.FiledBy = "mock-generator"
			ret.ConfirmationNumber = fmt.Sprintf("FED-2025-Q%d-%06d", i+1, rand.Intn(1000000))
		}

		returns[i] = ret
	}

	return returns
}
