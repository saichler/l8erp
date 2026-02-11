/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

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
			CurrencyId:            pickRef(store.CurrencyIDs, i),
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

// generateOverheads creates overhead records with embedded allocations
func generateOverheads(store *MockDataStore) []*mfg.MfgOverhead {
	allocMethods := []mfg.MfgOverheadMethod{
		mfg.MfgOverheadMethod_MFG_OVERHEAD_METHOD_DIRECT_LABOR_HOURS,
		mfg.MfgOverheadMethod_MFG_OVERHEAD_METHOD_MACHINE_HOURS,
		mfg.MfgOverheadMethod_MFG_OVERHEAD_METHOD_DIRECT_LABOR_COST,
		mfg.MfgOverheadMethod_MFG_OVERHEAD_METHOD_UNITS_PRODUCED,
	}
	rateUnits := []string{"PER_HOUR", "PER_UNIT", "PERCENT"}

	allocIdx := 1
	overheads := make([]*mfg.MfgOverhead, len(mfgOverheadNames))
	for i, name := range mfgOverheadNames {
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0)

		ohID := genID("overhead", i)

		// Generate 2 embedded allocations per overhead
		allocs := make([]*mfg.MfgOverheadAlloc, 2)
		for j := 0; j < 2; j++ {
			woID := pickRef(store.MfgWorkOrderIDs, (i*2 + j))
			wcID := pickRef(store.MfgWorkCenterIDs, (i + j))

			allocDate := time.Now().AddDate(0, 0, -rand.Intn(14))
			allocBase := float64(rand.Intn(100) + 20)
			rate := float64(rand.Intn(50)+10) / 10.0
			allocAmount := int64(allocBase * rate * 100)

			allocs[j] = &mfg.MfgOverheadAlloc{
				AllocationId:    fmt.Sprintf("ohalloc-%03d", allocIdx),
				OverheadId:      ohID,
				WorkOrderId:     woID,
				WorkCenterId:    wcID,
				AllocationBase:  allocBase,
				Rate:            rate,
				AllocatedAmount: money(store, allocAmount),
				AllocationDate:  allocDate.Unix(),
				Period:          allocDate.Format("2006-01"),
				Notes:           fmt.Sprintf("Overhead allocation %d", allocIdx),
				AuditInfo:       createAuditInfo(),
			}
			allocIdx++
		}

		overheads[i] = &mfg.MfgOverhead{
			OverheadId:       ohID,
			Code:             genCode("OH", i),
			Name:             name,
			Description:      fmt.Sprintf("Manufacturing overhead: %s", name),
			AllocationMethod: allocMethods[i%len(allocMethods)],
			Rate:             float64(rand.Intn(50)+10) / 10.0,
			RateUnit:         rateUnits[i%len(rateUnits)],
			CurrencyId:       pickRef(store.CurrencyIDs, i),
			CostCenter:       fmt.Sprintf("CC-%03d", rand.Intn(10)+1),
			IsActive:         true,
			EffectiveDate:    effectiveDate.Unix(),
			ExpiryDate:       expiryDate.Unix(),
			Notes:            fmt.Sprintf("Overhead notes for %s", name),
			AuditInfo:        createAuditInfo(),
			Allocations:      allocs,
		}
	}
	return overheads
}
