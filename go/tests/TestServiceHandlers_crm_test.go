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

func testServiceHandlersCRM(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := accounts.CrmAccounts(vnic); !ok || h == nil {
		log.Fail(t, "CrmAccount service handler not found")
	}
	if h, ok := campaigns.CrmCampaigns(vnic); !ok || h == nil {
		log.Fail(t, "CrmCampaign service handler not found")
	}
	if h, ok := cases.CrmCases(vnic); !ok || h == nil {
		log.Fail(t, "CrmCase service handler not found")
	}
	if h, ok := contacts.CrmContacts(vnic); !ok || h == nil {
		log.Fail(t, "CrmContact service handler not found")
	}
	if h, ok := emailtemplates.CrmEmailTemplates(vnic); !ok || h == nil {
		log.Fail(t, "CrmEmailTemplate service handler not found")
	}
	if h, ok := escalations.CrmEscalations(vnic); !ok || h == nil {
		log.Fail(t, "CrmEscalation service handler not found")
	}
	if h, ok := interactions.CrmInteractions(vnic); !ok || h == nil {
		log.Fail(t, "CrmInteraction service handler not found")
	}
	if h, ok := kbarticles.CrmKBArticles(vnic); !ok || h == nil {
		log.Fail(t, "CrmKBArticle service handler not found")
	}
	if h, ok := leadassigns.CrmLeadAssigns(vnic); !ok || h == nil {
		log.Fail(t, "CrmLeadAssign service handler not found")
	}
	if h, ok := leadscores.CrmLeadScores(vnic); !ok || h == nil {
		log.Fail(t, "CrmLeadScore service handler not found")
	}
	if h, ok := leads.CrmLeads(vnic); !ok || h == nil {
		log.Fail(t, "CrmLead service handler not found")
	}
	if h, ok := leadsources.CrmLeadSources(vnic); !ok || h == nil {
		log.Fail(t, "CrmLeadSource service handler not found")
	}
	if h, ok := marketinglists.CrmMarketingLists(vnic); !ok || h == nil {
		log.Fail(t, "CrmMarketingList service handler not found")
	}
	if h, ok := opportunities.CrmOpportunities(vnic); !ok || h == nil {
		log.Fail(t, "CrmOpportunity service handler not found")
	}
	if h, ok := oppstages.CrmOppStages(vnic); !ok || h == nil {
		log.Fail(t, "CrmOppStage service handler not found")
	}
	if h, ok := relationships.CrmRelationships(vnic); !ok || h == nil {
		log.Fail(t, "CrmRelationship service handler not found")
	}
	if h, ok := servicecontracts.CrmServiceContracts(vnic); !ok || h == nil {
		log.Fail(t, "CrmServiceContract service handler not found")
	}
	if h, ok := serviceorders.CrmServiceOrders(vnic); !ok || h == nil {
		log.Fail(t, "CrmServiceOrder service handler not found")
	}
	if h, ok := serviceschedules.CrmServiceSchedules(vnic); !ok || h == nil {
		log.Fail(t, "CrmServiceSchedule service handler not found")
	}
	if h, ok := slas.CrmSLAs(vnic); !ok || h == nil {
		log.Fail(t, "CrmSLA service handler not found")
	}
	if h, ok := surveys.CrmSurveys(vnic); !ok || h == nil {
		log.Fail(t, "CrmSurvey service handler not found")
	}
	if h, ok := technicians.CrmTechnicians(vnic); !ok || h == nil {
		log.Fail(t, "CrmTechnician service handler not found")
	}
}
