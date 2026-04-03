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

package workcenters

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "MfgWorkCtr"
	ServiceArea = byte(70)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService(common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "WorkCenterId", Callback: newMfgWorkCenterServiceCallback(vnic),
	}, &mfg.MfgWorkCenter{}, &mfg.MfgWorkCenterList{}, creds, dbname, vnic)
}

func MfgWorkCenters(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func MfgWorkCenter(workCenterId string, vnic ifs.IVNic) (*mfg.MfgWorkCenter, error) {
	result, err := common.GetEntity(ServiceName, ServiceArea, &mfg.MfgWorkCenter{WorkCenterId: workCenterId}, vnic)
	if err != nil || result == nil {
		return nil, err
	}
	return result.(*mfg.MfgWorkCenter), nil
}
