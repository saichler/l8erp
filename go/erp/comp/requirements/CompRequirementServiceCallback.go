/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package requirements

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompRequirementServiceCallback struct{}

func newCompRequirementServiceCallback() *CompRequirementServiceCallback {
	return &CompRequirementServiceCallback{}
}

func (this *CompRequirementServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompRequirement)
	if !ok {
		return nil, false, errors.New("invalid CompRequirement type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.RequirementId)
	}
	err := validateCompRequirement(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompRequirementServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompRequirement(item *comp.CompRequirement, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.RequirementId, "RequirementId"); err != nil {
		return err
	}
	return nil
}
