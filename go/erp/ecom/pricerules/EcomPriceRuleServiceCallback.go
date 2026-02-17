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
package pricerules

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/ecom"
)

func newEcomPriceRuleServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[ecom.EcomPriceRule]("EcomPriceRule",
		func(e *ecom.EcomPriceRule) { common.GenerateID(&e.RuleId) }).
		Require(func(e *ecom.EcomPriceRule) string { return e.RuleId }, "RuleId").
		Enum(func(e *ecom.EcomPriceRule) int32 { return int32(e.DiscountType) }, ecom.EcomDiscountType_name, "DiscountType").
		OptionalMoney(func(e *ecom.EcomPriceRule) *erp.Money { return e.MinQuantity }, "MinQuantity").
		OptionalMoney(func(e *ecom.EcomPriceRule) *erp.Money { return e.MaxQuantity }, "MaxQuantity").
		DateAfter(func(e *ecom.EcomPriceRule) int64 { return e.EndDate }, func(e *ecom.EcomPriceRule) int64 { return e.StartDate }, "EndDate", "StartDate").
		Build()
}
