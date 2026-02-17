/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package projecttemplates

import (
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newPrjProjectTemplateServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[prj.PrjProjectTemplate]("PrjProjectTemplate",
		func(e *prj.PrjProjectTemplate) { common.GenerateID(&e.TemplateId) }).
		Require(func(e *prj.PrjProjectTemplate) string { return e.TemplateId }, "TemplateId").
		Enum(func(e *prj.PrjProjectTemplate) int32 { return int32(e.DefaultBillingType) }, prj.PrjBillingType_name, "DefaultBillingType").
		Enum(func(e *prj.PrjProjectTemplate) int32 { return int32(e.ProjectType) }, prj.PrjProjectType_name, "ProjectType").
		OptionalMoney(func(e *prj.PrjProjectTemplate) *erp.Money { return e.DefaultBudget }, "DefaultBudget").
		Build()
}
