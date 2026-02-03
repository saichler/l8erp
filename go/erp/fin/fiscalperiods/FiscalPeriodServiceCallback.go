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

package fiscalperiods

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type FiscalPeriodServiceCallback struct{}

func newFiscalPeriodServiceCallback() *FiscalPeriodServiceCallback {
	return &FiscalPeriodServiceCallback{}
}

func (this *FiscalPeriodServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	fiscalPeriod, ok := any.(*fin.FiscalPeriod)
	if !ok {
		return nil, false, errors.New("invalid fiscalPeriod type")
	}
	if action == ifs.POST {
		common.GenerateID(&fiscalPeriod.FiscalPeriodId)
	}
	err := validate(fiscalPeriod, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *FiscalPeriodServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(fiscalPeriod *fin.FiscalPeriod, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(fiscalPeriod.FiscalPeriodId, "FiscalPeriodId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(fiscalPeriod.FiscalYearId, "FiscalYearId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(fiscalPeriod.PeriodName, "PeriodName"); err != nil {
		return err
	}
	return nil
}
