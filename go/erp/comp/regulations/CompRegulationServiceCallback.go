/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package regulations

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompRegulationServiceCallback struct{}

func newCompRegulationServiceCallback() *CompRegulationServiceCallback {
	return &CompRegulationServiceCallback{}
}

func (this *CompRegulationServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompRegulation)
	if !ok {
		return nil, false, errors.New("invalid CompRegulation type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.RegulationId)
	}
	err := validateCompRegulation(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompRegulationServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompRegulation(item *comp.CompRegulation, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.RegulationId, "RegulationId"); err != nil {
		return err
	}
	return nil
}
