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
package waveplans

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/scm"
	"time"
)

func newWavePlanServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[scm.ScmWavePlan]("ScmWavePlan",
		func(e *scm.ScmWavePlan) { common.GenerateID(&e.WavePlanId) }).
		After(updateInventoryOnPick).
		Require(func(e *scm.ScmWavePlan) string { return e.WavePlanId }, "WavePlanId").
		Enum(func(e *scm.ScmWavePlan) int32 { return int32(e.Status) }, scm.ScmTaskStatus_name, "Status").
		Build()
}

// updateInventoryOnPick appends ISSUE stock movements and decrements bin quantities.
func updateInventoryOnPick(wp *scm.ScmWavePlan, action ifs.Action, vnic ifs.IVNic) error {
	if wp.Status != scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
		return nil
	}
	now := time.Now().Unix()
	for _, task := range wp.PickTasks {
		if task.Status != scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
			continue
		}
		item, err := common.GetEntity("Item", 50, &scm.ScmItem{ItemId: task.ItemId}, vnic)
		if err != nil || item == nil {
			return err
		}
		var movementId string
		common.GenerateID(&movementId)
		item.Movements = append(item.Movements, &scm.ScmStockMovement{
			MovementId:    movementId,
			WarehouseId:   wp.WarehouseId,
			BinId:         task.FromBinId,
			MovementType:  scm.ScmMovementType_MOVEMENT_TYPE_ISSUE,
			Quantity:      task.Quantity,
			UnitOfMeasure: item.UnitOfMeasure,
			ReferenceId:   wp.WavePlanId,
			ReferenceType: "WavePlan",
			MovementDate:  now,
		})
		if err := common.PutEntity("Item", 50, item, vnic); err != nil {
			return err
		}
		wh, err := common.GetEntity("Warehouse", 50,
			&scm.ScmWarehouse{WarehouseId: wp.WarehouseId}, vnic)
		if err != nil || wh == nil {
			return err
		}
		if bin := findBin(wh, task.FromBinId); bin != nil {
			bin.CurrentQuantity -= task.Quantity
		}
		if err := common.PutEntity("Warehouse", 50, wh, vnic); err != nil {
			return err
		}
	}
	return nil
}

func findBin(warehouse *scm.ScmWarehouse, binId string) *scm.ScmBin {
	for _, bin := range warehouse.Bins {
		if bin.BinId == binId {
			return bin
		}
	}
	return nil
}
