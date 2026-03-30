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
	"fmt"

	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"

	"github.com/saichler/l8erp/go/erp/common"
)

func generateResourceUtilization(report *fin.FinReport, vnic ifs.IVNic) error {
	resources, err := common.GetEntities("PrjRes", 90, &prj.PrjResource{}, vnic)
	if err != nil {
		return err
	}

	section := &fin.FinReportSection{
		Title:        "Resource Utilization",
		SectionTotal: &erp.Money{Amount: 0, CurrencyId: "USD"},
	}

	var totalCost int64
	for _, r := range resources {
		if !r.IsActive {
			continue
		}
		utilization := 100.0 - r.AvailabilityPercent

		line := &fin.FinReportLine{
			AccountId:       r.ResourceId,
			AccountName:     r.Name,
			Description:     fmt.Sprintf("%.0f hrs/wk", r.CapacityHoursPerWeek),
			VariancePercent: utilization,
			Balance:         r.HourlyCost,
			Variance:        r.BillingRate,
		}
		section.Lines = append(section.Lines, line)
		totalCost += moneyAmount(r.HourlyCost)
	}
	section.SectionTotal = &erp.Money{Amount: totalCost, CurrencyId: "USD"}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = int32(len(section.Lines))
	return nil
}

func generateMilestoneTracking(report *fin.FinReport, vnic ifs.IVNic) error {
	projects, err := common.GetEntities("PrjProj", 90, &prj.PrjProject{}, vnic)
	if err != nil {
		return err
	}

	section := &fin.FinReportSection{
		Title:        "Milestone Tracking",
		SectionTotal: &erp.Money{Amount: 0, CurrencyId: "USD"},
	}

	for _, p := range projects {
		line := &fin.FinReportLine{
			AccountId:       p.ProjectId,
			AccountNumber:   p.Code,
			AccountName:     p.Name,
			Level:           p.PercentComplete,
			Description:     p.Status.String(),
			BudgetAmount:    p.Budget,
			Balance:         p.ActualCost,
			VariancePercent: float64(p.PercentComplete),
		}
		if p.EndDate > 0 {
			line.EntryDate = p.EndDate
		}
		section.Lines = append(section.Lines, line)
	}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = &erp.Money{Amount: int64(len(section.Lines)), CurrencyId: "USD"}
	report.RowCount = int32(len(section.Lines))
	return nil
}
