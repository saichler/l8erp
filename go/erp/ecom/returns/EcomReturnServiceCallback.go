/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package returns

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomReturnServiceCallback struct{}

func newEcomReturnServiceCallback() *EcomReturnServiceCallback {
	return &EcomReturnServiceCallback{}
}

func (this *EcomReturnServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomReturn)
	if !ok {
		return nil, false, errors.New("invalid EcomReturn type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ReturnId)
	}
	err := validateEcomReturn(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomReturnServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomReturn(item *ecom.EcomReturn, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ReturnId, "ReturnId"); err != nil {
		return err
	}
	return nil
}
