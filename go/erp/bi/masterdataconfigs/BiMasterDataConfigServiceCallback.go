/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package masterdataconfigs

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8types/go/ifs"
)

type BiMasterDataConfigServiceCallback struct{}

func newBiMasterDataConfigServiceCallback() *BiMasterDataConfigServiceCallback {
	return &BiMasterDataConfigServiceCallback{}
}

func (this *BiMasterDataConfigServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*bi.BiMasterDataConfig)
	if !ok {
		return nil, false, errors.New("invalid BiMasterDataConfig type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ConfigId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BiMasterDataConfigServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *bi.BiMasterDataConfig, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ConfigId, "ConfigId"); err != nil {
		return err
	}
	return nil
}
