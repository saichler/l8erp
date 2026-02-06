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

// generateWorkCenters creates work center records
func generateWorkCenters() []*mfg.MfgWorkCenter {
	workCenterTypes := []mfg.MfgWorkCenterType{
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_MACHINE,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_LABOR,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_MACHINE,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_LABOR,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_LABOR,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_MACHINE,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_LABOR,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_LABOR,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_MACHINE,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_MACHINE,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_MACHINE,
		mfg.MfgWorkCenterType_MFG_WORK_CENTER_TYPE_MACHINE,
	}

	workCenters := make([]*mfg.MfgWorkCenter, len(mfgWorkCenterNames))
	for i, name := range mfgWorkCenterNames {
		workCenters[i] = &mfg.MfgWorkCenter{
			WorkCenterId:       genID("wc", i),
			Code:               genCode("WC", i),
			Name:               name,
			Description:        fmt.Sprintf("Manufacturing %s", name),
			WorkCenterType:     workCenterTypes[i%len(workCenterTypes)],
			HourlyRate:         float64(rand.Intn(100) + 50),
			CurrencyCode:       "USD",
			CapacityUnits:      int32(rand.Intn(10) + 1),
			EfficiencyPercent:  float64(rand.Intn(20) + 80),
			UtilizationPercent: float64(rand.Intn(30) + 60),
			IsActive:           true,
			Notes:              fmt.Sprintf("Work center for %s operations", name),
			AuditInfo:          createAuditInfo(),
		}
	}
	return workCenters
}

// generateWorkCenterCaps creates work center capacity records (2 per work center)
func generateWorkCenterCaps(store *MockDataStore) []*mfg.MfgWorkCenterCap {
	caps := make([]*mfg.MfgWorkCenterCap, 0, len(store.MfgWorkCenterIDs)*2)
	idx := 1
	for _, wcID := range store.MfgWorkCenterIDs {
		for j := 0; j < 2; j++ {
			effectiveDate := time.Now().AddDate(0, -j*3, 0)
			expiryDate := effectiveDate.AddDate(0, 6, 0)
			shiftID := pickRef(store.MfgShiftScheduleIDs, (idx-1))

			caps = append(caps, &mfg.MfgWorkCenterCap{
				CapacityId:     fmt.Sprintf("wccap-%03d", idx),
				WorkCenterId:   wcID,
				EffectiveDate:  effectiveDate.Unix(),
				ExpiryDate:     expiryDate.Unix(),
				AvailableHours: float64(rand.Intn(4) + 6) * 8, // 48-80 hours per week
				CapacityUnits:  float64(rand.Intn(50) + 50),
				ShiftId:        shiftID,
				DayOfWeek:      int32(j + 1),
				Notes:          fmt.Sprintf("Capacity record %d for work center", idx),
				AuditInfo:      createAuditInfo(),
			})
			idx++
		}
	}
	return caps
}

// generateShiftSchedules creates shift schedule records
func generateShiftSchedules() []*mfg.MfgShiftSchedule {
	shiftTypes := []mfg.MfgShiftType{
		mfg.MfgShiftType_MFG_SHIFT_TYPE_DAY,
		mfg.MfgShiftType_MFG_SHIFT_TYPE_EVENING,
		mfg.MfgShiftType_MFG_SHIFT_TYPE_NIGHT,
		mfg.MfgShiftType_MFG_SHIFT_TYPE_DAY,
		mfg.MfgShiftType_MFG_SHIFT_TYPE_NIGHT,
		mfg.MfgShiftType_MFG_SHIFT_TYPE_ROTATING,
	}
	startTimes := []string{"06:00", "14:00", "22:00", "08:00", "22:00", "09:00"}
	endTimes := []string{"14:00", "22:00", "06:00", "16:00", "06:00", "17:00"}
	breakDurations := []float64{30.0, 30.0, 30.0, 60.0, 30.0, 60.0}

	shifts := make([]*mfg.MfgShiftSchedule, len(mfgShiftNames))
	for i, name := range mfgShiftNames {
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0)

		shifts[i] = &mfg.MfgShiftSchedule{
			ScheduleId:    genID("shift", i),
			Name:          name,
			Description:   fmt.Sprintf("Standard %s schedule", name),
			ShiftType:     shiftTypes[i%len(shiftTypes)],
			StartTime:     startTimes[i%len(startTimes)],
			EndTime:       endTimes[i%len(endTimes)],
			BreakDuration: breakDurations[i%len(breakDurations)],
			IsOvernight:   shiftTypes[i%len(shiftTypes)] == mfg.MfgShiftType_MFG_SHIFT_TYPE_NIGHT,
			IsActive:      true,
			EffectiveDate: effectiveDate.Unix(),
			ExpiryDate:    expiryDate.Unix(),
			Notes:         fmt.Sprintf("Shift schedule for %s", name),
			AuditInfo:     createAuditInfo(),
		}
	}
	return shifts
}

// generateBoms creates BOM records (one per item, up to 15)
func generateBoms(store *MockDataStore) []*mfg.MfgBom {
	bomTypes := []mfg.MfgBomType{
		mfg.MfgBomType_MFG_BOM_TYPE_STANDARD,
		mfg.MfgBomType_MFG_BOM_TYPE_STANDARD,
		mfg.MfgBomType_MFG_BOM_TYPE_ENGINEERING,
		mfg.MfgBomType_MFG_BOM_TYPE_STANDARD,
		mfg.MfgBomType_MFG_BOM_TYPE_PHANTOM,
	}

	count := 15
	if len(store.ItemIDs) < count {
		count = len(store.ItemIDs)
	}
	if count == 0 {
		count = 15
	}

	boms := make([]*mfg.MfgBom, count)
	for i := 0; i < count; i++ {
		itemID := pickRef(store.ItemIDs, i)
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)

		// Status distribution: 70% Active, 20% Draft, 10% Obsolete
		var status mfg.MfgBomStatus
		if i < count*7/10 {
			status = mfg.MfgBomStatus_MFG_BOM_STATUS_ACTIVE
		} else if i < count*9/10 {
			status = mfg.MfgBomStatus_MFG_BOM_STATUS_DRAFT
		} else {
			status = mfg.MfgBomStatus_MFG_BOM_STATUS_OBSOLETE
		}

		boms[i] = &mfg.MfgBom{
			BomId:         genID("bom", i),
			BomNumber:     fmt.Sprintf("BOM-%05d", 10000+i+1),
			ItemId:        itemID,
			Description:   fmt.Sprintf("Bill of Materials #%d", i+1),
			BomType:       bomTypes[i%len(bomTypes)],
			Status:        status,
			Revision:      fmt.Sprintf("R%d", rand.Intn(5)+1),
			EffectiveDate: effectiveDate.Unix(),
			BaseQuantity:  float64(rand.Intn(10) + 1),
			UnitOfMeasure: "EA",
			Notes:         fmt.Sprintf("BOM for manufacturing item %d", i+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return boms
}

// generateBomLines creates BOM line records (3 lines per BOM)
func generateBomLines(store *MockDataStore) []*mfg.MfgBomLine {
	lines := make([]*mfg.MfgBomLine, 0, len(store.MfgBomIDs)*3)
	idx := 1
	for bomIdx, bomID := range store.MfgBomIDs {
		for j := 0; j < 3; j++ {
			compItemID := pickRef(store.ItemIDs, (bomIdx*3+j))
			opID := pickRef(store.MfgRoutingOpIDs, (bomIdx+j))

			lines = append(lines, &mfg.MfgBomLine{
				LineId:          fmt.Sprintf("bomln-%03d", idx),
				BomId:           bomID,
				LineNumber:      int32((j + 1) * 10),
				ComponentItemId: compItemID,
				Description:     fmt.Sprintf("Component line %d", j+1),
				QuantityPer:     float64(rand.Intn(5) + 1),
				UnitOfMeasure:   "EA",
				ScrapPercent:    float64(rand.Intn(5)),
				OperationId:     opID,
				IsCritical:      j == 0,
				EffectiveDate:   time.Now().AddDate(0, -3, 0).Unix(),
				Notes:           fmt.Sprintf("BOM line component %d", idx),
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return lines
}

// generateRoutings creates routing records (one per BOM)
func generateRoutings(store *MockDataStore) []*mfg.MfgRouting {
	count := len(store.MfgBomIDs)
	if count == 0 {
		count = 15
	}

	routings := make([]*mfg.MfgRouting, count)
	for i := 0; i < count; i++ {
		itemID := pickRef(store.ItemIDs, i)
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0)

		// Status distribution: 70% Active, 20% Draft, 10% Obsolete
		var status mfg.MfgBomStatus
		if i < count*7/10 {
			status = mfg.MfgBomStatus_MFG_BOM_STATUS_ACTIVE
		} else if i < count*9/10 {
			status = mfg.MfgBomStatus_MFG_BOM_STATUS_DRAFT
		} else {
			status = mfg.MfgBomStatus_MFG_BOM_STATUS_OBSOLETE
		}

		routings[i] = &mfg.MfgRouting{
			RoutingId:     genID("rtng", i),
			RoutingNumber: fmt.Sprintf("RTG-%05d", 10000+i+1),
			ItemId:        itemID,
			Description:   fmt.Sprintf("Manufacturing routing #%d", i+1),
			Status:        status,
			Revision:      fmt.Sprintf("R%d", rand.Intn(5)+1),
			EffectiveDate: effectiveDate.Unix(),
			ExpiryDate:    expiryDate.Unix(),
			BaseQuantity:  1.0,
			UnitOfMeasure: "EA",
			Notes:         fmt.Sprintf("Routing for item %d", i+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return routings
}

// generateRoutingOperations creates routing operation records (4 ops per routing)
func generateRoutingOperations(store *MockDataStore) []*mfg.MfgRoutingOperation {
	ops := make([]*mfg.MfgRoutingOperation, 0, len(store.MfgRoutingIDs)*4)
	idx := 1
	for rtngIdx, routingID := range store.MfgRoutingIDs {
		for j := 0; j < 4; j++ {
			wcID := pickRef(store.MfgWorkCenterIDs, (rtngIdx+j))
			opName := mfgOperationNames[(rtngIdx*4+j)%len(mfgOperationNames)]

			ops = append(ops, &mfg.MfgRoutingOperation{
				OperationId:     fmt.Sprintf("rtngop-%03d", idx),
				RoutingId:       routingID,
				OperationNumber: int32((j + 1) * 10),
				OperationName:   opName,
				WorkCenterId:    wcID,
				Description:     fmt.Sprintf("%s operation", opName),
				SetupTime:       float64(rand.Intn(30) + 10),        // 10-40 minutes
				RunTime:         float64(rand.Intn(60) + 20),        // 20-80 minutes per unit
				MoveTime:        float64(rand.Intn(15) + 5),         // 5-20 minutes
				QueueTime:       float64(rand.Intn(30)),             // 0-30 minutes
				TimeUnit:        "MINUTES",
				OverlapPercent:  int32(rand.Intn(20)),
				IsSubcontract:   j == 3,
				Notes:           fmt.Sprintf("Operation step %d: %s", j+1, opName),
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return ops
}
