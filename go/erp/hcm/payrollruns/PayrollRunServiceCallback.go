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
package payrollruns

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/organizations"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type PayrollRunServiceCallback struct {
}

func newPayrollRunServiceCallback() *PayrollRunServiceCallback {
	return &PayrollRunServiceCallback{}
}

func (this *PayrollRunServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.PayrollRun)
	if !ok {
		return nil, false, errors.New("invalid payroll run type")
	}
	err := validatePayRun(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *PayrollRunServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validatePayRun(entity *hcm.PayrollRun, vnic ifs.IVNic) error {
	if err := validatePayRunRequiredFields(entity); err != nil {
		return err
	}
	if err := validatePayRunEnums(entity); err != nil {
		return err
	}
	if err := validatePayRunDates(entity); err != nil {
		return err
	}
	if err := validatePayRunOrganization(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validatePayRunRequiredFields(entity *hcm.PayrollRun) error {
	if err := common.ValidateRequired(entity.OrganizationId, "OrganizationId"); err != nil {
		return err
	}
	return nil
}

func validatePayRunEnums(entity *hcm.PayrollRun) error {
	if err := common.ValidateEnum(entity.Status, hcm.PayrollRunStatus_name, "Status"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.RunType, hcm.PayrollRunType_name, "RunType"); err != nil {
		return err
	}
	return nil
}

func validatePayRunDates(entity *hcm.PayrollRun) error {
	if entity.ProcessingDate != 0 && entity.PaymentDate != 0 {
		if err := common.ValidateDateAfter(entity.PaymentDate, entity.ProcessingDate, "PaymentDate", "ProcessingDate"); err != nil {
			return err
		}
	}
	return nil
}

func validatePayRunOrganization(entity *hcm.PayrollRun, vnic ifs.IVNic) error {
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
