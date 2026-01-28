/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package organizations

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type OrganizationServiceCallback struct {
}

func newOrganizationServiceCallback() *OrganizationServiceCallback {
	return &OrganizationServiceCallback{}
}

func (this *OrganizationServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Organization)
	if !ok {
		return nil, false, errors.New("invalid organization type")
	}
	err := validateOrg(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *OrganizationServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateOrg(entity *hcm.Organization, vnic ifs.IVNic) error {
	if err := validateOrgRequiredFields(entity); err != nil {
		return err
	}
	if err := validateOrgEnums(entity); err != nil {
		return err
	}
	if err := validateOrgDates(entity); err != nil {
		return err
	}
	if err := validateOrgReferences(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateOrgRequiredFields(entity *hcm.Organization) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateOrgEnums(entity *hcm.Organization) error {
	if err := common.ValidateEnum(entity.OrganizationType, hcm.OrganizationType_name, "OrganizationType"); err != nil {
		return err
	}
	return nil
}

func validateOrgDates(entity *hcm.Organization) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateOrgReferences(entity *hcm.Organization, vnic ifs.IVNic) error {
	// Self-reference: ParentOrganizationId
	return common.ValidateReference(
		entity.ParentOrganizationId,
		"ParentOrganization",
		ServiceName,
		ServiceArea,
		Organizations,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return Organization(id, vnic) },
		hcm.Organization{OrganizationId: entity.ParentOrganizationId},
		vnic,
	)
}
