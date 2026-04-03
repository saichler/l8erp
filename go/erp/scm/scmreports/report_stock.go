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

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
)

func generateStockByWarehouse(report *fin.FinReport, vnic ifs.IVNic) error {
	itemsRaw, err := common.GetEntities("Item", 50, &scm.ScmItem{}, vnic)
	items := make([]*scm.ScmItem, 0, len(itemsRaw))
	for _, ri := range itemsRaw { items = append(items, ri.(*scm.ScmItem)) }
	if err != nil {
		return err
	}
	warehousesRaw, err := common.GetEntities("Warehouse", 50, &scm.ScmWarehouse{}, vnic)
	warehouses := make([]*scm.ScmWarehouse, 0, len(warehousesRaw))
	for _, ri := range warehousesRaw { warehouses = append(warehouses, ri.(*scm.ScmWarehouse)) }
	if err != nil {
		return err
	}

	whNames := make(map[string]string)
	for _, w := range warehouses {
		whNames[w.WarehouseId] = w.Name
	}

	currencyId := report.CurrencyId

	// Group active items by default warehouse
	type whGroup struct {
		count int32
		total int64
	}
	byWarehouse := make(map[string]*whGroup)

	for _, item := range items {
		if !item.IsActive {
			continue
		}
		whId := item.DefaultWarehouseId
		if whId == "" {
			whId = "unassigned"
		}
		g, ok := byWarehouse[whId]
		if !ok {
			g = &whGroup{}
			byWarehouse[whId] = g
		}
		g.count++
		g.total += moneyAmount(item.UnitCost)
	}

	section := &fin.FinReportSection{
		Title:        "Stock by Warehouse",
		SectionTotal: newMoney(0, currencyId),
	}

	for whId, g := range byWarehouse {
		name := whNames[whId]
		if name == "" {
			name = fmt.Sprintf("Warehouse %s", whId)
		}
		line := &fin.FinReportLine{
			AccountId:   whId,
			AccountName: name,
			Balance:     newMoney(g.total, currencyId),
			Level:       g.count,
			Description: fmt.Sprintf("%d items", g.count),
		}
		section.Lines = append(section.Lines, line)
		section.SectionTotal = addMoney(section.SectionTotal, line.Balance)
	}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = countLines(report.Sections)
	return nil
}
