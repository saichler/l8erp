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

	"github.com/saichler/l8erp/go/types/mfg"
)

// generateMrpRuns creates MRP run records
func generateMrpRuns() []*mfg.MfgMrpRun {
	count := 8
	runs := make([]*mfg.MfgMrpRun, count)

	for i := 0; i < count; i++ {
		runDate := time.Now().AddDate(0, 0, -rand.Intn(30))
		horizonStart := runDate
		horizonEnd := runDate.AddDate(0, 0, rand.Intn(60)+30)
		startTime := runDate.Add(time.Duration(rand.Intn(8)+6) * time.Hour)
		endTime := startTime.Add(time.Duration(rand.Intn(4)+1) * time.Hour)

		// Status distribution: 20% Pending, 20% Running, 50% Completed, 10% Failed
		var status mfg.MfgMrpStatus
		if i < count*2/10 {
			status = mfg.MfgMrpStatus_MFG_MRP_STATUS_PENDING
		} else if i < count*4/10 {
			status = mfg.MfgMrpStatus_MFG_MRP_STATUS_RUNNING
		} else if i < count*9/10 {
			status = mfg.MfgMrpStatus_MFG_MRP_STATUS_COMPLETED
		} else {
			status = mfg.MfgMrpStatus_MFG_MRP_STATUS_FAILED
		}

		runs[i] = &mfg.MfgMrpRun{
			RunId:                genID("mrprun", i),
			RunNumber:            fmt.Sprintf("MRP-%06d", 700000+i+1),
			Description:          fmt.Sprintf("Material requirements planning run %d", i+1),
			Status:               status,
			RunDate:              runDate.Unix(),
			PlanningHorizonStart: horizonStart.Unix(),
			PlanningHorizonEnd:   horizonEnd.Unix(),
			IncludeSafetyStock:   i%2 == 0,
			IncludeForecasts:     i%3 != 0,
			IncludeOpenOrders:    true,
			RunBy:                fmt.Sprintf("emp-%03d", rand.Intn(20)+1),
			StartTime:            startTime.Unix(),
			EndTime:              endTime.Unix(),
			ItemsProcessed:       int32(rand.Intn(500) + 50),
			ExceptionsGenerated:  int32(rand.Intn(20)),
			Notes:                fmt.Sprintf("MRP run notes %d", i+1),
			AuditInfo:            createAuditInfo(),
		}
	}
	return runs
}

// generateMrpRequirements creates MRP requirement records (3 per run)
func generateMrpRequirements(store *MockDataStore) []*mfg.MfgMrpRequirement {
	reqTypes := []mfg.MfgRequirementType{
		mfg.MfgRequirementType_MFG_REQUIREMENT_TYPE_DEMAND,
		mfg.MfgRequirementType_MFG_REQUIREMENT_TYPE_SUPPLY,
		mfg.MfgRequirementType_MFG_REQUIREMENT_TYPE_PLANNED_ORDER,
		mfg.MfgRequirementType_MFG_REQUIREMENT_TYPE_TRANSFER,
	}
	sourceTypes := []string{"SALES_ORDER", "FORECAST", "SAFETY_STOCK"}

	reqs := make([]*mfg.MfgMrpRequirement, 0, len(store.MfgMrpRunIDs)*3)
	idx := 1
	for runIdx, runID := range store.MfgMrpRunIDs {
		for j := 0; j < 3; j++ {
			itemID := pickRef(store.ItemIDs, (runIdx*3+j))
			warehouseID := pickRef(store.SCMWarehouseIDs, (runIdx+j))

			requiredDate := time.Now().AddDate(0, 0, rand.Intn(60)+7)
			dueDate := requiredDate.AddDate(0, 0, rand.Intn(7)+1)

			reqs = append(reqs, &mfg.MfgMrpRequirement{
				RequirementId:   fmt.Sprintf("mrpreq-%03d", idx),
				RunId:           runID,
				ItemId:          itemID,
				RequirementType: reqTypes[(runIdx*3+j)%len(reqTypes)],
				Quantity:        float64(rand.Intn(200) + 20),
				UnitOfMeasure:   "EA",
				RequiredDate:    requiredDate.Unix(),
				DueDate:         dueDate.Unix(),
				SourceType:      sourceTypes[(runIdx+j)%len(sourceTypes)],
				SourceId:        fmt.Sprintf("SRC-%06d", 100000+idx),
				WarehouseId:     warehouseID,
				ActionMessage:   fmt.Sprintf("Action required for requirement %d", idx),
				IsFirmed:        j == 0,
				Notes:           fmt.Sprintf("MRP requirement %d", idx),
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return reqs
}

// generateCapacityPlans creates capacity plan records
func generateCapacityPlans() []*mfg.MfgCapacityPlan {
	count := 6
	plans := make([]*mfg.MfgCapacityPlan, count)

	timeBuckets := []string{"DAY", "WEEK", "MONTH"}

	for i := 0; i < count; i++ {
		planningStart := time.Now().AddDate(0, -rand.Intn(3), 0)
		planningEnd := planningStart.AddDate(0, 3, 0)
		runDate := time.Now().AddDate(0, 0, -rand.Intn(7))

		// Status distribution: 30% Draft, 50% Published, 20% Frozen
		var status mfg.MfgScheduleStatus
		if i < count*3/10 {
			status = mfg.MfgScheduleStatus_MFG_SCHEDULE_STATUS_DRAFT
		} else if i < count*8/10 {
			status = mfg.MfgScheduleStatus_MFG_SCHEDULE_STATUS_PUBLISHED
		} else {
			status = mfg.MfgScheduleStatus_MFG_SCHEDULE_STATUS_FROZEN
		}

		plans[i] = &mfg.MfgCapacityPlan{
			PlanId:        genID("capplan", i),
			PlanNumber:    fmt.Sprintf("CP-%05d", 80000+i+1),
			Description:   fmt.Sprintf("Quarterly capacity planning %d", i+1),
			Status:        status,
			PlanningStart: planningStart.Unix(),
			PlanningEnd:   planningEnd.Unix(),
			TimeBucket:    timeBuckets[i%len(timeBuckets)],
			RunBy:         fmt.Sprintf("emp-%03d", rand.Intn(20)+1),
			RunDate:       runDate.Unix(),
			Notes:         fmt.Sprintf("Capacity plan notes %d", i+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return plans
}

// generateCapacityLoads creates capacity load records (2 per plan per work center)
func generateCapacityLoads(store *MockDataStore) []*mfg.MfgCapacityLoad {
	loads := make([]*mfg.MfgCapacityLoad, 0, len(store.MfgCapacityPlanIDs)*len(store.MfgWorkCenterIDs))
	idx := 1
	for _, planID := range store.MfgCapacityPlanIDs {
		for wcIdx, wcID := range store.MfgWorkCenterIDs {
			if wcIdx >= 4 { // Limit to 4 work centers per plan
				break
			}

			periodStart := time.Now().AddDate(0, 0, wcIdx*7)
			periodEnd := periodStart.AddDate(0, 0, 7)
			availableHours := float64(rand.Intn(40) + 120)
			requiredHours := availableHours * (0.5 + rand.Float64()*0.6)

			loads = append(loads, &mfg.MfgCapacityLoad{
				LoadId:          fmt.Sprintf("capload-%03d", idx),
				PlanId:          planID,
				WorkCenterId:    wcID,
				PeriodStart:     periodStart.Unix(),
				PeriodEnd:       periodEnd.Unix(),
				AvailableHours:  availableHours,
				RequiredHours:   requiredHours,
				LoadPercent:     (requiredHours / availableHours) * 100,
				WorkOrdersCount: int32(rand.Intn(20) + 5),
				IsOverloaded:    requiredHours > availableHours,
				Notes:           fmt.Sprintf("Capacity load %d", idx),
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return loads
}

// generateProdSchedules creates production schedule records
func generateProdSchedules() []*mfg.MfgProdSchedule {
	count := 8
	schedules := make([]*mfg.MfgProdSchedule, count)

	scheduleTypes := []mfg.MfgScheduleType{
		mfg.MfgScheduleType_MFG_SCHEDULE_TYPE_FORWARD,
		mfg.MfgScheduleType_MFG_SCHEDULE_TYPE_BACKWARD,
		mfg.MfgScheduleType_MFG_SCHEDULE_TYPE_CONSTRAINT_BASED,
	}

	for i := 0; i < count; i++ {
		scheduleStart := time.Now().AddDate(0, 0, -rand.Intn(14))
		scheduleEnd := scheduleStart.AddDate(0, 0, rand.Intn(14)+7)
		createdDate := scheduleStart.AddDate(0, 0, -rand.Intn(3))

		// Status distribution: 20% Draft, 60% Published, 20% Frozen
		var status mfg.MfgScheduleStatus
		if i < count*2/10 {
			status = mfg.MfgScheduleStatus_MFG_SCHEDULE_STATUS_DRAFT
		} else if i < count*8/10 {
			status = mfg.MfgScheduleStatus_MFG_SCHEDULE_STATUS_PUBLISHED
		} else {
			status = mfg.MfgScheduleStatus_MFG_SCHEDULE_STATUS_FROZEN
		}

		publishedDate := int64(0)
		publishedBy := ""
		if status != mfg.MfgScheduleStatus_MFG_SCHEDULE_STATUS_DRAFT {
			publishedDate = createdDate.AddDate(0, 0, 1).Unix()
			publishedBy = fmt.Sprintf("emp-%03d", rand.Intn(20)+1)
		}

		schedules[i] = &mfg.MfgProdSchedule{
			ScheduleId:          genID("prodsched", i),
			ScheduleNumber:      fmt.Sprintf("PS-%05d", 60000+i+1),
			Description:         fmt.Sprintf("Weekly production schedule %d", i+1),
			ScheduleType:        scheduleTypes[i%len(scheduleTypes)],
			Status:              status,
			ScheduleStart:       scheduleStart.Unix(),
			ScheduleEnd:         scheduleEnd.Unix(),
			CreatedBy:           fmt.Sprintf("emp-%03d", rand.Intn(20)+1),
			CreatedDate:         createdDate.Unix(),
			PublishedBy:         publishedBy,
			PublishedDate:       publishedDate,
			WorkOrdersScheduled: int32(rand.Intn(50) + 10),
			Notes:               fmt.Sprintf("Production schedule notes %d", i+1),
			AuditInfo:           createAuditInfo(),
		}
	}
	return schedules
}

// generateScheduleBlocks creates schedule block records (3 per schedule)
func generateScheduleBlocks(store *MockDataStore) []*mfg.MfgScheduleBlock {
	blocks := make([]*mfg.MfgScheduleBlock, 0, len(store.MfgProdScheduleIDs)*3)
	idx := 1
	for schedIdx, schedID := range store.MfgProdScheduleIDs {
		for j := 0; j < 3; j++ {
			woID := pickRef(store.MfgWorkOrderIDs, (schedIdx*3+j))
			opID := pickRef(store.MfgWorkOrderOpIDs, (schedIdx*3+j))
			wcID := pickRef(store.MfgWorkCenterIDs, (schedIdx+j))

			scheduledStart := time.Now().AddDate(0, 0, schedIdx).Add(time.Duration(j*4+6) * time.Hour)
			scheduledEnd := scheduledStart.Add(time.Duration(rand.Intn(4)+2) * time.Hour)

			blocks = append(blocks, &mfg.MfgScheduleBlock{
				BlockId:        fmt.Sprintf("schblk-%03d", idx),
				ScheduleId:     schedID,
				WorkOrderId:    woID,
				OperationId:    opID,
				WorkCenterId:   wcID,
				ScheduledStart: scheduledStart.Unix(),
				ScheduledEnd:   scheduledEnd.Unix(),
				SetupHours:     float64(rand.Intn(2)) + rand.Float64(),
				RunHours:       float64(rand.Intn(4)+1) + rand.Float64(),
				Sequence:       int32(j + 1),
				IsLocked:       j == 0,
				Notes:          fmt.Sprintf("Schedule block %d", idx),
				AuditInfo:      createAuditInfo(),
			})
			idx++
		}
	}
	return blocks
}
