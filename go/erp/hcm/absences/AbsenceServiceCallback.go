package absences

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type AbsenceServiceCallback struct {
}

func newAbsenceServiceCallback() *AbsenceServiceCallback {
	return &AbsenceServiceCallback{}
}

func (this *AbsenceServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Absence)
	if !ok {
		return nil, false, errors.New("invalid absence type")
	}
	err := validateAbsence(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *AbsenceServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
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
