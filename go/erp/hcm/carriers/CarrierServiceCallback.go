package carriers

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type CarrierServiceCallback struct {
}

func newCarrierServiceCallback() *CarrierServiceCallback {
	return &CarrierServiceCallback{}
}

func (this *CarrierServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Carrier)
	if !ok {
		return nil, false, errors.New("invalid carrier type")
	}
	err := validateCarrier(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CarrierServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCarrier(entity *hcm.Carrier) error {
	if err := validateCarrierRequiredFields(entity); err != nil {
		return err
	}
	if err := validateCarrierEnums(entity); err != nil {
		return err
	}
	return nil
}

func validateCarrierRequiredFields(entity *hcm.Carrier) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateCarrierEnums(entity *hcm.Carrier) error {
	if err := common.ValidateEnum(entity.CarrierType, hcm.CarrierType_name, "CarrierType"); err != nil {
		return err
	}
	return nil
}
