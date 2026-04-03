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
package purchaseinvoices

import (
	"reflect"
	l8c "github.com/saichler/l8common/go/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)


func toSlice(slice interface{}) []interface{} {
	v := reflect.ValueOf(slice)
	result := make([]interface{}, v.Len())
	for i := 0; i < v.Len(); i++ {
		result[i] = v.Index(i).Interface()
	}
	return result
}

func newPurchaseInvoiceServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.PurchaseInvoice{}, vnic).
		StatusTransition(purchaseInvoiceTransitions()).
		Compute(computePurchaseInvoiceTotals).
		Require(func(v interface{}) string { return v.(*fin.PurchaseInvoice).InvoiceId }, "InvoiceId").
		Require(func(v interface{}) string { return v.(*fin.PurchaseInvoice).VendorId }, "VendorId").
		Require(func(v interface{}) string { return v.(*fin.PurchaseInvoice).InvoiceNumber }, "InvoiceNumber").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.PurchaseInvoice).Status) }, fin.InvoiceStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.PurchaseInvoice).Subtotal }, "Subtotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.PurchaseInvoice).TaxAmount }, "TaxAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.PurchaseInvoice).TotalAmount }, "TotalAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.PurchaseInvoice).AmountPaid }, "AmountPaid").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.PurchaseInvoice).BalanceDue }, "BalanceDue").
		DateAfter(func(v interface{}) int64 { return v.(*fin.PurchaseInvoice).DueDate }, func(v interface{}) int64 { return v.(*fin.PurchaseInvoice).InvoiceDate }, "DueDate", "InvoiceDate").
		Build()
}

func computePurchaseInvoiceTotals(v interface{}) error {
	inv := v.(*fin.PurchaseInvoice)
	for _, line := range inv.Lines {
		if line.UnitPrice != nil && line.Quantity > 0 {
			line.LineAmount = &l8common.Money{
				Amount:     int64(line.Quantity * float64(line.UnitPrice.Amount)),
				CurrencyId: line.UnitPrice.CurrencyId,
			}
		}
	}
	inv.Subtotal = l8c.SumLineMoney(toSlice(inv.Lines), func(v interface{}) *l8common.Money { return v.(*fin.PurchaseInvoiceLine).LineAmount })
	inv.TaxAmount = l8c.SumLineMoney(toSlice(inv.Lines), func(v interface{}) *l8common.Money { return v.(*fin.PurchaseInvoiceLine).TaxAmount })
	inv.TotalAmount = l8c.MoneyAdd(inv.Subtotal, inv.TaxAmount)
	inv.BalanceDue = l8c.MoneySubtract(inv.TotalAmount, inv.AmountPaid)
	return nil
}

func purchaseInvoiceTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*fin.PurchaseInvoice).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*fin.PurchaseInvoice).Status = fin.InvoiceStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*fin.PurchaseInvoice);
			return &fin.PurchaseInvoice{InvoiceId: e.InvoiceId}
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
