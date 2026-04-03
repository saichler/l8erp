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
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/ecom"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newEcomOrderServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&ecom.EcomOrder{}, vnic).
		Compute(computeOrderTotals).
		Require(func(v interface{}) string { return v.(*ecom.EcomOrder).OrderId }, "OrderId").
		Require(func(v interface{}) string { return v.(*ecom.EcomOrder).CustomerId }, "CustomerId").
		Enum(func(v interface{}) int32 { return int32(v.(*ecom.EcomOrder).PaymentStatus) }, ecom.EcomPaymentStatus_name, "PaymentStatus").
		Enum(func(v interface{}) int32 { return int32(v.(*ecom.EcomOrder).Status) }, ecom.EcomOrderStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomOrder).Subtotal }, "Subtotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomOrder).DiscountAmount }, "DiscountAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomOrder).ShippingAmount }, "ShippingAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomOrder).TaxAmount }, "TaxAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomOrder).TotalAmount }, "TotalAmount").
		Build()
}
