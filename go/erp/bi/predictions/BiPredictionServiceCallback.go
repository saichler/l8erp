/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package predictions

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8types/go/ifs"
)

type BiPredictionServiceCallback struct{}

func newBiPredictionServiceCallback() *BiPredictionServiceCallback {
	return &BiPredictionServiceCallback{}
}

func (this *BiPredictionServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*bi.BiPrediction)
	if !ok {
		return nil, false, errors.New("invalid BiPrediction type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.PredictionId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BiPredictionServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *bi.BiPrediction, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.PredictionId, "PredictionId"); err != nil {
		return err
	}
	return nil
}
