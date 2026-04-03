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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/scm"
	"time"
)

func newWavePlanServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&scm.ScmWavePlan{}, vnic).
		After(updateInventoryOnPick).
		Require(func(v interface{}) string { return v.(*scm.ScmWavePlan).WavePlanId }, "WavePlanId").
		Enum(func(v interface{}) int32 { return int32(v.(*scm.ScmWavePlan).Status) }, scm.ScmTaskStatus_name, "Status").
		Build()
}

// updateInventoryOnPick appends ISSUE stock movements and decrements bin quantities.
func updateInventoryOnPick(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	wp := v.(*scm.ScmWavePlan)
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
	itemTyped := item.(*scm.ScmItem)
		var movementId string
		common.GenerateID(&movementId)
		itemTyped.Movements = append(itemTyped.Movements, &scm.ScmStockMovement{
			MovementId:    movementId,
			WarehouseId:   wp.WarehouseId,
			BinId:         task.FromBinId,
			MovementType:  scm.ScmMovementType_MOVEMENT_TYPE_ISSUE,
			Quantity:      task.Quantity,
			UnitOfMeasure: itemTyped.UnitOfMeasure,
			ReferenceId:   wp.WavePlanId,
			ReferenceType: "WavePlan",
			MovementDate:  now,
		})
		if err := common.PutEntity("Item", 50, item, vnic); err != nil {
			return err
		}
		whRaw, err := common.GetEntity("Warehouse", 50,
			&scm.ScmWarehouse{WarehouseId: wp.WarehouseId}, vnic)
		if err != nil || whRaw == nil {
			return err
		}
		wh := whRaw.(*scm.ScmWarehouse)
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
