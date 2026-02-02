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

package budgettransfers

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type BudgetTransferServiceCallback struct{}

func newBudgetTransferServiceCallback() *BudgetTransferServiceCallback {
	return &BudgetTransferServiceCallback{}
}

func (this *BudgetTransferServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	budgetTransfer, ok := any.(*fin.BudgetTransfer)
	if !ok {
		return nil, false, errors.New("invalid budgetTransfer type")
	}
	err := validate(budgetTransfer, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BudgetTransferServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(budgetTransfer *fin.BudgetTransfer, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(budgetTransfer.TransferId, "TransferId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(budgetTransfer.FromBudgetLineId, "FromBudgetLineId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(budgetTransfer.ToBudgetLineId, "ToBudgetLineId"); err != nil {
		return err
	}
	return nil
}
