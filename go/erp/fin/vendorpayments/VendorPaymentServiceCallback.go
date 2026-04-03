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
package vendorpayments

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
)

func newVendorPaymentServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.VendorPayment{}, vnic).
		StatusTransition(vendorPaymentTransitions()).
		After(cascadeUpdatePurchaseInvoicePaymentStatus).
		Require(func(v interface{}) string { return v.(*fin.VendorPayment).PaymentId }, "PaymentId").
		Require(func(v interface{}) string { return v.(*fin.VendorPayment).VendorId }, "VendorId").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.VendorPayment).PaymentMethod) }, fin.PaymentMethod_name, "PaymentMethod").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.VendorPayment).Status) }, fin.PaymentStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.VendorPayment).Amount }, "Amount").
		Build()
}

// cascadeUpdatePurchaseInvoicePaymentStatus updates purchase invoice payment status
// when a vendor payment is completed.
func cascadeUpdatePurchaseInvoicePaymentStatus(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	payment := v.(*fin.VendorPayment)
	if payment.Status != fin.PaymentStatus_PAYMENT_STATUS_COMPLETED {
		return nil
	}
	for _, alloc := range payment.Allocations {
		if alloc.InvoiceId == "" || alloc.AllocatedAmount == nil {
			continue
		}
		invoiceRaw, err := common.GetEntity("PurchInv", 40,
			&fin.PurchaseInvoice{InvoiceId: alloc.InvoiceId}, vnic)
		if err != nil || invoiceRaw == nil {
			continue
		}
		invoice := invoiceRaw.(*fin.PurchaseInvoice)
		paid := int64(0)
		if invoice.AmountPaid != nil {
			paid = invoice.AmountPaid.Amount
		}
		paid += alloc.AllocatedAmount.Amount
		invoice.AmountPaid = &l8common.Money{Amount: paid, CurrencyId: alloc.AllocatedAmount.CurrencyId}
		total := int64(0)
		if invoice.TotalAmount != nil {
			total = invoice.TotalAmount.Amount
		}
		invoice.BalanceDue = &l8common.Money{Amount: total - paid, CurrencyId: alloc.AllocatedAmount.CurrencyId}
		if total-paid <= 0 {
			invoice.Status = fin.InvoiceStatus_INVOICE_STATUS_PAID
		} else if paid > 0 {
			invoice.Status = fin.InvoiceStatus_INVOICE_STATUS_PARTIALLY_PAID
		}
		if err := common.PutEntity("PurchInv", 40, invoice, vnic); err != nil {
			return err
		}
	}
	return nil
}

func vendorPaymentTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*fin.VendorPayment).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*fin.VendorPayment).Status = fin.PaymentStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*fin.VendorPayment);
			return &fin.VendorPayment{PaymentId: e.PaymentId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 5},    // PENDING → PROCESSING, CANCELLED
			2: {3, 4},    // PROCESSING → COMPLETED, FAILED
			3: {6},       // COMPLETED → REVERSED
			4: {1},       // FAILED → PENDING
		},
		StatusNames: fin.PaymentStatus_name,
	}
}
