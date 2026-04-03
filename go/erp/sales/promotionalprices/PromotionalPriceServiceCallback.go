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
package promotionalprices

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/sales"
)

func newPromotionalPriceServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&sales.SalesPromotionalPrice{}, vnic).
		Require(func(v interface{}) string { return v.(*sales.SalesPromotionalPrice).PromoId }, "PromoId").
		Require(func(v interface{}) string { return v.(*sales.SalesPromotionalPrice).Name }, "Name").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesPromotionalPrice).PromotionalPrice }, "PromotionalPrice").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesPromotionalPrice).OriginalPrice }, "OriginalPrice").
		DateAfter(func(v interface{}) int64 { return v.(*sales.SalesPromotionalPrice).EndDate }, func(v interface{}) int64 { return v.(*sales.SalesPromotionalPrice).StartDate }, "EndDate", "StartDate").
		Build()
}
