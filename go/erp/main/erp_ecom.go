/*
 * ECOM (E-Commerce) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"

	// Catalog
	"github.com/saichler/l8erp/go/erp/ecom/attributes"
	"github.com/saichler/l8erp/go/erp/ecom/categories"
	"github.com/saichler/l8erp/go/erp/ecom/images"
	"github.com/saichler/l8erp/go/erp/ecom/products"
	"github.com/saichler/l8erp/go/erp/ecom/variants"

	// Orders
	"github.com/saichler/l8erp/go/erp/ecom/orderlines"
	"github.com/saichler/l8erp/go/erp/ecom/orders"
	"github.com/saichler/l8erp/go/erp/ecom/orderstatuses"
	"github.com/saichler/l8erp/go/erp/ecom/returnlines"
	"github.com/saichler/l8erp/go/erp/ecom/returns"

	// Customers
	"github.com/saichler/l8erp/go/erp/ecom/carts"
	"github.com/saichler/l8erp/go/erp/ecom/customeraddresses"
	"github.com/saichler/l8erp/go/erp/ecom/customers"
	"github.com/saichler/l8erp/go/erp/ecom/wishlistitems"
	"github.com/saichler/l8erp/go/erp/ecom/wishlists"

	// Promotions
	"github.com/saichler/l8erp/go/erp/ecom/coupons"
	"github.com/saichler/l8erp/go/erp/ecom/paymentmethods"
	"github.com/saichler/l8erp/go/erp/ecom/pricerules"
	"github.com/saichler/l8erp/go/erp/ecom/promotions"
	"github.com/saichler/l8erp/go/erp/ecom/shippingmethods"
)

func activateEcomServices(nic ifs.IVNic) {
	// Catalog
	products.Activate(common.DB_CREDS, common.DB_NAME, nic)
	categories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	attributes.Activate(common.DB_CREDS, common.DB_NAME, nic)
	images.Activate(common.DB_CREDS, common.DB_NAME, nic)
	variants.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Orders
	orders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	orderlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	orderstatuses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	returns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	returnlines.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Customers
	customers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customeraddresses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	wishlists.Activate(common.DB_CREDS, common.DB_NAME, nic)
	wishlistitems.Activate(common.DB_CREDS, common.DB_NAME, nic)
	carts.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Promotions
	promotions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	coupons.Activate(common.DB_CREDS, common.DB_NAME, nic)
	pricerules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shippingmethods.Activate(common.DB_CREDS, common.DB_NAME, nic)
	paymentmethods.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
