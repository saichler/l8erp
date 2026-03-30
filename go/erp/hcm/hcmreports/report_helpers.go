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
package hcmreports

import (
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

func moneyAmount(m *erp.Money) int64 {
	if m == nil {
		return 0
	}
	return m.Amount
}

func newMoney(amount int64, currencyId string) *erp.Money {
	return &erp.Money{Amount: amount, CurrencyId: currencyId}
}

func addMoney(a, b *erp.Money) *erp.Money {
	total := moneyAmount(a) + moneyAmount(b)
	cid := ""
	if a != nil {
		cid = a.CurrencyId
	} else if b != nil {
		cid = b.CurrencyId
	}
	return newMoney(total, cid)
}

func countLines(sections []*fin.FinReportSection) int32 {
	var n int32
	for _, s := range sections {
		n += int32(len(s.Lines))
	}
	return n
}
