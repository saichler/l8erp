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
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/sales"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newBillingScheduleServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&sales.SalesBillingSchedule{}, vnic).
		Require(func(v interface{}) string { return v.(*sales.SalesBillingSchedule).ScheduleId }, "ScheduleId").
		Require(func(v interface{}) string { return v.(*sales.SalesBillingSchedule).Name }, "Name").
		Require(func(v interface{}) string { return v.(*sales.SalesBillingSchedule).CustomerId }, "CustomerId").
		Enum(func(v interface{}) int32 { return int32(v.(*sales.SalesBillingSchedule).Frequency) }, sales.SalesBillingFrequency_name, "Frequency").
		Enum(func(v interface{}) int32 { return int32(v.(*sales.SalesBillingSchedule).Status) }, sales.SalesBillingStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesBillingSchedule).TotalAmount }, "TotalAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesBillingSchedule).BilledAmount }, "BilledAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesBillingSchedule).RemainingAmount }, "RemainingAmount").
		DateAfter(func(v interface{}) int64 { return v.(*sales.SalesBillingSchedule).EndDate }, func(v interface{}) int64 { return v.(*sales.SalesBillingSchedule).StartDate }, "EndDate", "StartDate").
		Build()
}
