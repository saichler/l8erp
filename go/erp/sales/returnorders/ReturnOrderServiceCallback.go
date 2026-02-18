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
package returnorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

func newReturnOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesReturnOrder]("SalesReturnOrder",
		func(e *sales.SalesReturnOrder) { common.GenerateID(&e.ReturnOrderId) }).
		StatusTransition(returnOrderTransitions()).
		Require(func(e *sales.SalesReturnOrder) string { return e.ReturnOrderId }, "ReturnOrderId").
		Require(func(e *sales.SalesReturnOrder) string { return e.SalesOrderId }, "SalesOrderId").
		Require(func(e *sales.SalesReturnOrder) string { return e.CustomerId }, "CustomerId").
		Enum(func(e *sales.SalesReturnOrder) int32 { return int32(e.Status) }, sales.SalesReturnStatus_name, "Status").
		OptionalMoney(func(e *sales.SalesReturnOrder) *erp.Money { return e.RefundAmount }, "RefundAmount").
		Build()
}

func returnOrderTransitions() *common.StatusTransitionConfig[sales.SalesReturnOrder] {
	return &common.StatusTransitionConfig[sales.SalesReturnOrder]{
		StatusGetter:  func(e *sales.SalesReturnOrder) int32 { return int32(e.Status) },
		StatusSetter:  func(e *sales.SalesReturnOrder, s int32) { e.Status = sales.SalesReturnStatus(s) },
		FilterBuilder: func(e *sales.SalesReturnOrder) *sales.SalesReturnOrder {
			return &sales.SalesReturnOrder{ReturnOrderId: e.ReturnOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 6},    // REQUESTED → APPROVED, REJECTED
			2: {3, 6},    // APPROVED → RECEIVED, REJECTED
			3: {4},       // RECEIVED → INSPECTED
			4: {5, 6},    // INSPECTED → PROCESSED, REJECTED
		},
		StatusNames: sales.SalesReturnStatus_name,
	}
}
