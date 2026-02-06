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

	"github.com/saichler/l8erp/go/types/ecom"
)

// ECOM Phase 1: Catalog Foundation (Categories, Attributes)
func generateEcomPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Categories
	categories := generateEcomCategories()
	if err := runOp(client, "E-Commerce Categories", "/erp/100/EcomCat", &ecom.EcomCategoryList{List: categories}, extractIDs(categories, func(e *ecom.EcomCategory) string { return e.CategoryId }), &store.EcomCategoryIDs); err != nil {
		return err
	}

	// Generate Attributes
	attributes := generateEcomAttributes()
	if err := runOp(client, "E-Commerce Attributes", "/erp/100/EcomAttr", &ecom.EcomAttributeList{List: attributes}, extractIDs(attributes, func(e *ecom.EcomAttribute) string { return e.AttributeId }), &store.EcomAttributeIDs); err != nil {
		return err
	}

	return nil
}

// ECOM Phase 2: Products
func generateEcomPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Products
	products := generateEcomProducts(store)
	if err := runOp(client, "E-Commerce Products", "/erp/100/EcomProd", &ecom.EcomProductList{List: products}, extractIDs(products, func(e *ecom.EcomProduct) string { return e.ProductId }), &store.EcomProductIDs); err != nil {
		return err
	}

	// Generate Images
	images := generateEcomImages(store)
	if err := runOp(client, "E-Commerce Product Images", "/erp/100/EcomImage", &ecom.EcomImageList{List: images}, extractIDs(images, func(e *ecom.EcomImage) string { return e.ImageId }), &store.EcomImageIDs); err != nil {
		return err
	}

	// Generate Variants
	variants := generateEcomVariants(store)
	if err := runOp(client, "E-Commerce Product Variants", "/erp/100/EcomVar", &ecom.EcomVariantList{List: variants}, extractIDs(variants, func(e *ecom.EcomVariant) string { return e.VariantId }), &store.EcomVariantIDs); err != nil {
		return err
	}

	return nil
}

// ECOM Phase 3: Customers
func generateEcomPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Customers
	customers := generateEcomCustomers()
	if err := runOp(client, "E-Commerce Customers", "/erp/100/EcomCust", &ecom.EcomCustomerList{List: customers}, extractIDs(customers, func(e *ecom.EcomCustomer) string { return e.CustomerId }), &store.EcomCustomerIDs); err != nil {
		return err
	}

	// Generate Addresses
	addresses := generateEcomAddresses(store)
	if err := runOp(client, "E-Commerce Customer Addresses", "/erp/100/EcomAddr", &ecom.EcomCustomerAddressList{List: addresses}, extractIDs(addresses, func(e *ecom.EcomCustomerAddress) string { return e.AddressId }), &store.EcomAddressIDs); err != nil {
		return err
	}

	// Generate Wishlists
	wishlists := generateEcomWishlists(store)
	if err := runOp(client, "E-Commerce Wishlists", "/erp/100/EcomWish", &ecom.EcomWishlistList{List: wishlists}, extractIDs(wishlists, func(e *ecom.EcomWishlist) string { return e.WishlistId }), &store.EcomWishlistIDs); err != nil {
		return err
	}

	// Generate Wishlist Items
	wishlistItems := generateEcomWishlistItems(store)
	if err := runOp(client, "E-Commerce Wishlist Items", "/erp/100/EcomWishIt", &ecom.EcomWishlistItemList{List: wishlistItems}, extractIDs(wishlistItems, func(e *ecom.EcomWishlistItem) string { return e.ItemId }), &store.EcomWishItemIDs); err != nil {
		return err
	}

	// Generate Carts
	carts := generateEcomCarts(store)
	if err := runOp(client, "E-Commerce Shopping Carts", "/erp/100/EcomCart", &ecom.EcomCartList{List: carts}, extractIDs(carts, func(e *ecom.EcomCart) string { return e.CartId }), &store.EcomCartIDs); err != nil {
		return err
	}

	return nil
}

// ECOM Phase 4: Promotions & Methods
func generateEcomPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Promotions
	promotions := generateEcomPromotions()
	if err := runOp(client, "E-Commerce Promotions", "/erp/100/EcomPromo", &ecom.EcomPromotionList{List: promotions}, extractIDs(promotions, func(e *ecom.EcomPromotion) string { return e.PromotionId }), &store.EcomPromotionIDs); err != nil {
		return err
	}

	// Generate Coupons
	coupons := generateEcomCoupons(store)
	if err := runOp(client, "E-Commerce Coupons", "/erp/100/EcomCoupon", &ecom.EcomCouponList{List: coupons}, extractIDs(coupons, func(e *ecom.EcomCoupon) string { return e.CouponId }), &store.EcomCouponIDs); err != nil {
		return err
	}

	// Generate Price Rules
	priceRules := generateEcomPriceRules(store)
	if err := runOp(client, "E-Commerce Price Rules", "/erp/100/EcomPrcRl", &ecom.EcomPriceRuleList{List: priceRules}, extractIDs(priceRules, func(e *ecom.EcomPriceRule) string { return e.RuleId }), &store.EcomPriceRuleIDs); err != nil {
		return err
	}

	// Generate Shipping Methods
	shippingMethods := generateEcomShippingMethods()
	if err := runOp(client, "E-Commerce Shipping Methods", "/erp/100/EcomShip", &ecom.EcomShippingMethodList{List: shippingMethods}, extractIDs(shippingMethods, func(e *ecom.EcomShippingMethod) string { return e.MethodId }), &store.EcomShippingIDs); err != nil {
		return err
	}

	// Generate Payment Methods
	paymentMethods := generateEcomPaymentMethods()
	if err := runOp(client, "E-Commerce Payment Methods", "/erp/100/EcomPay", &ecom.EcomPaymentMethodList{List: paymentMethods}, extractIDs(paymentMethods, func(e *ecom.EcomPaymentMethod) string { return e.MethodId }), &store.EcomPaymentIDs); err != nil {
		return err
	}

	return nil
}

// ECOM Phase 5: Orders
func generateEcomPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Orders
	orders := generateEcomOrders(store)
	if err := runOp(client, "E-Commerce Orders", "/erp/100/EcomOrder", &ecom.EcomOrderList{List: orders}, extractIDs(orders, func(e *ecom.EcomOrder) string { return e.OrderId }), &store.EcomOrderIDs); err != nil {
		return err
	}

	// Generate Order Lines
	orderLines := generateEcomOrderLines(store)
	if err := runOp(client, "E-Commerce Order Lines", "/erp/100/EcomOrdLn", &ecom.EcomOrderLineList{List: orderLines}, extractIDs(orderLines, func(e *ecom.EcomOrderLine) string { return e.LineId }), &store.EcomOrderLineIDs); err != nil {
		return err
	}

	// Generate Order Status History
	orderStatuses := generateEcomOrderStatuses(store)
	if err := runOp(client, "E-Commerce Order Status History", "/erp/100/EcomOrdSts", &ecom.EcomOrderStatusHistoryList{List: orderStatuses}, extractIDs(orderStatuses, func(e *ecom.EcomOrderStatusHistory) string { return e.StatusId }), &store.EcomOrderStatusIDs); err != nil {
		return err
	}

	// Generate Returns
	returns := generateEcomReturns(store)
	if err := runOp(client, "E-Commerce Returns", "/erp/100/EcomReturn", &ecom.EcomReturnList{List: returns}, extractIDs(returns, func(e *ecom.EcomReturn) string { return e.ReturnId }), &store.EcomReturnIDs); err != nil {
		return err
	}

	// Generate Return Lines
	returnLines := generateEcomReturnLines(store)
	if err := runOp(client, "E-Commerce Return Lines", "/erp/100/EcomRetLn", &ecom.EcomReturnLineList{List: returnLines}, extractIDs(returnLines, func(e *ecom.EcomReturnLine) string { return e.LineId }), &store.EcomReturnLineIDs); err != nil {
		return err
	}

	return nil
}
