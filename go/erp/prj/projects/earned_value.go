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
package projects

import (
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/prj"
)

// computeEarnedValue recalculates EVM metrics for each earned value record
// embedded in the project.
func computeEarnedValue(p *prj.PrjProject) error {
	if len(p.EarnedValues) == 0 || p.Budget == nil || p.Budget.Amount == 0 {
		return nil
	}
	bac := p.Budget.Amount
	currency := p.Budget.CurrencyId
	for _, ev := range p.EarnedValues {
		ev.BudgetAtCompletion = &erp.Money{Amount: bac, CurrencyId: currency}
		// PV = scheduled % complete × BAC
		if ev.PlannedValue == nil {
			ev.PlannedValue = &erp.Money{CurrencyId: currency}
		}
		// EV = actual % complete × BAC
		pctComplete := ev.PercentComplete
		if pctComplete == 0 && p.PercentComplete > 0 {
			pctComplete = float64(p.PercentComplete)
		}
		evAmount := int64(pctComplete / 100 * float64(bac))
		ev.EarnedValue = &erp.Money{Amount: evAmount, CurrencyId: currency}
		pvAmount := ev.PlannedValue.Amount
		acAmount := int64(0)
		if ev.ActualCost != nil {
			acAmount = ev.ActualCost.Amount
		}
		// SV = EV - PV
		ev.ScheduleVariance = &erp.Money{Amount: evAmount - pvAmount, CurrencyId: currency}
		// CV = EV - AC
		ev.CostVariance = &erp.Money{Amount: evAmount - acAmount, CurrencyId: currency}
		// SPI = EV / PV
		if pvAmount > 0 {
			ev.SchedulePerformanceIndex = float64(evAmount) / float64(pvAmount)
		}
		// CPI = EV / AC
		if acAmount > 0 {
			ev.CostPerformanceIndex = float64(evAmount) / float64(acAmount)
			// EAC = BAC / CPI
			eac := int64(float64(bac) / ev.CostPerformanceIndex)
			ev.EstimateAtCompletion = &erp.Money{Amount: eac, CurrencyId: currency}
			// ETC = EAC - AC
			ev.EstimateToComplete = &erp.Money{Amount: eac - acAmount, CurrencyId: currency}
			// VAC = BAC - EAC
			ev.VarianceAtCompletion = &erp.Money{Amount: bac - eac, CurrencyId: currency}
		}
		// Percent spent
		if bac > 0 {
			ev.PercentSpent = float64(acAmount) / float64(bac) * 100
		}
		// TCPI = (BAC - EV) / (BAC - AC)
		denominator := bac - acAmount
		if denominator > 0 {
			ev.ToCompletePerformanceIndex = float64(bac-evAmount) / float64(denominator)
		}
	}
	// Sum actual hours from tasks
	totalActual := float64(0)
	for _, t := range p.Tasks {
		totalActual += t.ActualHours
	}
	p.ActualHours = totalActual
	// Sum actual cost from expenses
	if p.ActualCost != nil {
		common.MoneyAdd(p.ActualCost, &erp.Money{Amount: 0, CurrencyId: currency})
	}
	return nil
}
