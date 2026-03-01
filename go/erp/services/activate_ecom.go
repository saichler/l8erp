/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"github.com/saichler/l8types/go/ifs"

	// Catalog
	"github.com/saichler/l8erp/go/erp/ecom/attributes"
	"github.com/saichler/l8erp/go/erp/ecom/categories"
	"github.com/saichler/l8erp/go/erp/ecom/products"

	// Orders
	"github.com/saichler/l8erp/go/erp/ecom/orders"
	"github.com/saichler/l8erp/go/erp/ecom/returns"

	// Customers
	"github.com/saichler/l8erp/go/erp/ecom/carts"
	"github.com/saichler/l8erp/go/erp/ecom/customers"
	"github.com/saichler/l8erp/go/erp/ecom/wishlists"

	// Promotions
	"github.com/saichler/l8erp/go/erp/ecom/coupons"
	"github.com/saichler/l8erp/go/erp/ecom/paymentmethods"
	"github.com/saichler/l8erp/go/erp/ecom/pricerules"
	"github.com/saichler/l8erp/go/erp/ecom/promotions"
	"github.com/saichler/l8erp/go/erp/ecom/shippingmethods"
)

func collectEcomActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Catalog
		func() { products.Activate(creds, dbname, nic) },
		func() { categories.Activate(creds, dbname, nic) },
		func() { attributes.Activate(creds, dbname, nic) },
		// Orders
		func() { orders.Activate(creds, dbname, nic) },
		func() { returns.Activate(creds, dbname, nic) },
		// Customers
		func() { customers.Activate(creds, dbname, nic) },
		func() { wishlists.Activate(creds, dbname, nic) },
		func() { carts.Activate(creds, dbname, nic) },
		// Promotions
		func() { promotions.Activate(creds, dbname, nic) },
		func() { coupons.Activate(creds, dbname, nic) },
		func() { pricerules.Activate(creds, dbname, nic) },
		func() { shippingmethods.Activate(creds, dbname, nic) },
		func() { paymentmethods.Activate(creds, dbname, nic) },
	}
}
