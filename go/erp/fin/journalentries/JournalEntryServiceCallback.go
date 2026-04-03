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
	"reflect"
	l8c "github.com/saichler/l8common/go/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)


func toSlice(slice interface{}) []interface{} {
	v := reflect.ValueOf(slice)
	result := make([]interface{}, v.Len())
	for i := 0; i < v.Len(); i++ {
		result[i] = v.Index(i).Interface()
	}
	return result
}

func newJournalEntryServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.JournalEntry{}, vnic).
		StatusTransition(journalEntryTransitions()).
		Compute(computeJournalEntryTotals).
		Require(func(v interface{}) string { return v.(*fin.JournalEntry).JournalEntryId }, "JournalEntryId").
		Require(func(v interface{}) string { return v.(*fin.JournalEntry).FiscalPeriodId }, "FiscalPeriodId").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.JournalEntry).Status) }, fin.JournalEntryStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.JournalEntry).TotalAmount }, "TotalAmount").
		Custom(validateLines).
		Custom(validatePeriodOpen).
		After(updateAccountBalances).
		Build()
}

func computeJournalEntryTotals(v interface{}) error {
	je := v.(*fin.JournalEntry)
	je.TotalAmount = l8c.SumLineMoney(toSlice(je.Lines), func(v interface{}) *l8common.Money { return v.(*fin.JournalEntryLine).DebitAmount })
	return nil
}

func journalEntryTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*fin.JournalEntry).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*fin.JournalEntry).Status = fin.JournalEntryStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*fin.JournalEntry);
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
func validateLines(v interface{}, _ ifs.IVNic) error {
	je := v.(*fin.JournalEntry)
	for i, line := range je.Lines {
		hasDebit := !l8c.MoneyIsZero(line.DebitAmount)
		hasCredit := !l8c.MoneyIsZero(line.CreditAmount)
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
			totalDebit += l8c.MoneyAmount(line.DebitAmount)
			totalCredit += l8c.MoneyAmount(line.CreditAmount)
		}
		if totalDebit != totalCredit {
			return fmt.Errorf("double-entry violation: total debits (%d) must equal total credits (%d)",
				totalDebit, totalCredit)
		}
	}
	return nil
}

// validatePeriodOpen ensures the fiscal period is OPEN before posting a journal entry.
func validatePeriodOpen(v interface{}, vnic ifs.IVNic) error {
	je := v.(*fin.JournalEntry)
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
	yearsRaw, err := common.GetEntities("FiscalYr", 40, &fin.FiscalYear{}, vnic)
	years := make([]*fin.FiscalYear, 0, len(yearsRaw))
	for _, ri := range yearsRaw { years = append(years, ri.(*fin.FiscalYear)) }
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
func updateAccountBalances(v interface{}, _ ifs.Action, vnic ifs.IVNic) error {
	je := v.(*fin.JournalEntry)
	if je.Status != fin.JournalEntryStatus_JOURNAL_ENTRY_STATUS_POSTED {
		return nil
	}
	for _, line := range je.Lines {
		accountRaw, err := common.GetEntity("Account", 40,
			&fin.Account{AccountId: line.AccountId}, vnic)
		if err != nil {
			return fmt.Errorf("failed to fetch account %s: %w", line.AccountId, err)
		}
		if accountRaw == nil {
			return fmt.Errorf("account %s not found", line.AccountId)
		}
		account := accountRaw.(*fin.Account)
		bal := findOrCreateBalance(account, je.FiscalPeriodId)
		debit := l8c.MoneyAmount(line.DebitAmount)
		credit := l8c.MoneyAmount(line.CreditAmount)
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
func addToMoney(m **l8common.Money, amount int64, currencyId string) {
	if amount == 0 {
		return
	}
	if *m == nil {
		*m = &l8common.Money{Amount: amount, CurrencyId: currencyId}
	} else {
		(*m).Amount += amount
	}
}

// recomputeEndingBalance recalculates ending balance based on account's normal balance type.
// DEBIT normal: ending = beginning + debit - credit
// CREDIT normal: ending = beginning - debit + credit
func recomputeEndingBalance(bal *fin.AccountBalance, normalBalance fin.BalanceType, currencyId string) {
	beginning := l8c.MoneyAmount(bal.BeginningBalance)
	debit := l8c.MoneyAmount(bal.PeriodDebit)
	credit := l8c.MoneyAmount(bal.PeriodCredit)
	var ending int64
	if normalBalance == fin.BalanceType_BALANCE_TYPE_CREDIT {
		ending = beginning - debit + credit
	} else {
		ending = beginning + debit - credit
	}
	bal.EndingBalance = &l8common.Money{Amount: ending, CurrencyId: currencyId}
}
