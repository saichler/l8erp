/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package violationrecords

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompViolationRecordServiceCallback struct{}

func newCompViolationRecordServiceCallback() *CompViolationRecordServiceCallback {
	return &CompViolationRecordServiceCallback{}
}

func (this *CompViolationRecordServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompViolationRecord)
	if !ok {
		return nil, false, errors.New("invalid CompViolationRecord type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ViolationId)
	}
	err := validateCompViolationRecord(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompViolationRecordServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompViolationRecord(item *comp.CompViolationRecord, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ViolationId, "ViolationId"); err != nil {
		return err
	}
	return nil
}
