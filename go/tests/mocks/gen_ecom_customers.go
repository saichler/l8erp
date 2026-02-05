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
	"github.com/saichler/l8erp/go/types/erp"
)

// generateEcomCustomers creates e-commerce customer records
func generateEcomCustomers() []*ecom.EcomCustomer {
	customerTypes := []ecom.EcomCustomerType{
		ecom.EcomCustomerType_ECOM_CUSTOMER_TYPE_REGISTERED,
		ecom.EcomCustomerType_ECOM_CUSTOMER_TYPE_REGISTERED,
		ecom.EcomCustomerType_ECOM_CUSTOMER_TYPE_REGISTERED,
		ecom.EcomCustomerType_ECOM_CUSTOMER_TYPE_VIP,
		ecom.EcomCustomerType_ECOM_CUSTOMER_TYPE_WHOLESALE,
		ecom.EcomCustomerType_ECOM_CUSTOMER_TYPE_GUEST,
	}

	customerGroups := []string{
		"Standard", "Premium", "Wholesale", "VIP", "New Customer",
	}

	locales := []string{"en-US", "en-GB", "es-ES", "fr-FR", "de-DE"}

	customers := make([]*ecom.EcomCustomer, 30)
	for i := 0; i < 30; i++ {
		firstName := firstNames[rand.Intn(len(firstNames))]
		lastName := lastNames[rand.Intn(len(lastNames))]
		email := fmt.Sprintf("%s.%s%d@example.com", sanitizeEmail(firstName), sanitizeEmail(lastName), i+1)

		createdDate := time.Now().AddDate(0, -rand.Intn(24), -rand.Intn(28))
		lastLoginDate := createdDate.Add(time.Duration(rand.Intn(30*24)) * time.Hour)
		if lastLoginDate.After(time.Now()) {
			lastLoginDate = time.Now().Add(-time.Duration(rand.Intn(7*24)) * time.Hour)
		}

		totalOrders := int32(rand.Intn(50))
		totalSpent := int64(totalOrders) * int64(rand.Intn(10000)+5000) // $50-$150 avg per order

		customers[i] = &ecom.EcomCustomer{
			CustomerId:       fmt.Sprintf("ecust-%03d", i+1),
			Email:            email,
			FirstName:        firstName,
			LastName:         lastName,
			Phone:            randomPhone(),
			CustomerType:     customerTypes[i%len(customerTypes)],
			PasswordHash:     fmt.Sprintf("$2a$10$hash%d", rand.Intn(100000)),
			IsActive:         i%10 != 0, // 90% active
			EmailVerified:    i%5 != 0,  // 80% verified
			CreatedDate:      createdDate.Unix(),
			LastLoginDate:    lastLoginDate.Unix(),
			TotalOrders:      totalOrders,
			TotalSpent:       &erp.Money{Amount: totalSpent, CurrencyCode: "USD"},
			CustomerGroup:    customerGroups[i%len(customerGroups)],
			AcceptsMarketing: rand.Intn(2) == 1,
			Locale:           locales[i%len(locales)],
			CurrencyCode:     "USD",
			AuditInfo:        createAuditInfo(),
		}
	}
	return customers
}

// generateEcomAddresses creates customer address records (2 per customer)
func generateEcomAddresses(store *MockDataStore) []*ecom.EcomCustomerAddress {
	addressLabels := []string{"Home", "Work", "Main Office", "Warehouse", "Summer Home"}

	count := len(store.EcomCustomerIDs) * 2
	if count == 0 {
		count = 60 // fallback
	}

	addresses := make([]*ecom.EcomCustomerAddress, count)
	for i := 0; i < count; i++ {
		customerIdx := i / 2
		customerID := ""
		if len(store.EcomCustomerIDs) > 0 {
			customerID = store.EcomCustomerIDs[customerIdx%len(store.EcomCustomerIDs)]
		}

		firstName := firstNames[rand.Intn(len(firstNames))]
		lastName := lastNames[rand.Intn(len(lastNames))]
		isFirst := i%2 == 0

		addresses[i] = &ecom.EcomCustomerAddress{
			AddressId:         fmt.Sprintf("eaddr-%03d", i+1),
			CustomerId:        customerID,
			Label:             addressLabels[i%len(addressLabels)],
			FirstName:         firstName,
			LastName:          lastName,
			Company:           "",
			AddressLine1:      fmt.Sprintf("%d %s", rand.Intn(9000)+100, streetNames[rand.Intn(len(streetNames))]),
			AddressLine2:      "",
			City:              cities[rand.Intn(len(cities))],
			State:             states[rand.Intn(len(states))],
			PostalCode:        fmt.Sprintf("%05d", rand.Intn(90000)+10000),
			Country:           "US",
			Phone:             randomPhone(),
			IsDefaultBilling:  isFirst,
			IsDefaultShipping: isFirst,
			AuditInfo:         createAuditInfo(),
		}

		// Add company for some addresses
		if rand.Intn(3) == 0 {
			addresses[i].Company = customerNames[rand.Intn(len(customerNames))]
		}

		// Add apartment/suite for some addresses
		if rand.Intn(4) == 0 {
			addresses[i].AddressLine2 = fmt.Sprintf("Suite %d", rand.Intn(500)+100)
		}
	}
	return addresses
}

// generateEcomWishlists creates wishlist records (1 per 3 customers)
func generateEcomWishlists(store *MockDataStore) []*ecom.EcomWishlist {
	wishlistNames := []string{
		"My Wishlist", "Gift Ideas", "Birthday List", "Holiday Shopping",
		"Home Decor Ideas", "Tech Gadgets", "Fashion Picks", "Favorites",
	}

	count := len(store.EcomCustomerIDs) / 3
	if count == 0 {
		count = 10 // fallback
	}

	wishlists := make([]*ecom.EcomWishlist, count)
	for i := 0; i < count; i++ {
		customerID := ""
		if len(store.EcomCustomerIDs) > 0 {
			customerID = store.EcomCustomerIDs[(i*3)%len(store.EcomCustomerIDs)]
		}

		createdDate := time.Now().AddDate(0, -rand.Intn(12), -rand.Intn(28))
		updatedDate := createdDate.Add(time.Duration(rand.Intn(30*24)) * time.Hour)
		if updatedDate.After(time.Now()) {
			updatedDate = time.Now()
		}

		wishlists[i] = &ecom.EcomWishlist{
			WishlistId:  fmt.Sprintf("ewish-%03d", i+1),
			CustomerId:  customerID,
			Name:        wishlistNames[i%len(wishlistNames)],
			Description: fmt.Sprintf("A curated list of desired items - %s", wishlistNames[i%len(wishlistNames)]),
			IsPublic:    rand.Intn(3) == 0, // 33% public
			ShareToken:  fmt.Sprintf("share-%s-%d", randomToken(8), i+1),
			CreatedDate: createdDate.Unix(),
			UpdatedDate: updatedDate.Unix(),
			ItemCount:   3, // Will be populated with items
			AuditInfo:   createAuditInfo(),
		}
	}
	return wishlists
}

// generateEcomWishlistItems creates wishlist item records (3 items per wishlist)
func generateEcomWishlistItems(store *MockDataStore) []*ecom.EcomWishlistItem {
	count := len(store.EcomWishlistIDs) * 3
	if count == 0 {
		count = 30 // fallback
	}

	items := make([]*ecom.EcomWishlistItem, count)
	for i := 0; i < count; i++ {
		wishlistIdx := i / 3
		wishlistID := ""
		if len(store.EcomWishlistIDs) > 0 {
			wishlistID = store.EcomWishlistIDs[wishlistIdx%len(store.EcomWishlistIDs)]
		}

		productID := ""
		if len(store.EcomProductIDs) > 0 {
			productID = store.EcomProductIDs[rand.Intn(len(store.EcomProductIDs))]
		}

		variantID := ""
		if len(store.EcomVariantIDs) > 0 {
			variantID = store.EcomVariantIDs[rand.Intn(len(store.EcomVariantIDs))]
		}

		addedDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))

		items[i] = &ecom.EcomWishlistItem{
			ItemId:     fmt.Sprintf("ewitem-%03d", i+1),
			WishlistId: wishlistID,
			ProductId:  productID,
			VariantId:  variantID,
			Quantity:   int32(rand.Intn(3) + 1),
			Notes:      "",
			AddedDate:  addedDate.Unix(),
			PriceWhenAdded: &erp.Money{
				Amount:       int64(rand.Intn(20000) + 1000), // $10-$210
				CurrencyCode: "USD",
			},
			Priority:  int32(rand.Intn(5) + 1), // 1-5 priority
			AuditInfo: createAuditInfo(),
		}

		// Add notes for some items
		if rand.Intn(3) == 0 {
			notes := []string{
				"Want this in blue",
				"Check for sales",
				"Gift for mom",
				"Need before holiday",
				"Compare with similar items",
			}
			items[i].Notes = notes[rand.Intn(len(notes))]
		}
	}
	return items
}

// generateEcomCarts creates shopping cart records
func generateEcomCarts(store *MockDataStore) []*ecom.EcomCart {
	cartStatuses := []ecom.EcomCartStatus{
		ecom.EcomCartStatus_ECOM_CART_STATUS_ACTIVE,
		ecom.EcomCartStatus_ECOM_CART_STATUS_ACTIVE,
		ecom.EcomCartStatus_ECOM_CART_STATUS_ACTIVE,
		ecom.EcomCartStatus_ECOM_CART_STATUS_ACTIVE,
		ecom.EcomCartStatus_ECOM_CART_STATUS_ABANDONED,
		ecom.EcomCartStatus_ECOM_CART_STATUS_ABANDONED,
		ecom.EcomCartStatus_ECOM_CART_STATUS_CONVERTED,
		ecom.EcomCartStatus_ECOM_CART_STATUS_EXPIRED,
	}

	userAgents := []string{
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
		"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
		"Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36",
	}

	carts := make([]*ecom.EcomCart, 15)
	for i := 0; i < 15; i++ {
		customerID := ""
		if len(store.EcomCustomerIDs) > 0 && rand.Intn(4) != 0 { // 75% have customer
			customerID = store.EcomCustomerIDs[rand.Intn(len(store.EcomCustomerIDs))]
		}

		createdDate := time.Now().AddDate(0, 0, -rand.Intn(14))
		updatedDate := createdDate.Add(time.Duration(rand.Intn(24)) * time.Hour)
		expiresAt := createdDate.AddDate(0, 0, 30) // 30-day expiration

		subtotal := int64(rand.Intn(50000) + 5000)   // $50-$550
		discountAmount := int64(0)
		if rand.Intn(3) == 0 {
			discountAmount = subtotal * int64(rand.Intn(20)+5) / 100 // 5-25% discount
		}
		taxAmount := (subtotal - discountAmount) * 8 / 100 // ~8% tax
		total := subtotal - discountAmount + taxAmount

		itemCount := int32(rand.Intn(8) + 1)

		carts[i] = &ecom.EcomCart{
			CartId:         fmt.Sprintf("ecart-%03d", i+1),
			CustomerId:     customerID,
			SessionId:      fmt.Sprintf("sess-%s", randomToken(16)),
			Status:         cartStatuses[i%len(cartStatuses)],
			CreatedDate:    createdDate.Unix(),
			UpdatedDate:    updatedDate.Unix(),
			ExpiresAt:      expiresAt.Unix(),
			Subtotal:       &erp.Money{Amount: subtotal, CurrencyCode: "USD"},
			DiscountAmount: &erp.Money{Amount: discountAmount, CurrencyCode: "USD"},
			TaxAmount:      &erp.Money{Amount: taxAmount, CurrencyCode: "USD"},
			Total:          &erp.Money{Amount: total, CurrencyCode: "USD"},
			CouponCode:     "",
			CurrencyCode:   "USD",
			ItemCount:      itemCount,
			IpAddress:      fmt.Sprintf("192.168.%d.%d", rand.Intn(256), rand.Intn(256)),
			UserAgent:      userAgents[rand.Intn(len(userAgents))],
			AuditInfo:      createAuditInfo(),
		}

		// Add coupon code for some carts
		if discountAmount > 0 && rand.Intn(2) == 0 {
			couponCodes := []string{"SAVE10", "WELCOME15", "SUMMER20", "VIP25", "FLASH30"}
			carts[i].CouponCode = couponCodes[rand.Intn(len(couponCodes))]
		}
	}
	return carts
}

// randomToken generates a random alphanumeric token
func randomToken(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyz0123456789"
	token := make([]byte, length)
	for i := range token {
		token[i] = charset[rand.Intn(len(charset))]
	}
	return string(token)
}
