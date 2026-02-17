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
package salesorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

func newSalesOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesOrder]("SalesOrder",
		func(e *sales.SalesOrder) { common.GenerateID(&e.SalesOrderId) }).
		Require(func(e *sales.SalesOrder) string { return e.SalesOrderId }, "SalesOrderId").
		Require(func(e *sales.SalesOrder) string { return e.CustomerId }, "CustomerId").
		Require(func(e *sales.SalesOrder) string { return e.CurrencyId }, "CurrencyId").
		Enum(func(e *sales.SalesOrder) int32 { return int32(e.Status) }, sales.SalesOrderStatus_name, "Status").
		OptionalMoney(func(e *sales.SalesOrder) *erp.Money { return e.Subtotal }, "Subtotal").
		OptionalMoney(func(e *sales.SalesOrder) *erp.Money { return e.DiscountTotal }, "DiscountTotal").
		OptionalMoney(func(e *sales.SalesOrder) *erp.Money { return e.TaxTotal }, "TaxTotal").
		OptionalMoney(func(e *sales.SalesOrder) *erp.Money { return e.TotalAmount }, "TotalAmount").
		DateAfter(func(e *sales.SalesOrder) int64 { return e.RequestedDeliveryDate }, func(e *sales.SalesOrder) int64 { return e.OrderDate }, "RequestedDeliveryDate", "OrderDate").
		Build()
}
