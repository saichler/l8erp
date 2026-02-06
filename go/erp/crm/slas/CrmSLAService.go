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

package slas

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "CrmSLA"
	ServiceArea = byte(80)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService[crm.CrmSLA, crm.CrmSLAList](common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "SlaId", Callback: newCrmSLAServiceCallback(),
		Transactional: true,
	}, creds, dbname, vnic)
}

func CrmSLAs(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func CrmSLA(slaId string, vnic ifs.IVNic) (*crm.CrmSLA, error) {
	return common.GetEntity(ServiceName, ServiceArea, &crm.CrmSLA{SlaId: slaId}, vnic)
}
