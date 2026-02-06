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
package skills

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newSkillServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Skill",
		func(e *hcm.Skill) { common.GenerateID(&e.SkillId) },
		validateSkill)
}

func validateSkill(entity *hcm.Skill, vnic ifs.IVNic) error {
	if err := validateSkillRequiredFields(entity); err != nil {
		return err
	}
	if err := validateSkillEnums(entity); err != nil {
		return err
	}
	return nil
}

func validateSkillRequiredFields(entity *hcm.Skill) error {
	if err := common.ValidateRequired(entity.SkillId, "SkillId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateSkillEnums(entity *hcm.Skill) error {
	if err := common.ValidateEnum(int32(entity.Category), hcm.SkillCategory_name, "Category"); err != nil {
		return err
	}
	return nil
}
