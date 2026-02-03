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
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type BudgetServiceCallback struct{}

func newBudgetServiceCallback() *BudgetServiceCallback {
	return &BudgetServiceCallback{}
}

func (this *BudgetServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	budget, ok := any.(*fin.Budget)
	if !ok {
		return nil, false, errors.New("invalid budget type")
	}
	if action == ifs.POST {
		common.GenerateID(&budget.BudgetId)
	}
	err := validate(budget, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BudgetServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(budget *fin.Budget, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(budget.BudgetId, "BudgetId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(budget.BudgetName, "BudgetName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(budget.FiscalYearId, "FiscalYearId"); err != nil {
		return err
	}
	return nil
}
