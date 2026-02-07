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
package employeecompensations

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/salarygrades"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newEmployeeCompensationServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("EmployeeCompensation",
		func(e *hcm.EmployeeCompensation) { common.GenerateID(&e.CompensationId) },
		validateEmpComp)
}

func validateEmpComp(entity *hcm.EmployeeCompensation, vnic ifs.IVNic) error {
	if err := validateEmpCompRequiredFields(entity); err != nil {
		return err
	}
	if err := validateEmpCompEnums(entity); err != nil {
		return err
	}
	if err := validateEmpCompDates(entity); err != nil {
		return err
	}
	if err := validateEmpCompEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateEmpCompSalaryGrade(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateEmpCompRequiredFields(entity *hcm.EmployeeCompensation) error {
	if err := common.ValidateRequired(entity.CompensationId, "CompensationId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.CurrencyId, "CurrencyId"); err != nil {
		return err
	}
	return nil
}

func validateEmpCompEnums(entity *hcm.EmployeeCompensation) error {
	if err := common.ValidateEnum(entity.CompensationType, hcm.CompensationType_name, "CompensationType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.PayFrequency, hcm.PayFrequency_name, "PayFrequency"); err != nil {
		return err
	}
	return nil
}

func validateEmpCompDates(entity *hcm.EmployeeCompensation) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateEmpCompEmployee(entity *hcm.EmployeeCompensation, vnic ifs.IVNic) error {
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

func validateEmpCompSalaryGrade(entity *hcm.EmployeeCompensation, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.SalaryGradeId,
		"SalaryGrade",
		salarygrades.ServiceName,
		salarygrades.ServiceArea,
		salarygrades.SalaryGrades,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return salarygrades.SalaryGrade(id, vnic) },
		hcm.SalaryGrade{GradeId: entity.SalaryGradeId},
		vnic,
	)
}
