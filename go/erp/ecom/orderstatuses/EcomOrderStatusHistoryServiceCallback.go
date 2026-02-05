/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package orderstatuses

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomOrderStatusHistoryServiceCallback struct{}

func newEcomOrderStatusHistoryServiceCallback() *EcomOrderStatusHistoryServiceCallback {
	return &EcomOrderStatusHistoryServiceCallback{}
}

func (this *EcomOrderStatusHistoryServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomOrderStatusHistory)
	if !ok {
		return nil, false, errors.New("invalid EcomOrderStatusHistory type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.StatusId)
	}
	err := validateEcomOrderStatusHistory(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomOrderStatusHistoryServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomOrderStatusHistory(item *ecom.EcomOrderStatusHistory, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.StatusId, "StatusId"); err != nil {
		return err
	}
	return nil
}
