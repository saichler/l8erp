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

func testServiceGettersLEND(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := products.LendProduct("test-id", vnic); err != nil {
		log.Fail(t, "LendProduct getter failed: ", err.Error())
	}
	if _, err := applications.LendApplication("test-id", vnic); err != nil {
		log.Fail(t, "LendApplication getter failed: ", err.Error())
	}
	if _, err := loans.LoanById("test-id", vnic); err != nil {
		log.Fail(t, "Loan getter failed: ", err.Error())
	}
	if _, err := creditlines.CreditLineById("test-id", vnic); err != nil {
		log.Fail(t, "CreditLine getter failed: ", err.Error())
	}
	if _, err := payments.LendPaymentById("test-id", vnic); err != nil {
		log.Fail(t, "LendPayment getter failed: ", err.Error())
	}
	if _, err := collateral.LendCollateralById("test-id", vnic); err != nil {
		log.Fail(t, "LendCollateral getter failed: ", err.Error())
	}
}
