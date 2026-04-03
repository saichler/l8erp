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
package mfgreports

import (
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"

	common "github.com/saichler/l8erp/go/erp/common"
)

func generateWorkOrderStatus(report *fin.FinReport, vnic ifs.IVNic) error {
	ordersRaw, err := common.GetEntities("MfgWorkOrd", 70, &mfg.MfgWorkOrder{}, vnic)
	orders := make([]*mfg.MfgWorkOrder, 0, len(ordersRaw))
	for _, ri := range ordersRaw { orders = append(orders, ri.(*mfg.MfgWorkOrder)) }
	if err != nil {
		return err
	}

	type statusGroup struct {
		count int32
		cost  int64
	}
	groups := make(map[mfg.MfgWorkOrderStatus]*statusGroup)

	for _, wo := range orders {
		g, ok := groups[wo.Status]
		if !ok {
			g = &statusGroup{}
			groups[wo.Status] = g
		}
		g.count++
		g.cost += moneyAmount(wo.EstimatedCost)
	}

	section := &fin.FinReportSection{
		Title:        "Work Order Status Summary",
		SectionTotal: &l8common.Money{Amount: 0, CurrencyId: "USD"},
	}

	var grandTotal int64
	for status, g := range groups {
		line := &fin.FinReportLine{
			AccountName: status.String(),
			Description: status.String(),
			Level:       g.count,
			Balance:     &l8common.Money{Amount: g.cost, CurrencyId: "USD"},
		}
		section.Lines = append(section.Lines, line)
		grandTotal += g.cost
	}
	section.SectionTotal = &l8common.Money{Amount: grandTotal, CurrencyId: "USD"}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = int32(len(section.Lines))
	return nil
}
