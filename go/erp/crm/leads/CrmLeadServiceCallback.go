/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package leads

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

type CrmLeadServiceCallback struct{}

func newCrmLeadServiceCallback() *CrmLeadServiceCallback {
	return &CrmLeadServiceCallback{}
}

func (this *CrmLeadServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*crm.CrmLead)
	if !ok {
		return nil, false, errors.New("invalid CrmLead type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.LeadId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CrmLeadServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *crm.CrmLead, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.LeadId, "LeadId"); err != nil {
		return err
	}
	return nil
}
