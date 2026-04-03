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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/scm"
	"time"
)

func newReceivingOrderServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&scm.ScmReceivingOrder{}, vnic).
		After(cascadeCreatePurchaseInvoice).
		After(updateInventoryOnReceipt).
		Custom(validateLotSerial).
		Require(func(v interface{}) string { return v.(*scm.ScmReceivingOrder).ReceivingOrderId }, "ReceivingOrderId").
		Enum(func(v interface{}) int32 { return int32(v.(*scm.ScmReceivingOrder).Status) }, scm.ScmTaskStatus_name, "Status").
		Build()
}

// updateInventoryOnReceipt appends RECEIPT stock movements and increments bin quantities.
func updateInventoryOnReceipt(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	recv := v.(*scm.ScmReceivingOrder)
	if recv.Status != scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
		return nil
	}
	now := time.Now().Unix()
	for _, task := range recv.PutawayTasks {
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
			WarehouseId:   recv.WarehouseId,
			BinId:         task.ToBinId,
			MovementType:  scm.ScmMovementType_MOVEMENT_TYPE_RECEIPT,
			Quantity:      task.Quantity,
			UnitOfMeasure: itemTyped.UnitOfMeasure,
			ReferenceId:   recv.ReceivingOrderId,
			ReferenceType: "ReceivingOrder",
			MovementDate:  now,
		})
		if err := common.PutEntity("Item", 50, item, vnic); err != nil {
			return err
		}
		whRaw, err := common.GetEntity("Warehouse", 50,
			&scm.ScmWarehouse{WarehouseId: recv.WarehouseId}, vnic)
		if err != nil || whRaw == nil {
			return err
		}
		wh := whRaw.(*scm.ScmWarehouse)
		if bin := findBin(wh, task.ToBinId); bin != nil {
			bin.CurrentQuantity += task.Quantity
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

// cascadeCreatePurchaseInvoice auto-creates a purchase invoice when receiving is completed.
func cascadeCreatePurchaseInvoice(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	recv := v.(*scm.ScmReceivingOrder)
	if recv.Status != scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
		return nil
	}
	if recv.PurchaseOrderId == "" {
		return nil
	}
	exists, err := common.EntityExists("PurchInv", 40,
		&fin.PurchaseInvoice{ReceivingOrderId: recv.ReceivingOrderId}, vnic)
	if err != nil || exists {
		return err
	}
	po, err := common.GetEntity("PurchOrder", 50,
		&scm.ScmPurchaseOrder{PurchaseOrderId: recv.PurchaseOrderId}, vnic)
	if err != nil || po == nil {
		return err
	}
	poTyped := po.(*scm.ScmPurchaseOrder)
	lines := make([]*fin.PurchaseInvoiceLine, len(poTyped.Lines))
	for i, pl := range poTyped.Lines {
		lines[i] = &fin.PurchaseInvoiceLine{
			LineNumber:  pl.LineNumber,
			Description: pl.Description,
			Quantity:    pl.Quantity,
			UnitPrice:   pl.UnitPrice,
			LineAmount:  pl.TotalPrice,
			AuditInfo:   &l8common.AuditInfo{},
		}
	}
	now := time.Now().Unix()
	_, err = common.PostEntity("PurchInv", 40, &fin.PurchaseInvoice{
		VendorId:         poTyped.VendorId,
		PurchaseOrderId:  recv.PurchaseOrderId,
		ReceivingOrderId: recv.ReceivingOrderId,
		InvoiceDate:      now,
		DueDate:          now + 30*24*3600,
		Status:           fin.InvoiceStatus_INVOICE_STATUS_DRAFT,
		TotalAmount:      poTyped.TotalAmount,
		BalanceDue:       poTyped.TotalAmount,
		PaymentTermDays:  30,
		Lines:            lines,
		AuditInfo:        &l8common.AuditInfo{},
	}, vnic)
	return err
}
