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
package campaigns

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmCampaignServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[crm.CrmCampaign]("CrmCampaign",
		func(e *crm.CrmCampaign) { common.GenerateID(&e.CampaignId) }).
		Require(func(e *crm.CrmCampaign) string { return e.CampaignId }, "CampaignId").
		Enum(func(e *crm.CrmCampaign) int32 { return int32(e.CampaignType) }, crm.CrmCampaignType_name, "CampaignType").
		Enum(func(e *crm.CrmCampaign) int32 { return int32(e.Status) }, crm.CrmCampaignStatus_name, "Status").
		OptionalMoney(func(e *crm.CrmCampaign) *erp.Money { return e.BudgetedCost }, "BudgetedCost").
		OptionalMoney(func(e *crm.CrmCampaign) *erp.Money { return e.ActualCost }, "ActualCost").
		OptionalMoney(func(e *crm.CrmCampaign) *erp.Money { return e.ExpectedRevenue }, "ExpectedRevenue").
		DateAfter(func(e *crm.CrmCampaign) int64 { return e.EndDate }, func(e *crm.CrmCampaign) int64 { return e.StartDate }, "EndDate", "StartDate").
		Build()
}
