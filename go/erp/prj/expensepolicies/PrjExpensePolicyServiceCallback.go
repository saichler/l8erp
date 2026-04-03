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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/prj"
)

func newPrjExpensePolicyServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&prj.PrjExpensePolicy{}, vnic).
		Require(func(v interface{}) string { return v.(*prj.PrjExpensePolicy).PolicyId }, "PolicyId").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjExpensePolicy).DailyMealLimit }, "DailyMealLimit").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjExpensePolicy).DailyLodgingLimit }, "DailyLodgingLimit").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjExpensePolicy).MileageRate }, "MileageRate").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjExpensePolicy).MaxSingleExpense }, "MaxSingleExpense").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjExpensePolicy).ReceiptThreshold }, "ReceiptThreshold").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjExpensePolicy).AdvanceApprovalThreshold }, "AdvanceApprovalThreshold").
		DateAfter(func(v interface{}) int64 { return v.(*prj.PrjExpensePolicy).ExpiryDate }, func(v interface{}) int64 { return v.(*prj.PrjExpensePolicy).EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}
