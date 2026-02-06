/*
 * CRM (Customer Relationship Management) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"

	// Lead Management
	"github.com/saichler/l8erp/go/erp/crm/leadactivities"
	"github.com/saichler/l8erp/go/erp/crm/leadassigns"
	"github.com/saichler/l8erp/go/erp/crm/leadconversions"
	"github.com/saichler/l8erp/go/erp/crm/leads"
	"github.com/saichler/l8erp/go/erp/crm/leadscores"
	"github.com/saichler/l8erp/go/erp/crm/leadsources"

	// Opportunity Management
	"github.com/saichler/l8erp/go/erp/crm/oppactivities"
	"github.com/saichler/l8erp/go/erp/crm/oppcompetitors"
	"github.com/saichler/l8erp/go/erp/crm/opportunities"
	"github.com/saichler/l8erp/go/erp/crm/oppproducts"
	"github.com/saichler/l8erp/go/erp/crm/oppstages"
	"github.com/saichler/l8erp/go/erp/crm/oppteams"

	// Account Management
	"github.com/saichler/l8erp/go/erp/crm/accountplans"
	"github.com/saichler/l8erp/go/erp/crm/accounts"
	"github.com/saichler/l8erp/go/erp/crm/contacts"
	"github.com/saichler/l8erp/go/erp/crm/healthscores"
	"github.com/saichler/l8erp/go/erp/crm/interactions"
	"github.com/saichler/l8erp/go/erp/crm/relationships"

	// Marketing
	"github.com/saichler/l8erp/go/erp/crm/campaignmembers"
	"github.com/saichler/l8erp/go/erp/crm/campaignresponses"
	"github.com/saichler/l8erp/go/erp/crm/campaignrois"
	"github.com/saichler/l8erp/go/erp/crm/campaigns"
	"github.com/saichler/l8erp/go/erp/crm/emailtemplates"
	"github.com/saichler/l8erp/go/erp/crm/marketinglists"

	// Customer Service
	"github.com/saichler/l8erp/go/erp/crm/casecomments"
	"github.com/saichler/l8erp/go/erp/crm/cases"
	"github.com/saichler/l8erp/go/erp/crm/escalations"
	"github.com/saichler/l8erp/go/erp/crm/kbarticles"
	"github.com/saichler/l8erp/go/erp/crm/slas"
	"github.com/saichler/l8erp/go/erp/crm/surveys"

	// Field Service
	"github.com/saichler/l8erp/go/erp/crm/servicecontracts"
	"github.com/saichler/l8erp/go/erp/crm/serviceorders"
	"github.com/saichler/l8erp/go/erp/crm/serviceparts"
	"github.com/saichler/l8erp/go/erp/crm/serviceschedules"
	"github.com/saichler/l8erp/go/erp/crm/servicevisits"
	"github.com/saichler/l8erp/go/erp/crm/technicians"
)

func activateCrmServices(nic ifs.IVNic) {
	// Lead Management
	leads.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadsources.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadscores.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadactivities.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadassigns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadconversions.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Opportunity Management
	opportunities.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppstages.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppcompetitors.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppproducts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppteams.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppactivities.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Account Management
	accounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	contacts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	interactions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	relationships.Activate(common.DB_CREDS, common.DB_NAME, nic)
	healthscores.Activate(common.DB_CREDS, common.DB_NAME, nic)
	accountplans.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Marketing
	campaigns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	campaignmembers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	emailtemplates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	marketinglists.Activate(common.DB_CREDS, common.DB_NAME, nic)
	campaignresponses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	campaignrois.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Customer Service
	cases.Activate(common.DB_CREDS, common.DB_NAME, nic)
	casecomments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	kbarticles.Activate(common.DB_CREDS, common.DB_NAME, nic)
	slas.Activate(common.DB_CREDS, common.DB_NAME, nic)
	escalations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	surveys.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Field Service
	serviceorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	technicians.Activate(common.DB_CREDS, common.DB_NAME, nic)
	servicecontracts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	serviceschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	serviceparts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	servicevisits.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
