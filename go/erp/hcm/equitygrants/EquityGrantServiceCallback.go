package equitygrants

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type EquityGrantServiceCallback struct {
}

func newEquityGrantServiceCallback() *EquityGrantServiceCallback {
	return &EquityGrantServiceCallback{}
}

func (this *EquityGrantServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.EquityGrant)
	if !ok {
		return nil, false, errors.New("invalid equity grant type")
	}
	err := validateEqGrant(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EquityGrantServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEqGrant(entity *hcm.EquityGrant, vnic ifs.IVNic) error {
	if err := validateEqGrantRequiredFields(entity); err != nil {
		return err
	}
	if err := validateEqGrantEnums(entity); err != nil {
		return err
	}
	if err := validateEqGrantDates(entity); err != nil {
		return err
	}
	if err := validateEqGrantEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateEqGrantRequiredFields(entity *hcm.EquityGrant) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateEqGrantEnums(entity *hcm.EquityGrant) error {
	if err := common.ValidateEnum(entity.GrantType, hcm.EquityGrantType_name, "GrantType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.EquityGrantStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateEqGrantDates(entity *hcm.EquityGrant) error {
	if entity.VestStartDate != 0 && entity.ExpirationDate != 0 {
		if err := common.ValidateDateAfter(entity.ExpirationDate, entity.VestStartDate, "ExpirationDate", "VestStartDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateEqGrantEmployee(entity *hcm.EquityGrant, vnic ifs.IVNic) error {
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
