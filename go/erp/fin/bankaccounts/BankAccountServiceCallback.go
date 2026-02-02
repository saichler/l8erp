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

package bankaccounts

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type BankAccountServiceCallback struct{}

func newBankAccountServiceCallback() *BankAccountServiceCallback {
	return &BankAccountServiceCallback{}
}

func (this *BankAccountServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	bankAccount, ok := any.(*fin.BankAccount)
	if !ok {
		return nil, false, errors.New("invalid bankAccount type")
	}
	err := validate(bankAccount, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BankAccountServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(bankAccount *fin.BankAccount, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(bankAccount.BankAccountId, "BankAccountId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(bankAccount.AccountName, "AccountName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(bankAccount.BankName, "BankName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(bankAccount.GlAccountId, "GlAccountId"); err != nil {
		return err
	}
	return nil
}
