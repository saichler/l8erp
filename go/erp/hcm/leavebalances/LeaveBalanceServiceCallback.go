package leavebalances

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/leavepolicies"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type LeaveBalanceServiceCallback struct {
}

func newLeaveBalanceServiceCallback() *LeaveBalanceServiceCallback {
	return &LeaveBalanceServiceCallback{}
}

func (this *LeaveBalanceServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.LeaveBalance)
	if !ok {
		return nil, false, errors.New("invalid leave balance type")
	}
	err := validateLeaveBal(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *LeaveBalanceServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateLeaveBal(entity *hcm.LeaveBalance, vnic ifs.IVNic) error {
	if err := validateLeaveBalRequiredFields(entity); err != nil {
		return err
	}
	if err := validateLeaveBalEnums(entity); err != nil {
		return err
	}
	if err := validateLeaveBalEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateLeaveBalPolicy(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateLeaveBalRequiredFields(entity *hcm.LeaveBalance) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.LeavePolicyId, "LeavePolicyId"); err != nil {
		return err
	}
	return nil
}

func validateLeaveBalEnums(entity *hcm.LeaveBalance) error {
	if err := common.ValidateEnum(entity.LeaveType, hcm.LeaveType_name, "LeaveType"); err != nil {
		return err
	}
	return nil
}

func validateLeaveBalEmployee(entity *hcm.LeaveBalance, vnic ifs.IVNic) error {
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

func validateLeaveBalPolicy(entity *hcm.LeaveBalance, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.LeavePolicyId,
		"LeavePolicy",
		leavepolicies.ServiceName,
		leavepolicies.ServiceArea,
		leavepolicies.LeavePolicies,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return leavepolicies.LeavePolicy(id, vnic) },
		hcm.LeavePolicy{PolicyId: entity.LeavePolicyId},
		vnic,
	)
}
