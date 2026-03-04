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
package assets

import (
	"fmt"
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// generateDepreciationSchedule creates monthly depreciation schedule entries
// when an asset transitions to ACTIVE status.
func generateDepreciationSchedule(asset *fin.Asset, action ifs.Action, vnic ifs.IVNic) error {
	if asset.Status != fin.AssetStatus_ASSET_STATUS_ACTIVE {
		return nil
	}
	// Skip if schedule already exists
	if len(asset.DepreciationSchedules) > 0 {
		return nil
	}
	if asset.AcquisitionCost == nil || asset.AcquisitionCost.Amount == 0 {
		return nil
	}
	if asset.UsefulLifeMonths <= 0 {
		return nil
	}
	currency := asset.AcquisitionCost.CurrencyId
	cost := asset.AcquisitionCost.Amount
	salvage := int64(0)
	if asset.SalvageValue != nil {
		salvage = asset.SalvageValue.Amount
	}
	depreciable := cost - salvage
	if depreciable <= 0 {
		return nil
	}
	months := int(asset.UsefulLifeMonths)
	startDate := time.Now()
	if asset.AcquisitionDate != 0 {
		startDate = time.Unix(asset.AcquisitionDate, 0)
	}
	accumulated := int64(0)
	schedules := make([]*fin.DepreciationSchedule, 0, months)
	for i := 0; i < months; i++ {
		monthlyAmount := computeMonthlyDepreciation(asset.DepreciationMethod,
			depreciable, int64(months), cost-accumulated-salvage, i, months)
		if accumulated+monthlyAmount > depreciable {
			monthlyAmount = depreciable - accumulated
		}
		if monthlyAmount <= 0 {
			break
		}
		accumulated += monthlyAmount
		depDate := startDate.AddDate(0, i+1, 0)
		var schedId string
		common.GenerateID(&schedId)
		schedules = append(schedules, &fin.DepreciationSchedule{
			ScheduleId:        schedId,
			AssetId:           asset.AssetId,
			DepreciationDate:  depDate.Unix(),
			DepreciationAmount: &erp.Money{Amount: monthlyAmount, CurrencyId: currency},
			AccumulatedAmount:  &erp.Money{Amount: accumulated, CurrencyId: currency},
			RemainingValue:     &erp.Money{Amount: cost - accumulated, CurrencyId: currency},
			AuditInfo:          &erp.AuditInfo{},
		})
	}
	asset.DepreciationSchedules = schedules
	return nil
}

func computeMonthlyDepreciation(method fin.DepreciationMethod,
	depreciable, totalMonths, remainingNBV int64, currentMonth, totalMonthsInt int) int64 {
	switch method {
	case fin.DepreciationMethod_DEPRECIATION_METHOD_STRAIGHT_LINE:
		return depreciable / totalMonths
	case fin.DepreciationMethod_DEPRECIATION_METHOD_DECLINING_BALANCE:
		annualRate := 1.0 / float64(totalMonths/12)
		return int64(float64(remainingNBV) * annualRate / 12)
	case fin.DepreciationMethod_DEPRECIATION_METHOD_DOUBLE_DECLINING:
		annualRate := 2.0 / float64(totalMonths/12)
		return int64(float64(remainingNBV) * annualRate / 12)
	case fin.DepreciationMethod_DEPRECIATION_METHOD_SUM_OF_YEARS:
		years := totalMonths / 12
		remaining := years - int64(currentMonth/12)
		soy := years * (years + 1) / 2
		if soy > 0 {
			return int64(float64(depreciable) * float64(remaining) / float64(soy) / 12)
		}
		return depreciable / totalMonths
	default:
		_ = fmt.Sprintf("unsupported method %d, using straight line", method)
		return depreciable / totalMonths
	}
}
