/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package coupons

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomCouponServiceCallback struct{}

func newEcomCouponServiceCallback() *EcomCouponServiceCallback {
	return &EcomCouponServiceCallback{}
}

func (this *EcomCouponServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomCoupon)
	if !ok {
		return nil, false, errors.New("invalid EcomCoupon type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.CouponId)
	}
	err := validateEcomCoupon(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomCouponServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomCoupon(item *ecom.EcomCoupon, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.CouponId, "CouponId"); err != nil {
		return err
	}
	return nil
}
