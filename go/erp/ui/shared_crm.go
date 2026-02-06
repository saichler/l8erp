package main

import (
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

func registerCrmTypes(resources ifs.IResources) {
	// Lead Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLead{}, "LeadId")
	resources.Registry().Register(&crm.CrmLeadList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadSource{}, "SourceId")
	resources.Registry().Register(&crm.CrmLeadSourceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadScore{}, "ScoreId")
	resources.Registry().Register(&crm.CrmLeadScoreList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadActivity{}, "ActivityId")
	resources.Registry().Register(&crm.CrmLeadActivityList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadAssign{}, "AssignmentId")
	resources.Registry().Register(&crm.CrmLeadAssignList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadConversion{}, "ConversionId")
	resources.Registry().Register(&crm.CrmLeadConversionList{})

	// Opportunity Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOpportunity{}, "OpportunityId")
	resources.Registry().Register(&crm.CrmOpportunityList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppStage{}, "StageId")
	resources.Registry().Register(&crm.CrmOppStageList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppCompetitor{}, "CompetitorId")
	resources.Registry().Register(&crm.CrmOppCompetitorList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppProduct{}, "LineId")
	resources.Registry().Register(&crm.CrmOppProductList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppTeam{}, "MemberId")
	resources.Registry().Register(&crm.CrmOppTeamList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppActivity{}, "ActivityId")
	resources.Registry().Register(&crm.CrmOppActivityList{})

	// Account Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmAccount{}, "AccountId")
	resources.Registry().Register(&crm.CrmAccountList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmContact{}, "ContactId")
	resources.Registry().Register(&crm.CrmContactList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmInteraction{}, "InteractionId")
	resources.Registry().Register(&crm.CrmInteractionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmRelationship{}, "RelationshipId")
	resources.Registry().Register(&crm.CrmRelationshipList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmHealthScore{}, "ScoreId")
	resources.Registry().Register(&crm.CrmHealthScoreList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmAccountPlan{}, "PlanId")
	resources.Registry().Register(&crm.CrmAccountPlanList{})

	// Marketing
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCampaign{}, "CampaignId")
	resources.Registry().Register(&crm.CrmCampaignList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCampaignMember{}, "MemberId")
	resources.Registry().Register(&crm.CrmCampaignMemberList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmEmailTemplate{}, "TemplateId")
	resources.Registry().Register(&crm.CrmEmailTemplateList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmMarketingList{}, "ListId")
	resources.Registry().Register(&crm.CrmMarketingListList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCampaignResponse{}, "ResponseId")
	resources.Registry().Register(&crm.CrmCampaignResponseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCampaignROI{}, "RoiId")
	resources.Registry().Register(&crm.CrmCampaignROIList{})

	// Customer Service
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCase{}, "CaseId")
	resources.Registry().Register(&crm.CrmCaseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCaseComment{}, "CommentId")
	resources.Registry().Register(&crm.CrmCaseCommentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmKBArticle{}, "ArticleId")
	resources.Registry().Register(&crm.CrmKBArticleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmSLA{}, "SlaId")
	resources.Registry().Register(&crm.CrmSLAList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmEscalation{}, "EscalationId")
	resources.Registry().Register(&crm.CrmEscalationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmSurvey{}, "SurveyId")
	resources.Registry().Register(&crm.CrmSurveyList{})

	// Field Service
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServiceOrder{}, "OrderId")
	resources.Registry().Register(&crm.CrmServiceOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmTechnician{}, "TechnicianId")
	resources.Registry().Register(&crm.CrmTechnicianList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServiceContract{}, "ContractId")
	resources.Registry().Register(&crm.CrmServiceContractList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServiceSchedule{}, "ScheduleId")
	resources.Registry().Register(&crm.CrmServiceScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServicePart{}, "PartId")
	resources.Registry().Register(&crm.CrmServicePartList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServiceVisit{}, "VisitId")
	resources.Registry().Register(&crm.CrmServiceVisitList{})
}
