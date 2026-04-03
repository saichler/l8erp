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
	common "github.com/saichler/l8erp/go/erp/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func generateBalanceSheet(report *fin.FinReport, vnic ifs.IVNic) error {
	accountsRaw, err := common.GetEntities("Account", 40, &fin.Account{}, vnic)
	accounts := make([]*fin.Account, 0, len(accountsRaw))
	for _, ri := range accountsRaw { accounts = append(accounts, ri.(*fin.Account)) }
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId
	assetSection := &fin.FinReportSection{Title: "Assets", SectionTotal: newMoney(0, currencyId)}
	liabSection := &fin.FinReportSection{Title: "Liabilities", SectionTotal: newMoney(0, currencyId)}
	equitySection := &fin.FinReportSection{Title: "Equity", SectionTotal: newMoney(0, currencyId)}

	for _, acct := range accounts {
		if !acct.IsActive {
			continue
		}
		section := sectionForAccountType(acct.AccountType, assetSection, liabSection, equitySection)
		if section == nil {
			continue
		}
		bal := findBalance(acct, report.FiscalPeriodId)
		ending := endingBalanceOrZero(bal, currencyId)

		line := &fin.FinReportLine{
			AccountId:     acct.AccountId,
			AccountNumber: acct.AccountNumber,
			AccountName:   acct.Name,
			Level:         acct.Level,
			IsHeader:      acct.IsHeader,
			Balance:       ending,
		}
		section.Lines = append(section.Lines, line)
		section.SectionTotal = addMoney(section.SectionTotal, ending)
	}

	report.Sections = []*fin.FinReportSection{assetSection, liabSection, equitySection}
	report.GrandTotal = newMoney(
		moneyAmount(assetSection.SectionTotal)-
			moneyAmount(liabSection.SectionTotal)-
			moneyAmount(equitySection.SectionTotal),
		currencyId,
	)
	report.RowCount = countLines(report.Sections)
	return nil
}

func sectionForAccountType(
	t fin.AccountType,
	assets, liabilities, equity *fin.FinReportSection,
) *fin.FinReportSection {
	switch t {
	case fin.AccountType_ACCOUNT_TYPE_ASSET:
		return assets
	case fin.AccountType_ACCOUNT_TYPE_LIABILITY:
		return liabilities
	case fin.AccountType_ACCOUNT_TYPE_EQUITY:
		return equity
	default:
		return nil
	}
}

func endingBalanceOrZero(bal *fin.AccountBalance, currencyId string) *l8common.Money {
	if bal != nil && bal.EndingBalance != nil {
		return bal.EndingBalance
	}
	return newMoney(0, currencyId)
}
