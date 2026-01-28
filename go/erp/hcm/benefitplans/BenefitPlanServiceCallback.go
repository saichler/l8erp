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
package benefitplans

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/carriers"
	"github.com/saichler/l8erp/go/erp/hcm/organizations"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type BenefitPlanServiceCallback struct {
}

func newBenefitPlanServiceCallback() *BenefitPlanServiceCallback {
	return &BenefitPlanServiceCallback{}
}

func (this *BenefitPlanServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.BenefitPlan)
	if !ok {
		return nil, false, errors.New("invalid benefit plan type")
	}
	err := validateBenPlan(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BenefitPlanServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateBenPlan(entity *hcm.BenefitPlan, vnic ifs.IVNic) error {
	if err := validateBenPlanRequiredFields(entity); err != nil {
		return err
	}
	if err := validateBenPlanEnums(entity); err != nil {
		return err
	}
	if err := validateBenPlanDates(entity); err != nil {
		return err
	}
	if err := validateBenPlanOrganization(entity, vnic); err != nil {
		return err
	}
	if err := validateBenPlanCarrier(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateBenPlanRequiredFields(entity *hcm.BenefitPlan) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.OrganizationId, "OrganizationId"); err != nil {
		return err
	}
	return nil
}

func validateBenPlanEnums(entity *hcm.BenefitPlan) error {
	if err := common.ValidateEnum(entity.PlanType, hcm.BenefitPlanType_name, "PlanType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Category, hcm.BenefitPlanCategory_name, "Category"); err != nil {
		return err
	}
	return nil
}

func validateBenPlanDates(entity *hcm.BenefitPlan) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	if entity.OpenEnrollmentStart != 0 && entity.OpenEnrollmentEnd != 0 {
		if err := common.ValidateDateAfter(entity.OpenEnrollmentEnd, entity.OpenEnrollmentStart, "OpenEnrollmentEnd", "OpenEnrollmentStart"); err != nil {
			return err
		}
	}
	return nil
}

func validateBenPlanOrganization(entity *hcm.BenefitPlan, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.OrganizationId,
		"Organization",
		organizations.ServiceName,
		organizations.ServiceArea,
		organizations.Organizations,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return organizations.Organization(id, vnic) },
		hcm.Organization{OrganizationId: entity.OrganizationId},
		vnic,
	)
}

func validateBenPlanCarrier(entity *hcm.BenefitPlan, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.CarrierId,
		"Carrier",
		carriers.ServiceName,
		carriers.ServiceArea,
		carriers.Carriers,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return carriers.Carrier(id, vnic) },
		hcm.Carrier{CarrierId: entity.CarrierId},
		vnic,
	)
}
