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

// generateCrmAccounts creates CRM account records
func generateCrmAccounts(store *MockDataStore) []*crm.CrmAccount {
	accountTypes := []crm.CrmAccountType{
		crm.CrmAccountType_CRM_ACCOUNT_TYPE_CUSTOMER,
		crm.CrmAccountType_CRM_ACCOUNT_TYPE_PROSPECT,
		crm.CrmAccountType_CRM_ACCOUNT_TYPE_PARTNER,
	}
	statuses := []crm.CrmAccountStatus{
		crm.CrmAccountStatus_CRM_ACCOUNT_STATUS_ACTIVE,
		crm.CrmAccountStatus_CRM_ACCOUNT_STATUS_PENDING,
		crm.CrmAccountStatus_CRM_ACCOUNT_STATUS_INACTIVE,
	}

	count := 30
	accounts := make([]*crm.CrmAccount, count)
	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)
		customerID := pickRef(store.CustomerIDs, i)
		parentID := ""
		if i > 5 && i%5 == 0 {
			parentID = fmt.Sprintf("acct-%03d", (i%5)+1)
		}

		// Type distribution: 60% customer, 30% prospect, 10% partner
		var accType crm.CrmAccountType
		if i < count*6/10 {
			accType = accountTypes[0]
		} else if i < count*9/10 {
			accType = accountTypes[1]
		} else {
			accType = accountTypes[2]
		}

		// Status distribution: 80% active, 15% pending, 5% inactive
		var status crm.CrmAccountStatus
		if i < count*8/10 {
			status = statuses[0]
		} else if i < count*95/100 {
			status = statuses[1]
		} else {
			status = statuses[2]
		}

		accounts[i] = &crm.CrmAccount{
			AccountId:       genID("acct", i),
			Name:            customerNames[i%len(customerNames)],
			AccountType:     accType,
			Status:          status,
			ParentAccountId: parentID,
			Industry:        crmIndustries[i%len(crmIndustries)],
			Website:         fmt.Sprintf("https://www.%s.com", customerNames[i%len(customerNames)]),
			Phone:           fmt.Sprintf("555-%03d-%04d", rand.Intn(1000), rand.Intn(10000)),
			BillingAddress: &erp.Address{
				Line1:         fmt.Sprintf("%d %s", rand.Intn(9999)+1, streetNames[i%len(streetNames)]),
				City:          cities[i%len(cities)],
				StateProvince: states[i%len(states)],
				PostalCode:    fmt.Sprintf("%05d", rand.Intn(100000)),
				CountryCode:   "US",
			},
			ShippingAddress: &erp.Address{
				Line1:         fmt.Sprintf("%d %s", rand.Intn(9999)+1, streetNames[i%len(streetNames)]),
				City:          cities[i%len(cities)],
				StateProvince: states[i%len(states)],
				PostalCode:    fmt.Sprintf("%05d", rand.Intn(100000)),
				CountryCode:   "US",
			},
			EmployeeCount:    int32(rand.Intn(5000) + 50),
			AnnualRevenue:    randomMoney(store, 1000000, 100000000),
			OwnerId:          ownerID,
			Description:      fmt.Sprintf("Account for %s", customerNames[i%len(customerNames)]),
			CustomerId:       customerID,
			LastActivityDate: time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
			AuditInfo:        createAuditInfo(),
		}
	}
	return accounts
}

// generateCrmContacts creates CRM contact records
func generateCrmContacts(store *MockDataStore) []*crm.CrmContact {
	titles := []string{"CEO", "CTO", "VP Sales", "Director", "Manager", "Engineer", "Analyst"}
	departments := []string{"Executive", "Sales", "Marketing", "IT", "Operations", "Finance"}

	contacts := make([]*crm.CrmContact, 0, len(store.CrmAccountIDs)*3)
	idx := 1
	for _, accountID := range store.CrmAccountIDs {
		numContacts := rand.Intn(3) + 2
		for j := 0; j < numContacts; j++ {
			ownerID := pickRef(store.EmployeeIDs, (idx-1))
			sourceID := pickRef(store.CrmLeadSourceIDs, (idx-1))

			firstName := firstNames[(idx-1)%len(firstNames)]
			lastName := lastNames[(idx-1)%len(lastNames)]

			contacts = append(contacts, &crm.CrmContact{
				ContactId:  fmt.Sprintf("contact-%03d", idx),
				AccountId:  accountID,
				FirstName:  firstName,
				LastName:   lastName,
				Title:      titles[(idx-1)%len(titles)],
				Department: departments[(idx-1)%len(departments)],
				Email:      fmt.Sprintf("%s.%s@company.com", firstName, lastName),
				Phone:      fmt.Sprintf("555-%03d-%04d", rand.Intn(1000), rand.Intn(10000)),
				Mobile:     fmt.Sprintf("555-%03d-%04d", rand.Intn(1000), rand.Intn(10000)),
				MailingAddress: &erp.Address{
					Line1:         fmt.Sprintf("%d %s", rand.Intn(9999)+1, streetNames[(idx-1)%len(streetNames)]),
					City:          cities[(idx-1)%len(cities)],
					StateProvince: states[(idx-1)%len(states)],
					PostalCode:    fmt.Sprintf("%05d", rand.Intn(100000)),
					CountryCode:   "US",
				},
				OwnerId:          ownerID,
				IsPrimary:        j == 0,
				Description:      fmt.Sprintf("Contact at account"),
				DoNotCall:        idx%10 == 0,
				DoNotEmail:       idx%15 == 0,
				LeadSourceId:     sourceID,
				LastActivityDate: time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
				AuditInfo:        createAuditInfo(),
			})
			idx++
		}
	}
	return contacts
}

// generateCrmInteractions creates CRM interaction records
func generateCrmInteractions(store *MockDataStore) []*crm.CrmInteraction {
	types := []crm.CrmInteractionType{
		crm.CrmInteractionType_CRM_INTERACTION_TYPE_CALL,
		crm.CrmInteractionType_CRM_INTERACTION_TYPE_EMAIL,
		crm.CrmInteractionType_CRM_INTERACTION_TYPE_MEETING,
		crm.CrmInteractionType_CRM_INTERACTION_TYPE_CHAT,
	}
	directions := []crm.CrmInteractionDirection{
		crm.CrmInteractionDirection_CRM_INTERACTION_DIRECTION_INBOUND,
		crm.CrmInteractionDirection_CRM_INTERACTION_DIRECTION_OUTBOUND,
	}
	subjects := []string{"Follow-up Call", "Product Inquiry", "Support Request", "Account Review", "Status Update"}

	interactions := make([]*crm.CrmInteraction, 0, len(store.CrmAccountIDs)*2)
	idx := 1
	for i, accountID := range store.CrmAccountIDs {
		contactID := pickRef(store.CrmContactIDs, i)
		performedBy := pickRef(store.EmployeeIDs, i)

		for j := 0; j < 2; j++ {
			interactions = append(interactions, &crm.CrmInteraction{
				InteractionId:   fmt.Sprintf("intrctn-%03d", idx),
				AccountId:       accountID,
				ContactId:       contactID,
				InteractionType: types[(idx-1)%len(types)],
				Direction:       directions[(idx-1)%len(directions)],
				Subject:         subjects[(idx-1)%len(subjects)],
				Description:     fmt.Sprintf("Interaction %d with account", idx),
				InteractionDate: time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
				DurationMinutes: int32(rand.Intn(60) + 5),
				PerformedBy:     performedBy,
				Outcome:         "Successful - customer satisfied",
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return interactions
}

// generateCrmRelationships creates CRM relationship records between accounts
func generateCrmRelationships(store *MockDataStore) []*crm.CrmRelationship {
	types := []crm.CrmRelationshipType{
		crm.CrmRelationshipType_CRM_RELATIONSHIP_TYPE_PARENT,
		crm.CrmRelationshipType_CRM_RELATIONSHIP_TYPE_SUBSIDIARY,
		crm.CrmRelationshipType_CRM_RELATIONSHIP_TYPE_PARTNER,
		crm.CrmRelationshipType_CRM_RELATIONSHIP_TYPE_AFFILIATE,
	}

	count := len(store.CrmAccountIDs) / 3
	if count < 5 {
		count = 5
	}

	relationships := make([]*crm.CrmRelationship, count)
	for i := 0; i < count; i++ {
		accountID := ""
		relatedAccountID := ""
		if len(store.CrmAccountIDs) > 1 {
			accountID = store.CrmAccountIDs[i%len(store.CrmAccountIDs)]
			relatedAccountID = store.CrmAccountIDs[(i+1)%len(store.CrmAccountIDs)]
		}

		relationships[i] = &crm.CrmRelationship{
			RelationshipId:   genID("relshp", i),
			AccountId:        accountID,
			RelatedAccountId: relatedAccountID,
			RelationshipType: types[i%len(types)],
			Description:      fmt.Sprintf("Relationship %d", i+1),
			StartDate:        time.Now().AddDate(-rand.Intn(3), 0, 0).Unix(),
			IsActive:         true,
			AuditInfo:        createAuditInfo(),
		}
	}
	return relationships
}

// generateCrmHealthScores creates CRM health score records
func generateCrmHealthScores(store *MockDataStore) []*crm.CrmHealthScore {
	statuses := []crm.CrmHealthStatus{
		crm.CrmHealthStatus_CRM_HEALTH_STATUS_HEALTHY,
		crm.CrmHealthStatus_CRM_HEALTH_STATUS_AT_RISK,
		crm.CrmHealthStatus_CRM_HEALTH_STATUS_CRITICAL,
	}

	scores := make([]*crm.CrmHealthScore, 0, len(store.CrmAccountIDs))
	idx := 1
	for _, accountID := range store.CrmAccountIDs {
		// Status distribution: 70% healthy, 20% at risk, 10% critical
		var status crm.CrmHealthStatus
		if idx <= len(store.CrmAccountIDs)*7/10 {
			status = statuses[0]
		} else if idx <= len(store.CrmAccountIDs)*9/10 {
			status = statuses[1]
		} else {
			status = statuses[2]
		}

		overallScore := int32(rand.Intn(40) + 60)
		if status == crm.CrmHealthStatus_CRM_HEALTH_STATUS_AT_RISK {
			overallScore = int32(rand.Intn(20) + 40)
		} else if status == crm.CrmHealthStatus_CRM_HEALTH_STATUS_CRITICAL {
			overallScore = int32(rand.Intn(30) + 10)
		}

		scores = append(scores, &crm.CrmHealthScore{
			ScoreId:           fmt.Sprintf("health-%03d", idx),
			AccountId:         accountID,
			HealthStatus:      status,
			OverallScore:      overallScore,
			EngagementScore:   int32(rand.Intn(100)),
			UsageScore:        int32(rand.Intn(100)),
			SatisfactionScore: int32(rand.Intn(100)),
			FinancialScore:    int32(rand.Intn(100)),
			ScoreDate:         time.Now().Unix(),
			Notes:             fmt.Sprintf("Health score for account"),
			CalculatedBy:      "System",
			AuditInfo:         createAuditInfo(),
		})
		idx++
	}
	return scores
}

// generateCrmAccountPlans creates CRM account plan records
func generateCrmAccountPlans(store *MockDataStore) []*crm.CrmAccountPlan {
	planStatuses := []string{"Draft", "Active", "Completed", "On Hold"}

	count := len(store.CrmAccountIDs) / 2
	if count < 10 {
		count = 10
	}

	plans := make([]*crm.CrmAccountPlan, count)
	for i := 0; i < count; i++ {
		accountID := pickRef(store.CrmAccountIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)

		revenueTarget := int64(rand.Intn(1000000) + 100000)
		currentRevenue := int64(float64(revenueTarget) * (float64(rand.Intn(80)+10) / 100))

		plans[i] = &crm.CrmAccountPlan{
			PlanId:         genID("acctpln", i),
			AccountId:      accountID,
			Name:           fmt.Sprintf("Account Plan %d - FY2025", i+1),
			FiscalYear:     "2025",
			RevenueTarget:  money(store, revenueTarget),
			CurrentRevenue: money(store, currentRevenue),
			Objectives:     "Increase revenue and customer satisfaction",
			Strategies:     "Upsell existing products, cross-sell new solutions",
			ActionItems:    "Quarterly business reviews, executive engagement",
			Risks:          "Competitive pressure, budget constraints",
			OwnerId:        ownerID,
			StartDate:      time.Now().AddDate(0, -6, 0).Unix(),
			EndDate:        time.Now().AddDate(0, 6, 0).Unix(),
			Status:         planStatuses[i%len(planStatuses)],
			AuditInfo:      createAuditInfo(),
		}
	}
	return plans
}
