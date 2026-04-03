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
package paymentmethods

import (
	common "github.com/saichler/l8common/go/generic"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/ecom"
)

func newEcomPaymentMethodServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[ecom.EcomPaymentMethod]("EcomPaymentMethod",
		func(e *ecom.EcomPaymentMethod) { common.GenerateID(&e.MethodId) }).
		Require(func(e *ecom.EcomPaymentMethod) string { return e.MethodId }, "MethodId").
		OptionalMoney(func(e *ecom.EcomPaymentMethod) *l8common.Money { return e.MinAmount }, "MinAmount").
		OptionalMoney(func(e *ecom.EcomPaymentMethod) *l8common.Money { return e.MaxAmount }, "MaxAmount").
		OptionalMoney(func(e *ecom.EcomPaymentMethod) *l8common.Money { return e.TransactionFeeFixed }, "TransactionFeeFixed").
		Build()
}
