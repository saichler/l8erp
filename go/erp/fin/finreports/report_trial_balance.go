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
	common "github.com/saichler/l8common/go/generic"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func generateTrialBalance(report *fin.FinReport, vnic ifs.IVNic) error {
	accounts, err := common.GetEntities("Account", 40, &fin.Account{}, vnic)
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId
	section := &fin.FinReportSection{Title: "Trial Balance", SectionTotal: newMoney(0, currencyId)}
	var totalDebits, totalCredits int64

	for _, acct := range accounts {
		if !acct.IsActive {
			continue
		}
		bal := findBalance(acct, report.FiscalPeriodId)
		ending := endingBalanceOrZero(bal, currencyId)
		amount := moneyAmount(ending)

		line := &fin.FinReportLine{
			AccountId:     acct.AccountId,
			AccountNumber: acct.AccountNumber,
			AccountName:   acct.Name,
			Level:         acct.Level,
			IsHeader:      acct.IsHeader,
		}

		// Debit-normal accounts show ending balance in debit column;
		// credit-normal accounts show in credit column.
		if acct.NormalBalance == fin.BalanceType_BALANCE_TYPE_DEBIT {
			line.Debit = ending
			line.Credit = newMoney(0, currencyId)
			totalDebits += amount
		} else {
			line.Debit = newMoney(0, currencyId)
			line.Credit = ending
			totalCredits += amount
		}
		line.Balance = ending
		section.Lines = append(section.Lines, line)
	}

	section.SectionTotal = newMoney(totalDebits-totalCredits, currencyId)
	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = newMoney(totalDebits-totalCredits, currencyId)
	report.RowCount = countLines(report.Sections)
	return nil
}
