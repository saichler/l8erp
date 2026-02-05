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

	"github.com/saichler/l8erp/go/types/ecom"
)

// ECOM Phase 1: Catalog Foundation (Categories, Attributes)
func generateEcomPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Categories
	fmt.Printf("  Creating E-Commerce Categories...")
	categories := generateEcomCategories()
	if err := client.post("/erp/100/EcomCat", &ecom.EcomCategoryList{Items: categories}); err != nil {
		return fmt.Errorf("categories: %w", err)
	}
	for _, cat := range categories {
		store.EcomCategoryIDs = append(store.EcomCategoryIDs, cat.CategoryId)
	}
	fmt.Printf(" %d created\n", len(categories))

	// Generate Attributes
	fmt.Printf("  Creating E-Commerce Attributes...")
	attributes := generateEcomAttributes()
	if err := client.post("/erp/100/EcomAttr", &ecom.EcomAttributeList{Items: attributes}); err != nil {
		return fmt.Errorf("attributes: %w", err)
	}
	for _, attr := range attributes {
		store.EcomAttributeIDs = append(store.EcomAttributeIDs, attr.AttributeId)
	}
	fmt.Printf(" %d created\n", len(attributes))

	return nil
}

// ECOM Phase 2: Products
func generateEcomPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Products
	fmt.Printf("  Creating E-Commerce Products...")
	products := generateEcomProducts(store)
	if err := client.post("/erp/100/EcomProd", &ecom.EcomProductList{Items: products}); err != nil {
		return fmt.Errorf("products: %w", err)
	}
	for _, prod := range products {
		store.EcomProductIDs = append(store.EcomProductIDs, prod.ProductId)
	}
	fmt.Printf(" %d created\n", len(products))

	// Generate Images
	fmt.Printf("  Creating E-Commerce Product Images...")
	images := generateEcomImages(store)
	if err := client.post("/erp/100/EcomImage", &ecom.EcomImageList{Items: images}); err != nil {
		return fmt.Errorf("images: %w", err)
	}
	for _, img := range images {
		store.EcomImageIDs = append(store.EcomImageIDs, img.ImageId)
	}
	fmt.Printf(" %d created\n", len(images))

	// Generate Variants
	fmt.Printf("  Creating E-Commerce Product Variants...")
	variants := generateEcomVariants(store)
	if err := client.post("/erp/100/EcomVar", &ecom.EcomVariantList{Items: variants}); err != nil {
		return fmt.Errorf("variants: %w", err)
	}
	for _, v := range variants {
		store.EcomVariantIDs = append(store.EcomVariantIDs, v.VariantId)
	}
	fmt.Printf(" %d created\n", len(variants))

	return nil
}

// ECOM Phase 3: Customers
func generateEcomPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Customers
	fmt.Printf("  Creating E-Commerce Customers...")
	customers := generateEcomCustomers()
	if err := client.post("/erp/100/EcomCust", &ecom.EcomCustomerList{Items: customers}); err != nil {
		return fmt.Errorf("customers: %w", err)
	}
	for _, cust := range customers {
		store.EcomCustomerIDs = append(store.EcomCustomerIDs, cust.CustomerId)
	}
	fmt.Printf(" %d created\n", len(customers))

	// Generate Addresses
	fmt.Printf("  Creating E-Commerce Customer Addresses...")
	addresses := generateEcomAddresses(store)
	if err := client.post("/erp/100/EcomAddr", &ecom.EcomCustomerAddressList{Items: addresses}); err != nil {
		return fmt.Errorf("addresses: %w", err)
	}
	for _, addr := range addresses {
		store.EcomAddressIDs = append(store.EcomAddressIDs, addr.AddressId)
	}
	fmt.Printf(" %d created\n", len(addresses))

	// Generate Wishlists
	fmt.Printf("  Creating E-Commerce Wishlists...")
	wishlists := generateEcomWishlists(store)
	if err := client.post("/erp/100/EcomWish", &ecom.EcomWishlistList{Items: wishlists}); err != nil {
		return fmt.Errorf("wishlists: %w", err)
	}
	for _, wl := range wishlists {
		store.EcomWishlistIDs = append(store.EcomWishlistIDs, wl.WishlistId)
	}
	fmt.Printf(" %d created\n", len(wishlists))

	// Generate Wishlist Items
	fmt.Printf("  Creating E-Commerce Wishlist Items...")
	wishlistItems := generateEcomWishlistItems(store)
	if err := client.post("/erp/100/EcomWishIt", &ecom.EcomWishlistItemList{Items: wishlistItems}); err != nil {
		return fmt.Errorf("wishlist items: %w", err)
	}
	for _, item := range wishlistItems {
		store.EcomWishItemIDs = append(store.EcomWishItemIDs, item.ItemId)
	}
	fmt.Printf(" %d created\n", len(wishlistItems))

	// Generate Carts
	fmt.Printf("  Creating E-Commerce Shopping Carts...")
	carts := generateEcomCarts(store)
	if err := client.post("/erp/100/EcomCart", &ecom.EcomCartList{Items: carts}); err != nil {
		return fmt.Errorf("carts: %w", err)
	}
	for _, cart := range carts {
		store.EcomCartIDs = append(store.EcomCartIDs, cart.CartId)
	}
	fmt.Printf(" %d created\n", len(carts))

	return nil
}

// ECOM Phase 4: Promotions & Methods
func generateEcomPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Promotions
	fmt.Printf("  Creating E-Commerce Promotions...")
	promotions := generateEcomPromotions()
	if err := client.post("/erp/100/EcomPromo", &ecom.EcomPromotionList{Items: promotions}); err != nil {
		return fmt.Errorf("promotions: %w", err)
	}
	for _, promo := range promotions {
		store.EcomPromotionIDs = append(store.EcomPromotionIDs, promo.PromotionId)
	}
	fmt.Printf(" %d created\n", len(promotions))

	// Generate Coupons
	fmt.Printf("  Creating E-Commerce Coupons...")
	coupons := generateEcomCoupons(store)
	if err := client.post("/erp/100/EcomCoupon", &ecom.EcomCouponList{Items: coupons}); err != nil {
		return fmt.Errorf("coupons: %w", err)
	}
	for _, cpn := range coupons {
		store.EcomCouponIDs = append(store.EcomCouponIDs, cpn.CouponId)
	}
	fmt.Printf(" %d created\n", len(coupons))

	// Generate Price Rules
	fmt.Printf("  Creating E-Commerce Price Rules...")
	priceRules := generateEcomPriceRules(store)
	if err := client.post("/erp/100/EcomPrcRl", &ecom.EcomPriceRuleList{Items: priceRules}); err != nil {
		return fmt.Errorf("price rules: %w", err)
	}
	for _, rule := range priceRules {
		store.EcomPriceRuleIDs = append(store.EcomPriceRuleIDs, rule.RuleId)
	}
	fmt.Printf(" %d created\n", len(priceRules))

	// Generate Shipping Methods
	fmt.Printf("  Creating E-Commerce Shipping Methods...")
	shippingMethods := generateEcomShippingMethods()
	if err := client.post("/erp/100/EcomShip", &ecom.EcomShippingMethodList{Items: shippingMethods}); err != nil {
		return fmt.Errorf("shipping methods: %w", err)
	}
	for _, sm := range shippingMethods {
		store.EcomShippingIDs = append(store.EcomShippingIDs, sm.MethodId)
	}
	fmt.Printf(" %d created\n", len(shippingMethods))

	// Generate Payment Methods
	fmt.Printf("  Creating E-Commerce Payment Methods...")
	paymentMethods := generateEcomPaymentMethods()
	if err := client.post("/erp/100/EcomPay", &ecom.EcomPaymentMethodList{Items: paymentMethods}); err != nil {
		return fmt.Errorf("payment methods: %w", err)
	}
	for _, pm := range paymentMethods {
		store.EcomPaymentIDs = append(store.EcomPaymentIDs, pm.MethodId)
	}
	fmt.Printf(" %d created\n", len(paymentMethods))

	return nil
}

// ECOM Phase 5: Orders
func generateEcomPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Orders
	fmt.Printf("  Creating E-Commerce Orders...")
	orders := generateEcomOrders(store)
	if err := client.post("/erp/100/EcomOrder", &ecom.EcomOrderList{Items: orders}); err != nil {
		return fmt.Errorf("orders: %w", err)
	}
	for _, ord := range orders {
		store.EcomOrderIDs = append(store.EcomOrderIDs, ord.OrderId)
	}
	fmt.Printf(" %d created\n", len(orders))

	// Generate Order Lines
	fmt.Printf("  Creating E-Commerce Order Lines...")
	orderLines := generateEcomOrderLines(store)
	if err := client.post("/erp/100/EcomOrdLn", &ecom.EcomOrderLineList{Items: orderLines}); err != nil {
		return fmt.Errorf("order lines: %w", err)
	}
	for _, line := range orderLines {
		store.EcomOrderLineIDs = append(store.EcomOrderLineIDs, line.LineId)
	}
	fmt.Printf(" %d created\n", len(orderLines))

	// Generate Order Status History
	fmt.Printf("  Creating E-Commerce Order Status History...")
	orderStatuses := generateEcomOrderStatuses(store)
	if err := client.post("/erp/100/EcomOrdSts", &ecom.EcomOrderStatusHistoryList{Items: orderStatuses}); err != nil {
		return fmt.Errorf("order statuses: %w", err)
	}
	for _, status := range orderStatuses {
		store.EcomOrderStatusIDs = append(store.EcomOrderStatusIDs, status.StatusId)
	}
	fmt.Printf(" %d created\n", len(orderStatuses))

	// Generate Returns
	fmt.Printf("  Creating E-Commerce Returns...")
	returns := generateEcomReturns(store)
	if err := client.post("/erp/100/EcomReturn", &ecom.EcomReturnList{Items: returns}); err != nil {
		return fmt.Errorf("returns: %w", err)
	}
	for _, ret := range returns {
		store.EcomReturnIDs = append(store.EcomReturnIDs, ret.ReturnId)
	}
	fmt.Printf(" %d created\n", len(returns))

	// Generate Return Lines
	fmt.Printf("  Creating E-Commerce Return Lines...")
	returnLines := generateEcomReturnLines(store)
	if err := client.post("/erp/100/EcomRetLn", &ecom.EcomReturnLineList{Items: returnLines}); err != nil {
		return fmt.Errorf("return lines: %w", err)
	}
	for _, line := range returnLines {
		store.EcomReturnLineIDs = append(store.EcomReturnLineIDs, line.LineId)
	}
	fmt.Printf(" %d created\n", len(returnLines))

	return nil
}
