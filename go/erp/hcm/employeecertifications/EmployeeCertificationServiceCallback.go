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
package employeecertifications

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/certifications"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/erp/common"
)

func newEmployeeCertificationServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("EmployeeCertification",
		func(e *hcm.EmployeeCertification) { common.GenerateID(&e.EmployeeCertificationId) },
		validateEmployeeCertification)
}

func validateEmployeeCertification(entity *hcm.EmployeeCertification, vnic ifs.IVNic) error {
	if err := validateEmpCertRequiredFields(entity); err != nil {
		return err
	}
	if err := validateEmpCertEnums(entity); err != nil {
		return err
	}
	if err := validateEmpCertDates(entity); err != nil {
		return err
	}
	if err := validateEmpCertEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateEmpCertCertification(entity, vnic); err != nil {
		return err
	}
	if err := validateEmpCertVerifiedBy(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateEmpCertRequiredFields(entity *hcm.EmployeeCertification) error {
	if err := common.ValidateRequired(entity.EmployeeCertificationId, "EmployeeCertificationId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.CertificationId, "CertificationId"); err != nil {
		return err
	}
	return nil
}

func validateEmpCertEnums(entity *hcm.EmployeeCertification) error {
	if err := common.ValidateEnum(int32(entity.Status), hcm.CertificationStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateEmpCertDates(entity *hcm.EmployeeCertification) error {
	if entity.IssueDate != 0 && entity.ExpirationDate != 0 {
		if err := common.ValidateDateAfter(entity.ExpirationDate, entity.IssueDate, "ExpirationDate", "IssueDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateEmpCertEmployee(entity *hcm.EmployeeCertification, vnic ifs.IVNic) error {
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

func validateEmpCertCertification(entity *hcm.EmployeeCertification, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.CertificationId,
		"Certification",
		certifications.ServiceName,
		certifications.ServiceArea,
		certifications.Certifications,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return certifications.Certification(id, vnic) },
		hcm.Certification{CertificationId: entity.CertificationId},
		vnic,
	)
}

func validateEmpCertVerifiedBy(entity *hcm.EmployeeCertification, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.VerifiedBy,
		"VerifiedBy",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.VerifiedBy},
		vnic,
	)
}
