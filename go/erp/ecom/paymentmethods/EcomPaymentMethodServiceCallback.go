/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package paymentmethods

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomPaymentMethodServiceCallback struct{}

func newEcomPaymentMethodServiceCallback() *EcomPaymentMethodServiceCallback {
	return &EcomPaymentMethodServiceCallback{}
}

func (this *EcomPaymentMethodServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomPaymentMethod)
	if !ok {
		return nil, false, errors.New("invalid EcomPaymentMethod type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.MethodId)
	}
	err := validateEcomPaymentMethod(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomPaymentMethodServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomPaymentMethod(item *ecom.EcomPaymentMethod, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.MethodId, "MethodId"); err != nil {
		return err
	}
	return nil
}
