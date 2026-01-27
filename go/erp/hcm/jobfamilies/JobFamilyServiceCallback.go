package jobfamilies

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type JobFamilyServiceCallback struct {
}

func newJobFamilyServiceCallback() *JobFamilyServiceCallback {
	return &JobFamilyServiceCallback{}
}

func (this *JobFamilyServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.JobFamily)
	if !ok {
		return nil, false, errors.New("invalid job family type")
	}
	err := validateJobFam(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *JobFamilyServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateJobFam(entity *hcm.JobFamily) error {
	if err := validateJobFamRequiredFields(entity); err != nil {
		return err
	}
	return nil
}

func validateJobFamRequiredFields(entity *hcm.JobFamily) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}
