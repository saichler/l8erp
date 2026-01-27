package paycomponents

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type PayComponentServiceCallback struct {
}

func newPayComponentServiceCallback() *PayComponentServiceCallback {
	return &PayComponentServiceCallback{}
}

func (this *PayComponentServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.PayComponent)
	if !ok {
		return nil, false, errors.New("invalid pay component type")
	}
	err := validatePayComp(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *PayComponentServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validatePayComp(entity *hcm.PayComponent) error {
	if err := validatePayCompRequiredFields(entity); err != nil {
		return err
	}
	return nil
}

func validatePayCompRequiredFields(entity *hcm.PayComponent) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}
