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
package absences

import (
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newAbsenceServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Absence",
		func(e *hcm.Absence) { common.GenerateID(&e.AbsenceId) },
		validateAbsence)
}

func validateAbsence(entity *hcm.Absence, vnic ifs.IVNic) error {
	if err := validateAbsenceRequiredFields(entity); err != nil {
		return err
	}
	if err := validateAbsenceEnums(entity); err != nil {
		return err
	}
	if err := validateAbsenceEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateAbsenceRequiredFields(entity *hcm.Absence) error {
	if err := common.ValidateRequired(entity.AbsenceId, "AbsenceId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateAbsenceEnums(entity *hcm.Absence) error {
	if err := common.ValidateEnum(entity.AbsenceType, hcm.LeaveType_name, "AbsenceType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.AbsenceStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateAbsenceEmployee(entity *hcm.Absence, vnic ifs.IVNic) error {
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
