package meritcycles

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type MeritCycleServiceCallback struct {
}

func newMeritCycleServiceCallback() *MeritCycleServiceCallback {
	return &MeritCycleServiceCallback{}
}

func (this *MeritCycleServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.MeritCycle)
	if !ok {
		return nil, false, errors.New("invalid merit cycle type")
	}
	err := validateMeritCyc(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *MeritCycleServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateMeritCyc(entity *hcm.MeritCycle) error {
	if err := validateMeritCycEnums(entity); err != nil {
		return err
	}
	if err := validateMeritCycDates(entity); err != nil {
		return err
	}
	return nil
}

func validateMeritCycEnums(entity *hcm.MeritCycle) error {
	if err := common.ValidateEnum(entity.Status, hcm.MeritCycleStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateMeritCycDates(entity *hcm.MeritCycle) error {
	if entity.PlanningStartDate != 0 && entity.PlanningEndDate != 0 {
		if err := common.ValidateDateAfter(entity.PlanningEndDate, entity.PlanningStartDate, "PlanningEndDate", "PlanningStartDate"); err != nil {
			return err
		}
	}
	return nil
}
