/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package wishlists

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomWishlistServiceCallback struct{}

func newEcomWishlistServiceCallback() *EcomWishlistServiceCallback {
	return &EcomWishlistServiceCallback{}
}

func (this *EcomWishlistServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomWishlist)
	if !ok {
		return nil, false, errors.New("invalid EcomWishlist type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.WishlistId)
	}
	err := validateEcomWishlist(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomWishlistServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomWishlist(item *ecom.EcomWishlist, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.WishlistId, "WishlistId"); err != nil {
		return err
	}
	return nil
}
