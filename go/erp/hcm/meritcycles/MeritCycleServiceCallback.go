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
package meritcycles

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type MeritCycleServiceCallback struct {
}

func newMeritCycleServiceCallback() *MeritCycleServiceCallback {
	return &MeritCycleServiceCallback{}
}

func (this *MeritCycleServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.MeritCycle)
	if !ok {
		return nil, false, errors.New("invalid merit cycle type")
	}
	err := validateMeritCyc(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *MeritCycleServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateMeritCyc(entity *hcm.MeritCycle) error {
	if err := validateMeritCycEnums(entity); err != nil {
		return err
	}
	if err := validateMeritCycDates(entity); err != nil {
		return err
	}
	return nil
}

func validateMeritCycEnums(entity *hcm.MeritCycle) error {
	if err := common.ValidateEnum(entity.Status, hcm.MeritCycleStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateMeritCycDates(entity *hcm.MeritCycle) error {
	if entity.PlanningStartDate != 0 && entity.PlanningEndDate != 0 {
		if err := common.ValidateDateAfter(entity.PlanningEndDate, entity.PlanningStartDate, "PlanningEndDate", "PlanningStartDate"); err != nil {
			return err
		}
	}
	return nil
}
