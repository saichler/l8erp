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

package depreciationschedules

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type DepreciationScheduleServiceCallback struct{}

func newDepreciationScheduleServiceCallback() *DepreciationScheduleServiceCallback {
	return &DepreciationScheduleServiceCallback{}
}

func (this *DepreciationScheduleServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	depreciationSchedule, ok := any.(*fin.DepreciationSchedule)
	if !ok {
		return nil, false, errors.New("invalid depreciationSchedule type")
	}
	if action == ifs.POST {
		common.GenerateID(&depreciationSchedule.ScheduleId)
	}
	err := validate(depreciationSchedule, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *DepreciationScheduleServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(depreciationSchedule *fin.DepreciationSchedule, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(depreciationSchedule.ScheduleId, "ScheduleId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(depreciationSchedule.AssetId, "AssetId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(depreciationSchedule.FiscalPeriodId, "FiscalPeriodId"); err != nil {
		return err
	}
	return nil
}
