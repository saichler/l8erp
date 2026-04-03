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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
)

func newCapitalExpenditureServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.CapitalExpenditure{}, vnic).
		StatusTransition(capitalExpenditureTransitions()).
		Require(func(v interface{}) string { return v.(*fin.CapitalExpenditure).CapexId }, "CapexId").
		Require(func(v interface{}) string { return v.(*fin.CapitalExpenditure).ProjectName }, "ProjectName").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.CapitalExpenditure).Status) }, fin.CapexStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CapitalExpenditure).RequestedAmount }, "RequestedAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CapitalExpenditure).ApprovedAmount }, "ApprovedAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CapitalExpenditure).SpentAmount }, "SpentAmount").
		Build()
}

func capitalExpenditureTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*fin.CapitalExpenditure).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*fin.CapitalExpenditure).Status = fin.CapexStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*fin.CapitalExpenditure);
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
