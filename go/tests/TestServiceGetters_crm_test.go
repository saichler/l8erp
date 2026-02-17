package tests

import (
	"github.com/saichler/l8erp/go/erp/crm/accounts"
	"github.com/saichler/l8erp/go/erp/crm/campaigns"
	"github.com/saichler/l8erp/go/erp/crm/cases"
	"github.com/saichler/l8erp/go/erp/crm/contacts"
	"github.com/saichler/l8erp/go/erp/crm/emailtemplates"
	"github.com/saichler/l8erp/go/erp/crm/escalations"
	"github.com/saichler/l8erp/go/erp/crm/interactions"
	"github.com/saichler/l8erp/go/erp/crm/kbarticles"
	"github.com/saichler/l8erp/go/erp/crm/leadassigns"
	"github.com/saichler/l8erp/go/erp/crm/leads"
	"github.com/saichler/l8erp/go/erp/crm/leadscores"
	"github.com/saichler/l8erp/go/erp/crm/leadsources"
	"github.com/saichler/l8erp/go/erp/crm/marketinglists"
	"github.com/saichler/l8erp/go/erp/crm/opportunities"
	"github.com/saichler/l8erp/go/erp/crm/oppstages"
	"github.com/saichler/l8erp/go/erp/crm/relationships"
	"github.com/saichler/l8erp/go/erp/crm/servicecontracts"
	"github.com/saichler/l8erp/go/erp/crm/serviceorders"
	"github.com/saichler/l8erp/go/erp/crm/serviceschedules"
	"github.com/saichler/l8erp/go/erp/crm/slas"
	"github.com/saichler/l8erp/go/erp/crm/surveys"
	"github.com/saichler/l8erp/go/erp/crm/technicians"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersCRM(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := accounts.CrmAccount("test-id", vnic); err != nil {
		log.Fail(t, "CrmAccount getter failed: ", err.Error())
	}
	if _, err := campaigns.CrmCampaign("test-id", vnic); err != nil {
		log.Fail(t, "CrmCampaign getter failed: ", err.Error())
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
	if _, err := interactions.CrmInteraction("test-id", vnic); err != nil {
		log.Fail(t, "CrmInteraction getter failed: ", err.Error())
	}
	if _, err := kbarticles.CrmKBArticle("test-id", vnic); err != nil {
		log.Fail(t, "CrmKBArticle getter failed: ", err.Error())
	}
	if _, err := leadassigns.CrmLeadAssign("test-id", vnic); err != nil {
		log.Fail(t, "CrmLeadAssign getter failed: ", err.Error())
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
	if _, err := opportunities.CrmOpportunity("test-id", vnic); err != nil {
		log.Fail(t, "CrmOpportunity getter failed: ", err.Error())
	}
	if _, err := oppstages.CrmOppStage("test-id", vnic); err != nil {
		log.Fail(t, "CrmOppStage getter failed: ", err.Error())
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
	if _, err := serviceschedules.CrmServiceSchedule("test-id", vnic); err != nil {
		log.Fail(t, "CrmServiceSchedule getter failed: ", err.Error())
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
