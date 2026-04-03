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
package promotions

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/ecom"
)

func newEcomPromotionServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&ecom.EcomPromotion{}, vnic).
		Require(func(v interface{}) string { return v.(*ecom.EcomPromotion).PromotionId }, "PromotionId").
		Enum(func(v interface{}) int32 { return int32(v.(*ecom.EcomPromotion).PromotionType) }, ecom.EcomPromotionType_name, "PromotionType").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomPromotion).MaxDiscount }, "MaxDiscount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomPromotion).MinPurchase }, "MinPurchase").
		DateAfter(func(v interface{}) int64 { return v.(*ecom.EcomPromotion).EndDate }, func(v interface{}) int64 { return v.(*ecom.EcomPromotion).StartDate }, "EndDate", "StartDate").
		Build()
}
