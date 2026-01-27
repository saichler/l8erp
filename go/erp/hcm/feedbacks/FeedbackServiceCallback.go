package feedbacks

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type FeedbackServiceCallback struct {
}

func newFeedbackServiceCallback() *FeedbackServiceCallback {
	return &FeedbackServiceCallback{}
}

func (this *FeedbackServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Feedback)
	if !ok {
		return nil, false, errors.New("invalid feedback type")
	}
	err := validateFeedback(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *FeedbackServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateFeedback(entity *hcm.Feedback, vnic ifs.IVNic) error {
	if err := validateFeedbackRequiredFields(entity); err != nil {
		return err
	}
	if err := validateFeedbackEnums(entity); err != nil {
		return err
	}
	if err := validateFeedbackEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateFeedbackProvider(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateFeedbackRequiredFields(entity *hcm.Feedback) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateFeedbackEnums(entity *hcm.Feedback) error {
	if err := common.ValidateEnum(entity.FeedbackType, hcm.FeedbackType_name, "FeedbackType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Relationship, hcm.FeedbackRelationship_name, "Relationship"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.FeedbackStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateFeedbackEmployee(entity *hcm.Feedback, vnic ifs.IVNic) error {
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

func validateFeedbackProvider(entity *hcm.Feedback, vnic ifs.IVNic) error {
	if entity.ProviderId == "" {
		return nil
	}
	return common.ValidateReference(
		entity.ProviderId,
		"Employee",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.ProviderId},
		vnic,
	)
}
