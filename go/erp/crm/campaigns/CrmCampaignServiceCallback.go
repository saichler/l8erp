/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package campaigns

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

type CrmCampaignServiceCallback struct{}

func newCrmCampaignServiceCallback() *CrmCampaignServiceCallback {
	return &CrmCampaignServiceCallback{}
}

func (this *CrmCampaignServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*crm.CrmCampaign)
	if !ok {
		return nil, false, errors.New("invalid CrmCampaign type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.CampaignId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CrmCampaignServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *crm.CrmCampaign, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.CampaignId, "CampaignId"); err != nil {
		return err
	}
	return nil
}
