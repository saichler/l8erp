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
	l8c "github.com/saichler/l8common/go/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
)

func computeProjectBudget(v interface{}) error {
	pb := v.(*prj.PrjProjectBudget)
	pb.RemainingAmount = l8c.MoneySubtract(pb.BudgetedAmount, pb.ActualAmount)
	pb.RemainingHours = pb.BudgetedHours - pb.ActualHours
	return nil
}

func newPrjProjectBudgetServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&prj.PrjProjectBudget{}, vnic).
		Compute(computeProjectBudget).
		Require(func(v interface{}) string { return v.(*prj.PrjProjectBudget).BudgetId }, "BudgetId").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProjectBudget).BudgetedAmount }, "BudgetedAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProjectBudget).CommittedAmount }, "CommittedAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProjectBudget).ActualAmount }, "ActualAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProjectBudget).RemainingAmount }, "RemainingAmount").
		Build()
}
