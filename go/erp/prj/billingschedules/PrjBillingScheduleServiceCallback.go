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
package billingschedules

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/prj"
)

func newPrjBillingScheduleServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&prj.PrjBillingSchedule{}, vnic).
		Require(func(v interface{}) string { return v.(*prj.PrjBillingSchedule).ScheduleId }, "ScheduleId").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjBillingSchedule).BillingType) }, prj.PrjBillingType_name, "BillingType").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjBillingSchedule).FixedAmount }, "FixedAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjBillingSchedule).RetainerAmount }, "RetainerAmount").
		DateAfter(func(v interface{}) int64 { return v.(*prj.PrjBillingSchedule).EndDate }, func(v interface{}) int64 { return v.(*prj.PrjBillingSchedule).StartDate }, "EndDate", "StartDate").
		Build()
}
