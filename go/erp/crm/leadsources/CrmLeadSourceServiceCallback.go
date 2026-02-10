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
package leadsources

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmLeadSourceServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[crm.CrmLeadSource]("CrmLeadSource",
		func(e *crm.CrmLeadSource) { common.GenerateID(&e.SourceId) }).
		Require(func(e *crm.CrmLeadSource) string { return e.SourceId }, "SourceId").
		Enum(func(e *crm.CrmLeadSource) int32 { return int32(e.SourceType) }, crm.CrmLeadSourceType_name, "SourceType").
		Build()
}
