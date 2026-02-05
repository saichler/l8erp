/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package approvalmatrices

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompApprovalMatrixServiceCallback struct{}

func newCompApprovalMatrixServiceCallback() *CompApprovalMatrixServiceCallback {
	return &CompApprovalMatrixServiceCallback{}
}

func (this *CompApprovalMatrixServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompApprovalMatrix)
	if !ok {
		return nil, false, errors.New("invalid CompApprovalMatrix type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.MatrixId)
	}
	err := validateCompApprovalMatrix(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompApprovalMatrixServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompApprovalMatrix(item *comp.CompApprovalMatrix, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.MatrixId, "MatrixId"); err != nil {
		return err
	}
	return nil
}
