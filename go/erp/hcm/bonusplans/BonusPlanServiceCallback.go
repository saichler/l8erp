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
package bonusplans

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type BonusPlanServiceCallback struct {
}

func newBonusPlanServiceCallback() *BonusPlanServiceCallback {
	return &BonusPlanServiceCallback{}
}

func (this *BonusPlanServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.BonusPlan)
	if !ok {
		return nil, false, errors.New("invalid bonus plan type")
	}
	err := validateBonusPlan(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *BonusPlanServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateBonusPlan(entity *hcm.BonusPlan) error {
	if err := validateBonusPlanRequiredFields(entity); err != nil {
		return err
	}
	if err := validateBonusPlanEnums(entity); err != nil {
		return err
	}
	if err := validateBonusPlanDates(entity); err != nil {
		return err
	}
	return nil
}

func validateBonusPlanRequiredFields(entity *hcm.BonusPlan) error {
	if err := common.ValidateRequired(entity.PlanId, "PlanId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateBonusPlanEnums(entity *hcm.BonusPlan) error {
	if err := common.ValidateEnum(entity.PlanType, hcm.BonusPlanType_name, "PlanType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.FundingType, hcm.BonusFundingType_name, "FundingType"); err != nil {
		return err
	}
	return nil
}

func validateBonusPlanDates(entity *hcm.BonusPlan) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}
