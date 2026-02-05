/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package versions

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8types/go/ifs"
)

type DocDocumentVersionServiceCallback struct{}

func newDocDocumentVersionServiceCallback() *DocDocumentVersionServiceCallback {
	return &DocDocumentVersionServiceCallback{}
}

func (this *DocDocumentVersionServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*doc.DocDocumentVersion)
	if !ok {
		return nil, false, errors.New("invalid DocDocumentVersion type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.VersionId)
	}
	err := validateDocDocumentVersion(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *DocDocumentVersionServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateDocDocumentVersion(item *doc.DocDocumentVersion, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.VersionId, "VersionId"); err != nil {
		return err
	}
	return nil
}
