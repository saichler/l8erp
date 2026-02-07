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

	"github.com/saichler/l8erp/go/types/mfg"
)

// generateEngChangeOrders creates engineering change order records
func generateEngChangeOrders(store *MockDataStore) []*mfg.MfgEngChangeOrder {
	ecos := make([]*mfg.MfgEngChangeOrder, 10)
	for i := 0; i < 10; i++ {
		requestedBy := pickRef(store.EmployeeIDs, i)
		requestDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(30))
		requiredDate := requestDate.AddDate(0, 1, rand.Intn(30))

		// Status distribution: 30% Draft, 30% Submitted, 20% Approved, 20% Implemented
		var status mfg.MfgChangeOrderStatus
		if i < 3 {
			status = mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_DRAFT
		} else if i < 6 {
			status = mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_SUBMITTED
		} else if i < 8 {
			status = mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_APPROVED
		} else {
			status = mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_IMPLEMENTED
		}

		estCost := int64(rand.Intn(50000) + 5000)
		actCost := int64(0)
		if status == mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_IMPLEMENTED {
			actCost = int64(float64(estCost) * (0.9 + rand.Float64()*0.2))
		}

		ecos[i] = &mfg.MfgEngChangeOrder{
			ChangeOrderId: genID("eco", i),
			EcoNumber:     fmt.Sprintf("ECO-%05d", 20000+i+1),
			Title:         fmt.Sprintf("Engineering Change %d", i+1),
			Description:   fmt.Sprintf("Engineering change order for process improvement #%d", i+1),
			Status:        status,
			RequestedBy:   requestedBy,
			RequestDate:   requestDate.Unix(),
			RequiredDate:  requiredDate.Unix(),
			Priority:      int32(rand.Intn(5) + 1),
			Reason:        fmt.Sprintf("Improve quality and reduce costs for product line %d", i+1),
			EstimatedCost: money(store, estCost),
			ActualCost:    money(store, actCost),
			Notes:         fmt.Sprintf("ECO notes for change order %d", i+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return ecos
}

// generateEngChangeDetails creates engineering change detail records (2 per ECO)
func generateEngChangeDetails(store *MockDataStore) []*mfg.MfgEngChangeDetail {
	changeTypes := []mfg.MfgChangeType{
		mfg.MfgChangeType_MFG_CHANGE_TYPE_BOM,
		mfg.MfgChangeType_MFG_CHANGE_TYPE_ROUTING,
		mfg.MfgChangeType_MFG_CHANGE_TYPE_ITEM,
		mfg.MfgChangeType_MFG_CHANGE_TYPE_PROCESS,
	}

	details := make([]*mfg.MfgEngChangeDetail, 0, len(store.MfgEngChangeOrderIDs)*2)
	idx := 1
	for ecoIdx, ecoID := range store.MfgEngChangeOrderIDs {
		for j := 0; j < 2; j++ {
			// AffectedId can be a BOM, Routing, or Item ID depending on change type
			changeType := changeTypes[(ecoIdx*2+j)%len(changeTypes)]
			affectedID := ""
			switch changeType {
			case mfg.MfgChangeType_MFG_CHANGE_TYPE_BOM:
				if len(store.MfgBomIDs) > 0 {
					affectedID = store.MfgBomIDs[(ecoIdx+j)%len(store.MfgBomIDs)]
				}
			case mfg.MfgChangeType_MFG_CHANGE_TYPE_ROUTING:
				if len(store.MfgRoutingIDs) > 0 {
					affectedID = store.MfgRoutingIDs[(ecoIdx+j)%len(store.MfgRoutingIDs)]
				}
			default:
				if len(store.ItemIDs) > 0 {
					affectedID = store.ItemIDs[(ecoIdx*2+j)%len(store.ItemIDs)]
				}
			}

			details = append(details, &mfg.MfgEngChangeDetail{
				DetailId:      fmt.Sprintf("ecodtl-%03d", idx),
				ChangeOrderId: ecoID,
				ChangeType:    changeType,
				AffectedId:    affectedID,
				Description:   fmt.Sprintf("Change detail %d for ECO", idx),
				OldValue:      fmt.Sprintf("Old specification %d", idx),
				NewValue:      fmt.Sprintf("New specification %d", idx),
				OldRevision:   fmt.Sprintf("R%d", rand.Intn(3)+1),
				NewRevision:   fmt.Sprintf("R%d", rand.Intn(3)+2),
				Notes:         fmt.Sprintf("ECO detail notes %d", idx),
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return details
}

// generateWorkOrders creates work order records
func generateWorkOrders(store *MockDataStore) []*mfg.MfgWorkOrder {
	count := 20
	workOrders := make([]*mfg.MfgWorkOrder, count)

	for i := 0; i < count; i++ {
		itemID := pickRef(store.ItemIDs, i)
		bomID := pickRef(store.MfgBomIDs, i)
		routingID := pickRef(store.MfgRoutingIDs, i)
		wcID := pickRef(store.MfgWorkCenterIDs, i)
		warehouseID := pickRef(store.SCMWarehouseIDs, i)
		salesOrderID := ""
		if len(store.SalesOrderIDs) > 0 && i < 5 {
			salesOrderID = store.SalesOrderIDs[i%len(store.SalesOrderIDs)]
		}

		plannedStart := time.Now().AddDate(0, 0, -rand.Intn(30))
		plannedEnd := plannedStart.AddDate(0, 0, rand.Intn(14)+7)
		qtyOrdered := float64(rand.Intn(100) + 10)
		qtyCompleted := 0.0
		qtyScraped := 0.0

		// Status distribution: 20% Planned, 30% Released, 30% In Progress, 10% Completed, 10% Closed
		var status mfg.MfgWorkOrderStatus
		if i < 4 {
			status = mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_PLANNED
		} else if i < 10 {
			status = mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_RELEASED
		} else if i < 16 {
			status = mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_IN_PROGRESS
			qtyCompleted = qtyOrdered * float64(rand.Intn(50)+30) / 100.0
			qtyScraped = float64(rand.Intn(5))
		} else if i < 18 {
			status = mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_COMPLETED
			qtyCompleted = qtyOrdered - float64(rand.Intn(5))
			qtyScraped = float64(rand.Intn(3))
		} else {
			status = mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_CLOSED
			qtyCompleted = qtyOrdered - float64(rand.Intn(5))
			qtyScraped = float64(rand.Intn(3))
		}

		estCost := int64(rand.Intn(50000) + 10000)
		actCost := int64(0)
		if status >= mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_IN_PROGRESS {
			actCost = int64(float64(estCost) * (qtyCompleted / qtyOrdered) * (0.9 + rand.Float64()*0.2))
		}

		workOrders[i] = &mfg.MfgWorkOrder{
			WorkOrderId:       genID("wo", i),
			WorkOrderNumber:   fmt.Sprintf("WO-%06d", 100000+i+1),
			ItemId:            itemID,
			BomId:             bomID,
			RoutingId:         routingID,
			QuantityOrdered:   qtyOrdered,
			QuantityCompleted: qtyCompleted,
			QuantityScrapped:  qtyScraped,
			PlannedStartDate:  plannedStart.Unix(),
			PlannedEndDate:    plannedEnd.Unix(),
			Status:            status,
			WarehouseId:       warehouseID,
			WorkCenterId:      wcID,
			SalesOrderId:      salesOrderID,
			Priority:          int32(rand.Intn(5) + 1),
			EstimatedCost:     money(store, estCost),
			ActualCost:        money(store, actCost),
			Notes:             fmt.Sprintf("Work order for manufacturing batch %d", i+1),
			AuditInfo:         createAuditInfo(),
		}
		if status >= mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_IN_PROGRESS {
			workOrders[i].ActualStartDate = plannedStart.Unix()
		}
		if status >= mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_COMPLETED {
			workOrders[i].ActualEndDate = plannedEnd.Unix()
		}
	}
	return workOrders
}

// generateWorkOrderOps creates work order operation records (3 ops per work order)
func generateWorkOrderOps(store *MockDataStore) []*mfg.MfgWorkOrderOp {
	ops := make([]*mfg.MfgWorkOrderOp, 0, len(store.MfgWorkOrderIDs)*3)
	idx := 1
	for woIdx, woID := range store.MfgWorkOrderIDs {
		for j := 0; j < 3; j++ {
			wcID := pickRef(store.MfgWorkCenterIDs, (woIdx+j))
			rtngOpID := pickRef(store.MfgRoutingOpIDs, (woIdx*3+j))
			operatorID := pickRef(store.EmployeeIDs, (woIdx+j))
			opName := mfgOperationNames[(woIdx*3+j)%len(mfgOperationNames)]

			setupPlanned := float64(rand.Intn(30)+10) / 60.0
			runPlanned := float64(rand.Intn(60)+20) / 60.0

			// Status distribution based on operation number
			var status mfg.MfgOperationStatus
			if j == 0 {
				status = mfg.MfgOperationStatus_MFG_OPERATION_STATUS_COMPLETED
			} else if j == 1 {
				status = mfg.MfgOperationStatus_MFG_OPERATION_STATUS_IN_PROGRESS
			} else {
				status = mfg.MfgOperationStatus_MFG_OPERATION_STATUS_PENDING
			}

			ops = append(ops, &mfg.MfgWorkOrderOp{
				OperationId:        fmt.Sprintf("woop-%03d", idx),
				WorkOrderId:        woID,
				OperationNumber:    int32((j + 1) * 10),
				OperationName:      opName,
				WorkCenterId:       wcID,
				RoutingOperationId: rtngOpID,
				Status:             status,
				SetupTimePlanned:   setupPlanned,
				SetupTimeActual:    setupPlanned * (0.9 + rand.Float64()*0.2),
				RunTimePlanned:     runPlanned,
				RunTimeActual:      runPlanned * (0.9 + rand.Float64()*0.2),
				QuantityCompleted:  float64(rand.Intn(50) + 10),
				QuantityScrapped:   float64(rand.Intn(3)),
				ScheduledStart:     time.Now().AddDate(0, 0, -rand.Intn(10)).Unix(),
				ScheduledEnd:       time.Now().AddDate(0, 0, rand.Intn(10)).Unix(),
				OperatorId:         operatorID,
				Notes:              fmt.Sprintf("Operation %d: %s", j+1, opName),
				AuditInfo:          createAuditInfo(),
			})
			idx++
		}
	}
	return ops
}

// generateProductionOrders creates production order records
func generateProductionOrders(store *MockDataStore) []*mfg.MfgProductionOrder {
	count := 15
	orders := make([]*mfg.MfgProductionOrder, count)

	for i := 0; i < count; i++ {
		customerID := pickRef(store.CustomerIDs, i)
		salesOrderID := ""
		if len(store.SalesOrderIDs) > 0 && i < 5 {
			salesOrderID = store.SalesOrderIDs[i%len(store.SalesOrderIDs)]
		}
		plannerID := pickRef(store.EmployeeIDs, i)

		orderDate := time.Now().AddDate(0, 0, -rand.Intn(30))
		requiredDate := orderDate.AddDate(0, 0, rand.Intn(30)+14)

		// Status distribution: 30% Planned, 30% Confirmed, 20% In Progress, 20% Completed
		var status mfg.MfgProductionOrderStatus
		if i < count*3/10 {
			status = mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_PLANNED
		} else if i < count*6/10 {
			status = mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_CONFIRMED
		} else if i < count*8/10 {
			status = mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_IN_PROGRESS
		} else {
			status = mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_COMPLETED
		}

		estCost := int64(rand.Intn(100000) + 20000)
		actCost := int64(0)
		if status >= mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_IN_PROGRESS {
			actCost = int64(float64(estCost) * (0.9 + rand.Float64()*0.2))
		}

		orders[i] = &mfg.MfgProductionOrder{
			ProdOrderId:        genID("pord", i),
			OrderNumber:        fmt.Sprintf("PO-%06d", 200000+i+1),
			CustomerId:         customerID,
			SalesOrderId:       salesOrderID,
			OrderDate:          orderDate.Unix(),
			RequiredDate:       requiredDate.Unix(),
			Status:             status,
			Priority:           int32(rand.Intn(5) + 1),
			PlannerId:          plannerID,
			TotalEstimatedCost: money(store, estCost),
			TotalActualCost:    money(store, actCost),
			Notes:              fmt.Sprintf("Production order for batch manufacturing %d", i+1),
			AuditInfo:          createAuditInfo(),
		}
	}
	return orders
}

// generateProdOrderLines creates production order line records (2 lines per order)
func generateProdOrderLines(store *MockDataStore) []*mfg.MfgProdOrderLine {
	lines := make([]*mfg.MfgProdOrderLine, 0, len(store.MfgProductionOrderIDs)*2)
	idx := 1
	for ordIdx, ordID := range store.MfgProductionOrderIDs {
		for j := 0; j < 2; j++ {
			itemID := pickRef(store.ItemIDs, (ordIdx*2+j))
			warehouseID := pickRef(store.SCMWarehouseIDs, (ordIdx+j))
			woID := pickRef(store.MfgWorkOrderIDs, (ordIdx*2+j))

			qtyOrdered := float64(rand.Intn(100) + 10)
			qtyCompleted := qtyOrdered * float64(rand.Intn(80)) / 100.0
			requiredDate := time.Now().AddDate(0, 0, rand.Intn(30)+7)
			promisedDate := requiredDate.AddDate(0, 0, rand.Intn(5))

			lines = append(lines, &mfg.MfgProdOrderLine{
				LineId:            fmt.Sprintf("poln-%03d", idx),
				ProdOrderId:       ordID,
				LineNumber:        int32((j + 1) * 10),
				ItemId:            itemID,
				WorkOrderId:       woID,
				QuantityOrdered:   qtyOrdered,
				QuantityCompleted: qtyCompleted,
				RequiredDate:      requiredDate.Unix(),
				PromisedDate:      promisedDate.Unix(),
				WarehouseId:       warehouseID,
				Notes:             fmt.Sprintf("Production order line %d", idx),
				AuditInfo:         createAuditInfo(),
			})
			idx++
		}
	}
	return lines
}

// generateProdBatches creates production batch records
func generateProdBatches(store *MockDataStore) []*mfg.MfgProdBatch {
	count := 12
	batches := make([]*mfg.MfgProdBatch, count)

	qualityStatuses := []string{"PASSED", "PENDING", "FAILED", "HOLD"}

	for i := 0; i < count; i++ {
		woID := pickRef(store.MfgWorkOrderIDs, i)
		itemID := pickRef(store.ItemIDs, i)
		warehouseID := pickRef(store.SCMWarehouseIDs, i)

		productionDate := time.Now().AddDate(0, 0, -rand.Intn(60))
		expiryDate := productionDate.AddDate(1, 0, 0) // 1 year expiry

		batches[i] = &mfg.MfgProdBatch{
			BatchId:        genID("batch", i),
			BatchNumber:    fmt.Sprintf("BATCH-%06d", 300000+i+1),
			WorkOrderId:    woID,
			ItemId:         itemID,
			Quantity:       float64(rand.Intn(200) + 50),
			ProductionDate: productionDate.Unix(),
			ExpiryDate:     expiryDate.Unix(),
			LotNumber:      fmt.Sprintf("LOT-%06d", 400000+i+1),
			SerialNumber:   fmt.Sprintf("SN-%08d", 50000000+i+1),
			WarehouseId:    warehouseID,
			BinId:          fmt.Sprintf("bin-%03d", rand.Intn(20)+1),
			QualityStatus:  qualityStatuses[i%len(qualityStatuses)],
			Notes:          fmt.Sprintf("Production batch %d", i+1),
			AuditInfo:      createAuditInfo(),
		}
	}
	return batches
}
