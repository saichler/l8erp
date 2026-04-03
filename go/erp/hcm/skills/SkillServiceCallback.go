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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newSkillServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewServiceCallback("Skill",
		func(v interface{}) bool { _, ok := v.(*hcm.Skill); return ok },
		func(v interface{}) { common.GenerateID(&v.(*hcm.Skill).SkillId) },
		func(v interface{}, vnic ifs.IVNic) error { return validateSkill(v.(*hcm.Skill), vnic) })
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
	if err := common.ValidateEnum(entity.Category, hcm.SkillCategory_name, "Category"); err != nil {
		return err
	}
	return nil
}
