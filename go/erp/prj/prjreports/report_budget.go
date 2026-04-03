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
package prjreports

import (
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"

	common "github.com/saichler/l8common/go/generic"
)

func generateProjectBudget(report *fin.FinReport, vnic ifs.IVNic) error {
	projects, err := common.GetEntities("PrjProj", 90, &prj.PrjProject{}, vnic)
	if err != nil {
		return err
	}

	section := &fin.FinReportSection{
		Title:        "Project Budget Summary",
		SectionTotal: &l8common.Money{Amount: 0, CurrencyId: "USD"},
	}

	var totalVariance int64
	for _, p := range projects {
		budget := moneyAmount(p.Budget)
		actual := moneyAmount(p.ActualCost)
		variance := budget - actual
		var pct float64
		if budget != 0 {
			pct = float64(variance) / float64(budget) * 100
		}

		line := &fin.FinReportLine{
			AccountId:       p.ProjectId,
			AccountNumber:   p.Code,
			AccountName:     p.Name,
			BudgetAmount:    p.Budget,
			Balance:         p.ActualCost,
			Variance:        &l8common.Money{Amount: variance, CurrencyId: "USD"},
			VariancePercent: pct,
			Description:     p.Status.String(),
		}
		section.Lines = append(section.Lines, line)
		totalVariance += variance
	}
	section.SectionTotal = &l8common.Money{Amount: totalVariance, CurrencyId: "USD"}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = int32(len(section.Lines))
	return nil
}

func moneyAmount(m *l8common.Money) int64 {
	if m == nil {
		return 0
	}
	return m.Amount
}
