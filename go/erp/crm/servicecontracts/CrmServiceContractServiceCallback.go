/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package servicecontracts

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

type CrmServiceContractServiceCallback struct{}

func newCrmServiceContractServiceCallback() *CrmServiceContractServiceCallback {
	return &CrmServiceContractServiceCallback{}
}

func (this *CrmServiceContractServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*crm.CrmServiceContract)
	if !ok {
		return nil, false, errors.New("invalid CrmServiceContract type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ContractId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CrmServiceContractServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *crm.CrmServiceContract, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ContractId, "ContractId"); err != nil {
		return err
	}
	return nil
}
