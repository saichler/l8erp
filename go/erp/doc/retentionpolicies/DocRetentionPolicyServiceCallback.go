/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package retentionpolicies

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8types/go/ifs"
)

type DocRetentionPolicyServiceCallback struct{}

func newDocRetentionPolicyServiceCallback() *DocRetentionPolicyServiceCallback {
	return &DocRetentionPolicyServiceCallback{}
}

func (this *DocRetentionPolicyServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*doc.DocRetentionPolicy)
	if !ok {
		return nil, false, errors.New("invalid DocRetentionPolicy type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.PolicyId)
	}
	err := validateDocRetentionPolicy(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *DocRetentionPolicyServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateDocRetentionPolicy(item *doc.DocRetentionPolicy, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.PolicyId, "PolicyId"); err != nil {
		return err
	}
	return nil
}
