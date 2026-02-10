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
package surveys

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmSurveyServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[crm.CrmSurvey]("CrmSurvey",
		func(e *crm.CrmSurvey) { common.GenerateID(&e.SurveyId) }).
		Require(func(e *crm.CrmSurvey) string { return e.SurveyId }, "SurveyId").
		Require(func(e *crm.CrmSurvey) string { return e.Name }, "Name").
		Require(func(e *crm.CrmSurvey) string { return e.AccountId }, "AccountId").
		Enum(func(e *crm.CrmSurvey) int32 { return int32(e.Status) }, crm.CrmSurveyStatus_name, "Status").
		Build()
}
