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

package accountbalances

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type AccountBalanceServiceCallback struct{}

func newAccountBalanceServiceCallback() *AccountBalanceServiceCallback {
	return &AccountBalanceServiceCallback{}
}

func (this *AccountBalanceServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	accountBalance, ok := any.(*fin.AccountBalance)
	if !ok {
		return nil, false, errors.New("invalid accountBalance type")
	}
	err := validate(accountBalance, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *AccountBalanceServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(accountBalance *fin.AccountBalance, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(accountBalance.AccountId, "AccountId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(accountBalance.FiscalPeriodId, "FiscalPeriodId"); err != nil {
		return err
	}
	return nil
}
