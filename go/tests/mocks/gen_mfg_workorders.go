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

Generates: MfgWorkOrder (with embedded Operations, LaborEntries, MachineEntries,
Consumptions, Batches, ActualCosts, CostVariances)
*/
package mocks

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/mfg"
)

// generateWorkOrders creates work order records with all embedded children
func generateWorkOrders(store *MockDataStore) []*mfg.MfgWorkOrder {
	count := 20
	workOrders := make([]*mfg.MfgWorkOrder, count)
	opIdx, laborIdx, machIdx, consIdx, batchIdx, actCostIdx, varIdx := 1, 1, 1, 1, 1, 1, 1

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

		// Status distribution
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

		woID := genID("wo", i)
		ops, newOpIdx := generateWOOps(store, woID, i, opIdx)
		opIdx = newOpIdx
		labor, newLaborIdx := generateWOLabor(store, woID, i, laborIdx)
		laborIdx = newLaborIdx
		machine, newMachIdx := generateWOMachine(store, woID, i, machIdx)
		machIdx = newMachIdx
		consumptions, newConsIdx := generateWOConsumptions(store, woID, i, consIdx)
		consIdx = newConsIdx
		batches, newBatchIdx := generateWOBatches(store, woID, itemID, i, batchIdx)
		batchIdx = newBatchIdx
		actCosts, newActIdx := generateWOActualCosts(store, woID, i, actCostIdx)
		actCostIdx = newActIdx
		variances, newVarIdx := generateWOCostVariances(store, woID, i, varIdx)
		varIdx = newVarIdx

		workOrders[i] = &mfg.MfgWorkOrder{
			WorkOrderId:       woID,
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
			Operations:        ops,
			LaborEntries:      labor,
			MachineEntries:    machine,
			Consumptions:      consumptions,
			Batches:           batches,
			ActualCosts:       actCosts,
			CostVariances:     variances,
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

// generateWOOps creates 3 embedded work order operations
func generateWOOps(store *MockDataStore, woID string, woIdx, startIdx int) ([]*mfg.MfgWorkOrderOp, int) {
	ops := make([]*mfg.MfgWorkOrderOp, 3)
	idx := startIdx
	for j := 0; j < 3; j++ {
		wcID := pickRef(store.MfgWorkCenterIDs, (woIdx + j))
		operatorID := pickRef(store.EmployeeIDs, (woIdx + j))
		opName := mfgOperationNames[(woIdx*3+j)%len(mfgOperationNames)]

		setupPlanned := float64(rand.Intn(30)+10) / 60.0
		runPlanned := float64(rand.Intn(60)+20) / 60.0

		var status mfg.MfgOperationStatus
		if j == 0 {
			status = mfg.MfgOperationStatus_MFG_OPERATION_STATUS_COMPLETED
		} else if j == 1 {
			status = mfg.MfgOperationStatus_MFG_OPERATION_STATUS_IN_PROGRESS
		} else {
			status = mfg.MfgOperationStatus_MFG_OPERATION_STATUS_PENDING
		}

		ops[j] = &mfg.MfgWorkOrderOp{
			OperationId:     fmt.Sprintf("woop-%03d", idx),
			WorkOrderId:     woID,
			OperationNumber: int32((j + 1) * 10),
			OperationName:   opName,
			WorkCenterId:    wcID,
			Status:          status,
			SetupTimePlanned: setupPlanned,
			SetupTimeActual:  setupPlanned * (0.9 + rand.Float64()*0.2),
			RunTimePlanned:   runPlanned,
			RunTimeActual:    runPlanned * (0.9 + rand.Float64()*0.2),
			QuantityCompleted: float64(rand.Intn(50) + 10),
			QuantityScrapped:  float64(rand.Intn(3)),
			ScheduledStart:    time.Now().AddDate(0, 0, -rand.Intn(10)).Unix(),
			ScheduledEnd:      time.Now().AddDate(0, 0, rand.Intn(10)).Unix(),
			OperatorId:        operatorID,
			Notes:             fmt.Sprintf("Operation %d: %s", j+1, opName),
			AuditInfo:         createAuditInfo(),
		}
		idx++
	}
	return ops, idx
}

// generateWOLabor creates 2 embedded labor entries
func generateWOLabor(store *MockDataStore, woID string, woIdx, startIdx int) ([]*mfg.MfgLaborEntry, int) {
	laborTypes := []string{"DIRECT", "INDIRECT", "SETUP"}
	entries := make([]*mfg.MfgLaborEntry, 2)
	idx := startIdx
	for j := 0; j < 2; j++ {
		empID := pickRef(store.EmployeeIDs, (woIdx*2 + j))
		wcID := pickRef(store.MfgWorkCenterIDs, (woIdx + j))
		startTime := time.Now().AddDate(0, 0, -rand.Intn(14)).Add(time.Duration(rand.Intn(8)+6) * time.Hour)
		hoursWorked := float64(rand.Intn(4)+4) + rand.Float64()
		endTime := startTime.Add(time.Duration(hoursWorked*60) * time.Minute)
		hourlyRate := float64(rand.Intn(30)+20) + rand.Float64()
		laborCost := int64(hoursWorked * hourlyRate * 100)

		entries[j] = &mfg.MfgLaborEntry{
			EntryId:           fmt.Sprintf("labor-%03d", idx),
			WorkOrderId:       woID,
			EmployeeId:        empID,
			WorkCenterId:      wcID,
			StartTime:         startTime.Unix(),
			EndTime:           endTime.Unix(),
			HoursWorked:       hoursWorked,
			QuantityCompleted: float64(rand.Intn(50) + 10),
			QuantityScrapped:  float64(rand.Intn(3)),
			LaborType:         laborTypes[(woIdx*2+j)%len(laborTypes)],
			HourlyRate:        hourlyRate,
			LaborCost:         money(store, laborCost),
			Notes:             fmt.Sprintf("Labor entry for work order operation %d", idx),
			AuditInfo:         createAuditInfo(),
		}
		idx++
	}
	return entries, idx
}

// generateWOMachine creates 2 embedded machine entries
func generateWOMachine(store *MockDataStore, woID string, woIdx, startIdx int) ([]*mfg.MfgMachineEntry, int) {
	machineStatuses := []string{"RUNNING", "IDLE", "SETUP"}
	entries := make([]*mfg.MfgMachineEntry, 2)
	idx := startIdx
	for j := 0; j < 2; j++ {
		wcID := pickRef(store.MfgWorkCenterIDs, (woIdx + j))
		operatorID := pickRef(store.EmployeeIDs, (woIdx*2 + j))
		startTime := time.Now().AddDate(0, 0, -rand.Intn(14)).Add(time.Duration(rand.Intn(8)+6) * time.Hour)
		machineHours := float64(rand.Intn(6)+2) + rand.Float64()
		endTime := startTime.Add(time.Duration(machineHours*60) * time.Minute)
		hourlyRate := float64(rand.Intn(50)+30) + rand.Float64()
		machineCost := int64(machineHours * hourlyRate * 100)

		entries[j] = &mfg.MfgMachineEntry{
			EntryId:           fmt.Sprintf("mach-%03d", idx),
			WorkOrderId:       woID,
			WorkCenterId:      wcID,
			StartTime:         startTime.Unix(),
			EndTime:           endTime.Unix(),
			MachineHours:      machineHours,
			QuantityCompleted: float64(rand.Intn(100) + 20),
			QuantityScrapped:  float64(rand.Intn(5)),
			MachineStatus:     machineStatuses[(woIdx*2+j)%len(machineStatuses)],
			HourlyRate:        hourlyRate,
			MachineCost:       money(store, machineCost),
			OperatorId:        operatorID,
			Notes:             fmt.Sprintf("Machine entry for work order %d", idx),
			AuditInfo:         createAuditInfo(),
		}
		idx++
	}
	return entries, idx
}

// generateWOConsumptions creates 2 embedded production consumptions
func generateWOConsumptions(store *MockDataStore, woID string, woIdx, startIdx int) ([]*mfg.MfgProdConsumption, int) {
	consumptions := make([]*mfg.MfgProdConsumption, 2)
	idx := startIdx
	for j := 0; j < 2; j++ {
		itemID := pickRef(store.ItemIDs, (woIdx*2 + j))
		warehouseID := pickRef(store.SCMWarehouseIDs, (woIdx + j))
		binID := pickRef(store.BinIDs, (woIdx*2 + j))
		consumptionDate := time.Now().AddDate(0, 0, -rand.Intn(14))
		qtyPlanned := float64(rand.Intn(50) + 5)
		qtyConsumed := qtyPlanned * (0.95 + rand.Float64()*0.1)
		unitCost := int64(rand.Intn(5000) + 500)
		totalCost := int64(qtyConsumed * float64(unitCost))

		consumptions[j] = &mfg.MfgProdConsumption{
			ConsumptionId:    fmt.Sprintf("consump-%03d", idx),
			WorkOrderId:      woID,
			ItemId:           itemID,
			QuantityPlanned:  qtyPlanned,
			QuantityConsumed: qtyConsumed,
			UnitOfMeasure:    "EA",
			LotNumber:        fmt.Sprintf("LOT-%06d", 400000+idx),
			WarehouseId:      warehouseID,
			BinId:            binID,
			ConsumptionDate:  consumptionDate.Unix(),
			UnitCost:         money(store, unitCost),
			TotalCost:        money(store, totalCost),
			Notes:            fmt.Sprintf("Material consumption for WO operation %d", idx),
			AuditInfo:        createAuditInfo(),
		}
		idx++
	}
	return consumptions, idx
}

// generateWOBatches creates 1 embedded production batch per work order (for ~60% of WOs)
func generateWOBatches(store *MockDataStore, woID, itemID string, woIdx, startIdx int) ([]*mfg.MfgProdBatch, int) {
	// Only generate batches for about 60% of work orders
	if woIdx >= 12 {
		return nil, startIdx
	}
	qualityStatuses := []string{"PASSED", "PENDING", "FAILED", "HOLD"}
	warehouseID := pickRef(store.SCMWarehouseIDs, woIdx)
	productionDate := time.Now().AddDate(0, 0, -rand.Intn(60))
	expiryDate := productionDate.AddDate(1, 0, 0)

	batch := &mfg.MfgProdBatch{
		BatchId:        genID("batch", startIdx-1),
		BatchNumber:    fmt.Sprintf("BATCH-%06d", 300000+startIdx),
		WorkOrderId:    woID,
		ItemId:         itemID,
		Quantity:       float64(rand.Intn(200) + 50),
		ProductionDate: productionDate.Unix(),
		ExpiryDate:     expiryDate.Unix(),
		LotNumber:      fmt.Sprintf("LOT-%06d", 400000+startIdx),
		SerialNumber:   fmt.Sprintf("SN-%08d", 50000000+startIdx),
		WarehouseId:    warehouseID,
		BinId:          fmt.Sprintf("bin-%03d", rand.Intn(20)+1),
		QualityStatus:  qualityStatuses[woIdx%len(qualityStatuses)],
		Notes:          fmt.Sprintf("Production batch %d", startIdx),
		AuditInfo:      createAuditInfo(),
	}
	return []*mfg.MfgProdBatch{batch}, startIdx + 1
}

// generateWOActualCosts creates 2 embedded actual cost entries
func generateWOActualCosts(store *MockDataStore, woID string, woIdx, startIdx int) ([]*mfg.MfgActualCost, int) {
	costTypes := []mfg.MfgCostType{
		mfg.MfgCostType_MFG_COST_TYPE_MATERIAL, mfg.MfgCostType_MFG_COST_TYPE_LABOR,
		mfg.MfgCostType_MFG_COST_TYPE_OVERHEAD, mfg.MfgCostType_MFG_COST_TYPE_OUTSIDE_PROCESSING,
	}
	sourceTypes := []string{"LABOR", "MACHINE", "MATERIAL", "PO"}
	costs := make([]*mfg.MfgActualCost, 2)
	idx := startIdx
	for j := 0; j < 2; j++ {
		transDate := time.Now().AddDate(0, 0, -rand.Intn(14))
		quantity := float64(rand.Intn(50) + 5)
		unitCost := int64(rand.Intn(100) + 10)
		amount := int64(quantity) * unitCost

		costs[j] = &mfg.MfgActualCost{
			ActualCostId:    fmt.Sprintf("actcost-%03d", idx),
			WorkOrderId:     woID,
			CostType:        costTypes[(woIdx*2+j)%len(costTypes)],
			CostElement:     fmt.Sprintf("CE-%03d", idx),
			Amount:          money(store, amount),
			Quantity:        quantity,
			UnitOfMeasure:   "EA",
			UnitCost:        money(store, unitCost),
			SourceType:      sourceTypes[(woIdx*2+j)%len(sourceTypes)],
			SourceId:        fmt.Sprintf("SRC-%06d", 100000+idx),
			TransactionDate: transDate.Unix(),
			Notes:           fmt.Sprintf("Actual cost entry %d", idx),
			AuditInfo:       createAuditInfo(),
		}
		idx++
	}
	return costs, idx
}

// generateWOCostVariances creates 1 embedded cost variance entry
func generateWOCostVariances(store *MockDataStore, woID string, woIdx, startIdx int) ([]*mfg.MfgCostVariance, int) {
	varianceTypes := []mfg.MfgVarianceType{
		mfg.MfgVarianceType_MFG_VARIANCE_TYPE_MATERIAL, mfg.MfgVarianceType_MFG_VARIANCE_TYPE_LABOR,
		mfg.MfgVarianceType_MFG_VARIANCE_TYPE_OVERHEAD, mfg.MfgVarianceType_MFG_VARIANCE_TYPE_EFFICIENCY,
		mfg.MfgVarianceType_MFG_VARIANCE_TYPE_VOLUME,
	}
	costTypes := []mfg.MfgCostType{
		mfg.MfgCostType_MFG_COST_TYPE_MATERIAL, mfg.MfgCostType_MFG_COST_TYPE_LABOR,
		mfg.MfgCostType_MFG_COST_TYPE_OVERHEAD, mfg.MfgCostType_MFG_COST_TYPE_OUTSIDE_PROCESSING,
	}
	analysisDate := time.Now().AddDate(0, 0, -rand.Intn(7))
	standardCost := int64(rand.Intn(10000) + 2000)
	actualCost := int64(float64(standardCost) * (0.85 + rand.Float64()*0.3))
	varianceAmount := actualCost - standardCost
	variancePercent := float64(varianceAmount) / float64(standardCost) * 100
	analyzedBy := pickRef(store.EmployeeIDs, woIdx)

	v := &mfg.MfgCostVariance{
		VarianceId:      genID("costvar", startIdx-1),
		WorkOrderId:     woID,
		VarianceType:    varianceTypes[woIdx%len(varianceTypes)],
		CostType:        costTypes[woIdx%len(costTypes)],
		StandardCost:    money(store, standardCost),
		ActualCost:      money(store, actualCost),
		VarianceAmount:  money(store, varianceAmount),
		VariancePercent: variancePercent,
		VarianceReason:  fmt.Sprintf("Variance reason for WO %s", woID),
		AnalysisDate:    analysisDate.Unix(),
		AnalyzedBy:      analyzedBy,
		Notes:           fmt.Sprintf("Cost variance analysis %d", startIdx),
		AuditInfo:       createAuditInfo(),
	}
	return []*mfg.MfgCostVariance{v}, startIdx + 1
}
