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
package bankaccounts

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

func newBankAccountServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.BankAccount]("BankAccount",
		func(e *fin.BankAccount) { common.GenerateID(&e.BankAccountId) }).
		Require(func(e *fin.BankAccount) string { return e.BankAccountId }, "BankAccountId").
		Require(func(e *fin.BankAccount) string { return e.AccountName }, "AccountName").
		Require(func(e *fin.BankAccount) string { return e.BankName }, "BankName").
		Require(func(e *fin.BankAccount) string { return e.GlAccountId }, "GlAccountId").
		Enum(func(e *fin.BankAccount) int32 { return int32(e.AccountType) }, fin.BankAccountType_name, "AccountType").
		Enum(func(e *fin.BankAccount) int32 { return int32(e.Status) }, fin.BankAccountStatus_name, "Status").
		OptionalMoney(func(e *fin.BankAccount) *erp.Money { return e.CurrentBalance }, "CurrentBalance").
		Build()
}
