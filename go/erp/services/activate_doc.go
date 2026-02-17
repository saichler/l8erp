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

	// Workflow
	"github.com/saichler/l8erp/go/erp/doc/approvalworkflows"

	// Integration
	"github.com/saichler/l8erp/go/erp/doc/emailcaptures"
	"github.com/saichler/l8erp/go/erp/doc/scanjobs"
	"github.com/saichler/l8erp/go/erp/doc/templates"

	// Compliance
	"github.com/saichler/l8erp/go/erp/doc/archivejobs"
	"github.com/saichler/l8erp/go/erp/doc/legalholds"
	"github.com/saichler/l8erp/go/erp/doc/retentionpolicies"
)

func ActivateDocServices(creds, dbname string, nic ifs.IVNic) {
	// Storage
	documents.Activate(creds, dbname, nic)
	folders.Activate(creds, dbname, nic)
	categories.Activate(creds, dbname, nic)
	tags.Activate(creds, dbname, nic)

	// Workflow
	approvalworkflows.Activate(creds, dbname, nic)

	// Integration
	templates.Activate(creds, dbname, nic)
	emailcaptures.Activate(creds, dbname, nic)
	scanjobs.Activate(creds, dbname, nic)

	// Compliance
	retentionpolicies.Activate(creds, dbname, nic)
	legalholds.Activate(creds, dbname, nic)
	archivejobs.Activate(creds, dbname, nic)
}
