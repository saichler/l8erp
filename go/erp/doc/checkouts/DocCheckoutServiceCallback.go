/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package checkouts

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8types/go/ifs"
)

type DocCheckoutServiceCallback struct{}

func newDocCheckoutServiceCallback() *DocCheckoutServiceCallback {
	return &DocCheckoutServiceCallback{}
}

func (this *DocCheckoutServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*doc.DocCheckout)
	if !ok {
		return nil, false, errors.New("invalid DocCheckout type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.CheckoutId)
	}
	err := validateDocCheckout(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *DocCheckoutServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateDocCheckout(item *doc.DocCheckout, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.CheckoutId, "CheckoutId"); err != nil {
		return err
	}
	return nil
}
