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
package yearenddocuments

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newYearEndDocumentServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("YearEndDocument",
		func(e *hcm.YearEndDocument) { common.GenerateID(&e.DocumentId) },
		validateYrEndDoc)
}

func validateYrEndDoc(entity *hcm.YearEndDocument, vnic ifs.IVNic) error {
	if err := validateYrEndDocRequiredFields(entity); err != nil {
		return err
	}
	if err := validateYrEndDocEnums(entity); err != nil {
		return err
	}
	if err := validateYrEndDocEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateYrEndDocRequiredFields(entity *hcm.YearEndDocument) error {
	if err := common.ValidateRequired(entity.DocumentId, "DocumentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateYrEndDocEnums(entity *hcm.YearEndDocument) error {
	if err := common.ValidateEnum(entity.DocumentType, hcm.YearEndDocumentType_name, "DocumentType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.YearEndDocumentStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateYrEndDocEmployee(entity *hcm.YearEndDocument, vnic ifs.IVNic) error {
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
