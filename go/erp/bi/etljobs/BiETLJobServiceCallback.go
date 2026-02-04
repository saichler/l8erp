/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package etljobs

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8types/go/ifs"
)

type BiETLJobServiceCallback struct{}

func newBiETLJobServiceCallback() *BiETLJobServiceCallback {
	return &BiETLJobServiceCallback{}
}

func (this *BiETLJobServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*bi.BiETLJob)
	if !ok {
		return nil, false, errors.New("invalid BiETLJob type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.JobId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BiETLJobServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *bi.BiETLJob, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.JobId, "JobId"); err != nil {
		return err
	}
	return nil
}
