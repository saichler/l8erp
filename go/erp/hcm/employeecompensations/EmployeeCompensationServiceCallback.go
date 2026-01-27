package employeecompensations

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/salarygrades"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type EmployeeCompensationServiceCallback struct {
}

func newEmployeeCompensationServiceCallback() *EmployeeCompensationServiceCallback {
	return &EmployeeCompensationServiceCallback{}
}

func (this *EmployeeCompensationServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.EmployeeCompensation)
	if !ok {
		return nil, false, errors.New("invalid employee compensation type")
	}
	err := validateEmpComp(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EmployeeCompensationServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
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
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
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
