package ui

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

func registerCrmTypes(resources ifs.IResources) {
	// Lead Management
	common.RegisterType(resources, &crm.CrmLead{}, &crm.CrmLeadList{}, "LeadId")
	common.RegisterType(resources, &crm.CrmLeadSource{}, &crm.CrmLeadSourceList{}, "SourceId")
	common.RegisterType(resources, &crm.CrmLeadScore{}, &crm.CrmLeadScoreList{}, "ScoreId")
	common.RegisterType(resources, &crm.CrmLeadAssign{}, &crm.CrmLeadAssignList{}, "AssignmentId")

	// Opportunity Management
	common.RegisterType(resources, &crm.CrmOpportunity{}, &crm.CrmOpportunityList{}, "OpportunityId")
	common.RegisterType(resources, &crm.CrmOppStage{}, &crm.CrmOppStageList{}, "StageId")

	// Account Management
	common.RegisterType(resources, &crm.CrmAccount{}, &crm.CrmAccountList{}, "AccountId")
	common.RegisterType(resources, &crm.CrmContact{}, &crm.CrmContactList{}, "ContactId")
	common.RegisterType(resources, &crm.CrmInteraction{}, &crm.CrmInteractionList{}, "InteractionId")
	common.RegisterType(resources, &crm.CrmRelationship{}, &crm.CrmRelationshipList{}, "RelationshipId")

	// Marketing
	common.RegisterType(resources, &crm.CrmCampaign{}, &crm.CrmCampaignList{}, "CampaignId")
	common.RegisterType(resources, &crm.CrmEmailTemplate{}, &crm.CrmEmailTemplateList{}, "TemplateId")
	common.RegisterType(resources, &crm.CrmMarketingList{}, &crm.CrmMarketingListList{}, "ListId")

	// Customer Service
	common.RegisterType(resources, &crm.CrmCase{}, &crm.CrmCaseList{}, "CaseId")
	common.RegisterType(resources, &crm.CrmKBArticle{}, &crm.CrmKBArticleList{}, "ArticleId")
	common.RegisterType(resources, &crm.CrmSLA{}, &crm.CrmSLAList{}, "SlaId")
	common.RegisterType(resources, &crm.CrmEscalation{}, &crm.CrmEscalationList{}, "EscalationId")
	common.RegisterType(resources, &crm.CrmSurvey{}, &crm.CrmSurveyList{}, "SurveyId")

	// Field Service
	common.RegisterType(resources, &crm.CrmServiceOrder{}, &crm.CrmServiceOrderList{}, "OrderId")
	common.RegisterType(resources, &crm.CrmTechnician{}, &crm.CrmTechnicianList{}, "TechnicianId")
	common.RegisterType(resources, &crm.CrmServiceContract{}, &crm.CrmServiceContractList{}, "ContractId")
	common.RegisterType(resources, &crm.CrmServiceSchedule{}, &crm.CrmServiceScheduleList{}, "ScheduleId")
}
