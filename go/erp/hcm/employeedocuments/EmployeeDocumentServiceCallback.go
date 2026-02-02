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
package employeedocuments

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type EmployeeDocumentServiceCallback struct {
}

func newEmployeeDocumentServiceCallback() *EmployeeDocumentServiceCallback {
	return &EmployeeDocumentServiceCallback{}
}

func (this *EmployeeDocumentServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.EmployeeDocument)
	if !ok {
		return nil, false, errors.New("invalid employee document type")
	}
	err := validateEmpDoc(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *EmployeeDocumentServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateEmpDoc(entity *hcm.EmployeeDocument, vnic ifs.IVNic) error {
	if err := validateEmpDocRequiredFields(entity); err != nil {
		return err
	}
	if err := validateEmpDocEnums(entity); err != nil {
		return err
	}
	if err := validateEmpDocDates(entity); err != nil {
		return err
	}
	if err := validateEmpDocEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateEmpDocRequiredFields(entity *hcm.EmployeeDocument) error {
	if err := common.ValidateRequired(entity.DocumentId, "DocumentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateEmpDocEnums(entity *hcm.EmployeeDocument) error {
	if err := common.ValidateEnum(entity.DocumentType, hcm.DocumentType_name, "DocumentType"); err != nil {
		return err
	}
	return nil
}

func validateEmpDocDates(entity *hcm.EmployeeDocument) error {
	// UploadDate should be before or equal to ExpirationDate
	if entity.UploadDate != 0 && entity.ExpirationDate != 0 {
		if err := common.ValidateDateAfter(entity.ExpirationDate, entity.UploadDate, "ExpirationDate", "UploadDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateEmpDocEmployee(entity *hcm.EmployeeDocument, vnic ifs.IVNic) error {
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
