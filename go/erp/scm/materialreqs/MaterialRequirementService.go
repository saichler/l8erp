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

package materialreqs

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "MatReq"
	ServiceArea = byte(50)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService(common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "RequirementId", Callback: newMaterialRequirementServiceCallback(vnic),
	}, &scm.ScmMaterialRequirement{}, &scm.ScmMaterialRequirementList{}, creds, dbname, vnic)
}

func MaterialRequirements(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func MaterialRequirement(requirementId string, vnic ifs.IVNic) (*scm.ScmMaterialRequirement, error) {
	result, err := common.GetEntity(ServiceName, ServiceArea, &scm.ScmMaterialRequirement{RequirementId: requirementId}, vnic)
	if err != nil || result == nil {
		return nil, err
	}
	return result.(*scm.ScmMaterialRequirement), nil
}
