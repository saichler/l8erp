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
package journalentries

import (
	"fmt"
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func newJournalEntryServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.JournalEntry]("JournalEntry",
		func(e *fin.JournalEntry) { common.GenerateID(&e.JournalEntryId) }).
		StatusTransition(journalEntryTransitions()).
		Compute(computeJournalEntryTotals).
		Require(func(e *fin.JournalEntry) string { return e.JournalEntryId }, "JournalEntryId").
		Require(func(e *fin.JournalEntry) string { return e.FiscalPeriodId }, "FiscalPeriodId").
		Enum(func(e *fin.JournalEntry) int32 { return int32(e.Status) }, fin.JournalEntryStatus_name, "Status").
		OptionalMoney(func(e *fin.JournalEntry) *erp.Money { return e.TotalAmount }, "TotalAmount").
		Custom(validateLines).
		Custom(validatePeriodOpen).
		After(updateAccountBalances).
		Build()
}

func computeJournalEntryTotals(je *fin.JournalEntry) error {
	je.TotalAmount = common.SumLineMoney(je.Lines, func(l *fin.JournalEntryLine) *erp.Money { return l.DebitAmount })
	return nil
}

func journalEntryTransitions() *common.StatusTransitionConfig[fin.JournalEntry] {
	return &common.StatusTransitionConfig[fin.JournalEntry]{
		StatusGetter:  func(e *fin.JournalEntry) int32 { return int32(e.Status) },
		StatusSetter:  func(e *fin.JournalEntry, s int32) { e.Status = fin.JournalEntryStatus(s) },
		FilterBuilder: func(e *fin.JournalEntry) *fin.JournalEntry {
			return &fin.JournalEntry{JournalEntryId: e.JournalEntryId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2},    // DRAFT → POSTED
			2: {3, 4}, // POSTED → REVERSED, VOID
		},
		StatusNames: fin.JournalEntryStatus_name,
	}
}

// validateLines checks that each line has either DebitAmount or CreditAmount (not both),
// a non-empty AccountId, and when posting enforces double-entry balance.
func validateLines(je *fin.JournalEntry, _ ifs.IVNic) error {
	for i, line := range je.Lines {
		hasDebit := !common.MoneyIsZero(line.DebitAmount)
		hasCredit := !common.MoneyIsZero(line.CreditAmount)
		if !hasDebit && !hasCredit {
			return fmt.Errorf("line %d: must have either DebitAmount or CreditAmount", i+1)
		}
		if hasDebit && hasCredit {
			return fmt.Errorf("line %d: cannot have both DebitAmount and CreditAmount", i+1)
		}
		if line.AccountId == "" {
			return fmt.Errorf("line %d: AccountId is required", i+1)
		}
	}
	if je.Status == fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_POSTED {
		if len(je.Lines) < 2 {
			return fmt.Errorf("posted journal entry must have at least 2 lines")
		}
		totalDebit := int64(0)
		totalCredit := int64(0)
		for _, line := range je.Lines {
			totalDebit += common.MoneyAmount(line.DebitAmount)
			totalCredit += common.MoneyAmount(line.CreditAmount)
		}
		if totalDebit != totalCredit {
			return fmt.Errorf("double-entry violation: total debits (%d) must equal total credits (%d)",
				totalDebit, totalCredit)
		}
	}
	return nil
}

// validatePeriodOpen ensures the fiscal period is OPEN before posting a journal entry.
func validatePeriodOpen(je *fin.JournalEntry, vnic ifs.IVNic) error {
	if je.Status != fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_POSTED {
		return nil
	}
	period, err := findFiscalPeriod(je.FiscalPeriodId, vnic)
	if err != nil {
		return err
	}
	if period.Status != fin.FiscalPeriodStatus_FISCAL_PERIOD_STATUS_OPEN {
		statusName := fin.FiscalPeriodStatus_name[int32(period.Status)]
		return fmt.Errorf("cannot post to fiscal period %s: period is %s",
			period.PeriodName, statusName)
	}
	return nil
}

// findFiscalPeriod searches all FiscalYears' embedded Periods to find a period by ID.
func findFiscalPeriod(periodId string, vnic ifs.IVNic) (*fin.FiscalPeriod, error) {
	years, err := common.GetEntities("FiscalYr", 40, &fin.FiscalYear{}, vnic)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch fiscal years: %w", err)
	}
	for _, year := range years {
		for _, period := range year.Periods {
			if period.FiscalPeriodId == periodId {
				return period, nil
			}
		}
	}
	return nil, fmt.Errorf("fiscal period %s not found", periodId)
}

// updateAccountBalances updates Account.Balances when a journal entry is posted.
func updateAccountBalances(je *fin.JournalEntry, _ ifs.Action, vnic ifs.IVNic) error {
	if je.Status != fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_POSTED {
		return nil
	}
	for _, line := range je.Lines {
		account, err := common.GetEntity("Account", 40,
			&fin.Account{AccountId: line.AccountId}, vnic)
		if err != nil {
			return fmt.Errorf("failed to fetch account %s: %w", line.AccountId, err)
		}
		if account == nil {
			return fmt.Errorf("account %s not found", line.AccountId)
		}
		bal := findOrCreateBalance(account, je.FiscalPeriodId)
		debit := common.MoneyAmount(line.DebitAmount)
		credit := common.MoneyAmount(line.CreditAmount)
		addToMoney(&bal.PeriodDebit, debit, account.CurrencyId)
		addToMoney(&bal.PeriodCredit, credit, account.CurrencyId)
		recomputeEndingBalance(bal, account.NormalBalance, account.CurrencyId)
		if err := common.PutEntity("Account", 40, account, vnic); err != nil {
			return fmt.Errorf("failed to update account %s: %w", line.AccountId, err)
		}
	}
	return nil
}

// findOrCreateBalance finds the AccountBalance for a fiscal period, or creates one.
func findOrCreateBalance(account *fin.Account, fiscalPeriodId string) *fin.AccountBalance {
	for _, bal := range account.Balances {
		if bal.FiscalPeriodId == fiscalPeriodId {
			return bal
		}
	}
	bal := &fin.AccountBalance{
		AccountId:      account.AccountId,
		FiscalPeriodId: fiscalPeriodId,
	}
	common.GenerateID(&bal.BalanceId)
	account.Balances = append(account.Balances, bal)
	return bal
}

// addToMoney adds an amount to a Money field, creating it if nil.
func addToMoney(m **erp.Money, amount int64, currencyId string) {
	if amount == 0 {
		return
	}
	if *m == nil {
		*m = &erp.Money{Amount: amount, CurrencyId: currencyId}
	} else {
		(*m).Amount += amount
	}
}

// recomputeEndingBalance recalculates ending balance based on account's normal balance type.
// DEBIT normal: ending = beginning + debit - credit
// CREDIT normal: ending = beginning - debit + credit
func recomputeEndingBalance(bal *fin.AccountBalance, normalBalance fin.BalanceType, currencyId string) {
	beginning := common.MoneyAmount(bal.BeginningBalance)
	debit := common.MoneyAmount(bal.PeriodDebit)
	credit := common.MoneyAmount(bal.PeriodCredit)
	var ending int64
	if normalBalance == fin.BalanceType_BALANCE_TYPE_CREDIT {
		ending = beginning - debit + credit
	} else {
		ending = beginning + debit - credit
	}
	bal.EndingBalance = &erp.Money{Amount: ending, CurrencyId: currencyId}
}
