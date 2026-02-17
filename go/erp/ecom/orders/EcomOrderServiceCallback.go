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
package orders

import (
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newEcomOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[ecom.EcomOrder]("EcomOrder",
		func(e *ecom.EcomOrder) { common.GenerateID(&e.OrderId) }).
		Require(func(e *ecom.EcomOrder) string { return e.OrderId }, "OrderId").
		Require(func(e *ecom.EcomOrder) string { return e.CustomerId }, "CustomerId").
		Enum(func(e *ecom.EcomOrder) int32 { return int32(e.PaymentStatus) }, ecom.EcomPaymentStatus_name, "PaymentStatus").
		Enum(func(e *ecom.EcomOrder) int32 { return int32(e.Status) }, ecom.EcomOrderStatus_name, "Status").
		OptionalMoney(func(e *ecom.EcomOrder) *erp.Money { return e.Subtotal }, "Subtotal").
		OptionalMoney(func(e *ecom.EcomOrder) *erp.Money { return e.DiscountAmount }, "DiscountAmount").
		OptionalMoney(func(e *ecom.EcomOrder) *erp.Money { return e.ShippingAmount }, "ShippingAmount").
		OptionalMoney(func(e *ecom.EcomOrder) *erp.Money { return e.TaxAmount }, "TaxAmount").
		OptionalMoney(func(e *ecom.EcomOrder) *erp.Money { return e.TotalAmount }, "TotalAmount").
		Build()
}
