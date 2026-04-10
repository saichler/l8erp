package ui

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/lend"
	"github.com/saichler/l8types/go/ifs"
)

func registerLendTypes(resources ifs.IResources) {
	// Products
	common.RegisterType(resources, &lend.LendProduct{}, &lend.LendProductList{}, "ProductId")

	// Applications
	common.RegisterType(resources, &lend.LendApplication{}, &lend.LendApplicationList{}, "ApplicationId")

	// Loans
	common.RegisterType(resources, &lend.Loan{}, &lend.LoanList{}, "LoanId")

	// Credit Lines
	common.RegisterType(resources, &lend.CreditLine{}, &lend.CreditLineList{}, "CreditLineId")

	// Payments
	common.RegisterType(resources, &lend.LendPayment{}, &lend.LendPaymentList{}, "PaymentId")

	// Collateral
	common.RegisterType(resources, &lend.LendCollateral{}, &lend.LendCollateralList{}, "CollateralId")
}
