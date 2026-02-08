/*
© 2025 Sharon Aicler (saichler@gmail.com)
PRJ Time & Expense generators - Part 2 (Timesheet Entries and Expense)
*/
package mocks

import (
	"fmt"
	"github.com/saichler/l8erp/go/types/prj"
	"math/rand"
	"time"
)

func generateTimesheetEntries(store *MockDataStore) []*prj.PrjTimesheetEntry {
	count := 100
	entries := make([]*prj.PrjTimesheetEntry, count)
	baseTime := time.Now().AddDate(0, -1, 0)
	activityTypes := []string{"Development", "Testing", "Meeting", "Documentation", "Review", "Support"}

	for i := 0; i < count; i++ {
		timesheetIdx := i % len(store.PrjTimesheetIDs)
		projectIdx := i % len(store.PrjProjectIDs)
		taskIdx := i % len(store.PrjTaskIDs)
		phaseIdx := i % len(store.PrjPhaseIDs)
		workDate := baseTime.AddDate(0, 0, i/5)
		hours := float64(rand.Intn(6)+2) + float64(rand.Intn(2))*0.5
		isBillable := i%4 != 0

		entry := &prj.PrjTimesheetEntry{
			EntryId:      fmt.Sprintf("PRJ-TSENTRY-%03d", i+1),
			TimesheetId:  store.PrjTimesheetIDs[timesheetIdx],
			ProjectId:    store.PrjProjectIDs[projectIdx],
			TaskId:       store.PrjTaskIDs[taskIdx],
			PhaseId:      store.PrjPhaseIDs[phaseIdx],
			WorkDate:     workDate.Unix(),
			Hours:        hours,
			IsBillable:   isBillable,
			Description:  fmt.Sprintf("Work entry for %s", workDate.Format("2006-01-02")),
			ActivityType: activityTypes[i%len(activityTypes)],
			IsOvertime:   i%10 == 0,
			AuditInfo:    createAuditInfo(),
		}

		if isBillable {
			rate := int64((rand.Intn(100) + 100) * 100) // $100-$200 hourly rate
			entry.BillingRate = money(store, rate)
			entry.BillingAmount = money(store, int64(hours * float64(rate)))
		}

		entries[i] = entry
	}
	return entries
}

func generateExpenseReports(store *MockDataStore) []*prj.PrjExpenseReport {
	count := 40
	reports := make([]*prj.PrjExpenseReport, count)
	baseTime := time.Now().AddDate(0, -1, 0)

	for i := 0; i < count; i++ {
		employeeIdx := i % len(store.EmployeeIDs)
		projectIdx := i % len(store.PrjProjectIDs)
		submitDate := baseTime.AddDate(0, 0, i*2)
		totalAmount := int64((rand.Intn(2000) + 500) * 100) // $500-$2500

		var status prj.PrjExpenseStatus
		switch {
		case i < int(float64(count)*0.4):
			status = prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_APPROVED
		case i < int(float64(count)*0.6):
			status = prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_SUBMITTED
		case i < int(float64(count)*0.8):
			status = prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_PAID
		default:
			status = prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_DRAFT
		}

		report := &prj.PrjExpenseReport{
			ReportId:     fmt.Sprintf("PRJ-EXPRPT-%03d", i+1),
			EmployeeId:   store.EmployeeIDs[employeeIdx],
			ProjectId:    store.PrjProjectIDs[projectIdx],
			ReportNumber: fmt.Sprintf("EXP-2025-%04d", i+1),
			Title:        fmt.Sprintf("Expense Report %s", submitDate.Format("Jan 2006")),
			Description:  "Monthly project expenses",
			Status:       status,
			TotalAmount:  money(store, totalAmount),
			SubmitDate:   submitDate.Unix(),
			AuditInfo:    createAuditInfo(),
		}

		if status == prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_APPROVED || status == prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_PAID {
			report.ApprovedAmount = money(store, totalAmount)
			report.ApprovedDate = submitDate.AddDate(0, 0, rand.Intn(5)+1).Unix()
			if len(store.ManagerIDs) > 0 {
				report.ApprovedBy = store.ManagerIDs[i%len(store.ManagerIDs)]
			}
		}

		if status == prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_PAID {
			report.ReimbursedAmount = money(store, totalAmount)
			report.PaidDate = submitDate.AddDate(0, 0, rand.Intn(10)+5).Unix()
		}

		reports[i] = report
	}
	return reports
}

func generateExpenseEntries(store *MockDataStore) []*prj.PrjExpenseEntry {
	count := 120
	entries := make([]*prj.PrjExpenseEntry, count)
	baseTime := time.Now().AddDate(0, -1, 0)
	vendors := []string{"Uber", "Hilton Hotels", "United Airlines", "Starbucks", "Office Depot", "Amazon", "Best Buy"}
	paymentMethods := []string{"Corporate Card", "Personal Card", "Cash", "Invoice"}

	for i := 0; i < count; i++ {
		reportIdx := i % len(store.PrjExpenseReportIDs)
		projectIdx := i % len(store.PrjProjectIDs)
		taskIdx := i % len(store.PrjTaskIDs)
		categoryIdx := i % len(store.PrjExpenseCategoryIDs)
		expenseDate := baseTime.AddDate(0, 0, i/3)
		amount := int64((rand.Intn(500) + 20) * 100) // $20-$520

		var expenseType prj.PrjExpenseType
		switch i % 6 {
		case 0:
			expenseType = prj.PrjExpenseType_PRJ_EXPENSE_TYPE_TRAVEL
		case 1:
			expenseType = prj.PrjExpenseType_PRJ_EXPENSE_TYPE_MEALS
		case 2:
			expenseType = prj.PrjExpenseType_PRJ_EXPENSE_TYPE_LODGING
		case 3:
			expenseType = prj.PrjExpenseType_PRJ_EXPENSE_TYPE_EQUIPMENT
		case 4:
			expenseType = prj.PrjExpenseType_PRJ_EXPENSE_TYPE_SOFTWARE
		default:
			expenseType = prj.PrjExpenseType_PRJ_EXPENSE_TYPE_OTHER
		}

		entry := &prj.PrjExpenseEntry{
			EntryId:         fmt.Sprintf("PRJ-EXPENT-%03d", i+1),
			ReportId:        store.PrjExpenseReportIDs[reportIdx],
			ProjectId:       store.PrjProjectIDs[projectIdx],
			TaskId:          store.PrjTaskIDs[taskIdx],
			CategoryId:      store.PrjExpenseCategoryIDs[categoryIdx],
			ExpenseDate:     expenseDate.Unix(),
			Description:     fmt.Sprintf("Expense for %s", expenseDate.Format("2006-01-02")),
			Vendor:          vendors[i%len(vendors)],
			Amount:          money(store, amount),
			CurrencyId: pickRef(store.CurrencyIDs, i),
			ConvertedAmount: money(store, amount),
			ExchangeRate:    1.0,
			IsBillable:      i%3 != 0,
			IsReimbursable:  i%4 != 0,
			ReceiptAttached: i%2 == 0,
			ExpenseType:     expenseType,
			PaymentMethod:   paymentMethods[i%len(paymentMethods)],
			AuditInfo:       createAuditInfo(),
		}

		if entry.ReceiptAttached {
			entry.ReceiptUrl = fmt.Sprintf("https://receipts.example.com/%s.pdf", entry.EntryId)
		}

		entries[i] = entry
	}
	return entries
}
