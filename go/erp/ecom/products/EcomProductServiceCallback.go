/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package products

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomProductServiceCallback struct{}

func newEcomProductServiceCallback() *EcomProductServiceCallback {
	return &EcomProductServiceCallback{}
}

func (this *EcomProductServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomProduct)
	if !ok {
		return nil, false, errors.New("invalid EcomProduct type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ProductId)
	}
	err := validateEcomProduct(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomProductServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomProduct(item *ecom.EcomProduct, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ProductId, "ProductId"); err != nil {
		return err
	}
	return nil
}
