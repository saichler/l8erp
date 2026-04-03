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
package standardcosts

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgStandardCostServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&mfg.MfgStandardCost{}, vnic).
		Require(func(v interface{}) string { return v.(*mfg.MfgStandardCost).CostId }, "CostId").
		Require(func(v interface{}) string { return v.(*mfg.MfgStandardCost).ItemId }, "ItemId").
		Require(func(v interface{}) string { return v.(*mfg.MfgStandardCost).CurrencyId }, "CurrencyId").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*mfg.MfgStandardCost).MaterialCost }, "MaterialCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*mfg.MfgStandardCost).LaborCost }, "LaborCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*mfg.MfgStandardCost).OverheadCost }, "OverheadCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*mfg.MfgStandardCost).OutsideProcessingCost }, "OutsideProcessingCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*mfg.MfgStandardCost).TotalCost }, "TotalCost").
		DateAfter(func(v interface{}) int64 { return v.(*mfg.MfgStandardCost).ExpiryDate }, func(v interface{}) int64 { return v.(*mfg.MfgStandardCost).EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}
