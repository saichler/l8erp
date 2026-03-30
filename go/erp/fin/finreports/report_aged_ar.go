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
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

const (
	agingBucket0_30  = "Current (0-30 days)"
	agingBucket31_60 = "31-60 days"
	agingBucket61_90 = "61-90 days"
	agingBucket90p   = "90+ days"
)

type agingBucketSet [4]*fin.FinReportSection

func newAgingBuckets(currencyId string) agingBucketSet {
	return agingBucketSet{
		{Title: agingBucket0_30, SectionTotal: newMoney(0, currencyId)},
		{Title: agingBucket31_60, SectionTotal: newMoney(0, currencyId)},
		{Title: agingBucket61_90, SectionTotal: newMoney(0, currencyId)},
		{Title: agingBucket90p, SectionTotal: newMoney(0, currencyId)},
	}
}

func agingBucketIndex(days int) int {
	switch {
	case days <= 30:
		return 0
	case days <= 60:
		return 1
	case days <= 90:
		return 2
	default:
		return 3
	}
}

func agingDays(now time.Time, dueDate int64) int {
	due := time.Unix(dueDate, 0)
	days := int(now.Sub(due).Hours() / 24)
	if days < 0 {
		return 0
	}
	return days
}

func agingGrandTotal(buckets agingBucketSet, currencyId string) *erp.Money {
	var total int64
	for _, b := range buckets {
		total += moneyAmount(b.SectionTotal)
	}
	return newMoney(total, currencyId)
}

func isOpenInvoice(status fin.InvoiceStatus) bool {
	switch status {
	case fin.InvoiceStatus_INVOICE_STATUS_PAID,
		fin.InvoiceStatus_INVOICE_STATUS_VOID,
		fin.InvoiceStatus_INVOICE_STATUS_CANCELLED:
		return false
	default:
		return status != fin.InvoiceStatus_INVOICE_STATUS_UNSPECIFIED
	}
}

func generateAgedReceivables(report *fin.FinReport, vnic ifs.IVNic) error {
	invoices, err := common.GetEntities("SalesInv", 40, &fin.SalesInvoice{}, vnic)
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
			AccountName:   inv.CustomerId,
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
