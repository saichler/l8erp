/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package audittrails

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8types/go/ifs"
)

type DocAuditTrailServiceCallback struct{}

func newDocAuditTrailServiceCallback() *DocAuditTrailServiceCallback {
	return &DocAuditTrailServiceCallback{}
}

func (this *DocAuditTrailServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*doc.DocAuditTrail)
	if !ok {
		return nil, false, errors.New("invalid DocAuditTrail type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.TrailId)
	}
	err := validateDocAuditTrail(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *DocAuditTrailServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateDocAuditTrail(item *doc.DocAuditTrail, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.TrailId, "TrailId"); err != nil {
		return err
	}
	return nil
}
