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
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// cascadeCreateSalesOrder auto-creates a draft SalesOrder when a quotation is accepted.
func cascadeCreateSalesOrder(q *sales.SalesQuotation, action ifs.Action, vnic ifs.IVNic) error {
	if q.Status != sales.SalesQuotationStatus_QUOTATION_STATUS_ACCEPTED {
		return nil
	}
	exists, err := common.EntityExists("SalesOrder", 60,
		&sales.SalesOrder{QuotationId: q.QuotationId}, vnic)
	if err != nil || exists {
		return err
	}
	lines := make([]*sales.SalesOrderLine, len(q.Lines))
	for i, ql := range q.Lines {
		lines[i] = &sales.SalesOrderLine{
			LineNumber:    ql.LineNumber,
			ItemId:        ql.ItemId,
			Description:   ql.Description,
			Quantity:      ql.Quantity,
			UnitOfMeasure: ql.UnitOfMeasure,
			UnitPrice:     ql.UnitPrice,
		}
	}
	_, err = common.PostEntity("SalesOrder", 60, &sales.SalesOrder{
		CustomerId:  q.CustomerId,
		QuotationId: q.QuotationId,
		CurrencyId:  q.CurrencyId,
		OrderDate:   time.Now().Unix(),
		Status:      sales.SalesOrderStatus_SALES_ORDER_STATUS_DRAFT,
		Lines:       lines,
		AuditInfo:   &erp.AuditInfo{},
	}, vnic)
	return err
}
