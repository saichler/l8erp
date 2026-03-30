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
package crmreports

import (
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"

	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
)

func generateOpportunityPipeline(report *fin.FinReport, vnic ifs.IVNic) error {
	opps, err := common.GetEntities("CrmOpp", 80, &crm.CrmOpportunity{}, vnic)
	if err != nil {
		return err
	}

	type stageGroup struct {
		count   int32
		total   int64
		weighted int64
	}
	groups := make(map[crm.CrmSalesStage]*stageGroup)

	for _, opp := range opps {
		g, ok := groups[opp.Stage]
		if !ok {
			g = &stageGroup{}
			groups[opp.Stage] = g
		}
		g.count++
		amt := moneyAmount(opp.Amount)
		g.total += amt
		g.weighted += amt * int64(opp.Probability) / 100
	}

	section := &fin.FinReportSection{
		Title:        "Opportunity Pipeline",
		SectionTotal: &erp.Money{Amount: 0, CurrencyId: "USD"},
	}

	var grandTotal, weightedTotal int64
	for stage, g := range groups {
		line := &fin.FinReportLine{
			AccountName: stage.String(),
			Description: stage.String(),
			Level:       g.count,
			Balance:     &erp.Money{Amount: g.total, CurrencyId: "USD"},
			Variance:    &erp.Money{Amount: g.weighted, CurrencyId: "USD"},
		}
		section.Lines = append(section.Lines, line)
		grandTotal += g.total
		weightedTotal += g.weighted
	}
	section.SectionTotal = &erp.Money{Amount: grandTotal, CurrencyId: "USD"}

	// Add weighted pipeline summary line
	section.Lines = append(section.Lines, &fin.FinReportLine{
		AccountName: "Weighted Pipeline Total",
		IsHeader:    true,
		Balance:     &erp.Money{Amount: weightedTotal, CurrencyId: "USD"},
	})

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = &erp.Money{Amount: grandTotal, CurrencyId: "USD"}
	report.RowCount = int32(len(section.Lines))
	return nil
}

func moneyAmount(m *erp.Money) int64 {
	if m == nil {
		return 0
	}
	return m.Amount
}
