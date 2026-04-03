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
package engchangeorders

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgEngChangeOrderServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&mfg.MfgEngChangeOrder{}, vnic).
		StatusTransition(engChangeOrderTransitions()).
		Require(func(v interface{}) string { return v.(*mfg.MfgEngChangeOrder).ChangeOrderId }, "ChangeOrderId").
		Require(func(v interface{}) string { return v.(*mfg.MfgEngChangeOrder).Title }, "Title").
		Enum(func(v interface{}) int32 { return int32(v.(*mfg.MfgEngChangeOrder).Status) }, mfg.MfgChangeOrderStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*mfg.MfgEngChangeOrder).EstimatedCost }, "EstimatedCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*mfg.MfgEngChangeOrder).ActualCost }, "ActualCost").
		Build()
}

func engChangeOrderTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*mfg.MfgEngChangeOrder).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*mfg.MfgEngChangeOrder).Status = mfg.MfgChangeOrderStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*mfg.MfgEngChangeOrder);
			return &mfg.MfgEngChangeOrder{ChangeOrderId: e.ChangeOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2},       // DRAFT → SUBMITTED
			2: {3, 4},    // SUBMITTED → APPROVED, REJECTED
			3: {5},       // APPROVED → IMPLEMENTED
		},
		StatusNames: mfg.MfgChangeOrderStatus_name,
	}
}
