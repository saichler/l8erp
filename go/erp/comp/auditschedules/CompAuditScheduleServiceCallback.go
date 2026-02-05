/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package auditschedules

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompAuditScheduleServiceCallback struct{}

func newCompAuditScheduleServiceCallback() *CompAuditScheduleServiceCallback {
	return &CompAuditScheduleServiceCallback{}
}

func (this *CompAuditScheduleServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompAuditSchedule)
	if !ok {
		return nil, false, errors.New("invalid CompAuditSchedule type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ScheduleId)
	}
	err := validateCompAuditSchedule(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompAuditScheduleServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompAuditSchedule(item *comp.CompAuditSchedule, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ScheduleId, "ScheduleId"); err != nil {
		return err
	}
	return nil
}
