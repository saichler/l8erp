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
package bonuspayments

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/bonusplans"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newBonusPaymentServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("BonusPayment",
		func(e *hcm.BonusPayment) { common.GenerateID(&e.PaymentId) },
		validateBonusPay)
}

func validateBonusPay(entity *hcm.BonusPayment, vnic ifs.IVNic) error {
	if err := validateBonusPayRequiredFields(entity); err != nil {
		return err
	}
	if err := validateBonusPayEnums(entity); err != nil {
		return err
	}
	if err := validateBonusPayDates(entity); err != nil {
		return err
	}
	if err := validateBonusPayEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateBonusPayPlan(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateBonusPayRequiredFields(entity *hcm.BonusPayment) error {
	if err := common.ValidateRequired(entity.PaymentId, "PaymentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateBonusPayEnums(entity *hcm.BonusPayment) error {
	if err := common.ValidateEnum(entity.Status, hcm.BonusPaymentStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateBonusPayDates(entity *hcm.BonusPayment) error {
	if entity.AwardDate != 0 && entity.ApprovedDate != 0 {
		if err := common.ValidateDateAfter(entity.ApprovedDate, entity.AwardDate, "ApprovedDate", "AwardDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateBonusPayEmployee(entity *hcm.BonusPayment, vnic ifs.IVNic) error {
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

func validateBonusPayPlan(entity *hcm.BonusPayment, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.BonusPlanId,
		"BonusPlan",
		bonusplans.ServiceName,
		bonusplans.ServiceArea,
		bonusplans.BonusPlans,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return bonusplans.BonusPlan(id, vnic) },
		hcm.BonusPlan{PlanId: entity.BonusPlanId},
		vnic,
	)
}
