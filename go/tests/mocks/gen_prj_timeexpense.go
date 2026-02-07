/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

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

// gen_prj_timeexpense.go
// Generates:
// - PrjAllocation
// - PrjBooking
// - PrjUtilization
// - PrjTimesheet

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/prj"
)

// generateAllocations creates resource allocation records
func generateAllocations(store *MockDataStore) []*prj.PrjAllocation {
	allocationStatuses := []prj.PrjAllocationStatus{
		prj.PrjAllocationStatus_PRJ_ALLOCATION_STATUS_TENTATIVE,
		prj.PrjAllocationStatus_PRJ_ALLOCATION_STATUS_CONFIRMED,
		prj.PrjAllocationStatus_PRJ_ALLOCATION_STATUS_CANCELLED,
	}
	roles := []string{"Developer", "Designer", "Analyst", "Lead", "Architect", "QA Engineer"}

	count := 50
	allocations := make([]*prj.PrjAllocation, count)
	for i := 0; i < count; i++ {
		resourceID := pickRef(store.PrjResourceIDs, i)
		projectID := pickRef(store.PrjProjectIDs, i)
		taskID := ""
		if len(store.PrjTaskIDs) > 0 && i%2 == 0 {
			taskID = store.PrjTaskIDs[i%len(store.PrjTaskIDs)]
		}
		phaseID := pickRef(store.PrjPhaseIDs, i)

		// Status distribution: 60% confirmed, 25% tentative, 15% cancelled
		var status prj.PrjAllocationStatus
		if i < count*60/100 {
			status = allocationStatuses[1] // CONFIRMED
		} else if i < count*85/100 {
			status = allocationStatuses[0] // TENTATIVE
		} else {
			status = allocationStatuses[2] // CANCELLED
		}

		startDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		endDate := startDate.AddDate(0, rand.Intn(3)+1, rand.Intn(14))
		allocatedHours := float64(rand.Intn(160) + 40)
		allocatedPercent := float64(rand.Intn(50) + 50)
		billingRate := int64(rand.Intn(15000)+5000) * 100 // $50-$200/hour in cents

		allocations[i] = &prj.PrjAllocation{
			AllocationId:     genID("alloc", i),
			ResourceId:       resourceID,
			ProjectId:        projectID,
			TaskId:           taskID,
			PhaseId:          phaseID,
			StartDate:        startDate.Unix(),
			EndDate:          endDate.Unix(),
			AllocatedHours:   allocatedHours,
			AllocatedPercent: allocatedPercent,
			Status:           status,
			BillingRate:      money(store, billingRate),
			IsBillable:       i%5 != 0, // 80% billable
			Role:             roles[i%len(roles)],
			Notes:            fmt.Sprintf("Resource allocation for project work - %s", roles[i%len(roles)]),
			AuditInfo:        createAuditInfo(),
		}
	}
	return allocations
}

// generateBookings creates resource booking request records
func generateBookings(store *MockDataStore) []*prj.PrjBooking {
	bookingStatuses := []prj.PrjBookingStatus{
		prj.PrjBookingStatus_PRJ_BOOKING_STATUS_REQUESTED,
		prj.PrjBookingStatus_PRJ_BOOKING_STATUS_APPROVED,
		prj.PrjBookingStatus_PRJ_BOOKING_STATUS_REJECTED,
		prj.PrjBookingStatus_PRJ_BOOKING_STATUS_CANCELLED,
	}
	roles := []string{"Developer", "Designer", "Analyst", "Lead", "Architect", "QA Engineer"}
	skills := []string{"Java", "Python", "JavaScript", "Cloud", "DevOps", "Data Analysis"}

	count := 40
	bookings := make([]*prj.PrjBooking, count)
	for i := 0; i < count; i++ {
		resourceID := pickRef(store.PrjResourceIDs, i)
		projectID := pickRef(store.PrjProjectIDs, i)
		requestedBy := pickRef(store.EmployeeIDs, i)
		approvedBy := pickRef(store.ManagerIDs, i)

		// Status distribution: 55% approved, 25% requested, 10% rejected, 10% cancelled
		var status prj.PrjBookingStatus
		if i < count*55/100 {
			status = bookingStatuses[1] // APPROVED
		} else if i < count*80/100 {
			status = bookingStatuses[0] // REQUESTED
		} else if i < count*90/100 {
			status = bookingStatuses[2] // REJECTED
		} else {
			status = bookingStatuses[3] // CANCELLED
		}

		requestedDate := time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(14))
		startDate := requestedDate.AddDate(0, 0, rand.Intn(14)+7)
		endDate := startDate.AddDate(0, rand.Intn(2)+1, rand.Intn(14))
		requestedHours := float64(rand.Intn(120) + 40)
		approvedHours := requestedHours * 0.9 // Typically approved for slightly less

		var decisionDate int64
		if status != prj.PrjBookingStatus_PRJ_BOOKING_STATUS_REQUESTED {
			decisionDate = requestedDate.AddDate(0, 0, rand.Intn(5)+1).Unix()
		}

		bookings[i] = &prj.PrjBooking{
			BookingId:      genID("book", i),
			ResourceId:     resourceID,
			ProjectId:      projectID,
			RequestedBy:    requestedBy,
			ApprovedBy:     approvedBy,
			StartDate:      startDate.Unix(),
			EndDate:        endDate.Unix(),
			RequestedHours: requestedHours,
			ApprovedHours:  approvedHours,
			Status:         status,
			Role:           roles[i%len(roles)],
			SkillRequired:  skills[i%len(skills)],
			Notes:          fmt.Sprintf("Resource booking request for %s role", roles[i%len(roles)]),
			RequestedDate:  requestedDate.Unix(),
			DecisionDate:   decisionDate,
			AuditInfo:      createAuditInfo(),
		}
	}
	return bookings
}

// generateUtilizations creates resource utilization tracking records
func generateUtilizations(store *MockDataStore) []*prj.PrjUtilization {
	count := 75
	utilizations := make([]*prj.PrjUtilization, count)
	for i := 0; i < count; i++ {
		resourceID := pickRef(store.PrjResourceIDs, i)
		projectID := ""
		if len(store.PrjProjectIDs) > 0 && i%2 == 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		// Generate weekly utilization records
		weekOffset := i % 12
		periodStart := time.Now().AddDate(0, 0, -weekOffset*7)
		periodEnd := periodStart.AddDate(0, 0, 7)

		capacityHours := 40.0
		billableHours := float64(rand.Intn(32) + 8)
		nonBillableHours := float64(rand.Intn(8))
		totalHours := billableHours + nonBillableHours
		utilizationPercent := (totalHours / capacityHours) * 100
		billableUtilizationPercent := (billableHours / capacityHours) * 100

		revenue := int64(billableHours * float64(rand.Intn(10000)+5000)) // $50-$150/hour
		cost := int64(billableHours * float64(rand.Intn(5000)+2500))     // $25-$75/hour

		utilizations[i] = &prj.PrjUtilization{
			UtilizationId:              genID("util", i),
			ResourceId:                 resourceID,
			ProjectId:                  projectID,
			PeriodStart:                periodStart.Unix(),
			PeriodEnd:                  periodEnd.Unix(),
			CapacityHours:              capacityHours,
			BillableHours:              billableHours,
			NonBillableHours:           nonBillableHours,
			TotalHours:                 totalHours,
			UtilizationPercent:         utilizationPercent,
			BillableUtilizationPercent: billableUtilizationPercent,
			Revenue:                    money(store, revenue),
			Cost:                       money(store, cost),
			AuditInfo:                  createAuditInfo(),
		}
	}
	return utilizations
}

// generatePrjTimesheets creates project timesheet records
func generatePrjTimesheets(store *MockDataStore) []*prj.PrjTimesheet {
	timesheetStatuses := []prj.PrjTimesheetStatus{
		prj.PrjTimesheetStatus_PRJ_TIMESHEET_STATUS_DRAFT,
		prj.PrjTimesheetStatus_PRJ_TIMESHEET_STATUS_SUBMITTED,
		prj.PrjTimesheetStatus_PRJ_TIMESHEET_STATUS_APPROVED,
		prj.PrjTimesheetStatus_PRJ_TIMESHEET_STATUS_REJECTED,
	}

	count := 30
	timesheets := make([]*prj.PrjTimesheet, count)
	for i := 0; i < count; i++ {
		employeeID := pickRef(store.EmployeeIDs, i)
		approvedBy := pickRef(store.ManagerIDs, i)

		// Status distribution: 50% approved, 25% submitted, 15% draft, 10% rejected
		var status prj.PrjTimesheetStatus
		if i < count*50/100 {
			status = timesheetStatuses[2] // APPROVED
		} else if i < count*75/100 {
			status = timesheetStatuses[1] // SUBMITTED
		} else if i < count*90/100 {
			status = timesheetStatuses[0] // DRAFT
		} else {
			status = timesheetStatuses[3] // REJECTED
		}

		// Weekly timesheet periods
		weekOffset := i % 10
		weekStart := time.Now().AddDate(0, 0, -weekOffset*7)
		// Adjust to Monday
		for weekStart.Weekday() != time.Monday {
			weekStart = weekStart.AddDate(0, 0, -1)
		}
		weekEnd := weekStart.AddDate(0, 0, 6)

		billableHours := float64(rand.Intn(32) + 8)
		nonBillableHours := float64(rand.Intn(8))
		totalHours := billableHours + nonBillableHours

		var submittedDate, approvedDate int64
		if status != prj.PrjTimesheetStatus_PRJ_TIMESHEET_STATUS_DRAFT {
			submittedDate = weekEnd.AddDate(0, 0, 1).Unix()
		}
		if status == prj.PrjTimesheetStatus_PRJ_TIMESHEET_STATUS_APPROVED {
			approvedDate = weekEnd.AddDate(0, 0, 2).Unix()
		}

		var rejectionReason string
		if status == prj.PrjTimesheetStatus_PRJ_TIMESHEET_STATUS_REJECTED {
			rejectionReason = "Please provide more detail on task descriptions"
		}

		timesheets[i] = &prj.PrjTimesheet{
			TimesheetId:      genID("tsheet", i),
			EmployeeId:       employeeID,
			WeekStartDate:    weekStart.Unix(),
			WeekEndDate:      weekEnd.Unix(),
			Status:           status,
			TotalHours:       totalHours,
			BillableHours:    billableHours,
			NonBillableHours: nonBillableHours,
			SubmittedDate:    submittedDate,
			SubmittedBy:      employeeID,
			ApprovedDate:     approvedDate,
			ApprovedBy:       approvedBy,
			RejectionReason:  rejectionReason,
			Notes:            fmt.Sprintf("Timesheet for week of %s", weekStart.Format("2006-01-02")),
			AuditInfo:        createAuditInfo(),
		}
	}
	return timesheets
}
