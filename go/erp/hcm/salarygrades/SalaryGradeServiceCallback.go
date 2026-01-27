package salarygrades

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type SalaryGradeServiceCallback struct {
}

func newSalaryGradeServiceCallback() *SalaryGradeServiceCallback {
	return &SalaryGradeServiceCallback{}
}

func (this *SalaryGradeServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.SalaryGrade)
	if !ok {
		return nil, false, errors.New("invalid salary grade type")
	}
	err := validateSalGrade(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *SalaryGradeServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateSalGrade(entity *hcm.SalaryGrade) error {
	if err := validateSalGradeRequiredFields(entity); err != nil {
		return err
	}
	return nil
}

func validateSalGradeRequiredFields(entity *hcm.SalaryGrade) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}
