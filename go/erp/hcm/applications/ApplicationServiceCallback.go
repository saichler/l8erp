package applications

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/applicants"
	"github.com/saichler/l8erp/go/erp/hcm/jobrequisitions"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type ApplicationServiceCallback struct {
}

func newApplicationServiceCallback() *ApplicationServiceCallback {
	return &ApplicationServiceCallback{}
}

func (this *ApplicationServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Application)
	if !ok {
		return nil, false, errors.New("invalid application type")
	}
	err := validateApplctn(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *ApplicationServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateApplctn(entity *hcm.Application, vnic ifs.IVNic) error {
	if err := validateApplctnRequiredFields(entity); err != nil {
		return err
	}
	if err := validateApplctnEnums(entity); err != nil {
		return err
	}
	if err := validateApplctnApplicant(entity, vnic); err != nil {
		return err
	}
	if err := validateApplctnRequisition(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateApplctnRequiredFields(entity *hcm.Application) error {
	if err := common.ValidateRequired(entity.ApplicantId, "ApplicantId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.RequisitionId, "RequisitionId"); err != nil {
		return err
	}
	return nil
}

func validateApplctnEnums(entity *hcm.Application) error {
	if err := common.ValidateEnum(entity.Status, hcm.ApplicationStatus_name, "Status"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Stage, hcm.ApplicationStage_name, "Stage"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.DispositionReason, hcm.DispositionReason_name, "DispositionReason"); err != nil {
		return err
	}
	return nil
}

func validateApplctnApplicant(entity *hcm.Application, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.ApplicantId,
		"Applicant",
		applicants.ServiceName,
		applicants.ServiceArea,
		applicants.Applicants,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return applicants.Applicant(id, vnic) },
		hcm.Applicant{ApplicantId: entity.ApplicantId},
		vnic,
	)
}

func validateApplctnRequisition(entity *hcm.Application, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.RequisitionId,
		"JobRequisition",
		jobrequisitions.ServiceName,
		jobrequisitions.ServiceArea,
		jobrequisitions.JobRequisitions,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return jobrequisitions.JobRequisition(id, vnic) },
		hcm.JobRequisition{RequisitionId: entity.RequisitionId},
		vnic,
	)
}
