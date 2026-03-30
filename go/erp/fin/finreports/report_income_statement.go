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
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func generateIncomeStatement(report *fin.FinReport, vnic ifs.IVNic) error {
	accounts, err := common.GetEntities("Account", 40, &fin.Account{}, vnic)
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId
	revenueSection := &fin.FinReportSection{Title: "Revenue", SectionTotal: newMoney(0, currencyId)}
	expenseSection := &fin.FinReportSection{Title: "Expenses", SectionTotal: newMoney(0, currencyId)}

	for _, acct := range accounts {
		if !acct.IsActive {
			continue
		}
		var section *fin.FinReportSection
		switch acct.AccountType {
		case fin.AccountType_ACCOUNT_TYPE_REVENUE:
			section = revenueSection
		case fin.AccountType_ACCOUNT_TYPE_EXPENSE:
			section = expenseSection
		default:
			continue
		}

		bal := findBalance(acct, report.FiscalPeriodId)
		activity := periodActivity(bal, acct.AccountType, currencyId)

		line := &fin.FinReportLine{
			AccountId:     acct.AccountId,
			AccountNumber: acct.AccountNumber,
			AccountName:   acct.Name,
			Level:         acct.Level,
			IsHeader:      acct.IsHeader,
			Debit:         periodDebitOrZero(bal, currencyId),
			Credit:        periodCreditOrZero(bal, currencyId),
			Balance:       activity,
		}
		section.Lines = append(section.Lines, line)
		section.SectionTotal = addMoney(section.SectionTotal, activity)
	}

	netIncome := moneyAmount(revenueSection.SectionTotal) - moneyAmount(expenseSection.SectionTotal)
	report.Sections = []*fin.FinReportSection{revenueSection, expenseSection}
	report.GrandTotal = newMoney(netIncome, currencyId)
	report.RowCount = countLines(report.Sections)
	return nil
}

// periodActivity returns the net activity for a period based on account type.
// Revenue accounts: credits - debits. Expense accounts: debits - credits.
func periodActivity(bal *fin.AccountBalance, acctType fin.AccountType, currencyId string) *erp.Money {
	if bal == nil {
		return newMoney(0, currencyId)
	}
	debit := moneyAmount(bal.PeriodDebit)
	credit := moneyAmount(bal.PeriodCredit)
	if acctType == fin.AccountType_ACCOUNT_TYPE_REVENUE {
		return newMoney(credit-debit, currencyId)
	}
	return newMoney(debit-credit, currencyId)
}

func periodDebitOrZero(bal *fin.AccountBalance, currencyId string) *erp.Money {
	if bal != nil && bal.PeriodDebit != nil {
		return bal.PeriodDebit
	}
	return newMoney(0, currencyId)
}

func periodCreditOrZero(bal *fin.AccountBalance, currencyId string) *erp.Money {
	if bal != nil && bal.PeriodCredit != nil {
		return bal.PeriodCredit
	}
	return newMoney(0, currencyId)
}
