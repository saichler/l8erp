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
package successionplans

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/positions"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type SuccessionPlanServiceCallback struct {
}

func newSuccessionPlanServiceCallback() *SuccessionPlanServiceCallback {
	return &SuccessionPlanServiceCallback{}
}

func (this *SuccessionPlanServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.SuccessionPlan)
	if !ok {
		return nil, false, errors.New("invalid succession plan type")
	}
	if action == ifs.POST {
		common.GenerateID(&entity.PlanId)
	}
	err := validateSuccPlan(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *SuccessionPlanServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateSuccPlan(entity *hcm.SuccessionPlan, vnic ifs.IVNic) error {
	if err := validateSuccPlanRequiredFields(entity); err != nil {
		return err
	}
	if err := validateSuccPlanEnums(entity); err != nil {
		return err
	}
	if err := validateSuccPlanPosition(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateSuccPlanRequiredFields(entity *hcm.SuccessionPlan) error {
	if err := common.ValidateRequired(entity.PlanId, "PlanId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.PositionId, "PositionId"); err != nil {
		return err
	}
	return nil
}

func validateSuccPlanEnums(entity *hcm.SuccessionPlan) error {
	if err := common.ValidateEnum(entity.Status, hcm.SuccessionPlanStatus_name, "Status"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.VacancyRisk, hcm.RiskLevel_name, "VacancyRisk"); err != nil {
		return err
	}
	return nil
}

func validateSuccPlanPosition(entity *hcm.SuccessionPlan, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.PositionId,
		"Position",
		positions.ServiceName,
		positions.ServiceArea,
		positions.Positions,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return positions.Position(id, vnic) },
		hcm.Position{PositionId: entity.PositionId},
		vnic,
	)
}
