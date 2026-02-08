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
package creditmemos

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/fin"
)

func newCreditMemoServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.CreditMemo]("CreditMemo",
		func(e *fin.CreditMemo) { common.GenerateID(&e.CreditMemoId) }).
		Require(func(e *fin.CreditMemo) string { return e.CreditMemoId }, "CreditMemoId").
		Require(func(e *fin.CreditMemo) string { return e.CustomerId }, "CustomerId").
		Build()
}
