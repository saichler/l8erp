package benefitenrollments

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/benefitplans"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/lifeevents"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type BenefitEnrollmentServiceCallback struct {
}

func newBenefitEnrollmentServiceCallback() *BenefitEnrollmentServiceCallback {
	return &BenefitEnrollmentServiceCallback{}
}

func (this *BenefitEnrollmentServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.BenefitEnrollment)
	if !ok {
		return nil, false, errors.New("invalid benefit enrollment type")
	}
	err := validateBenEnroll(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BenefitEnrollmentServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateBenEnroll(entity *hcm.BenefitEnrollment, vnic ifs.IVNic) error {
	if err := validateBenEnrollRequiredFields(entity); err != nil {
		return err
	}
	if err := validateBenEnrollEnums(entity); err != nil {
		return err
	}
	if err := validateBenEnrollDates(entity); err != nil {
		return err
	}
	if err := validateBenEnrollBusinessRules(entity); err != nil {
		return err
	}
	if err := validateBenEnrollEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateBenEnrollPlan(entity, vnic); err != nil {
		return err
	}
	if err := validateBenEnrollLifeEvent(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateBenEnrollRequiredFields(entity *hcm.BenefitEnrollment) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.PlanId, "PlanId"); err != nil {
		return err
	}
	return nil
}

func validateBenEnrollEnums(entity *hcm.BenefitEnrollment) error {
	if err := common.ValidateEnum(entity.Status, hcm.EnrollmentStatus_name, "Status"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Reason, hcm.EnrollmentReason_name, "Reason"); err != nil {
		return err
	}
	return nil
}

func validateBenEnrollDates(entity *hcm.BenefitEnrollment) error {
	if entity.CoverageStartDate != 0 && entity.CoverageEndDate != 0 {
		if err := common.ValidateDateAfter(entity.CoverageEndDate, entity.CoverageStartDate, "CoverageEndDate", "CoverageStartDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateBenEnrollBusinessRules(entity *hcm.BenefitEnrollment) error {
	// If status is CANCELLED, CoverageEndDate should be set
	isCancelled := entity.Status == hcm.EnrollmentStatus_ENROLLMENT_STATUS_CANCELLED
	if err := common.ValidateConditionalRequiredInt64(
		isCancelled, entity.CoverageEndDate,
		"Status is CANCELLED", "CoverageEndDate"); err != nil {
		return err
	}
	return nil
}

func validateBenEnrollEmployee(entity *hcm.BenefitEnrollment, vnic ifs.IVNic) error {
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

func validateBenEnrollPlan(entity *hcm.BenefitEnrollment, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.PlanId,
		"BenefitPlan",
		benefitplans.ServiceName,
		benefitplans.ServiceArea,
		benefitplans.BenefitPlans,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return benefitplans.BenefitPlan(id, vnic) },
		hcm.BenefitPlan{PlanId: entity.PlanId},
		vnic,
	)
}

func validateBenEnrollLifeEvent(entity *hcm.BenefitEnrollment, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.LifeEventId,
		"LifeEvent",
		lifeevents.ServiceName,
		lifeevents.ServiceArea,
		lifeevents.LifeEvents,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return lifeevents.LifeEvent(id, vnic) },
		hcm.LifeEvent{LifeEventId: entity.LifeEventId},
		vnic,
	)
}
