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
	"reflect"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/payrollruns"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)


func toSlice(slice interface{}) []interface{} {
	v := reflect.ValueOf(slice)
	result := make([]interface{}, v.Len())
	for i := 0; i < v.Len(); i++ {
		result[i] = v.Index(i).Interface()
	}
	return result
}

func newPayslipServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewServiceCallback("Payslip",
		func(v interface{}) bool { _, ok := v.(*hcm.Payslip); return ok },
		func(v interface{}) { common.GenerateID(&v.(*hcm.Payslip).PayslipId) },
		func(v interface{}, vnic ifs.IVNic) error { return validatePayslip(v.(*hcm.Payslip), vnic) })
}

func computePayslipTotals(p *hcm.Payslip) {
	p.TotalHours = p.RegularHours + p.OvertimeHours + p.PtoHours + p.HolidayHours + p.OtherHours
	p.GrossPay = common.SumLineMoney(toSlice(p.Earnings), func(v interface{}) *l8common.Money { return v.(*hcm.PayslipLine).CurrentAmount })
	p.TotalDeductions = common.SumLineMoney(toSlice(p.Deductions), func(v interface{}) *l8common.Money { return v.(*hcm.PayslipLine).CurrentAmount })
	p.TotalTaxes = common.SumLineMoney(toSlice(p.Taxes), func(v interface{}) *l8common.Money { return v.(*hcm.PayslipLine).CurrentAmount })
	p.NetPay = common.MoneySubtract(p.GrossPay, common.MoneyAdd(p.TotalDeductions, p.TotalTaxes))
}

func validatePayslip(entity *hcm.Payslip, vnic ifs.IVNic) error {
	computePayslipTotals(entity)
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
