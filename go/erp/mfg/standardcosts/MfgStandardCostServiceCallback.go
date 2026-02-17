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
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgStandardCostServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[mfg.MfgStandardCost]("MfgStandardCost",
		func(e *mfg.MfgStandardCost) { common.GenerateID(&e.CostId) }).
		Require(func(e *mfg.MfgStandardCost) string { return e.CostId }, "CostId").
		Require(func(e *mfg.MfgStandardCost) string { return e.ItemId }, "ItemId").
		Require(func(e *mfg.MfgStandardCost) string { return e.CurrencyId }, "CurrencyId").
		OptionalMoney(func(e *mfg.MfgStandardCost) *erp.Money { return e.MaterialCost }, "MaterialCost").
		OptionalMoney(func(e *mfg.MfgStandardCost) *erp.Money { return e.LaborCost }, "LaborCost").
		OptionalMoney(func(e *mfg.MfgStandardCost) *erp.Money { return e.OverheadCost }, "OverheadCost").
		OptionalMoney(func(e *mfg.MfgStandardCost) *erp.Money { return e.OutsideProcessingCost }, "OutsideProcessingCost").
		OptionalMoney(func(e *mfg.MfgStandardCost) *erp.Money { return e.TotalCost }, "TotalCost").
		DateAfter(func(e *mfg.MfgStandardCost) int64 { return e.ExpiryDate }, func(e *mfg.MfgStandardCost) int64 { return e.EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}
