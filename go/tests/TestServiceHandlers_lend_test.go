package tests

import (
	"github.com/saichler/l8erp/go/erp/lend/applications"
	"github.com/saichler/l8erp/go/erp/lend/collateral"
	"github.com/saichler/l8erp/go/erp/lend/creditlines"
	"github.com/saichler/l8erp/go/erp/lend/loans"
	"github.com/saichler/l8erp/go/erp/lend/payments"
	"github.com/saichler/l8erp/go/erp/lend/products"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersLEND(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := products.LendProducts(vnic); !ok || h == nil {
		log.Fail(t, "LendProduct service handler not found")
	}
	if h, ok := applications.LendApplications(vnic); !ok || h == nil {
		log.Fail(t, "LendApplication service handler not found")
	}
	if h, ok := loans.Loans(vnic); !ok || h == nil {
		log.Fail(t, "Loan service handler not found")
	}
	if h, ok := creditlines.CreditLines(vnic); !ok || h == nil {
		log.Fail(t, "CreditLine service handler not found")
	}
	if h, ok := payments.LendPayments(vnic); !ok || h == nil {
		log.Fail(t, "LendPayment service handler not found")
	}
	if h, ok := collateral.LendCollaterals(vnic); !ok || h == nil {
		log.Fail(t, "LendCollateral service handler not found")
	}
}
