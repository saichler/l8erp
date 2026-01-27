package paystructures

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type PayStructureServiceCallback struct {
}

func newPayStructureServiceCallback() *PayStructureServiceCallback {
	return &PayStructureServiceCallback{}
}

func (this *PayStructureServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.PayStructure)
	if !ok {
		return nil, false, errors.New("invalid pay structure type")
	}
	err := validatePayStruct(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *PayStructureServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validatePayStruct(entity *hcm.PayStructure) error {
	if err := validatePayStructDates(entity); err != nil {
		return err
	}
	return nil
}

func validatePayStructDates(entity *hcm.PayStructure) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}
