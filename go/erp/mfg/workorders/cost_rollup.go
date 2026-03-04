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
package workorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
	"math"
)

// rollUpCosts calculates the actual cost of a completed work order from labor,
// material consumption, and overhead, then rolls up to the parent production order.
func rollUpCosts(wo *mfg.MfgWorkOrder, action ifs.Action, vnic ifs.IVNic) error {
	if wo.Status != mfg.MfgWorkOrderStatus_MFG_WORK_ORDER_STATUS_COMPLETED {
		return nil
	}
	currencyId := "USD"
	if wo.EstimatedCost != nil && wo.EstimatedCost.CurrencyId != "" {
		currencyId = wo.EstimatedCost.CurrencyId
	}
	// Sum labor costs from labor entries
	laborCost := int64(0)
	for _, entry := range wo.LaborEntries {
		if entry.HoursWorked > 0 {
			// Use work center standard rate if available
			wc, _ := common.GetEntity("MfgWorkCtr", 70,
				&mfg.MfgWorkCenter{WorkCenterId: entry.WorkCenterId}, vnic)
			rate := float64(50) // default $50/hr
			if wc != nil && wc.HourlyRate > 0 {
				rate = wc.HourlyRate
			}
			laborCost += int64(math.Round(entry.HoursWorked * rate * 100)) // convert to cents
		}
	}
	// Sum material costs from consumption records
	materialCost := int64(0)
	for _, c := range wo.Consumptions {
		if c.QuantityConsumed > 0 && c.ItemId != "" {
			item, _ := common.GetEntity("Item", 50, &scm.ScmItem{ItemId: c.ItemId}, vnic)
			if item != nil && item.UnitCost != nil {
				materialCost += int64(c.QuantityConsumed * float64(item.UnitCost.Amount))
			}
		}
	}
	wo.ActualCost = &erp.Money{
		Amount:     laborCost + materialCost,
		CurrencyId: currencyId,
	}
	// Roll up to parent production order
	orders, err := common.GetEntities("MfgProdOrd", 70, &mfg.MfgProductionOrder{}, vnic)
	if err != nil {
		return nil // non-fatal
	}
	for _, order := range orders {
		for _, line := range order.Lines {
			if line.WorkOrderId == wo.WorkOrderId {
				order.TotalActualCost = common.MoneyAdd(order.TotalActualCost, wo.ActualCost)
				_ = common.PutEntity("MfgProdOrd", 70, order, vnic)
				return nil
			}
		}
	}
	return nil
}

// computeWorkOrderProgress calculates quantity completed from operations.
func computeWorkOrderProgress(wo *mfg.MfgWorkOrder) error {
	if len(wo.Operations) == 0 {
		return nil
	}
	minCompleted := wo.QuantityOrdered
	totalScrapped := float64(0)
	for _, op := range wo.Operations {
		if op.QuantityCompleted < minCompleted {
			minCompleted = op.QuantityCompleted
		}
		totalScrapped += op.QuantityScrapped
	}
	wo.QuantityCompleted = minCompleted
	wo.QuantityScrapped = totalScrapped
	return nil
}
