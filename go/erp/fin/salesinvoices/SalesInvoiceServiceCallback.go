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
	"reflect"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
)


func toSlice(slice interface{}) []interface{} {
	v := reflect.ValueOf(slice)
	result := make([]interface{}, v.Len())
	for i := 0; i < v.Len(); i++ {
		result[i] = v.Index(i).Interface()
	}
	return result
}

func newSalesInvoiceServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.SalesInvoice{}, vnic).
		StatusTransition(salesInvoiceTransitions()).
		After(cascadeVoidCreditMemos).
		Compute(computeSalesInvoiceTotals).
		Require(func(v interface{}) string { return v.(*fin.SalesInvoice).InvoiceId }, "InvoiceId").
		Require(func(v interface{}) string { return v.(*fin.SalesInvoice).CustomerId }, "CustomerId").
		Require(func(v interface{}) string { return v.(*fin.SalesInvoice).InvoiceNumber }, "InvoiceNumber").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.SalesInvoice).Status) }, fin.InvoiceStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.SalesInvoice).Subtotal }, "Subtotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.SalesInvoice).TaxAmount }, "TaxAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.SalesInvoice).TotalAmount }, "TotalAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.SalesInvoice).AmountPaid }, "AmountPaid").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.SalesInvoice).BalanceDue }, "BalanceDue").
		DateAfter(func(v interface{}) int64 { return v.(*fin.SalesInvoice).DueDate }, func(v interface{}) int64 { return v.(*fin.SalesInvoice).InvoiceDate }, "DueDate", "InvoiceDate").
		Build()
}

func computeSalesInvoiceTotals(v interface{}) error {
	inv := v.(*fin.SalesInvoice)
	for _, line := range inv.Lines {
		if line.UnitPrice != nil && line.Quantity > 0 {
			line.LineAmount = &l8common.Money{
				Amount:     int64(line.Quantity * float64(line.UnitPrice.Amount)),
				CurrencyId: line.UnitPrice.CurrencyId,
			}
		}
	}
	inv.Subtotal = common.SumLineMoney(toSlice(inv.Lines), func(v interface{}) *l8common.Money { return v.(*fin.SalesInvoiceLine).LineAmount })
	inv.TaxAmount = common.SumLineMoney(toSlice(inv.Lines), func(v interface{}) *l8common.Money { return v.(*fin.SalesInvoiceLine).TaxAmount })
	inv.TotalAmount = common.MoneyAdd(inv.Subtotal, inv.TaxAmount)
	inv.BalanceDue = common.MoneySubtract(inv.TotalAmount, inv.AmountPaid)
	return nil
}

// cascadeVoidCreditMemos marks related credit memos as VOID
// when a sales invoice is voided.
func cascadeVoidCreditMemos(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	invoice := v.(*fin.SalesInvoice)
	if invoice.Status != fin.InvoiceStatus_INVOICE_STATUS_VOID {
		return nil
	}
	childrenRaw, err := common.GetEntities("CrdtMemo", 40, &fin.CreditMemo{OriginalInvoiceId: invoice.InvoiceId}, vnic)
	children := make([]*fin.CreditMemo, 0, len(childrenRaw))
	for _, ri := range childrenRaw { children = append(children, ri.(*fin.CreditMemo)) }
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

func salesInvoiceTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*fin.SalesInvoice).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*fin.SalesInvoice).Status = fin.InvoiceStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*fin.SalesInvoice);
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
