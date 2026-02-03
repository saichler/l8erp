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

// generateSalesDeliveryOrders creates delivery order records
func generateSalesDeliveryOrders(store *MockDataStore) []*sales.SalesDeliveryOrder {
	statuses := []sales.SalesDeliveryStatus{
		sales.SalesDeliveryStatus_DELIVERY_STATUS_PLANNED,
		sales.SalesDeliveryStatus_DELIVERY_STATUS_PICKING,
		sales.SalesDeliveryStatus_DELIVERY_STATUS_PACKED,
		sales.SalesDeliveryStatus_DELIVERY_STATUS_SHIPPED,
		sales.SalesDeliveryStatus_DELIVERY_STATUS_SHIPPED,
		sales.SalesDeliveryStatus_DELIVERY_STATUS_DELIVERED,
		sales.SalesDeliveryStatus_DELIVERY_STATUS_DELIVERED,
	}

	count := len(store.SalesOrderIDs)
	if count == 0 {
		count = 25
	}

	deliveries := make([]*sales.SalesDeliveryOrder, count)
	for i := 0; i < count; i++ {
		orderID := ""
		if len(store.SalesOrderIDs) > 0 {
			orderID = store.SalesOrderIDs[i%len(store.SalesOrderIDs)]
		}

		customerID := ""
		if len(store.CustomerIDs) > 0 {
			customerID = store.CustomerIDs[i%len(store.CustomerIDs)]
		}

		warehouseID := ""
		if len(store.SCMWarehouseIDs) > 0 {
			warehouseID = store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)]
		}

		carrierID := ""
		if len(store.SCMCarrierIDs) > 0 {
			carrierID = store.SCMCarrierIDs[i%len(store.SCMCarrierIDs)]
		}

		plannedShipDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		plannedDeliveryDate := plannedShipDate.AddDate(0, 0, rand.Intn(7)+2)

		status := statuses[i%len(statuses)]
		var actualShipDate, actualDeliveryDate int64
		if status >= sales.SalesDeliveryStatus_DELIVERY_STATUS_SHIPPED {
			actualShipDate = plannedShipDate.Unix()
		}
		if status == sales.SalesDeliveryStatus_DELIVERY_STATUS_DELIVERED {
			actualDeliveryDate = plannedDeliveryDate.Unix()
		}

		deliveries[i] = &sales.SalesDeliveryOrder{
			DeliveryOrderId:     fmt.Sprintf("sdo-%03d", i+1),
			DeliveryNumber:      fmt.Sprintf("DO-%04d", rand.Intn(9000)+1000),
			SalesOrderId:        orderID,
			CustomerId:          customerID,
			PlannedShipDate:     plannedShipDate.Unix(),
			ActualShipDate:      actualShipDate,
			PlannedDeliveryDate: plannedDeliveryDate.Unix(),
			ActualDeliveryDate:  actualDeliveryDate,
			Status:              status,
			WarehouseId:         warehouseID,
			ShipToAddress:       createAddress(),
			CarrierId:           carrierID,
			TrackingNumber:      fmt.Sprintf("1Z%s%08d", "9999", rand.Intn(99999999)),
			ShippingMethod:      shippingMethodNames[i%len(shippingMethodNames)],
			ShippingCost: &erp.Money{
				Amount:       int64(rand.Intn(50000) + 5000),
				CurrencyCode: "USD",
			},
			Notes:     fmt.Sprintf("Delivery for order %d", i+1),
			AuditInfo: createAuditInfo(),
		}
	}
	return deliveries
}

// generateSalesDeliveryLines creates delivery line records (3 per delivery)
func generateSalesDeliveryLines(store *MockDataStore) []*sales.SalesDeliveryLine {
	count := len(store.SalesDeliveryOrderIDs) * 3
	if count == 0 {
		count = 75
	}

	lines := make([]*sales.SalesDeliveryLine, 0, count)
	idx := 1
	for dIdx, deliveryID := range store.SalesDeliveryOrderIDs {
		for j := 0; j < 3; j++ {
			itemID := ""
			description := fmt.Sprintf("Delivery line item %d", idx)
			if len(store.ItemIDs) > 0 {
				itemID = store.ItemIDs[(dIdx*3+j)%len(store.ItemIDs)]
				description = itemNames[(dIdx*3+j)%len(itemNames)]
			}

			orderLineID := ""
			if len(store.SalesOrderLineIDs) > 0 {
				orderLineID = store.SalesOrderLineIDs[(dIdx*3+j)%len(store.SalesOrderLineIDs)]
			}

			lines = append(lines, &sales.SalesDeliveryLine{
				LineId:           fmt.Sprintf("sdl-%03d", idx),
				DeliveryOrderId:  deliveryID,
				LineNumber:       int32(j + 1),
				SalesOrderLineId: orderLineID,
				ItemId:           itemID,
				Description:      description,
				Quantity:         float64(rand.Intn(10) + 1),
				UnitOfMeasure:    "EA",
				LotNumber:        fmt.Sprintf("LOT-%06d", rand.Intn(999999)),
				SerialNumber:     fmt.Sprintf("SN-%08d", rand.Intn(99999999)),
				AuditInfo:        createAuditInfo(),
			})
			idx++
		}
	}
	return lines
}

// generateSalesPickReleases creates pick release records
func generateSalesPickReleases(store *MockDataStore) []*sales.SalesPickRelease {
	statuses := []sales.SalesPickStatus{
		sales.SalesPickStatus_PICK_STATUS_PENDING,
		sales.SalesPickStatus_PICK_STATUS_IN_PROGRESS,
		sales.SalesPickStatus_PICK_STATUS_IN_PROGRESS,
		sales.SalesPickStatus_PICK_STATUS_COMPLETED,
		sales.SalesPickStatus_PICK_STATUS_COMPLETED,
		sales.SalesPickStatus_PICK_STATUS_COMPLETED,
	}

	count := len(store.SalesDeliveryOrderIDs)
	if count == 0 {
		count = 20
	}

	pickReleases := make([]*sales.SalesPickRelease, count)
	for i := 0; i < count; i++ {
		deliveryID := ""
		if len(store.SalesDeliveryOrderIDs) > 0 {
			deliveryID = store.SalesDeliveryOrderIDs[i%len(store.SalesDeliveryOrderIDs)]
		}

		warehouseID := ""
		if len(store.SCMWarehouseIDs) > 0 {
			warehouseID = store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)]
		}

		assignedTo := ""
		if len(store.EmployeeIDs) > 0 {
			assignedTo = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		releaseDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		status := statuses[i%len(statuses)]
		var pickDate int64
		if status == sales.SalesPickStatus_PICK_STATUS_COMPLETED {
			pickDate = releaseDate.AddDate(0, 0, 1).Unix()
		}

		pickReleases[i] = &sales.SalesPickRelease{
			PickReleaseId:   fmt.Sprintf("spr-%03d", i+1),
			PickNumber:      fmt.Sprintf("PK-%04d", rand.Intn(9000)+1000),
			DeliveryOrderId: deliveryID,
			WarehouseId:     warehouseID,
			ReleaseDate:     releaseDate.Unix(),
			PickDate:        pickDate,
			Status:          status,
			AssignedTo:      assignedTo,
			PickZone:        fmt.Sprintf("Zone-%d", (i%4)+1),
			Priority:        int32((i % 3) + 1),
			Notes:           fmt.Sprintf("Pick release for delivery %d", i+1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return pickReleases
}

// generateSalesShippingDocs creates shipping document records
func generateSalesShippingDocs(store *MockDataStore) []*sales.SalesShippingDoc {
	docTypes := []sales.SalesShipDocType{
		sales.SalesShipDocType_SHIP_DOC_TYPE_BOL,
		sales.SalesShipDocType_SHIP_DOC_TYPE_COMMERCIAL_INVOICE,
		sales.SalesShipDocType_SHIP_DOC_TYPE_PACKING_LIST,
		sales.SalesShipDocType_SHIP_DOC_TYPE_CERTIFICATE,
	}

	count := len(store.SalesDeliveryOrderIDs)
	if count == 0 {
		count = 20
	}

	docs := make([]*sales.SalesShippingDoc, count)
	for i := 0; i < count; i++ {
		deliveryID := ""
		if len(store.SalesDeliveryOrderIDs) > 0 {
			deliveryID = store.SalesDeliveryOrderIDs[i%len(store.SalesDeliveryOrderIDs)]
		}

		issueDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))

		docs[i] = &sales.SalesShippingDoc{
			DocId:           fmt.Sprintf("ssd-%03d", i+1),
			DeliveryOrderId: deliveryID,
			DocType:         docTypes[i%len(docTypes)],
			DocNumber:       fmt.Sprintf("DOC-%06d", rand.Intn(999999)),
			IssueDate:       issueDate.Unix(),
			FilePath:        fmt.Sprintf("/docs/shipping/%s/doc_%03d.pdf", deliveryID, i+1),
			Notes:           fmt.Sprintf("Shipping document for delivery %d", i+1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return docs
}

// generateSalesPackingSlips creates packing slip records
func generateSalesPackingSlips(store *MockDataStore) []*sales.SalesPackingSlip {
	count := len(store.SalesDeliveryOrderIDs)
	if count == 0 {
		count = 20
	}

	slips := make([]*sales.SalesPackingSlip, count)
	for i := 0; i < count; i++ {
		deliveryID := ""
		if len(store.SalesDeliveryOrderIDs) > 0 {
			deliveryID = store.SalesDeliveryOrderIDs[i%len(store.SalesDeliveryOrderIDs)]
		}

		packDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		totalPackages := int32(rand.Intn(5) + 1)
		totalWeight := float64(rand.Intn(500)+10) * float64(totalPackages)

		slips[i] = &sales.SalesPackingSlip{
			PackingSlipId:   fmt.Sprintf("sps-%03d", i+1),
			SlipNumber:      fmt.Sprintf("PS-%06d", rand.Intn(999999)),
			DeliveryOrderId: deliveryID,
			PackDate:        packDate.Unix(),
			TotalPackages:   totalPackages,
			TotalWeight:     totalWeight,
			WeightUnit:      "lbs",
			Notes:           fmt.Sprintf("Packing slip for delivery %d", i+1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return slips
}
