package tests

import (
	"github.com/saichler/l8erp/go/erp/ecom/attributes"
	"github.com/saichler/l8erp/go/erp/ecom/carts"
	"github.com/saichler/l8erp/go/erp/ecom/categories"
	"github.com/saichler/l8erp/go/erp/ecom/coupons"
	"github.com/saichler/l8erp/go/erp/ecom/customeraddresses"
	"github.com/saichler/l8erp/go/erp/ecom/customers"
	"github.com/saichler/l8erp/go/erp/ecom/images"
	"github.com/saichler/l8erp/go/erp/ecom/orderlines"
	"github.com/saichler/l8erp/go/erp/ecom/orders"
	"github.com/saichler/l8erp/go/erp/ecom/orderstatuses"
	"github.com/saichler/l8erp/go/erp/ecom/paymentmethods"
	"github.com/saichler/l8erp/go/erp/ecom/pricerules"
	"github.com/saichler/l8erp/go/erp/ecom/products"
	"github.com/saichler/l8erp/go/erp/ecom/promotions"
	"github.com/saichler/l8erp/go/erp/ecom/returnlines"
	"github.com/saichler/l8erp/go/erp/ecom/returns"
	"github.com/saichler/l8erp/go/erp/ecom/shippingmethods"
	"github.com/saichler/l8erp/go/erp/ecom/variants"
	"github.com/saichler/l8erp/go/erp/ecom/wishlistitems"
	"github.com/saichler/l8erp/go/erp/ecom/wishlists"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersECOM(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := attributes.EcomAttribute("test-id", vnic); err != nil {
		log.Fail(t, "EcomAttribute getter failed: ", err.Error())
	}
	if _, err := carts.EcomCart("test-id", vnic); err != nil {
		log.Fail(t, "EcomCart getter failed: ", err.Error())
	}
	if _, err := categories.EcomCategory("test-id", vnic); err != nil {
		log.Fail(t, "EcomCategory getter failed: ", err.Error())
	}
	if _, err := coupons.EcomCoupon("test-id", vnic); err != nil {
		log.Fail(t, "EcomCoupon getter failed: ", err.Error())
	}
	if _, err := customeraddresses.EcomCustomerAddress("test-id", vnic); err != nil {
		log.Fail(t, "EcomCustomerAddress getter failed: ", err.Error())
	}
	if _, err := customers.EcomCustomer("test-id", vnic); err != nil {
		log.Fail(t, "EcomCustomer getter failed: ", err.Error())
	}
	if _, err := images.EcomImage("test-id", vnic); err != nil {
		log.Fail(t, "EcomImage getter failed: ", err.Error())
	}
	if _, err := orderlines.EcomOrderLine("test-id", vnic); err != nil {
		log.Fail(t, "EcomOrderLine getter failed: ", err.Error())
	}
	if _, err := orders.EcomOrder("test-id", vnic); err != nil {
		log.Fail(t, "EcomOrder getter failed: ", err.Error())
	}
	if _, err := orderstatuses.EcomOrderStatusHistory("test-id", vnic); err != nil {
		log.Fail(t, "EcomOrderStatusHistory getter failed: ", err.Error())
	}
	if _, err := paymentmethods.EcomPaymentMethod("test-id", vnic); err != nil {
		log.Fail(t, "EcomPaymentMethod getter failed: ", err.Error())
	}
	if _, err := pricerules.EcomPriceRule("test-id", vnic); err != nil {
		log.Fail(t, "EcomPriceRule getter failed: ", err.Error())
	}
	if _, err := products.EcomProduct("test-id", vnic); err != nil {
		log.Fail(t, "EcomProduct getter failed: ", err.Error())
	}
	if _, err := promotions.EcomPromotion("test-id", vnic); err != nil {
		log.Fail(t, "EcomPromotion getter failed: ", err.Error())
	}
	if _, err := returnlines.EcomReturnLine("test-id", vnic); err != nil {
		log.Fail(t, "EcomReturnLine getter failed: ", err.Error())
	}
	if _, err := returns.EcomReturn("test-id", vnic); err != nil {
		log.Fail(t, "EcomReturn getter failed: ", err.Error())
	}
	if _, err := shippingmethods.EcomShippingMethod("test-id", vnic); err != nil {
		log.Fail(t, "EcomShippingMethod getter failed: ", err.Error())
	}
	if _, err := variants.EcomVariant("test-id", vnic); err != nil {
		log.Fail(t, "EcomVariant getter failed: ", err.Error())
	}
	if _, err := wishlistitems.EcomWishlistItem("test-id", vnic); err != nil {
		log.Fail(t, "EcomWishlistItem getter failed: ", err.Error())
	}
	if _, err := wishlists.EcomWishlist("test-id", vnic); err != nil {
		log.Fail(t, "EcomWishlist getter failed: ", err.Error())
	}
}
