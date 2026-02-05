/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package carts

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomCartServiceCallback struct{}

func newEcomCartServiceCallback() *EcomCartServiceCallback {
	return &EcomCartServiceCallback{}
}

func (this *EcomCartServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomCart)
	if !ok {
		return nil, false, errors.New("invalid EcomCart type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.CartId)
	}
	err := validateEcomCart(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomCartServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomCart(item *ecom.EcomCart, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.CartId, "CartId"); err != nil {
		return err
	}
	return nil
}
