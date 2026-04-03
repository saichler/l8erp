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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmCampaignServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&crm.CrmCampaign{}, vnic).
		StatusTransition(crmCampaignTransitions()).
		Compute(computeCampaignMetrics).
		Require(func(v interface{}) string { return v.(*crm.CrmCampaign).CampaignId }, "CampaignId").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmCampaign).CampaignType) }, crm.CrmCampaignType_name, "CampaignType").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmCampaign).Status) }, crm.CrmCampaignStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*crm.CrmCampaign).BudgetedCost }, "BudgetedCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*crm.CrmCampaign).ActualCost }, "ActualCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*crm.CrmCampaign).ExpectedRevenue }, "ExpectedRevenue").
		DateAfter(func(v interface{}) int64 { return v.(*crm.CrmCampaign).EndDate }, func(v interface{}) int64 { return v.(*crm.CrmCampaign).StartDate }, "EndDate", "StartDate").
		Build()
}

func crmCampaignTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*crm.CrmCampaign).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*crm.CrmCampaign).Status = crm.CrmCampaignStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*crm.CrmCampaign);
			return &crm.CrmCampaign{CampaignId: e.CampaignId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 4},    // PLANNED → ACTIVE, ABORTED
			2: {3, 4},    // ACTIVE → COMPLETED, ABORTED
		},
		StatusNames: crm.CrmCampaignStatus_name,
	}
}
