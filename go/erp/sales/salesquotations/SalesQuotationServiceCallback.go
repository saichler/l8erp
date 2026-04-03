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
	"reflect"
	l8c "github.com/saichler/l8common/go/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
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

func newSalesQuotationServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&sales.SalesQuotation{}, vnic).
		StatusTransition(salesQuotationTransitions()).
		After(cascadeCreateSalesOrder).
		Compute(computeSalesQuotationTotals).
		Require(func(v interface{}) string { return v.(*sales.SalesQuotation).QuotationId }, "QuotationId").
		Require(func(v interface{}) string { return v.(*sales.SalesQuotation).CustomerId }, "CustomerId").
		Require(func(v interface{}) string { return v.(*sales.SalesQuotation).CurrencyId }, "CurrencyId").
		Enum(func(v interface{}) int32 { return int32(v.(*sales.SalesQuotation).Status) }, sales.SalesQuotationStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesQuotation).Subtotal }, "Subtotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesQuotation).DiscountTotal }, "DiscountTotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesQuotation).TaxTotal }, "TaxTotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesQuotation).TotalAmount }, "TotalAmount").
		Build()
}

func computeSalesQuotationTotals(v interface{}) error {
	q := v.(*sales.SalesQuotation)
	subtotal := int64(0)
	currencyId := ""
	for _, line := range q.Lines {
		if line.UnitPrice == nil {
			continue
		}
		if currencyId == "" {
			currencyId = line.UnitPrice.CurrencyId
		}
		gross := int64(line.Quantity * float64(line.UnitPrice.Amount))
		subtotal += gross
		if line.DiscountPercent > 0 && line.DiscountAmount == nil {
			line.DiscountAmount = &l8common.Money{
				Amount:     int64(float64(gross) * line.DiscountPercent / 100),
				CurrencyId: currencyId,
			}
		}
		disc := int64(0)
		if line.DiscountAmount != nil {
			disc = line.DiscountAmount.Amount
		}
		tax := int64(0)
		if line.TaxAmount != nil {
			tax = line.TaxAmount.Amount
		}
		line.LineTotal = &l8common.Money{Amount: gross - disc + tax, CurrencyId: currencyId}
	}
	if currencyId == "" {
		return nil
	}
	q.Subtotal = &l8common.Money{Amount: subtotal, CurrencyId: currencyId}
	q.DiscountTotal = l8c.SumLineMoney(toSlice(q.Lines), func(v interface{}) *l8common.Money { return v.(*sales.SalesQuotationLine).DiscountAmount })
	q.TaxTotal = l8c.SumLineMoney(toSlice(q.Lines), func(v interface{}) *l8common.Money { return v.(*sales.SalesQuotationLine).TaxAmount })
	q.TotalAmount = l8c.MoneyAdd(l8c.MoneySubtract(q.Subtotal, q.DiscountTotal), q.TaxTotal)
	return nil
}

func salesQuotationTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*sales.SalesQuotation).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*sales.SalesQuotation).Status = sales.SalesQuotationStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*sales.SalesQuotation);
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
