/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package images

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomImageServiceCallback struct{}

func newEcomImageServiceCallback() *EcomImageServiceCallback {
	return &EcomImageServiceCallback{}
}

func (this *EcomImageServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomImage)
	if !ok {
		return nil, false, errors.New("invalid EcomImage type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ImageId)
	}
	err := validateEcomImage(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomImageServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomImage(item *ecom.EcomImage, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ImageId, "ImageId"); err != nil {
		return err
	}
	return nil
}
