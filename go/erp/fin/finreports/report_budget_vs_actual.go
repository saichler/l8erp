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
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func generateBudgetVsActual(report *fin.FinReport, vnic ifs.IVNic) error {
	budgetsRaw, err := common.GetEntities("Budget", 40, &fin.Budget{}, vnic)
	budgets := make([]*fin.Budget, 0, len(budgetsRaw))
	for _, ri := range budgetsRaw { budgets = append(budgets, ri.(*fin.Budget)) }
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId
	var sections []*fin.FinReportSection
	var grandTotal int64

	for _, budget := range budgets {
		if report.FiscalYearId != "" && budget.FiscalYearId != report.FiscalYearId {
			continue
		}
		if report.DepartmentId != "" && budget.DepartmentId != report.DepartmentId {
			continue
		}

		section := &fin.FinReportSection{
			Title:        budget.BudgetName,
			SectionTotal: newMoney(0, currencyId),
		}

		for _, bl := range budget.Lines {
			if report.FiscalPeriodId != "" && bl.FiscalPeriodId != report.FiscalPeriodId {
				continue
			}
			budgeted := moneyAmount(bl.BudgetedAmount)
			actual := moneyAmount(bl.ActualAmount)
			variance := budgeted - actual
			var variancePct float64
			if budgeted != 0 {
				variancePct = float64(variance) / float64(budgeted) * 100
			}

			line := &fin.FinReportLine{
				AccountId:       bl.AccountId,
				BudgetAmount:    bl.BudgetedAmount,
				Balance:         bl.ActualAmount,
				Variance:        newMoney(variance, currencyId),
				VariancePercent: variancePct,
			}
			section.Lines = append(section.Lines, line)
			section.SectionTotal = addMoney(section.SectionTotal, newMoney(variance, currencyId))
		}
		grandTotal += moneyAmount(section.SectionTotal)
		sections = append(sections, section)
	}

	report.Sections = sections
	report.GrandTotal = newMoney(grandTotal, currencyId)
	report.RowCount = countLines(report.Sections)
	return nil
}
