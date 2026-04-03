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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmCaseServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&crm.CrmCase{}, vnic).
		After(cascadeCreateSurvey).
		After(checkSLABreach).
		Custom(applySLADeadline).
		Require(func(v interface{}) string { return v.(*crm.CrmCase).CaseId }, "CaseId").
		Require(func(v interface{}) string { return v.(*crm.CrmCase).Subject }, "Subject").
		Require(func(v interface{}) string { return v.(*crm.CrmCase).AccountId }, "AccountId").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmCase).CaseType) }, crm.CrmCaseType_name, "CaseType").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmCase).Priority) }, crm.CrmCasePriority_name, "Priority").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmCase).Status) }, crm.CrmCaseStatus_name, "Status").
		Build()
}

// cascadeCreateSurvey auto-creates a customer satisfaction survey when a case is resolved.
func cascadeCreateSurvey(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	crmCase := v.(*crm.CrmCase)
	if crmCase.Status != crm.CrmCaseStatus_CRM_CASE_STATUS_RESOLVED {
		return nil
	}
	exists, err := common.EntityExists("CrmSurvey", 80,
		&crm.CrmSurvey{CaseId: crmCase.CaseId}, vnic)
	if err != nil || exists {
		return err
	}
	_, err = common.PostEntity("CrmSurvey", 80, &crm.CrmSurvey{
		Name:       "Case Resolution Survey - " + crmCase.CaseNumber,
		CaseId:     crmCase.CaseId,
		AccountId:  crmCase.AccountId,
		ContactId:  crmCase.ContactId,
		OwnerId:    crmCase.OwnerId,
		Status:     crm.CrmSurveyStatus_CRM_SURVEY_STATUS_DRAFT,
		SurveyType: "CASE_RESOLUTION",
		AuditInfo:  &l8common.AuditInfo{},
	}, vnic)
	return err
}
