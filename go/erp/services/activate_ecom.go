/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
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

func ActivateEcomServices(creds, dbname string, nic ifs.IVNic) {
	// Catalog
	products.Activate(creds, dbname, nic)
	categories.Activate(creds, dbname, nic)
	attributes.Activate(creds, dbname, nic)
	images.Activate(creds, dbname, nic)
	variants.Activate(creds, dbname, nic)

	// Orders
	orders.Activate(creds, dbname, nic)
	orderlines.Activate(creds, dbname, nic)
	orderstatuses.Activate(creds, dbname, nic)
	returns.Activate(creds, dbname, nic)
	returnlines.Activate(creds, dbname, nic)

	// Customers
	customers.Activate(creds, dbname, nic)
	customeraddresses.Activate(creds, dbname, nic)
	wishlists.Activate(creds, dbname, nic)
	wishlistitems.Activate(creds, dbname, nic)
	carts.Activate(creds, dbname, nic)

	// Promotions
	promotions.Activate(creds, dbname, nic)
	coupons.Activate(creds, dbname, nic)
	pricerules.Activate(creds, dbname, nic)
	shippingmethods.Activate(creds, dbname, nic)
	paymentmethods.Activate(creds, dbname, nic)
}
