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
package mocks

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/crm"
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
			StageId:          genID("oppstg", i),
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

// generateOpportunities creates opportunity records with embedded activities, products, teams, competitors
func generateOpportunities(store *MockDataStore) []*crm.CrmOpportunity {
	oppStatuses := []crm.CrmOpportunityStatus{
		crm.CrmOpportunityStatus_CRM_OPPORTUNITY_STATUS_OPEN,
		crm.CrmOpportunityStatus_CRM_OPPORTUNITY_STATUS_WON,
		crm.CrmOpportunityStatus_CRM_OPPORTUNITY_STATUS_LOST,
		crm.CrmOpportunityStatus_CRM_OPPORTUNITY_STATUS_ON_HOLD,
	}
	salesStages := []crm.CrmSalesStage{
		crm.CrmSalesStage_CRM_SALES_STAGE_PROSPECTING,
		crm.CrmSalesStage_CRM_SALES_STAGE_QUALIFICATION,
		crm.CrmSalesStage_CRM_SALES_STAGE_NEEDS_ANALYSIS,
		crm.CrmSalesStage_CRM_SALES_STAGE_VALUE_PROPOSITION,
		crm.CrmSalesStage_CRM_SALES_STAGE_PROPOSAL,
		crm.CrmSalesStage_CRM_SALES_STAGE_NEGOTIATION,
		crm.CrmSalesStage_CRM_SALES_STAGE_CLOSED_WON,
	}
	activityTypes := []crm.CrmActivityType{
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_CALL,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_EMAIL,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_MEETING,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_DEMO,
		crm.CrmActivityType_CRM_ACTIVITY_TYPE_PROPOSAL,
	}
	actStatuses := []crm.CrmActivityStatus{
		crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_PLANNED,
		crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_IN_PROGRESS,
		crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_COMPLETED,
	}
	threatLevels := []crm.CrmThreatLevel{
		crm.CrmThreatLevel_CRM_THREAT_LEVEL_LOW,
		crm.CrmThreatLevel_CRM_THREAT_LEVEL_MEDIUM,
		crm.CrmThreatLevel_CRM_THREAT_LEVEL_HIGH,
	}
	teamRoles := []string{"Account Executive", "Sales Engineer", "Solution Architect", "Executive Sponsor"}
	actSubjects := []string{"Discovery Call", "Product Demo", "Proposal Review", "Contract Negotiation", "Executive Meeting"}

	count := 40
	actIdx := 1
	prodIdx := 1
	teamIdx := 1
	compIdx := 1
	opps := make([]*crm.CrmOpportunity, count)
	for i := 0; i < count; i++ {
		accountID := pickRef(store.CrmAccountIDs, i)
		contactID := pickRef(store.CrmContactIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)
		sourceID := pickRef(store.CrmLeadSourceIDs, i)
		campaignID := pickRef(store.CrmCampaignIDs, i)

		amount := int64(rand.Intn(500000) + 10000)
		probability := int32(rand.Intn(80) + 10)
		expectedRevenue := int64(float64(amount) * float64(probability) / 100)

		// Status distribution: 60% open, 20% won, 15% lost, 5% on hold
		var status crm.CrmOpportunityStatus
		if i < count*6/10 {
			status = oppStatuses[0]
		} else if i < count*8/10 {
			status = oppStatuses[1]
		} else if i < count*95/100 {
			status = oppStatuses[2]
		} else {
			status = oppStatuses[3]
		}

		// Embedded activities (2 per opportunity)
		activities := make([]*crm.CrmOppActivity, 2)
		for j := 0; j < 2; j++ {
			assignedTo := pickRef(store.EmployeeIDs, actIdx-1)
			isCompleted := actStatuses[(actIdx-1)%len(actStatuses)] == crm.CrmActivityStatus_CRM_ACTIVITY_STATUS_COMPLETED
			activities[j] = &crm.CrmOppActivity{
				ActivityId:      fmt.Sprintf("oppact-%03d", actIdx),
				ActivityType:    activityTypes[(actIdx-1)%len(activityTypes)],
				Subject:         actSubjects[(actIdx-1)%len(actSubjects)],
				Description:     fmt.Sprintf("Opportunity activity %d", actIdx),
				ActivityDate:    time.Now().AddDate(0, 0, -rand.Intn(14)).Unix(),
				Status:          actStatuses[(actIdx-1)%len(actStatuses)],
				AssignedTo:      assignedTo,
				DurationMinutes: int32(rand.Intn(90) + 30),
				Outcome:         "Positive - moving forward",
				IsCompleted:     isCompleted,
				AuditInfo:       createAuditInfo(),
			}
			actIdx++
		}

		// Embedded products (1-3 per opportunity)
		numLines := rand.Intn(3) + 1
		products := make([]*crm.CrmOppProduct, numLines)
		for j := 0; j < numLines; j++ {
			productID := ""
			productName := itemNames[prodIdx%len(itemNames)]
			if len(store.ItemIDs) > 0 {
				productID = store.ItemIDs[prodIdx%len(store.ItemIDs)]
			}
			quantity := float64(rand.Intn(10) + 1)
			unitPrice := int64(rand.Intn(10000) + 100)
			discount := float64(rand.Intn(20))
			totalPrice := int64(float64(unitPrice) * quantity * (1 - discount/100))

			products[j] = &crm.CrmOppProduct{
				LineId:          fmt.Sprintf("opprod-%03d", prodIdx),
				ProductId:       productID,
				ProductName:     productName,
				Quantity:        quantity,
				UnitPrice:       money(store, unitPrice),
				DiscountPercent: discount,
				TotalPrice:      money(store, totalPrice),
				Description:     fmt.Sprintf("Product line %d", j+1),
				LineNumber:      int32((j + 1) * 10),
				AuditInfo:       createAuditInfo(),
			}
			prodIdx++
		}

		// Embedded team members (1-2 per opportunity)
		numMembers := rand.Intn(2) + 1
		teamMembers := make([]*crm.CrmOppTeam, numMembers)
		for j := 0; j < numMembers; j++ {
			employeeID := pickRef(store.EmployeeIDs, teamIdx-1)
			teamMembers[j] = &crm.CrmOppTeam{
				MemberId:     fmt.Sprintf("oppteam-%03d", teamIdx),
				EmployeeId:   employeeID,
				Role:         teamRoles[(teamIdx-1)%len(teamRoles)],
				IsPrimary:    j == 0,
				SplitPercent: float64(100 / numMembers),
				Notes:        fmt.Sprintf("Team member %d", j+1),
				AuditInfo:    createAuditInfo(),
			}
			teamIdx++
		}

		// Embedded competitor (every other opportunity)
		var competitors []*crm.CrmOppCompetitor
		if i%2 == 0 {
			competitors = []*crm.CrmOppCompetitor{{
				CompetitorId:    fmt.Sprintf("oppcomp-%03d", compIdx),
				Name:            crmCompetitorNames[compIdx%len(crmCompetitorNames)],
				Website:         fmt.Sprintf("https://www.%s.com", crmCompetitorNames[compIdx%len(crmCompetitorNames)]),
				Strengths:       "Strong market presence",
				Weaknesses:      "Limited support options",
				ThreatLevel:     threatLevels[compIdx%len(threatLevels)],
				CompetitorPrice: randomMoney(store, 5000, 100000),
				Notes:           "Key competitor on opportunity",
				IsPrimary:       true,
				AuditInfo:       createAuditInfo(),
			}}
			compIdx++
		}

		opps[i] = &crm.CrmOpportunity{
			OpportunityId:    genID("opp", i),
			Name:             fmt.Sprintf("Opportunity %d - %s", i+1, customerNames[i%len(customerNames)]),
			AccountId:        accountID,
			PrimaryContactId: contactID,
			Amount:           money(store, amount),
			Stage:            salesStages[i%len(salesStages)],
			Probability:      probability,
			CloseDate:        time.Now().AddDate(0, rand.Intn(6)+1, 0).Unix(),
			Status:           status,
			OwnerId:          ownerID,
			LeadSourceId:     sourceID,
			CampaignId:       campaignID,
			Description:      fmt.Sprintf("Sales opportunity for %s", customerNames[i%len(customerNames)]),
			NextStep:         "Schedule follow-up call",
			ExpectedRevenue:  money(store, expectedRevenue),
			LastActivityDate: time.Now().AddDate(0, 0, -rand.Intn(7)).Unix(),
			AuditInfo:        createAuditInfo(),
			Activities:       activities,
			Products:         products,
			TeamMembers:      teamMembers,
			Competitors:      competitors,
		}
	}
	return opps
}
