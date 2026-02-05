/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

This software is provided "as-is," without warranty. See the License
for details.
*/

package certifications

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

type CompCertificationServiceCallback struct{}

func newCompCertificationServiceCallback() *CompCertificationServiceCallback {
	return &CompCertificationServiceCallback{}
}

func (this *CompCertificationServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*comp.CompCertification)
	if !ok {
		return nil, false, errors.New("invalid CompCertification type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.CertificationId)
	}
	err := validateCompCertification(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CompCertificationServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCompCertification(item *comp.CompCertification, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.CertificationId, "CertificationId"); err != nil {
		return err
	}
	return nil
}
