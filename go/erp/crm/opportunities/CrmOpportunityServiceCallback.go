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
package opportunities

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmOpportunityServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&crm.CrmOpportunity{}, vnic).
		StatusTransition(crmOpportunityTransitions()).
		Require(func(v interface{}) string { return v.(*crm.CrmOpportunity).OpportunityId }, "OpportunityId").
		Require(func(v interface{}) string { return v.(*crm.CrmOpportunity).AccountId }, "AccountId").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmOpportunity).Stage) }, crm.CrmSalesStage_name, "Stage").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmOpportunity).Status) }, crm.CrmOpportunityStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*crm.CrmOpportunity).Amount }, "Amount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*crm.CrmOpportunity).ExpectedRevenue }, "ExpectedRevenue").
		Build()
}

func crmOpportunityTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*crm.CrmOpportunity).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*crm.CrmOpportunity).Status = crm.CrmOpportunityStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*crm.CrmOpportunity);
			return &crm.CrmOpportunity{OpportunityId: e.OpportunityId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 3, 4, 5}, // OPEN → WON, LOST, ON_HOLD, CANCELLED
			4: {1, 5},       // ON_HOLD → OPEN, CANCELLED
		},
		StatusNames: crm.CrmOpportunityStatus_name,
	}
}
