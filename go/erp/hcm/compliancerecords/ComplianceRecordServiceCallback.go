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
package compliancerecords

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newComplianceRecordServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("ComplianceRecord",
		func(e *hcm.ComplianceRecord) { common.GenerateID(&e.RecordId) },
		validateCompRec)
}

func validateCompRec(entity *hcm.ComplianceRecord, vnic ifs.IVNic) error {
	if err := validateCompRecRequiredFields(entity); err != nil {
		return err
	}
	if err := validateCompRecEnums(entity); err != nil {
		return err
	}
	if err := validateCompRecDates(entity); err != nil {
		return err
	}
	if err := validateCompRecEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateCompRecRequiredFields(entity *hcm.ComplianceRecord) error {
	if err := common.ValidateRequired(entity.RecordId, "RecordId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateCompRecEnums(entity *hcm.ComplianceRecord) error {
	if err := common.ValidateEnum(entity.ComplianceType, hcm.ComplianceType_name, "ComplianceType"); err != nil {
		return err
	}
	return nil
}

func validateCompRecDates(entity *hcm.ComplianceRecord) error {
	// CompletionDate should be before or equal to ExpirationDate
	if entity.CompletionDate != 0 && entity.ExpirationDate != 0 {
		if err := common.ValidateDateAfter(entity.ExpirationDate, entity.CompletionDate, "ExpirationDate", "CompletionDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateCompRecEmployee(entity *hcm.ComplianceRecord, vnic ifs.IVNic) error {
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
