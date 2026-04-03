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
package customerpayments

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
)

func newCustomerPaymentServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.CustomerPayment{}, vnic).
		StatusTransition(customerPaymentTransitions()).
		After(cascadeUpdateInvoicePaymentStatus).
		Require(func(v interface{}) string { return v.(*fin.CustomerPayment).PaymentId }, "PaymentId").
		Require(func(v interface{}) string { return v.(*fin.CustomerPayment).CustomerId }, "CustomerId").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.CustomerPayment).PaymentMethod) }, fin.PaymentMethod_name, "PaymentMethod").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.CustomerPayment).Status) }, fin.PaymentStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CustomerPayment).Amount }, "Amount").
		Build()
}

// cascadeUpdateInvoicePaymentStatus updates sales invoice payment status
// when a customer payment is completed.
func cascadeUpdateInvoicePaymentStatus(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	payment := v.(*fin.CustomerPayment)
	if payment.Status != fin.PaymentStatus_PAYMENT_STATUS_COMPLETED {
		return nil
	}
	for _, app := range payment.Applications {
		if app.InvoiceId == "" || app.AppliedAmount == nil {
			continue
		}
		invoiceRaw, err := common.GetEntity("SalesInv", 40,
			&fin.SalesInvoice{InvoiceId: app.InvoiceId}, vnic)
		if err != nil || invoiceRaw == nil {
			continue
		}
		invoice := invoiceRaw.(*fin.SalesInvoice)
		paid := int64(0)
		if invoice.AmountPaid != nil {
			paid = invoice.AmountPaid.Amount
		}
		paid += app.AppliedAmount.Amount
		invoice.AmountPaid = &l8common.Money{Amount: paid, CurrencyId: app.AppliedAmount.CurrencyId}
		total := int64(0)
		if invoice.TotalAmount != nil {
			total = invoice.TotalAmount.Amount
		}
		invoice.BalanceDue = &l8common.Money{Amount: total - paid, CurrencyId: app.AppliedAmount.CurrencyId}
		if total-paid <= 0 {
			invoice.Status = fin.InvoiceStatus_INVOICE_STATUS_PAID
		} else if paid > 0 {
			invoice.Status = fin.InvoiceStatus_INVOICE_STATUS_PARTIALLY_PAID
		}
		if err := common.PutEntity("SalesInv", 40, invoice, vnic); err != nil {
			return err
		}
	}
	return nil
}

func customerPaymentTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*fin.CustomerPayment).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*fin.CustomerPayment).Status = fin.PaymentStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*fin.CustomerPayment);
			return &fin.CustomerPayment{PaymentId: e.PaymentId}
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
