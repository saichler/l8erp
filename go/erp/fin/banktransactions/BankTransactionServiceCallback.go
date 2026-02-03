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

package banktransactions

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type BankTransactionServiceCallback struct{}

func newBankTransactionServiceCallback() *BankTransactionServiceCallback {
	return &BankTransactionServiceCallback{}
}

func (this *BankTransactionServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	bankTransaction, ok := any.(*fin.BankTransaction)
	if !ok {
		return nil, false, errors.New("invalid bankTransaction type")
	}
	if action == ifs.POST {
		common.GenerateID(&bankTransaction.TransactionId)
	}
	err := validate(bankTransaction, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BankTransactionServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(bankTransaction *fin.BankTransaction, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(bankTransaction.TransactionId, "TransactionId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(bankTransaction.BankAccountId, "BankAccountId"); err != nil {
		return err
	}
	return nil
}
