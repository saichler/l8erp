package holidays

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type HolidayServiceCallback struct {
}

func newHolidayServiceCallback() *HolidayServiceCallback {
	return &HolidayServiceCallback{}
}

func (this *HolidayServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Holiday)
	if !ok {
		return nil, false, errors.New("invalid holiday type")
	}
	err := validateHoliday(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *HolidayServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateHoliday(entity *hcm.Holiday) error {
	if err := validateHolidayRequiredFields(entity); err != nil {
		return err
	}
	if err := validateHolidayEnums(entity); err != nil {
		return err
	}
	return nil
}

func validateHolidayRequiredFields(entity *hcm.Holiday) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateHolidayEnums(entity *hcm.Holiday) error {
	if err := common.ValidateEnum(entity.HolidayType, hcm.HolidayType_name, "HolidayType"); err != nil {
		return err
	}
	return nil
}
