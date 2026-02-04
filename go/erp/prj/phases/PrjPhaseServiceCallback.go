/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package phases

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
)

type PrjPhaseServiceCallback struct{}

func newPrjPhaseServiceCallback() *PrjPhaseServiceCallback {
	return &PrjPhaseServiceCallback{}
}

func (this *PrjPhaseServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*prj.PrjPhase)
	if !ok {
		return nil, false, errors.New("invalid PrjPhase type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.PhaseId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *PrjPhaseServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *prj.PrjPhase, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.PhaseId, "PhaseId"); err != nil {
		return err
	}
	return nil
}
