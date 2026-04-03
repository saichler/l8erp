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
package projectinvoices

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/prj"
)

func newPrjProjectInvoiceServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&prj.PrjProjectInvoice{}, vnic).
		Require(func(v interface{}) string { return v.(*prj.PrjProjectInvoice).InvoiceId }, "InvoiceId").
		Require(func(v interface{}) string { return v.(*prj.PrjProjectInvoice).CurrencyId }, "CurrencyId").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjProjectInvoice).Status) }, prj.PrjInvoiceStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProjectInvoice).Subtotal }, "Subtotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProjectInvoice).TaxAmount }, "TaxAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProjectInvoice).TotalAmount }, "TotalAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProjectInvoice).PaidAmount }, "PaidAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProjectInvoice).BalanceDue }, "BalanceDue").
		DateAfter(func(v interface{}) int64 { return v.(*prj.PrjProjectInvoice).DueDate }, func(v interface{}) int64 { return v.(*prj.PrjProjectInvoice).InvoiceDate }, "DueDate", "InvoiceDate").
		Build()
}
