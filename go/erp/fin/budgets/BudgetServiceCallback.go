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
		Require(func(e *fin.Budget) string { return e.BudgetId }, "BudgetId").
		Require(func(e *fin.Budget) string { return e.BudgetName }, "BudgetName").
		Require(func(e *fin.Budget) string { return e.FiscalYearId }, "FiscalYearId").
		Enum(func(e *fin.Budget) int32 { return int32(e.BudgetType) }, fin.BudgetType_name, "BudgetType").
		Enum(func(e *fin.Budget) int32 { return int32(e.Status) }, fin.BudgetStatus_name, "Status").
		OptionalMoney(func(e *fin.Budget) *erp.Money { return e.TotalAmount }, "TotalAmount").
		Build()
}
