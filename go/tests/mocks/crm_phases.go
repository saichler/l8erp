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

	"github.com/saichler/l8erp/go/types/crm"
)

// CRM Phase 1: Leads Foundation (Lead Sources, Score Rules, Assignment Rules)
func generateCrmPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Lead Sources
	fmt.Printf("  Creating Lead Sources...")
	leadSources := generateLeadSources()
	if err := client.post("/erp/80/CrmLeadSrc", &crm.CrmLeadSourceList{List: leadSources}); err != nil {
		return fmt.Errorf("lead sources: %w", err)
	}
	for _, src := range leadSources {
		store.CrmLeadSourceIDs = append(store.CrmLeadSourceIDs, src.SourceId)
	}
	fmt.Printf(" %d created\n", len(leadSources))

	// Generate Lead Score Rules
	fmt.Printf("  Creating Lead Score Rules...")
	scoreRules := generateLeadScoreRules()
	if err := client.post("/erp/80/CrmLdScore", &crm.CrmLeadScoreList{List: scoreRules}); err != nil {
		return fmt.Errorf("lead score rules: %w", err)
	}
	for _, rule := range scoreRules {
		store.CrmLeadScoreIDs = append(store.CrmLeadScoreIDs, rule.ScoreId)
	}
	fmt.Printf(" %d created\n", len(scoreRules))

	// Generate Lead Assignment Rules
	fmt.Printf("  Creating Lead Assignment Rules...")
	assignRules := generateLeadAssignRules(store)
	if err := client.post("/erp/80/CrmLdAssn", &crm.CrmLeadAssignList{List: assignRules}); err != nil {
		return fmt.Errorf("lead assignment rules: %w", err)
	}
	for _, rule := range assignRules {
		store.CrmLeadAssignIDs = append(store.CrmLeadAssignIDs, rule.AssignmentId)
	}
	fmt.Printf(" %d created\n", len(assignRules))

	return nil
}

// CRM Phase 2: Opportunity Stages
func generateCrmPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Opportunity Stages
	fmt.Printf("  Creating Opportunity Stages...")
	oppStages := generateOppStages()
	if err := client.post("/erp/80/CrmOppStg", &crm.CrmOppStageList{List: oppStages}); err != nil {
		return fmt.Errorf("opportunity stages: %w", err)
	}
	for _, stage := range oppStages {
		store.CrmOppStageIDs = append(store.CrmOppStageIDs, stage.StageId)
	}
	fmt.Printf(" %d created\n", len(oppStages))

	return nil
}

// CRM Phase 3: Accounts & Contacts
func generateCrmPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Accounts
	fmt.Printf("  Creating Accounts...")
	accounts := generateAccounts(store)
	if err := client.post("/erp/80/CrmAcct", &crm.CrmAccountList{List: accounts}); err != nil {
		return fmt.Errorf("accounts: %w", err)
	}
	for _, acct := range accounts {
		store.CrmAccountIDs = append(store.CrmAccountIDs, acct.AccountId)
	}
	fmt.Printf(" %d created\n", len(accounts))

	// Generate Contacts
	fmt.Printf("  Creating Contacts...")
	contacts := generateContacts(store)
	if err := client.post("/erp/80/CrmContact", &crm.CrmContactList{List: contacts}); err != nil {
		return fmt.Errorf("contacts: %w", err)
	}
	for _, contact := range contacts {
		store.CrmContactIDs = append(store.CrmContactIDs, contact.ContactId)
	}
	fmt.Printf(" %d created\n", len(contacts))

	return nil
}

// CRM Phase 4: Marketing
func generateCrmPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Marketing Lists
	fmt.Printf("  Creating Marketing Lists...")
	lists := generateMarketingLists(store)
	if err := client.post("/erp/80/CrmMktList", &crm.CrmMarketingListList{List: lists}); err != nil {
		return fmt.Errorf("marketing lists: %w", err)
	}
	for _, list := range lists {
		store.CrmMarketingListIDs = append(store.CrmMarketingListIDs, list.ListId)
	}
	fmt.Printf(" %d created\n", len(lists))

	// Generate Email Templates
	fmt.Printf("  Creating Email Templates...")
	templates := generateEmailTemplates(store)
	if err := client.post("/erp/80/CrmEmailTp", &crm.CrmEmailTemplateList{List: templates}); err != nil {
		return fmt.Errorf("email templates: %w", err)
	}
	for _, tpl := range templates {
		store.CrmEmailTemplateIDs = append(store.CrmEmailTemplateIDs, tpl.TemplateId)
	}
	fmt.Printf(" %d created\n", len(templates))

	// Generate Campaigns
	fmt.Printf("  Creating Campaigns...")
	campaigns := generateCampaigns(store)
	if err := client.post("/erp/80/CrmCmpgn", &crm.CrmCampaignList{List: campaigns}); err != nil {
		return fmt.Errorf("campaigns: %w", err)
	}
	for _, cmpgn := range campaigns {
		store.CrmCampaignIDs = append(store.CrmCampaignIDs, cmpgn.CampaignId)
	}
	fmt.Printf(" %d created\n", len(campaigns))

	// Generate Campaign Members
	fmt.Printf("  Creating Campaign Members...")
	members := generateCampaignMembers(store)
	if err := client.post("/erp/80/CrmCmpgMbr", &crm.CrmCampaignMemberList{List: members}); err != nil {
		return fmt.Errorf("campaign members: %w", err)
	}
	for _, mbr := range members {
		store.CrmCampaignMemberIDs = append(store.CrmCampaignMemberIDs, mbr.MemberId)
	}
	fmt.Printf(" %d created\n", len(members))

	// Generate Campaign Responses
	fmt.Printf("  Creating Campaign Responses...")
	responses := generateCampaignResponses(store)
	if err := client.post("/erp/80/CrmCmpgRsp", &crm.CrmCampaignResponseList{List: responses}); err != nil {
		return fmt.Errorf("campaign responses: %w", err)
	}
	for _, rsp := range responses {
		store.CrmCampaignResponseIDs = append(store.CrmCampaignResponseIDs, rsp.ResponseId)
	}
	fmt.Printf(" %d created\n", len(responses))

	// Generate Campaign ROIs
	fmt.Printf("  Creating Campaign ROIs...")
	rois := generateCampaignROIs(store)
	if err := client.post("/erp/80/CrmCmpgROI", &crm.CrmCampaignROIList{List: rois}); err != nil {
		return fmt.Errorf("campaign ROIs: %w", err)
	}
	for _, roi := range rois {
		store.CrmCampaignROIIDs = append(store.CrmCampaignROIIDs, roi.RoiId)
	}
	fmt.Printf(" %d created\n", len(rois))

	return nil
}

// CRM Phase 5: Leads
func generateCrmPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Leads
	fmt.Printf("  Creating Leads...")
	leads := generateLeads(store)
	if err := client.post("/erp/80/CrmLead", &crm.CrmLeadList{List: leads}); err != nil {
		return fmt.Errorf("leads: %w", err)
	}
	for _, lead := range leads {
		store.CrmLeadIDs = append(store.CrmLeadIDs, lead.LeadId)
	}
	fmt.Printf(" %d created\n", len(leads))

	// Generate Lead Activities
	fmt.Printf("  Creating Lead Activities...")
	activities := generateLeadActivities(store)
	if err := client.post("/erp/80/CrmLdAct", &crm.CrmLeadActivityList{List: activities}); err != nil {
		return fmt.Errorf("lead activities: %w", err)
	}
	for _, act := range activities {
		store.CrmLeadActivityIDs = append(store.CrmLeadActivityIDs, act.ActivityId)
	}
	fmt.Printf(" %d created\n", len(activities))

	return nil
}

// CRM Phase 6: Opportunities
func generateCrmPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate Opportunities
	fmt.Printf("  Creating Opportunities...")
	opps := generateOpportunities(store)
	if err := client.post("/erp/80/CrmOpp", &crm.CrmOpportunityList{List: opps}); err != nil {
		return fmt.Errorf("opportunities: %w", err)
	}
	for _, opp := range opps {
		store.CrmOpportunityIDs = append(store.CrmOpportunityIDs, opp.OpportunityId)
	}
	fmt.Printf(" %d created\n", len(opps))

	// Generate Opportunity Competitors
	fmt.Printf("  Creating Opportunity Competitors...")
	competitors := generateOppCompetitors(store)
	if err := client.post("/erp/80/CrmOppComp", &crm.CrmOppCompetitorList{List: competitors}); err != nil {
		return fmt.Errorf("opportunity competitors: %w", err)
	}
	for _, comp := range competitors {
		store.CrmOppCompetitorIDs = append(store.CrmOppCompetitorIDs, comp.CompetitorId)
	}
	fmt.Printf(" %d created\n", len(competitors))

	// Generate Opportunity Products
	fmt.Printf("  Creating Opportunity Products...")
	products := generateOppProducts(store)
	if err := client.post("/erp/80/CrmOppProd", &crm.CrmOppProductList{List: products}); err != nil {
		return fmt.Errorf("opportunity products: %w", err)
	}
	for _, prod := range products {
		store.CrmOppProductIDs = append(store.CrmOppProductIDs, prod.LineId)
	}
	fmt.Printf(" %d created\n", len(products))

	// Generate Opportunity Teams
	fmt.Printf("  Creating Opportunity Teams...")
	teams := generateOppTeams(store)
	if err := client.post("/erp/80/CrmOppTeam", &crm.CrmOppTeamList{List: teams}); err != nil {
		return fmt.Errorf("opportunity teams: %w", err)
	}
	for _, team := range teams {
		store.CrmOppTeamIDs = append(store.CrmOppTeamIDs, team.MemberId)
	}
	fmt.Printf(" %d created\n", len(teams))

	// Generate Opportunity Activities
	fmt.Printf("  Creating Opportunity Activities...")
	oppActs := generateOppActivities(store)
	if err := client.post("/erp/80/CrmOppAct", &crm.CrmOppActivityList{List: oppActs}); err != nil {
		return fmt.Errorf("opportunity activities: %w", err)
	}
	for _, act := range oppActs {
		store.CrmOppActivityIDs = append(store.CrmOppActivityIDs, act.ActivityId)
	}
	fmt.Printf(" %d created\n", len(oppActs))

	return nil
}

// CRM Phase 7: Account Management
func generateCrmPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Interactions
	fmt.Printf("  Creating Interactions...")
	interactions := generateInteractions(store)
	if err := client.post("/erp/80/CrmIntrctn", &crm.CrmInteractionList{List: interactions}); err != nil {
		return fmt.Errorf("interactions: %w", err)
	}
	for _, intr := range interactions {
		store.CrmInteractionIDs = append(store.CrmInteractionIDs, intr.InteractionId)
	}
	fmt.Printf(" %d created\n", len(interactions))

	// Generate Relationships
	fmt.Printf("  Creating Relationships...")
	relationships := generateRelationships(store)
	if err := client.post("/erp/80/CrmRelshp", &crm.CrmRelationshipList{List: relationships}); err != nil {
		return fmt.Errorf("relationships: %w", err)
	}
	for _, rel := range relationships {
		store.CrmRelationshipIDs = append(store.CrmRelationshipIDs, rel.RelationshipId)
	}
	fmt.Printf(" %d created\n", len(relationships))

	// Generate Health Scores
	fmt.Printf("  Creating Health Scores...")
	healthScores := generateHealthScores(store)
	if err := client.post("/erp/80/CrmHealth", &crm.CrmHealthScoreList{List: healthScores}); err != nil {
		return fmt.Errorf("health scores: %w", err)
	}
	for _, hs := range healthScores {
		store.CrmHealthScoreIDs = append(store.CrmHealthScoreIDs, hs.ScoreId)
	}
	fmt.Printf(" %d created\n", len(healthScores))

	// Generate Account Plans
	fmt.Printf("  Creating Account Plans...")
	accountPlans := generateAccountPlans(store)
	if err := client.post("/erp/80/CrmAcctPln", &crm.CrmAccountPlanList{List: accountPlans}); err != nil {
		return fmt.Errorf("account plans: %w", err)
	}
	for _, plan := range accountPlans {
		store.CrmAccountPlanIDs = append(store.CrmAccountPlanIDs, plan.PlanId)
	}
	fmt.Printf(" %d created\n", len(accountPlans))

	// Generate Lead Conversions (depends on accounts, contacts, opportunities)
	fmt.Printf("  Creating Lead Conversions...")
	conversions := generateLeadConversions(store)
	if err := client.post("/erp/80/CrmLdConv", &crm.CrmLeadConversionList{List: conversions}); err != nil {
		return fmt.Errorf("lead conversions: %w", err)
	}
	for _, conv := range conversions {
		store.CrmLeadConversionIDs = append(store.CrmLeadConversionIDs, conv.ConversionId)
	}
	fmt.Printf(" %d created\n", len(conversions))

	return nil
}

// CRM Phase 8: Customer Service
func generateCrmPhase8(client *HCMClient, store *MockDataStore) error {
	// Generate SLAs
	fmt.Printf("  Creating SLAs...")
	slas := generateSLAs()
	if err := client.post("/erp/80/CrmSLA", &crm.CrmSLAList{List: slas}); err != nil {
		return fmt.Errorf("SLAs: %w", err)
	}
	for _, sla := range slas {
		store.CrmSLAIDs = append(store.CrmSLAIDs, sla.SlaId)
	}
	fmt.Printf(" %d created\n", len(slas))

	// Generate Escalations
	fmt.Printf("  Creating Escalations...")
	escalations := generateEscalations(store)
	if err := client.post("/erp/80/CrmEscal", &crm.CrmEscalationList{List: escalations}); err != nil {
		return fmt.Errorf("escalations: %w", err)
	}
	for _, esc := range escalations {
		store.CrmEscalationIDs = append(store.CrmEscalationIDs, esc.EscalationId)
	}
	fmt.Printf(" %d created\n", len(escalations))

	// Generate Cases
	fmt.Printf("  Creating Cases...")
	cases := generateCases(store)
	if err := client.post("/erp/80/CrmCase", &crm.CrmCaseList{List: cases}); err != nil {
		return fmt.Errorf("cases: %w", err)
	}
	for _, cs := range cases {
		store.CrmCaseIDs = append(store.CrmCaseIDs, cs.CaseId)
	}
	fmt.Printf(" %d created\n", len(cases))

	// Generate Case Comments
	fmt.Printf("  Creating Case Comments...")
	comments := generateCaseComments(store)
	if err := client.post("/erp/80/CrmCaseCmt", &crm.CrmCaseCommentList{List: comments}); err != nil {
		return fmt.Errorf("case comments: %w", err)
	}
	for _, cmt := range comments {
		store.CrmCaseCommentIDs = append(store.CrmCaseCommentIDs, cmt.CommentId)
	}
	fmt.Printf(" %d created\n", len(comments))

	// Generate KB Articles
	fmt.Printf("  Creating KB Articles...")
	articles := generateKBArticles(store)
	if err := client.post("/erp/80/CrmKBart", &crm.CrmKBArticleList{List: articles}); err != nil {
		return fmt.Errorf("KB articles: %w", err)
	}
	for _, art := range articles {
		store.CrmKBArticleIDs = append(store.CrmKBArticleIDs, art.ArticleId)
	}
	fmt.Printf(" %d created\n", len(articles))

	// Generate Surveys
	fmt.Printf("  Creating Surveys...")
	surveys := generateSurveys(store)
	if err := client.post("/erp/80/CrmSurvey", &crm.CrmSurveyList{List: surveys}); err != nil {
		return fmt.Errorf("surveys: %w", err)
	}
	for _, srv := range surveys {
		store.CrmSurveyIDs = append(store.CrmSurveyIDs, srv.SurveyId)
	}
	fmt.Printf(" %d created\n", len(surveys))

	return nil
}

// CRM Phase 9: Field Service
func generateCrmPhase9(client *HCMClient, store *MockDataStore) error {
	// Generate Technicians
	fmt.Printf("  Creating Technicians...")
	technicians := generateTechnicians(store)
	if err := client.post("/erp/80/CrmTech", &crm.CrmTechnicianList{List: technicians}); err != nil {
		return fmt.Errorf("technicians: %w", err)
	}
	for _, tech := range technicians {
		store.CrmTechnicianIDs = append(store.CrmTechnicianIDs, tech.TechnicianId)
	}
	fmt.Printf(" %d created\n", len(technicians))

	// Generate Service Contracts
	fmt.Printf("  Creating Service Contracts...")
	contracts := generateServiceContracts(store)
	if err := client.post("/erp/80/CrmSvcCntr", &crm.CrmServiceContractList{List: contracts}); err != nil {
		return fmt.Errorf("service contracts: %w", err)
	}
	for _, contr := range contracts {
		store.CrmServiceContractIDs = append(store.CrmServiceContractIDs, contr.ContractId)
	}
	fmt.Printf(" %d created\n", len(contracts))

	// Generate Service Orders
	fmt.Printf("  Creating Service Orders...")
	orders := generateServiceOrders(store)
	if err := client.post("/erp/80/CrmSvcOrd", &crm.CrmServiceOrderList{List: orders}); err != nil {
		return fmt.Errorf("service orders: %w", err)
	}
	for _, ord := range orders {
		store.CrmServiceOrderIDs = append(store.CrmServiceOrderIDs, ord.OrderId)
	}
	fmt.Printf(" %d created\n", len(orders))

	// Generate Service Schedules
	fmt.Printf("  Creating Service Schedules...")
	schedules := generateServiceSchedules(store)
	if err := client.post("/erp/80/CrmSvcSchd", &crm.CrmServiceScheduleList{List: schedules}); err != nil {
		return fmt.Errorf("service schedules: %w", err)
	}
	for _, sched := range schedules {
		store.CrmServiceScheduleIDs = append(store.CrmServiceScheduleIDs, sched.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(schedules))

	// Generate Service Parts
	fmt.Printf("  Creating Service Parts...")
	parts := generateServiceParts(store)
	if err := client.post("/erp/80/CrmSvcPart", &crm.CrmServicePartList{List: parts}); err != nil {
		return fmt.Errorf("service parts: %w", err)
	}
	for _, part := range parts {
		store.CrmServicePartIDs = append(store.CrmServicePartIDs, part.PartId)
	}
	fmt.Printf(" %d created\n", len(parts))

	// Generate Service Visits
	fmt.Printf("  Creating Service Visits...")
	visits := generateServiceVisits(store)
	if err := client.post("/erp/80/CrmSvcVst", &crm.CrmServiceVisitList{List: visits}); err != nil {
		return fmt.Errorf("service visits: %w", err)
	}
	for _, vst := range visits {
		store.CrmServiceVisitIDs = append(store.CrmServiceVisitIDs, vst.VisitId)
	}
	fmt.Printf(" %d created\n", len(visits))

	return nil
}
