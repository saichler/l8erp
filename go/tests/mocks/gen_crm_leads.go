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

// generateLeadSources creates lead source records
func generateLeadSources() []*crm.CrmLeadSource {
	sourceTypes := []crm.CrmLeadSourceType{
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_WEB,
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_TRADE_SHOW,
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_REFERRAL,
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_PHONE,
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_EMAIL,
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_SOCIAL_MEDIA,
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_PARTNER,
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_ADVERTISING,
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_SOCIAL_MEDIA,
		crm.CrmLeadSourceType_CRM_LEAD_SOURCE_TYPE_EMAIL,
	}

	sources := make([]*crm.CrmLeadSource, len(crmLeadSourceNames))
	for i, name := range crmLeadSourceNames {
		sources[i] = &crm.CrmLeadSource{
			SourceId:    fmt.Sprintf("ldsrc-%03d", i+1),
			Name:        name,
			Description: fmt.Sprintf("Lead source: %s", name),
			SourceType:  sourceTypes[i%len(sourceTypes)],
			IsActive:    i < len(crmLeadSourceNames)*9/10,
			DefaultCost: float64(rand.Intn(500) + 100),
			AuditInfo:   createAuditInfo(),
		}
	}
	return sources
}

// generateLeadScoreRules creates lead scoring rules
func generateLeadScoreRules() []*crm.CrmLeadScore {
	fields := []string{"industry", "company_size", "job_title", "website_visits", "email_opens"}
	values := []string{"Technology", "500+", "VP", "5+", "3+"}

	rules := make([]*crm.CrmLeadScore, 10)
	for i := 0; i < 10; i++ {
		rules[i] = &crm.CrmLeadScore{
			ScoreId:     fmt.Sprintf("ldscore-%03d", i+1),
			Name:        fmt.Sprintf("Score Rule %d", i+1),
			Description: fmt.Sprintf("Lead scoring rule for %s", fields[i%len(fields)]),
			FieldName:   fields[i%len(fields)],
			FieldValue:  values[i%len(values)],
			ScoreValue:  int32(rand.Intn(20) + 5),
			IsActive:    true,
			Priority:    int32(i + 1),
			AuditInfo:   createAuditInfo(),
		}
	}
	return rules
}

// generateLeadAssignRules creates lead assignment rules
func generateLeadAssignRules(store *MockDataStore) []*crm.CrmLeadAssign {
	criteria := []string{"industry", "region", "company_size", "lead_source", "score"}

	rules := make([]*crm.CrmLeadAssign, 8)
	for i := 0; i < 8; i++ {
		assignTo := ""
		if len(store.EmployeeIDs) > 0 {
			assignTo = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		rules[i] = &crm.CrmLeadAssign{
			AssignmentId:   fmt.Sprintf("ldassn-%03d", i+1),
			Name:           fmt.Sprintf("Assignment Rule %d", i+1),
			Description:    fmt.Sprintf("Assign leads based on %s", criteria[i%len(criteria)]),
			CriteriaField:  criteria[i%len(criteria)],
			CriteriaValue:  fmt.Sprintf("value_%d", i+1),
			AssignToUserId: assignTo,
			Priority:       int32(i + 1),
			IsActive:       true,
			RoundRobin:     i%2 == 0,
			AuditInfo:      createAuditInfo(),
		}
	}
	return rules
}

// generateLeads creates lead records
func generateLeads(store *MockDataStore) []*crm.CrmLead {
	statuses := []crm.CrmLeadStatus{
		crm.CrmLeadStatus_CRM_LEAD_STATUS_NEW,
		crm.CrmLeadStatus_CRM_LEAD_STATUS_CONTACTED,
		crm.CrmLeadStatus_CRM_LEAD_STATUS_QUALIFIED,
		crm.CrmLeadStatus_CRM_LEAD_STATUS_UNQUALIFIED,
		crm.CrmLeadStatus_CRM_LEAD_STATUS_CONVERTED,
	}
	ratings := []crm.CrmLeadRating{
		crm.CrmLeadRating_CRM_LEAD_RATING_HOT,
		crm.CrmLeadRating_CRM_LEAD_RATING_WARM,
		crm.CrmLeadRating_CRM_LEAD_RATING_COLD,
	}

	count := 50
	leads := make([]*crm.CrmLead, count)
	for i := 0; i < count; i++ {
		sourceID := ""
		if len(store.CrmLeadSourceIDs) > 0 {
			sourceID = store.CrmLeadSourceIDs[i%len(store.CrmLeadSourceIDs)]
		}
		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}
		campaignID := ""
		if len(store.CrmCampaignIDs) > 0 {
			campaignID = store.CrmCampaignIDs[i%len(store.CrmCampaignIDs)]
		}

		// Status distribution: 30% new, 25% contacted, 25% qualified, 10% unqualified, 10% converted
		var status crm.CrmLeadStatus
		if i < count*3/10 {
			status = statuses[0]
		} else if i < count*55/100 {
			status = statuses[1]
		} else if i < count*8/10 {
			status = statuses[2]
		} else if i < count*9/10 {
			status = statuses[3]
		} else {
			status = statuses[4]
		}

		leads[i] = &crm.CrmLead{
			LeadId:           fmt.Sprintf("lead-%03d", i+1),
			FirstName:        firstNames[i%len(firstNames)],
			LastName:         lastNames[i%len(lastNames)],
			Email:            fmt.Sprintf("%s.%s@example.com", firstNames[i%len(firstNames)], lastNames[i%len(lastNames)]),
			Phone:            fmt.Sprintf("555-%03d-%04d", rand.Intn(1000), rand.Intn(10000)),
			Company:          vendorNames[i%len(vendorNames)],
			Title:            "Manager",
			Industry:         crmIndustries[i%len(crmIndustries)],
			SourceId:         sourceID,
			Status:           status,
			Rating:           ratings[i%len(ratings)],
			OwnerId:          ownerID,
			Description:      fmt.Sprintf("Lead #%d from %s", i+1, crmLeadSourceNames[i%len(crmLeadSourceNames)]),
			Website:          fmt.Sprintf("https://www.company%d.com", i+1),
			EmployeeCount:    int32(rand.Intn(1000) + 10),
			AnnualRevenue:    &erp.Money{Amount: int64(rand.Intn(10000000) + 100000), CurrencyCode: "USD"},
			LastActivityDate: time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
			Score:            int32(rand.Intn(100)),
			CampaignId:       campaignID,
			AuditInfo:        createAuditInfo(),
		}
	}
	return leads
}

// generateLeadActivities creates lead activity records
func generateLeadActivities(store *MockDataStore) []*crm.CrmLeadActivity {
	activityTypes := []crm.CrmActivityType{
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_CALL,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_EMAIL,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_MEETING,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_DEMO,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_FOLLOW_UP,
	}
	statuses := []crm.CrmActivityStatus{
		crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_PLANNED,
		crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_IN_PROGRESS,
		crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_COMPLETED,
	}
	subjects := []string{"Initial Call", "Follow-up Email", "Product Demo", "Proposal Review", "Qualification Call"}

	activities := make([]*crm.CrmLeadActivity, 0, len(store.CrmLeadIDs)*2)
	idx := 1
	for _, leadID := range store.CrmLeadIDs {
		for j := 0; j < 2; j++ {
			assignedTo := ""
			if len(store.EmployeeIDs) > 0 {
				assignedTo = store.EmployeeIDs[(idx-1)%len(store.EmployeeIDs)]
			}

			isCompleted := statuses[(idx-1)%len(statuses)] == crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_COMPLETED

			activities = append(activities, &crm.CrmLeadActivity{
				ActivityId:      fmt.Sprintf("ldact-%03d", idx),
				LeadId:          leadID,
				ActivityType:    activityTypes[(idx-1)%len(activityTypes)],
				Subject:         subjects[(idx-1)%len(subjects)],
				Description:     fmt.Sprintf("Activity %d for lead", idx),
				ActivityDate:    time.Now().AddDate(0, 0, -rand.Intn(14)).Unix(),
				Status:          statuses[(idx-1)%len(statuses)],
				AssignedTo:      assignedTo,
				DurationMinutes: int32(rand.Intn(60) + 15),
				Outcome:         "Positive response",
				IsCompleted:     isCompleted,
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return activities
}

// generateLeadConversions creates lead conversion records
func generateLeadConversions(store *MockDataStore) []*crm.CrmLeadConversion {
	// Only convert a portion of leads
	count := len(store.CrmLeadIDs) / 5
	if count < 5 {
		count = 5
	}

	conversions := make([]*crm.CrmLeadConversion, count)
	for i := 0; i < count; i++ {
		leadID := ""
		if len(store.CrmLeadIDs) > 0 {
			leadID = store.CrmLeadIDs[i%len(store.CrmLeadIDs)]
		}
		accountID := ""
		if len(store.CrmAccountIDs) > 0 {
			accountID = store.CrmAccountIDs[i%len(store.CrmAccountIDs)]
		}
		contactID := ""
		if len(store.CrmContactIDs) > 0 {
			contactID = store.CrmContactIDs[i%len(store.CrmContactIDs)]
		}
		opportunityID := ""
		if len(store.CrmOpportunityIDs) > 0 && i%2 == 0 {
			opportunityID = store.CrmOpportunityIDs[i%len(store.CrmOpportunityIDs)]
		}
		convertedBy := ""
		if len(store.EmployeeIDs) > 0 {
			convertedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		conversions[i] = &crm.CrmLeadConversion{
			ConversionId:      fmt.Sprintf("ldconv-%03d", i+1),
			LeadId:            leadID,
			AccountId:         accountID,
			ContactId:         contactID,
			OpportunityId:     opportunityID,
			ConversionDate:    time.Now().AddDate(0, 0, -rand.Intn(60)).Unix(),
			ConvertedBy:       convertedBy,
			Notes:             fmt.Sprintf("Lead converted to account and contact on day %d", i+1),
			CreateOpportunity: opportunityID != "",
			AuditInfo:         createAuditInfo(),
		}
	}
	return conversions
}
