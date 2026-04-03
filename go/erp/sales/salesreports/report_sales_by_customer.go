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

func generateSalesByCustomer(report *fin.FinReport, vnic ifs.IVNic) error {
	ordersRaw, err := common.GetEntities("SalesOrder", 60, &sales.SalesOrder{}, vnic)
	orders := make([]*sales.SalesOrder, 0, len(ordersRaw))
	for _, ri := range ordersRaw { orders = append(orders, ri.(*sales.SalesOrder)) }
	if err != nil {
		return err
	}
	customersRaw, err := common.GetEntities("Customer", 40, &fin.Customer{}, vnic)
	customers := make([]*fin.Customer, 0, len(customersRaw))
	for _, ri := range customersRaw { customers = append(customers, ri.(*fin.Customer)) }
	if err != nil {
		return err
	}

	custNames := make(map[string]string)
	for _, c := range customers {
		custNames[c.CustomerId] = c.Name
	}

	currencyId := report.CurrencyId

	type custStats struct {
		count int32
		total int64
	}
	byCustomer := make(map[string]*custStats)

	for _, order := range orders {
		st, ok := byCustomer[order.CustomerId]
		if !ok {
			st = &custStats{}
			byCustomer[order.CustomerId] = st
		}
		st.count++
		st.total += moneyAmount(order.TotalAmount)
	}

	section := &fin.FinReportSection{
		Title:        "Sales by Customer",
		SectionTotal: newMoney(0, currencyId),
	}

	for custId, st := range byCustomer {
		name := custNames[custId]
		if name == "" {
			name = fmt.Sprintf("Customer %s", custId)
		}
		line := &fin.FinReportLine{
			AccountId:   custId,
			AccountName: name,
			Balance:     newMoney(st.total, currencyId),
			Level:       st.count,
			Description: fmt.Sprintf("%d orders", st.count),
		}
		section.Lines = append(section.Lines, line)
		section.SectionTotal = addMoney(section.SectionTotal, line.Balance)
	}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = countLines(report.Sections)
	return nil
}
