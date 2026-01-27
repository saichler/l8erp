package lifeevents

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type LifeEventServiceCallback struct {
}

func newLifeEventServiceCallback() *LifeEventServiceCallback {
	return &LifeEventServiceCallback{}
}

func (this *LifeEventServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.LifeEvent)
	if !ok {
		return nil, false, errors.New("invalid life event type")
	}
	err := validateLifeEvt(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *LifeEventServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateLifeEvt(entity *hcm.LifeEvent, vnic ifs.IVNic) error {
	if err := validateLifeEvtRequiredFields(entity); err != nil {
		return err
	}
	if err := validateLifeEvtEnums(entity); err != nil {
		return err
	}
	if err := validateLifeEvtEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateLifeEvtRequiredFields(entity *hcm.LifeEvent) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateLifeEvtEnums(entity *hcm.LifeEvent) error {
	if err := common.ValidateEnum(entity.EventType, hcm.LifeEventType_name, "EventType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.LifeEventStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateLifeEvtEmployee(entity *hcm.LifeEvent, vnic ifs.IVNic) error {
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
