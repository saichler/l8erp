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
package vendorpayments

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

func newVendorPaymentServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.VendorPayment]("VendorPayment",
		func(e *fin.VendorPayment) { common.GenerateID(&e.PaymentId) }).
		Require(func(e *fin.VendorPayment) string { return e.PaymentId }, "PaymentId").
		Require(func(e *fin.VendorPayment) string { return e.VendorId }, "VendorId").
		Enum(func(e *fin.VendorPayment) int32 { return int32(e.PaymentMethod) }, fin.PaymentMethod_name, "PaymentMethod").
		Enum(func(e *fin.VendorPayment) int32 { return int32(e.Status) }, fin.PaymentStatus_name, "Status").
		OptionalMoney(func(e *fin.VendorPayment) *erp.Money { return e.Amount }, "Amount").
		Build()
}
