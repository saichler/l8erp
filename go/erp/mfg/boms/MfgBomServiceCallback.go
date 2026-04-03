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
package boms

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgBomServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&mfg.MfgBom{}, vnic).
		StatusTransition(mfgBomTransitions()).
		Require(func(v interface{}) string { return v.(*mfg.MfgBom).BomId }, "BomId").
		Require(func(v interface{}) string { return v.(*mfg.MfgBom).ItemId }, "ItemId").
		Enum(func(v interface{}) int32 { return int32(v.(*mfg.MfgBom).BomType) }, mfg.MfgBomType_name, "BomType").
		Enum(func(v interface{}) int32 { return int32(v.(*mfg.MfgBom).Status) }, mfg.MfgBomStatus_name, "Status").
		DateAfter(func(v interface{}) int64 { return v.(*mfg.MfgBom).ExpiryDate }, func(v interface{}) int64 { return v.(*mfg.MfgBom).EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}

func mfgBomTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*mfg.MfgBom).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*mfg.MfgBom).Status = mfg.MfgBomStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*mfg.MfgBom);
			return &mfg.MfgBom{BomId: e.BomId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {4},       // DRAFT → PENDING_APPROVAL
			4: {2, 1},    // PENDING_APPROVAL → ACTIVE, DRAFT
			2: {3},       // ACTIVE → OBSOLETE
		},
		StatusNames: mfg.MfgBomStatus_name,
	}
}
