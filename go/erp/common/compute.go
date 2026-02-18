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
package common

import (
	erp "github.com/saichler/l8erp/go/types/erp"
)

// SumLineMoney sums a Money field across a slice of line items.
func SumLineMoney[L any](lines []*L, getter func(*L) *erp.Money) *erp.Money {
	total := int64(0)
	currencyId := ""
	for _, line := range lines {
		if m := getter(line); m != nil {
			total += m.Amount
			if currencyId == "" {
				currencyId = m.CurrencyId
			}
		}
	}
	if currencyId == "" {
		return nil
	}
	return &erp.Money{Amount: total, CurrencyId: currencyId}
}

// MoneyAdd returns a + b (same currency). Returns nil if both are nil.
func MoneyAdd(a, b *erp.Money) *erp.Money {
	if a == nil && b == nil {
		return nil
	}
	if a == nil {
		return b
	}
	if b == nil {
		return a
	}
	return &erp.Money{Amount: a.Amount + b.Amount, CurrencyId: a.CurrencyId}
}

// MoneySubtract returns a - b (same currency). Returns nil if both are nil.
func MoneySubtract(a, b *erp.Money) *erp.Money {
	if a == nil && b == nil {
		return nil
	}
	if a == nil {
		return &erp.Money{Amount: -b.Amount, CurrencyId: b.CurrencyId}
	}
	if b == nil {
		return a
	}
	return &erp.Money{Amount: a.Amount - b.Amount, CurrencyId: a.CurrencyId}
}

// SumLineFloat64 sums a float64 field across a slice of line items.
func SumLineFloat64[L any](lines []*L, getter func(*L) float64) float64 {
	total := float64(0)
	for _, line := range lines {
		total += getter(line)
	}
	return total
}

// SumLineInt64 sums an int64 field across a slice of line items.
func SumLineInt64[L any](lines []*L, getter func(*L) int64) int64 {
	total := int64(0)
	for _, line := range lines {
		total += getter(line)
	}
	return total
}
