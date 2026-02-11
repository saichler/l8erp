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

	"github.com/saichler/l8erp/go/types/sales"
)

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
			DiscountValue:   float64(rand.Intn(20) + 5),
			MinimumAmount:   float64(rand.Intn(10000) + 1000),
			MinimumQuantity: float64(rand.Intn(10) + 1),
			AppliesTo:       "ALL",
			CustomerIds:     customerIds,
			ItemIds:         itemIds,
			EffectiveDate:   effectiveDate.Unix(),
			ExpiryDate:      expiryDate.Unix(),
			IsActive:        i < 6,
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
		promoPrice := originalPrice * int64(100-rand.Intn(30)-5) / 100

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
			IsActive:         i < 5,
			PromoCode:        fmt.Sprintf("PROMO%04d", rand.Intn(9000)+1000),
			AuditInfo:        createAuditInfo(),
		}
	}
	return promotions
}
