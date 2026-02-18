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
package budgets

import (
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newBudgetServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.Budget]("Budget",
		func(e *fin.Budget) { common.GenerateID(&e.BudgetId) }).
		StatusTransition(budgetTransitions()).
		Compute(computeBudgetTotals).
		Require(func(e *fin.Budget) string { return e.BudgetId }, "BudgetId").
		Require(func(e *fin.Budget) string { return e.BudgetName }, "BudgetName").
		Require(func(e *fin.Budget) string { return e.FiscalYearId }, "FiscalYearId").
		Enum(func(e *fin.Budget) int32 { return int32(e.BudgetType) }, fin.BudgetType_name, "BudgetType").
		Enum(func(e *fin.Budget) int32 { return int32(e.Status) }, fin.BudgetStatus_name, "Status").
		OptionalMoney(func(e *fin.Budget) *erp.Money { return e.TotalAmount }, "TotalAmount").
		Build()
}

func computeBudgetTotals(b *fin.Budget) error {
	b.TotalAmount = common.SumLineMoney(b.Lines, func(l *fin.BudgetLine) *erp.Money { return l.BudgetedAmount })
	for _, line := range b.Lines {
		line.Variance = common.MoneySubtract(line.BudgetedAmount, line.ActualAmount)
		if line.BudgetedAmount != nil && line.BudgetedAmount.Amount != 0 && line.Variance != nil {
			line.VariancePercent = float64(line.Variance.Amount) / float64(line.BudgetedAmount.Amount) * 100
		}
	}
	return nil
}

func budgetTransitions() *common.StatusTransitionConfig[fin.Budget] {
	return &common.StatusTransitionConfig[fin.Budget]{
		StatusGetter:  func(e *fin.Budget) int32 { return int32(e.Status) },
		StatusSetter:  func(e *fin.Budget, s int32) { e.Status = fin.BudgetStatus(s) },
		FilterBuilder: func(e *fin.Budget) *fin.Budget {
			return &fin.Budget{BudgetId: e.BudgetId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2},       // DRAFT → SUBMITTED
			2: {3},       // SUBMITTED → APPROVED
			3: {4},       // APPROVED → ACTIVE
			4: {5},       // ACTIVE → CLOSED
		},
		StatusNames: fin.BudgetStatus_name,
	}
}
