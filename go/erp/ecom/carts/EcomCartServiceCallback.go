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
package carts

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/ecom"
)

func newEcomCartServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&ecom.EcomCart{}, vnic).
		Require(func(v interface{}) string { return v.(*ecom.EcomCart).CartId }, "CartId").
		Require(func(v interface{}) string { return v.(*ecom.EcomCart).CurrencyId }, "CurrencyId").
		Enum(func(v interface{}) int32 { return int32(v.(*ecom.EcomCart).Status) }, ecom.EcomCartStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomCart).Subtotal }, "Subtotal").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomCart).DiscountAmount }, "DiscountAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomCart).TaxAmount }, "TaxAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomCart).Total }, "Total").
		Build()
}
