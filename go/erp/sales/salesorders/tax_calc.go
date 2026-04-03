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
package salesorders

import (
	common "github.com/saichler/l8erp/go/erp/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// applyTaxRules looks up active tax rules and applies them to order lines
// that don't already have a tax amount set.
func applyTaxRules(v interface{}, vnic ifs.IVNic) error {
	order := v.(*sales.SalesOrder)
	if len(order.Lines) == 0 {
		return nil
	}
	rate, err := findApplicableTaxRate(vnic)
	if err != nil || rate == 0 {
		return err
	}
	for _, line := range order.Lines {
		if line.TaxAmount != nil {
			continue // already has tax
		}
		if line.UnitPrice == nil {
			continue
		}
		gross := int64(line.Quantity * float64(line.UnitPrice.Amount))
		disc := common.MoneyAmount(line.DiscountAmount)
		taxable := gross - disc
		if taxable <= 0 {
			continue
		}
		line.TaxAmount = &l8common.Money{
			Amount:     int64(float64(taxable) * rate / 100),
			CurrencyId: line.UnitPrice.CurrencyId,
		}
	}
	return nil
}

// findApplicableTaxRate returns the first active tax rule rate.
func findApplicableTaxRate(vnic ifs.IVNic) (float64, error) {
	rulesRaw, err := common.GetEntities("TaxRule", 40, &fin.TaxRule{}, vnic)
	rules := make([]*fin.TaxRule, 0, len(rulesRaw))
	for _, ri := range rulesRaw { rules = append(rules, ri.(*fin.TaxRule)) }
	if err != nil {
		return 0, err
	}
	now := time.Now().Unix()
	for _, rule := range rules {
		if !rule.IsActive {
			continue
		}
		if rule.EffectiveDate > 0 && rule.EffectiveDate > now {
			continue
		}
		if rule.EndDate > 0 && rule.EndDate < now {
			continue
		}
		if rule.Rate > 0 {
			return rule.Rate, nil
		}
	}
	return 0, nil
}
