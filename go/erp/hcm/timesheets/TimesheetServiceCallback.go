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
package timesheets

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newTimesheetServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Timesheet",
		func(e *hcm.Timesheet) { common.GenerateID(&e.TimesheetId) },
		validateTimesheet)
}

func computeTimesheetHours(t *hcm.Timesheet) {
	t.TotalHours = t.TotalRegularHours + t.TotalOvertimeHours + t.TotalDoubleTimeHours +
		t.TotalPtoHours + t.TotalSickHours + t.TotalHolidayHours
}

func validateTimesheet(entity *hcm.Timesheet, vnic ifs.IVNic) error {
	computeTimesheetHours(entity)
	if err := validateTimesheetRequiredFields(entity); err != nil {
		return err
	}
	if err := validateTimesheetEnums(entity); err != nil {
		return err
	}
	if err := validateTimesheetDates(entity); err != nil {
		return err
	}
	if err := validateTimesheetEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateTimesheetRequiredFields(entity *hcm.Timesheet) error {
	if err := common.ValidateRequired(entity.TimesheetId, "TimesheetId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateTimesheetEnums(entity *hcm.Timesheet) error {
	if err := common.ValidateEnum(entity.Status, hcm.TimesheetStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateTimesheetDates(entity *hcm.Timesheet) error {
	if entity.SubmittedDate != 0 && entity.ApprovedDate != 0 {
		if err := common.ValidateDateAfter(entity.ApprovedDate, entity.SubmittedDate, "ApprovedDate", "SubmittedDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateTimesheetEmployee(entity *hcm.Timesheet, vnic ifs.IVNic) error {
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
