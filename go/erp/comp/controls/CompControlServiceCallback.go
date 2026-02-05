/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package controls

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompControlServiceCallback struct{}

func newCompControlServiceCallback() *CompControlServiceCallback {
	return &CompControlServiceCallback{}
}

func (this *CompControlServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompControl)
	if !ok {
		return nil, false, errors.New("invalid CompControl type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ControlId)
	}
	err := validateCompControl(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompControlServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompControl(item *comp.CompControl, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ControlId, "ControlId"); err != nil {
		return err
	}
	return nil
}
