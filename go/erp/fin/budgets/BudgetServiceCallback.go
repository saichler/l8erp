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
	"reflect"
	l8c "github.com/saichler/l8common/go/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)


func toSlice(slice interface{}) []interface{} {
	v := reflect.ValueOf(slice)
	result := make([]interface{}, v.Len())
	for i := 0; i < v.Len(); i++ {
		result[i] = v.Index(i).Interface()
	}
	return result
}

func newBudgetServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.Budget{}, vnic).
		StatusTransition(budgetTransitions()).
		Compute(computeBudgetTotals).
		Require(func(v interface{}) string { return v.(*fin.Budget).BudgetId }, "BudgetId").
		Require(func(v interface{}) string { return v.(*fin.Budget).BudgetName }, "BudgetName").
		Require(func(v interface{}) string { return v.(*fin.Budget).FiscalYearId }, "FiscalYearId").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.Budget).BudgetType) }, fin.BudgetType_name, "BudgetType").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.Budget).Status) }, fin.BudgetStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.Budget).TotalAmount }, "TotalAmount").
		Build()
}

func computeBudgetTotals(v interface{}) error {
	b := v.(*fin.Budget)
	b.TotalAmount = l8c.SumLineMoney(toSlice(b.Lines), func(v interface{}) *l8common.Money { return v.(*fin.BudgetLine).BudgetedAmount })
	for _, line := range b.Lines {
		line.Variance = l8c.MoneySubtract(line.BudgetedAmount, line.ActualAmount)
		if line.BudgetedAmount != nil && line.BudgetedAmount.Amount != 0 && line.Variance != nil {
			line.VariancePercent = float64(line.Variance.Amount) / float64(line.BudgetedAmount.Amount) * 100
		}
	}
	return nil
}

func budgetTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*fin.Budget).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*fin.Budget).Status = fin.BudgetStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*fin.Budget);
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
