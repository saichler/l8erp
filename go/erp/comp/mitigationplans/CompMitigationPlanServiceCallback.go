/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package mitigationplans

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompMitigationPlanServiceCallback struct{}

func newCompMitigationPlanServiceCallback() *CompMitigationPlanServiceCallback {
	return &CompMitigationPlanServiceCallback{}
}

func (this *CompMitigationPlanServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompMitigationPlan)
	if !ok {
		return nil, false, errors.New("invalid CompMitigationPlan type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.PlanId)
	}
	err := validateCompMitigationPlan(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompMitigationPlanServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompMitigationPlan(item *comp.CompMitigationPlan, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.PlanId, "PlanId"); err != nil {
		return err
	}
	return nil
}
