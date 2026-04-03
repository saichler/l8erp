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
package salesreports

import (
	"fmt"

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

func quotationStatusName(s sales.SalesQuotationStatus) string {
	switch s {
	case sales.SalesQuotationStatus_QUOTATION_STATUS_DRAFT:
		return "Draft"
	case sales.SalesQuotationStatus_QUOTATION_STATUS_SENT:
		return "Sent"
	case sales.SalesQuotationStatus_QUOTATION_STATUS_ACCEPTED:
		return "Accepted"
	case sales.SalesQuotationStatus_QUOTATION_STATUS_REJECTED:
		return "Rejected"
	case sales.SalesQuotationStatus_QUOTATION_STATUS_EXPIRED:
		return "Expired"
	case sales.SalesQuotationStatus_QUOTATION_STATUS_CANCELLED:
		return "Cancelled"
	default:
		return "Other"
	}
}

func generatePipelineSummary(report *fin.FinReport, vnic ifs.IVNic) error {
	quotationsRaw, err := common.GetEntities("SalesQuote", 60, &sales.SalesQuotation{}, vnic)
	quotations := make([]*sales.SalesQuotation, 0, len(quotationsRaw))
	for _, ri := range quotationsRaw { quotations = append(quotations, ri.(*sales.SalesQuotation)) }
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId

	type statusStats struct {
		count int32
		total int64
	}
	byStatus := make(map[sales.SalesQuotationStatus]*statusStats)

	for _, q := range quotations {
		st, ok := byStatus[q.Status]
		if !ok {
			st = &statusStats{}
			byStatus[q.Status] = st
		}
		st.count++
		st.total += moneyAmount(q.TotalAmount)
	}

	section := &fin.FinReportSection{
		Title:        "Quotations by Status",
		SectionTotal: newMoney(0, currencyId),
	}

	for status, st := range byStatus {
		line := &fin.FinReportLine{
			AccountName: quotationStatusName(status),
			Balance:     newMoney(st.total, currencyId),
			Level:       st.count,
			Description: fmt.Sprintf("%d quotations", st.count),
		}
		section.Lines = append(section.Lines, line)
		section.SectionTotal = addMoney(section.SectionTotal, line.Balance)
	}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = countLines(report.Sections)
	return nil
}
