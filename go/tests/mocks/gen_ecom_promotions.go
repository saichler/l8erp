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

	"github.com/saichler/l8erp/go/types/ecom"
)

// generateEcomPromotions creates promotional campaign records
func generateEcomPromotions(store *MockDataStore) []*ecom.EcomPromotion {
	promotionTypes := []ecom.EcomPromotionType{
		ecom.EcomPromotionType_ECOM_PROMOTION_TYPE_PERCENTAGE,
		ecom.EcomPromotionType_ECOM_PROMOTION_TYPE_FIXED_AMOUNT,
		ecom.EcomPromotionType_ECOM_PROMOTION_TYPE_BUY_X_GET_Y,
		ecom.EcomPromotionType_ECOM_PROMOTION_TYPE_FREE_SHIPPING,
		ecom.EcomPromotionType_ECOM_PROMOTION_TYPE_BUNDLE,
	}

	customerGroups := []string{"All", "VIP", "Gold", "Silver", "New Customer"}

	promotions := make([]*ecom.EcomPromotion, len(ecomPromotionNames))
	for i, name := range ecomPromotionNames {
		startDate := time.Now().AddDate(0, -rand.Intn(3), 0)
		endDate := startDate.AddDate(0, rand.Intn(3)+1, 0)

		// First 6 are active, rest are not
		isActive := i < 6

		// Discount values: for percentage 5-30%, for fixed $5-$50
		var discountValue float64
		promotionType := promotionTypes[i%len(promotionTypes)]
		if promotionType == ecom.EcomPromotionType_ECOM_PROMOTION_TYPE_PERCENTAGE {
			discountValue = float64(rand.Intn(25) + 5)
		} else {
			discountValue = float64(rand.Intn(4500) + 500) // cents: $5-$50
		}

		promotions[i] = &ecom.EcomPromotion{
			PromotionId:      genID("epromo", i),
			Name:             name,
			Description:      fmt.Sprintf("Promotional campaign: %s", name),
			PromotionType:    promotionType,
			DiscountValue:    discountValue,
			MaxDiscount:      randomMoney(store, 1000, 10000),
			MinPurchase:      randomMoney(store, 2500, 5000),
			StartDate:        startDate.Unix(),
			EndDate:          endDate.Unix(),
			IsActive:         isActive,
			UsageLimit:       int32(rand.Intn(1000) + 100),
			UsageCount:       int32(rand.Intn(50)),
			PerCustomerLimit: int32(rand.Intn(5) + 1),
			CustomerGroup:    customerGroups[i%len(customerGroups)],
			Stackable:        i%3 == 0,
			Priority:         int32(i + 1),
			AuditInfo:        createAuditInfo(),
		}
	}
	return promotions
}

// generateEcomCoupons creates discount coupon code records
func generateEcomCoupons(store *MockDataStore) []*ecom.EcomCoupon {
	discountTypes := []ecom.EcomDiscountType{
		ecom.EcomDiscountType_ECOM_DISCOUNT_TYPE_PERCENTAGE,
		ecom.EcomDiscountType_ECOM_DISCOUNT_TYPE_FIXED_AMOUNT,
		ecom.EcomDiscountType_ECOM_DISCOUNT_TYPE_FREE_SHIPPING,
	}

	customerGroups := []string{"All", "VIP", "New Customer", "Returning", "Wholesale"}

	coupons := make([]*ecom.EcomCoupon, len(ecomCouponCodes))
	for i, code := range ecomCouponCodes {
		startDate := time.Now().AddDate(0, -rand.Intn(2), 0)
		endDate := startDate.AddDate(0, rand.Intn(6)+1, 0)

		// First 7 are active, rest are not
		isActive := i < 7

		discountType := discountTypes[i%len(discountTypes)]
		var discountValue float64
		if discountType == ecom.EcomDiscountType_ECOM_DISCOUNT_TYPE_PERCENTAGE {
			discountValue = float64(rand.Intn(40) + 10) // 10-50%
		} else if discountType == ecom.EcomDiscountType_ECOM_DISCOUNT_TYPE_FIXED_AMOUNT {
			discountValue = float64(rand.Intn(4000) + 500) // cents: $5-$45
		} else {
			discountValue = 0 // Free shipping
		}

		// Link some coupons to product categories
		var categoryIds []string
		if len(store.EcomCategoryIDs) > 0 && i%3 == 0 {
			categoryIds = []string{store.EcomCategoryIDs[i%len(store.EcomCategoryIDs)]}
		}

		coupons[i] = &ecom.EcomCoupon{
			CouponId:              genID("ecpn", i),
			Code:                  code,
			Description:           fmt.Sprintf("Coupon: %s - Use code at checkout", code),
			DiscountType:          discountType,
			DiscountValue:         discountValue,
			MaxDiscount:           randomMoney(store, 1000, 5000),
			MinPurchase:           randomMoney(store, 1500, 5000),
			StartDate:             startDate.Unix(),
			EndDate:               endDate.Unix(),
			IsActive:              isActive,
			UsageLimit:            int32(rand.Intn(500) + 50),
			UsageCount:            int32(rand.Intn(30)),
			PerCustomerLimit:      int32(rand.Intn(3) + 1),
			FirstOrderOnly:        i%4 == 0,
			ApplicableCategoryIds: categoryIds,
			CustomerGroup:         customerGroups[i%len(customerGroups)],
			FreeShipping:          discountType == ecom.EcomDiscountType_ECOM_DISCOUNT_TYPE_FREE_SHIPPING,
			AuditInfo:             createAuditInfo(),
		}
	}
	return coupons
}

// generateEcomPriceRules creates dynamic pricing rule records
func generateEcomPriceRules(store *MockDataStore) []*ecom.EcomPriceRule {
	discountTypes := []ecom.EcomDiscountType{
		ecom.EcomDiscountType_ECOM_DISCOUNT_TYPE_PERCENTAGE,
		ecom.EcomDiscountType_ECOM_DISCOUNT_TYPE_FIXED_AMOUNT,
	}

	ruleNames := []string{
		"Bulk Purchase Discount",
		"Weekend Sale",
		"Member Pricing",
		"Clearance Items",
		"Holiday Special",
		"Flash Sale",
		"Volume Discount",
		"Seasonal Price",
	}

	customerGroups := []string{"All", "VIP", "Gold", "Silver", "Wholesale", "Retail", "B2B", "B2C"}

	rules := make([]*ecom.EcomPriceRule, len(ruleNames))
	for i, name := range ruleNames {
		startDate := time.Now().AddDate(0, -rand.Intn(2), 0)
		endDate := startDate.AddDate(0, rand.Intn(4)+1, 0)

		// First 5 are active, rest are not
		isActive := i < 5

		discountType := discountTypes[i%len(discountTypes)]
		var discountValue float64
		if discountType == ecom.EcomDiscountType_ECOM_DISCOUNT_TYPE_PERCENTAGE {
			discountValue = float64(rand.Intn(20) + 5) // 5-25%
		} else {
			discountValue = float64(rand.Intn(3000) + 500) // cents: $5-$35
		}

		// Link some rules to product categories
		var categoryIds []string
		if len(store.EcomCategoryIDs) > 0 && i%2 == 0 {
			categoryIds = []string{store.EcomCategoryIDs[i%len(store.EcomCategoryIDs)]}
		}

		// Some rules apply to all products
		applyToAll := i%4 == 0

		rules[i] = &ecom.EcomPriceRule{
			RuleId:                name[:3] + fmt.Sprintf("-%03d", i+1),
			Name:                  name,
			Description:           fmt.Sprintf("Pricing rule: %s", name),
			DiscountType:          discountType,
			DiscountValue:         discountValue,
			StartDate:             startDate.Unix(),
			EndDate:               endDate.Unix(),
			IsActive:              isActive,
			Priority:              int32(i + 1),
			CustomerGroup:         customerGroups[i%len(customerGroups)],
			MinQuantity:           randomMoney(store, 1, 10),
			MaxQuantity:           randomMoney(store, 50, 100),
			ApplicableCategoryIds: categoryIds,
			ApplyToAll:            applyToAll,
			AuditInfo:             createAuditInfo(),
		}
	}
	return rules
}

// generateEcomShippingMethods creates shipping method records
func generateEcomShippingMethods(store *MockDataStore) []*ecom.EcomShippingMethod {
	methodNames := []string{
		"Standard Ground",
		"Express 2-Day",
		"Next Day Air",
		"Economy",
		"International",
	}

	shippingZones := [][]string{
		{"US-CONT"},
		{"US-CONT", "US-AK", "US-HI"},
		{"US-CONT"},
		{"US-CONT", "CA"},
		{"INTL-EUR", "INTL-ASIA"},
	}

	methods := make([]*ecom.EcomShippingMethod, len(ecomShippingCarriers))
	for i, carrier := range ecomShippingCarriers {
		// Rates increase with speed
		baseRate := int64((5 - i) * 299) // Faster = more expensive
		if baseRate < 299 {
			baseRate = 299
		}

		// Delivery days decrease with speed
		minDays := i + 1
		maxDays := minDays + rand.Intn(3) + 1

		methods[i] = &ecom.EcomShippingMethod{
			MethodId:              genID("eship", i),
			Name:                  methodNames[i%len(methodNames)],
			Description:           fmt.Sprintf("%s shipping via %s", methodNames[i%len(methodNames)], carrier),
			Carrier:               carrier,
			CarrierService:        fmt.Sprintf("%s-%s", carrier, methodNames[i%len(methodNames)]),
			BaseRate:              money(store, baseRate),
			PerItemRate:           randomMoney(store, 50, 200),
			PerWeightRate:         randomMoney(store, 25, 100),
			FreeShippingThreshold: randomMoney(store, 4900, 5000),
			MinDeliveryDays:       int32(minDays),
			MaxDeliveryDays:       int32(maxDays),
			IsActive:              true,
			ApplicableZones:       shippingZones[i%len(shippingZones)],
			MinOrderAmount:        money(store, 0),
			MaxOrderAmount:        randomMoney(store, 50000, 100000),
			MaxWeight:             float64(rand.Intn(100) + 50),
			SortOrder:             int32(i + 1),
			TrackingAvailable:     true,
			AuditInfo:             createAuditInfo(),
		}
	}
	return methods
}

// generateEcomPaymentMethods creates payment method records
func generateEcomPaymentMethods(store *MockDataStore) []*ecom.EcomPaymentMethod {
	methodNames := []string{
		"Credit Card",
		"PayPal",
		"Apple Pay",
		"Google Pay",
		"Bank Transfer",
	}

	currencies := [][]string{
		{"USD", "EUR", "GBP", "CAD"},
		{"USD", "EUR", "GBP", "CAD", "AUD"},
		{"USD", "EUR", "GBP"},
		{"USD", "EUR", "GBP"},
		{"USD", "EUR"},
	}

	countries := [][]string{
		{"US", "CA", "GB", "DE", "FR"},
		{"US", "CA", "GB", "DE", "FR", "AU", "NZ"},
		{"US", "GB", "CA"},
		{"US", "GB", "CA", "DE"},
		{"US", "CA"},
	}

	feePercents := []float64{2.9, 2.9, 3.0, 2.5, 1.5}
	feeFixed := []int64{30, 30, 30, 25, 0}

	methods := make([]*ecom.EcomPaymentMethod, len(ecomPaymentProviders))
	for i, provider := range ecomPaymentProviders {
		methods[i] = &ecom.EcomPaymentMethod{
			MethodId:               genID("epay", i),
			Name:                   methodNames[i%len(methodNames)],
			Description:            fmt.Sprintf("Pay securely with %s via %s", methodNames[i%len(methodNames)], provider),
			Provider:               provider,
			ProviderConfig:         fmt.Sprintf("{\"api_version\": \"2024-01\", \"sandbox\": false}"),
			IsActive:               true,
			IsTestMode:             false,
			SupportedCurrencies:    currencies[i%len(currencies)],
			SupportedCountries:     countries[i%len(countries)],
			MinAmount:              money(store, 100),
			MaxAmount:              randomMoney(store, 10000000, 100000000),
			TransactionFeePercent:  feePercents[i%len(feePercents)],
			TransactionFeeFixed:    money(store, feeFixed[i%len(feeFixed)]),
			SortOrder:              int32(i + 1),
			IconUrl:                fmt.Sprintf("/assets/payment/%s.svg", provider),
			Instructions:           fmt.Sprintf("Complete your payment using %s", methodNames[i%len(methodNames)]),
			RequiresBillingAddress: i < 3, // Credit card, PayPal, Apple Pay require billing address
			SupportsRefunds:        true,
			SupportsPartialRefunds: i < 4, // Most support partial refunds
			AuditInfo:              createAuditInfo(),
		}
	}
	return methods
}
