/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package accounts

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

type CrmAccountServiceCallback struct{}

func newCrmAccountServiceCallback() *CrmAccountServiceCallback {
	return &CrmAccountServiceCallback{}
}

func (this *CrmAccountServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*crm.CrmAccount)
	if !ok {
		return nil, false, errors.New("invalid CrmAccount type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.AccountId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CrmAccountServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *crm.CrmAccount, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.AccountId, "AccountId"); err != nil {
		return err
	}
	return nil
}
