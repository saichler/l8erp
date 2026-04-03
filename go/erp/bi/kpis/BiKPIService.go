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

package kpis

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "BiKPI"
	ServiceArea = byte(35)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService(common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "KpiId", Callback: newBiKPIServiceCallback(vnic),
	}, &bi.BiKPI{}, &bi.BiKPIList{}, creds, dbname, vnic)
}

func BiKPIs(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func BiKPI(kpiId string, vnic ifs.IVNic) (*bi.BiKPI, error) {
	result, err := common.GetEntity(ServiceName, ServiceArea, &bi.BiKPI{KpiId: kpiId}, vnic)
	if err != nil || result == nil {
		return nil, err
	}
	return result.(*bi.BiKPI), nil
}
