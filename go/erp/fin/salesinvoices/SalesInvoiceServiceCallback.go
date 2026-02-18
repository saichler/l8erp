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
package salesinvoices

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

func newSalesInvoiceServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.SalesInvoice]("SalesInvoice",
		func(e *fin.SalesInvoice) { common.GenerateID(&e.InvoiceId) }).
		StatusTransition(salesInvoiceTransitions()).
		After(cascadeVoidCreditMemos).
		Compute(computeSalesInvoiceTotals).
		Require(func(e *fin.SalesInvoice) string { return e.InvoiceId }, "InvoiceId").
		Require(func(e *fin.SalesInvoice) string { return e.CustomerId }, "CustomerId").
		Require(func(e *fin.SalesInvoice) string { return e.InvoiceNumber }, "InvoiceNumber").
		Enum(func(e *fin.SalesInvoice) int32 { return int32(e.Status) }, fin.InvoiceStatus_name, "Status").
		OptionalMoney(func(e *fin.SalesInvoice) *erp.Money { return e.Subtotal }, "Subtotal").
		OptionalMoney(func(e *fin.SalesInvoice) *erp.Money { return e.TaxAmount }, "TaxAmount").
		OptionalMoney(func(e *fin.SalesInvoice) *erp.Money { return e.TotalAmount }, "TotalAmount").
		OptionalMoney(func(e *fin.SalesInvoice) *erp.Money { return e.AmountPaid }, "AmountPaid").
		OptionalMoney(func(e *fin.SalesInvoice) *erp.Money { return e.BalanceDue }, "BalanceDue").
		DateAfter(func(e *fin.SalesInvoice) int64 { return e.DueDate }, func(e *fin.SalesInvoice) int64 { return e.InvoiceDate }, "DueDate", "InvoiceDate").
		Build()
}

func computeSalesInvoiceTotals(inv *fin.SalesInvoice) error {
	for _, line := range inv.Lines {
		if line.UnitPrice != nil && line.Quantity > 0 {
			line.LineAmount = &erp.Money{
				Amount:     int64(line.Quantity * float64(line.UnitPrice.Amount)),
				CurrencyId: line.UnitPrice.CurrencyId,
			}
		}
	}
	inv.Subtotal = common.SumLineMoney(inv.Lines, func(l *fin.SalesInvoiceLine) *erp.Money { return l.LineAmount })
	inv.TaxAmount = common.SumLineMoney(inv.Lines, func(l *fin.SalesInvoiceLine) *erp.Money { return l.TaxAmount })
	inv.TotalAmount = common.MoneyAdd(inv.Subtotal, inv.TaxAmount)
	inv.BalanceDue = common.MoneySubtract(inv.TotalAmount, inv.AmountPaid)
	return nil
}

// cascadeVoidCreditMemos marks related credit memos as VOID
// when a sales invoice is voided.
func cascadeVoidCreditMemos(invoice *fin.SalesInvoice, action ifs.Action, vnic ifs.IVNic) error {
	if invoice.Status != fin.InvoiceStatus_INVOICE_STATUS_VOID {
		return nil
	}
	children, err := common.GetEntities("CrdtMemo", 40,
		&fin.CreditMemo{OriginalInvoiceId: invoice.InvoiceId}, vnic)
	if err != nil {
		return err
	}
	for _, child := range children {
		s := int32(child.Status)
		if s == 3 || s == 4 { // APPLIED or VOID — skip terminal
			continue
		}
		child.Status = fin.CreditMemoStatus_CREDIT_MEMO_STATUS_VOID
		if err := common.PutEntity("CrdtMemo", 40, child, vnic); err != nil {
			return err
		}
	}
	return nil
}

func salesInvoiceTransitions() *common.StatusTransitionConfig[fin.SalesInvoice] {
	return &common.StatusTransitionConfig[fin.SalesInvoice]{
		StatusGetter:  func(e *fin.SalesInvoice) int32 { return int32(e.Status) },
		StatusSetter:  func(e *fin.SalesInvoice, s int32) { e.Status = fin.InvoiceStatus(s) },
		FilterBuilder: func(e *fin.SalesInvoice) *fin.SalesInvoice {
			return &fin.SalesInvoice{InvoiceId: e.InvoiceId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 7, 8},       // DRAFT → SUBMITTED, CANCELLED, VOID
			2: {3, 7, 8},       // SUBMITTED → APPROVED, CANCELLED, VOID
			3: {4, 5, 6, 7, 8}, // APPROVED → PARTIALLY_PAID, PAID, OVERDUE, CANCELLED, VOID
			4: {5},             // PARTIALLY_PAID → PAID
			6: {5, 7},          // OVERDUE → PAID, CANCELLED
		},
		StatusNames: fin.InvoiceStatus_name,
	}
}
