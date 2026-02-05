/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package customeraddresses

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomCustomerAddressServiceCallback struct{}

func newEcomCustomerAddressServiceCallback() *EcomCustomerAddressServiceCallback {
	return &EcomCustomerAddressServiceCallback{}
}

func (this *EcomCustomerAddressServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomCustomerAddress)
	if !ok {
		return nil, false, errors.New("invalid EcomCustomerAddress type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.AddressId)
	}
	err := validateEcomCustomerAddress(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomCustomerAddressServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomCustomerAddress(item *ecom.EcomCustomerAddress, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.AddressId, "AddressId"); err != nil {
		return err
	}
	return nil
}
