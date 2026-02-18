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
package deliveryorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

func newDeliveryOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesDeliveryOrder]("SalesDeliveryOrder",
		func(e *sales.SalesDeliveryOrder) { common.GenerateID(&e.DeliveryOrderId) }).
		StatusTransition(deliveryOrderTransitions()).
		Require(func(e *sales.SalesDeliveryOrder) string { return e.DeliveryOrderId }, "DeliveryOrderId").
		Require(func(e *sales.SalesDeliveryOrder) string { return e.SalesOrderId }, "SalesOrderId").
		Require(func(e *sales.SalesDeliveryOrder) string { return e.CustomerId }, "CustomerId").
		Enum(func(e *sales.SalesDeliveryOrder) int32 { return int32(e.Status) }, sales.SalesDeliveryStatus_name, "Status").
		OptionalMoney(func(e *sales.SalesDeliveryOrder) *erp.Money { return e.ShippingCost }, "ShippingCost").
		Build()
}

func deliveryOrderTransitions() *common.StatusTransitionConfig[sales.SalesDeliveryOrder] {
	return &common.StatusTransitionConfig[sales.SalesDeliveryOrder]{
		StatusGetter:  func(e *sales.SalesDeliveryOrder) int32 { return int32(e.Status) },
		StatusSetter:  func(e *sales.SalesDeliveryOrder, s int32) { e.Status = sales.SalesDeliveryStatus(s) },
		FilterBuilder: func(e *sales.SalesDeliveryOrder) *sales.SalesDeliveryOrder {
			return &sales.SalesDeliveryOrder{DeliveryOrderId: e.DeliveryOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 6},    // PLANNED → PICKING, FAILED
			2: {3, 6},    // PICKING → PACKED, FAILED
			3: {4, 6},    // PACKED → SHIPPED, FAILED
			4: {5, 6},    // SHIPPED → DELIVERED, FAILED
		},
		StatusNames: sales.SalesDeliveryStatus_name,
	}
}
