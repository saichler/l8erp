/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package oppteams

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

type CrmOppTeamServiceCallback struct{}

func newCrmOppTeamServiceCallback() *CrmOppTeamServiceCallback {
	return &CrmOppTeamServiceCallback{}
}

func (this *CrmOppTeamServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*crm.CrmOppTeam)
	if !ok {
		return nil, false, errors.New("invalid CrmOppTeam type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.MemberId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CrmOppTeamServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *crm.CrmOppTeam, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.MemberId, "MemberId"); err != nil {
		return err
	}
	return nil
}
