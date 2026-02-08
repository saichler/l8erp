package tests

import (
	"github.com/saichler/l8erp/go/erp/crm/accountplans"
	"github.com/saichler/l8erp/go/erp/crm/accounts"
	"github.com/saichler/l8erp/go/erp/crm/campaignmembers"
	"github.com/saichler/l8erp/go/erp/crm/campaignresponses"
	"github.com/saichler/l8erp/go/erp/crm/campaignrois"
	"github.com/saichler/l8erp/go/erp/crm/campaigns"
	"github.com/saichler/l8erp/go/erp/crm/casecomments"
	"github.com/saichler/l8erp/go/erp/crm/cases"
	"github.com/saichler/l8erp/go/erp/crm/contacts"
	"github.com/saichler/l8erp/go/erp/crm/emailtemplates"
	"github.com/saichler/l8erp/go/erp/crm/escalations"
	"github.com/saichler/l8erp/go/erp/crm/healthscores"
	"github.com/saichler/l8erp/go/erp/crm/interactions"
	"github.com/saichler/l8erp/go/erp/crm/kbarticles"
	"github.com/saichler/l8erp/go/erp/crm/leadactivities"
	"github.com/saichler/l8erp/go/erp/crm/leadassigns"
	"github.com/saichler/l8erp/go/erp/crm/leadconversions"
	"github.com/saichler/l8erp/go/erp/crm/leadscores"
	"github.com/saichler/l8erp/go/erp/crm/leads"
	"github.com/saichler/l8erp/go/erp/crm/leadsources"
	"github.com/saichler/l8erp/go/erp/crm/marketinglists"
	"github.com/saichler/l8erp/go/erp/crm/oppactivities"
	"github.com/saichler/l8erp/go/erp/crm/oppcompetitors"
	"github.com/saichler/l8erp/go/erp/crm/opportunities"
	"github.com/saichler/l8erp/go/erp/crm/oppproducts"
	"github.com/saichler/l8erp/go/erp/crm/oppstages"
	"github.com/saichler/l8erp/go/erp/crm/oppteams"
	"github.com/saichler/l8erp/go/erp/crm/relationships"
	"github.com/saichler/l8erp/go/erp/crm/servicecontracts"
	"github.com/saichler/l8erp/go/erp/crm/serviceorders"
	"github.com/saichler/l8erp/go/erp/crm/serviceparts"
	"github.com/saichler/l8erp/go/erp/crm/serviceschedules"
	"github.com/saichler/l8erp/go/erp/crm/servicevisits"
	"github.com/saichler/l8erp/go/erp/crm/slas"
	"github.com/saichler/l8erp/go/erp/crm/surveys"
	"github.com/saichler/l8erp/go/erp/crm/technicians"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersCRM(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := accountplans.CrmAccountPlan("test-id", vnic); err != nil {
		log.Fail(t, "CrmAccountPlan getter failed: ", err.Error())
	}
	if _, err := accounts.CrmAccount("test-id", vnic); err != nil {
		log.Fail(t, "CrmAccount getter failed: ", err.Error())
	}
	if _, err := campaignmembers.CrmCampaignMember("test-id", vnic); err != nil {
		log.Fail(t, "CrmCampaignMember getter failed: ", err.Error())
	}
	if _, err := campaignresponses.CrmCampaignResponse("test-id", vnic); err != nil {
		log.Fail(t, "CrmCampaignResponse getter failed: ", err.Error())
	}
	if _, err := campaignrois.CrmCampaignROI("test-id", vnic); err != nil {
		log.Fail(t, "CrmCampaignROI getter failed: ", err.Error())
	}
	if _, err := campaigns.CrmCampaign("test-id", vnic); err != nil {
		log.Fail(t, "CrmCampaign getter failed: ", err.Error())
	}
	if _, err := casecomments.CrmCaseComment("test-id", vnic); err != nil {
		log.Fail(t, "CrmCaseComment getter failed: ", err.Error())
	}
	if _, err := cases.CrmCase("test-id", vnic); err != nil {
		log.Fail(t, "CrmCase getter failed: ", err.Error())
	}
	if _, err := contacts.CrmContact("test-id", vnic); err != nil {
		log.Fail(t, "CrmContact getter failed: ", err.Error())
	}
	if _, err := emailtemplates.CrmEmailTemplate("test-id", vnic); err != nil {
		log.Fail(t, "CrmEmailTemplate getter failed: ", err.Error())
	}
	if _, err := escalations.CrmEscalation("test-id", vnic); err != nil {
		log.Fail(t, "CrmEscalation getter failed: ", err.Error())
	}
	if _, err := healthscores.CrmHealthScore("test-id", vnic); err != nil {
		log.Fail(t, "CrmHealthScore getter failed: ", err.Error())
	}
	if _, err := interactions.CrmInteraction("test-id", vnic); err != nil {
		log.Fail(t, "CrmInteraction getter failed: ", err.Error())
	}
	if _, err := kbarticles.CrmKBArticle("test-id", vnic); err != nil {
		log.Fail(t, "CrmKBArticle getter failed: ", err.Error())
	}
	if _, err := leadactivities.CrmLeadActivity("test-id", vnic); err != nil {
		log.Fail(t, "CrmLeadActivity getter failed: ", err.Error())
	}
	if _, err := leadassigns.CrmLeadAssign("test-id", vnic); err != nil {
		log.Fail(t, "CrmLeadAssign getter failed: ", err.Error())
	}
	if _, err := leadconversions.CrmLeadConversion("test-id", vnic); err != nil {
		log.Fail(t, "CrmLeadConversion getter failed: ", err.Error())
	}
	if _, err := leadscores.CrmLeadScore("test-id", vnic); err != nil {
		log.Fail(t, "CrmLeadScore getter failed: ", err.Error())
	}
	if _, err := leads.CrmLead("test-id", vnic); err != nil {
		log.Fail(t, "CrmLead getter failed: ", err.Error())
	}
	if _, err := leadsources.CrmLeadSource("test-id", vnic); err != nil {
		log.Fail(t, "CrmLeadSource getter failed: ", err.Error())
	}
	if _, err := marketinglists.CrmMarketingList("test-id", vnic); err != nil {
		log.Fail(t, "CrmMarketingList getter failed: ", err.Error())
	}
	if _, err := oppactivities.CrmOppActivity("test-id", vnic); err != nil {
		log.Fail(t, "CrmOppActivity getter failed: ", err.Error())
	}
	if _, err := oppcompetitors.CrmOppCompetitor("test-id", vnic); err != nil {
		log.Fail(t, "CrmOppCompetitor getter failed: ", err.Error())
	}
	if _, err := opportunities.CrmOpportunity("test-id", vnic); err != nil {
		log.Fail(t, "CrmOpportunity getter failed: ", err.Error())
	}
	if _, err := oppproducts.CrmOppProduct("test-id", vnic); err != nil {
		log.Fail(t, "CrmOppProduct getter failed: ", err.Error())
	}
	if _, err := oppstages.CrmOppStage("test-id", vnic); err != nil {
		log.Fail(t, "CrmOppStage getter failed: ", err.Error())
	}
	if _, err := oppteams.CrmOppTeam("test-id", vnic); err != nil {
		log.Fail(t, "CrmOppTeam getter failed: ", err.Error())
	}
	if _, err := relationships.CrmRelationship("test-id", vnic); err != nil {
		log.Fail(t, "CrmRelationship getter failed: ", err.Error())
	}
	if _, err := servicecontracts.CrmServiceContract("test-id", vnic); err != nil {
		log.Fail(t, "CrmServiceContract getter failed: ", err.Error())
	}
	if _, err := serviceorders.CrmServiceOrder("test-id", vnic); err != nil {
		log.Fail(t, "CrmServiceOrder getter failed: ", err.Error())
	}
	if _, err := serviceparts.CrmServicePart("test-id", vnic); err != nil {
		log.Fail(t, "CrmServicePart getter failed: ", err.Error())
	}
	if _, err := serviceschedules.CrmServiceSchedule("test-id", vnic); err != nil {
		log.Fail(t, "CrmServiceSchedule getter failed: ", err.Error())
	}
	if _, err := servicevisits.CrmServiceVisit("test-id", vnic); err != nil {
		log.Fail(t, "CrmServiceVisit getter failed: ", err.Error())
	}
	if _, err := slas.CrmSLA("test-id", vnic); err != nil {
		log.Fail(t, "CrmSLA getter failed: ", err.Error())
	}
	if _, err := surveys.CrmSurvey("test-id", vnic); err != nil {
		log.Fail(t, "CrmSurvey getter failed: ", err.Error())
	}
	if _, err := technicians.CrmTechnician("test-id", vnic); err != nil {
		log.Fail(t, "CrmTechnician getter failed: ", err.Error())
	}
}
