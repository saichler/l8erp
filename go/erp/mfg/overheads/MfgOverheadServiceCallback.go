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
package overheads

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8erp/go/erp/common"
)

func newMfgOverheadServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[mfg.MfgOverhead]("MfgOverhead",
		func(e *mfg.MfgOverhead) { common.GenerateID(&e.OverheadId) }).
		Require(func(e *mfg.MfgOverhead) string { return e.OverheadId }, "OverheadId").
		Require(func(e *mfg.MfgOverhead) string { return e.Name }, "Name").
		Require(func(e *mfg.MfgOverhead) string { return e.CurrencyId }, "CurrencyId").
		Enum(func(e *mfg.MfgOverhead) int32 { return int32(e.AllocationMethod) }, mfg.MfgOverheadMethod_name, "AllocationMethod").
		DateAfter(func(e *mfg.MfgOverhead) int64 { return e.ExpiryDate }, func(e *mfg.MfgOverhead) int64 { return e.EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}
