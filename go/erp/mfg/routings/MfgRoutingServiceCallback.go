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
package routings

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgRoutingServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&mfg.MfgRouting{}, vnic).
		StatusTransition(routingTransitions()).
		Require(func(v interface{}) string { return v.(*mfg.MfgRouting).RoutingId }, "RoutingId").
		Require(func(v interface{}) string { return v.(*mfg.MfgRouting).ItemId }, "ItemId").
		Enum(func(v interface{}) int32 { return int32(v.(*mfg.MfgRouting).Status) }, mfg.MfgBomStatus_name, "Status").
		DateAfter(func(v interface{}) int64 { return v.(*mfg.MfgRouting).ExpiryDate }, func(v interface{}) int64 { return v.(*mfg.MfgRouting).EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}

func routingTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*mfg.MfgRouting).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*mfg.MfgRouting).Status = mfg.MfgBomStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*mfg.MfgRouting);
			return &mfg.MfgRouting{RoutingId: e.RoutingId}
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
