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
package coupons

import (
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/ecom"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newEcomCouponServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&ecom.EcomCoupon{}, vnic).
		Require(func(v interface{}) string { return v.(*ecom.EcomCoupon).CouponId }, "CouponId").
		Enum(func(v interface{}) int32 { return int32(v.(*ecom.EcomCoupon).DiscountType) }, ecom.EcomDiscountType_name, "DiscountType").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomCoupon).MaxDiscount }, "MaxDiscount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*ecom.EcomCoupon).MinPurchase }, "MinPurchase").
		DateAfter(func(v interface{}) int64 { return v.(*ecom.EcomCoupon).EndDate }, func(v interface{}) int64 { return v.(*ecom.EcomCoupon).StartDate }, "EndDate", "StartDate").
		Build()
}
