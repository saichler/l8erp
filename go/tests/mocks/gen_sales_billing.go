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
	"github.com/saichler/l8erp/go/types/sales"
)

// generateSalesBillingSchedules creates billing schedule records
func generateSalesBillingSchedules(store *MockDataStore) []*sales.SalesBillingSchedule {
	frequencies := []sales.SalesBillingFrequency{
		sales.SalesBillingFrequency_BILLING_FREQUENCY_ONE_TIME,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_MONTHLY,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_MONTHLY,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_QUARTERLY,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_QUARTERLY,
		sales.SalesBillingFrequency_BILLING_FREQUENCY_MILESTONE,
	}

	statuses := []sales.SalesBillingStatus{
		sales.SalesBillingStatus_BILLING_STATUS_PENDING,
		sales.SalesBillingStatus_BILLING_STATUS_PENDING,
		sales.SalesBillingStatus_BILLING_STATUS_INVOICED,
		sales.SalesBillingStatus_BILLING_STATUS_PAID,
		sales.SalesBillingStatus_BILLING_STATUS_PAID,
	}

	count := minInt(20, len(store.SalesOrderIDs))
	if count == 0 {
		count = 20
	}

	schedules := make([]*sales.SalesBillingSchedule, count)
	for i := 0; i < count; i++ {
		orderID := ""
		if len(store.SalesOrderIDs) > 0 {
			orderID = store.SalesOrderIDs[i%len(store.SalesOrderIDs)]
		}

		contractID := ""
		if len(store.SalesCustomerContractIDs) > 0 {
			contractID = store.SalesCustomerContractIDs[i%len(store.SalesCustomerContractIDs)]
		}

		customerID := ""
		if len(store.CustomerIDs) > 0 {
			customerID = store.CustomerIDs[i%len(store.CustomerIDs)]
		}

		startDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		endDate := startDate.AddDate(1, 0, 0)
		nextBillingDate := time.Now().AddDate(0, 0, rand.Intn(30)+1)

		totalAmount := int64(rand.Intn(50000000) + 1000000)
		billedAmount := totalAmount * int64(rand.Intn(80)+10) / 100
		remainingAmount := totalAmount - billedAmount

		schedules[i] = &sales.SalesBillingSchedule{
			ScheduleId:      fmt.Sprintf("sbs-%03d", i+1),
			Name:            fmt.Sprintf("Billing Schedule %d", i+1),
			SalesOrderId:    orderID,
			ContractId:      contractID,
			CustomerId:      customerID,
			Frequency:       frequencies[i%len(frequencies)],
			StartDate:       startDate.Unix(),
			EndDate:         endDate.Unix(),
			NextBillingDate: nextBillingDate.Unix(),
			TotalAmount:     &erp.Money{Amount: totalAmount, CurrencyCode: "USD"},
			BilledAmount:    &erp.Money{Amount: billedAmount, CurrencyCode: "USD"},
			RemainingAmount: &erp.Money{Amount: remainingAmount, CurrencyCode: "USD"},
			Status:          statuses[i%len(statuses)],
			Notes:           fmt.Sprintf("Billing schedule for order/contract %d", i+1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return schedules
}

// generateSalesBillingMilestones creates billing milestone records (3 per schedule)
func generateSalesBillingMilestones(store *MockDataStore) []*sales.SalesBillingMilestone {
	statuses := []sales.SalesBillingStatus{
		sales.SalesBillingStatus_BILLING_STATUS_PAID,
		sales.SalesBillingStatus_BILLING_STATUS_PAID,
		sales.SalesBillingStatus_BILLING_STATUS_INVOICED,
		sales.SalesBillingStatus_BILLING_STATUS_PENDING,
		sales.SalesBillingStatus_BILLING_STATUS_PENDING,
	}

	count := len(store.SalesBillingScheduleIDs) * 3
	if count == 0 {
		count = 60
	}

	milestones := make([]*sales.SalesBillingMilestone, 0, count)
	idx := 1
	for sIdx, scheduleID := range store.SalesBillingScheduleIDs {
		for j := 0; j < 3; j++ {
			targetDate := time.Now().AddDate(0, (j-1)*2, 0)
			status := statuses[(sIdx*3+j)%len(statuses)]
			var actualDate int64
			if status == sales.SalesBillingStatus_BILLING_STATUS_PAID {
				actualDate = targetDate.Unix()
			}

			invoiceID := ""
			if len(store.SalesInvoiceIDs) > 0 && status == sales.SalesBillingStatus_BILLING_STATUS_PAID {
				invoiceID = store.SalesInvoiceIDs[(sIdx*3+j)%len(store.SalesInvoiceIDs)]
			}

			percentage := float64((j + 1) * 25)
			amount := int64(rand.Intn(5000000) + 500000)

			milestones = append(milestones, &sales.SalesBillingMilestone{
				MilestoneId: fmt.Sprintf("sbm-%03d", idx),
				ScheduleId:  scheduleID,
				Name:        fmt.Sprintf("%s Milestone", milestonePrefixes[j%len(milestonePrefixes)]),
				Description: fmt.Sprintf("Billing milestone %d for schedule", j+1),
				Sequence:    int32(j + 1),
				Amount:      &erp.Money{Amount: amount, CurrencyCode: "USD"},
				Percentage:  percentage,
				TargetDate:  targetDate.Unix(),
				ActualDate:  actualDate,
				Status:      status,
				InvoiceId:   invoiceID,
				Notes:       fmt.Sprintf("Milestone %d completion criteria", j+1),
				AuditInfo:   createAuditInfo(),
			})
			idx++
		}
	}
	return milestones
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
		orderID := ""
		if len(store.SalesOrderIDs) > 0 {
			orderID = store.SalesOrderIDs[i%len(store.SalesOrderIDs)]
		}

		contractID := ""
		if len(store.SalesCustomerContractIDs) > 0 {
			contractID = store.SalesCustomerContractIDs[i%len(store.SalesCustomerContractIDs)]
		}

		accountID := ""
		if len(store.AccountIDs) > 0 {
			accountID = store.AccountIDs[i%len(store.AccountIDs)]
		}

		startDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		endDate := startDate.AddDate(1, 0, 0)

		totalRevenue := int64(rand.Intn(50000000) + 1000000)
		recognizedRevenue := totalRevenue * int64(rand.Intn(80)+10) / 100
		deferredRevenue := totalRevenue - recognizedRevenue

		schedules[i] = &sales.SalesRevenueSchedule{
			ScheduleId:        fmt.Sprintf("srs-%03d", i+1),
			SalesOrderId:      orderID,
			ContractId:        contractID,
			RecognitionMethod: recognitionMethods[i%len(recognitionMethods)],
			StartDate:         startDate.Unix(),
			EndDate:           endDate.Unix(),
			TotalRevenue:      &erp.Money{Amount: totalRevenue, CurrencyCode: "USD"},
			RecognizedRevenue: &erp.Money{Amount: recognizedRevenue, CurrencyCode: "USD"},
			DeferredRevenue:   &erp.Money{Amount: deferredRevenue, CurrencyCode: "USD"},
			RevenueAccountId:  accountID,
			Notes:             fmt.Sprintf("Revenue recognition schedule for order %d", i+1),
			AuditInfo:         createAuditInfo(),
		}
	}
	return schedules
}
