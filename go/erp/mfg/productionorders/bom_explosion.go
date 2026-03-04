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
package productionorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

const maxBOMDepth = 10

// explodeBOM creates material consumption records on a work order by
// walking the BOM tree. For phantom BOMs, components are flattened
// into the parent work order's consumption list.
func explodeBOM(wo *mfg.MfgWorkOrder, orderQty float64, vnic ifs.IVNic) {
	if wo.BomId == "" {
		return
	}
	bom, err := common.GetEntity("MfgBom", 70,
		&mfg.MfgBom{BomId: wo.BomId}, vnic)
	if err != nil || bom == nil {
		return
	}
	wo.Consumptions = explodeBOMLines(bom.Lines, orderQty, vnic, 0)
}

func explodeBOMLines(lines []*mfg.MfgBomLine, orderQty float64, vnic ifs.IVNic, depth int) []*mfg.MfgProdConsumption {
	if depth >= maxBOMDepth {
		return nil
	}
	var result []*mfg.MfgProdConsumption
	for _, line := range lines {
		if line.ComponentItemId == "" {
			continue
		}
		reqQty := line.QuantityPer * orderQty * (1 + line.ScrapPercent/100)
		// Check if this component has a phantom BOM (recurse)
		childBOM := findActiveBOM(line.ComponentItemId, vnic)
		if childBOM != nil && int32(childBOM.BomType) == 3 { // PHANTOM
			childConsumptions := explodeBOMLines(childBOM.Lines, reqQty, vnic, depth+1)
			result = append(result, childConsumptions...)
			continue
		}
		var consumptionId string
		common.GenerateID(&consumptionId)
		result = append(result, &mfg.MfgProdConsumption{
			ConsumptionId:   consumptionId,
			ItemId:          line.ComponentItemId,
			QuantityPlanned: reqQty,
			UnitOfMeasure:   line.UnitOfMeasure,
			OperationId:     line.OperationId,
		})
	}
	return result
}

func findActiveBOM(itemId string, vnic ifs.IVNic) *mfg.MfgBom {
	boms, err := common.GetEntities("MfgBom", 70,
		&mfg.MfgBom{ItemId: itemId}, vnic)
	if err != nil {
		return nil
	}
	for _, b := range boms {
		if int32(b.Status) == 2 { // ACTIVE
			return b
		}
	}
	return nil
}
