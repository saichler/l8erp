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
package mocks

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/sales"
)

// generateSalesBillingSchedules creates billing schedule records with embedded milestones
func generateSalesBillingSchedules(store *MockDataStore) []*sales.SalesBillingSchedule {
	frequencies := []sales.SalesBillingFrequency{
		sales.SalesBillingFrequency_BILLING_FREQUENCY_ONE_TIME,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_MONTHLY,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_MONTHLY,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_QUARTERLY,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_QUARTERLY,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_MILESTONE,
	}

	billingStatuses := []sales.SalesBillingStatus{
		sales.SalesBillingStatus_BILLING_STATUS_PENDING,
		sales.SalesBillingStatus_BILLING_STATUS_PENDING,
		sales.SalesBillingStatus_BILLING_STATUS_INVOICED,
		sales.SalesBillingStatus_BILLING_STATUS_PAID,
		sales.SalesBillingStatus_BILLING_STATUS_PAID,
	}

	milestoneStatuses := []sales.SalesBillingStatus{
		sales.SalesBillingStatus_BILLING_STATUS_PAID,
		sales.SalesBillingStatus_BILLING_STATUS_PAID,
		sales.SalesBillingStatus_BILLING_STATUS_INVOICED,
		sales.SalesBillingStatus_BILLING_STATUS_PENDING,
		sales.SalesBillingStatus_BILLING_STATUS_PENDING,
	}

	count := minInt(20, len(store.SalesOrderIDs))
	if count == 0 {
		count = 20
	}

	schedules := make([]*sales.SalesBillingSchedule, count)
	for i := 0; i < count; i++ {
		orderID := pickRef(store.SalesOrderIDs, i)
		contractID := pickRef(store.SalesCustomerContractIDs, i)
		customerID := pickRef(store.CustomerIDs, i)

		startDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		endDate := startDate.AddDate(1, 0, 0)
		nextBillingDate := time.Now().AddDate(0, 0, rand.Intn(30)+1)

		totalAmount := int64(rand.Intn(50000000) + 1000000)
		billedAmount := totalAmount * int64(rand.Intn(80)+10) / 100
		remainingAmount := totalAmount - billedAmount

		// Embed billing milestones (3 per schedule)
		milestones := make([]*sales.SalesBillingMilestone, 3)
		for j := 0; j < 3; j++ {
			targetDate := time.Now().AddDate(0, (j-1)*2, 0)
			mStatus := milestoneStatuses[(i*3+j)%len(milestoneStatuses)]
			var actualDate int64
			if mStatus == sales.SalesBillingStatus_BILLING_STATUS_PAID {
				actualDate = targetDate.Unix()
			}

			invoiceID := ""
			if len(store.SalesInvoiceIDs) > 0 && mStatus == sales.SalesBillingStatus_BILLING_STATUS_PAID {
				invoiceID = store.SalesInvoiceIDs[(i*3+j)%len(store.SalesInvoiceIDs)]
			}

			milestones[j] = &sales.SalesBillingMilestone{
				MilestoneId: fmt.Sprintf("sbm-%03d", i*3+j+1),
				Name:        fmt.Sprintf("%s Milestone", milestonePrefixes[j%len(milestonePrefixes)]),
				Description: fmt.Sprintf("Billing milestone %d for schedule", j+1),
				Sequence:    int32(j + 1),
				Amount:      money(store, int64(rand.Intn(5000000)+500000)),
				Percentage:  float64((j + 1) * 25),
				TargetDate:  targetDate.Unix(),
				ActualDate:  actualDate,
				Status:      mStatus,
				InvoiceId:   invoiceID,
				Notes:       fmt.Sprintf("Milestone %d completion criteria", j+1),
			}
		}

		schedules[i] = &sales.SalesBillingSchedule{
			ScheduleId:      genID("sbs", i),
			Name:            fmt.Sprintf("Billing Schedule %d", i+1),
			SalesOrderId:    orderID,
			ContractId:      contractID,
			CustomerId:      customerID,
			Frequency:       frequencies[i%len(frequencies)],
			StartDate:       startDate.Unix(),
			EndDate:         endDate.Unix(),
			NextBillingDate: nextBillingDate.Unix(),
			TotalAmount:     money(store, totalAmount),
			BilledAmount:    money(store, billedAmount),
			RemainingAmount: money(store, remainingAmount),
			Status:          billingStatuses[i%len(billingStatuses)],
			Notes:           fmt.Sprintf("Billing schedule for order/contract %d", i+1),
			AuditInfo:       createAuditInfo(),
			Milestones:      milestones,
		}
	}
	return schedules
}

// generateSalesRevenueSchedules creates revenue schedule records
func generateSalesRevenueSchedules(store *MockDataStore) []*sales.SalesRevenueSchedule {
	recognitionMethods := []sales.SalesRevenueRecognition{
		sales.SalesRevenueRecognition_REVENUE_RECOGNITION_POINT_IN_TIME,
		sales.SalesRevenueRecognition_REVENUE_RECOGNITION_OVER_TIME,
		sales.SalesRevenueRecognition_REVENUE_RECOGNITION_MILESTONE,
	}

	count := minInt(15, len(store.SalesOrderIDs))
	if count == 0 {
		count = 15
	}

	schedules := make([]*sales.SalesRevenueSchedule, count)
	for i := 0; i < count; i++ {
		orderID := pickRef(store.SalesOrderIDs, i)
		contractID := pickRef(store.SalesCustomerContractIDs, i)
		accountID := pickRef(store.AccountIDs, i)

		startDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		endDate := startDate.AddDate(1, 0, 0)

		totalRevenue := int64(rand.Intn(50000000) + 1000000)
		recognizedRevenue := totalRevenue * int64(rand.Intn(80)+10) / 100
		deferredRevenue := totalRevenue - recognizedRevenue

		schedules[i] = &sales.SalesRevenueSchedule{
			ScheduleId:        genID("srs", i),
			SalesOrderId:      orderID,
			ContractId:        contractID,
			RecognitionMethod: recognitionMethods[i%len(recognitionMethods)],
			StartDate:         startDate.Unix(),
			EndDate:           endDate.Unix(),
			TotalRevenue:      money(store, totalRevenue),
			RecognizedRevenue: money(store, recognizedRevenue),
			DeferredRevenue:   money(store, deferredRevenue),
			RevenueAccountId:  accountID,
			Notes:             fmt.Sprintf("Revenue recognition schedule for order %d", i+1),
			AuditInfo:         createAuditInfo(),
		}
	}
	return schedules
}
