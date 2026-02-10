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
package cases

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmCaseServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[crm.CrmCase]("CrmCase",
		func(e *crm.CrmCase) { common.GenerateID(&e.CaseId) }).
		Require(func(e *crm.CrmCase) string { return e.CaseId }, "CaseId").
		Require(func(e *crm.CrmCase) string { return e.Subject }, "Subject").
		Require(func(e *crm.CrmCase) string { return e.AccountId }, "AccountId").
		Enum(func(e *crm.CrmCase) int32 { return int32(e.CaseType) }, crm.CrmCaseType_name, "CaseType").
		Enum(func(e *crm.CrmCase) int32 { return int32(e.Priority) }, crm.CrmCasePriority_name, "Priority").
		Enum(func(e *crm.CrmCase) int32 { return int32(e.Status) }, crm.CrmCaseStatus_name, "Status").
		Build()
}
