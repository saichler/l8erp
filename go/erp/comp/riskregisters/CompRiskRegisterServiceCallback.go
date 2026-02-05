/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package riskregisters

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompRiskRegisterServiceCallback struct{}

func newCompRiskRegisterServiceCallback() *CompRiskRegisterServiceCallback {
	return &CompRiskRegisterServiceCallback{}
}

func (this *CompRiskRegisterServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompRiskRegister)
	if !ok {
		return nil, false, errors.New("invalid CompRiskRegister type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.RiskId)
	}
	err := validateCompRiskRegister(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompRiskRegisterServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompRiskRegister(item *comp.CompRiskRegister, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.RiskId, "RiskId"); err != nil {
		return err
	}
	return nil
}
