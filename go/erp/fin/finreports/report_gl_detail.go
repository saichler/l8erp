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
	"fmt"

	common "github.com/saichler/l8common/go/generic"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func generateGLDetail(report *fin.FinReport, vnic ifs.IVNic) error {
	if report.AccountId == "" {
		return fmt.Errorf("AccountId is required for GL Detail report")
	}

	entries, err := common.GetEntities("JrnlEntry", 40, &fin.JournalEntry{}, vnic)
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId
	section := &fin.FinReportSection{
		Title:        "GL Detail - " + report.AccountId,
		SectionTotal: newMoney(0, currencyId),
	}
	var totalDebits, totalCredits int64

	for _, entry := range entries {
		if report.FiscalPeriodId != "" && entry.FiscalPeriodId != report.FiscalPeriodId {
			continue
		}
		for _, jl := range entry.Lines {
			if jl.AccountId != report.AccountId {
				continue
			}
			debit := moneyAmount(jl.DebitAmount)
			credit := moneyAmount(jl.CreditAmount)

			line := &fin.FinReportLine{
				AccountId:   jl.AccountId,
				EntryDate:   entry.EntryDate,
				Reference:   entry.Reference,
				Description: jl.Description,
				Debit:       jl.DebitAmount,
				Credit:      jl.CreditAmount,
				Balance:     newMoney(debit-credit, currencyId),
			}
			section.Lines = append(section.Lines, line)
			totalDebits += debit
			totalCredits += credit
		}
	}

	section.SectionTotal = newMoney(totalDebits-totalCredits, currencyId)
	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = newMoney(totalDebits-totalCredits, currencyId)
	report.RowCount = countLines(report.Sections)
	return nil
}
