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
package finreports

import (
	"time"

	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func generateAgedPayables(report *fin.FinReport, vnic ifs.IVNic) error {
	invoices, err := common.GetEntities("PurchInv", 40, &fin.PurchaseInvoice{}, vnic)
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId
	buckets := newAgingBuckets(currencyId)
	now := time.Now()

	for _, inv := range invoices {
		if !isOpenInvoice(inv.Status) {
			continue
		}
		days := agingDays(now, inv.DueDate)
		idx := agingBucketIndex(days)

		line := &fin.FinReportLine{
			AccountNumber: inv.InvoiceNumber,
			AccountName:   inv.VendorId,
			Balance:       inv.BalanceDue,
			Debit:         inv.TotalAmount,
			EntryDate:     inv.InvoiceDate,
			Reference:     inv.InvoiceNumber,
		}
		buckets[idx].Lines = append(buckets[idx].Lines, line)
		buckets[idx].SectionTotal = addMoney(buckets[idx].SectionTotal, inv.BalanceDue)
	}

	report.Sections = buckets[:]
	report.GrandTotal = agingGrandTotal(buckets, currencyId)
	report.RowCount = countLines(report.Sections)
	return nil
}
