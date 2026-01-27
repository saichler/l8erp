package schedules

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type ScheduleServiceCallback struct {
}

func newScheduleServiceCallback() *ScheduleServiceCallback {
	return &ScheduleServiceCallback{}
}

func (this *ScheduleServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Schedule)
	if !ok {
		return nil, false, errors.New("invalid schedule type")
	}
	err := validateSchedule(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *ScheduleServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateSchedule(entity *hcm.Schedule, vnic ifs.IVNic) error {
	if err := validateScheduleRequiredFields(entity); err != nil {
		return err
	}
	if err := validateScheduleEnums(entity); err != nil {
		return err
	}
	if err := validateScheduleEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateScheduleRequiredFields(entity *hcm.Schedule) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateScheduleEnums(entity *hcm.Schedule) error {
	if err := common.ValidateEnum(entity.Status, hcm.ScheduleStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateScheduleEmployee(entity *hcm.Schedule, vnic ifs.IVNic) error {
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
