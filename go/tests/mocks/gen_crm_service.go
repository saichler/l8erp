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

// generateSLAs creates SLA records
func generateSLAs() []*crm.CrmSLA {
	priorities := []crm.CrmCasePriority{
		crm.CrmCasePriority_CRM_CASE_PRIORITY_CRITICAL,
		crm.CrmCasePriority_CRM_CASE_PRIORITY_HIGH,
		crm.CrmCasePriority_CRM_CASE_PRIORITY_MEDIUM,
		crm.CrmCasePriority_CRM_CASE_PRIORITY_LOW,
		crm.CrmCasePriority_CRM_CASE_PRIORITY_HIGH,
		crm.CrmCasePriority_CRM_CASE_PRIORITY_MEDIUM,
	}
	responseTimes := []int32{15, 30, 60, 120, 30, 60}
	resolutionTimes := []int32{60, 120, 240, 480, 120, 240}

	slas := make([]*crm.CrmSLA, len(crmSLANames))
	for i, name := range crmSLANames {
		slas[i] = &crm.CrmSLA{
			SlaId:                genID("sla", i),
			Name:                 name,
			Description:          fmt.Sprintf("Service level agreement: %s", name),
			FirstResponseMinutes: responseTimes[i%len(responseTimes)],
			ResolutionMinutes:    resolutionTimes[i%len(resolutionTimes)],
			IsActive:             true,
			BusinessHours:        "9:00 AM - 5:00 PM",
			IncludeWeekends:      i < 2, // Only first two SLAs include weekends
			EscalationRules:      "Auto-escalate if not acknowledged in 50% of response time",
			AppliesToPriority:    priorities[i%len(priorities)],
			AuditInfo:            createAuditInfo(),
		}
	}
	return slas
}

// generateEscalations creates escalation rule records
func generateEscalations(store *MockDataStore) []*crm.CrmEscalation {
	levels := []crm.CrmEscalationLevel{
		crm.CrmEscalationLevel_CRM_ESCALATION_LEVEL_1,
		crm.CrmEscalationLevel_CRM_ESCALATION_LEVEL_2,
		crm.CrmEscalationLevel_CRM_ESCALATION_LEVEL_3,
		crm.CrmEscalationLevel_CRM_ESCALATION_LEVEL_MANAGER,
	}
	triggerMinutes := []int32{30, 60, 120, 240, 360, 480}

	escalations := make([]*crm.CrmEscalation, len(crmEscalationNames))
	for i, name := range crmEscalationNames {
		escalateTo := pickRef(store.ManagerIDs, i)

		escalations[i] = &crm.CrmEscalation{
			EscalationId:     genID("escal", i),
			Name:             name,
			Description:      fmt.Sprintf("Escalation rule: %s", name),
			Level:            levels[i%len(levels)],
			TriggerMinutes:   triggerMinutes[i%len(triggerMinutes)],
			EscalateToUserId: escalateTo,
			EscalateToQueue:  fmt.Sprintf("Queue-%d", i+1),
			NotifyOwner:      true,
			NotifyManager:    i%2 == 0,
			Criteria:         "priority >= 'High' AND age > trigger_minutes",
			IsActive:         true,
			AuditInfo:        createAuditInfo(),
		}
	}
	return escalations
}

// generateCases creates support case records with embedded comments
func generateCases(store *MockDataStore) []*crm.CrmCase {
	statuses := []crm.CrmCaseStatus{
		crm.CrmCaseStatus_CRM_CASE_STATUS_NEW,
		crm.CrmCaseStatus_CRM_CASE_STATUS_IN_PROGRESS,
		crm.CrmCaseStatus_CRM_CASE_STATUS_WAITING_ON_CUSTOMER,
		crm.CrmCaseStatus_CRM_CASE_STATUS_RESOLVED,
		crm.CrmCaseStatus_CRM_CASE_STATUS_CLOSED,
	}
	priorities := []crm.CrmCasePriority{
		crm.CrmCasePriority_CRM_CASE_PRIORITY_LOW,
		crm.CrmCasePriority_CRM_CASE_PRIORITY_MEDIUM,
		crm.CrmCasePriority_CRM_CASE_PRIORITY_HIGH,
		crm.CrmCasePriority_CRM_CASE_PRIORITY_CRITICAL,
	}
	caseTypes := []crm.CrmCaseType{
		crm.CrmCaseType_CRM_CASE_TYPE_QUESTION,
		crm.CrmCaseType_CRM_CASE_TYPE_PROBLEM,
		crm.CrmCaseType_CRM_CASE_TYPE_FEATURE_REQUEST,
		crm.CrmCaseType_CRM_CASE_TYPE_COMPLAINT,
	}
	origins := []string{"Phone", "Email", "Web", "Chat", "Social Media"}
	subjects := []string{"Cannot login", "Feature not working", "Performance issue", "Billing question", "Integration help"}

	count := 60
	cmtIdx := 1
	cases := make([]*crm.CrmCase, count)
	for i := 0; i < count; i++ {
		accountID := pickRef(store.CrmAccountIDs, i)
		contactID := pickRef(store.CrmContactIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)
		slaID := pickRef(store.CrmSLAIDs, i)

		// Status distribution: 15% new, 35% in progress, 10% waiting, 25% resolved, 15% closed
		var status crm.CrmCaseStatus
		if i < count*15/100 {
			status = statuses[0]
		} else if i < count*50/100 {
			status = statuses[1]
		} else if i < count*60/100 {
			status = statuses[2]
		} else if i < count*85/100 {
			status = statuses[3]
		} else {
			status = statuses[4]
		}

		openedDate := time.Now().AddDate(0, 0, -rand.Intn(30))
		var closedDate int64
		if status == crm.CrmCaseStatus_CRM_CASE_STATUS_CLOSED {
			closedDate = openedDate.AddDate(0, 0, rand.Intn(7)+1).Unix()
		}

		// Embedded comments (1-3 per case)
		numComments := rand.Intn(3) + 1
		comments := make([]*crm.CrmCaseComment, numComments)
		for j := 0; j < numComments; j++ {
			createdBy := pickRef(store.EmployeeIDs, cmtIdx-1)
			comments[j] = &crm.CrmCaseComment{
				CommentId:   fmt.Sprintf("casecmt-%03d", cmtIdx),
				Body:        fmt.Sprintf("Comment %d: Working on this issue. Will update shortly.", cmtIdx),
				IsPublic:    j%2 == 0,
				CreatedById: createdBy,
				CommentDate: time.Now().AddDate(0, 0, -rand.Intn(7)).Unix(),
				AuditInfo:   createAuditInfo(),
			}
			cmtIdx++
		}

		cases[i] = &crm.CrmCase{
			CaseId:          genID("case", i),
			CaseNumber:      fmt.Sprintf("CS-%05d", 10000+i+1),
			Subject:         subjects[i%len(subjects)],
			Description:     fmt.Sprintf("Customer reported issue: %s", subjects[i%len(subjects)]),
			Status:          status,
			Priority:        priorities[i%len(priorities)],
			CaseType:        caseTypes[i%len(caseTypes)],
			AccountId:       accountID,
			ContactId:       contactID,
			OwnerId:         ownerID,
			SlaId:           slaID,
			OpenedDate:      openedDate.Unix(),
			ClosedDate:      closedDate,
			DueDate:         openedDate.AddDate(0, 0, 5).Unix(),
			Origin:          origins[i%len(origins)],
			Resolution:      "Issue resolved",
			EscalationLevel: int32(i % 3),
			IsEscalated:     i%5 == 0,
			AuditInfo:       createAuditInfo(),
			Comments:        comments,
		}
	}
	return cases
}

// generateKBArticles creates knowledge base article records
func generateKBArticles(store *MockDataStore) []*crm.CrmKBArticle {
	statuses := []crm.CrmArticleStatus{
		crm.CrmArticleStatus_CRM_ARTICLE_STATUS_PUBLISHED,
		crm.CrmArticleStatus_CRM_ARTICLE_STATUS_DRAFT,
		crm.CrmArticleStatus_CRM_ARTICLE_STATUS_ARCHIVED,
	}

	articles := make([]*crm.CrmKBArticle, len(crmKBArticleTitles))
	for i, title := range crmKBArticleTitles {
		authorID := pickRef(store.EmployeeIDs, i)

		// Status distribution: 80% published, 15% draft, 5% archived
		var status crm.CrmArticleStatus
		if i < len(crmKBArticleTitles)*8/10 {
			status = statuses[0]
		} else if i < len(crmKBArticleTitles)*95/100 {
			status = statuses[1]
		} else {
			status = statuses[2]
		}

		articles[i] = &crm.CrmKBArticle{
			ArticleId:       genID("kbart", i),
			ArticleNumber:   fmt.Sprintf("KB-%05d", 10000+i+1),
			Title:           title,
			Summary:         fmt.Sprintf("Summary: %s", title),
			Body:            fmt.Sprintf("<h1>%s</h1><p>Detailed content for this knowledge base article.</p>", title),
			Status:          status,
			Category:        crmKBCategories[i%len(crmKBCategories)],
			Subcategory:     "General",
			Keywords:        []string{"help", "support", crmKBCategories[i%len(crmKBCategories)]},
			ViewCount:       int32(rand.Intn(1000) + 50),
			HelpfulCount:    int32(rand.Intn(100) + 10),
			NotHelpfulCount: int32(rand.Intn(20)),
			AuthorId:        authorID,
			PublishDate:     time.Now().AddDate(0, -rand.Intn(6), 0).Unix(),
			Version:         fmt.Sprintf("1.%d", rand.Intn(5)),
			IsFeatured:      i < 3,
			AuditInfo:       createAuditInfo(),
		}
	}
	return articles
}

// generateSurveys creates customer satisfaction survey records
func generateSurveys(store *MockDataStore) []*crm.CrmSurvey {
	statuses := []crm.CrmSurveyStatus{
		crm.CrmSurveyStatus_CRM_SURVEY_STATUS_ACTIVE,
		crm.CrmSurveyStatus_CRM_SURVEY_STATUS_CLOSED,
		crm.CrmSurveyStatus_CRM_SURVEY_STATUS_DRAFT,
	}
	surveyTypes := []string{"CSAT", "NPS", "CES", "Post-Case"}
	surveyNames := []string{"Customer Satisfaction Survey", "Net Promoter Score Survey", "Customer Effort Score", "Case Resolution Feedback"}

	count := 40
	surveys := make([]*crm.CrmSurvey, count)
	for i := 0; i < count; i++ {
		caseID := ""
		if len(store.CrmCaseIDs) > 0 && i%2 == 0 {
			caseID = store.CrmCaseIDs[i%len(store.CrmCaseIDs)]
		}
		accountID := pickRef(store.CrmAccountIDs, i)
		contactID := pickRef(store.CrmContactIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)

		// Status distribution: 60% closed (completed), 30% active, 10% draft
		var status crm.CrmSurveyStatus
		if i < count*6/10 {
			status = statuses[1]
		} else if i < count*9/10 {
			status = statuses[0]
		} else {
			status = statuses[2]
		}

		sentDate := time.Now().AddDate(0, 0, -rand.Intn(30))
		var completedDate int64
		if status == crm.CrmSurveyStatus_CRM_SURVEY_STATUS_CLOSED {
			completedDate = sentDate.AddDate(0, 0, rand.Intn(3)+1).Unix()
		}

		surveys[i] = &crm.CrmSurvey{
			SurveyId:       genID("survey", i),
			Name:           surveyNames[i%len(surveyNames)],
			Description:    fmt.Sprintf("Survey %d for customer feedback", i+1),
			Status:         status,
			CaseId:         caseID,
			AccountId:      accountID,
			ContactId:      contactID,
			SentDate:       sentDate.Unix(),
			CompletedDate:  completedDate,
			OverallRating:  int32(rand.Intn(5) + 1),
			Feedback:       "Great service!",
			WouldRecommend: rand.Intn(10) > 2,
			SurveyType:     surveyTypes[i%len(surveyTypes)],
			OwnerId:        ownerID,
			AuditInfo:      createAuditInfo(),
		}
	}
	return surveys
}
