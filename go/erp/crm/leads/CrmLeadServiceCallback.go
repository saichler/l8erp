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
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/crm"
	common "github.com/saichler/l8erp/go/erp/common"
)

func newCrmLeadServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&crm.CrmLead{}, vnic).
		StatusTransition(crmLeadTransitions()).
		After(cascadeConvertLead).
		Custom(computeLeadScore).
		Require(func(v interface{}) string { return v.(*crm.CrmLead).LeadId }, "LeadId").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmLead).Rating) }, crm.CrmLeadRating_name, "Rating").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmLead).Status) }, crm.CrmLeadStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*crm.CrmLead).AnnualRevenue }, "AnnualRevenue").
		Build()
}

func crmLeadTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*crm.CrmLead).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*crm.CrmLead).Status = crm.CrmLeadStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*crm.CrmLead);
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
