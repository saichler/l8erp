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
package orders

import (
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/ecom"
)

// computeOrderTotals sums line totals into the order subtotal and calculates totalAmount.
func computeOrderTotals(order *ecom.EcomOrder) error {
	if len(order.Lines) == 0 {
		return nil
	}
	currency := "USD"
	subtotal := int64(0)
	taxTotal := int64(0)
	for _, line := range order.Lines {
		// Compute line total = qty * unitPrice - discount
		if line.UnitPrice != nil && line.Quantity > 0 {
			lineAmt := line.UnitPrice.Amount * int64(line.Quantity)
			if line.DiscountAmount != nil {
				lineAmt -= line.DiscountAmount.Amount
			}
			line.LineTotal = &erp.Money{Amount: lineAmt, CurrencyId: line.UnitPrice.CurrencyId}
			currency = line.UnitPrice.CurrencyId
		}
		if line.LineTotal != nil {
			subtotal += line.LineTotal.Amount
		}
		if line.TaxAmount != nil {
			taxTotal += line.TaxAmount.Amount
		}
	}
	order.Subtotal = &erp.Money{Amount: subtotal, CurrencyId: currency}
	if taxTotal > 0 {
		order.TaxAmount = &erp.Money{Amount: taxTotal, CurrencyId: currency}
	}
	// Total = subtotal - discount + shipping + tax
	total := subtotal
	if order.DiscountAmount != nil {
		total -= order.DiscountAmount.Amount
	}
	if order.ShippingAmount != nil {
		total += order.ShippingAmount.Amount
	}
	total += taxTotal
	order.TotalAmount = &erp.Money{Amount: total, CurrencyId: currency}
	return nil
}
