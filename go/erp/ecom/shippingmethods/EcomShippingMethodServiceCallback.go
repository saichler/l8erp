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
package shippingmethods

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/ecom"
)

func newEcomShippingMethodServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[ecom.EcomShippingMethod]("EcomShippingMethod",
		func(e *ecom.EcomShippingMethod) { common.GenerateID(&e.MethodId) }).
		Require(func(e *ecom.EcomShippingMethod) string { return e.MethodId }, "MethodId").
		OptionalMoney(func(e *ecom.EcomShippingMethod) *erp.Money { return e.BaseRate }, "BaseRate").
		OptionalMoney(func(e *ecom.EcomShippingMethod) *erp.Money { return e.PerItemRate }, "PerItemRate").
		OptionalMoney(func(e *ecom.EcomShippingMethod) *erp.Money { return e.PerWeightRate }, "PerWeightRate").
		OptionalMoney(func(e *ecom.EcomShippingMethod) *erp.Money { return e.FreeShippingThreshold }, "FreeShippingThreshold").
		OptionalMoney(func(e *ecom.EcomShippingMethod) *erp.Money { return e.MinOrderAmount }, "MinOrderAmount").
		OptionalMoney(func(e *ecom.EcomShippingMethod) *erp.Money { return e.MaxOrderAmount }, "MaxOrderAmount").
		Build()
}
