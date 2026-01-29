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

package fiscalyears

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type FiscalYearServiceCallback struct{}

func newFiscalYearServiceCallback() *FiscalYearServiceCallback {
	return &FiscalYearServiceCallback{}
}

func (this *FiscalYearServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	fiscalYear, ok := any.(*fin.FiscalYear)
	if !ok {
		return nil, false, errors.New("invalid fiscalYear type")
	}
	err := validate(fiscalYear, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *FiscalYearServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(fiscalYear *fin.FiscalYear, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(fiscalYear.YearName, "YearName"); err != nil {
		return err
	}
	return nil
}
