/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package interactions

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

type CrmInteractionServiceCallback struct{}

func newCrmInteractionServiceCallback() *CrmInteractionServiceCallback {
	return &CrmInteractionServiceCallback{}
}

func (this *CrmInteractionServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*crm.CrmInteraction)
	if !ok {
		return nil, false, errors.New("invalid CrmInteraction type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.InteractionId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CrmInteractionServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *crm.CrmInteraction, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.InteractionId, "InteractionId"); err != nil {
		return err
	}
	return nil
}
