/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package resourceforecasts

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
)

type PrjResourceForecastServiceCallback struct{}

func newPrjResourceForecastServiceCallback() *PrjResourceForecastServiceCallback {
	return &PrjResourceForecastServiceCallback{}
}

func (this *PrjResourceForecastServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*prj.PrjResourceForecast)
	if !ok {
		return nil, false, errors.New("invalid PrjResourceForecast type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ForecastId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *PrjResourceForecastServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *prj.PrjResourceForecast, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ForecastId, "ForecastId"); err != nil {
		return err
	}
	return nil
}
