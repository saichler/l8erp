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
package departments

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/organizations"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newDepartmentServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Department",
		func(e *hcm.Department) { common.GenerateID(&e.DepartmentId) },
		validateDept)
}

func validateDept(entity *hcm.Department, vnic ifs.IVNic) error {
	if err := validateDeptRequiredFields(entity); err != nil {
		return err
	}
	if err := validateDeptDates(entity); err != nil {
		return err
	}
	if err := validateDeptOrganization(entity, vnic); err != nil {
		return err
	}
	if err := validateDeptParent(entity, vnic); err != nil {
		return err
	}
	// Note: ManagerId validation skipped to avoid circular import with employees package
	return nil
}

func validateDeptRequiredFields(entity *hcm.Department) error {
	if err := common.ValidateRequired(entity.DepartmentId, "DepartmentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.OrganizationId, "OrganizationId"); err != nil {
		return err
	}
	return nil
}

func validateDeptDates(entity *hcm.Department) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateDeptOrganization(entity *hcm.Department, vnic ifs.IVNic) error {
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

func validateDeptParent(entity *hcm.Department, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.ParentDepartmentId,
		"ParentDepartment",
		ServiceName,
		ServiceArea,
		Departments,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return Department(id, vnic) },
		hcm.Department{DepartmentId: entity.ParentDepartmentId},
		vnic,
	)
}
