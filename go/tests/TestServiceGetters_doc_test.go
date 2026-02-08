package tests

import (
	"github.com/saichler/l8erp/go/erp/doc/accesslogs"
	"github.com/saichler/l8erp/go/erp/doc/approvalworkflows"
	"github.com/saichler/l8erp/go/erp/doc/archivejobs"
	"github.com/saichler/l8erp/go/erp/doc/attachments"
	"github.com/saichler/l8erp/go/erp/doc/audittrails"
	"github.com/saichler/l8erp/go/erp/doc/categories"
	"github.com/saichler/l8erp/go/erp/doc/checkouts"
	"github.com/saichler/l8erp/go/erp/doc/documents"
	"github.com/saichler/l8erp/go/erp/doc/emailcaptures"
	"github.com/saichler/l8erp/go/erp/doc/folders"
	"github.com/saichler/l8erp/go/erp/doc/legalholds"
	"github.com/saichler/l8erp/go/erp/doc/retentionpolicies"
	"github.com/saichler/l8erp/go/erp/doc/reviewcomments"
	"github.com/saichler/l8erp/go/erp/doc/scanjobs"
	"github.com/saichler/l8erp/go/erp/doc/signatures"
	"github.com/saichler/l8erp/go/erp/doc/tags"
	"github.com/saichler/l8erp/go/erp/doc/templatefields"
	"github.com/saichler/l8erp/go/erp/doc/templates"
	"github.com/saichler/l8erp/go/erp/doc/versions"
	"github.com/saichler/l8erp/go/erp/doc/workflowsteps"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersDOC(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := accesslogs.DocAccessLog("test-id", vnic); err != nil {
		log.Fail(t, "DocAccessLog getter failed: ", err.Error())
	}
	if _, err := approvalworkflows.DocApprovalWorkflow("test-id", vnic); err != nil {
		log.Fail(t, "DocApprovalWorkflow getter failed: ", err.Error())
	}
	if _, err := archivejobs.DocArchiveJob("test-id", vnic); err != nil {
		log.Fail(t, "DocArchiveJob getter failed: ", err.Error())
	}
	if _, err := attachments.DocAttachment("test-id", vnic); err != nil {
		log.Fail(t, "DocAttachment getter failed: ", err.Error())
	}
	if _, err := audittrails.DocAuditTrail("test-id", vnic); err != nil {
		log.Fail(t, "DocAuditTrail getter failed: ", err.Error())
	}
	if _, err := categories.DocCategory("test-id", vnic); err != nil {
		log.Fail(t, "DocCategory getter failed: ", err.Error())
	}
	if _, err := checkouts.DocCheckout("test-id", vnic); err != nil {
		log.Fail(t, "DocCheckout getter failed: ", err.Error())
	}
	if _, err := documents.DocDocument("test-id", vnic); err != nil {
		log.Fail(t, "DocDocument getter failed: ", err.Error())
	}
	if _, err := emailcaptures.DocEmailCapture("test-id", vnic); err != nil {
		log.Fail(t, "DocEmailCapture getter failed: ", err.Error())
	}
	if _, err := folders.DocFolder("test-id", vnic); err != nil {
		log.Fail(t, "DocFolder getter failed: ", err.Error())
	}
	if _, err := legalholds.DocLegalHold("test-id", vnic); err != nil {
		log.Fail(t, "DocLegalHold getter failed: ", err.Error())
	}
	if _, err := retentionpolicies.DocRetentionPolicy("test-id", vnic); err != nil {
		log.Fail(t, "DocRetentionPolicy getter failed: ", err.Error())
	}
	if _, err := reviewcomments.DocReviewComment("test-id", vnic); err != nil {
		log.Fail(t, "DocReviewComment getter failed: ", err.Error())
	}
	if _, err := scanjobs.DocScanJob("test-id", vnic); err != nil {
		log.Fail(t, "DocScanJob getter failed: ", err.Error())
	}
	if _, err := signatures.DocSignature("test-id", vnic); err != nil {
		log.Fail(t, "DocSignature getter failed: ", err.Error())
	}
	if _, err := tags.DocTag("test-id", vnic); err != nil {
		log.Fail(t, "DocTag getter failed: ", err.Error())
	}
	if _, err := templatefields.DocTemplateField("test-id", vnic); err != nil {
		log.Fail(t, "DocTemplateField getter failed: ", err.Error())
	}
	if _, err := templates.DocTemplate("test-id", vnic); err != nil {
		log.Fail(t, "DocTemplate getter failed: ", err.Error())
	}
	if _, err := versions.DocDocumentVersion("test-id", vnic); err != nil {
		log.Fail(t, "DocDocumentVersion getter failed: ", err.Error())
	}
	if _, err := workflowsteps.DocWorkflowStep("test-id", vnic); err != nil {
		log.Fail(t, "DocWorkflowStep getter failed: ", err.Error())
	}
}
