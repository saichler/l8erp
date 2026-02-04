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

// generateOppStages creates opportunity stage definitions
func generateOppStages() []*crm.CrmOppStage {
	probabilities := []int32{10, 20, 30, 40, 50, 60, 80, 100, 0}
	forecastCats := []string{"Pipeline", "Pipeline", "Best Case", "Best Case", "Commit", "Commit", "Commit", "Closed", "Omitted"}

	stages := make([]*crm.CrmOppStage, len(crmOppStageNames))
	for i, name := range crmOppStageNames {
		isClosed := i >= len(crmOppStageNames)-2
		isWon := name == "Closed Won"

		stages[i] = &crm.CrmOppStage{
			StageId:          fmt.Sprintf("oppstg-%03d", i+1),
			Name:             name,
			Description:      fmt.Sprintf("Sales stage: %s", name),
			Sequence:         int32(i + 1),
			Probability:      probabilities[i],
			IsClosed:         isClosed,
			IsWon:            isWon,
			IsActive:         true,
			ForecastCategory: forecastCats[i],
			AuditInfo:        createAuditInfo(),
		}
	}
	return stages
}

// generateOpportunities creates opportunity records
func generateOpportunities(store *MockDataStore) []*crm.CrmOpportunity {
	statuses := []crm.CrmOpportunityStatus{
		crm.CrmOpportunityStatus_CRM_OPPORTUNITY_STATUS_OPEN,
		crm.CrmOpportunityStatus_CRM_OPPORTUNITY_STATUS_WON,
		crm.CrmOpportunityStatus_CRM_OPPORTUNITY_STATUS_LOST,
		crm.CrmOpportunityStatus_CRM_OPPORTUNITY_STATUS_ON_HOLD,
	}
	stages := []crm.CrmSalesStage{
		crm.CrmSalesStage_CRM_SALES_STAGE_PROSPECTING,
		crm.CrmSalesStage_CRM_SALES_STAGE_QUALIFICATION,
		crm.CrmSalesStage_CRM_SALES_STAGE_NEEDS_ANALYSIS,
		crm.CrmSalesStage_CRM_SALES_STAGE_VALUE_PROPOSITION,
		crm.CrmSalesStage_CRM_SALES_STAGE_PROPOSAL,
		crm.CrmSalesStage_CRM_SALES_STAGE_NEGOTIATION,
		crm.CrmSalesStage_CRM_SALES_STAGE_CLOSED_WON,
	}

	count := 40
	opps := make([]*crm.CrmOpportunity, count)
	for i := 0; i < count; i++ {
		accountID := ""
		if len(store.CrmAccountIDs) > 0 {
			accountID = store.CrmAccountIDs[i%len(store.CrmAccountIDs)]
		}
		contactID := ""
		if len(store.CrmContactIDs) > 0 {
			contactID = store.CrmContactIDs[i%len(store.CrmContactIDs)]
		}
		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}
		sourceID := ""
		if len(store.CrmLeadSourceIDs) > 0 {
			sourceID = store.CrmLeadSourceIDs[i%len(store.CrmLeadSourceIDs)]
		}
		campaignID := ""
		if len(store.CrmCampaignIDs) > 0 {
			campaignID = store.CrmCampaignIDs[i%len(store.CrmCampaignIDs)]
		}

		amount := int64(rand.Intn(500000) + 10000)
		probability := int32(rand.Intn(80) + 10)
		expectedRevenue := int64(float64(amount) * float64(probability) / 100)

		// Status distribution: 60% open, 20% won, 15% lost, 5% on hold
		var status crm.CrmOpportunityStatus
		if i < count*6/10 {
			status = statuses[0]
		} else if i < count*8/10 {
			status = statuses[1]
		} else if i < count*95/100 {
			status = statuses[2]
		} else {
			status = statuses[3]
		}

		opps[i] = &crm.CrmOpportunity{
			OpportunityId:    fmt.Sprintf("opp-%03d", i+1),
			Name:             fmt.Sprintf("Opportunity %d - %s", i+1, customerNames[i%len(customerNames)]),
			AccountId:        accountID,
			PrimaryContactId: contactID,
			Amount:           &erp.Money{Amount: amount, CurrencyCode: "USD"},
			Stage:            stages[i%len(stages)],
			Probability:      probability,
			CloseDate:        time.Now().AddDate(0, rand.Intn(6)+1, 0).Unix(),
			Status:           status,
			OwnerId:          ownerID,
			LeadSourceId:     sourceID,
			CampaignId:       campaignID,
			Description:      fmt.Sprintf("Sales opportunity for %s", customerNames[i%len(customerNames)]),
			NextStep:         "Schedule follow-up call",
			ExpectedRevenue:  &erp.Money{Amount: expectedRevenue, CurrencyCode: "USD"},
			LastActivityDate: time.Now().AddDate(0, 0, -rand.Intn(7)).Unix(),
			AuditInfo:        createAuditInfo(),
		}
	}
	return opps
}

// generateOppCompetitors creates competitor records for opportunities
func generateOppCompetitors(store *MockDataStore) []*crm.CrmOppCompetitor {
	threatLevels := []crm.CrmThreatLevel{
		crm.CrmThreatLevel_CRM_THREAT_LEVEL_LOW,
		crm.CrmThreatLevel_CRM_THREAT_LEVEL_MEDIUM,
		crm.CrmThreatLevel_CRM_THREAT_LEVEL_HIGH,
	}

	competitors := make([]*crm.CrmOppCompetitor, 0, len(store.CrmOpportunityIDs))
	idx := 1
	for i, oppID := range store.CrmOpportunityIDs {
		if i%2 == 0 { // Add competitor to every other opportunity
			competitors = append(competitors, &crm.CrmOppCompetitor{
				CompetitorId:    fmt.Sprintf("oppcomp-%03d", idx),
				OpportunityId:   oppID,
				Name:            crmCompetitorNames[idx%len(crmCompetitorNames)],
				Website:         fmt.Sprintf("https://www.%s.com", crmCompetitorNames[idx%len(crmCompetitorNames)]),
				Strengths:       "Strong market presence",
				Weaknesses:      "Limited support options",
				ThreatLevel:     threatLevels[idx%len(threatLevels)],
				CompetitorPrice: &erp.Money{Amount: int64(rand.Intn(100000) + 5000), CurrencyCode: "USD"},
				Notes:           fmt.Sprintf("Key competitor on opportunity"),
				IsPrimary:       true,
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return competitors
}

// generateOppProducts creates product lines for opportunities
func generateOppProducts(store *MockDataStore) []*crm.CrmOppProduct {
	products := make([]*crm.CrmOppProduct, 0, len(store.CrmOpportunityIDs)*2)
	idx := 1
	for _, oppID := range store.CrmOpportunityIDs {
		numLines := rand.Intn(3) + 1
		for j := 0; j < numLines; j++ {
			productID := ""
			productName := itemNames[idx%len(itemNames)]
			if len(store.ItemIDs) > 0 {
				productID = store.ItemIDs[idx%len(store.ItemIDs)]
			}

			quantity := float64(rand.Intn(10) + 1)
			unitPrice := int64(rand.Intn(10000) + 100)
			discount := float64(rand.Intn(20))
			totalPrice := int64(float64(unitPrice) * quantity * (1 - discount/100))

			products = append(products, &crm.CrmOppProduct{
				LineId:          fmt.Sprintf("opprod-%03d", idx),
				OpportunityId:   oppID,
				ProductId:       productID,
				ProductName:     productName,
				Quantity:        quantity,
				UnitPrice:       &erp.Money{Amount: unitPrice, CurrencyCode: "USD"},
				DiscountPercent: discount,
				TotalPrice:      &erp.Money{Amount: totalPrice, CurrencyCode: "USD"},
				Description:     fmt.Sprintf("Product line %d", j+1),
				LineNumber:      int32((j + 1) * 10),
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return products
}

// generateOppTeams creates team member records for opportunities
func generateOppTeams(store *MockDataStore) []*crm.CrmOppTeam {
	roles := []string{"Account Executive", "Sales Engineer", "Solution Architect", "Executive Sponsor"}

	teams := make([]*crm.CrmOppTeam, 0, len(store.CrmOpportunityIDs)*2)
	idx := 1
	for _, oppID := range store.CrmOpportunityIDs {
		numMembers := rand.Intn(2) + 1
		for j := 0; j < numMembers; j++ {
			employeeID := ""
			if len(store.EmployeeIDs) > 0 {
				employeeID = store.EmployeeIDs[(idx-1)%len(store.EmployeeIDs)]
			}

			teams = append(teams, &crm.CrmOppTeam{
				MemberId:      fmt.Sprintf("oppteam-%03d", idx),
				OpportunityId: oppID,
				EmployeeId:    employeeID,
				Role:          roles[(idx-1)%len(roles)],
				IsPrimary:     j == 0,
				SplitPercent:  float64(100 / numMembers),
				Notes:         fmt.Sprintf("Team member %d", j+1),
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return teams
}

// generateOppActivities creates activity records for opportunities
func generateOppActivities(store *MockDataStore) []*crm.CrmOppActivity {
	activityTypes := []crm.CrmActivityType{
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_CALL,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_EMAIL,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_MEETING,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_DEMO,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_PROPOSAL,
	}
	statuses := []crm.CrmActivityStatus{
		crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_PLANNED,
		crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_IN_PROGRESS,
		crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_COMPLETED,
	}
	subjects := []string{"Discovery Call", "Product Demo", "Proposal Review", "Contract Negotiation", "Executive Meeting"}

	activities := make([]*crm.CrmOppActivity, 0, len(store.CrmOpportunityIDs)*2)
	idx := 1
	for _, oppID := range store.CrmOpportunityIDs {
		for j := 0; j < 2; j++ {
			assignedTo := ""
			if len(store.EmployeeIDs) > 0 {
				assignedTo = store.EmployeeIDs[(idx-1)%len(store.EmployeeIDs)]
			}

			isCompleted := statuses[(idx-1)%len(statuses)] == crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_COMPLETED

			activities = append(activities, &crm.CrmOppActivity{
				ActivityId:      fmt.Sprintf("oppact-%03d", idx),
				OpportunityId:   oppID,
				ActivityType:    activityTypes[(idx-1)%len(activityTypes)],
				Subject:         subjects[(idx-1)%len(subjects)],
				Description:     fmt.Sprintf("Opportunity activity %d", idx),
				ActivityDate:    time.Now().AddDate(0, 0, -rand.Intn(14)).Unix(),
				Status:          statuses[(idx-1)%len(statuses)],
				AssignedTo:      assignedTo,
				DurationMinutes: int32(rand.Intn(90) + 30),
				Outcome:         "Positive - moving forward",
				IsCompleted:     isCompleted,
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return activities
}
