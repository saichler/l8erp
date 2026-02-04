/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package reporttemplates

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8types/go/ifs"
)

type BiReportTemplateServiceCallback struct{}

func newBiReportTemplateServiceCallback() *BiReportTemplateServiceCallback {
	return &BiReportTemplateServiceCallback{}
}

func (this *BiReportTemplateServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*bi.BiReportTemplate)
	if !ok {
		return nil, false, errors.New("invalid BiReportTemplate type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.TemplateId)
	}
	err := validateBiReportTemplate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BiReportTemplateServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateBiReportTemplate(item *bi.BiReportTemplate, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.TemplateId, "TemplateId"); err != nil {
		return err
	}
	return nil
}
