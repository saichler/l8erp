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

// generateItems creates inventory item records from the itemNames array
func generateItems(store *MockDataStore) []*scm.Item {
	items := make([]*scm.Item, 25)
	itemTypes := []scm.ItemType{
		scm.ItemType_ITEM_TYPE_RAW_MATERIAL,
		scm.ItemType_ITEM_TYPE_FINISHED_GOOD,
		scm.ItemType_ITEM_TYPE_SEMI_FINISHED,
		scm.ItemType_ITEM_TYPE_MRO,
		scm.ItemType_ITEM_TYPE_SERVICE,
		scm.ItemType_ITEM_TYPE_CONSUMABLE,
	}
	valuationMethods := []scm.ValuationMethod{
		scm.ValuationMethod_VALUATION_METHOD_FIFO,
		scm.ValuationMethod_VALUATION_METHOD_LIFO,
		scm.ValuationMethod_VALUATION_METHOD_WEIGHTED_AVG,
		scm.ValuationMethod_VALUATION_METHOD_STANDARD,
	}
	planningMethods := []scm.PlanningMethod{
		scm.PlanningMethod_PLANNING_METHOD_MRP,
		scm.PlanningMethod_PLANNING_METHOD_REORDER_POINT,
		scm.PlanningMethod_PLANNING_METHOD_MIN_MAX,
		scm.PlanningMethod_PLANNING_METHOD_KANBAN,
	}
	uoms := []string{"EA", "KG", "LB", "M", "FT"}

	for i := 0; i < 25; i++ {
		unitCost := int64(rand.Intn(49500)+500) * 1   // 500-50000 cents
		markup := 1.3 + rand.Float64()*0.5             // 1.3 to 1.8
		unitPrice := int64(float64(unitCost) * markup)

		isLotTracked := i < 10
		isSerialTracked := i >= 5 && i < 15
		var shelfLife int32
		if isLotTracked {
			shelfLife = int32(rand.Intn(541) + 180) // 180-720 days
		}

		items[i] = &scm.Item{
			ItemId:             fmt.Sprintf("item-%03d", i+1),
			ItemNumber:         fmt.Sprintf("ITM-%05d", i+1),
			Name:               itemNames[i],
			Description:        fmt.Sprintf("Inventory item: %s", itemNames[i]),
			ItemType:           itemTypes[i%len(itemTypes)],
			CategoryId:         store.ItemCategoryIDs[i%len(store.ItemCategoryIDs)],
			UnitOfMeasure:      uoms[i%len(uoms)],
			UnitCost:           &erp.Money{Amount: unitCost, CurrencyCode: "USD"},
			UnitPrice:          &erp.Money{Amount: unitPrice, CurrencyCode: "USD"},
			ValuationMethod:    valuationMethods[i%len(valuationMethods)],
			PlanningMethod:     planningMethods[i%len(planningMethods)],
			IsLotTracked:       isLotTracked,
			IsSerialTracked:    isSerialTracked,
			ShelfLife:          shelfLife,
			DefaultWarehouseId: store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)],
			IsActive:           true,
			AuditInfo:          createAuditInfo(),
		}
	}
	return items
}

// generateStockMovements creates stock movement records for inventory transactions
func generateStockMovements(store *MockDataStore) []*scm.StockMovement {
	movements := make([]*scm.StockMovement, 40)
	now := time.Now()

	for i := 0; i < 40; i++ {
		// 50% RECEIPT, 30% ISSUE, remaining cycle through TRANSFER, ADJUSTMENT, RETURN, SCRAP
		var movementType scm.MovementType
		r := i % 10
		if r < 5 {
			movementType = scm.MovementType_MOVEMENT_TYPE_RECEIPT
		} else if r < 8 {
			movementType = scm.MovementType_MOVEMENT_TYPE_ISSUE
		} else {
			others := []scm.MovementType{
				scm.MovementType_MOVEMENT_TYPE_TRANSFER,
				scm.MovementType_MOVEMENT_TYPE_ADJUSTMENT,
				scm.MovementType_MOVEMENT_TYPE_RETURN,
				scm.MovementType_MOVEMENT_TYPE_SCRAP,
			}
			movementType = others[(i/10)%len(others)]
		}

		var referenceId, referenceType string
		if movementType == scm.MovementType_MOVEMENT_TYPE_RECEIPT && len(store.SCMPurchaseOrderIDs) > 0 {
			referenceId = store.SCMPurchaseOrderIDs[i%len(store.SCMPurchaseOrderIDs)]
			referenceType = "PO"
		} else {
			referenceId = fmt.Sprintf("ADJ-%03d", i+1)
			referenceType = "Adjustment"
		}

		movementDate := now.AddDate(0, 0, -rand.Intn(90))

		movements[i] = &scm.StockMovement{
			MovementId:    fmt.Sprintf("smov-%03d", i+1),
			ItemId:        store.ItemIDs[i%len(store.ItemIDs)],
			WarehouseId:   store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)],
			BinId:         store.BinIDs[i%len(store.BinIDs)],
			MovementType:  movementType,
			Quantity:      float64(rand.Intn(500) + 1),
			UnitOfMeasure: "EA",
			ReferenceId:   referenceId,
			ReferenceType: referenceType,
			MovementDate:  movementDate.Unix(),
			Cost:          &erp.Money{Amount: int64(rand.Intn(99000)+1000) * 1, CurrencyCode: "USD"},
			Notes:         fmt.Sprintf("Stock movement %d - %s", i+1, referenceType),
			AuditInfo:     createAuditInfo(),
		}
	}
	return movements
}

// generateLotNumbers creates lot number records for lot-tracked items
func generateLotNumbers(store *MockDataStore) []*scm.LotNumber {
	lots := make([]*scm.LotNumber, 20)
	now := time.Now()

	// Lot-tracked items are the first 10 items (indices 0-9)
	lotTrackedItemIDs := store.ItemIDs
	if len(lotTrackedItemIDs) > 10 {
		lotTrackedItemIDs = lotTrackedItemIDs[:10]
	}

	for i := 0; i < 20; i++ {
		manufactureDate := now.AddDate(0, 0, -rand.Intn(90))
		// Shelf life between 180-720 days
		shelfDays := rand.Intn(541) + 180
		expiryDate := manufactureDate.AddDate(0, 0, shelfDays)

		lots[i] = &scm.LotNumber{
			LotId:           fmt.Sprintf("lot-%03d", i+1),
			ItemId:          lotTrackedItemIDs[i%len(lotTrackedItemIDs)],
			LotNumber:       fmt.Sprintf("LOT-%06d", i+1),
			WarehouseId:     store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)],
			ManufactureDate: manufactureDate.Unix(),
			ExpiryDate:      expiryDate.Unix(),
			Quantity:        float64(rand.Intn(451) + 50),
			Status:          "Active",
			Notes:           fmt.Sprintf("Lot %d for %s", i+1, lotTrackedItemIDs[i%len(lotTrackedItemIDs)]),
			AuditInfo:       createAuditInfo(),
		}
	}
	return lots
}

// generateSerialNumbers creates serial number records for serial-tracked items
func generateSerialNumbers(store *MockDataStore) []*scm.SerialNumber {
	serials := make([]*scm.SerialNumber, 25)

	// Serial-tracked items are items 5-14 (indices 5-14)
	serialTrackedItemIDs := store.ItemIDs
	if len(serialTrackedItemIDs) > 15 {
		serialTrackedItemIDs = serialTrackedItemIDs[5:15]
	} else if len(serialTrackedItemIDs) > 5 {
		serialTrackedItemIDs = serialTrackedItemIDs[5:]
	}

	statuses := []string{"Available", "In Use"}

	for i := 0; i < 25; i++ {
		serials[i] = &scm.SerialNumber{
			SerialId:     fmt.Sprintf("ser-%03d", i+1),
			ItemId:       serialTrackedItemIDs[i%len(serialTrackedItemIDs)],
			SerialNumber: fmt.Sprintf("SN-%08d", i+1),
			WarehouseId:  store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)],
			BinId:        store.BinIDs[i%len(store.BinIDs)],
			Status:       statuses[i%len(statuses)],
			Notes:        fmt.Sprintf("Serial unit %d", i+1),
			AuditInfo:    createAuditInfo(),
		}
	}
	return serials
}

// generateCycleCounts creates cycle count records for warehouse inventory audits
func generateCycleCounts(store *MockDataStore) []*scm.CycleCount {
	counts := make([]*scm.CycleCount, 10)
	taskStatuses := []scm.TaskStatus{
		scm.TaskStatus_TASK_STATUS_COMPLETED,
		scm.TaskStatus_TASK_STATUS_IN_PROGRESS,
		scm.TaskStatus_TASK_STATUS_PENDING,
	}
	now := time.Now()

	for i := 0; i < 10; i++ {
		countDate := now.AddDate(0, 0, -rand.Intn(30))

		counts[i] = &scm.CycleCount{
			CycleCountId:  fmt.Sprintf("cc-%03d", i+1),
			WarehouseId:   store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)],
			CountDate:     countDate.Unix(),
			Status:        taskStatuses[i%len(taskStatuses)],
			CounterId:     store.EmployeeIDs[i%len(store.EmployeeIDs)],
			ItemsCounted:  int32(rand.Intn(50) + 10),
			Discrepancies: int32(rand.Intn(5)),
			Notes:         fmt.Sprintf("Cycle count %d for warehouse inventory audit", i+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return counts
}

// generateReorderPoints creates reorder point records for each item
func generateReorderPoints(store *MockDataStore) []*scm.ReorderPoint {
	points := make([]*scm.ReorderPoint, 25)

	for i := 0; i < 25; i++ {
		minQty := float64(rand.Intn(91) + 10)    // 10-100
		maxQty := float64(rand.Intn(801) + 200)   // 200-1000
		reorderQty := float64(rand.Intn(401) + 100) // 100-500

		points[i] = &scm.ReorderPoint{
			ReorderPointId:  fmt.Sprintf("rop-%03d", i+1),
			ItemId:          store.ItemIDs[i%len(store.ItemIDs)],
			WarehouseId:     store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)],
			MinimumQuantity: minQty,
			MaximumQuantity: maxQty,
			ReorderQuantity: reorderQty,
			LeadTimeDays:    int32(rand.Intn(39) + 7), // 7-45
			IsActive:        true,
			AuditInfo:       createAuditInfo(),
		}
	}
	return points
}

// generateInventoryValuations creates inventory valuation records for each item
func generateInventoryValuations(store *MockDataStore) []*scm.InventoryValuation {
	valuations := make([]*scm.InventoryValuation, 25)
	valuationMethods := []scm.ValuationMethod{
		scm.ValuationMethod_VALUATION_METHOD_FIFO,
		scm.ValuationMethod_VALUATION_METHOD_LIFO,
		scm.ValuationMethod_VALUATION_METHOD_WEIGHTED_AVG,
		scm.ValuationMethod_VALUATION_METHOD_STANDARD,
	}
	now := time.Now()

	for i := 0; i < 25; i++ {
		qtyOnHand := float64(rand.Intn(451) + 50)        // 50-500
		unitCost := int64(rand.Intn(49500)+500) * 1       // 500-50000 cents
		totalValue := int64(qtyOnHand) * unitCost
		valuationDate := now.AddDate(0, 0, -rand.Intn(30))

		valuations[i] = &scm.InventoryValuation{
			ValuationId:     fmt.Sprintf("ival-%03d", i+1),
			ItemId:          store.ItemIDs[i%len(store.ItemIDs)],
			WarehouseId:     store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)],
			QuantityOnHand:  qtyOnHand,
			UnitCost:        &erp.Money{Amount: unitCost, CurrencyCode: "USD"},
			TotalValue:      &erp.Money{Amount: totalValue, CurrencyCode: "USD"},
			ValuationMethod: valuationMethods[i%len(valuationMethods)],
			ValuationDate:   valuationDate.Unix(),
			AuditInfo:       createAuditInfo(),
		}
	}
	return valuations
}
