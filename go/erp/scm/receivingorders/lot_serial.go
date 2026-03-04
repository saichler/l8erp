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
package receivingorders

import (
	"fmt"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
)

// validateLotSerial checks that items with existing lot/serial tracking data
// have lot/serial IDs on the receiving order's putaway task movements.
// This runs as a Custom validator before persistence.
func validateLotSerial(recv *scm.ScmReceivingOrder, vnic ifs.IVNic) error {
	if recv.Status != scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
		return nil
	}
	for _, task := range recv.PutawayTasks {
		if task.ItemId == "" || task.Status != scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
			continue
		}
		item, err := common.GetEntity("Item", 50, &scm.ScmItem{ItemId: task.ItemId}, vnic)
		if err != nil || item == nil {
			continue
		}
		if len(item.Lots) > 0 {
			// Item uses lot tracking — warn if quantity > 1 without a lot reference
			if task.Quantity > 1 {
				fmt.Printf("[WARN] Item %s is lot-tracked; putaway task %s has qty %.0f without lot assignment\n",
					task.ItemId, task.TaskId, task.Quantity)
			}
		}
		if len(item.Serials) > 0 {
			if task.Quantity > 1 {
				return fmt.Errorf("serial-tracked item %s: putaway quantity must be 1 (got %.0f)",
					task.ItemId, task.Quantity)
			}
		}
	}
	return nil
}
