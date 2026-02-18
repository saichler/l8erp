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
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/scm"
	"time"
)

func newReceivingOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[scm.ScmReceivingOrder]("ScmReceivingOrder",
		func(e *scm.ScmReceivingOrder) { common.GenerateID(&e.ReceivingOrderId) }).
		After(cascadeCreatePurchaseInvoice).
		Require(func(e *scm.ScmReceivingOrder) string { return e.ReceivingOrderId }, "ReceivingOrderId").
		Enum(func(e *scm.ScmReceivingOrder) int32 { return int32(e.Status) }, scm.ScmTaskStatus_name, "Status").
		Build()
}

// cascadeCreatePurchaseInvoice auto-creates a purchase invoice when receiving is completed.
func cascadeCreatePurchaseInvoice(recv *scm.ScmReceivingOrder, action ifs.Action, vnic ifs.IVNic) error {
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
	lines := make([]*fin.PurchaseInvoiceLine, len(po.Lines))
	for i, pl := range po.Lines {
		lines[i] = &fin.PurchaseInvoiceLine{
			LineNumber:  pl.LineNumber,
			Description: pl.Description,
			Quantity:    pl.Quantity,
			UnitPrice:   pl.UnitPrice,
			LineAmount:  pl.TotalPrice,
			AuditInfo:   &erp.AuditInfo{},
		}
	}
	now := time.Now().Unix()
	_, err = common.PostEntity("PurchInv", 40, &fin.PurchaseInvoice{
		VendorId:         po.VendorId,
		PurchaseOrderId:  recv.PurchaseOrderId,
		ReceivingOrderId: recv.ReceivingOrderId,
		InvoiceDate:      now,
		DueDate:          now + 30*24*3600,
		Status:           fin.InvoiceStatus_INVOICE_STATUS_DRAFT,
		TotalAmount:      po.TotalAmount,
		BalanceDue:       po.TotalAmount,
		PaymentTermDays:  30,
		Lines:            lines,
		AuditInfo:        &erp.AuditInfo{},
	}, vnic)
	return err
}
