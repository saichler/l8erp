/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package pricerules

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

type EcomPriceRuleServiceCallback struct{}

func newEcomPriceRuleServiceCallback() *EcomPriceRuleServiceCallback {
	return &EcomPriceRuleServiceCallback{}
}

func (this *EcomPriceRuleServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*ecom.EcomPriceRule)
	if !ok {
		return nil, false, errors.New("invalid EcomPriceRule type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.RuleId)
	}
	err := validateEcomPriceRule(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EcomPriceRuleServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEcomPriceRule(item *ecom.EcomPriceRule, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.RuleId, "RuleId"); err != nil {
		return err
	}
	return nil
}
