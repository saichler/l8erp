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

// generateStandardCosts creates standard cost records (one per BOM item)
func generateStandardCosts(store *MockDataStore) []*mfg.MfgStandardCost {
	count := len(store.MfgBomIDs)
	if count == 0 {
		count = 15
	}

	costs := make([]*mfg.MfgStandardCost, count)
	for i := 0; i < count; i++ {
		itemID := pickRef(store.ItemIDs, i)

		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0)

		materialCost := int64(rand.Intn(10000) + 1000)
		laborCost := int64(rand.Intn(5000) + 500)
		overheadCost := int64(rand.Intn(2000) + 200)
		outsideCost := int64(rand.Intn(1000))
		totalCost := materialCost + laborCost + overheadCost + outsideCost

		costs[i] = &mfg.MfgStandardCost{
			CostId:                genID("stdcost", i),
			ItemId:                itemID,
			CostVersion:           fmt.Sprintf("V%d", rand.Intn(3)+1),
			EffectiveDate:         effectiveDate.Unix(),
			ExpiryDate:            expiryDate.Unix(),
			MaterialCost:          money(store, materialCost),
			LaborCost:             money(store, laborCost),
			OverheadCost:          money(store, overheadCost),
			OutsideProcessingCost: money(store, outsideCost),
			TotalCost:             money(store, totalCost),
			CurrencyId: pickRef(store.CurrencyIDs, i),
			CostMethod:            []string{"STANDARD", "ACTUAL", "AVERAGE"}[i%3],
			IsCurrent:             i < count*7/10,
			Notes:                 fmt.Sprintf("Standard cost record %d", i+1),
			AuditInfo:             createAuditInfo(),
		}
	}
	return costs
}

// generateCostRollups creates cost rollup records
func generateCostRollups() []*mfg.MfgCostRollup {
	count := 6
	rollups := make([]*mfg.MfgCostRollup, count)

	statuses := []string{"DRAFT", "COMPLETED", "APPLIED"}

	for i := 0; i < count; i++ {
		runDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(30))
		effectiveDate := runDate.AddDate(0, 0, rand.Intn(7))

		rollups[i] = &mfg.MfgCostRollup{
			RollupId:       genID("rollup", i),
			RollupNumber:   fmt.Sprintf("CR-%05d", 90000+i+1),
			Description:    fmt.Sprintf("Manufacturing cost rollup %d", i+1),
			CostVersion:    fmt.Sprintf("V%d", rand.Intn(3)+1),
			EffectiveDate:  effectiveDate.Unix(),
			Status:         statuses[i%len(statuses)],
			RunBy:          fmt.Sprintf("emp-%03d", rand.Intn(20)+1),
			RunDate:        runDate.Unix(),
			ItemsProcessed: int32(rand.Intn(100) + 20),
			BomsProcessed:  int32(rand.Intn(50) + 10),
			Notes:          fmt.Sprintf("Cost rollup notes %d", i+1),
			AuditInfo:      createAuditInfo(),
		}
	}
	return rollups
}

// generateActualCosts creates actual cost records (2 per work order)
func generateActualCosts(store *MockDataStore) []*mfg.MfgActualCost {
	costTypes := []mfg.MfgCostType{
		mfg.MfgCostType_MFG_COST_TYPE_MATERIAL,
		mfg.MfgCostType_MFG_COST_TYPE_LABOR,
		mfg.MfgCostType_MFG_COST_TYPE_OVERHEAD,
		mfg.MfgCostType_MFG_COST_TYPE_OUTSIDE_PROCESSING,
	}
	sourceTypes := []string{"LABOR", "MACHINE", "MATERIAL", "PO"}

	costs := make([]*mfg.MfgActualCost, 0, len(store.MfgWorkOrderIDs)*2)
	idx := 1
	for woIdx, woID := range store.MfgWorkOrderIDs {
		for j := 0; j < 2; j++ {
			transDate := time.Now().AddDate(0, 0, -rand.Intn(14))
			quantity := float64(rand.Intn(50) + 5)
			unitCost := int64(rand.Intn(100) + 10)
			amount := int64(quantity) * unitCost

			costs = append(costs, &mfg.MfgActualCost{
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
			})
			idx++
		}
	}
	return costs
}

// generateCostVariances creates cost variance records (1 per work order)
func generateCostVariances(store *MockDataStore) []*mfg.MfgCostVariance {
	varianceTypes := []mfg.MfgVarianceType{
		mfg.MfgVarianceType_MFG_VARIANCE_TYPE_MATERIAL,
		mfg.MfgVarianceType_MFG_VARIANCE_TYPE_LABOR,
		mfg.MfgVarianceType_MFG_VARIANCE_TYPE_OVERHEAD,
		mfg.MfgVarianceType_MFG_VARIANCE_TYPE_EFFICIENCY,
		mfg.MfgVarianceType_MFG_VARIANCE_TYPE_VOLUME,
	}
	costTypes := []mfg.MfgCostType{
		mfg.MfgCostType_MFG_COST_TYPE_MATERIAL,
		mfg.MfgCostType_MFG_COST_TYPE_LABOR,
		mfg.MfgCostType_MFG_COST_TYPE_OVERHEAD,
		mfg.MfgCostType_MFG_COST_TYPE_OUTSIDE_PROCESSING,
	}

	variances := make([]*mfg.MfgCostVariance, len(store.MfgWorkOrderIDs))
	for i, woID := range store.MfgWorkOrderIDs {
		analysisDate := time.Now().AddDate(0, 0, -rand.Intn(7))

		standardCost := int64(rand.Intn(10000) + 2000)
		actualCost := int64(float64(standardCost) * (0.85 + rand.Float64()*0.3))
		varianceAmount := actualCost - standardCost
		variancePercent := float64(varianceAmount) / float64(standardCost) * 100

		analyzedBy := pickRef(store.EmployeeIDs, i)

		variances[i] = &mfg.MfgCostVariance{
			VarianceId:      genID("costvar", i),
			WorkOrderId:     woID,
			VarianceType:    varianceTypes[i%len(varianceTypes)],
			CostType:        costTypes[i%len(costTypes)],
			StandardCost:    money(store, standardCost),
			ActualCost:      money(store, actualCost),
			VarianceAmount:  money(store, varianceAmount),
			VariancePercent: variancePercent,
			VarianceReason:  fmt.Sprintf("Variance reason for WO %s", woID),
			AnalysisDate:    analysisDate.Unix(),
			AnalyzedBy:      analyzedBy,
			Notes:           fmt.Sprintf("Cost variance analysis %d", i+1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return variances
}

// generateOverheads creates overhead records
func generateOverheads(store *MockDataStore) []*mfg.MfgOverhead {
	allocMethods := []mfg.MfgOverheadMethod{
		mfg.MfgOverheadMethod_MFG_OVERHEAD_METHOD_DIRECT_LABOR_HOURS,
		mfg.MfgOverheadMethod_MFG_OVERHEAD_METHOD_MACHINE_HOURS,
		mfg.MfgOverheadMethod_MFG_OVERHEAD_METHOD_DIRECT_LABOR_COST,
		mfg.MfgOverheadMethod_MFG_OVERHEAD_METHOD_UNITS_PRODUCED,
	}
	rateUnits := []string{"PER_HOUR", "PER_UNIT", "PERCENT"}

	overheads := make([]*mfg.MfgOverhead, len(mfgOverheadNames))
	for i, name := range mfgOverheadNames {
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0)

		overheads[i] = &mfg.MfgOverhead{
			OverheadId:       genID("overhead", i),
			Code:             genCode("OH", i),
			Name:             name,
			Description:      fmt.Sprintf("Manufacturing overhead: %s", name),
			AllocationMethod: allocMethods[i%len(allocMethods)],
			Rate:             float64(rand.Intn(50)+10) / 10.0, // 1.0 - 6.0
			RateUnit:         rateUnits[i%len(rateUnits)],
			CurrencyId: pickRef(store.CurrencyIDs, i),
			CostCenter:       fmt.Sprintf("CC-%03d", rand.Intn(10)+1),
			IsActive:         true,
			EffectiveDate:    effectiveDate.Unix(),
			ExpiryDate:       expiryDate.Unix(),
			Notes:            fmt.Sprintf("Overhead notes for %s", name),
			AuditInfo:        createAuditInfo(),
		}
	}
	return overheads
}

// generateOverheadAllocs creates overhead allocation records (2 per overhead)
func generateOverheadAllocs(store *MockDataStore) []*mfg.MfgOverheadAlloc {
	allocs := make([]*mfg.MfgOverheadAlloc, 0, len(store.MfgOverheadIDs)*2)
	idx := 1
	for ohIdx, ohID := range store.MfgOverheadIDs {
		for j := 0; j < 2; j++ {
			woID := pickRef(store.MfgWorkOrderIDs, (ohIdx*2+j))
			wcID := pickRef(store.MfgWorkCenterIDs, (ohIdx+j))

			allocDate := time.Now().AddDate(0, 0, -rand.Intn(14))
			allocBase := float64(rand.Intn(100) + 20)
			rate := float64(rand.Intn(50)+10) / 10.0
			allocAmount := int64(allocBase * rate * 100)

			allocs = append(allocs, &mfg.MfgOverheadAlloc{
				AllocationId:    fmt.Sprintf("ohalloc-%03d", idx),
				OverheadId:      ohID,
				WorkOrderId:     woID,
				WorkCenterId:    wcID,
				AllocationBase:  allocBase,
				Rate:            rate,
				AllocatedAmount: money(store, allocAmount),
				AllocationDate:  allocDate.Unix(),
				Period:          allocDate.Format("2006-01"),
				Notes:           fmt.Sprintf("Overhead allocation %d", idx),
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return allocs
}
