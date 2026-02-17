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
package auditschedules

import (
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newCompAuditScheduleServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[comp.CompAuditSchedule]("CompAuditSchedule",
		func(e *comp.CompAuditSchedule) { common.GenerateID(&e.ScheduleId) }).
		Require(func(e *comp.CompAuditSchedule) string { return e.ScheduleId }, "ScheduleId").
		Enum(func(e *comp.CompAuditSchedule) int32 { return int32(e.AuditType) }, comp.CompAuditType_name, "AuditType").
		Enum(func(e *comp.CompAuditSchedule) int32 { return int32(e.Status) }, comp.CompAuditStatus_name, "Status").
		OptionalMoney(func(e *comp.CompAuditSchedule) *erp.Money { return e.Budget }, "Budget").
		OptionalMoney(func(e *comp.CompAuditSchedule) *erp.Money { return e.ActualCost }, "ActualCost").
		DateAfter(func(e *comp.CompAuditSchedule) int64 { return e.PlannedEndDate }, func(e *comp.CompAuditSchedule) int64 { return e.PlannedStartDate }, "PlannedEndDate", "PlannedStartDate").
		DateAfter(func(e *comp.CompAuditSchedule) int64 { return e.ActualEndDate }, func(e *comp.CompAuditSchedule) int64 { return e.ActualStartDate }, "ActualEndDate", "ActualStartDate").
		Build()
}
