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

func newImportTemplateServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[l8api.L8ImportTemplate]("L8ImportTemplate",
		func(e *l8api.L8ImportTemplate) { common.GenerateID(&e.TemplateId) }).
		Require(func(e *l8api.L8ImportTemplate) string { return e.Name }, "Name").
		Require(func(e *l8api.L8ImportTemplate) string { return e.TargetModelType }, "TargetModelType").
		Require(func(e *l8api.L8ImportTemplate) string { return e.TargetServiceName }, "TargetServiceName").
		Build()
}
