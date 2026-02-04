/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package leadsources

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

type CrmLeadSourceServiceCallback struct{}

func newCrmLeadSourceServiceCallback() *CrmLeadSourceServiceCallback {
	return &CrmLeadSourceServiceCallback{}
}

func (this *CrmLeadSourceServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*crm.CrmLeadSource)
	if !ok {
		return nil, false, errors.New("invalid CrmLeadSource type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.SourceId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CrmLeadSourceServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *crm.CrmLeadSource, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.SourceId, "SourceId"); err != nil {
		return err
	}
	return nil
}
