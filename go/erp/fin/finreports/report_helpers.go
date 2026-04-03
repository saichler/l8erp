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
package finreports

import (
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
)

// moneyAmount safely extracts the amount from a Money pointer, returning 0 if nil.
func moneyAmount(m *l8common.Money) int64 {
	if m == nil {
		return 0
	}
	return m.Amount
}

// newMoney creates a new Money instance with the given amount and currency.
func newMoney(amount int64, currencyId string) *l8common.Money {
	return &l8common.Money{Amount: amount, CurrencyId: currencyId}
}

// addMoney adds two Money values, using the currency from the first non-nil operand.
func addMoney(a, b *l8common.Money) *l8common.Money {
	total := moneyAmount(a) + moneyAmount(b)
	cid := ""
	if a != nil {
		cid = a.CurrencyId
	} else if b != nil {
		cid = b.CurrencyId
	}
	return newMoney(total, cid)
}

// accountTypeName returns a human-readable label for an AccountType enum.
func accountTypeName(t fin.AccountType) string {
	switch t {
	case fin.AccountType_ACCOUNT_TYPE_ASSET:
		return "Assets"
	case fin.AccountType_ACCOUNT_TYPE_LIABILITY:
		return "Liabilities"
	case fin.AccountType_ACCOUNT_TYPE_EQUITY:
		return "Equity"
	case fin.AccountType_ACCOUNT_TYPE_REVENUE:
		return "Revenue"
	case fin.AccountType_ACCOUNT_TYPE_EXPENSE:
		return "Expenses"
	default:
		return "Other"
	}
}

// findBalance returns the AccountBalance matching the given fiscal period, or nil.
func findBalance(acct *fin.Account, periodId string) *fin.AccountBalance {
	for _, bal := range acct.Balances {
		if bal.FiscalPeriodId == periodId {
			return bal
		}
	}
	return nil
}

// countLines counts the total number of report lines across all sections.
func countLines(sections []*fin.FinReportSection) int32 {
	var n int32
	for _, s := range sections {
		n += int32(len(s.Lines))
	}
	return n
}
