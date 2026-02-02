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
package onboardingtasks

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type OnboardingTaskServiceCallback struct {
}

func newOnboardingTaskServiceCallback() *OnboardingTaskServiceCallback {
	return &OnboardingTaskServiceCallback{}
}

func (this *OnboardingTaskServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.OnboardingTask)
	if !ok {
		return nil, false, errors.New("invalid onboarding task type")
	}
	err := validateOnbrdTsk(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *OnboardingTaskServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateOnbrdTsk(entity *hcm.OnboardingTask, vnic ifs.IVNic) error {
	if err := validateOnbrdTskRequiredFields(entity); err != nil {
		return err
	}
	if err := validateOnbrdTskEnums(entity); err != nil {
		return err
	}
	if err := validateOnbrdTskEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateOnbrdTskRequiredFields(entity *hcm.OnboardingTask) error {
	if err := common.ValidateRequired(entity.TaskId, "TaskId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateOnbrdTskEnums(entity *hcm.OnboardingTask) error {
	if err := common.ValidateEnum(entity.Category, hcm.OnboardingTaskCategory_name, "Category"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.OnboardingTaskStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateOnbrdTskEmployee(entity *hcm.OnboardingTask, vnic ifs.IVNic) error {
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
