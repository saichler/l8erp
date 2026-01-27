package leaverequests

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/leavepolicies"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type LeaveRequestServiceCallback struct {
}

func newLeaveRequestServiceCallback() *LeaveRequestServiceCallback {
	return &LeaveRequestServiceCallback{}
}

func (this *LeaveRequestServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.LeaveRequest)
	if !ok {
		return nil, false, errors.New("invalid leave request type")
	}
	err := validateLeaveReq(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *LeaveRequestServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateLeaveReq(entity *hcm.LeaveRequest, vnic ifs.IVNic) error {
	if err := validateLeaveReqRequiredFields(entity); err != nil {
		return err
	}
	if err := validateLeaveReqEnums(entity); err != nil {
		return err
	}
	if err := validateLeaveReqDates(entity); err != nil {
		return err
	}
	if err := validateLeaveReqEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateLeaveReqPolicy(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateLeaveReqRequiredFields(entity *hcm.LeaveRequest) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.LeavePolicyId, "LeavePolicyId"); err != nil {
		return err
	}
	return nil
}

func validateLeaveReqEnums(entity *hcm.LeaveRequest) error {
	if err := common.ValidateEnum(entity.LeaveType, hcm.LeaveType_name, "LeaveType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.LeaveRequestStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateLeaveReqDates(entity *hcm.LeaveRequest) error {
	if entity.StartDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.StartDate, "EndDate", "StartDate"); err != nil {
			return err
		}
	}
	if entity.SubmittedDate != 0 && entity.ApprovedDate != 0 {
		if err := common.ValidateDateAfter(entity.ApprovedDate, entity.SubmittedDate, "ApprovedDate", "SubmittedDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateLeaveReqEmployee(entity *hcm.LeaveRequest, vnic ifs.IVNic) error {
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

func validateLeaveReqPolicy(entity *hcm.LeaveRequest, vnic ifs.IVNic) error {
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
