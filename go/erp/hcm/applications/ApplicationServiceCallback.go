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
package applications

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/applicants"
	"github.com/saichler/l8erp/go/erp/hcm/jobrequisitions"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

func newApplicationServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallbackWithAfter("Application",
		func(e *hcm.Application) { common.GenerateID(&e.ApplicationId) },
		validateApplctn,
		nil,
		[]common.ActionValidateFunc[hcm.Application]{cascadeCreateEmployee},
	)
}

func validateApplctn(entity *hcm.Application, vnic ifs.IVNic) error {
	if err := validateApplctnRequiredFields(entity); err != nil {
		return err
	}
	if err := validateApplctnEnums(entity); err != nil {
		return err
	}
	if err := validateApplctnApplicant(entity, vnic); err != nil {
		return err
	}
	if err := validateApplctnRequisition(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateApplctnRequiredFields(entity *hcm.Application) error {
	if err := common.ValidateRequired(entity.ApplicationId, "ApplicationId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.ApplicantId, "ApplicantId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.RequisitionId, "RequisitionId"); err != nil {
		return err
	}
	return nil
}

func validateApplctnEnums(entity *hcm.Application) error {
	if err := common.ValidateEnum(entity.Status, hcm.ApplicationStatus_name, "Status"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Stage, hcm.ApplicationStage_name, "Stage"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.DispositionReason, hcm.DispositionReason_name, "DispositionReason"); err != nil {
		return err
	}
	return nil
}

func validateApplctnApplicant(entity *hcm.Application, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.ApplicantId,
		"Applicant",
		applicants.ServiceName,
		applicants.ServiceArea,
		applicants.Applicants,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return applicants.Applicant(id, vnic) },
		hcm.Applicant{ApplicantId: entity.ApplicantId},
		vnic,
	)
}

func validateApplctnRequisition(entity *hcm.Application, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.RequisitionId,
		"JobRequisition",
		jobrequisitions.ServiceName,
		jobrequisitions.ServiceArea,
		jobrequisitions.JobRequisitions,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return jobrequisitions.JobRequisition(id, vnic) },
		hcm.JobRequisition{RequisitionId: entity.RequisitionId},
		vnic,
	)
}

// cascadeCreateEmployee auto-creates an Employee and default onboarding tasks
// when an application status is set to HIRED.
func cascadeCreateEmployee(app *hcm.Application, action ifs.Action, vnic ifs.IVNic) error {
	if app.Status != hcm.ApplicationStatus_APPLICATION_STATUS_HIRED {
		return nil
	}
	// Idempotency: check if employee already linked to this application
	exists, err := common.EntityExists("Employee", 30,
		&hcm.Employee{ApplicationId: app.ApplicationId}, vnic)
	if err != nil || exists {
		return err
	}
	// Look up applicant for personal info
	applicant, _ := common.GetEntity("Applicant", 30,
		&hcm.Applicant{ApplicantId: app.ApplicantId}, vnic)
	// Look up requisition for org placement
	req, _ := common.GetEntity("JobReq", 30,
		&hcm.JobRequisition{RequisitionId: app.RequisitionId}, vnic)

	emp := &hcm.Employee{
		EmploymentStatus: hcm.EmploymentStatus_EMPLOYMENT_STATUS_ACTIVE,
		HireDate:         time.Now().Unix(),
		ApplicationId:    app.ApplicationId,
		AuditInfo:        &erp.AuditInfo{},
	}
	if applicant != nil {
		emp.FirstName = applicant.FirstName
		emp.LastName = applicant.LastName
	}
	if req != nil {
		emp.DepartmentId = req.DepartmentId
		emp.JobId = req.JobId
		emp.PositionId = req.PositionId
		emp.OrganizationId = req.OrganizationId
		emp.WorkLocationId = req.WorkLocationId
		emp.EmploymentType = req.EmploymentType
	}

	created, err := common.PostEntity("Employee", 30, emp, vnic)
	if err != nil {
		return err
	}
	employeeId := created.EmployeeId

	// Create default onboarding tasks
	tasks := []struct {
		name     string
		category hcm.OnboardingTaskCategory
		seq      int32
	}{
		{"Complete HR Paperwork", hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_PAPERWORK, 1},
		{"IT System Setup", hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_IT_SETUP, 2},
		{"Equipment Provisioning", hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_EQUIPMENT, 3},
		{"Benefits Enrollment", hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_BENEFITS, 4},
		{"Compliance Training", hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_COMPLIANCE, 5},
		{"Team Introduction", hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_INTRODUCTION, 6},
		{"New Hire Orientation", hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_ORIENTATION, 7},
	}
	for _, t := range tasks {
		if _, err := common.PostEntity("OnbrdTsk", 30, &hcm.OnboardingTask{
			EmployeeId:    employeeId,
			Name:          t.name,
			Category:      t.category,
			SequenceOrder: t.seq,
			Status:        hcm.OnboardingTaskStatus_ONBOARDING_TASK_STATUS_NOT_STARTED,
			DueDate:       time.Now().Add(30 * 24 * time.Hour).Unix(),
			AuditInfo:     &erp.AuditInfo{},
		}, vnic); err != nil {
			return err
		}
	}
	return nil
}
