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
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// rollUpTimesheetHours updates project task actual hours when a timesheet is approved.
func rollUpTimesheetHours(ts *prj.PrjTimesheet, action ifs.Action, vnic ifs.IVNic) error {
	if ts.Status != prj.PrjTimesheetStatus_PRJ_TIMESHEET_STATUS_APPROVED {
		return nil
	}
	ts.ApprovedDate = time.Now().Unix()
	// Group hours by project+task
	projectHours := make(map[string]map[string]float64)
	for _, entry := range ts.Entries {
		if entry.ProjectId == "" {
			continue
		}
		if projectHours[entry.ProjectId] == nil {
			projectHours[entry.ProjectId] = make(map[string]float64)
		}
		projectHours[entry.ProjectId][entry.TaskId] += entry.Hours
	}
	// Update each project's task actual hours
	for projectId, taskHours := range projectHours {
		project, err := common.GetEntity("PrjProj", 90,
			&prj.PrjProject{ProjectId: projectId}, vnic)
		if err != nil || project == nil {
			continue
		}
		for _, task := range project.Tasks {
			if hours, ok := taskHours[task.TaskId]; ok {
				task.ActualHours += hours
				task.RemainingHours = task.EstimatedHours - task.ActualHours
				if task.RemainingHours < 0 {
					task.RemainingHours = 0
				}
			}
		}
		// Update project total hours
		total := float64(0)
		for _, t := range project.Tasks {
			total += t.ActualHours
		}
		project.ActualHours = total
		_ = common.PutEntity("PrjProj", 90, project, vnic)
	}
	return nil
}

func timesheetTransitions() *common.StatusTransitionConfig[prj.PrjTimesheet] {
	return &common.StatusTransitionConfig[prj.PrjTimesheet]{
		StatusGetter:  func(e *prj.PrjTimesheet) int32 { return int32(e.Status) },
		StatusSetter:  func(e *prj.PrjTimesheet, s int32) { e.Status = prj.PrjTimesheetStatus(s) },
		FilterBuilder: func(e *prj.PrjTimesheet) *prj.PrjTimesheet {
			return &prj.PrjTimesheet{TimesheetId: e.TimesheetId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2},    // DRAFT → SUBMITTED
			2: {3, 4}, // SUBMITTED → APPROVED, REJECTED
			4: {1},    // REJECTED → DRAFT
		},
		StatusNames: prj.PrjTimesheetStatus_name,
	}
}
