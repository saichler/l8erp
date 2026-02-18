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
	"github.com/saichler/l8erp/go/types/prj"
)

func computePrjTimesheetHours(ts *prj.PrjTimesheet) error {
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

func newPrjTimesheetServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[prj.PrjTimesheet]("PrjTimesheet",
		func(e *prj.PrjTimesheet) { common.GenerateID(&e.TimesheetId) }).
		Compute(computePrjTimesheetHours).
		Require(func(e *prj.PrjTimesheet) string { return e.TimesheetId }, "TimesheetId").
		Enum(func(e *prj.PrjTimesheet) int32 { return int32(e.Status) }, prj.PrjTimesheetStatus_name, "Status").
		DateAfter(func(e *prj.PrjTimesheet) int64 { return e.WeekEndDate }, func(e *prj.PrjTimesheet) int64 { return e.WeekStartDate }, "WeekEndDate", "WeekStartDate").
		Build()
}
