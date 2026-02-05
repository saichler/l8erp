/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package compliancereports

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompComplianceReportServiceCallback struct{}

func newCompComplianceReportServiceCallback() *CompComplianceReportServiceCallback {
	return &CompComplianceReportServiceCallback{}
}

func (this *CompComplianceReportServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompComplianceReport)
	if !ok {
		return nil, false, errors.New("invalid CompComplianceReport type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ReportId)
	}
	err := validateCompComplianceReport(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompComplianceReportServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompComplianceReport(item *comp.CompComplianceReport, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ReportId, "ReportId"); err != nil {
		return err
	}
	return nil
}
