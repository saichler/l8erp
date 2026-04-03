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

	"github.com/saichler/l8erp/go/types/crm"
)

// CRM Phase 1: Leads Foundation (Lead Sources, Score Rules, Assignment Rules)
func generateCrmPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Lead Sources
	leadSources := generateLeadSources()
	if err := runOp(client, "Lead Sources", "/erp/80/CrmLeadSrc", &crm.CrmLeadSourceList{List: leadSources}, extractIDs(leadSources, func(v interface{}) string { return v.(*crm.CrmLeadSource).SourceId }), &store.CrmLeadSourceIDs); err != nil {
		return err
	}

	// Generate Lead Score Rules
	scoreRules := generateLeadScoreRules()
	if err := runOp(client, "Lead Score Rules", "/erp/80/CrmLdScore", &crm.CrmLeadScoreList{List: scoreRules}, extractIDs(scoreRules, func(v interface{}) string { return v.(*crm.CrmLeadScore).ScoreId }), &store.CrmLeadScoreIDs); err != nil {
		return err
	}

	// Generate Lead Assignment Rules
	assignRules := generateLeadAssignRules(store)
	if err := runOp(client, "Lead Assignment Rules", "/erp/80/CrmLdAssn", &crm.CrmLeadAssignList{List: assignRules}, extractIDs(assignRules, func(v interface{}) string { return v.(*crm.CrmLeadAssign).AssignmentId }), &store.CrmLeadAssignIDs); err != nil {
		return err
	}

	return nil
}

// CRM Phase 2: Opportunity Stages
func generateCrmPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Opportunity Stages
	oppStages := generateOppStages()
	if err := runOp(client, "Opportunity Stages", "/erp/80/CrmOppStg", &crm.CrmOppStageList{List: oppStages}, extractIDs(oppStages, func(v interface{}) string { return v.(*crm.CrmOppStage).StageId }), &store.CrmOppStageIDs); err != nil {
		return err
	}

	return nil
}

// CRM Phase 3: Accounts & Contacts (accounts embed HealthScores + AccountPlans)
func generateCrmPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Accounts (with embedded HealthScores and AccountPlans)
	accounts := generateCrmAccounts(store)
	if err := runOp(client, "Accounts", "/erp/80/CrmAcct", &crm.CrmAccountList{List: accounts}, extractIDs(accounts, func(v interface{}) string { return v.(*crm.CrmAccount).AccountId }), &store.CrmAccountIDs); err != nil {
		return err
	}

	// Generate Contacts
	contacts := generateCrmContacts(store)
	if err := runOp(client, "Contacts", "/erp/80/CrmContact", &crm.CrmContactList{List: contacts}, extractIDs(contacts, func(v interface{}) string { return v.(*crm.CrmContact).ContactId }), &store.CrmContactIDs); err != nil {
		return err
	}

	return nil
}

// CRM Phase 4: Marketing (campaigns embed Members, Responses, ROIs)
func generateCrmPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Marketing Lists
	lists := generateMarketingLists(store)
	if err := runOp(client, "Marketing Lists", "/erp/80/CrmMktList", &crm.CrmMarketingListList{List: lists}, extractIDs(lists, func(v interface{}) string { return v.(*crm.CrmMarketingList).ListId }), &store.CrmMarketingListIDs); err != nil {
		return err
	}

	// Generate Email Templates
	templates := generateEmailTemplates(store)
	if err := runOp(client, "Email Templates", "/erp/80/CrmEmailTp", &crm.CrmEmailTemplateList{List: templates}, extractIDs(templates, func(v interface{}) string { return v.(*crm.CrmEmailTemplate).TemplateId }), &store.CrmEmailTemplateIDs); err != nil {
		return err
	}

	// Generate Campaigns (with embedded Members, Responses, ROIs)
	campaigns := generateCampaigns(store)
	if err := runOp(client, "Campaigns", "/erp/80/CrmCmpgn", &crm.CrmCampaignList{List: campaigns}, extractIDs(campaigns, func(v interface{}) string { return v.(*crm.CrmCampaign).CampaignId }), &store.CrmCampaignIDs); err != nil {
		return err
	}

	return nil
}

// CRM Phase 5: Opportunities (embed Activities, Products, Teams, Competitors)
func generateCrmPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Opportunities (with embedded Activities, Products, TeamMembers, Competitors)
	opps := generateOpportunities(store)
	if err := runOp(client, "Opportunities", "/erp/80/CrmOpp", &crm.CrmOpportunityList{List: opps}, extractIDs(opps, func(v interface{}) string { return v.(*crm.CrmOpportunity).OpportunityId }), &store.CrmOpportunityIDs); err != nil {
		return err
	}

	return nil
}

// CRM Phase 6: Leads (embed Activities, Conversions - after Opportunities for conversion refs)
func generateCrmPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate Leads (with embedded Activities and Conversions)
	leads := generateLeads(store)
	if err := runOp(client, "Leads", "/erp/80/CrmLead", &crm.CrmLeadList{List: leads}, extractIDs(leads, func(v interface{}) string { return v.(*crm.CrmLead).LeadId }), &store.CrmLeadIDs); err != nil {
		return err
	}

	return nil
}

// CRM Phase 7: Account Management (Interactions, Relationships)
func generateCrmPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Interactions
	interactions := generateCrmInteractions(store)
	if err := runOp(client, "Interactions", "/erp/80/CrmIntrctn", &crm.CrmInteractionList{List: interactions}, extractIDs(interactions, func(v interface{}) string { return v.(*crm.CrmInteraction).InteractionId }), &store.CrmInteractionIDs); err != nil {
		return err
	}

	// Generate Relationships
	relationships := generateCrmRelationships(store)
	if err := runOp(client, "Relationships", "/erp/80/CrmRelshp", &crm.CrmRelationshipList{List: relationships}, extractIDs(relationships, func(v interface{}) string { return v.(*crm.CrmRelationship).RelationshipId }), &store.CrmRelationshipIDs); err != nil {
		return err
	}

	return nil
}

// CRM Phase 8: Customer Service (cases embed Comments)
func generateCrmPhase8(client *HCMClient, store *MockDataStore) error {
	// Generate SLAs
	slas := generateSLAs()
	if err := runOp(client, "SLAs", "/erp/80/CrmSLA", &crm.CrmSLAList{List: slas}, extractIDs(slas, func(v interface{}) string { return v.(*crm.CrmSLA).SlaId }), &store.CrmSLAIDs); err != nil {
		return err
	}

	// Generate Escalations
	escalations := generateEscalations(store)
	if err := runOp(client, "Escalations", "/erp/80/CrmEscal", &crm.CrmEscalationList{List: escalations}, extractIDs(escalations, func(v interface{}) string { return v.(*crm.CrmEscalation).EscalationId }), &store.CrmEscalationIDs); err != nil {
		return err
	}

	// Generate Cases (with embedded Comments)
	cases := generateCases(store)
	if err := runOp(client, "Cases", "/erp/80/CrmCase", &crm.CrmCaseList{List: cases}, extractIDs(cases, func(v interface{}) string { return v.(*crm.CrmCase).CaseId }), &store.CrmCaseIDs); err != nil {
		return err
	}

	// Generate KB Articles
	articles := generateKBArticles(store)
	if err := runOp(client, "KB Articles", "/erp/80/CrmKBart", &crm.CrmKBArticleList{List: articles}, extractIDs(articles, func(v interface{}) string { return v.(*crm.CrmKBArticle).ArticleId }), &store.CrmKBArticleIDs); err != nil {
		return err
	}

	// Generate Surveys
	surveys := generateSurveys(store)
	if err := runOp(client, "Surveys", "/erp/80/CrmSurvey", &crm.CrmSurveyList{List: surveys}, extractIDs(surveys, func(v interface{}) string { return v.(*crm.CrmSurvey).SurveyId }), &store.CrmSurveyIDs); err != nil {
		return err
	}

	return nil
}

// CRM Phase 9: Field Service (service orders embed Parts + Visits)
func generateCrmPhase9(client *HCMClient, store *MockDataStore) error {
	// Generate Technicians
	technicians := generateTechnicians(store)
	if err := runOp(client, "Technicians", "/erp/80/CrmTech", &crm.CrmTechnicianList{List: technicians}, extractIDs(technicians, func(v interface{}) string { return v.(*crm.CrmTechnician).TechnicianId }), &store.CrmTechnicianIDs); err != nil {
		return err
	}

	// Generate Service Contracts
	contracts := generateServiceContracts(store)
	if err := runOp(client, "Service Contracts", "/erp/80/CrmSvcCntr", &crm.CrmServiceContractList{List: contracts}, extractIDs(contracts, func(v interface{}) string { return v.(*crm.CrmServiceContract).ContractId }), &store.CrmServiceContractIDs); err != nil {
		return err
	}

	// Generate Service Orders (with embedded Parts and Visits)
	orders := generateServiceOrders(store)
	if err := runOp(client, "Service Orders", "/erp/80/CrmSvcOrd", &crm.CrmServiceOrderList{List: orders}, extractIDs(orders, func(v interface{}) string { return v.(*crm.CrmServiceOrder).OrderId }), &store.CrmServiceOrderIDs); err != nil {
		return err
	}

	// Generate Service Schedules
	schedules := generateServiceSchedules(store)
	if err := runOp(client, "Service Schedules", "/erp/80/CrmSvcSchd", &crm.CrmServiceScheduleList{List: schedules}, extractIDs(schedules, func(v interface{}) string { return v.(*crm.CrmServiceSchedule).ScheduleId }), &store.CrmServiceScheduleIDs); err != nil {
		return err
	}

	return nil
}
