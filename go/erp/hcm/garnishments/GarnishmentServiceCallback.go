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
package garnishments

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/erp/common"
)

func newGarnishmentServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Garnishment",
		func(e *hcm.Garnishment) { common.GenerateID(&e.GarnishmentId) },
		validateGarnish)
}

func validateGarnish(entity *hcm.Garnishment, vnic ifs.IVNic) error {
	if err := validateGarnishRequiredFields(entity); err != nil {
		return err
	}
	if err := validateGarnishEnums(entity); err != nil {
		return err
	}
	if err := validateGarnishDates(entity); err != nil {
		return err
	}
	if err := validateGarnishEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateGarnishRequiredFields(entity *hcm.Garnishment) error {
	if err := common.ValidateRequired(entity.GarnishmentId, "GarnishmentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateGarnishEnums(entity *hcm.Garnishment) error {
	if err := common.ValidateEnum(entity.GarnishmentType, hcm.GarnishmentType_name, "GarnishmentType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.GarnishmentStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateGarnishDates(entity *hcm.Garnishment) error {
	if entity.StartDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.StartDate, "EndDate", "StartDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateGarnishEmployee(entity *hcm.Garnishment, vnic ifs.IVNic) error {
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
