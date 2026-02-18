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
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/scm"
)

func newPurchaseRequisitionServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[scm.ScmPurchaseRequisition]("ScmPurchaseRequisition",
		func(e *scm.ScmPurchaseRequisition) { common.GenerateID(&e.RequisitionId) }).
		StatusTransition(purchaseRequisitionTransitions()).
		After(cascadeCancelPurchaseOrders).
		Require(func(e *scm.ScmPurchaseRequisition) string { return e.RequisitionId }, "RequisitionId").
		Enum(func(e *scm.ScmPurchaseRequisition) int32 { return int32(e.Status) }, scm.ScmRequisitionStatus_name, "Status").
		OptionalMoney(func(e *scm.ScmPurchaseRequisition) *erp.Money { return e.EstimatedTotal }, "EstimatedTotal").
		Build()
}

// cascadeCancelPurchaseOrders cancels DRAFT purchase orders
// when a purchase requisition is cancelled.
func cascadeCancelPurchaseOrders(req *scm.ScmPurchaseRequisition, action ifs.Action, vnic ifs.IVNic) error {
	if req.Status != scm.ScmRequisitionStatus_REQUISITION_STATUS_CANCELLED {
		return nil
	}
	children, err := common.GetEntities("PurchOrder", 50,
		&scm.ScmPurchaseOrder{RequisitionId: req.RequisitionId}, vnic)
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

func purchaseRequisitionTransitions() *common.StatusTransitionConfig[scm.ScmPurchaseRequisition] {
	return &common.StatusTransitionConfig[scm.ScmPurchaseRequisition]{
		StatusGetter:  func(e *scm.ScmPurchaseRequisition) int32 { return int32(e.Status) },
		StatusSetter:  func(e *scm.ScmPurchaseRequisition, s int32) { e.Status = scm.ScmRequisitionStatus(s) },
		FilterBuilder: func(e *scm.ScmPurchaseRequisition) *scm.ScmPurchaseRequisition {
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
