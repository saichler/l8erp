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
package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8erp/go/types/erp"
)

// generateCampaigns creates marketing campaign records
func generateCampaigns(store *MockDataStore) []*crm.CrmCampaign {
	types := []crm.CrmCampaignType{
		crm.CrmCampaignType_CRM_CAMPAIGN_TYPE_EMAIL,
		crm.CrmCampaignType_CRM_CAMPAIGN_TYPE_WEBINAR,
		crm.CrmCampaignType_CRM_CAMPAIGN_TYPE_TRADE_SHOW,
		crm.CrmCampaignType_CRM_CAMPAIGN_TYPE_SOCIAL_MEDIA,
		crm.CrmCampaignType_CRM_CAMPAIGN_TYPE_DIRECT_MAIL,
	}
	statuses := []crm.CrmCampaignStatus{
		crm.CrmCampaignStatus_CRM_CAMPAIGN_STATUS_PLANNED,
		crm.CrmCampaignStatus_CRM_CAMPAIGN_STATUS_ACTIVE,
		crm.CrmCampaignStatus_CRM_CAMPAIGN_STATUS_COMPLETED,
	}

	campaigns := make([]*crm.CrmCampaign, len(crmCampaignNames))
	for i, name := range crmCampaignNames {
		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}
		parentID := ""
		if i > 3 && i%4 == 0 {
			parentID = fmt.Sprintf("cmpgn-%03d", (i%4)+1)
		}

		budgetedCost := int64(rand.Intn(50000) + 5000)
		actualCost := int64(float64(budgetedCost) * (float64(rand.Intn(30)+85) / 100))
		expectedRevenue := budgetedCost * int64(rand.Intn(5)+2)

		// Status distribution: 20% planned, 50% active, 30% completed
		var status crm.CrmCampaignStatus
		if i < len(crmCampaignNames)*2/10 {
			status = statuses[0]
		} else if i < len(crmCampaignNames)*7/10 {
			status = statuses[1]
		} else {
			status = statuses[2]
		}

		campaigns[i] = &crm.CrmCampaign{
			CampaignId:           fmt.Sprintf("cmpgn-%03d", i+1),
			Name:                 name,
			CampaignType:         types[i%len(types)],
			Status:               status,
			Description:          fmt.Sprintf("Marketing campaign: %s", name),
			StartDate:            time.Now().AddDate(0, -rand.Intn(3), 0).Unix(),
			EndDate:              time.Now().AddDate(0, rand.Intn(3)+1, 0).Unix(),
			BudgetedCost:         &erp.Money{Amount: budgetedCost, CurrencyCode: "USD"},
			ActualCost:           &erp.Money{Amount: actualCost, CurrencyCode: "USD"},
			ExpectedRevenue:      &erp.Money{Amount: expectedRevenue, CurrencyCode: "USD"},
			ExpectedResponseRate: int32(rand.Intn(20) + 5),
			NumSent:              int32(rand.Intn(10000) + 1000),
			NumResponses:         int32(rand.Intn(500) + 50),
			OwnerId:              ownerID,
			ParentCampaignId:     parentID,
			IsActive:             status == crm.CrmCampaignStatus_CRM_CAMPAIGN_STATUS_ACTIVE,
			AuditInfo:            createAuditInfo(),
		}
	}
	return campaigns
}

// generateCampaignMembers creates campaign member records
func generateCampaignMembers(store *MockDataStore) []*crm.CrmCampaignMember {
	statuses := []crm.CrmCampaignMemberStatus{
		crm.CrmCampaignMemberStatus_CRM_CAMPAIGN_MEMBER_STATUS_SENT,
		crm.CrmCampaignMemberStatus_CRM_CAMPAIGN_MEMBER_STATUS_RESPONDED,
		crm.CrmCampaignMemberStatus_CRM_CAMPAIGN_MEMBER_STATUS_CONVERTED,
	}

	members := make([]*crm.CrmCampaignMember, 0, len(store.CrmCampaignIDs)*5)
	idx := 1
	for _, campaignID := range store.CrmCampaignIDs {
		numMembers := rand.Intn(5) + 3
		for j := 0; j < numMembers; j++ {
			leadID := ""
			contactID := ""
			if j%2 == 0 && len(store.CrmLeadIDs) > 0 {
				leadID = store.CrmLeadIDs[(idx-1)%len(store.CrmLeadIDs)]
			} else if len(store.CrmContactIDs) > 0 {
				contactID = store.CrmContactIDs[(idx-1)%len(store.CrmContactIDs)]
			}
			listID := ""
			if len(store.CrmMarketingListIDs) > 0 {
				listID = store.CrmMarketingListIDs[(idx-1)%len(store.CrmMarketingListIDs)]
			}

			status := statuses[(idx-1)%len(statuses)]
			hasResponded := status != crm.CrmCampaignMemberStatus_CRM_CAMPAIGN_MEMBER_STATUS_SENT

			members = append(members, &crm.CrmCampaignMember{
				MemberId:           fmt.Sprintf("cmpgmbr-%03d", idx),
				CampaignId:         campaignID,
				LeadId:             leadID,
				ContactId:          contactID,
				Status:             status,
				FirstRespondedDate: time.Now().AddDate(0, 0, -rand.Intn(14)).Unix(),
				HasResponded:       hasResponded,
				SourceListId:       listID,
				AuditInfo:          createAuditInfo(),
			})
			idx++
		}
	}
	return members
}

// generateEmailTemplates creates email template records
func generateEmailTemplates(store *MockDataStore) []*crm.CrmEmailTemplate {
	templateTypes := []string{"Welcome", "Follow-Up", "Promotion", "Newsletter", "Notification"}

	templates := make([]*crm.CrmEmailTemplate, len(crmEmailTemplateNames))
	for i, name := range crmEmailTemplateNames {
		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		templates[i] = &crm.CrmEmailTemplate{
			TemplateId:   fmt.Sprintf("emailtpl-%03d", i+1),
			Name:         name,
			Description:  fmt.Sprintf("Email template for %s", name),
			Subject:      fmt.Sprintf("%s - Your Company", name),
			BodyHtml:     fmt.Sprintf("<html><body><h1>%s</h1><p>Template content here.</p></body></html>", name),
			BodyText:     fmt.Sprintf("%s\n\nTemplate content here.", name),
			Folder:       "Marketing",
			IsActive:     i < len(crmEmailTemplateNames)*9/10,
			OwnerId:      ownerID,
			TemplateType: templateTypes[i%len(templateTypes)],
			TimesUsed:    int32(rand.Intn(100) + 10),
			LastUsedDate: time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
			AuditInfo:    createAuditInfo(),
		}
	}
	return templates
}

// generateMarketingLists creates marketing list records
func generateMarketingLists(store *MockDataStore) []*crm.CrmMarketingList {
	listTypes := []string{"Static", "Dynamic", "Segment", "Import"}

	lists := make([]*crm.CrmMarketingList, len(crmMarketingListNames))
	for i, name := range crmMarketingListNames {
		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		isDynamic := listTypes[i%len(listTypes)] == "Dynamic"

		lists[i] = &crm.CrmMarketingList{
			ListId:       fmt.Sprintf("mktlist-%03d", i+1),
			Name:         name,
			Description:  fmt.Sprintf("Marketing list: %s", name),
			ListType:     listTypes[i%len(listTypes)],
			MemberCount:  int32(rand.Intn(5000) + 100),
			OwnerId:      ownerID,
			IsDynamic:    isDynamic,
			Criteria:     "status = 'Active'",
			LastUsedDate: time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
			IsActive:     true,
			AuditInfo:    createAuditInfo(),
		}
	}
	return lists
}

// generateCampaignResponses creates campaign response records
func generateCampaignResponses(store *MockDataStore) []*crm.CrmCampaignResponse {
	types := []crm.CrmResponseType{
		crm.CrmResponseType_CRM_RESPONSE_TYPE_OPENED,
		crm.CrmResponseType_CRM_RESPONSE_TYPE_CLICKED,
		crm.CrmResponseType_CRM_RESPONSE_TYPE_RESPONDED,
		crm.CrmResponseType_CRM_RESPONSE_TYPE_CONVERTED,
	}

	responses := make([]*crm.CrmCampaignResponse, 0, len(store.CrmCampaignMemberIDs)/2)
	idx := 1
	for i, memberID := range store.CrmCampaignMemberIDs {
		if i%2 == 0 {
			campaignID := ""
			if len(store.CrmCampaignIDs) > 0 {
				campaignID = store.CrmCampaignIDs[i%len(store.CrmCampaignIDs)]
			}

			responses = append(responses, &crm.CrmCampaignResponse{
				ResponseId:       fmt.Sprintf("cmpgrsp-%03d", idx),
				CampaignId:       campaignID,
				CampaignMemberId: memberID,
				ResponseType:     types[(idx-1)%len(types)],
				ResponseDate:     time.Now().AddDate(0, 0, -rand.Intn(14)).Unix(),
				Details:          fmt.Sprintf("Response %d details", idx),
				RevenueValue:     &erp.Money{Amount: int64(rand.Intn(10000) + 100), CurrencyCode: "USD"},
				AuditInfo:        createAuditInfo(),
			})
			idx++
		}
	}
	return responses
}

// generateCampaignROIs creates campaign ROI records
func generateCampaignROIs(store *MockDataStore) []*crm.CrmCampaignROI {
	rois := make([]*crm.CrmCampaignROI, len(store.CrmCampaignIDs))
	for i, campaignID := range store.CrmCampaignIDs {
		totalCost := int64(rand.Intn(50000) + 5000)
		totalRevenue := int64(float64(totalCost) * (float64(rand.Intn(300)+100) / 100))
		roiPercent := float64(totalRevenue-totalCost) / float64(totalCost) * 100
		leadsGen := int32(rand.Intn(100) + 10)
		oppsCreated := int32(float64(leadsGen) * 0.3)
		dealsWon := int32(float64(oppsCreated) * 0.25)

		rois[i] = &crm.CrmCampaignROI{
			RoiId:                 fmt.Sprintf("roi-%03d", i+1),
			CampaignId:            campaignID,
			CalculationDate:       time.Now().Unix(),
			TotalCost:             &erp.Money{Amount: totalCost, CurrencyCode: "USD"},
			TotalRevenue:          &erp.Money{Amount: totalRevenue, CurrencyCode: "USD"},
			RoiPercentage:         roiPercent,
			LeadsGenerated:        leadsGen,
			OpportunitiesCreated:  oppsCreated,
			DealsWon:              dealsWon,
			CostPerLead:           &erp.Money{Amount: totalCost / int64(leadsGen), CurrencyCode: "USD"},
			CostPerOpportunity:    &erp.Money{Amount: totalCost / int64(oppsCreated+1), CurrencyCode: "USD"},
			ConversionRate:        float64(dealsWon) / float64(leadsGen+1) * 100,
			Notes:                 fmt.Sprintf("ROI calculation for campaign %d", i+1),
			AuditInfo:             createAuditInfo(),
		}
	}
	return rois
}
