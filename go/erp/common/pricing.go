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
package common

import (
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// FindActivePriceListForItem returns the best price for an item from active price lists.
// It checks price list entries and applies quantity breaks if applicable.
func FindActivePriceListForItem(itemId string, quantity float64, vnic ifs.IVNic) (*erp.Money, error) {
	priceLists, err := GetEntities("PriceList", 60, &sales.SalesPriceList{}, vnic)
	if err != nil {
		return nil, err
	}
	now := time.Now().Unix()
	var bestPrice *erp.Money
	for _, pl := range priceLists {
		if int32(pl.Status) != 2 { // ACTIVE
			continue
		}
		if pl.EffectiveDate > 0 && pl.EffectiveDate > now {
			continue
		}
		if pl.ExpiryDate > 0 && pl.ExpiryDate < now {
			continue
		}
		// Check quantity breaks first (more specific)
		if price := findQuantityBreakPrice(pl.QuantityBreaks, itemId, quantity); price != nil {
			return price, nil
		}
		// Check standard entries
		if price := findEntryPrice(pl.Entries, itemId, quantity, now); price != nil {
			bestPrice = price
		}
	}
	return bestPrice, nil
}

// findQuantityBreakPrice finds the applicable quantity break price for an item.
func findQuantityBreakPrice(breaks []*sales.SalesQuantityBreak, itemId string, qty float64) *erp.Money {
	for _, qb := range breaks {
		if qb.ItemId != itemId {
			continue
		}
		if qty >= qb.FromQuantity && (qb.ToQuantity == 0 || qty <= qb.ToQuantity) {
			if qb.UnitPrice != nil {
				return qb.UnitPrice
			}
		}
	}
	return nil
}

// findEntryPrice finds the applicable price list entry for an item.
func findEntryPrice(entries []*sales.SalesPriceListEntry, itemId string, qty float64, now int64) *erp.Money {
	for _, entry := range entries {
		if entry.ItemId != itemId {
			continue
		}
		if entry.EffectiveDate > 0 && entry.EffectiveDate > now {
			continue
		}
		if entry.ExpiryDate > 0 && entry.ExpiryDate < now {
			continue
		}
		if entry.MinimumQuantity > 0 && qty < entry.MinimumQuantity {
			continue
		}
		if entry.UnitPrice != nil {
			return entry.UnitPrice
		}
	}
	return nil
}

// ApplyDiscountRules finds and applies the best applicable discount for a customer/item.
func ApplyDiscountRules(basePrice *erp.Money, customerId, itemId string, vnic ifs.IVNic) (*erp.Money, error) {
	if basePrice == nil || basePrice.Amount == 0 {
		return nil, nil
	}
	rules, err := GetEntities("DiscntRule", 60, &sales.SalesDiscountRule{}, vnic)
	if err != nil {
		return nil, err
	}
	now := time.Now().Unix()
	bestDiscount := int64(0)
	for _, rule := range rules {
		if !rule.IsActive {
			continue
		}
		if rule.EffectiveDate > 0 && rule.EffectiveDate > now {
			continue
		}
		if rule.ExpiryDate > 0 && rule.ExpiryDate < now {
			continue
		}
		if !matchesCustomer(rule.CustomerIds, customerId) && !matchesItem(rule.ItemIds, itemId) {
			continue
		}
		disc := calculateDiscount(basePrice.Amount, rule)
		if disc > bestDiscount {
			bestDiscount = disc
		}
	}
	if bestDiscount == 0 {
		return nil, nil
	}
	return &erp.Money{Amount: bestDiscount, CurrencyId: basePrice.CurrencyId}, nil
}

func matchesCustomer(ids []string, customerId string) bool {
	if len(ids) == 0 {
		return true // applies to all customers
	}
	for _, id := range ids {
		if id == customerId {
			return true
		}
	}
	return false
}

func matchesItem(ids []string, itemId string) bool {
	if len(ids) == 0 {
		return true // applies to all items
	}
	for _, id := range ids {
		if id == itemId {
			return true
		}
	}
	return false
}

func calculateDiscount(baseAmount int64, rule *sales.SalesDiscountRule) int64 {
	switch int32(rule.DiscountType) {
	case 1: // PERCENTAGE
		return int64(float64(baseAmount) * rule.DiscountValue / 100)
	case 2: // FIXED_AMOUNT
		return int64(rule.DiscountValue * 100) // convert to cents
	}
	return 0
}
