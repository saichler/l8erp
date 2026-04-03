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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/prj"
)

func computePrjTimesheetHours(v interface{}) error {
	ts := v.(*prj.PrjTimesheet)
	ts.TotalHours = 0
	ts.BillableHours = 0
	for _, e := range ts.Entries {
		ts.TotalHours += e.Hours
		if e.IsBillable {
			ts.BillableHours += e.Hours
		}
	}
	ts.NonBillableHours = ts.TotalHours - ts.BillableHours
	return nil
}

func newPrjTimesheetServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&prj.PrjTimesheet{}, vnic).
		StatusTransition(timesheetTransitions()).
		After(rollUpTimesheetHours).
		Compute(computePrjTimesheetHours).
		Require(func(v interface{}) string { return v.(*prj.PrjTimesheet).TimesheetId }, "TimesheetId").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjTimesheet).Status) }, prj.PrjTimesheetStatus_name, "Status").
		DateAfter(func(v interface{}) int64 { return v.(*prj.PrjTimesheet).WeekEndDate }, func(v interface{}) int64 { return v.(*prj.PrjTimesheet).WeekStartDate }, "WeekEndDate", "WeekStartDate").
		Build()
}
