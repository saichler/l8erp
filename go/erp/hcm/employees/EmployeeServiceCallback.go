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
package employees

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/departments"
	"github.com/saichler/l8erp/go/erp/hcm/jobs"
	"github.com/saichler/l8erp/go/erp/hcm/organizations"
	"github.com/saichler/l8erp/go/erp/hcm/positions"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type EmployeeServiceCallback struct {
}

func newEmployeeServiceCallback() *EmployeeServiceCallback {
	return &EmployeeServiceCallback{}
}

func (this *EmployeeServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	employee, ok := any.(*hcm.Employee)
	if !ok {
		return nil, false, errors.New("invalid employee type")
	}
	if action == ifs.POST {
		common.GenerateID(&employee.EmployeeId)
	}
	err := validate(employee, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EmployeeServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(employee *hcm.Employee, vnic ifs.IVNic) error {
	// 1. Required fields
	if err := validateRequiredFields(employee); err != nil {
		return err
	}

	// 2. Enum validations
	if err := validateEnums(employee); err != nil {
		return err
	}

	// 3. Date validations
	if err := validateDates(employee); err != nil {
		return err
	}

	// 4. Cross-field validations (business rules)
	if err := validateBusinessRules(employee); err != nil {
		return err
	}

	// 5. Reference validations
	if err := validateOrganization(employee, vnic); err != nil {
		return err
	}
	if err := validateDepartment(employee, vnic); err != nil {
		return err
	}
	if err := validatePosition(employee, vnic); err != nil {
		return err
	}
	if err := validateJob(employee, vnic); err != nil {
		return err
	}
	if err := validateManager(employee, vnic); err != nil {
		return err
	}
	return nil
}

func validateRequiredFields(employee *hcm.Employee) error {
	if err := common.ValidateRequired(employee.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(employee.FirstName, "FirstName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(employee.LastName, "LastName"); err != nil {
		return err
	}
	if err := common.ValidateRequiredInt64(employee.HireDate, "HireDate"); err != nil {
		return err
	}
	return nil
}

func validateEnums(employee *hcm.Employee) error {
	if err := common.ValidateEnum(employee.Gender, hcm.Gender_name, "Gender"); err != nil {
		return err
	}
	if err := common.ValidateEnum(employee.MaritalStatus, hcm.MaritalStatus_name, "MaritalStatus"); err != nil {
		return err
	}
	if err := common.ValidateEnum(employee.EmploymentStatus, hcm.EmploymentStatus_name, "EmploymentStatus"); err != nil {
		return err
	}
	if err := common.ValidateEnum(employee.EmploymentType, hcm.EmploymentType_name, "EmploymentType"); err != nil {
		return err
	}
	return nil
}

func validateDates(employee *hcm.Employee) error {
	// DateOfBirth must be in the past and employee must be at least 16
	if employee.DateOfBirth != 0 {
		if err := common.ValidateDateInPast(employee.DateOfBirth, "DateOfBirth"); err != nil {
			return err
		}
		if err := common.ValidateMinimumAge(employee.DateOfBirth, 16, "DateOfBirth"); err != nil {
			return err
		}
	}

	// TerminationDate must be after HireDate
	if employee.TerminationDate != 0 && employee.HireDate != 0 {
		if err := common.ValidateDateAfter(employee.TerminationDate, employee.HireDate,
			"TerminationDate", "HireDate"); err != nil {
			return err
		}
	}

	// OriginalHireDate must be before HireDate (for rehires)
	if employee.OriginalHireDate != 0 && employee.HireDate != 0 {
		if err := common.ValidateDateAfter(employee.HireDate, employee.OriginalHireDate,
			"HireDate", "OriginalHireDate"); err != nil {
			return err
		}
	}

	return nil
}

func validateBusinessRules(employee *hcm.Employee) error {
	// If status is TERMINATED, TerminationDate should be set
	isTerminated := employee.EmploymentStatus == hcm.EmploymentStatus_EMPLOYMENT_STATUS_TERMINATED
	if err := common.ValidateConditionalRequiredInt64(
		isTerminated, employee.TerminationDate,
		"EmploymentStatus is TERMINATED", "TerminationDate"); err != nil {
		return err
	}

	// If IsRehire is true, OriginalHireDate should be set
	if err := common.ValidateConditionalRequiredInt64(
		employee.IsRehire, employee.OriginalHireDate,
		"IsRehire is true", "OriginalHireDate"); err != nil {
		return err
	}

	// If TerminationDate is set, TerminationReason should be provided
	if err := common.ValidateConditionalRequired(
		employee.TerminationDate != 0, employee.TerminationReason,
		"TerminationDate is set", "TerminationReason"); err != nil {
		return err
	}

	return nil
}

func validateOrganization(employee *hcm.Employee, vnic ifs.IVNic) error {
	return common.ValidateReference(
		employee.OrganizationId,
		"Organization",
		organizations.ServiceName,
		organizations.ServiceArea,
		organizations.Organizations,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return organizations.Organization(id, vnic) },
		hcm.Organization{OrganizationId: employee.OrganizationId},
		vnic,
	)
}

func validateDepartment(employee *hcm.Employee, vnic ifs.IVNic) error {
	return common.ValidateReference(
		employee.DepartmentId,
		"Department",
		departments.ServiceName,
		departments.ServiceArea,
		departments.Departments,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return departments.Department(id, vnic) },
		hcm.Department{DepartmentId: employee.DepartmentId},
		vnic,
	)
}

func validatePosition(employee *hcm.Employee, vnic ifs.IVNic) error {
	return common.ValidateReference(
		employee.PositionId,
		"Position",
		positions.ServiceName,
		positions.ServiceArea,
		positions.Positions,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return positions.Position(id, vnic) },
		hcm.Position{PositionId: employee.PositionId},
		vnic,
	)
}

func validateJob(employee *hcm.Employee, vnic ifs.IVNic) error {
	return common.ValidateReference(
		employee.JobId,
		"Job",
		jobs.ServiceName,
		jobs.ServiceArea,
		jobs.Jobs,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return jobs.Job(id, vnic) },
		hcm.Job{JobId: employee.JobId},
		vnic,
	)
}

func validateManager(employee *hcm.Employee, vnic ifs.IVNic) error {
	return common.ValidateReference(
		employee.ManagerId,
		"Manager",
		ServiceName,
		ServiceArea,
		Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return Employee(id, vnic) },
		hcm.Employee{EmployeeId: employee.ManagerId},
		vnic,
	)
}
