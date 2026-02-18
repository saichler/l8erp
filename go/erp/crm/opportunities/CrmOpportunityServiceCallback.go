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
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmOpportunityServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[crm.CrmOpportunity]("CrmOpportunity",
		func(e *crm.CrmOpportunity) { common.GenerateID(&e.OpportunityId) }).
		StatusTransition(crmOpportunityTransitions()).
		Require(func(e *crm.CrmOpportunity) string { return e.OpportunityId }, "OpportunityId").
		Require(func(e *crm.CrmOpportunity) string { return e.AccountId }, "AccountId").
		Enum(func(e *crm.CrmOpportunity) int32 { return int32(e.Stage) }, crm.CrmSalesStage_name, "Stage").
		Enum(func(e *crm.CrmOpportunity) int32 { return int32(e.Status) }, crm.CrmOpportunityStatus_name, "Status").
		OptionalMoney(func(e *crm.CrmOpportunity) *erp.Money { return e.Amount }, "Amount").
		OptionalMoney(func(e *crm.CrmOpportunity) *erp.Money { return e.ExpectedRevenue }, "ExpectedRevenue").
		Build()
}

func crmOpportunityTransitions() *common.StatusTransitionConfig[crm.CrmOpportunity] {
	return &common.StatusTransitionConfig[crm.CrmOpportunity]{
		StatusGetter:  func(e *crm.CrmOpportunity) int32 { return int32(e.Status) },
		StatusSetter:  func(e *crm.CrmOpportunity, s int32) { e.Status = crm.CrmOpportunityStatus(s) },
		FilterBuilder: func(e *crm.CrmOpportunity) *crm.CrmOpportunity {
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
