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
package expenseentries

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/prj"
)

func newPrjExpenseEntryServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[prj.PrjExpenseEntry]("PrjExpenseEntry",
		func(e *prj.PrjExpenseEntry) { common.GenerateID(&e.EntryId) }).
		Require(func(e *prj.PrjExpenseEntry) string { return e.EntryId }, "EntryId").
		Require(func(e *prj.PrjExpenseEntry) string { return e.CurrencyId }, "CurrencyId").
		Enum(func(e *prj.PrjExpenseEntry) int32 { return int32(e.ExpenseType) }, prj.PrjExpenseType_name, "ExpenseType").
		Build()
}
