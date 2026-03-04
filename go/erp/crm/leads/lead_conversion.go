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
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// cascadeConvertLead auto-creates a CrmOpportunity when a lead is converted,
// if the lead has a conversion record with CreateOpportunity=true.
func cascadeConvertLead(lead *crm.CrmLead, action ifs.Action, vnic ifs.IVNic) error {
	if lead.Status != crm.CrmLeadStatus_CRM_LEAD_STATUS_CONVERTED {
		return nil
	}
	// Check if any conversion requests opportunity creation
	createOpp := false
	for _, conv := range lead.Conversions {
		if conv.CreateOpportunity && conv.OpportunityId == "" {
			createOpp = true
			break
		}
	}
	if !createOpp {
		return nil
	}
	// Check if opportunity already exists for this lead
	exists, err := common.EntityExists("CrmOpp", 80,
		&crm.CrmOpportunity{LeadSourceId: lead.LeadId}, vnic)
	if err != nil || exists {
		return err
	}
	oppName := lead.Company
	if oppName == "" {
		oppName = lead.FirstName + " " + lead.LastName
	}
	opp := &crm.CrmOpportunity{
		Name:           oppName + " - Opportunity",
		AccountId:      firstConversionAccountId(lead),
		LeadSourceId:   lead.LeadId,
		CampaignId:     lead.CampaignId,
		Stage:          crm.CrmSalesStage_CRM_SALES_STAGE_PROSPECTING,
		Status:         crm.CrmOpportunityStatus_CRM_OPPORTUNITY_STATUS_OPEN,
		Probability:    10,
		Amount:         lead.AnnualRevenue,
		OwnerId:        lead.OwnerId,
		CloseDate:      time.Now().Add(90 * 24 * time.Hour).Unix(),
		AuditInfo:      &erp.AuditInfo{},
	}
	_, err = common.PostEntity("CrmOpp", 80, opp, vnic)
	return err
}

func firstConversionAccountId(lead *crm.CrmLead) string {
	for _, conv := range lead.Conversions {
		if conv.AccountId != "" {
			return conv.AccountId
		}
	}
	return ""
}
