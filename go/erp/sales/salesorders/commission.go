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
package salesorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// calculateCommission finds the commission plan for the salesperson and updates
// the plan's earned amount when an order is delivered.
func calculateCommission(order *sales.SalesOrder, action ifs.Action, vnic ifs.IVNic) error {
	if order.Status != sales.SalesOrderStatus_SALES_ORDER_STATUS_DELIVERED {
		return nil
	}
	if order.SalespersonId == "" || order.TotalAmount == nil {
		return nil
	}
	plans, err := common.GetEntities("CommPlan", 60, &sales.SalesCommissionPlan{}, vnic)
	if err != nil {
		return err
	}
	now := time.Now().Unix()
	for _, plan := range plans {
		if !plan.IsActive {
			continue
		}
		if plan.EffectiveDate > 0 && plan.EffectiveDate > now {
			continue
		}
		if plan.ExpiryDate > 0 && plan.ExpiryDate < now {
			continue
		}
		if plan.BaseRate <= 0 {
			continue
		}
		commission := int64(float64(order.TotalAmount.Amount) * plan.BaseRate / 100)
		if commission <= 0 {
			continue
		}
		if plan.BaseAmount == nil {
			plan.BaseAmount = order.TotalAmount
			plan.BaseAmount.Amount = commission
		} else {
			plan.BaseAmount.Amount += commission
		}
		_ = common.PutEntity("CommPlan", 60, plan, vnic)
		return nil
	}
	return nil
}
