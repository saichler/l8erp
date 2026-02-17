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
package revenueschedules

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

func newRevenueScheduleServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesRevenueSchedule]("SalesRevenueSchedule",
		func(e *sales.SalesRevenueSchedule) { common.GenerateID(&e.ScheduleId) }).
		Require(func(e *sales.SalesRevenueSchedule) string { return e.ScheduleId }, "ScheduleId").
		Enum(func(e *sales.SalesRevenueSchedule) int32 { return int32(e.RecognitionMethod) }, sales.SalesRevenueRecognition_name, "RecognitionMethod").
		OptionalMoney(func(e *sales.SalesRevenueSchedule) *erp.Money { return e.TotalRevenue }, "TotalRevenue").
		OptionalMoney(func(e *sales.SalesRevenueSchedule) *erp.Money { return e.RecognizedRevenue }, "RecognizedRevenue").
		OptionalMoney(func(e *sales.SalesRevenueSchedule) *erp.Money { return e.DeferredRevenue }, "DeferredRevenue").
		DateAfter(func(e *sales.SalesRevenueSchedule) int64 { return e.EndDate }, func(e *sales.SalesRevenueSchedule) int64 { return e.StartDate }, "EndDate", "StartDate").
		Build()
}
