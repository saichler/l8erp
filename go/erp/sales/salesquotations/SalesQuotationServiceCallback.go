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
package salesquotations

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

func newSalesQuotationServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesQuotation]("SalesQuotation",
		func(e *sales.SalesQuotation) { common.GenerateID(&e.QuotationId) }).
		StatusTransition(salesQuotationTransitions()).
		Require(func(e *sales.SalesQuotation) string { return e.QuotationId }, "QuotationId").
		Require(func(e *sales.SalesQuotation) string { return e.CustomerId }, "CustomerId").
		Require(func(e *sales.SalesQuotation) string { return e.CurrencyId }, "CurrencyId").
		Enum(func(e *sales.SalesQuotation) int32 { return int32(e.Status) }, sales.SalesQuotationStatus_name, "Status").
		OptionalMoney(func(e *sales.SalesQuotation) *erp.Money { return e.Subtotal }, "Subtotal").
		OptionalMoney(func(e *sales.SalesQuotation) *erp.Money { return e.DiscountTotal }, "DiscountTotal").
		OptionalMoney(func(e *sales.SalesQuotation) *erp.Money { return e.TaxTotal }, "TaxTotal").
		OptionalMoney(func(e *sales.SalesQuotation) *erp.Money { return e.TotalAmount }, "TotalAmount").
		Build()
}

func salesQuotationTransitions() *common.StatusTransitionConfig[sales.SalesQuotation] {
	return &common.StatusTransitionConfig[sales.SalesQuotation]{
		StatusGetter:  func(e *sales.SalesQuotation) int32 { return int32(e.Status) },
		StatusSetter:  func(e *sales.SalesQuotation, s int32) { e.Status = sales.SalesQuotationStatus(s) },
		FilterBuilder: func(e *sales.SalesQuotation) *sales.SalesQuotation {
			return &sales.SalesQuotation{QuotationId: e.QuotationId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 6},       // DRAFT → SENT, CANCELLED
			2: {3, 4, 5, 6}, // SENT → ACCEPTED, REJECTED, EXPIRED, CANCELLED
		},
		StatusNames: sales.SalesQuotationStatus_name,
	}
}
