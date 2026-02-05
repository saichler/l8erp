/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package attributes

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomAttributeServiceCallback struct{}

func newEcomAttributeServiceCallback() *EcomAttributeServiceCallback {
	return &EcomAttributeServiceCallback{}
}

func (this *EcomAttributeServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomAttribute)
	if !ok {
		return nil, false, errors.New("invalid EcomAttribute type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.AttributeId)
	}
	err := validateEcomAttribute(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomAttributeServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomAttribute(item *ecom.EcomAttribute, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.AttributeId, "AttributeId"); err != nil {
		return err
	}
	return nil
}
