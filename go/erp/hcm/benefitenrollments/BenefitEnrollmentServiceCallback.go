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
package benefitenrollments

import (
	"github.com/saichler/l8erp/go/erp/hcm/lifeevents"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/benefitplans"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
)

func newBenefitEnrollmentServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("BenefitEnrollment",
		func(e *hcm.BenefitEnrollment) { common.GenerateID(&e.EnrollmentId) },
		validateBenEnroll)
}

func validateBenEnroll(entity *hcm.BenefitEnrollment, vnic ifs.IVNic) error {
	if err := validateBenEnrollRequiredFields(entity); err != nil {
		return err
	}
	if err := validateBenEnrollEnums(entity); err != nil {
		return err
	}
	if err := validateBenEnrollDates(entity); err != nil {
		return err
	}
	if err := validateBenEnrollBusinessRules(entity); err != nil {
		return err
	}
	if err := validateBenEnrollEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateBenEnrollPlan(entity, vnic); err != nil {
		return err
	}
	if err := validateBenEnrollLifeEvent(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateBenEnrollRequiredFields(entity *hcm.BenefitEnrollment) error {
	if err := common.ValidateRequired(entity.EnrollmentId, "EnrollmentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.PlanId, "PlanId"); err != nil {
		return err
	}
	return nil
}

func validateBenEnrollEnums(entity *hcm.BenefitEnrollment) error {
	if err := common.ValidateEnum(entity.Status, hcm.EnrollmentStatus_name, "Status"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Reason, hcm.EnrollmentReason_name, "Reason"); err != nil {
		return err
	}
	return nil
}

func validateBenEnrollDates(entity *hcm.BenefitEnrollment) error {
	if entity.CoverageStartDate != 0 && entity.CoverageEndDate != 0 {
		if err := common.ValidateDateAfter(entity.CoverageEndDate, entity.CoverageStartDate, "CoverageEndDate", "CoverageStartDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateBenEnrollBusinessRules(entity *hcm.BenefitEnrollment) error {
	// If status is CANCELLED, CoverageEndDate should be set
	isCancelled := entity.Status == hcm.EnrollmentStatus_ENROLLMENT_STATUS_CANCELLED
	if err := common.ValidateConditionalRequiredInt64(
		isCancelled, entity.CoverageEndDate,
		"Status is CANCELLED", "CoverageEndDate"); err != nil {
		return err
	}
	return nil
}

func validateBenEnrollEmployee(entity *hcm.BenefitEnrollment, vnic ifs.IVNic) error {
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

func validateBenEnrollPlan(entity *hcm.BenefitEnrollment, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.PlanId,
		"BenefitPlan",
		benefitplans.ServiceName,
		benefitplans.ServiceArea,
		benefitplans.BenefitPlans,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return benefitplans.BenefitPlan(id, vnic) },
		hcm.BenefitPlan{PlanId: entity.PlanId},
		vnic,
	)
}

func validateBenEnrollLifeEvent(entity *hcm.BenefitEnrollment, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.LifeEventId,
		"LifeEvent",
		lifeevents.ServiceName,
		lifeevents.ServiceArea,
		lifeevents.LifeEvents,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return lifeevents.LifeEvent(id, vnic) },
		hcm.LifeEvent{LifeEventId: entity.LifeEventId},
		vnic,
	)
}
