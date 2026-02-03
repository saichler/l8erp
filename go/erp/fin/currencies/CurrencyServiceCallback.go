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

package currencies

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type CurrencyServiceCallback struct{}

func newCurrencyServiceCallback() *CurrencyServiceCallback {
	return &CurrencyServiceCallback{}
}

func (this *CurrencyServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	currency, ok := any.(*fin.Currency)
	if !ok {
		return nil, false, errors.New("invalid currency type")
	}
	if action == ifs.POST {
		common.GenerateID(&currency.CurrencyId)
	}
	err := validate(currency, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CurrencyServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(currency *fin.Currency, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(currency.CurrencyId, "CurrencyId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(currency.Code, "Code"); err != nil {
		return err
	}
	if err := common.ValidateRequired(currency.Name, "Name"); err != nil {
		return err
	}
	return nil
}
