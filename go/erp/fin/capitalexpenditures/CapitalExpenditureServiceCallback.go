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
package capitalexpenditures

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

func newCapitalExpenditureServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.CapitalExpenditure]("CapitalExpenditure",
		func(e *fin.CapitalExpenditure) { common.GenerateID(&e.CapexId) }).
		StatusTransition(capitalExpenditureTransitions()).
		Require(func(e *fin.CapitalExpenditure) string { return e.CapexId }, "CapexId").
		Require(func(e *fin.CapitalExpenditure) string { return e.ProjectName }, "ProjectName").
		Enum(func(e *fin.CapitalExpenditure) int32 { return int32(e.Status) }, fin.CapexStatus_name, "Status").
		OptionalMoney(func(e *fin.CapitalExpenditure) *erp.Money { return e.RequestedAmount }, "RequestedAmount").
		OptionalMoney(func(e *fin.CapitalExpenditure) *erp.Money { return e.ApprovedAmount }, "ApprovedAmount").
		OptionalMoney(func(e *fin.CapitalExpenditure) *erp.Money { return e.SpentAmount }, "SpentAmount").
		Build()
}

func capitalExpenditureTransitions() *common.StatusTransitionConfig[fin.CapitalExpenditure] {
	return &common.StatusTransitionConfig[fin.CapitalExpenditure]{
		StatusGetter:  func(e *fin.CapitalExpenditure) int32 { return int32(e.Status) },
		StatusSetter:  func(e *fin.CapitalExpenditure, s int32) { e.Status = fin.CapexStatus(s) },
		FilterBuilder: func(e *fin.CapitalExpenditure) *fin.CapitalExpenditure {
			return &fin.CapitalExpenditure{CapexId: e.CapexId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 5},    // PROPOSED → APPROVED, CANCELLED
			2: {3, 5},    // APPROVED → IN_PROGRESS, CANCELLED
			3: {4, 5},    // IN_PROGRESS → COMPLETED, CANCELLED
		},
		StatusNames: fin.CapexStatus_name,
	}
}
