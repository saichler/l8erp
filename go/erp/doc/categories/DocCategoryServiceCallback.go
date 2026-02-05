/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package categories

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8types/go/ifs"
)

type DocCategoryServiceCallback struct{}

func newDocCategoryServiceCallback() *DocCategoryServiceCallback {
	return &DocCategoryServiceCallback{}
}

func (this *DocCategoryServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*doc.DocCategory)
	if !ok {
		return nil, false, errors.New("invalid DocCategory type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.CategoryId)
	}
	err := validateDocCategory(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *DocCategoryServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateDocCategory(item *doc.DocCategory, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.CategoryId, "CategoryId"); err != nil {
		return err
	}
	return nil
}
