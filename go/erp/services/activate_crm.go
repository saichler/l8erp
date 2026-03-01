/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
	"github.com/saichler/l8types/go/ifs"
	// Lead Management
	"github.com/saichler/l8erp/go/erp/crm/leadassigns"
	"github.com/saichler/l8erp/go/erp/crm/leads"
	"github.com/saichler/l8erp/go/erp/crm/leadscores"
	"github.com/saichler/l8erp/go/erp/crm/leadsources"
	// Opportunity Management
	"github.com/saichler/l8erp/go/erp/crm/opportunities"
	"github.com/saichler/l8erp/go/erp/crm/oppstages"
	// Account Management
	"github.com/saichler/l8erp/go/erp/crm/accounts"
	"github.com/saichler/l8erp/go/erp/crm/contacts"
	"github.com/saichler/l8erp/go/erp/crm/interactions"
	"github.com/saichler/l8erp/go/erp/crm/relationships"
	// Marketing
	"github.com/saichler/l8erp/go/erp/crm/campaigns"
	"github.com/saichler/l8erp/go/erp/crm/emailtemplates"
	"github.com/saichler/l8erp/go/erp/crm/marketinglists"
	// Customer Service
	"github.com/saichler/l8erp/go/erp/crm/cases"
	"github.com/saichler/l8erp/go/erp/crm/escalations"
	"github.com/saichler/l8erp/go/erp/crm/kbarticles"
	"github.com/saichler/l8erp/go/erp/crm/slas"
	"github.com/saichler/l8erp/go/erp/crm/surveys"
	// Field Service
	"github.com/saichler/l8erp/go/erp/crm/servicecontracts"
	"github.com/saichler/l8erp/go/erp/crm/serviceorders"
	"github.com/saichler/l8erp/go/erp/crm/serviceschedules"
	"github.com/saichler/l8erp/go/erp/crm/technicians"
)

func collectCrmActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Lead Management
		func() { leads.Activate(creds, dbname, nic) },
		func() { leadsources.Activate(creds, dbname, nic) },
		func() { leadscores.Activate(creds, dbname, nic) },
		func() { leadassigns.Activate(creds, dbname, nic) },
		// Opportunity Management
		func() { opportunities.Activate(creds, dbname, nic) },
		func() { oppstages.Activate(creds, dbname, nic) },
		// Account Management
		func() { accounts.Activate(creds, dbname, nic) },
		func() { contacts.Activate(creds, dbname, nic) },
		func() { interactions.Activate(creds, dbname, nic) },
		func() { relationships.Activate(creds, dbname, nic) },
		// Marketing
		func() { campaigns.Activate(creds, dbname, nic) },
		func() { emailtemplates.Activate(creds, dbname, nic) },
		func() { marketinglists.Activate(creds, dbname, nic) },
		// Customer Service
		func() { cases.Activate(creds, dbname, nic) },
		func() { kbarticles.Activate(creds, dbname, nic) },
		func() { slas.Activate(creds, dbname, nic) },
		func() { escalations.Activate(creds, dbname, nic) },
		func() { surveys.Activate(creds, dbname, nic) },
		// Field Service
		func() { serviceorders.Activate(creds, dbname, nic) },
		func() { technicians.Activate(creds, dbname, nic) },
		func() { servicecontracts.Activate(creds, dbname, nic) },
		func() { serviceschedules.Activate(creds, dbname, nic) },
	}
}
