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
package mfgreports

import (
	common "github.com/saichler/l8common/go/generic"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

func generateProductionEfficiency(report *fin.FinReport, vnic ifs.IVNic) error {
	orders, err := common.GetEntities("MfgWorkOrd", 70, &mfg.MfgWorkOrder{}, vnic)
	if err != nil {
		return err
	}

	section := &fin.FinReportSection{
		Title:        "Production Efficiency",
		SectionTotal: &l8common.Money{Amount: 0, CurrencyId: "USD"},
	}

	var totalVariance int64
	var count int32
	for _, wo := range orders {
		if wo.Status != mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_COMPLETED &&
			wo.Status != mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_CLOSED {
			continue
		}
		estimated := moneyAmount(wo.EstimatedCost)
		actual := moneyAmount(wo.ActualCost)
		variance := actual - estimated
		var pct float64
		if estimated != 0 {
			pct = float64(variance) / float64(estimated) * 100
		}

		line := &fin.FinReportLine{
			AccountId:       wo.WorkOrderId,
			AccountNumber:   wo.WorkOrderNumber,
			AccountName:     wo.WorkOrderNumber,
			BudgetAmount:    wo.EstimatedCost,
			Balance:         wo.ActualCost,
			Variance:        &l8common.Money{Amount: variance, CurrencyId: "USD"},
			VariancePercent: pct,
		}
		section.Lines = append(section.Lines, line)
		totalVariance += variance
		count++
	}
	section.SectionTotal = &l8common.Money{Amount: totalVariance, CurrencyId: "USD"}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = count
	return nil
}

func generateScrapRate(report *fin.FinReport, vnic ifs.IVNic) error {
	orders, err := common.GetEntities("MfgWorkOrd", 70, &mfg.MfgWorkOrder{}, vnic)
	if err != nil {
		return err
	}

	section := &fin.FinReportSection{
		Title:        "Scrap Rate Analysis",
		SectionTotal: &l8common.Money{Amount: 0, CurrencyId: "USD"},
	}

	var totalOrdered, totalScrapped float64
	for _, wo := range orders {
		if wo.QuantityOrdered == 0 {
			continue
		}
		scrapPct := wo.QuantityScrapped / wo.QuantityOrdered * 100
		line := &fin.FinReportLine{
			AccountId:       wo.WorkOrderId,
			AccountNumber:   wo.WorkOrderNumber,
			AccountName:     wo.WorkOrderNumber,
			Description:     wo.Status.String(),
			VariancePercent: scrapPct,
		}
		section.Lines = append(section.Lines, line)
		totalOrdered += wo.QuantityOrdered
		totalScrapped += wo.QuantityScrapped
	}

	var overallRate float64
	if totalOrdered > 0 {
		overallRate = totalScrapped / totalOrdered * 100
	}
	section.SectionTotal = &l8common.Money{Amount: int64(overallRate * 100), CurrencyId: "USD"}

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
