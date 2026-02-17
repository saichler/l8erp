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
package mocks

// gen_prj_billing.go
// Generates:
// - PrjBillingRate
// - PrjBillingSchedule
// - PrjBillingMilestone
// - PrjProjectInvoice

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

// generateBillingRates creates billing rate configurations
func generateBillingRates(store *MockDataStore) []*prj.PrjBillingRate {
	rateUnits := []string{"hourly", "daily", "weekly"}
	skillCategories := []string{"Technical", "Business", "Management", "Design", "Analytics"}

	count := 12
	rates := make([]*prj.PrjBillingRate, count)

	for i := 0; i < count; i++ {
		// Reference resource pool if available
		resourceID := pickRef(store.PrjResourceIDs, i)

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
			RateId:         genID("pbr", i),
			Name:           billingRateNames[i%len(billingRateNames)],
			Description:    fmt.Sprintf("Billing rate for %s role", billingRateNames[i%len(billingRateNames)]),
			ProjectId:      projectID,
			ResourceId:     resourceID,
			Role:           billingRateNames[i%len(billingRateNames)],
			SkillCategory:  skillCategories[i%len(skillCategories)],
			Rate:           money(store, baseRate),
			RateUnit:       rateUnits[i%len(rateUnits)],
			OvertimeRate:   money(store, overtimeRate),
			EffectiveFrom:  effectiveFrom.Unix(),
			EffectiveUntil: effectiveUntil.Unix(),
			IsActive:       isActive,
			CurrencyId: pickRef(store.CurrencyIDs, i),
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
		projectID := pickRef(store.PrjProjectIDs, i)

		billingType := billingTypes[i%len(billingTypes)]
		startDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		endDate := startDate.AddDate(1, 0, 0)

		// Fixed amount for fixed price or retainer billing
		var fixedAmount *erp.Money
		var retainerAmount *erp.Money
		if billingType == prj.PrjBillingType_PRJ_BILLING_TYPE_FIXED_PRICE {
			fixedAmount = money(store, int64(rand.Intn(500000)+50000) * 100)
		} else if billingType == prj.PrjBillingType_PRJ_BILLING_TYPE_RETAINER {
			retainerAmount = money(store, int64(rand.Intn(50000)+10000) * 100)
		}

		// 80% active, 20% inactive
		isActive := i < count*80/100

		// Include expenses for T&M and retainer
		includeExpenses := billingType == prj.PrjBillingType_PRJ_BILLING_TYPE_TIME_AND_MATERIALS ||
			billingType == prj.PrjBillingType_PRJ_BILLING_TYPE_RETAINER

		schedules[i] = &prj.PrjBillingSchedule{
			ScheduleId:           genID("pbs", i),
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
		projectID := pickRef(store.PrjProjectIDs, i)

		// Reference project milestone if available
		projectMilestoneID := pickRef(store.PrjMilestoneIDs, i)

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
			MilestoneId:        genID("pbm", i),
			ProjectId:          projectID,
			ProjectMilestoneId: projectMilestoneID,
			Name:               billingMilestoneNames[i%len(billingMilestoneNames)],
			Description:        fmt.Sprintf("Billing milestone: %s", billingMilestoneNames[i%len(billingMilestoneNames)]),
			Amount:             money(store, amount),
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
		projectID := pickRef(store.PrjProjectIDs, i)

		customerID := pickRef(store.CustomerIDs, i)

		invoiceDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		dueDate := invoiceDate.AddDate(0, 0, 30+rand.Intn(30))
		periodStart := invoiceDate.AddDate(0, -1, 0)
		periodEnd := invoiceDate

		// Subtotal between $5,000 and $100,000
		subtotal := int64(rand.Intn(9500000) + 500000)
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
			InvoiceId:     genID("pinv", i),
			ProjectId:     projectID,
			CustomerId:    customerID,
			InvoiceNumber: fmt.Sprintf("INV-%04d-%03d", time.Now().Year(), i+1),
			PoNumber:      fmt.Sprintf("PO-%06d", rand.Intn(999999)+1),
			InvoiceDate:   invoiceDate.Unix(),
			DueDate:       dueDate.Unix(),
			PeriodStart:   periodStart.Unix(),
			PeriodEnd:     periodEnd.Unix(),
			Subtotal:      money(store, subtotal),
			TaxAmount:     money(store, taxAmount),
			TotalAmount:   money(store, totalAmount),
			PaidAmount:    money(store, paidAmount),
			BalanceDue:    money(store, balanceDue),
			Status:        status,
			PaymentTerms:  paymentTerms[i%len(paymentTerms)],
			Notes:         fmt.Sprintf("Invoice for project services - Period %d", i+1),
			SentDate:      sentDate,
			PaidDate:      paidDate,
			CurrencyId: pickRef(store.CurrencyIDs, i),
			AuditInfo:     createAuditInfo(),
		}
	}
	return invoices
}
