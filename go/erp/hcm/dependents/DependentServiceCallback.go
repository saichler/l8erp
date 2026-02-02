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
package dependents

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type DependentServiceCallback struct {
}

func newDependentServiceCallback() *DependentServiceCallback {
	return &DependentServiceCallback{}
}

func (this *DependentServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Dependent)
	if !ok {
		return nil, false, errors.New("invalid dependent type")
	}
	err := validateDep(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *DependentServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateDep(entity *hcm.Dependent, vnic ifs.IVNic) error {
	if err := validateDepRequiredFields(entity); err != nil {
		return err
	}
	if err := validateDepDates(entity); err != nil {
		return err
	}
	if err := validateDepEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateDepRequiredFields(entity *hcm.Dependent) error {
	if err := common.ValidateRequired(entity.DependentId, "DependentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.FirstName, "FirstName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.LastName, "LastName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateDepDates(entity *hcm.Dependent) error {
	if entity.DateOfBirth != 0 {
		if err := common.ValidateDateInPast(entity.DateOfBirth, "DateOfBirth"); err != nil {
			return err
		}
	}
	return nil
}

func validateDepEmployee(entity *hcm.Dependent, vnic ifs.IVNic) error {
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
