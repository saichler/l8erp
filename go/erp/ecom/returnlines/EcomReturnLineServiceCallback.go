/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package returnlines

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomReturnLineServiceCallback struct{}

func newEcomReturnLineServiceCallback() *EcomReturnLineServiceCallback {
	return &EcomReturnLineServiceCallback{}
}

func (this *EcomReturnLineServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomReturnLine)
	if !ok {
		return nil, false, errors.New("invalid EcomReturnLine type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.LineId)
	}
	err := validateEcomReturnLine(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomReturnLineServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomReturnLine(item *ecom.EcomReturnLine, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.LineId, "LineId"); err != nil {
		return err
	}
	return nil
}
