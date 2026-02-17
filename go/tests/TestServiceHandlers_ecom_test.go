package tests

import (
	"github.com/saichler/l8erp/go/erp/ecom/attributes"
	"github.com/saichler/l8erp/go/erp/ecom/carts"
	"github.com/saichler/l8erp/go/erp/ecom/categories"
	"github.com/saichler/l8erp/go/erp/ecom/coupons"
	"github.com/saichler/l8erp/go/erp/ecom/customers"
	"github.com/saichler/l8erp/go/erp/ecom/orders"
	"github.com/saichler/l8erp/go/erp/ecom/paymentmethods"
	"github.com/saichler/l8erp/go/erp/ecom/pricerules"
	"github.com/saichler/l8erp/go/erp/ecom/products"
	"github.com/saichler/l8erp/go/erp/ecom/promotions"
	"github.com/saichler/l8erp/go/erp/ecom/returns"
	"github.com/saichler/l8erp/go/erp/ecom/shippingmethods"
	"github.com/saichler/l8erp/go/erp/ecom/wishlists"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersECOM(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := attributes.EcomAttributes(vnic); !ok || h == nil {
		log.Fail(t, "EcomAttribute service handler not found")
	}
	if h, ok := carts.EcomCarts(vnic); !ok || h == nil {
		log.Fail(t, "EcomCart service handler not found")
	}
	if h, ok := categories.EcomCategories(vnic); !ok || h == nil {
		log.Fail(t, "EcomCategory service handler not found")
	}
	if h, ok := coupons.EcomCoupons(vnic); !ok || h == nil {
		log.Fail(t, "EcomCoupon service handler not found")
	}
	if h, ok := customers.EcomCustomers(vnic); !ok || h == nil {
		log.Fail(t, "EcomCustomer service handler not found")
	}
	if h, ok := orders.EcomOrders(vnic); !ok || h == nil {
		log.Fail(t, "EcomOrder service handler not found")
	}
	if h, ok := paymentmethods.EcomPaymentMethods(vnic); !ok || h == nil {
		log.Fail(t, "EcomPaymentMethod service handler not found")
	}
	if h, ok := pricerules.EcomPriceRules(vnic); !ok || h == nil {
		log.Fail(t, "EcomPriceRule service handler not found")
	}
	if h, ok := products.EcomProducts(vnic); !ok || h == nil {
		log.Fail(t, "EcomProduct service handler not found")
	}
	if h, ok := promotions.EcomPromotions(vnic); !ok || h == nil {
		log.Fail(t, "EcomPromotion service handler not found")
	}
	if h, ok := returns.EcomReturns(vnic); !ok || h == nil {
		log.Fail(t, "EcomReturn service handler not found")
	}
	if h, ok := shippingmethods.EcomShippingMethods(vnic); !ok || h == nil {
		log.Fail(t, "EcomShippingMethod service handler not found")
	}
	if h, ok := wishlists.EcomWishlists(vnic); !ok || h == nil {
		log.Fail(t, "EcomWishlist service handler not found")
	}
}
