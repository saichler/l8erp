/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"github.com/saichler/l8types/go/ifs"

	// Products
	"github.com/saichler/l8erp/go/erp/lend/products"

	// Applications
	"github.com/saichler/l8erp/go/erp/lend/applications"

	// Loans
	"github.com/saichler/l8erp/go/erp/lend/loans"

	// Credit Lines
	"github.com/saichler/l8erp/go/erp/lend/creditlines"

	// Payments
	"github.com/saichler/l8erp/go/erp/lend/payments"

	// Collateral
	"github.com/saichler/l8erp/go/erp/lend/collateral"
)

func collectLendActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Products
		func() { products.Activate(creds, dbname, nic) },
		// Applications
		func() { applications.Activate(creds, dbname, nic) },
		// Loans
		func() { loans.Activate(creds, dbname, nic) },
		// Credit Lines
		func() { creditlines.Activate(creds, dbname, nic) },
		// Payments
		func() { payments.Activate(creds, dbname, nic) },
		// Collateral
		func() { collateral.Activate(creds, dbname, nic) },
	}
}
