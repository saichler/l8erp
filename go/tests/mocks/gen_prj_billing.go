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

// gen_prj_billing.go
// Generates:
// - PrjBillingRate
// - PrjBillingSchedule
// - PrjBillingMilestone
// - PrjProjectInvoice
// - PrjInvoiceLine
// - PrjRevenueRecognition
// - PrjProjectBudget

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/prj"
)

var billingRateNames = []string{
	"Senior Consultant", "Junior Consultant", "Project Manager",
	"Technical Architect", "Business Analyst", "QA Engineer",
	"DevOps Engineer", "UX Designer", "Data Scientist",
	"Software Developer", "Solution Architect", "Team Lead",
}

var billingScheduleNames = []string{
	"Monthly Retainer", "Milestone-Based Billing", "Time & Materials",
	"Fixed Price Phase 1", "Quarterly Review", "Sprint Billing",
	"Weekly Progress", "Bi-Weekly Billing", "Completion Milestone",
	"Monthly Progress", "Feature Delivery", "Support Retainer",
	"Development Phase", "Testing Phase", "Deployment Phase",
}

var billingMilestoneNames = []string{
	"Project Kickoff", "Requirements Complete", "Design Approval",
	"Development Complete", "UAT Complete", "Go-Live",
	"Phase 1 Complete", "Phase 2 Complete", "Final Delivery",
	"Sprint 1 Demo", "Sprint 2 Demo", "MVP Release",
	"Beta Release", "Production Release", "Project Closure",
	"Documentation Complete", "Training Complete", "Warranty Period End",
	"First Payment", "Second Payment", "Final Payment",
	"Design Milestone", "Build Milestone", "Test Milestone",
	"Deploy Milestone", "Support Milestone", "Review Milestone",
	"Checkpoint 1", "Checkpoint 2", "Acceptance Milestone",
}

var invoiceDescriptions = []string{
	"Professional services for project development",
	"Consulting hours for requirements analysis",
	"Technical architecture and design services",
	"Software development services",
	"Quality assurance and testing services",
	"Project management services",
	"Training and documentation services",
	"System integration services",
	"Support and maintenance services",
	"Data migration services",
}

var budgetNames = []string{
	"Labor Budget", "Materials Budget", "Travel Budget",
	"Software Licenses", "Hardware Budget", "Training Budget",
	"Consulting Budget", "Contingency Reserve", "Equipment Budget",
	"Infrastructure Budget", "Development Budget", "Testing Budget",
	"Deployment Budget", "Support Budget", "Documentation Budget",
	"Phase 1 Budget", "Phase 2 Budget", "Phase 3 Budget",
	"Q1 Budget", "Q2 Budget", "Q3 Budget",
	"Annual Budget", "Project Reserve", "Overhead Budget",
	"Vendor Budget", "Subcontractor Budget", "Facilities Budget",
	"Communication Budget", "Risk Reserve", "Change Budget",
}

// generateBillingRates creates billing rate configurations
func generateBillingRates(store *MockDataStore) []*prj.PrjBillingRate {
	rateUnits := []string{"hourly", "daily", "weekly"}
	skillCategories := []string{"Technical", "Business", "Management", "Design", "Analytics"}

	count := 12
	rates := make([]*prj.PrjBillingRate, count)

	for i := 0; i < count; i++ {
		// Reference resource pool if available
		resourceID := ""
		if len(store.PrjResourceIDs) > 0 {
			resourceID = store.PrjResourceIDs[i%len(store.PrjResourceIDs)]
		}

		// Reference project (some rates are global, some project-specific)
		projectID := ""
		if i >= 6 && len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		// Base rate between $50 and $300 per hour (in cents)
		baseRate := int64(rand.Intn(25000)+5000) * 100
		// Overtime rate is 1.5x base rate
		overtimeRate := baseRate * 3 / 2

		effectiveFrom := time.Now().AddDate(0, -rand.Intn(12), 0)
		effectiveUntil := effectiveFrom.AddDate(1, 0, 0)

		// 85% active, 15% inactive
		isActive := i < count*85/100

		rates[i] = &prj.PrjBillingRate{
			RateId:         fmt.Sprintf("pbr-%03d", i+1),
			Name:           billingRateNames[i%len(billingRateNames)],
			Description:    fmt.Sprintf("Billing rate for %s role", billingRateNames[i%len(billingRateNames)]),
			ProjectId:      projectID,
			ResourceId:     resourceID,
			Role:           billingRateNames[i%len(billingRateNames)],
			SkillCategory:  skillCategories[i%len(skillCategories)],
			Rate:           &erp.Money{Amount: baseRate, CurrencyCode: "USD"},
			RateUnit:       rateUnits[i%len(rateUnits)],
			OvertimeRate:   &erp.Money{Amount: overtimeRate, CurrencyCode: "USD"},
			EffectiveFrom:  effectiveFrom.Unix(),
			EffectiveUntil: effectiveUntil.Unix(),
			IsActive:       isActive,
			CurrencyCode:   "USD",
			AuditInfo:      createAuditInfo(),
		}
	}
	return rates
}

// generateBillingSchedules creates project billing schedules
func generateBillingSchedules(store *MockDataStore) []*prj.PrjBillingSchedule {
	billingTypes := []prj.PrjBillingType{
		prj.PrjBillingType_PRJ_BILLING_TYPE_TIME_AND_MATERIALS,
		prj.PrjBillingType_PRJ_BILLING_TYPE_TIME_AND_MATERIALS,
		prj.PrjBillingType_PRJ_BILLING_TYPE_FIXED_PRICE,
		prj.PrjBillingType_PRJ_BILLING_TYPE_MILESTONE,
		prj.PrjBillingType_PRJ_BILLING_TYPE_RETAINER,
	}

	billingFrequencies := []string{"Weekly", "Bi-Weekly", "Monthly", "Milestone"}

	count := 15
	schedules := make([]*prj.PrjBillingSchedule, count)

	for i := 0; i < count; i++ {
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		billingType := billingTypes[i%len(billingTypes)]
		startDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		endDate := startDate.AddDate(1, 0, 0)

		// Fixed amount for fixed price or retainer billing
		var fixedAmount *erp.Money
		var retainerAmount *erp.Money
		if billingType == prj.PrjBillingType_PRJ_BILLING_TYPE_FIXED_PRICE {
			fixedAmount = &erp.Money{Amount: int64(rand.Intn(500000)+50000) * 100, CurrencyCode: "USD"}
		} else if billingType == prj.PrjBillingType_PRJ_BILLING_TYPE_RETAINER {
			retainerAmount = &erp.Money{Amount: int64(rand.Intn(50000)+10000) * 100, CurrencyCode: "USD"}
		}

		// 80% active, 20% inactive
		isActive := i < count*80/100

		// Include expenses for T&M and retainer
		includeExpenses := billingType == prj.PrjBillingType_PRJ_BILLING_TYPE_TIME_AND_MATERIALS ||
			billingType == prj.PrjBillingType_PRJ_BILLING_TYPE_RETAINER

		schedules[i] = &prj.PrjBillingSchedule{
			ScheduleId:           fmt.Sprintf("pbs-%03d", i+1),
			ProjectId:            projectID,
			Name:                 billingScheduleNames[i%len(billingScheduleNames)],
			Description:          fmt.Sprintf("Billing schedule: %s", billingScheduleNames[i%len(billingScheduleNames)]),
			BillingType:          billingType,
			BillingFrequency:     billingFrequencies[i%len(billingFrequencies)],
			BillingDay:           int32((i%28) + 1),
			FixedAmount:          fixedAmount,
			RetainerAmount:       retainerAmount,
			IncludeExpenses:      includeExpenses,
			ExpenseMarkupPercent: float64(rand.Intn(20) + 5),
			IsActive:             isActive,
			StartDate:            startDate.Unix(),
			EndDate:              endDate.Unix(),
			AuditInfo:            createAuditInfo(),
		}
	}
	return schedules
}

// generateBillingMilestones creates billing milestones for schedules
func generateBillingMilestones(store *MockDataStore) []*prj.PrjBillingMilestone {
	count := 30
	milestones := make([]*prj.PrjBillingMilestone, count)

	for i := 0; i < count; i++ {
		scheduleID := ""
		if len(store.PrjBillingScheduleIDs) > 0 {
			scheduleID = store.PrjBillingScheduleIDs[i%len(store.PrjBillingScheduleIDs)]
		}

		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		// Reference project milestone if available
		projectMilestoneID := ""
		if len(store.PrjMilestoneIDs) > 0 {
			projectMilestoneID = store.PrjMilestoneIDs[i%len(store.PrjMilestoneIDs)]
		}

		dueDate := time.Now().AddDate(0, rand.Intn(6)-3, rand.Intn(28))
		amount := int64(rand.Intn(100000)+10000) * 100 // $10,000 to $110,000
		percentage := float64(rand.Intn(30) + 10)      // 10% to 40%

		// 40% billed, 60% not billed
		isBilled := i < count*40/100

		var billedDate int64
		var invoiceID string
		if isBilled {
			billedDate = dueDate.AddDate(0, 0, rand.Intn(7)).Unix()
			if len(store.PrjProjectInvoiceIDs) > 0 {
				invoiceID = store.PrjProjectInvoiceIDs[i%len(store.PrjProjectInvoiceIDs)]
			}
		}

		milestones[i] = &prj.PrjBillingMilestone{
			MilestoneId:        fmt.Sprintf("pbm-%03d", i+1),
			ScheduleId:         scheduleID,
			ProjectId:          projectID,
			ProjectMilestoneId: projectMilestoneID,
			Name:               billingMilestoneNames[i%len(billingMilestoneNames)],
			Description:        fmt.Sprintf("Billing milestone: %s", billingMilestoneNames[i%len(billingMilestoneNames)]),
			Amount:             &erp.Money{Amount: amount, CurrencyCode: "USD"},
			Percentage:         percentage,
			DueDate:            dueDate.Unix(),
			BilledDate:         billedDate,
			InvoiceId:          invoiceID,
			IsBilled:           isBilled,
			Deliverables:       fmt.Sprintf("Deliverables for milestone %d", i+1),
			AuditInfo:          createAuditInfo(),
		}
	}
	return milestones
}

// generateProjectInvoices creates project invoice records
func generateProjectInvoices(store *MockDataStore) []*prj.PrjProjectInvoice {
	invoiceStatuses := []prj.PrjInvoiceStatus{
		prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_PAID,
		prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_PAID,
		prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_PAID,
		prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_SENT,
		prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_SENT,
		prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_PENDING,
		prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_DRAFT,
		prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_OVERDUE,
	}

	paymentTerms := []string{"Net 30", "Net 45", "Net 60", "Due on Receipt"}

	count := 25
	invoices := make([]*prj.PrjProjectInvoice, count)

	for i := 0; i < count; i++ {
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		customerID := ""
		if len(store.CustomerIDs) > 0 {
			customerID = store.CustomerIDs[i%len(store.CustomerIDs)]
		}

		invoiceDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		dueDate := invoiceDate.AddDate(0, 0, 30+rand.Intn(30))
		periodStart := invoiceDate.AddDate(0, -1, 0)
		periodEnd := invoiceDate

		// Subtotal between $5,000 and $100,000
		subtotal := int64(rand.Intn(9500000)+500000)
		taxRate := float64(rand.Intn(10)+5) / 100
		taxAmount := int64(float64(subtotal) * taxRate)
		totalAmount := subtotal + taxAmount

		status := invoiceStatuses[i%len(invoiceStatuses)]

		var paidAmount int64
		var paidDate int64
		var sentDate int64
		var balanceDue int64

		if status == prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_PAID {
			paidAmount = totalAmount
			paidDate = dueDate.AddDate(0, 0, -rand.Intn(10)).Unix()
			sentDate = invoiceDate.Unix()
			balanceDue = 0
		} else if status == prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_SENT ||
			status == prj.PrjInvoiceStatus_PRJ_INVOICE_STATUS_OVERDUE {
			paidAmount = 0
			sentDate = invoiceDate.Unix()
			balanceDue = totalAmount
		} else {
			paidAmount = 0
			balanceDue = totalAmount
		}

		invoices[i] = &prj.PrjProjectInvoice{
			InvoiceId:     fmt.Sprintf("pinv-%03d", i+1),
			ProjectId:     projectID,
			CustomerId:    customerID,
			InvoiceNumber: fmt.Sprintf("INV-%04d-%03d", time.Now().Year(), i+1),
			PoNumber:      fmt.Sprintf("PO-%06d", rand.Intn(999999)+1),
			InvoiceDate:   invoiceDate.Unix(),
			DueDate:       dueDate.Unix(),
			PeriodStart:   periodStart.Unix(),
			PeriodEnd:     periodEnd.Unix(),
			Subtotal:      &erp.Money{Amount: subtotal, CurrencyCode: "USD"},
			TaxAmount:     &erp.Money{Amount: taxAmount, CurrencyCode: "USD"},
			TotalAmount:   &erp.Money{Amount: totalAmount, CurrencyCode: "USD"},
			PaidAmount:    &erp.Money{Amount: paidAmount, CurrencyCode: "USD"},
			BalanceDue:    &erp.Money{Amount: balanceDue, CurrencyCode: "USD"},
			Status:        status,
			PaymentTerms:  paymentTerms[i%len(paymentTerms)],
			Notes:         fmt.Sprintf("Invoice for project services - Period %d", i+1),
			SentDate:      sentDate,
			PaidDate:      paidDate,
			CurrencyCode:  "USD",
			AuditInfo:     createAuditInfo(),
		}
	}
	return invoices
}

// generateInvoiceLines creates invoice line items
func generateInvoiceLines(store *MockDataStore) []*prj.PrjInvoiceLine {
	lineTypes := []string{"time", "expense", "milestone", "fixed"}
	units := []string{"hours", "days", "units", "each"}

	count := 75
	lines := make([]*prj.PrjInvoiceLine, count)

	for i := 0; i < count; i++ {
		invoiceID := ""
		if len(store.PrjProjectInvoiceIDs) > 0 {
			invoiceID = store.PrjProjectInvoiceIDs[i%len(store.PrjProjectInvoiceIDs)]
		}

		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		taskID := ""
		if len(store.PrjTaskIDs) > 0 {
			taskID = store.PrjTaskIDs[i%len(store.PrjTaskIDs)]
		}

		// Optional references to timesheet or expense entries
		timesheetEntryID := ""
		if i%3 == 0 && len(store.PrjTimesheetEntryIDs) > 0 {
			timesheetEntryID = store.PrjTimesheetEntryIDs[i%len(store.PrjTimesheetEntryIDs)]
		}

		expenseEntryID := ""
		if i%4 == 0 && len(store.PrjExpenseEntryIDs) > 0 {
			expenseEntryID = store.PrjExpenseEntryIDs[i%len(store.PrjExpenseEntryIDs)]
		}

		billingMilestoneID := ""
		if i%5 == 0 && len(store.PrjBillingMilestoneIDs) > 0 {
			billingMilestoneID = store.PrjBillingMilestoneIDs[i%len(store.PrjBillingMilestoneIDs)]
		}

		lineType := lineTypes[i%len(lineTypes)]
		unit := units[i%len(units)]

		// Quantity based on line type
		var quantity float64
		if lineType == "time" {
			quantity = float64(rand.Intn(80) + 8)
		} else if lineType == "expense" {
			quantity = float64(rand.Intn(10) + 1)
		} else {
			quantity = 1.0
		}

		// Unit price: $50 to $300 for time, $100 to $5000 for others
		var unitPriceAmount int64
		if lineType == "time" {
			unitPriceAmount = int64(rand.Intn(25000)+5000)
		} else {
			unitPriceAmount = int64(rand.Intn(490000)+10000)
		}

		amount := int64(float64(unitPriceAmount) * quantity)
		taxRate := float64(rand.Intn(10)+5) / 100
		taxAmount := int64(float64(amount) * taxRate)
		totalAmount := amount + taxAmount

		// 80% taxable, 20% not taxable
		isTaxable := i < count*80/100

		lines[i] = &prj.PrjInvoiceLine{
			LineId:             fmt.Sprintf("pil-%03d", i+1),
			InvoiceId:          invoiceID,
			ProjectId:          projectID,
			TaskId:             taskID,
			TimesheetEntryId:   timesheetEntryID,
			ExpenseEntryId:     expenseEntryID,
			BillingMilestoneId: billingMilestoneID,
			LineNumber:         int32((i % 5) + 1),
			Description:        invoiceDescriptions[i%len(invoiceDescriptions)],
			Quantity:           quantity,
			Unit:               unit,
			UnitPrice:          &erp.Money{Amount: unitPriceAmount, CurrencyCode: "USD"},
			Amount:             &erp.Money{Amount: amount, CurrencyCode: "USD"},
			TaxAmount:          &erp.Money{Amount: taxAmount, CurrencyCode: "USD"},
			TotalAmount:        &erp.Money{Amount: totalAmount, CurrencyCode: "USD"},
			LineType:           lineType,
			IsTaxable:          isTaxable,
			AuditInfo:          createAuditInfo(),
		}
	}
	return lines
}

// generateRevenueRecognitions creates revenue recognition records
func generateRevenueRecognitions(store *MockDataStore) []*prj.PrjRevenueRecognition {
	methods := []prj.PrjRevenueRecognitionMethod{
		prj.PrjRevenueRecognitionMethod_PRJ_REVENUE_RECOGNITION_METHOD_PERCENTAGE_OF_COMPLETION,
		prj.PrjRevenueRecognitionMethod_PRJ_REVENUE_RECOGNITION_METHOD_PERCENTAGE_OF_COMPLETION,
		prj.PrjRevenueRecognitionMethod_PRJ_REVENUE_RECOGNITION_METHOD_COMPLETED_CONTRACT,
		prj.PrjRevenueRecognitionMethod_PRJ_REVENUE_RECOGNITION_METHOD_AS_INVOICED,
	}

	count := 30
	recognitions := make([]*prj.PrjRevenueRecognition, count)

	for i := 0; i < count; i++ {
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		invoiceID := ""
		if len(store.PrjProjectInvoiceIDs) > 0 {
			invoiceID = store.PrjProjectInvoiceIDs[i%len(store.PrjProjectInvoiceIDs)]
		}

		recognitionDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		periodStart := recognitionDate.AddDate(0, 0, -recognitionDate.Day()+1)
		periodEnd := periodStart.AddDate(0, 1, -1)

		// Amounts
		recognizedAmount := int64(rand.Intn(100000)+10000) * 100
		deferredAmount := int64(rand.Intn(50000)+5000) * 100
		cumulativeRecognized := recognizedAmount + int64(rand.Intn(200000))*100

		method := methods[i%len(methods)]
		percentComplete := float64(rand.Intn(80) + 10)

		// 70% posted, 30% not posted
		isPosted := i < count*70/100
		var postedDate int64
		if isPosted {
			postedDate = recognitionDate.AddDate(0, 0, rand.Intn(5)).Unix()
		}

		// GL account references
		glAccount := ""
		deferredGlAccount := ""
		if len(store.AccountIDs) > 0 {
			glAccount = store.AccountIDs[i%len(store.AccountIDs)]
			deferredGlAccount = store.AccountIDs[(i+1)%len(store.AccountIDs)]
		}

		recognitions[i] = &prj.PrjRevenueRecognition{
			RecognitionId:        fmt.Sprintf("prr-%03d", i+1),
			ProjectId:            projectID,
			InvoiceId:            invoiceID,
			RecognitionDate:      recognitionDate.Unix(),
			PeriodStart:          periodStart.Unix(),
			PeriodEnd:            periodEnd.Unix(),
			RecognizedAmount:     &erp.Money{Amount: recognizedAmount, CurrencyCode: "USD"},
			DeferredAmount:       &erp.Money{Amount: deferredAmount, CurrencyCode: "USD"},
			CumulativeRecognized: &erp.Money{Amount: cumulativeRecognized, CurrencyCode: "USD"},
			Method:               method,
			PercentComplete:      percentComplete,
			GlAccount:            glAccount,
			DeferredGlAccount:    deferredGlAccount,
			Notes:                fmt.Sprintf("Revenue recognition for period %d", i+1),
			IsPosted:             isPosted,
			PostedDate:           postedDate,
			AuditInfo:            createAuditInfo(),
		}
	}
	return recognitions
}

// generateProjectBudgets creates project budget records
func generateProjectBudgets(store *MockDataStore) []*prj.PrjProjectBudget {
	budgetTypes := []string{"Labor", "Materials", "Travel", "Software", "Hardware", "Other"}

	count := 30
	budgets := make([]*prj.PrjProjectBudget, count)

	for i := 0; i < count; i++ {
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		phaseID := ""
		if i%2 == 0 && len(store.PrjPhaseIDs) > 0 {
			phaseID = store.PrjPhaseIDs[i%len(store.PrjPhaseIDs)]
		}

		periodStart := time.Now().AddDate(0, -rand.Intn(6), 0)
		periodEnd := periodStart.AddDate(0, 6, 0)

		// Budget amounts
		budgetedAmount := int64(rand.Intn(200000)+20000) * 100
		actualAmount := budgetedAmount * int64(rand.Intn(80)+30) / 100
		committedAmount := actualAmount + int64(rand.Intn(20000))*100
		remainingAmount := budgetedAmount - actualAmount

		// Hours (primarily for labor budgets)
		budgetedHours := float64(rand.Intn(500) + 100)
		actualHours := budgetedHours * float64(rand.Intn(80)+30) / 100
		remainingHours := budgetedHours - actualHours

		// 75% approved, 25% pending approval
		isApproved := i < count*75/100
		var approvedBy string
		var approvedDate int64
		if isApproved && len(store.ManagerIDs) > 0 {
			approvedBy = store.ManagerIDs[i%len(store.ManagerIDs)]
			approvedDate = periodStart.AddDate(0, 0, -rand.Intn(14)).Unix()
		}

		budgets[i] = &prj.PrjProjectBudget{
			BudgetId:        fmt.Sprintf("ppb-%03d", i+1),
			ProjectId:       projectID,
			Name:            budgetNames[i%len(budgetNames)],
			Description:     fmt.Sprintf("Budget: %s", budgetNames[i%len(budgetNames)]),
			BudgetType:      budgetTypes[i%len(budgetTypes)],
			PhaseId:         phaseID,
			BudgetedAmount:  &erp.Money{Amount: budgetedAmount, CurrencyCode: "USD"},
			CommittedAmount: &erp.Money{Amount: committedAmount, CurrencyCode: "USD"},
			ActualAmount:    &erp.Money{Amount: actualAmount, CurrencyCode: "USD"},
			RemainingAmount: &erp.Money{Amount: remainingAmount, CurrencyCode: "USD"},
			BudgetedHours:   budgetedHours,
			ActualHours:     actualHours,
			RemainingHours:  remainingHours,
			PeriodStart:     periodStart.Unix(),
			PeriodEnd:       periodEnd.Unix(),
			IsApproved:      isApproved,
			ApprovedBy:      approvedBy,
			ApprovedDate:    approvedDate,
			Version:         int32(rand.Intn(3) + 1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return budgets
}
