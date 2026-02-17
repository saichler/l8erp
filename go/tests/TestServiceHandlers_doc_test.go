package tests

import (
	"github.com/saichler/l8erp/go/erp/doc/approvalworkflows"
	"github.com/saichler/l8erp/go/erp/doc/archivejobs"
	"github.com/saichler/l8erp/go/erp/doc/categories"
	"github.com/saichler/l8erp/go/erp/doc/documents"
	"github.com/saichler/l8erp/go/erp/doc/emailcaptures"
	"github.com/saichler/l8erp/go/erp/doc/folders"
	"github.com/saichler/l8erp/go/erp/doc/legalholds"
	"github.com/saichler/l8erp/go/erp/doc/retentionpolicies"
	"github.com/saichler/l8erp/go/erp/doc/scanjobs"
	"github.com/saichler/l8erp/go/erp/doc/tags"
	"github.com/saichler/l8erp/go/erp/doc/templates"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersDOC(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := approvalworkflows.DocApprovalWorkflows(vnic); !ok || h == nil {
		log.Fail(t, "DocApprovalWorkflow service handler not found")
	}
	if h, ok := archivejobs.DocArchiveJobs(vnic); !ok || h == nil {
		log.Fail(t, "DocArchiveJob service handler not found")
	}
	if h, ok := categories.DocCategories(vnic); !ok || h == nil {
		log.Fail(t, "DocCategory service handler not found")
	}
	if h, ok := documents.DocDocuments(vnic); !ok || h == nil {
		log.Fail(t, "DocDocument service handler not found")
	}
	if h, ok := emailcaptures.DocEmailCaptures(vnic); !ok || h == nil {
		log.Fail(t, "DocEmailCapture service handler not found")
	}
	if h, ok := folders.DocFolders(vnic); !ok || h == nil {
		log.Fail(t, "DocFolder service handler not found")
	}
	if h, ok := legalholds.DocLegalHolds(vnic); !ok || h == nil {
		log.Fail(t, "DocLegalHold service handler not found")
	}
	if h, ok := retentionpolicies.DocRetentionPolicies(vnic); !ok || h == nil {
		log.Fail(t, "DocRetentionPolicy service handler not found")
	}
	if h, ok := scanjobs.DocScanJobs(vnic); !ok || h == nil {
		log.Fail(t, "DocScanJob service handler not found")
	}
	if h, ok := tags.DocTags(vnic); !ok || h == nil {
		log.Fail(t, "DocTag service handler not found")
	}
	if h, ok := templates.DocTemplates(vnic); !ok || h == nil {
		log.Fail(t, "DocTemplate service handler not found")
	}
}
