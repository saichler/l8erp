/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package tags

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8types/go/ifs"
)

type DocTagServiceCallback struct{}

func newDocTagServiceCallback() *DocTagServiceCallback {
	return &DocTagServiceCallback{}
}

func (this *DocTagServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*doc.DocTag)
	if !ok {
		return nil, false, errors.New("invalid DocTag type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.TagId)
	}
	err := validateDocTag(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *DocTagServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateDocTag(item *doc.DocTag, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.TagId, "TagId"); err != nil {
		return err
	}
	return nil
}
