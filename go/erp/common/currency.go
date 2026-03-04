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
	"fmt"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

// ResolveCurrencyRate looks up the exchange rate between two currencies
// effective on the given date. Returns 1.0 if currencies match.
func ResolveCurrencyRate(fromCurrency, toCurrency string, effectiveDate int64, vnic ifs.IVNic) (float64, error) {
	if fromCurrency == toCurrency || fromCurrency == "" || toCurrency == "" {
		return 1.0, nil
	}
	rates, err := GetEntities("ExchRate", 40,
		&fin.ExchangeRate{FromCurrencyId: fromCurrency, ToCurrencyId: toCurrency}, vnic)
	if err != nil {
		return 0, err
	}
	// Find the most recent rate effective on or before the given date
	var bestRate float64
	var bestDate int64
	for _, r := range rates {
		if r.EffectiveDate <= effectiveDate && r.EffectiveDate > bestDate {
			if r.EndDate == 0 || r.EndDate >= effectiveDate {
				bestRate = r.Rate
				bestDate = r.EffectiveDate
			}
		}
	}
	if bestRate == 0 {
		return 0, fmt.Errorf("no exchange rate found for %s→%s on date %d", fromCurrency, toCurrency, effectiveDate)
	}
	return bestRate, nil
}

// ConvertAmount converts a Money value from one currency to another using
// the exchange rate effective on the given date.
func ConvertAmount(amount *erp.Money, toCurrency string, effectiveDate int64, vnic ifs.IVNic) (*erp.Money, error) {
	if amount == nil || amount.Amount == 0 {
		return &erp.Money{CurrencyId: toCurrency}, nil
	}
	rate, err := ResolveCurrencyRate(amount.CurrencyId, toCurrency, effectiveDate, vnic)
	if err != nil {
		return nil, err
	}
	return &erp.Money{
		Amount:     int64(float64(amount.Amount) * rate),
		CurrencyId: toCurrency,
	}, nil
}
