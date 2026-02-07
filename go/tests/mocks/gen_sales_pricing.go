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

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

// generateSalesPriceListEntries creates price list entry records (3 per price list)
func generateSalesPriceListEntries(store *MockDataStore) []*sales.SalesPriceListEntry {
	count := len(store.SalesPriceListIDs) * 3
	if count == 0 {
		count = 24
	}

	entries := make([]*sales.SalesPriceListEntry, 0, count)
	idx := 1
	for _, priceListID := range store.SalesPriceListIDs {
		for j := 0; j < 3; j++ {
			itemID := pickRef(store.ItemIDs, (idx-1))

			effectiveDate := time.Now().AddDate(0, -rand.Intn(3), 0)
			expiryDate := effectiveDate.AddDate(0, 6, 0)

			entries = append(entries, &sales.SalesPriceListEntry{
				EntryId:     fmt.Sprintf("sple-%03d", idx),
				PriceListId: priceListID,
				ItemId:      itemID,
				UnitPrice: &erp.Money{
					Amount:       int64(rand.Intn(500000) + 5000), // $50 - $5000
					CurrencyId: pickRef(store.CurrencyIDs, idx),
				},
				UnitOfMeasure:   "EA",
				MinimumQuantity: float64(rand.Intn(10) + 1),
				EffectiveDate:   effectiveDate.Unix(),
				ExpiryDate:      expiryDate.Unix(),
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return entries
}

// generateSalesCustomerPrices creates customer-specific price records
func generateSalesCustomerPrices(store *MockDataStore) []*sales.SalesCustomerPrice {
	count := minInt(20, len(store.CustomerIDs)*2)
	if count == 0 {
		count = 20
	}

	prices := make([]*sales.SalesCustomerPrice, count)
	for i := 0; i < count; i++ {
		customerID := pickRef(store.CustomerIDs, i)

		itemID := pickRef(store.ItemIDs, i)

		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0)

		prices[i] = &sales.SalesCustomerPrice{
			CustomerPriceId: genID("scpr", i),
			CustomerId:      customerID,
			ItemId:          itemID,
			UnitPrice: &erp.Money{
				Amount:       int64(rand.Intn(400000) + 4000), // Discounted price
				CurrencyId: pickRef(store.CurrencyIDs, i),
			},
			CurrencyId: pickRef(store.CurrencyIDs, i),
			MinimumQuantity: float64(rand.Intn(5) + 1),
			EffectiveDate:   effectiveDate.Unix(),
			ExpiryDate:      expiryDate.Unix(),
			AuditInfo:       createAuditInfo(),
		}
	}
	return prices
}

// generateSalesDiscountRules creates discount rule records
func generateSalesDiscountRules(store *MockDataStore) []*sales.SalesDiscountRule {
	discountTypes := []sales.SalesDiscountType{
		sales.SalesDiscountType_DISCOUNT_TYPE_PERCENTAGE,
		sales.SalesDiscountType_DISCOUNT_TYPE_FIXED_AMOUNT,
		sales.SalesDiscountType_DISCOUNT_TYPE_BUY_X_GET_Y,
		sales.SalesDiscountType_DISCOUNT_TYPE_TIERED,
	}

	count := len(salesDiscountNames)
	rules := make([]*sales.SalesDiscountRule, count)
	for i := 0; i < count; i++ {
		effectiveDate := time.Now().AddDate(0, -rand.Intn(3), 0)
		expiryDate := effectiveDate.AddDate(0, 6, 0)

		// Add some customer and item references
		var customerIds []string
		var itemIds []string
		if len(store.CustomerIDs) > 0 && i%3 == 0 {
			customerIds = []string{store.CustomerIDs[i%len(store.CustomerIDs)]}
		}
		if len(store.ItemIDs) > 0 && i%2 == 0 {
			itemIds = []string{store.ItemIDs[i%len(store.ItemIDs)]}
		}

		rules[i] = &sales.SalesDiscountRule{
			RuleId:          genID("sdr", i),
			Name:            salesDiscountNames[i],
			Description:     fmt.Sprintf("Discount rule: %s", salesDiscountNames[i]),
			DiscountType:    discountTypes[i%len(discountTypes)],
			DiscountValue:   float64(rand.Intn(20) + 5), // 5-25% or $5-$25
			MinimumAmount:   float64(rand.Intn(10000) + 1000),
			MinimumQuantity: float64(rand.Intn(10) + 1),
			AppliesTo:       "ALL",
			CustomerIds:     customerIds,
			ItemIds:         itemIds,
			EffectiveDate:   effectiveDate.Unix(),
			ExpiryDate:      expiryDate.Unix(),
			IsActive:        i < 6, // First 6 are active
			Priority:        int32(i + 1),
			IsCombinable:    i%2 == 0,
			AuditInfo:       createAuditInfo(),
		}
	}
	return rules
}

// generateSalesPromotionalPrices creates promotional price records
func generateSalesPromotionalPrices(store *MockDataStore) []*sales.SalesPromotionalPrice {
	count := len(salesPromotionNames)
	promotions := make([]*sales.SalesPromotionalPrice, count)
	for i := 0; i < count; i++ {
		itemID := pickRef(store.ItemIDs, i)

		startDate := time.Now().AddDate(0, -rand.Intn(3), 0)
		endDate := startDate.AddDate(0, rand.Intn(3)+1, 0)

		originalPrice := int64(rand.Intn(500000) + 10000)
		promoPrice := originalPrice * int64(100-rand.Intn(30)-5) / 100 // 5-35% off

		promotions[i] = &sales.SalesPromotionalPrice{
			PromoId:          genID("spromo", i),
			Name:             salesPromotionNames[i],
			Description:      fmt.Sprintf("Promotional campaign: %s", salesPromotionNames[i]),
			ItemId:           itemID,
			PromotionalPrice: money(store, promoPrice),
			OriginalPrice:    money(store, originalPrice),
			StartDate:        startDate.Unix(),
			EndDate:          endDate.Unix(),
			MaxQuantity:      float64(rand.Intn(1000) + 100),
			QuantitySold:     float64(rand.Intn(50)),
			IsActive:         i < 5, // First 5 are active
			PromoCode:        fmt.Sprintf("PROMO%04d", rand.Intn(9000)+1000),
			AuditInfo:        createAuditInfo(),
		}
	}
	return promotions
}

// generateSalesQuantityBreaks creates quantity break pricing records
func generateSalesQuantityBreaks(store *MockDataStore) []*sales.SalesQuantityBreak {
	// Create 3 quantity breaks per price list
	count := len(store.SalesPriceListIDs) * 3
	if count == 0 {
		count = 24
	}

	breaks := make([]*sales.SalesQuantityBreak, 0, count)
	idx := 1
	for _, priceListID := range store.SalesPriceListIDs {
		itemID := pickRef(store.ItemIDs, idx)

		// Create tiered quantity breaks
		basePrice := int64(rand.Intn(100000) + 10000) // $100 - $1100 base price

		// Tier 1: 1-10 units
		breaks = append(breaks, &sales.SalesQuantityBreak{
			BreakId:         fmt.Sprintf("sqb-%03d", idx),
			PriceListId:     priceListID,
			ItemId:          itemID,
			FromQuantity:    1,
			ToQuantity:      10,
			UnitPrice:       money(store, basePrice),
			DiscountPercent: 0,
			AuditInfo:       createAuditInfo(),
		})
		idx++

		// Tier 2: 11-50 units (10% off)
		breaks = append(breaks, &sales.SalesQuantityBreak{
			BreakId:         fmt.Sprintf("sqb-%03d", idx),
			PriceListId:     priceListID,
			ItemId:          itemID,
			FromQuantity:    11,
			ToQuantity:      50,
			UnitPrice:       money(store, basePrice * 90 / 100),
			DiscountPercent: 10,
			AuditInfo:       createAuditInfo(),
		})
		idx++

		// Tier 3: 51+ units (20% off)
		breaks = append(breaks, &sales.SalesQuantityBreak{
			BreakId:         fmt.Sprintf("sqb-%03d", idx),
			PriceListId:     priceListID,
			ItemId:          itemID,
			FromQuantity:    51,
			ToQuantity:      9999,
			UnitPrice:       money(store, basePrice * 80 / 100),
			DiscountPercent: 20,
			AuditInfo:       createAuditInfo(),
		})
		idx++
	}
	return breaks
}
