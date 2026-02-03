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

package exchangerates

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type ExchangeRateServiceCallback struct{}

func newExchangeRateServiceCallback() *ExchangeRateServiceCallback {
	return &ExchangeRateServiceCallback{}
}

func (this *ExchangeRateServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	exchangeRate, ok := any.(*fin.ExchangeRate)
	if !ok {
		return nil, false, errors.New("invalid exchangeRate type")
	}
	if action == ifs.POST {
		common.GenerateID(&exchangeRate.ExchangeRateId)
	}
	err := validate(exchangeRate, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *ExchangeRateServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(exchangeRate *fin.ExchangeRate, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(exchangeRate.ExchangeRateId, "ExchangeRateId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(exchangeRate.FromCurrencyId, "FromCurrencyId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(exchangeRate.ToCurrencyId, "ToCurrencyId"); err != nil {
		return err
	}
	return nil
}
