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
package purchasereqs

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/scm"
	"time"
)

func newPurchaseRequisitionServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&scm.ScmPurchaseRequisition{}, vnic).
		StatusTransition(purchaseRequisitionTransitions()).
		After(cascadeCancelPurchaseOrders).
		After(cascadeCreatePurchaseOrder).
		Require(func(v interface{}) string { return v.(*scm.ScmPurchaseRequisition).RequisitionId }, "RequisitionId").
		Enum(func(v interface{}) int32 { return int32(v.(*scm.ScmPurchaseRequisition).Status) }, scm.ScmRequisitionStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*scm.ScmPurchaseRequisition).EstimatedTotal }, "EstimatedTotal").
		Build()
}

// cascadeCancelPurchaseOrders cancels DRAFT purchase orders
// when a purchase requisition is cancelled.
func cascadeCancelPurchaseOrders(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	req := v.(*scm.ScmPurchaseRequisition)
	if req.Status != scm.ScmRequisitionStatus_REQUISITION_STATUS_CANCELLED {
		return nil
	}
	childrenRaw, err := common.GetEntities("PurchOrder", 50, &scm.ScmPurchaseOrder{RequisitionId: req.RequisitionId}, vnic)
	children := make([]*scm.ScmPurchaseOrder, 0, len(childrenRaw))
	for _, ri := range childrenRaw { children = append(children, ri.(*scm.ScmPurchaseOrder)) }
	if err != nil {
		return err
	}
	for _, child := range children {
		if int32(child.Status) != 1 { // Only cancel DRAFT POs
			continue
		}
		child.Status = scm.ScmPurchaseOrderStatus_PO_STATUS_CANCELLED
		if err := common.PutEntity("PurchOrder", 50, child, vnic); err != nil {
			return err
		}
	}
	return nil
}

// cascadeCreatePurchaseOrder auto-creates a purchase order when a requisition is approved.
func cascadeCreatePurchaseOrder(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	req := v.(*scm.ScmPurchaseRequisition)
	if req.Status != scm.ScmRequisitionStatus_REQUISITION_STATUS_APPROVED {
		return nil
	}
	exists, err := common.EntityExists("PurchOrder", 50,
		&scm.ScmPurchaseOrder{RequisitionId: req.RequisitionId}, vnic)
	if err != nil || exists {
		return err
	}
	// Use vendor from first requisition line if available
	vendorId := ""
	if len(req.Lines) > 0 && req.Lines[0].VendorId != "" {
		vendorId = req.Lines[0].VendorId
	}
	lines := make([]*scm.ScmPurchaseOrderLine, len(req.Lines))
	for i, rl := range req.Lines {
		lines[i] = &scm.ScmPurchaseOrderLine{
			LineNumber:    rl.LineNumber,
			ItemId:        rl.ItemId,
			Description:   rl.Description,
			Quantity:      rl.Quantity,
			UnitOfMeasure: rl.UnitOfMeasure,
			UnitPrice:     rl.EstimatedUnitPrice,
			TotalPrice:    rl.EstimatedTotal,
			AuditInfo:     &l8common.AuditInfo{},
		}
	}
	_, err = common.PostEntity("PurchOrder", 50, &scm.ScmPurchaseOrder{
		RequisitionId: req.RequisitionId,
		VendorId:      vendorId,
		OrderDate:     time.Now().Unix(),
		Status:        scm.ScmPurchaseOrderStatus_PO_STATUS_DRAFT,
		TotalAmount:   req.EstimatedTotal,
		Lines:         lines,
		AuditInfo:     &l8common.AuditInfo{},
	}, vnic)
	return err
}

func purchaseRequisitionTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*scm.ScmPurchaseRequisition).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*scm.ScmPurchaseRequisition).Status = scm.ScmRequisitionStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*scm.ScmPurchaseRequisition);
			return &scm.ScmPurchaseRequisition{RequisitionId: e.RequisitionId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 6},       // DRAFT → SUBMITTED, CANCELLED
			2: {3, 4, 6},    // SUBMITTED → APPROVED, REJECTED, CANCELLED
			3: {5},          // APPROVED → FULFILLED
		},
		StatusNames: scm.ScmRequisitionStatus_name,
	}
}
