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
	"github.com/saichler/l8erp/go/types/scm"
)

// generatePurchaseRequisitions creates 20 purchase requisition records
func generatePurchaseRequisitions(store *MockDataStore) []*scm.ScmPurchaseRequisition {
	requisitions := make([]*scm.ScmPurchaseRequisition, 20)

	statuses := []scm.ScmRequisitionStatus{
		scm.ScmRequisitionStatus_REQUISITION_STATUS_DRAFT,
		scm.ScmRequisitionStatus_REQUISITION_STATUS_SUBMITTED,
		scm.ScmRequisitionStatus_REQUISITION_STATUS_APPROVED,
		scm.ScmRequisitionStatus_REQUISITION_STATUS_FULFILLED,
		scm.ScmRequisitionStatus_REQUISITION_STATUS_REJECTED,
	}

	priorities := []string{"High", "Medium", "Low"}

	for i := 0; i < 20; i++ {
		requesterId := store.EmployeeIDs[i%len(store.EmployeeIDs)]
		departmentId := store.DepartmentIDs[i%len(store.DepartmentIDs)]
		requestDate := time.Date(2025, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		// 60% APPROVED: indices 0-11 get APPROVED, rest cycle through statuses
		var status scm.ScmRequisitionStatus
		if i < 12 {
			status = scm.ScmRequisitionStatus_REQUISITION_STATUS_APPROVED
		} else {
			status = statuses[i%len(statuses)]
		}

		estimatedTotal := int64(rand.Intn(495001)+5000) // 5000 to 500000 cents

		requisitions[i] = &scm.ScmPurchaseRequisition{
			RequisitionId:      genID("preq", i),
			RequisitionNumber:  fmt.Sprintf("PR-%06d", i+1),
			RequesterId:        requesterId,
			DepartmentId:       departmentId,
			RequestDate:        requestDate.Unix(),
			Status:             status,
			Description:        fmt.Sprintf("Purchase requisition %d from department %s", i+1, departmentId),
			Priority:           priorities[i%len(priorities)],
			EstimatedTotal:     money(estimatedTotal),
			ApprovalWorkflowId: genID("wf", i),
			AuditInfo:          createAuditInfo(),
		}
	}

	return requisitions
}

// generateRequisitionLines creates 3 lines per requisition = 60 total
func generateRequisitionLines(store *MockDataStore) []*scm.ScmRequisitionLine {
	lines := make([]*scm.ScmRequisitionLine, 0, 60)

	descriptions := []string{
		"Raw Materials",
		"Office Supplies",
		"IT Equipment",
		"Packaging Materials",
		"Safety Equipment",
		"Cleaning Supplies",
		"Machine Parts",
		"Electronic Components",
		"Furniture",
		"Tools and Hardware",
	}

	uoms := []string{"EA", "BOX", "KG", "LB", "PCS", "SET"}

	idx := 1
	for i := 0; i < len(store.PurchaseRequisitionIDs); i++ {
		requisitionId := store.PurchaseRequisitionIDs[i]
		for lineNum := int32(1); lineNum <= 3; lineNum++ {
			itemId := store.ItemIDs[idx%len(store.ItemIDs)]
			vendorId := store.VendorIDs[idx%len(store.VendorIDs)]
			quantity := float64(rand.Intn(100) + 1)
			unitPrice := int64(rand.Intn(499000) + 1000) // 10_00 to 5000_00 cents
			lineTotal := int64(quantity) * unitPrice
			deliveryDate := time.Now().AddDate(0, 0, rand.Intn(60)+14)

			lines = append(lines, &scm.ScmRequisitionLine{
				LineId:             fmt.Sprintf("rqln-%04d", idx),
				RequisitionId:      requisitionId,
				LineNumber:         lineNum,
				ItemId:             itemId,
				Description:        descriptions[rand.Intn(len(descriptions))],
				Quantity:           quantity,
				UnitOfMeasure:      uoms[rand.Intn(len(uoms))],
				EstimatedUnitPrice: money(unitPrice),
				EstimatedTotal:     money(lineTotal),
				VendorId:           vendorId,
				DeliveryDate:       deliveryDate.Unix(),
				AuditInfo:          createAuditInfo(),
			})
			idx++
		}
	}

	return lines
}

// generateRFQs creates 10 RFQ records linked to the first 10 requisitions
func generateRFQs(store *MockDataStore) []*scm.ScmRequestForQuotation {
	rfqs := make([]*scm.ScmRequestForQuotation, 10)

	statuses := []scm.ScmRequisitionStatus{
		scm.ScmRequisitionStatus_REQUISITION_STATUS_SUBMITTED,
		scm.ScmRequisitionStatus_REQUISITION_STATUS_APPROVED,
	}

	for i := 0; i < 10; i++ {
		requisitionId := store.PurchaseRequisitionIDs[i]
		issueDate := time.Date(2025, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)
		responseDeadline := issueDate.AddDate(0, 0, 14)

		// Pick 2-3 random vendors
		vendorCount := rand.Intn(2) + 2 // 2 or 3
		vendorIds := make([]string, vendorCount)
		for v := 0; v < vendorCount; v++ {
			vendorIds[v] = store.VendorIDs[rand.Intn(len(store.VendorIDs))]
		}

		rfqs[i] = &scm.ScmRequestForQuotation{
			RfqId:            genID("rfq", i),
			RfqNumber:        fmt.Sprintf("RFQ-%06d", i+1),
			RequisitionId:    requisitionId,
			VendorIds:        vendorIds,
			IssueDate:        issueDate.Unix(),
			ResponseDeadline: responseDeadline.Unix(),
			Description:      fmt.Sprintf("Request for quotation for requisition %s", requisitionId),
			Status:           statuses[i%len(statuses)],
			Notes:            fmt.Sprintf("RFQ %d - please respond by deadline", i+1),
			AuditInfo:        createAuditInfo(),
		}
	}

	return rfqs
}

// generateBlanketOrders creates 8 blanket order records
func generateBlanketOrders(store *MockDataStore) []*scm.ScmBlanketOrder {
	orders := make([]*scm.ScmBlanketOrder, 8)

	statuses := []scm.ScmPurchaseOrderStatus{
		scm.ScmPurchaseOrderStatus_PO_STATUS_APPROVED,
		scm.ScmPurchaseOrderStatus_PO_STATUS_SENT,
	}

	for i := 0; i < 8; i++ {
		vendorId := store.VendorIDs[i%len(store.VendorIDs)]
		startDate := time.Date(2025, time.Month(rand.Intn(6)+1), 1, 0, 0, 0, 0, time.UTC)
		endDate := startDate.AddDate(1, 0, 0)

		maxAmount := int64(rand.Intn(900001) + 100000) // 100000 to 1000000 cents
		usedPercent := rand.Intn(81)                    // 0-80%
		usedAmount := maxAmount * int64(usedPercent) / 100

		orders[i] = &scm.ScmBlanketOrder{
			BlanketOrderId: genID("bo", i),
			OrderNumber:    fmt.Sprintf("BO-%06d", i+1),
			VendorId:       vendorId,
			StartDate:      startDate.Unix(),
			EndDate:        endDate.Unix(),
			MaxAmount:      money(maxAmount),
			UsedAmount:     money(usedAmount),
			Status:         statuses[i%len(statuses)],
			Description:    fmt.Sprintf("Blanket order with vendor %s", vendorId),
			AuditInfo:      createAuditInfo(),
		}
	}

	return orders
}

// generateSCMPurchaseOrders creates 15 purchase order records from approved requisitions
func generateSCMPurchaseOrders(store *MockDataStore) []*scm.ScmPurchaseOrder {
	orders := make([]*scm.ScmPurchaseOrder, 15)

	statuses := []scm.ScmPurchaseOrderStatus{
		scm.ScmPurchaseOrderStatus_PO_STATUS_APPROVED,
		scm.ScmPurchaseOrderStatus_PO_STATUS_SENT,
		scm.ScmPurchaseOrderStatus_PO_STATUS_PARTIALLY_RECEIVED,
		scm.ScmPurchaseOrderStatus_PO_STATUS_RECEIVED,
		scm.ScmPurchaseOrderStatus_PO_STATUS_CLOSED,
	}

	paymentTerms := []string{"Net 30", "Net 60", "Net 90", "2/10 Net 30", "Due on Receipt"}

	for i := 0; i < 15; i++ {
		vendorID := store.VendorIDs[i%len(store.VendorIDs)]
		orderDate := time.Date(2025, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)
		expectedDelivery := orderDate.AddDate(0, 0, rand.Intn(30)+14)
		totalAmount := int64(rand.Intn(950001)+50000) // 50000-1000000 cents

		// 60% APPROVED/SENT, rest cycle through other statuses
		var status scm.ScmPurchaseOrderStatus
		if i < 9 {
			if i%2 == 0 {
				status = scm.ScmPurchaseOrderStatus_PO_STATUS_APPROVED
			} else {
				status = scm.ScmPurchaseOrderStatus_PO_STATUS_SENT
			}
		} else {
			status = statuses[i%len(statuses)]
		}

		requisitionID := pickRef(store.PurchaseRequisitionIDs, i)
		rfqID := pickRef(store.RFQIDs, i)

		orders[i] = &scm.ScmPurchaseOrder{
			PurchaseOrderId:  genID("spo", i),
			OrderNumber:      fmt.Sprintf("PO-%06d", i+1),
			VendorId:         vendorID,
			OrderDate:        orderDate.Unix(),
			ExpectedDelivery: expectedDelivery.Unix(),
			Status:           status,
			TotalAmount:      money(totalAmount),
			ShippingAddress:  createAddress(),
			PaymentTerms:     paymentTerms[i%len(paymentTerms)],
			Notes:            fmt.Sprintf("Purchase order %d for vendor %s", i+1, vendorID),
			RequisitionId:    requisitionID,
			RfqId:            rfqID,
			AuditInfo:        createAuditInfo(),
		}
	}

	return orders
}

// generatePOLines creates 3 lines per purchase order = 45 total
func generatePOLines(store *MockDataStore) []*scm.ScmPurchaseOrderLine {
	lines := make([]*scm.ScmPurchaseOrderLine, 0, len(store.SCMPurchaseOrderIDs)*3)
	uoms := []string{"EA", "BOX", "KG", "LB", "PCS", "SET"}
	idx := 1

	for i := 0; i < len(store.SCMPurchaseOrderIDs); i++ {
		poID := store.SCMPurchaseOrderIDs[i]
		for lineNum := int32(1); lineNum <= 3; lineNum++ {
			itemID := store.ItemIDs[idx%len(store.ItemIDs)]
			quantity := float64(rand.Intn(100) + 1)
			unitPrice := int64(rand.Intn(499000) + 1000) // 1000-500000 cents
			totalPrice := int64(quantity) * unitPrice

			// Received quantity depends on PO status
			receivedQty := 0.0
			if i < 5 {
				receivedQty = quantity // fully received
			} else if i < 9 {
				receivedQty = quantity * (0.3 + rand.Float64()*0.5) // partially received
			}

			lines = append(lines, &scm.ScmPurchaseOrderLine{
				LineId:           fmt.Sprintf("poln-%04d", idx),
				PurchaseOrderId:  poID,
				LineNumber:       lineNum,
				ItemId:           itemID,
				Description:      fmt.Sprintf("PO line for %s", itemID),
				Quantity:         quantity,
				UnitPrice:        money(unitPrice),
				TotalPrice:       money(totalPrice),
				UnitOfMeasure:    uoms[idx%len(uoms)],
				ReceivedQuantity: receivedQty,
				AuditInfo:        createAuditInfo(),
			})
			idx++
		}
	}

	return lines
}

// generateSupplierScorecards creates 1 scorecard per vendor (up to 15)
func generateSupplierScorecards(store *MockDataStore) []*scm.ScmSupplierScorecard {
	count := len(store.VendorIDs)
	if count > 15 {
		count = 15
	}

	scorecards := make([]*scm.ScmSupplierScorecard, count)

	now := time.Now()
	periodStart := time.Date(now.Year(), now.Month()-3, 1, 0, 0, 0, 0, time.UTC)
	periodEnd := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, time.UTC).AddDate(0, 0, -1)

	for i := 0; i < count; i++ {
		vendorId := store.VendorIDs[i]

		// Scores between 3.0 and 5.0
		qualityScore := 3.0 + rand.Float64()*2.0
		deliveryScore := 3.0 + rand.Float64()*2.0
		priceScore := 3.0 + rand.Float64()*2.0
		serviceScore := 3.0 + rand.Float64()*2.0
		overallScore := (qualityScore + deliveryScore + priceScore + serviceScore) / 4.0

		scorecards[i] = &scm.ScmSupplierScorecard{
			ScorecardId: genID("ssc", i),
			VendorId:    vendorId,
			EvaluationPeriod: &erp.DateRange{
				StartDate: periodStart.Unix(),
				EndDate:   periodEnd.Unix(),
			},
			QualityScore:  qualityScore,
			DeliveryScore: deliveryScore,
			PriceScore:    priceScore,
			ServiceScore:  serviceScore,
			OverallScore:  overallScore,
			Notes:         fmt.Sprintf("Quarterly evaluation for vendor %s", vendorId),
			AuditInfo:     createAuditInfo(),
		}
	}

	return scorecards
}
