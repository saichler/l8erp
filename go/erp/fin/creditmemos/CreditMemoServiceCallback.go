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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
)

func newCreditMemoServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.CreditMemo{}, vnic).
		StatusTransition(creditMemoTransitions()).
		Require(func(v interface{}) string { return v.(*fin.CreditMemo).CreditMemoId }, "CreditMemoId").
		Require(func(v interface{}) string { return v.(*fin.CreditMemo).CustomerId }, "CustomerId").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.CreditMemo).Status) }, fin.CreditMemoStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CreditMemo).Amount }, "Amount").
		Build()
}

func creditMemoTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*fin.CreditMemo).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*fin.CreditMemo).Status = fin.CreditMemoStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*fin.CreditMemo);
			return &fin.CreditMemo{CreditMemoId: e.CreditMemoId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 4},    // DRAFT → APPROVED, VOID
			2: {3, 4},    // APPROVED → APPLIED, VOID
		},
		StatusNames: fin.CreditMemoStatus_name,
	}
}
