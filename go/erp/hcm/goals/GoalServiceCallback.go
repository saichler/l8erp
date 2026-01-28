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
package goals

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type GoalServiceCallback struct {
}

func newGoalServiceCallback() *GoalServiceCallback {
	return &GoalServiceCallback{}
}

func (this *GoalServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Goal)
	if !ok {
		return nil, false, errors.New("invalid goal type")
	}
	err := validateGoal(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *GoalServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateGoal(entity *hcm.Goal, vnic ifs.IVNic) error {
	if err := validateGoalRequiredFields(entity); err != nil {
		return err
	}
	if err := validateGoalEnums(entity); err != nil {
		return err
	}
	if err := validateGoalDates(entity); err != nil {
		return err
	}
	if err := validateGoalEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateGoalRequiredFields(entity *hcm.Goal) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateGoalEnums(entity *hcm.Goal) error {
	if err := common.ValidateEnum(entity.GoalType, hcm.GoalType_name, "GoalType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.GoalCategory, hcm.GoalCategory_name, "GoalCategory"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.GoalStatus_name, "Status"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Priority, hcm.GoalPriority_name, "Priority"); err != nil {
		return err
	}
	return nil
}

func validateGoalDates(entity *hcm.Goal) error {
	if entity.StartDate != 0 && entity.DueDate != 0 {
		if err := common.ValidateDateAfter(entity.DueDate, entity.StartDate, "DueDate", "StartDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateGoalEmployee(entity *hcm.Goal, vnic ifs.IVNic) error {
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
