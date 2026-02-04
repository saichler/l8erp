/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package servicevisits

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

type CrmServiceVisitServiceCallback struct{}

func newCrmServiceVisitServiceCallback() *CrmServiceVisitServiceCallback {
	return &CrmServiceVisitServiceCallback{}
}

func (this *CrmServiceVisitServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*crm.CrmServiceVisit)
	if !ok {
		return nil, false, errors.New("invalid CrmServiceVisit type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.VisitId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CrmServiceVisitServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *crm.CrmServiceVisit, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.VisitId, "VisitId"); err != nil {
		return err
	}
	return nil
}
