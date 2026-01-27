// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package employeeskills

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/skills"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type EmployeeSkillServiceCallback struct {
}

func newEmployeeSkillServiceCallback() *EmployeeSkillServiceCallback {
	return &EmployeeSkillServiceCallback{}
}

func (this *EmployeeSkillServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.EmployeeSkill)
	if !ok {
		return nil, false, errors.New("invalid employee skill type")
	}
	err := validateEmployeeSkill(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EmployeeSkillServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEmployeeSkill(entity *hcm.EmployeeSkill, vnic ifs.IVNic) error {
	if err := validateEmpSkillRequiredFields(entity); err != nil {
		return err
	}
	if err := validateEmpSkillEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateEmpSkillSkill(entity, vnic); err != nil {
		return err
	}
	if err := validateEmpSkillAssessedBy(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateEmpSkillRequiredFields(entity *hcm.EmployeeSkill) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.SkillId, "SkillId"); err != nil {
		return err
	}
	return nil
}

func validateEmpSkillEmployee(entity *hcm.EmployeeSkill, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.EmployeeId,
		"Employee",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.EmployeeId},
		vnic,
	)
}

func validateEmpSkillSkill(entity *hcm.EmployeeSkill, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.SkillId,
		"Skill",
		skills.ServiceName,
		skills.ServiceArea,
		skills.Skills,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return skills.Skill(id, vnic) },
		hcm.Skill{SkillId: entity.SkillId},
		vnic,
	)
}

func validateEmpSkillAssessedBy(entity *hcm.EmployeeSkill, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.AssessedBy,
		"AssessedBy",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.AssessedBy},
		vnic,
	)
}
