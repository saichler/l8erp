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

package fundtransfers

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type FundTransferServiceCallback struct{}

func newFundTransferServiceCallback() *FundTransferServiceCallback {
	return &FundTransferServiceCallback{}
}

func (this *FundTransferServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	fundTransfer, ok := any.(*fin.FundTransfer)
	if !ok {
		return nil, false, errors.New("invalid fundTransfer type")
	}
	err := validate(fundTransfer, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *FundTransferServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(fundTransfer *fin.FundTransfer, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(fundTransfer.FromBankAccountId, "FromBankAccountId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(fundTransfer.ToBankAccountId, "ToBankAccountId"); err != nil {
		return err
	}
	return nil
}
