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

package timesheets

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "PrjTmSheet"
	ServiceArea = byte(90)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	sla := common.NewOrmSLA(ServiceName, ServiceArea, "TimesheetId", newPrjTimesheetServiceCallback(vnic),
		&prj.PrjTimesheet{}, &prj.PrjTimesheetList{})
	common.ActivateService(sla, creds, dbname, vnic)
}

func PrjTimesheets(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func PrjTimesheet(timesheetId string, vnic ifs.IVNic) (*prj.PrjTimesheet, error) {
	result, err := common.GetEntity(ServiceName, ServiceArea, &prj.PrjTimesheet{ TimesheetId: timesheetId }, vnic)
	if err != nil || result == nil {
		return nil, err
	}
	return result.(*prj.PrjTimesheet), nil
}
