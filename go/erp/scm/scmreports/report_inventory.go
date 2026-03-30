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
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
)

func itemTypeName(t scm.ScmItemType) string {
	switch t {
	case scm.ScmItemType_ITEM_TYPE_RAW_MATERIAL:
		return "Raw Material"
	case scm.ScmItemType_ITEM_TYPE_FINISHED_GOOD:
		return "Finished Good"
	case scm.ScmItemType_ITEM_TYPE_SEMI_FINISHED:
		return "Semi-Finished"
	case scm.ScmItemType_ITEM_TYPE_MRO:
		return "MRO"
	case scm.ScmItemType_ITEM_TYPE_SERVICE:
		return "Service"
	case scm.ScmItemType_ITEM_TYPE_CONSUMABLE:
		return "Consumable"
	default:
		return "Other"
	}
}

func generateInventoryValuation(report *fin.FinReport, vnic ifs.IVNic) error {
	items, err := common.GetEntities("Item", 50, &scm.ScmItem{}, vnic)
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId

	// Group items by type
	type typeGroup struct {
		lines []*fin.FinReportLine
		total int64
	}
	byType := make(map[scm.ScmItemType]*typeGroup)

	for _, item := range items {
		if !item.IsActive {
			continue
		}
		cost := moneyAmount(item.UnitCost)
		line := &fin.FinReportLine{
			AccountId:   item.ItemId,
			AccountName: item.Name,
			Description: item.ItemNumber,
			Balance:     newMoney(cost, currencyId),
		}
		g, ok := byType[item.ItemType]
		if !ok {
			g = &typeGroup{}
			byType[item.ItemType] = g
		}
		g.lines = append(g.lines, line)
		g.total += cost
	}

	var sections []*fin.FinReportSection
	grandTotal := int64(0)
	for it, g := range byType {
		section := &fin.FinReportSection{
			Title:        itemTypeName(it),
			Lines:        g.lines,
			SectionTotal: newMoney(g.total, currencyId),
		}
		sections = append(sections, section)
		grandTotal += g.total
	}

	report.Sections = sections
	report.GrandTotal = newMoney(grandTotal, currencyId)
	report.RowCount = countLines(report.Sections)
	return nil
}
