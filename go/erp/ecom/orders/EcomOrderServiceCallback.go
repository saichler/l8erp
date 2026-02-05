/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package orders

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomOrderServiceCallback struct{}

func newEcomOrderServiceCallback() *EcomOrderServiceCallback {
	return &EcomOrderServiceCallback{}
}

func (this *EcomOrderServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomOrder)
	if !ok {
		return nil, false, errors.New("invalid EcomOrder type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.OrderId)
	}
	err := validateEcomOrder(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomOrderServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomOrder(item *ecom.EcomOrder, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.OrderId, "OrderId"); err != nil {
		return err
	}
	return nil
}
