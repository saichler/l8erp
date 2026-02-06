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

package workflowsteps

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "DocWfStep"
	ServiceArea = byte(45)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService[doc.DocWorkflowStep, doc.DocWorkflowStepList](common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "StepId", Callback: newDocWorkflowStepServiceCallback(),
		Transactional: true,
	}, creds, dbname, vnic)
}

func DocWorkflowSteps(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func DocWorkflowStep(stepId string, vnic ifs.IVNic) (*doc.DocWorkflowStep, error) {
	return common.GetEntity(ServiceName, ServiceArea, &doc.DocWorkflowStep{StepId: stepId}, vnic)
}
