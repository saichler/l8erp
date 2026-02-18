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
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8erp/go/erp/common"
)

func newMfgNCRServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[mfg.MfgNCR]("MfgNCR",
		func(e *mfg.MfgNCR) { common.GenerateID(&e.NcrId) }).
		StatusTransition(ncrTransitions()).
		Require(func(e *mfg.MfgNCR) string { return e.NcrId }, "NcrId").
		Require(func(e *mfg.MfgNCR) string { return e.Title }, "Title").
		Enum(func(e *mfg.MfgNCR) int32 { return int32(e.Disposition) }, mfg.MfgNCRDisposition_name, "Disposition").
		Enum(func(e *mfg.MfgNCR) int32 { return int32(e.Severity) }, mfg.MfgNCRSeverity_name, "Severity").
		Enum(func(e *mfg.MfgNCR) int32 { return int32(e.Status) }, mfg.MfgNCRStatus_name, "Status").
		OptionalMoney(func(e *mfg.MfgNCR) *erp.Money { return e.EstimatedCost }, "EstimatedCost").
		OptionalMoney(func(e *mfg.MfgNCR) *erp.Money { return e.ActualCost }, "ActualCost").
		Build()
}

func ncrTransitions() *common.StatusTransitionConfig[mfg.MfgNCR] {
	return &common.StatusTransitionConfig[mfg.MfgNCR]{
		StatusGetter:  func(e *mfg.MfgNCR) int32 { return int32(e.Status) },
		StatusSetter:  func(e *mfg.MfgNCR, s int32) { e.Status = mfg.MfgNCRStatus(s) },
		FilterBuilder: func(e *mfg.MfgNCR) *mfg.MfgNCR {
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
