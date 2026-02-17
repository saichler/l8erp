package ui

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

func registerCrmTypes(resources ifs.IResources) {
	// Lead Management
	common.RegisterType[crm.CrmLead, crm.CrmLeadList](resources, "LeadId")
	common.RegisterType[crm.CrmLeadSource, crm.CrmLeadSourceList](resources, "SourceId")
	common.RegisterType[crm.CrmLeadScore, crm.CrmLeadScoreList](resources, "ScoreId")
	common.RegisterType[crm.CrmLeadAssign, crm.CrmLeadAssignList](resources, "AssignmentId")

	// Opportunity Management
	common.RegisterType[crm.CrmOpportunity, crm.CrmOpportunityList](resources, "OpportunityId")
	common.RegisterType[crm.CrmOppStage, crm.CrmOppStageList](resources, "StageId")

	// Account Management
	common.RegisterType[crm.CrmAccount, crm.CrmAccountList](resources, "AccountId")
	common.RegisterType[crm.CrmContact, crm.CrmContactList](resources, "ContactId")
	common.RegisterType[crm.CrmInteraction, crm.CrmInteractionList](resources, "InteractionId")
	common.RegisterType[crm.CrmRelationship, crm.CrmRelationshipList](resources, "RelationshipId")

	// Marketing
	common.RegisterType[crm.CrmCampaign, crm.CrmCampaignList](resources, "CampaignId")
	common.RegisterType[crm.CrmEmailTemplate, crm.CrmEmailTemplateList](resources, "TemplateId")
	common.RegisterType[crm.CrmMarketingList, crm.CrmMarketingListList](resources, "ListId")

	// Customer Service
	common.RegisterType[crm.CrmCase, crm.CrmCaseList](resources, "CaseId")
	common.RegisterType[crm.CrmKBArticle, crm.CrmKBArticleList](resources, "ArticleId")
	common.RegisterType[crm.CrmSLA, crm.CrmSLAList](resources, "SlaId")
	common.RegisterType[crm.CrmEscalation, crm.CrmEscalationList](resources, "EscalationId")
	common.RegisterType[crm.CrmSurvey, crm.CrmSurveyList](resources, "SurveyId")

	// Field Service
	common.RegisterType[crm.CrmServiceOrder, crm.CrmServiceOrderList](resources, "OrderId")
	common.RegisterType[crm.CrmTechnician, crm.CrmTechnicianList](resources, "TechnicianId")
	common.RegisterType[crm.CrmServiceContract, crm.CrmServiceContractList](resources, "ContractId")
	common.RegisterType[crm.CrmServiceSchedule, crm.CrmServiceScheduleList](resources, "ScheduleId")
}
