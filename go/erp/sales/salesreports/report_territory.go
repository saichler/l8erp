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

	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

func generateTerritoryPerformance(report *fin.FinReport, vnic ifs.IVNic) error {
	territories, err := common.GetEntities("Territory", 60, &sales.SalesTerritory{}, vnic)
	if err != nil {
		return err
	}
	orders, err := common.GetEntities("SalesOrder", 60, &sales.SalesOrder{}, vnic)
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId

	// Build salesperson -> territory map from territory assignments
	terrNames := make(map[string]string)
	spToTerritory := make(map[string]string)
	for _, t := range territories {
		terrNames[t.TerritoryId] = t.Name
		for _, a := range t.Assignments {
			spToTerritory[a.SalespersonId] = t.TerritoryId
		}
	}

	// Aggregate orders by territory via salesperson
	type terrStats struct {
		count int32
		total int64
	}
	byTerritory := make(map[string]*terrStats)

	for _, order := range orders {
		terrId := spToTerritory[order.SalespersonId]
		if terrId == "" {
			terrId = "unassigned"
		}
		st, ok := byTerritory[terrId]
		if !ok {
			st = &terrStats{}
			byTerritory[terrId] = st
		}
		st.count++
		st.total += moneyAmount(order.TotalAmount)
	}

	section := &fin.FinReportSection{
		Title:        "Performance by Territory",
		SectionTotal: newMoney(0, currencyId),
	}

	for terrId, st := range byTerritory {
		name := terrNames[terrId]
		if name == "" {
			name = fmt.Sprintf("Territory %s", terrId)
		}
		line := &fin.FinReportLine{
			AccountId:   terrId,
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
