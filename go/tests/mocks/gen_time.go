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
package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/hcm"
)

// generateLeaveRequests creates leave request records
func generateLeaveRequests(store *MockDataStore) []*hcm.LeaveRequest {
	requests := make([]*hcm.LeaveRequest, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		// 1-3 leave requests per employee
		numRequests := rand.Intn(3) + 1
		for j := 0; j < numRequests; j++ {
			startDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)
			days := rand.Intn(5) + 1
			endDate := startDate.AddDate(0, 0, days)

			requests = append(requests, &hcm.LeaveRequest{
				RequestId:     fmt.Sprintf("leavereq-%05d", idx),
				EmployeeId:    empID,
				LeavePolicyId: store.LeavePolicyIDs[rand.Intn(len(store.LeavePolicyIDs))],
				StartDate:     startDate.Unix(),
				EndDate:       endDate.Unix(),
				TotalDays:     float64(days),
				Status:        hcm.LeaveRequestStatus(rand.Intn(4) + 1),
				Reason:        "Personal time off",
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return requests
}

// generateSchedules creates schedule records
func generateSchedules(store *MockDataStore) []*hcm.Schedule {
	schedules := make([]*hcm.Schedule, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		periodStart := time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC)
		periodEnd := time.Date(2024, 12, 31, 0, 0, 0, 0, time.UTC)

		schedules = append(schedules, &hcm.Schedule{
			ScheduleId: fmt.Sprintf("sched-%04d", idx),
			EmployeeId: empID,
			Period: &erp.DateRange{
				StartDate: periodStart.Unix(),
				EndDate:   periodEnd.Unix(),
			},
			Status:              hcm.ScheduleStatus_SCHEDULE_STATUS_PUBLISHED,
			TotalScheduledHours: 2080, // Standard work year
			PublishedDate:       time.Now().Unix(),
			AuditInfo:           createAuditInfo(),
		})
		idx++
	}
	return schedules
}

// generateAbsences creates absence records
func generateAbsences(store *MockDataStore) []*hcm.Absence {
	absences := make([]*hcm.Absence, 0)
	idx := 1

	leaveTypes := []hcm.LeaveType{
		hcm.LeaveType_LEAVE_TYPE_PTO,
		hcm.LeaveType_LEAVE_TYPE_VACATION,
		hcm.LeaveType_LEAVE_TYPE_SICK,
		hcm.LeaveType_LEAVE_TYPE_PERSONAL,
	}

	// Some employees have absences
	for i := 0; i < len(store.EmployeeIDs)/2; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		absenceDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		absences = append(absences, &hcm.Absence{
			AbsenceId:   fmt.Sprintf("abs-%04d", idx),
			EmployeeId:  empID,
			Date:        absenceDate.Unix(),
			AbsenceType: leaveTypes[rand.Intn(len(leaveTypes))],
			Hours:       8,
			Status:      hcm.AbsenceStatus_ABSENCE_STATUS_TAKEN,
			AuditInfo:   createAuditInfo(),
		})
		idx++
	}
	return absences
}
