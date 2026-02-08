/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
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

func ActivateCrmServices(creds, dbname string, nic ifs.IVNic) {
	// Lead Management
	leads.Activate(creds, dbname, nic)
	leadsources.Activate(creds, dbname, nic)
	leadscores.Activate(creds, dbname, nic)
	leadactivities.Activate(creds, dbname, nic)
	leadassigns.Activate(creds, dbname, nic)
	leadconversions.Activate(creds, dbname, nic)
	// Opportunity Management
	opportunities.Activate(creds, dbname, nic)
	oppstages.Activate(creds, dbname, nic)
	oppcompetitors.Activate(creds, dbname, nic)
	oppproducts.Activate(creds, dbname, nic)
	oppteams.Activate(creds, dbname, nic)
	oppactivities.Activate(creds, dbname, nic)
	// Account Management
	accounts.Activate(creds, dbname, nic)
	contacts.Activate(creds, dbname, nic)
	interactions.Activate(creds, dbname, nic)
	relationships.Activate(creds, dbname, nic)
	healthscores.Activate(creds, dbname, nic)
	accountplans.Activate(creds, dbname, nic)
	// Marketing
	campaigns.Activate(creds, dbname, nic)
	campaignmembers.Activate(creds, dbname, nic)
	emailtemplates.Activate(creds, dbname, nic)
	marketinglists.Activate(creds, dbname, nic)
	campaignresponses.Activate(creds, dbname, nic)
	campaignrois.Activate(creds, dbname, nic)
	// Customer Service
	cases.Activate(creds, dbname, nic)
	casecomments.Activate(creds, dbname, nic)
	kbarticles.Activate(creds, dbname, nic)
	slas.Activate(creds, dbname, nic)
	escalations.Activate(creds, dbname, nic)
	surveys.Activate(creds, dbname, nic)
	// Field Service
	serviceorders.Activate(creds, dbname, nic)
	technicians.Activate(creds, dbname, nic)
	servicecontracts.Activate(creds, dbname, nic)
	serviceschedules.Activate(creds, dbname, nic)
	serviceparts.Activate(creds, dbname, nic)
	servicevisits.Activate(creds, dbname, nic)
}
