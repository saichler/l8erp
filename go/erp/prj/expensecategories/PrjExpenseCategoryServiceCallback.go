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
package expensecategories

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/prj"
)

func newPrjExpenseCategoryServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[prj.PrjExpenseCategory]("PrjExpenseCategory",
		func(e *prj.PrjExpenseCategory) { common.GenerateID(&e.CategoryId) }).
		Require(func(e *prj.PrjExpenseCategory) string { return e.CategoryId }, "CategoryId").
		Enum(func(e *prj.PrjExpenseCategory) int32 { return int32(e.ExpenseType) }, prj.PrjExpenseType_name, "ExpenseType").
		OptionalMoney(func(e *prj.PrjExpenseCategory) *erp.Money { return e.DefaultLimit }, "DefaultLimit").
		Build()
}
