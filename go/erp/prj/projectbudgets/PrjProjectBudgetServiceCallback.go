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
package projectbudgets

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/prj"
)

func computeProjectBudget(pb *prj.PrjProjectBudget) error {
	pb.RemainingAmount = common.MoneySubtract(pb.BudgetedAmount, pb.ActualAmount)
	pb.RemainingHours = pb.BudgetedHours - pb.ActualHours
	return nil
}

func newPrjProjectBudgetServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[prj.PrjProjectBudget]("PrjProjectBudget",
		func(e *prj.PrjProjectBudget) { common.GenerateID(&e.BudgetId) }).
		Compute(computeProjectBudget).
		Require(func(e *prj.PrjProjectBudget) string { return e.BudgetId }, "BudgetId").
		OptionalMoney(func(e *prj.PrjProjectBudget) *erp.Money { return e.BudgetedAmount }, "BudgetedAmount").
		OptionalMoney(func(e *prj.PrjProjectBudget) *erp.Money { return e.CommittedAmount }, "CommittedAmount").
		OptionalMoney(func(e *prj.PrjProjectBudget) *erp.Money { return e.ActualAmount }, "ActualAmount").
		OptionalMoney(func(e *prj.PrjProjectBudget) *erp.Money { return e.RemainingAmount }, "RemainingAmount").
		Build()
}
