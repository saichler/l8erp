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

	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8erp/go/types/erp"
)

// generateEcomCustomers creates e-commerce customer records
func generateEcomCustomers(store *MockDataStore) []*ecom.EcomCustomer {
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

		// Generate 2 embedded addresses per customer
		addressLabels := []string{"Home", "Work", "Main Office", "Warehouse", "Summer Home"}
		addrList := make([]*ecom.EcomCustomerAddress, 2)
		for j := 0; j < 2; j++ {
			aFirst := firstNames[rand.Intn(len(firstNames))]
			aLast := lastNames[rand.Intn(len(lastNames))]
			addrList[j] = &ecom.EcomCustomerAddress{
				AddressId:         genID("eaddr", i*2+j),
				Label:             addressLabels[(i*2+j)%len(addressLabels)],
				FirstName:         aFirst,
				LastName:          aLast,
				AddressLine1:      fmt.Sprintf("%d %s", rand.Intn(9000)+100, streetNames[rand.Intn(len(streetNames))]),
				City:              cities[rand.Intn(len(cities))],
				State:             states[rand.Intn(len(states))],
				PostalCode:        fmt.Sprintf("%05d", rand.Intn(90000)+10000),
				Country:           "US",
				Phone:             randomPhone(),
				IsDefaultBilling:  j == 0,
				IsDefaultShipping: j == 0,
				AuditInfo:         createAuditInfo(),
			}
		}

		customers[i] = &ecom.EcomCustomer{
			CustomerId:       genID("ecust", i),
			Email:            email,
			FirstName:        firstName,
			LastName:         lastName,
			Phone:            randomPhone(),
			CustomerType:     customerTypes[i%len(customerTypes)],
			PasswordHash:     fmt.Sprintf("$2a$10$hash%d", rand.Intn(100000)),
			IsActive:         i%10 != 0,
			EmailVerified:    i%5 != 0,
			CreatedDate:      createdDate.Unix(),
			LastLoginDate:    lastLoginDate.Unix(),
			TotalOrders:      totalOrders,
			TotalSpent:       money(store, totalSpent),
			CustomerGroup:    customerGroups[i%len(customerGroups)],
			AcceptsMarketing: rand.Intn(2) == 1,
			Locale:           locales[i%len(locales)],
			CurrencyId:       pickRef(store.CurrencyIDs, i),
			AuditInfo:        createAuditInfo(),
			Addresses:        addrList,
		}
	}
	return customers
}

// generateEcomWishlists creates wishlist records with embedded items (1 per 3 customers)
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
		customerID := pickRef(store.EcomCustomerIDs, (i*3))

		createdDate := time.Now().AddDate(0, -rand.Intn(12), -rand.Intn(28))
		updatedDate := createdDate.Add(time.Duration(rand.Intn(30*24)) * time.Hour)
		if updatedDate.After(time.Now()) {
			updatedDate = time.Now()
		}

		// Generate 3 embedded wishlist items
		wishItems := make([]*ecom.EcomWishlistItem, 3)
		for j := 0; j < 3; j++ {
			productID := pickRef(store.EcomProductIDs, (i*3 + j))
			addedDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
			wishItems[j] = &ecom.EcomWishlistItem{
				ItemId:    genID("ewitem", i*3+j),
				ProductId: productID,
				Quantity:  int32(rand.Intn(3) + 1),
				AddedDate: addedDate.Unix(),
				PriceWhenAdded: &erp.Money{
					Amount:     int64(rand.Intn(20000) + 1000),
					CurrencyId: pickRef(store.CurrencyIDs, i*3+j),
				},
				Priority:  int32(rand.Intn(5) + 1),
				AuditInfo: createAuditInfo(),
			}
		}

		wishlists[i] = &ecom.EcomWishlist{
			WishlistId:  genID("ewish", i),
			CustomerId:  customerID,
			Name:        wishlistNames[i%len(wishlistNames)],
			Description: fmt.Sprintf("A curated list of desired items - %s", wishlistNames[i%len(wishlistNames)]),
			IsPublic:    rand.Intn(3) == 0,
			ShareToken:  fmt.Sprintf("share-%s-%d", randomToken(8), i+1),
			CreatedDate: createdDate.Unix(),
			UpdatedDate: updatedDate.Unix(),
			ItemCount:   3,
			AuditInfo:   createAuditInfo(),
			Items:       wishItems,
		}
	}
	return wishlists
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
			CartId:         genID("ecart", i),
			CustomerId:     customerID,
			SessionId:      fmt.Sprintf("sess-%s", randomToken(16)),
			Status:         cartStatuses[i%len(cartStatuses)],
			CreatedDate:    createdDate.Unix(),
			UpdatedDate:    updatedDate.Unix(),
			ExpiresAt:      expiresAt.Unix(),
			Subtotal:       money(store, subtotal),
			DiscountAmount: money(store, discountAmount),
			TaxAmount:      money(store, taxAmount),
			Total:          money(store, total),
			CouponCode:     "",
			CurrencyId: pickRef(store.CurrencyIDs, i),
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
