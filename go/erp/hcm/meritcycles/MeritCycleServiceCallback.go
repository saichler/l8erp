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
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/erp/common"
)

func newMeritCycleServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("MeritCycle",
		func(e *hcm.MeritCycle) { common.GenerateID(&e.CycleId) },
		nil)
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
	if err := common.ValidateRequired(entity.CycleId, "CycleId"); err != nil {
		return err
	}
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
