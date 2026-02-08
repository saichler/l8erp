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
package budgettransfers

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/erp/common"
)

func newBudgetTransferServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.BudgetTransfer]("BudgetTransfer",
		func(e *fin.BudgetTransfer) { common.GenerateID(&e.TransferId) }).
		Require(func(e *fin.BudgetTransfer) string { return e.TransferId }, "TransferId").
		Require(func(e *fin.BudgetTransfer) string { return e.FromBudgetLineId }, "FromBudgetLineId").
		Require(func(e *fin.BudgetTransfer) string { return e.ToBudgetLineId }, "ToBudgetLineId").
		Build()
}
