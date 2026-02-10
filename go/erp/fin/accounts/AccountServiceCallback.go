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
package accounts

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/fin"
)

func newAccountServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.Account]("Account",
		func(e *fin.Account) { common.GenerateID(&e.AccountId) }).
		Require(func(e *fin.Account) string { return e.AccountId }, "AccountId").
		Require(func(e *fin.Account) string { return e.Name }, "Name").
		Enum(func(e *fin.Account) int32 { return int32(e.AccountType) }, fin.AccountType_name, "AccountType").
		Enum(func(e *fin.Account) int32 { return int32(e.NormalBalance) }, fin.BalanceType_name, "NormalBalance").
		Build()
}
