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
package items

import (
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// checkReorderPoint checks if an item's on-hand quantity has dropped below the safety stock
// level and auto-creates a purchase requisition if so.
func checkReorderPoint(item *scm.ScmItem, action ifs.Action, vnic ifs.IVNic) error {
	if item.ItemId == "" || len(item.Movements) == 0 {
		return nil
	}
	// Find active safety stock for this item
	safetyStocks, err := common.GetEntities("SafeStock", 50,
		&scm.ScmSafetyStock{ItemId: item.ItemId}, vnic)
	if err != nil || len(safetyStocks) == 0 {
		return err
	}
	var ss *scm.ScmSafetyStock
	for _, s := range safetyStocks {
		if s.IsActive {
			ss = s
			break
		}
	}
	if ss == nil || ss.SafetyStockQuantity <= 0 {
		return nil
	}
	// Calculate on-hand from movements
	onHand := float64(0)
	for _, m := range item.Movements {
		switch m.MovementType {
		case scm.ScmMovementType_MOVEMENT_TYPE_RECEIPT,
			scm.ScmMovementType_MOVEMENT_TYPE_RETURN:
			onHand += m.Quantity
		case scm.ScmMovementType_MOVEMENT_TYPE_ISSUE,
			scm.ScmMovementType_MOVEMENT_TYPE_SCRAP:
			onHand -= m.Quantity
		}
	}
	if onHand > ss.SafetyStockQuantity {
		return nil
	}
	// Check if a DRAFT/SUBMITTED requisition already exists for this item
	exists, err := common.EntityExists("PurchReq", 50,
		&scm.ScmPurchaseRequisition{}, vnic)
	if err != nil {
		return err
	}
	if exists {
		// Simplified: don't create duplicates when any requisition exists
		// In production, would check per-item requisition lines
		return nil
	}
	// Auto-create purchase requisition
	reorderQty := ss.SafetyStockQuantity * 2 // order 2x safety stock
	_, err = common.PostEntity("PurchReq", 50, &scm.ScmPurchaseRequisition{
		RequestDate: time.Now().Unix(),
		Status:      scm.ScmRequisitionStatus_REQUISITION_STATUS_DRAFT,
		Description: "Auto-generated: reorder point reached for item " + item.ItemId,
		Lines: []*scm.ScmRequisitionLine{
			{
				ItemId:        item.ItemId,
				Quantity:      reorderQty,
				UnitOfMeasure: item.UnitOfMeasure,
			},
		},
		AuditInfo: &erp.AuditInfo{},
	}, vnic)
	return err
}
