// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package revenueschedules

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "RevSched"
	ServiceArea = byte(60)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService[sales.SalesRevenueSchedule, sales.SalesRevenueScheduleList](common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "ScheduleId", Callback: newRevenueScheduleServiceCallback(),
		Transactional: true, EnableCache: true,
	}, creds, dbname, vnic)
}

func RevenueSchedules(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func RevenueSchedule(scheduleId string, vnic ifs.IVNic) (*sales.SalesRevenueSchedule, error) {
	return common.GetEntity(ServiceName, ServiceArea, &sales.SalesRevenueSchedule{ScheduleId: scheduleId}, vnic)
}
