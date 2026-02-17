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
