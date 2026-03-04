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
)

// computePricing looks up prices from active price lists for order lines
// that have an itemId but no unitPrice set.
func computePricing(order *sales.SalesOrder, vnic ifs.IVNic) error {
	for _, line := range order.Lines {
		if line.UnitPrice != nil || line.ItemId == "" {
			continue
		}
		price, err := common.FindActivePriceListForItem(line.ItemId, line.Quantity, vnic)
		if err != nil {
			return err
		}
		if price != nil {
			line.UnitPrice = price
		}
		// Apply discount rules
		if line.UnitPrice != nil && line.DiscountAmount == nil && line.DiscountPercent == 0 {
			disc, err := common.ApplyDiscountRules(line.UnitPrice, order.CustomerId, line.ItemId, vnic)
			if err != nil {
				return err
			}
			if disc != nil {
				line.DiscountAmount = disc
			}
		}
	}
	return nil
}
