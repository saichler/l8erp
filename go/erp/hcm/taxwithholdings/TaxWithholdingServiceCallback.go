package taxwithholdings

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type TaxWithholdingServiceCallback struct {
}

func newTaxWithholdingServiceCallback() *TaxWithholdingServiceCallback {
	return &TaxWithholdingServiceCallback{}
}

func (this *TaxWithholdingServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.TaxWithholding)
	if !ok {
		return nil, false, errors.New("invalid tax withholding type")
	}
	err := validateTaxWith(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *TaxWithholdingServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateTaxWith(entity *hcm.TaxWithholding, vnic ifs.IVNic) error {
	if err := validateTaxWithRequiredFields(entity); err != nil {
		return err
	}
	if err := validateTaxWithEnums(entity); err != nil {
		return err
	}
	if err := validateTaxWithEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateTaxWithRequiredFields(entity *hcm.TaxWithholding) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateTaxWithEnums(entity *hcm.TaxWithholding) error {
	if err := common.ValidateEnum(entity.FilingStatus, hcm.FilingStatus_name, "FilingStatus"); err != nil {
		return err
	}
	return nil
}

func validateTaxWithEmployee(entity *hcm.TaxWithholding, vnic ifs.IVNic) error {
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
