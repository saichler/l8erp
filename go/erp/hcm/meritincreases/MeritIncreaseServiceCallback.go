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
package meritincreases

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/meritcycles"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type MeritIncreaseServiceCallback struct {
}

func newMeritIncreaseServiceCallback() *MeritIncreaseServiceCallback {
	return &MeritIncreaseServiceCallback{}
}

func (this *MeritIncreaseServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.MeritIncrease)
	if !ok {
		return nil, false, errors.New("invalid merit increase type")
	}
	if action == ifs.POST {
		common.GenerateID(&entity.IncreaseId)
	}
	err := validateMeritInc(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *MeritIncreaseServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateMeritInc(entity *hcm.MeritIncrease, vnic ifs.IVNic) error {
	if err := validateMeritIncRequiredFields(entity); err != nil {
		return err
	}
	if err := validateMeritIncEnums(entity); err != nil {
		return err
	}
	if err := validateMeritIncDates(entity); err != nil {
		return err
	}
	if err := validateMeritIncEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateMeritIncCycle(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateMeritIncRequiredFields(entity *hcm.MeritIncrease) error {
	if err := common.ValidateRequired(entity.IncreaseId, "IncreaseId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.MeritCycleId, "MeritCycleId"); err != nil {
		return err
	}
	return nil
}

func validateMeritIncEnums(entity *hcm.MeritIncrease) error {
	if err := common.ValidateEnum(entity.Status, hcm.MeritIncreaseStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateMeritIncDates(entity *hcm.MeritIncrease) error {
	if entity.SubmittedDate != 0 && entity.ApprovedDate != 0 {
		if err := common.ValidateDateAfter(entity.ApprovedDate, entity.SubmittedDate, "ApprovedDate", "SubmittedDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateMeritIncEmployee(entity *hcm.MeritIncrease, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.EmployeeId,
		"Employee",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.EmployeeId},
		vnic,
	)
}

func validateMeritIncCycle(entity *hcm.MeritIncrease, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.MeritCycleId,
		"MeritCycle",
		meritcycles.ServiceName,
		meritcycles.ServiceArea,
		meritcycles.MeritCycles,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return meritcycles.MeritCycle(id, vnic) },
		hcm.MeritCycle{CycleId: entity.MeritCycleId},
		vnic,
	)
}
