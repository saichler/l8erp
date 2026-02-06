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

package leadassigns

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "CrmLdAssn"
	ServiceArea = byte(80)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService[crm.CrmLeadAssign, crm.CrmLeadAssignList](common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "AssignmentId", Callback: newCrmLeadAssignServiceCallback(),
		Transactional: true,
	}, creds, dbname, vnic)
}

func CrmLeadAssigns(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func CrmLeadAssign(assignmentId string, vnic ifs.IVNic) (*crm.CrmLeadAssign, error) {
	return common.GetEntity(ServiceName, ServiceArea, &crm.CrmLeadAssign{AssignmentId: assignmentId}, vnic)
}
