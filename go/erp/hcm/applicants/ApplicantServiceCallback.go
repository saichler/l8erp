package applicants

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type ApplicantServiceCallback struct {
}

func newApplicantServiceCallback() *ApplicantServiceCallback {
	return &ApplicantServiceCallback{}
}

func (this *ApplicantServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Applicant)
	if !ok {
		return nil, false, errors.New("invalid applicant type")
	}
	err := validateApplicant(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *ApplicantServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateApplicant(entity *hcm.Applicant) error {
	if err := validateApplicantRequiredFields(entity); err != nil {
		return err
	}
	if err := validateApplicantEnums(entity); err != nil {
		return err
	}
	return nil
}

func validateApplicantRequiredFields(entity *hcm.Applicant) error {
	if err := common.ValidateRequired(entity.FirstName, "FirstName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.LastName, "LastName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Email, "Email"); err != nil {
		return err
	}
	return nil
}

func validateApplicantEnums(entity *hcm.Applicant) error {
	if err := common.ValidateEnum(entity.Source, hcm.ApplicantSource_name, "Source"); err != nil {
		return err
	}
	return nil
}
