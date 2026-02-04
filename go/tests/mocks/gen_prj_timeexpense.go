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

// Generates:
// - PrjAllocation
// - PrjBooking
// - PrjUtilization
// - PrjTimesheet
// - PrjTimesheetEntry
// - PrjExpenseReport
// - PrjExpenseEntry

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/erp"
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
		resourceID := ""
		if len(store.PrjResourceIDs) > 0 {
			resourceID = store.PrjResourceIDs[i%len(store.PrjResourceIDs)]
		}
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}
		taskID := ""
		if len(store.PrjTaskIDs) > 0 && i%2 == 0 {
			taskID = store.PrjTaskIDs[i%len(store.PrjTaskIDs)]
		}
		phaseID := ""
		if len(store.PrjPhaseIDs) > 0 {
			phaseID = store.PrjPhaseIDs[i%len(store.PrjPhaseIDs)]
		}

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
			AllocationId:     fmt.Sprintf("alloc-%03d", i+1),
			ResourceId:       resourceID,
			ProjectId:        projectID,
			TaskId:           taskID,
			PhaseId:          phaseID,
			StartDate:        startDate.Unix(),
			EndDate:          endDate.Unix(),
			AllocatedHours:   allocatedHours,
			AllocatedPercent: allocatedPercent,
			Status:           status,
			BillingRate:      &erp.Money{Amount: billingRate, CurrencyCode: "USD"},
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
		resourceID := ""
		if len(store.PrjResourceIDs) > 0 {
			resourceID = store.PrjResourceIDs[i%len(store.PrjResourceIDs)]
		}
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}
		requestedBy := ""
		if len(store.EmployeeIDs) > 0 {
			requestedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}
		approvedBy := ""
		if len(store.ManagerIDs) > 0 {
			approvedBy = store.ManagerIDs[i%len(store.ManagerIDs)]
		}

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
			BookingId:      fmt.Sprintf("book-%03d", i+1),
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
		resourceID := ""
		if len(store.PrjResourceIDs) > 0 {
			resourceID = store.PrjResourceIDs[i%len(store.PrjResourceIDs)]
		}
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
			UtilizationId:              fmt.Sprintf("util-%03d", i+1),
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
			Revenue:                    &erp.Money{Amount: revenue, CurrencyCode: "USD"},
			Cost:                       &erp.Money{Amount: cost, CurrencyCode: "USD"},
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
		employeeID := ""
		if len(store.EmployeeIDs) > 0 {
			employeeID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}
		approvedBy := ""
		if len(store.ManagerIDs) > 0 {
			approvedBy = store.ManagerIDs[i%len(store.ManagerIDs)]
		}

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
			TimesheetId:      fmt.Sprintf("tsheet-%03d", i+1),
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

// generateTimesheetEntries creates timesheet entry records
func generateTimesheetEntries(store *MockDataStore) []*prj.PrjTimesheetEntry {
	activityTypes := []string{"Development", "Design", "Analysis", "Testing", "Meetings", "Documentation"}
	descriptions := []string{
		"Feature implementation",
		"Bug fixes and testing",
		"Code review and refactoring",
		"Design and architecture work",
		"Team standup and planning",
		"Documentation updates",
	}

	count := 150
	entries := make([]*prj.PrjTimesheetEntry, count)
	for i := 0; i < count; i++ {
		timesheetID := ""
		if len(store.PrjTimesheetIDs) > 0 {
			timesheetID = store.PrjTimesheetIDs[i%len(store.PrjTimesheetIDs)]
		}
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}
		taskID := ""
		if len(store.PrjTaskIDs) > 0 {
			taskID = store.PrjTaskIDs[i%len(store.PrjTaskIDs)]
		}
		phaseID := ""
		if len(store.PrjPhaseIDs) > 0 {
			phaseID = store.PrjPhaseIDs[i%len(store.PrjPhaseIDs)]
		}

		// Work date within last 2 weeks
		dayOffset := rand.Intn(14)
		workDate := time.Now().AddDate(0, 0, -dayOffset)
		hours := float64(rand.Intn(6)+2) + float64(rand.Intn(4))/4 // 2-8 hours with quarter increments
		isBillable := i%5 != 0                                     // 80% billable
		isOvertime := i%10 == 0                                    // 10% overtime

		billingRate := int64(rand.Intn(10000)+5000) * 100 // $50-$150/hour in cents
		billingAmount := int64(hours * float64(billingRate/100))

		entries[i] = &prj.PrjTimesheetEntry{
			EntryId:       fmt.Sprintf("tsentry-%03d", i+1),
			TimesheetId:   timesheetID,
			ProjectId:     projectID,
			TaskId:        taskID,
			PhaseId:       phaseID,
			WorkDate:      workDate.Unix(),
			Hours:         hours,
			IsBillable:    isBillable,
			BillingRate:   &erp.Money{Amount: billingRate, CurrencyCode: "USD"},
			BillingAmount: &erp.Money{Amount: billingAmount, CurrencyCode: "USD"},
			Description:   descriptions[i%len(descriptions)],
			ActivityType:  activityTypes[i%len(activityTypes)],
			IsOvertime:    isOvertime,
			AuditInfo:     createAuditInfo(),
		}
	}
	return entries
}

// generateExpenseReports creates expense report records
func generateExpenseReports(store *MockDataStore) []*prj.PrjExpenseReport {
	expenseStatuses := []prj.PrjExpenseStatus{
		prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_DRAFT,
		prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_SUBMITTED,
		prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_APPROVED,
		prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_REJECTED,
		prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_PAID,
	}
	reportTitles := []string{
		"Client Site Visit",
		"Conference Attendance",
		"Team Offsite",
		"Training Expenses",
		"Equipment Purchase",
		"Travel Expenses",
	}

	count := 20
	reports := make([]*prj.PrjExpenseReport, count)
	for i := 0; i < count; i++ {
		employeeID := ""
		if len(store.EmployeeIDs) > 0 {
			employeeID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}
		approvedBy := ""
		if len(store.ManagerIDs) > 0 {
			approvedBy = store.ManagerIDs[i%len(store.ManagerIDs)]
		}

		// Status distribution: 40% paid, 25% approved, 20% submitted, 10% draft, 5% rejected
		var status prj.PrjExpenseStatus
		if i < count*40/100 {
			status = expenseStatuses[4] // PAID
		} else if i < count*65/100 {
			status = expenseStatuses[2] // APPROVED
		} else if i < count*85/100 {
			status = expenseStatuses[1] // SUBMITTED
		} else if i < count*95/100 {
			status = expenseStatuses[0] // DRAFT
		} else {
			status = expenseStatuses[3] // REJECTED
		}

		totalAmount := int64(rand.Intn(500000)+10000) * 100 // $100-$5100 in cents
		approvedAmount := totalAmount
		reimbursedAmount := int64(0)

		var submitDate, approvedDate, paidDate int64
		submitDate = time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(14)).Unix()

		if status == prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_APPROVED ||
			status == prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_PAID {
			approvedDate = time.Unix(submitDate, 0).AddDate(0, 0, rand.Intn(5)+1).Unix()
		}
		if status == prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_PAID {
			paidDate = time.Unix(approvedDate, 0).AddDate(0, 0, rand.Intn(7)+1).Unix()
			reimbursedAmount = approvedAmount
		}

		var rejectionReason string
		if status == prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_REJECTED {
			rejectionReason = "Missing receipts for some items"
		}

		reports[i] = &prj.PrjExpenseReport{
			ReportId:         fmt.Sprintf("exprpt-%03d", i+1),
			EmployeeId:       employeeID,
			ProjectId:        projectID,
			ReportNumber:     fmt.Sprintf("EXP-%05d", 10000+i+1),
			Title:            reportTitles[i%len(reportTitles)],
			Description:      fmt.Sprintf("Expense report: %s", reportTitles[i%len(reportTitles)]),
			Status:           status,
			TotalAmount:      &erp.Money{Amount: totalAmount, CurrencyCode: "USD"},
			ApprovedAmount:   &erp.Money{Amount: approvedAmount, CurrencyCode: "USD"},
			ReimbursedAmount: &erp.Money{Amount: reimbursedAmount, CurrencyCode: "USD"},
			SubmitDate:       submitDate,
			ApprovedDate:     approvedDate,
			ApprovedBy:       approvedBy,
			PaidDate:         paidDate,
			RejectionReason:  rejectionReason,
			Notes:            fmt.Sprintf("Project-related expenses for %s", reportTitles[i%len(reportTitles)]),
			AuditInfo:        createAuditInfo(),
		}
	}
	return reports
}

// generateExpenseEntries creates expense entry records
func generateExpenseEntries(store *MockDataStore) []*prj.PrjExpenseEntry {
	expenseTypes := []prj.PrjExpenseType{
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_TRAVEL,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_LODGING,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_MEALS,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_TRANSPORTATION,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_MATERIALS,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_EQUIPMENT,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_SOFTWARE,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_OTHER,
	}
	vendors := []string{"Delta Airlines", "Marriott", "Uber", "Office Depot", "Amazon", "Best Buy"}
	descriptions := []string{
		"Flight to client site",
		"Hotel accommodation",
		"Team dinner",
		"Ground transportation",
		"Project supplies",
		"Software license",
	}
	paymentMethods := []string{"Corporate Card", "Personal Card", "Cash", "Expense Account"}

	count := 80
	entries := make([]*prj.PrjExpenseEntry, count)
	for i := 0; i < count; i++ {
		reportID := ""
		if len(store.PrjExpenseReportIDs) > 0 {
			reportID = store.PrjExpenseReportIDs[i%len(store.PrjExpenseReportIDs)]
		}
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}
		taskID := ""
		if len(store.PrjTaskIDs) > 0 && i%3 == 0 {
			taskID = store.PrjTaskIDs[i%len(store.PrjTaskIDs)]
		}
		categoryID := ""
		if len(store.PrjExpenseCategoryIDs) > 0 {
			categoryID = store.PrjExpenseCategoryIDs[i%len(store.PrjExpenseCategoryIDs)]
		}

		expenseDate := time.Now().AddDate(0, -rand.Intn(2), -rand.Intn(28))
		amount := int64(rand.Intn(50000)+1000) * 100 // $10-$510 in cents

		// 75% have receipt attached
		hasReceipt := i%4 != 0
		isBillable := i%5 != 0     // 80% billable
		isReimbursable := i%6 != 0 // ~83% reimbursable

		entries[i] = &prj.PrjExpenseEntry{
			EntryId:          fmt.Sprintf("expent-%03d", i+1),
			ReportId:         reportID,
			ProjectId:        projectID,
			TaskId:           taskID,
			CategoryId:       categoryID,
			ExpenseDate:      expenseDate.Unix(),
			Description:      descriptions[i%len(descriptions)],
			Vendor:           vendors[i%len(vendors)],
			Amount:           &erp.Money{Amount: amount, CurrencyCode: "USD"},
			CurrencyCode:     "USD",
			ConvertedAmount:  &erp.Money{Amount: amount, CurrencyCode: "USD"},
			ExchangeRate:     1.0,
			IsBillable:       isBillable,
			IsReimbursable:   isReimbursable,
			ReceiptAttached:  hasReceipt,
			ExpenseType:      expenseTypes[i%len(expenseTypes)],
			PaymentMethod:    paymentMethods[i%len(paymentMethods)],
			AuditInfo:        createAuditInfo(),
		}
	}
	return entries
}
