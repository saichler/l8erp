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

	"github.com/saichler/l8erp/go/types/ecom"
)

// ECOM Phase 1: Catalog Foundation (Categories, Attributes)
func generateEcomPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Categories
	categories := generateEcomCategories()
	if err := runOp(client, "E-Commerce Categories", "/erp/100/EcomCat", &ecom.EcomCategoryList{List: categories}, extractIDs(categories, func(v interface{}) string { return v.(*ecom.EcomCategory).CategoryId }), &store.EcomCategoryIDs); err != nil {
		return err
	}

	// Generate Attributes
	attributes := generateEcomAttributes()
	if err := runOp(client, "E-Commerce Attributes", "/erp/100/EcomAttr", &ecom.EcomAttributeList{List: attributes}, extractIDs(attributes, func(v interface{}) string { return v.(*ecom.EcomAttribute).AttributeId }), &store.EcomAttributeIDs); err != nil {
		return err
	}

	return nil
}

// ECOM Phase 2: Products (with embedded images and variants)
func generateEcomPhase2(client *HCMClient, store *MockDataStore) error {
	products := generateEcomProducts(store)
	if err := runOp(client, "E-Commerce Products", "/erp/100/EcomProd", &ecom.EcomProductList{List: products}, extractIDs(products, func(v interface{}) string { return v.(*ecom.EcomProduct).ProductId }), &store.EcomProductIDs); err != nil {
		return err
	}
	return nil
}

// ECOM Phase 3: Customers (with embedded addresses), Wishlists (with embedded items), Carts
func generateEcomPhase3(client *HCMClient, store *MockDataStore) error {
	customers := generateEcomCustomers(store)
	if err := runOp(client, "E-Commerce Customers", "/erp/100/EcomCust", &ecom.EcomCustomerList{List: customers}, extractIDs(customers, func(v interface{}) string { return v.(*ecom.EcomCustomer).CustomerId }), &store.EcomCustomerIDs); err != nil {
		return err
	}

	wishlists := generateEcomWishlists(store)
	if err := runOp(client, "E-Commerce Wishlists", "/erp/100/EcomWish", &ecom.EcomWishlistList{List: wishlists}, extractIDs(wishlists, func(v interface{}) string { return v.(*ecom.EcomWishlist).WishlistId }), &store.EcomWishlistIDs); err != nil {
		return err
	}

	carts := generateEcomCarts(store)
	if err := runOp(client, "E-Commerce Shopping Carts", "/erp/100/EcomCart", &ecom.EcomCartList{List: carts}, extractIDs(carts, func(v interface{}) string { return v.(*ecom.EcomCart).CartId }), &store.EcomCartIDs); err != nil {
		return err
	}

	return nil
}

// ECOM Phase 4: Promotions & Methods
func generateEcomPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Promotions
	promotions := generateEcomPromotions(store)
	if err := runOp(client, "E-Commerce Promotions", "/erp/100/EcomPromo", &ecom.EcomPromotionList{List: promotions}, extractIDs(promotions, func(v interface{}) string { return v.(*ecom.EcomPromotion).PromotionId }), &store.EcomPromotionIDs); err != nil {
		return err
	}

	// Generate Coupons
	coupons := generateEcomCoupons(store)
	if err := runOp(client, "E-Commerce Coupons", "/erp/100/EcomCoupon", &ecom.EcomCouponList{List: coupons}, extractIDs(coupons, func(v interface{}) string { return v.(*ecom.EcomCoupon).CouponId }), &store.EcomCouponIDs); err != nil {
		return err
	}

	// Generate Price Rules
	priceRules := generateEcomPriceRules(store)
	if err := runOp(client, "E-Commerce Price Rules", "/erp/100/EcomPrcRl", &ecom.EcomPriceRuleList{List: priceRules}, extractIDs(priceRules, func(v interface{}) string { return v.(*ecom.EcomPriceRule).RuleId }), &store.EcomPriceRuleIDs); err != nil {
		return err
	}

	// Generate Shipping Methods
	shippingMethods := generateEcomShippingMethods(store)
	if err := runOp(client, "E-Commerce Shipping Methods", "/erp/100/EcomShip", &ecom.EcomShippingMethodList{List: shippingMethods}, extractIDs(shippingMethods, func(v interface{}) string { return v.(*ecom.EcomShippingMethod).MethodId }), &store.EcomShippingIDs); err != nil {
		return err
	}

	// Generate Payment Methods
	paymentMethods := generateEcomPaymentMethods(store)
	if err := runOp(client, "E-Commerce Payment Methods", "/erp/100/EcomPay", &ecom.EcomPaymentMethodList{List: paymentMethods}, extractIDs(paymentMethods, func(v interface{}) string { return v.(*ecom.EcomPaymentMethod).MethodId }), &store.EcomPaymentIDs); err != nil {
		return err
	}

	return nil
}

// ECOM Phase 5: Orders (with embedded lines + status_history), Returns (with embedded lines)
func generateEcomPhase5(client *HCMClient, store *MockDataStore) error {
	orders := generateEcomOrders(store)
	if err := runOp(client, "E-Commerce Orders", "/erp/100/EcomOrder", &ecom.EcomOrderList{List: orders}, extractIDs(orders, func(v interface{}) string { return v.(*ecom.EcomOrder).OrderId }), &store.EcomOrderIDs); err != nil {
		return err
	}

	returns := generateEcomReturns(store)
	if err := runOp(client, "E-Commerce Returns", "/erp/100/EcomReturn", &ecom.EcomReturnList{List: returns}, extractIDs(returns, func(v interface{}) string { return v.(*ecom.EcomReturn).ReturnId }), &store.EcomReturnIDs); err != nil {
		return err
	}

	return nil
}
