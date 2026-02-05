/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package riskassessments

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompRiskAssessmentServiceCallback struct{}

func newCompRiskAssessmentServiceCallback() *CompRiskAssessmentServiceCallback {
	return &CompRiskAssessmentServiceCallback{}
}

func (this *CompRiskAssessmentServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompRiskAssessment)
	if !ok {
		return nil, false, errors.New("invalid CompRiskAssessment type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.AssessmentId)
	}
	err := validateCompRiskAssessment(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompRiskAssessmentServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompRiskAssessment(item *comp.CompRiskAssessment, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.AssessmentId, "AssessmentId"); err != nil {
		return err
	}
	return nil
}
