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
package positions

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/departments"
	"github.com/saichler/l8erp/go/erp/hcm/jobs"
	"github.com/saichler/l8erp/go/erp/hcm/organizations"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newPositionServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Position",
		func(e *hcm.Position) { common.GenerateID(&e.PositionId) },
		validatePos)
}

func validatePos(entity *hcm.Position, vnic ifs.IVNic) error {
	if err := validatePosRequiredFields(entity); err != nil {
		return err
	}
	if err := validatePosEnums(entity); err != nil {
		return err
	}
	if err := validatePosDates(entity); err != nil {
		return err
	}
	if err := validatePosJob(entity, vnic); err != nil {
		return err
	}
	if err := validatePosDepartment(entity, vnic); err != nil {
		return err
	}
	if err := validatePosOrganization(entity, vnic); err != nil {
		return err
	}
	if err := validatePosReportsTo(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validatePosRequiredFields(entity *hcm.Position) error {
	if err := common.ValidateRequired(entity.PositionId, "PositionId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Title, "Title"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.DepartmentId, "DepartmentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.OrganizationId, "OrganizationId"); err != nil {
		return err
	}
	return nil
}

func validatePosEnums(entity *hcm.Position) error {
	if err := common.ValidateEnum(entity.Status, hcm.PositionStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validatePosDates(entity *hcm.Position) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}

func validatePosJob(entity *hcm.Position, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.JobId,
		"Job",
		jobs.ServiceName,
		jobs.ServiceArea,
		jobs.Jobs,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return jobs.Job(id, vnic) },
		hcm.Job{JobId: entity.JobId},
		vnic,
	)
}

func validatePosDepartment(entity *hcm.Position, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.DepartmentId,
		"Department",
		departments.ServiceName,
		departments.ServiceArea,
		departments.Departments,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return departments.Department(id, vnic) },
		hcm.Department{DepartmentId: entity.DepartmentId},
		vnic,
	)
}

func validatePosOrganization(entity *hcm.Position, vnic ifs.IVNic) error {
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

func validatePosReportsTo(entity *hcm.Position, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.ReportsToPositionId,
		"ReportsToPosition",
		ServiceName,
		ServiceArea,
		Positions,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return Position(id, vnic) },
		hcm.Position{PositionId: entity.ReportsToPositionId},
		vnic,
	)
}
