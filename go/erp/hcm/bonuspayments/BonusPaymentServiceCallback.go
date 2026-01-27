package bonuspayments

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/bonusplans"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type BonusPaymentServiceCallback struct {
}

func newBonusPaymentServiceCallback() *BonusPaymentServiceCallback {
	return &BonusPaymentServiceCallback{}
}

func (this *BonusPaymentServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.BonusPayment)
	if !ok {
		return nil, false, errors.New("invalid bonus payment type")
	}
	err := validateBonusPay(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BonusPaymentServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateBonusPay(entity *hcm.BonusPayment, vnic ifs.IVNic) error {
	if err := validateBonusPayRequiredFields(entity); err != nil {
		return err
	}
	if err := validateBonusPayEnums(entity); err != nil {
		return err
	}
	if err := validateBonusPayDates(entity); err != nil {
		return err
	}
	if err := validateBonusPayEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateBonusPayPlan(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateBonusPayRequiredFields(entity *hcm.BonusPayment) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateBonusPayEnums(entity *hcm.BonusPayment) error {
	if err := common.ValidateEnum(entity.Status, hcm.BonusPaymentStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateBonusPayDates(entity *hcm.BonusPayment) error {
	if entity.AwardDate != 0 && entity.ApprovedDate != 0 {
		if err := common.ValidateDateAfter(entity.ApprovedDate, entity.AwardDate, "ApprovedDate", "AwardDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateBonusPayEmployee(entity *hcm.BonusPayment, vnic ifs.IVNic) error {
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

func validateBonusPayPlan(entity *hcm.BonusPayment, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.BonusPlanId,
		"BonusPlan",
		bonusplans.ServiceName,
		bonusplans.ServiceArea,
		bonusplans.BonusPlans,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return bonusplans.BonusPlan(id, vnic) },
		hcm.BonusPlan{PlanId: entity.BonusPlanId},
		vnic,
	)
}
