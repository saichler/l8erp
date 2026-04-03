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
package qualityplans

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgQualityPlanServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&mfg.MfgQualityPlan{}, vnic).
		Require(func(v interface{}) string { return v.(*mfg.MfgQualityPlan).PlanId }, "PlanId").
		Require(func(v interface{}) string { return v.(*mfg.MfgQualityPlan).Name }, "Name").
		Enum(func(v interface{}) int32 { return int32(v.(*mfg.MfgQualityPlan).Status) }, mfg.MfgBomStatus_name, "Status").
		DateAfter(func(v interface{}) int64 { return v.(*mfg.MfgQualityPlan).ExpiryDate }, func(v interface{}) int64 { return v.(*mfg.MfgQualityPlan).EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}
