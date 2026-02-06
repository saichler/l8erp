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

package utilizations

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "PrjUtil"
	ServiceArea = byte(90)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService[prj.PrjUtilization, prj.PrjUtilizationList](common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "UtilizationId", Callback: newPrjUtilizationServiceCallback(),
		Transactional: true,
	}, creds, dbname, vnic)
}

func PrjUtilizations(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func PrjUtilization(utilizationId string, vnic ifs.IVNic) (*prj.PrjUtilization, error) {
	return common.GetEntity(ServiceName, ServiceArea, &prj.PrjUtilization{UtilizationId: utilizationId}, vnic)
}
