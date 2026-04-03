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
package scmreports

import (
	"fmt"

	common "github.com/saichler/l8common/go/generic"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
)

func poStatusName(s scm.ScmPurchaseOrderStatus) string {
	switch s {
	case scm.ScmPurchaseOrderStatus_PO_STATUS_DRAFT:
		return "Draft"
	case scm.ScmPurchaseOrderStatus_PO_STATUS_APPROVED:
		return "Approved"
	case scm.ScmPurchaseOrderStatus_PO_STATUS_SENT:
		return "Sent"
	case scm.ScmPurchaseOrderStatus_PO_STATUS_PARTIALLY_RECEIVED:
		return "Partially Received"
	case scm.ScmPurchaseOrderStatus_PO_STATUS_RECEIVED:
		return "Received"
	case scm.ScmPurchaseOrderStatus_PO_STATUS_CLOSED:
		return "Closed"
	case scm.ScmPurchaseOrderStatus_PO_STATUS_CANCELLED:
		return "Cancelled"
	default:
		return "Other"
	}
}

func generatePurchaseOrderSummary(report *fin.FinReport, vnic ifs.IVNic) error {
	orders, err := common.GetEntities("PurchOrder", 50, &scm.ScmPurchaseOrder{}, vnic)
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId

	type statusStats struct {
		count int32
		total int64
	}
	byStatus := make(map[scm.ScmPurchaseOrderStatus]*statusStats)

	for _, po := range orders {
		st, ok := byStatus[po.Status]
		if !ok {
			st = &statusStats{}
			byStatus[po.Status] = st
		}
		st.count++
		st.total += moneyAmount(po.TotalAmount)
	}

	section := &fin.FinReportSection{
		Title:        "Purchase Orders by Status",
		SectionTotal: newMoney(0, currencyId),
	}

	var totalOrders int32
	for status, st := range byStatus {
		line := &fin.FinReportLine{
			AccountName: poStatusName(status),
			Balance:     newMoney(st.total, currencyId),
			Level:       st.count,
			Description: fmt.Sprintf("%d orders", st.count),
		}
		section.Lines = append(section.Lines, line)
		section.SectionTotal = addMoney(section.SectionTotal, line.Balance)
		totalOrders += st.count
	}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = countLines(report.Sections)
	return nil
}
