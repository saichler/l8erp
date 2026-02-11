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

// generateSalesDeliveryOrders creates delivery order records with embedded children
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
	pickStatuses := []sales.SalesPickStatus{
		sales.SalesPickStatus_PICK_STATUS_PENDING,
		sales.SalesPickStatus_PICK_STATUS_IN_PROGRESS,
		sales.SalesPickStatus_PICK_STATUS_IN_PROGRESS,
		sales.SalesPickStatus_PICK_STATUS_COMPLETED,
		sales.SalesPickStatus_PICK_STATUS_COMPLETED,
		sales.SalesPickStatus_PICK_STATUS_COMPLETED,
	}
	docTypes := []sales.SalesShipDocType{
		sales.SalesShipDocType_SHIP_DOC_TYPE_BOL,
		sales.SalesShipDocType_SHIP_DOC_TYPE_COMMERCIAL_INVOICE,
		sales.SalesShipDocType_SHIP_DOC_TYPE_PACKING_LIST,
		sales.SalesShipDocType_SHIP_DOC_TYPE_CERTIFICATE,
	}

	count := len(store.SalesOrderIDs)
	if count == 0 {
		count = 25
	}

	deliveries := make([]*sales.SalesDeliveryOrder, count)
	for i := 0; i < count; i++ {
		orderID := pickRef(store.SalesOrderIDs, i)
		customerID := pickRef(store.CustomerIDs, i)
		warehouseID := pickRef(store.SCMWarehouseIDs, i)
		carrierID := pickRef(store.SCMCarrierIDs, i)

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

		// Embed delivery lines (3 per delivery)
		lines := make([]*sales.SalesDeliveryLine, 3)
		for j := 0; j < 3; j++ {
			itemID := pickRef(store.ItemIDs, (i*3 + j))
			// Cross-ref order lines (30 orders * 3 lines = 90 total order lines)
			orderLineID := fmt.Sprintf("sol-%03d", (i*3+j)%90+1)
			lines[j] = &sales.SalesDeliveryLine{
				LineId:           fmt.Sprintf("sdl-%03d", i*3+j+1),
				LineNumber:       int32(j + 1),
				SalesOrderLineId: orderLineID,
				ItemId:           itemID,
				Description:      itemNames[(i*3+j)%len(itemNames)],
				Quantity:         float64(rand.Intn(10) + 1),
				UnitOfMeasure:    "EA",
				LotNumber:        fmt.Sprintf("LOT-%06d", rand.Intn(999999)),
				SerialNumber:     fmt.Sprintf("SN-%08d", rand.Intn(99999999)),
			}
		}

		// Embed pick release (1 per delivery)
		releaseDate := plannedShipDate.AddDate(0, 0, -1)
		pickStatus := pickStatuses[i%len(pickStatuses)]
		var pickDate int64
		if pickStatus == sales.SalesPickStatus_PICK_STATUS_COMPLETED {
			pickDate = releaseDate.AddDate(0, 0, 1).Unix()
		}
		pickReleases := []*sales.SalesPickRelease{{
			PickReleaseId: genID("spr", i),
			PickNumber:    fmt.Sprintf("PK-%04d", rand.Intn(9000)+1000),
			WarehouseId:   warehouseID,
			ReleaseDate:   releaseDate.Unix(),
			PickDate:      pickDate,
			Status:        pickStatus,
			AssignedTo:    pickRef(store.EmployeeIDs, i),
			PickZone:      fmt.Sprintf("Zone-%d", (i%4)+1),
			Priority:      int32((i % 3) + 1),
			Notes:         fmt.Sprintf("Pick release for delivery %d", i+1),
		}}

		// Embed packing slip (1 per delivery)
		packDate := plannedShipDate
		totalPkgs := int32(rand.Intn(5) + 1)
		packingSlips := []*sales.SalesPackingSlip{{
			PackingSlipId: genID("sps", i),
			SlipNumber:    fmt.Sprintf("PS-%06d", rand.Intn(999999)),
			PackDate:      packDate.Unix(),
			TotalPackages: totalPkgs,
			TotalWeight:   float64(rand.Intn(500)+10) * float64(totalPkgs),
			WeightUnit:    "lbs",
			Notes:         fmt.Sprintf("Packing slip for delivery %d", i+1),
		}}

		// Embed shipping doc (1 per delivery)
		shippingDocs := []*sales.SalesShippingDoc{{
			DocId:     genID("ssd", i),
			DocNumber: fmt.Sprintf("DOC-%06d", rand.Intn(999999)),
			DocType:   docTypes[i%len(docTypes)],
			IssueDate: plannedShipDate.Unix(),
			FilePath:  fmt.Sprintf("/docs/shipping/sdo-%03d/doc_%03d.pdf", i+1, i+1),
			Notes:     fmt.Sprintf("Shipping document for delivery %d", i+1),
		}}

		// Embed delivery confirm (~60% of deliveries)
		var confirms []*sales.SalesDeliveryConfirm
		if i < count*60/100 {
			isDamaged := rand.Intn(20) == 0
			damageDesc := ""
			if isDamaged {
				damageDesc = "Minor damage to packaging, contents intact"
			}
			confirms = []*sales.SalesDeliveryConfirm{{
				ConfirmId:         genID("sdc", i),
				ConfirmDate:       plannedDeliveryDate.Unix(),
				ReceivedBy:        fmt.Sprintf("Recipient %d", i+1),
				SignaturePath:     fmt.Sprintf("/signatures/delivery_sdo-%03d.png", i+1),
				Notes:             fmt.Sprintf("Delivery confirmed for order %d", i+1),
				IsDamaged:         isDamaged,
				DamageDescription: damageDesc,
			}}
		}

		deliveries[i] = &sales.SalesDeliveryOrder{
			DeliveryOrderId:     genID("sdo", i),
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
			ShippingCost:        money(store, int64(rand.Intn(50000)+5000)),
			Notes:               fmt.Sprintf("Delivery for order %d", i+1),
			AuditInfo:           createAuditInfo(),
			Lines:               lines,
			PickReleases:        pickReleases,
			PackingSlips:        packingSlips,
			ShippingDocs:        shippingDocs,
			Confirms:            confirms,
		}
	}
	return deliveries
}
