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
	"github.com/saichler/l8erp/go/types/sales"
)

func newDeliveryOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesDeliveryOrder]("SalesDeliveryOrder",
		func(e *sales.SalesDeliveryOrder) { common.GenerateID(&e.DeliveryOrderId) }).
		Require(func(e *sales.SalesDeliveryOrder) string { return e.DeliveryOrderId }, "DeliveryOrderId").
		Require(func(e *sales.SalesDeliveryOrder) string { return e.SalesOrderId }, "SalesOrderId").
		Require(func(e *sales.SalesDeliveryOrder) string { return e.CustomerId }, "CustomerId").
		Enum(func(e *sales.SalesDeliveryOrder) int32 { return int32(e.Status) }, sales.SalesDeliveryStatus_name, "Status").
		Build()
}
