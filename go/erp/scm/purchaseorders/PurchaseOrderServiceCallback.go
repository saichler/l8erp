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
package purchaseorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/scm"
)

func newPurchaseOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[scm.ScmPurchaseOrder]("ScmPurchaseOrder",
		func(e *scm.ScmPurchaseOrder) { common.GenerateID(&e.PurchaseOrderId) }).
		StatusTransition(purchaseOrderTransitions()).
		Require(func(e *scm.ScmPurchaseOrder) string { return e.PurchaseOrderId }, "PurchaseOrderId").
		Require(func(e *scm.ScmPurchaseOrder) string { return e.VendorId }, "VendorId").
		Enum(func(e *scm.ScmPurchaseOrder) int32 { return int32(e.Status) }, scm.ScmPurchaseOrderStatus_name, "Status").
		OptionalMoney(func(e *scm.ScmPurchaseOrder) *erp.Money { return e.TotalAmount }, "TotalAmount").
		Build()
}

func purchaseOrderTransitions() *common.StatusTransitionConfig[scm.ScmPurchaseOrder] {
	return &common.StatusTransitionConfig[scm.ScmPurchaseOrder]{
		StatusGetter:  func(e *scm.ScmPurchaseOrder) int32 { return int32(e.Status) },
		StatusSetter:  func(e *scm.ScmPurchaseOrder, s int32) { e.Status = scm.ScmPurchaseOrderStatus(s) },
		FilterBuilder: func(e *scm.ScmPurchaseOrder) *scm.ScmPurchaseOrder {
			return &scm.ScmPurchaseOrder{PurchaseOrderId: e.PurchaseOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 7},    // DRAFT → APPROVED, CANCELLED
			2: {3, 7},    // APPROVED → SENT, CANCELLED
			3: {4, 5, 7}, // SENT → PARTIALLY_RECEIVED, RECEIVED, CANCELLED
			4: {5, 7},    // PARTIALLY_RECEIVED → RECEIVED, CANCELLED
			5: {6},       // RECEIVED → CLOSED
		},
		StatusNames: scm.ScmPurchaseOrderStatus_name,
	}
}
