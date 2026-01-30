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

// generateShipments creates 20 shipment records for logistics tracking
func generateShipments(store *MockDataStore) []*scm.Shipment {
	shipments := make([]*scm.Shipment, 20)

	statuses := []scm.ShipmentStatus{
		scm.ShipmentStatus_SHIPMENT_STATUS_PLANNED,
		scm.ShipmentStatus_SHIPMENT_STATUS_PICKED_UP,
		scm.ShipmentStatus_SHIPMENT_STATUS_IN_TRANSIT,
		scm.ShipmentStatus_SHIPMENT_STATUS_DELIVERED,
	}

	for i := 0; i < 20; i++ {
		// 50% delivered
		var status scm.ShipmentStatus
		if i < 10 {
			status = scm.ShipmentStatus_SHIPMENT_STATUS_DELIVERED
		} else {
			status = statuses[i%len(statuses)]
		}

		carrierID := store.SCMCarrierIDs[i%len(store.SCMCarrierIDs)]
		warehouseID := store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)]
		customerID := store.CustomerIDs[i%len(store.CustomerIDs)]

		shipDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 0, 0, 0, 0, time.UTC)
		expectedDelivery := shipDate.AddDate(0, 0, rand.Intn(10)+3)

		var actualDelivery int64
		if status == scm.ShipmentStatus_SHIPMENT_STATUS_DELIVERED {
			actualDelivery = expectedDelivery.AddDate(0, 0, rand.Intn(3)-1).Unix()
		}

		totalWeight := float64(rand.Intn(9901)+100)   // 100-10000 lbs
		freightCost := int64(rand.Intn(95001) + 5000)  // 5000-100000 cents

		shipments[i] = &scm.Shipment{
			ShipmentId:         fmt.Sprintf("shp-%03d", i+1),
			ShipmentNumber:     fmt.Sprintf("SHP-%06d", i+1),
			CarrierId:          carrierID,
			OriginWarehouseId:  warehouseID,
			DestinationAddress: createAddress(),
			CustomerId:         customerID,
			ShipDate:           shipDate.Unix(),
			ExpectedDelivery:   expectedDelivery.Unix(),
			ActualDelivery:     actualDelivery,
			Status:             status,
			TrackingNumber:     fmt.Sprintf("SHIP-%010d", i+1),
			TotalWeight:        totalWeight,
			FreightCost:        &erp.Money{Amount: freightCost, CurrencyCode: "USD"},
			Notes:              fmt.Sprintf("Shipment %d for customer %s", i+1, customerID),
			AuditInfo:          createAuditInfo(),
		}
	}

	return shipments
}

// generateRoutes creates 10 logistics route records
func generateRoutes(store *MockDataStore) []*scm.Route {
	routes := make([]*scm.Route, len(routeNames))

	for i, name := range routeNames {
		originIdx := i % len(store.SCMWarehouseIDs)
		destIdx := (i + 1) % len(store.SCMWarehouseIDs)
		carrierID := store.SCMCarrierIDs[i%len(store.SCMCarrierIDs)]

		routes[i] = &scm.Route{
			RouteId:       fmt.Sprintf("rte-%03d", i+1),
			Name:          name,
			Description:   fmt.Sprintf("Logistics route: %s", name),
			Origin:        store.SCMWarehouseIDs[originIdx],
			Destination:   store.SCMWarehouseIDs[destIdx],
			Distance:      float64(rand.Intn(2501) + 100), // 100-2600 miles
			EstimatedTime: int32(rand.Intn(72) + 8),       // 8-80 hours
			CarrierId:     carrierID,
			IsActive:      true,
			Notes:         fmt.Sprintf("Route from warehouse %d to warehouse %d", originIdx+1, destIdx+1),
			AuditInfo:     createAuditInfo(),
		}
	}

	return routes
}

// generateLoadPlans creates 15 load plan records linked to shipments
func generateLoadPlans(store *MockDataStore) []*scm.LoadPlan {
	plans := make([]*scm.LoadPlan, 15)

	loadStatuses := []scm.TaskStatus{
		scm.TaskStatus_TASK_STATUS_PENDING,
		scm.TaskStatus_TASK_STATUS_IN_PROGRESS,
		scm.TaskStatus_TASK_STATUS_COMPLETED,
	}

	for i := 0; i < 15; i++ {
		shipmentID := store.ShipmentIDs[i%len(store.ShipmentIDs)]
		maxWeight := float64(rand.Intn(40001) + 40000) // 40000-80000
		// CurrentWeight: 50-95% of max -> use TotalWeight field
		pct := 0.50 + rand.Float64()*0.45
		currentWeight := maxWeight * pct
		plannedDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 0, 0, 0, 0, time.UTC)

		plans[i] = &scm.LoadPlan{
			LoadPlanId:  fmt.Sprintf("lp-%03d", i+1),
			ShipmentId:  shipmentID,
			VehicleId:   fmt.Sprintf("veh-%03d", i+1),
			TotalWeight: currentWeight,
			TotalVolume: float64(rand.Intn(2001) + 500),
			MaxWeight:   maxWeight,
			MaxVolume:   float64(rand.Intn(3001) + 1000),
			Status:      loadStatuses[i%len(loadStatuses)],
			PlannedDate: plannedDate.Unix(),
			Notes:       fmt.Sprintf("Load plan %d for shipment %s", i+1, shipmentID),
			AuditInfo:   createAuditInfo(),
		}
	}

	return plans
}

// generateDeliveryProofs creates 10 delivery proof records for delivered shipments
func generateDeliveryProofs(store *MockDataStore) []*scm.DeliveryProof {
	proofs := make([]*scm.DeliveryProof, 10)

	for i := 0; i < 10; i++ {
		// Link to delivered shipments (first 10 shipments are delivered)
		shipmentIdx := i % len(store.ShipmentIDs)
		shipmentID := store.ShipmentIDs[shipmentIdx]
		deliveryDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 14, 30, 0, 0, time.UTC)

		proofs[i] = &scm.DeliveryProof{
			ProofId:      fmt.Sprintf("dprf-%03d", i+1),
			ShipmentId:   shipmentID,
			DeliveryDate: deliveryDate.Unix(),
			ReceivedBy:   randomName(),
			Signature:    fmt.Sprintf("sig-%s-%03d", shipmentID, i+1),
			PhotoUrl:     fmt.Sprintf("https://storage.example.com/proofs/%s.jpg", shipmentID),
			Notes:        fmt.Sprintf("Delivery confirmed for shipment %s", shipmentID),
			Status:       "Confirmed",
			AuditInfo:    createAuditInfo(),
		}
	}

	return proofs
}

// generateFreightAudits creates 12 freight audit records
func generateFreightAudits(store *MockDataStore) []*scm.FreightAudit {
	audits := make([]*scm.FreightAudit, 12)

	auditStatuses := []string{"Pending", "In Review", "Completed", "Disputed"}

	for i := 0; i < 12; i++ {
		shipmentID := store.ShipmentIDs[i%len(store.ShipmentIDs)]
		carrierID := store.SCMCarrierIDs[i%len(store.SCMCarrierIDs)]
		auditDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 0, 0, 0, 0, time.UTC)

		invoicedAmount := int64(rand.Intn(95001) + 5000) // 5000-100000 cents
		// ActualAmount: invoiced +/- 10%
		variancePct := 0.90 + rand.Float64()*0.20 // 0.90 to 1.10
		actualAmount := int64(float64(invoicedAmount) * variancePct)
		varianceAmount := actualAmount - invoicedAmount

		audits[i] = &scm.FreightAudit{
			AuditId:        fmt.Sprintf("faud-%03d", i+1),
			ShipmentId:     shipmentID,
			CarrierId:      carrierID,
			InvoicedAmount: &erp.Money{Amount: invoicedAmount, CurrencyCode: "USD"},
			ActualAmount:   &erp.Money{Amount: actualAmount, CurrencyCode: "USD"},
			Variance:       &erp.Money{Amount: varianceAmount, CurrencyCode: "USD"},
			AuditDate:      auditDate.Unix(),
			Status:         auditStatuses[i%len(auditStatuses)],
			Notes:          fmt.Sprintf("Freight audit for shipment %s", shipmentID),
			AuditInfo:      createAuditInfo(),
		}
	}

	return audits
}

// generateReturnAuthorizations creates 8 return merchandise authorization records
func generateReturnAuthorizations(store *MockDataStore) []*scm.ReturnAuthorization {
	returns := make([]*scm.ReturnAuthorization, 8)

	reasons := []string{
		"Defective", "Wrong Item", "Damaged in Transit", "Quality Issue",
	}

	returnStatuses := []scm.RequisitionStatus{
		scm.RequisitionStatus_REQUISITION_STATUS_DRAFT,
		scm.RequisitionStatus_REQUISITION_STATUS_SUBMITTED,
		scm.RequisitionStatus_REQUISITION_STATUS_APPROVED,
		scm.RequisitionStatus_REQUISITION_STATUS_FULFILLED,
	}

	for i := 0; i < 8; i++ {
		customerID := store.CustomerIDs[i%len(store.CustomerIDs)]
		shipmentID := store.ShipmentIDs[i%len(store.ShipmentIDs)]
		returnDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 0, 0, 0, 0, time.UTC)
		refundAmount := int64(rand.Intn(50001) + 1000) // 1000-51000 cents

		itemDesc := "General item"
		if len(store.ItemIDs) > 0 {
			itemDesc = fmt.Sprintf("Item %s", store.ItemIDs[i%len(store.ItemIDs)])
		}

		returns[i] = &scm.ReturnAuthorization{
			RmaId:              fmt.Sprintf("rma-%03d", i+1),
			RmaNumber:          fmt.Sprintf("RMA-%06d", i+1),
			CustomerId:         customerID,
			OriginalShipmentId: shipmentID,
			Reason:             reasons[i%len(reasons)],
			Status:             returnStatuses[i%len(returnStatuses)],
			ReturnDate:         returnDate.Unix(),
			ItemsDescription:   itemDesc,
			RefundAmount:       &erp.Money{Amount: refundAmount, CurrencyCode: "USD"},
			Notes:              fmt.Sprintf("RMA for customer %s - %s", customerID, reasons[i%len(reasons)]),
			AuditInfo:          createAuditInfo(),
		}
	}

	return returns
}
