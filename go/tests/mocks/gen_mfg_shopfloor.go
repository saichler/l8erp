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

// generateLaborEntries creates labor entry records (2 per work order)
func generateLaborEntries(store *MockDataStore) []*mfg.MfgLaborEntry {
	laborTypes := []string{"DIRECT", "INDIRECT", "SETUP"}

	entries := make([]*mfg.MfgLaborEntry, 0, len(store.MfgWorkOrderIDs)*2)
	idx := 1
	for woIdx, woID := range store.MfgWorkOrderIDs {
		for j := 0; j < 2; j++ {
			empID := pickRef(store.EmployeeIDs, (woIdx*2+j))
			wcID := pickRef(store.MfgWorkCenterIDs, (woIdx+j))
			opID := pickRef(store.MfgWorkOrderOpIDs, (woIdx*2+j))

			startTime := time.Now().AddDate(0, 0, -rand.Intn(14)).Add(time.Duration(rand.Intn(8)+6) * time.Hour)
			hoursWorked := float64(rand.Intn(4)+4) + rand.Float64()
			endTime := startTime.Add(time.Duration(hoursWorked*60) * time.Minute)
			hourlyRate := float64(rand.Intn(30)+20) + rand.Float64()
			laborCost := int64(hoursWorked * hourlyRate * 100)

			entries = append(entries, &mfg.MfgLaborEntry{
				EntryId:           fmt.Sprintf("labor-%03d", idx),
				WorkOrderId:       woID,
				OperationId:       opID,
				EmployeeId:        empID,
				WorkCenterId:      wcID,
				StartTime:         startTime.Unix(),
				EndTime:           endTime.Unix(),
				HoursWorked:       hoursWorked,
				QuantityCompleted: float64(rand.Intn(50) + 10),
				QuantityScrapped:  float64(rand.Intn(3)),
				LaborType:         laborTypes[(woIdx*2+j)%len(laborTypes)],
				HourlyRate:        hourlyRate,
				LaborCost:         money(laborCost),
				Notes:             fmt.Sprintf("Labor entry for work order operation %d", idx),
				AuditInfo:         createAuditInfo(),
			})
			idx++
		}
	}
	return entries
}

// generateMachineEntries creates machine entry records (2 per work order)
func generateMachineEntries(store *MockDataStore) []*mfg.MfgMachineEntry {
	machineStatuses := []string{"RUNNING", "IDLE", "SETUP"}

	entries := make([]*mfg.MfgMachineEntry, 0, len(store.MfgWorkOrderIDs)*2)
	idx := 1
	for woIdx, woID := range store.MfgWorkOrderIDs {
		for j := 0; j < 2; j++ {
			wcID := pickRef(store.MfgWorkCenterIDs, (woIdx+j))
			opID := pickRef(store.MfgWorkOrderOpIDs, (woIdx*2+j))
			operatorID := pickRef(store.EmployeeIDs, (woIdx*2+j))

			startTime := time.Now().AddDate(0, 0, -rand.Intn(14)).Add(time.Duration(rand.Intn(8)+6) * time.Hour)
			machineHours := float64(rand.Intn(6)+2) + rand.Float64()
			endTime := startTime.Add(time.Duration(machineHours*60) * time.Minute)
			hourlyRate := float64(rand.Intn(50)+30) + rand.Float64()
			machineCost := int64(machineHours * hourlyRate * 100)

			entries = append(entries, &mfg.MfgMachineEntry{
				EntryId:           fmt.Sprintf("mach-%03d", idx),
				WorkOrderId:       woID,
				OperationId:       opID,
				WorkCenterId:      wcID,
				StartTime:         startTime.Unix(),
				EndTime:           endTime.Unix(),
				MachineHours:      machineHours,
				QuantityCompleted: float64(rand.Intn(100) + 20),
				QuantityScrapped:  float64(rand.Intn(5)),
				MachineStatus:     machineStatuses[(woIdx*2+j)%len(machineStatuses)],
				HourlyRate:        hourlyRate,
				MachineCost:       money(machineCost),
				OperatorId:        operatorID,
				Notes:             fmt.Sprintf("Machine entry for work order %d", idx),
				AuditInfo:         createAuditInfo(),
			})
			idx++
		}
	}
	return entries
}

// generateDowntimeEvents creates downtime event records (1 per work center)
func generateDowntimeEvents(store *MockDataStore) []*mfg.MfgDowntimeEvent {
	downtimeTypes := []mfg.MfgDowntimeType{
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_PLANNED,
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_UNPLANNED,
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_BREAKDOWN,
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_MAINTENANCE,
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_CHANGEOVER,
	}
	reasonCodes := []string{"MAINT", "SETUP", "BREAK", "MATLSHORT", "QUAL", "LABSHORT"}

	events := make([]*mfg.MfgDowntimeEvent, len(store.MfgWorkCenterIDs))
	for i, wcID := range store.MfgWorkCenterIDs {
		woID := pickRef(store.MfgWorkOrderIDs, i)
		reportedBy := pickRef(store.EmployeeIDs, i)
		resolvedBy := pickRef(store.EmployeeIDs, (i+1))

		startTime := time.Now().AddDate(0, 0, -rand.Intn(7)).Add(time.Duration(rand.Intn(12)+6) * time.Hour)
		durationMinutes := float64(rand.Intn(180) + 30)
		endTime := startTime.Add(time.Duration(durationMinutes) * time.Minute)
		estimatedLoss := int64(durationMinutes * 50 * 100) // ~$50/minute

		events[i] = &mfg.MfgDowntimeEvent{
			EventId:         genID("downtime", i),
			WorkCenterId:    wcID,
			WorkOrderId:     woID,
			DowntimeType:    downtimeTypes[i%len(downtimeTypes)],
			ReasonCode:      reasonCodes[i%len(reasonCodes)],
			Description:     fmt.Sprintf("Downtime event for work center %s", wcID),
			StartTime:       startTime.Unix(),
			EndTime:         endTime.Unix(),
			DurationMinutes: durationMinutes,
			ReportedBy:      reportedBy,
			ResolvedBy:      resolvedBy,
			EstimatedLoss:   money(estimatedLoss),
			Notes:           fmt.Sprintf("Downtime notes for event %d", i+1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return events
}

// generateProdConsumptions creates production consumption records (2 per work order)
func generateProdConsumptions(store *MockDataStore) []*mfg.MfgProdConsumption {
	consumptions := make([]*mfg.MfgProdConsumption, 0, len(store.MfgWorkOrderIDs)*2)
	idx := 1
	for woIdx, woID := range store.MfgWorkOrderIDs {
		for j := 0; j < 2; j++ {
			itemID := pickRef(store.ItemIDs, (woIdx*2+j))
			warehouseID := pickRef(store.SCMWarehouseIDs, (woIdx+j))
			binID := pickRef(store.BinIDs, (woIdx*2+j))
			opID := pickRef(store.MfgWorkOrderOpIDs, (woIdx*2+j))

			consumptionDate := time.Now().AddDate(0, 0, -rand.Intn(14))
			qtyPlanned := float64(rand.Intn(50) + 5)
			qtyConsumed := qtyPlanned * (0.95 + rand.Float64()*0.1)
			unitCost := int64(rand.Intn(5000) + 500)
			totalCost := int64(qtyConsumed * float64(unitCost))

			consumptions = append(consumptions, &mfg.MfgProdConsumption{
				ConsumptionId:    fmt.Sprintf("consump-%03d", idx),
				WorkOrderId:      woID,
				OperationId:      opID,
				ItemId:           itemID,
				QuantityPlanned:  qtyPlanned,
				QuantityConsumed: qtyConsumed,
				UnitOfMeasure:    "EA",
				LotNumber:        fmt.Sprintf("LOT-%06d", 400000+idx),
				WarehouseId:      warehouseID,
				BinId:            binID,
				ConsumptionDate:  consumptionDate.Unix(),
				UnitCost:         money(unitCost),
				TotalCost:        money(totalCost),
				Notes:            fmt.Sprintf("Material consumption for WO operation %d", idx),
				AuditInfo:        createAuditInfo(),
			})
			idx++
		}
	}
	return consumptions
}
