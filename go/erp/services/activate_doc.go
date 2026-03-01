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

func collectDocActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Storage
		func() { documents.Activate(creds, dbname, nic) },
		func() { folders.Activate(creds, dbname, nic) },
		func() { categories.Activate(creds, dbname, nic) },
		func() { tags.Activate(creds, dbname, nic) },
		// Workflow
		func() { approvalworkflows.Activate(creds, dbname, nic) },
		// Integration
		func() { templates.Activate(creds, dbname, nic) },
		func() { emailcaptures.Activate(creds, dbname, nic) },
		func() { scanjobs.Activate(creds, dbname, nic) },
		// Compliance
		func() { retentionpolicies.Activate(creds, dbname, nic) },
		func() { legalholds.Activate(creds, dbname, nic) },
		func() { archivejobs.Activate(creds, dbname, nic) },
	}
}
