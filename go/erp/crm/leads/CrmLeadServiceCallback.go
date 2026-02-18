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
package leads

import (
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8erp/go/erp/common"
)

func newCrmLeadServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[crm.CrmLead]("CrmLead",
		func(e *crm.CrmLead) { common.GenerateID(&e.LeadId) }).
		StatusTransition(crmLeadTransitions()).
		Require(func(e *crm.CrmLead) string { return e.LeadId }, "LeadId").
		Enum(func(e *crm.CrmLead) int32 { return int32(e.Rating) }, crm.CrmLeadRating_name, "Rating").
		Enum(func(e *crm.CrmLead) int32 { return int32(e.Status) }, crm.CrmLeadStatus_name, "Status").
		OptionalMoney(func(e *crm.CrmLead) *erp.Money { return e.AnnualRevenue }, "AnnualRevenue").
		Build()
}

func crmLeadTransitions() *common.StatusTransitionConfig[crm.CrmLead] {
	return &common.StatusTransitionConfig[crm.CrmLead]{
		StatusGetter:  func(e *crm.CrmLead) int32 { return int32(e.Status) },
		StatusSetter:  func(e *crm.CrmLead, s int32) { e.Status = crm.CrmLeadStatus(s) },
		FilterBuilder: func(e *crm.CrmLead) *crm.CrmLead {
			return &crm.CrmLead{LeadId: e.LeadId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 4},    // NEW → CONTACTED, UNQUALIFIED
			2: {3, 4},    // CONTACTED → QUALIFIED, UNQUALIFIED
			3: {5, 6},    // QUALIFIED → CONVERTED, LOST
		},
		StatusNames: crm.CrmLeadStatus_name,
	}
}
