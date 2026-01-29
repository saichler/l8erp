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

package taxrules

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type TaxRuleServiceCallback struct{}

func newTaxRuleServiceCallback() *TaxRuleServiceCallback {
	return &TaxRuleServiceCallback{}
}

func (this *TaxRuleServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	taxRule, ok := any.(*fin.TaxRule)
	if !ok {
		return nil, false, errors.New("invalid taxRule type")
	}
	err := validate(taxRule, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *TaxRuleServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(taxRule *fin.TaxRule, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(taxRule.TaxCodeId, "TaxCodeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(taxRule.JurisdictionId, "JurisdictionId"); err != nil {
		return err
	}
	return nil
}
