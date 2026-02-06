/*
 * DOC (Documents) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
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

func activateDocServices(nic ifs.IVNic) {
	// Storage
	documents.Activate(common.DB_CREDS, common.DB_NAME, nic)
	folders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	categories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	tags.Activate(common.DB_CREDS, common.DB_NAME, nic)
	versions.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Workflow
	checkouts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	approvalworkflows.Activate(common.DB_CREDS, common.DB_NAME, nic)
	workflowsteps.Activate(common.DB_CREDS, common.DB_NAME, nic)
	signatures.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reviewcomments.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Integration
	attachments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	templates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	templatefields.Activate(common.DB_CREDS, common.DB_NAME, nic)
	emailcaptures.Activate(common.DB_CREDS, common.DB_NAME, nic)
	scanjobs.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Compliance
	retentionpolicies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	legalholds.Activate(common.DB_CREDS, common.DB_NAME, nic)
	accesslogs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	archivejobs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	audittrails.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
