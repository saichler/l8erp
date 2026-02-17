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
package expensepolicies

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/prj"
)

func newPrjExpensePolicyServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[prj.PrjExpensePolicy]("PrjExpensePolicy",
		func(e *prj.PrjExpensePolicy) { common.GenerateID(&e.PolicyId) }).
		Require(func(e *prj.PrjExpensePolicy) string { return e.PolicyId }, "PolicyId").
		OptionalMoney(func(e *prj.PrjExpensePolicy) *erp.Money { return e.DailyMealLimit }, "DailyMealLimit").
		OptionalMoney(func(e *prj.PrjExpensePolicy) *erp.Money { return e.DailyLodgingLimit }, "DailyLodgingLimit").
		OptionalMoney(func(e *prj.PrjExpensePolicy) *erp.Money { return e.MileageRate }, "MileageRate").
		OptionalMoney(func(e *prj.PrjExpensePolicy) *erp.Money { return e.MaxSingleExpense }, "MaxSingleExpense").
		OptionalMoney(func(e *prj.PrjExpensePolicy) *erp.Money { return e.ReceiptThreshold }, "ReceiptThreshold").
		OptionalMoney(func(e *prj.PrjExpensePolicy) *erp.Money { return e.AdvanceApprovalThreshold }, "AdvanceApprovalThreshold").
		DateAfter(func(e *prj.PrjExpensePolicy) int64 { return e.ExpiryDate }, func(e *prj.PrjExpensePolicy) int64 { return e.EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}
