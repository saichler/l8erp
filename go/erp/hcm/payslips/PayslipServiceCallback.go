package payslips

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/payrollruns"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type PayslipServiceCallback struct {
}

func newPayslipServiceCallback() *PayslipServiceCallback {
	return &PayslipServiceCallback{}
}

func (this *PayslipServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Payslip)
	if !ok {
		return nil, false, errors.New("invalid payslip type")
	}
	err := validatePayslip(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *PayslipServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
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
