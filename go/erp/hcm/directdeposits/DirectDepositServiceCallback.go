package directdeposits

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type DirectDepositServiceCallback struct {
}

func newDirectDepositServiceCallback() *DirectDepositServiceCallback {
	return &DirectDepositServiceCallback{}
}

func (this *DirectDepositServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.DirectDeposit)
	if !ok {
		return nil, false, errors.New("invalid direct deposit type")
	}
	err := validateDirDep(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *DirectDepositServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateDirDep(entity *hcm.DirectDeposit, vnic ifs.IVNic) error {
	if err := validateDirDepRequiredFields(entity); err != nil {
		return err
	}
	if err := validateDirDepEnums(entity); err != nil {
		return err
	}
	if err := validateDirDepEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateDirDepRequiredFields(entity *hcm.DirectDeposit) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateDirDepEnums(entity *hcm.DirectDeposit) error {
	if err := common.ValidateEnum(entity.AccountType, hcm.AccountType_name, "AccountType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.DepositType, hcm.DepositType_name, "DepositType"); err != nil {
		return err
	}
	return nil
}

func validateDirDepEmployee(entity *hcm.DirectDeposit, vnic ifs.IVNic) error {
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
