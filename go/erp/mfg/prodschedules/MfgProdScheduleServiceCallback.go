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
package prodschedules

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgProdScheduleServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[mfg.MfgProdSchedule]("MfgProdSchedule",
		func(e *mfg.MfgProdSchedule) { common.GenerateID(&e.ScheduleId) }).
		Require(func(e *mfg.MfgProdSchedule) string { return e.ScheduleId }, "ScheduleId").
		Enum(func(e *mfg.MfgProdSchedule) int32 { return int32(e.ScheduleType) }, mfg.MfgScheduleType_name, "ScheduleType").
		Enum(func(e *mfg.MfgProdSchedule) int32 { return int32(e.Status) }, mfg.MfgScheduleStatus_name, "Status").
		Build()
}
