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

package importtemplate

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8types/go/types/l8api"
)

const (
	ServiceName = "ImprtTmpl"
	ServiceArea = byte(0)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService[l8api.L8ImportTemplate, l8api.L8ImportTemplateList](common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "TemplateId", Callback: newImportTemplateServiceCallback(),
	}, creds, dbname, vnic)
}

func ImportTemplates(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func ImportTemplate(templateId string, vnic ifs.IVNic) (*l8api.L8ImportTemplate, error) {
	return common.GetEntity(ServiceName, ServiceArea, &l8api.L8ImportTemplate{TemplateId: templateId}, vnic)
}
