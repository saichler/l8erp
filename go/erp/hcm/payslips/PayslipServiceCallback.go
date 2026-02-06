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
package payslips

import (
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/payrollruns"
)

func newPayslipServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Payslip",
		func(e *hcm.Payslip) { common.GenerateID(&e.PayslipId) },
		validatePayslip)
}

func validatePayslip(entity *hcm.Payslip, vnic ifs.IVNic) error {
	if err := validatePayslipRequiredFields(entity); err != nil {
		return err
	}
	if err := validatePayslipEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validatePayslipPayrollRun(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validatePayslipRequiredFields(entity *hcm.Payslip) error {
	if err := common.ValidateRequired(entity.PayslipId, "PayslipId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.PayrollRunId, "PayrollRunId"); err != nil {
		return err
	}
	return nil
}

func validatePayslipEmployee(entity *hcm.Payslip, vnic ifs.IVNic) error {
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

func validatePayslipPayrollRun(entity *hcm.Payslip, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.PayrollRunId,
		"PayrollRun",
		payrollruns.ServiceName,
		payrollruns.ServiceArea,
		payrollruns.PayrollRuns,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return payrollruns.PayrollRun(id, vnic) },
		hcm.PayrollRun{PayrollRunId: entity.PayrollRunId},
		vnic,
	)
}
