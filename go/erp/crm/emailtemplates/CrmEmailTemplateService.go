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

package emailtemplates

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "CrmEmailTp"
	ServiceArea = byte(80)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	sla := common.NewOrmSLA(ServiceName, ServiceArea, "TemplateId", newCrmEmailTemplateServiceCallback(vnic),
		&crm.CrmEmailTemplate{}, &crm.CrmEmailTemplateList{})
	common.ActivateService(sla, creds, dbname, vnic)
}

func CrmEmailTemplates(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func CrmEmailTemplate(templateId string, vnic ifs.IVNic) (*crm.CrmEmailTemplate, error) {
	result, err := common.GetEntity(ServiceName, ServiceArea, &crm.CrmEmailTemplate{ TemplateId: templateId }, vnic)
	if err != nil || result == nil {
		return nil, err
	}
	return result.(*crm.CrmEmailTemplate), nil
}
