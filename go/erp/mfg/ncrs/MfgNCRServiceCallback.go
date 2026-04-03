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
package ncrs

import (
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/mfg"
	common "github.com/saichler/l8erp/go/erp/common"
)

func newMfgNCRServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&mfg.MfgNCR{}, vnic).
		StatusTransition(ncrTransitions()).
		Require(func(v interface{}) string { return v.(*mfg.MfgNCR).NcrId }, "NcrId").
		Require(func(v interface{}) string { return v.(*mfg.MfgNCR).Title }, "Title").
		Enum(func(v interface{}) int32 { return int32(v.(*mfg.MfgNCR).Disposition) }, mfg.MfgNCRDisposition_name, "Disposition").
		Enum(func(v interface{}) int32 { return int32(v.(*mfg.MfgNCR).Severity) }, mfg.MfgNCRSeverity_name, "Severity").
		Enum(func(v interface{}) int32 { return int32(v.(*mfg.MfgNCR).Status) }, mfg.MfgNCRStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*mfg.MfgNCR).EstimatedCost }, "EstimatedCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*mfg.MfgNCR).ActualCost }, "ActualCost").
		Build()
}

func ncrTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*mfg.MfgNCR).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*mfg.MfgNCR).Status = mfg.MfgNCRStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*mfg.MfgNCR);
			return &mfg.MfgNCR{NcrId: e.NcrId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2},       // OPEN → UNDER_REVIEW
			2: {3},       // UNDER_REVIEW → DISPOSITIONED
			3: {4},       // DISPOSITIONED → CLOSED
		},
		StatusNames: mfg.MfgNCRStatus_name,
	}
}
