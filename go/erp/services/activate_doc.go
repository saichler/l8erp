/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"github.com/saichler/l8types/go/ifs"

	// Storage
	"github.com/saichler/l8erp/go/erp/doc/categories"
	"github.com/saichler/l8erp/go/erp/doc/documents"
	"github.com/saichler/l8erp/go/erp/doc/folders"
	"github.com/saichler/l8erp/go/erp/doc/tags"
	"github.com/saichler/l8erp/go/erp/doc/versions"

	// Workflow
	"github.com/saichler/l8erp/go/erp/doc/approvalworkflows"
	"github.com/saichler/l8erp/go/erp/doc/checkouts"
	"github.com/saichler/l8erp/go/erp/doc/reviewcomments"
	"github.com/saichler/l8erp/go/erp/doc/signatures"
	"github.com/saichler/l8erp/go/erp/doc/workflowsteps"

	// Integration
	"github.com/saichler/l8erp/go/erp/doc/attachments"
	"github.com/saichler/l8erp/go/erp/doc/emailcaptures"
	"github.com/saichler/l8erp/go/erp/doc/scanjobs"
	"github.com/saichler/l8erp/go/erp/doc/templatefields"
	"github.com/saichler/l8erp/go/erp/doc/templates"

	// Compliance
	"github.com/saichler/l8erp/go/erp/doc/accesslogs"
	"github.com/saichler/l8erp/go/erp/doc/archivejobs"
	"github.com/saichler/l8erp/go/erp/doc/audittrails"
	"github.com/saichler/l8erp/go/erp/doc/legalholds"
	"github.com/saichler/l8erp/go/erp/doc/retentionpolicies"
)

func ActivateDocServices(creds, dbname string, nic ifs.IVNic) {
	// Storage
	documents.Activate(creds, dbname, nic)
	folders.Activate(creds, dbname, nic)
	categories.Activate(creds, dbname, nic)
	tags.Activate(creds, dbname, nic)
	versions.Activate(creds, dbname, nic)

	// Workflow
	checkouts.Activate(creds, dbname, nic)
	approvalworkflows.Activate(creds, dbname, nic)
	workflowsteps.Activate(creds, dbname, nic)
	signatures.Activate(creds, dbname, nic)
	reviewcomments.Activate(creds, dbname, nic)

	// Integration
	attachments.Activate(creds, dbname, nic)
	templates.Activate(creds, dbname, nic)
	templatefields.Activate(creds, dbname, nic)
	emailcaptures.Activate(creds, dbname, nic)
	scanjobs.Activate(creds, dbname, nic)

	// Compliance
	retentionpolicies.Activate(creds, dbname, nic)
	legalholds.Activate(creds, dbname, nic)
	accesslogs.Activate(creds, dbname, nic)
	archivejobs.Activate(creds, dbname, nic)
	audittrails.Activate(creds, dbname, nic)
}
