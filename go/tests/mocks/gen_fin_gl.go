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
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/fin"
)

// generateJournalEntries creates journal entry records with embedded lines
func generateJournalEntries(store *MockDataStore) []*fin.JournalEntry {
	entries := make([]*fin.JournalEntry, 20)

	descriptions := []string{
		"Monthly payroll accrual", "Depreciation - Building",
		"Revenue recognition - Q1", "Rent expense - Office",
		"Insurance prepaid amortization", "Utilities expense accrual",
		"Accounts receivable adjustment", "Inventory write-down",
		"Depreciation - Equipment", "Sales tax remittance",
		"Interest income accrual", "Bad debt expense",
		"Revenue recognition - Q2", "Lease payment allocation",
		"Travel expense reimbursement", "Consulting fee accrual",
		"Depreciation - Vehicles", "Revenue recognition - Q3",
		"Year-end closing entry", "Bonus accrual",
	}

	sources := []string{"Manual", "Auto-Post", "System"}
	lineDescriptions := []string{
		"Expense account debit", "Accrual account debit", "Offsetting credit entry",
	}

	lineIdx := 1
	for i := 0; i < 20; i++ {
		entryDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 0, 0, 0, 0, time.UTC)

		periodIdx := 12 + (i % 12)
		if periodIdx >= len(store.FiscalPeriodIDs) {
			periodIdx = len(store.FiscalPeriodIDs) - 1
		}

		// Only post to open periods (2025 months that haven't ended yet);
		// use DRAFT for entries targeting closed periods.
		periodEnd := time.Date(2025, time.Month((i%12)+1), 28, 23, 59, 59, 0, time.UTC)
		status := fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_POSTED
		if i == 18 || i == 19 || periodEnd.Before(time.Now()) {
			status = fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_DRAFT
		}

		totalAmount := int64(rand.Intn(95001)+5000) * 100
		entryID := genID("je", i)

		// Generate embedded lines (3 per entry: 2 debits + 1 balancing credit)
		debit1 := int64(rand.Intn(30000)+2000) * 100
		debit2 := int64(rand.Intn(20000)+1000) * 100
		credit3 := debit1 + debit2

		lines := make([]*fin.JournalEntryLine, 3)
		acctIdx1 := (i * 3) % len(store.AccountIDs)
		lines[0] = &fin.JournalEntryLine{
			LineId:         fmt.Sprintf("jel-%03d", lineIdx),
			JournalEntryId: entryID,
			LineNumber:     1,
			AccountId:      store.AccountIDs[acctIdx1],
			Description:    lineDescriptions[0],
			DebitAmount:    money(store, debit1),
			CreditAmount:   money(store, 0),
			AuditInfo:      createAuditInfo(),
		}
		lineIdx++

		acctIdx2 := (i*3 + 1) % len(store.AccountIDs)
		lines[1] = &fin.JournalEntryLine{
			LineId:         fmt.Sprintf("jel-%03d", lineIdx),
			JournalEntryId: entryID,
			LineNumber:     2,
			AccountId:      store.AccountIDs[acctIdx2],
			Description:    lineDescriptions[1],
			DebitAmount:    money(store, debit2),
			CreditAmount:   money(store, 0),
			AuditInfo:      createAuditInfo(),
		}
		lineIdx++

		acctIdx3 := (i*3 + 2) % len(store.AccountIDs)
		lines[2] = &fin.JournalEntryLine{
			LineId:         fmt.Sprintf("jel-%03d", lineIdx),
			JournalEntryId: entryID,
			LineNumber:     3,
			AccountId:      store.AccountIDs[acctIdx3],
			Description:    lineDescriptions[2],
			DebitAmount:    money(store, 0),
			CreditAmount:   money(store, credit3),
			AuditInfo:      createAuditInfo(),
		}
		lineIdx++

		entry := &fin.JournalEntry{
			JournalEntryId: entryID,
			EntryNumber:    fmt.Sprintf("JE-%06d", i+1),
			EntryDate:      entryDate.Unix(),
			FiscalPeriodId: store.FiscalPeriodIDs[periodIdx],
			Description:    descriptions[i],
			Source:         sources[i%len(sources)],
			Reference:      fmt.Sprintf("REF-%06d", i+1),
			Status:         status,
			TotalAmount:    money(store, totalAmount),
			AuditInfo:      createAuditInfo(),
			Lines:          lines,
		}

		if status == fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_POSTED {
			entry.PostedBy = "mock-generator"
			entry.PostedDate = entryDate.AddDate(0, 0, 1).Unix()
		}

		entries[i] = entry
	}

	return entries
}
