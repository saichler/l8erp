/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

import (

	"github.com/saichler/l8erp/go/types/doc"
)

// generateDocPhase1 creates compliance foundation: retention policies
// This runs first because categories reference retention policies
func generateDocPhase1(client *HCMClient, store *MockDataStore) error {
	policies := generateDocRetentionPolicies()
	if err := runOp(client, "Retention Policies", "/erp/45/DocRetPol", &doc.DocRetentionPolicyList{List: policies}, extractIDs(policies, func(e *doc.DocRetentionPolicy) string { return e.PolicyId }), &store.DocRetentionPolicyIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase2 creates storage foundation: folders, categories, tags
func generateDocPhase2(client *HCMClient, store *MockDataStore) error {
	folders := generateDocFolders(store)
	if err := runOp(client, "Folders", "/erp/45/DocFolder", &doc.DocFolderList{List: folders}, extractIDs(folders, func(e *doc.DocFolder) string { return e.FolderId }), &store.DocFolderIDs); err != nil {
		return err
	}

	categories := generateDocCategories(store)
	if err := runOp(client, "Categories", "/erp/45/DocCategry", &doc.DocCategoryList{List: categories}, extractIDs(categories, func(e *doc.DocCategory) string { return e.CategoryId }), &store.DocCategoryIDs); err != nil {
		return err
	}

	tags := generateDocTags()
	if err := runOp(client, "Tags", "/erp/45/DocTag", &doc.DocTagList{List: tags}, extractIDs(tags, func(e *doc.DocTag) string { return e.TagId }), &store.DocTagIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase3 creates documents and versions
func generateDocPhase3(client *HCMClient, store *MockDataStore) error {
	documents := generateDocDocuments(store)
	if err := runOp(client, "Documents", "/erp/45/DocDoc", &doc.DocDocumentList{List: documents}, extractIDs(documents, func(e *doc.DocDocument) string { return e.DocumentId }), &store.DocDocumentIDs); err != nil {
		return err
	}

	versions := generateDocDocumentVersions(store)
	if err := runOp(client, "Document Versions", "/erp/45/DocVersion", &doc.DocDocumentVersionList{List: versions}, extractIDs(versions, func(e *doc.DocDocumentVersion) string { return e.VersionId }), &store.DocVersionIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase4 creates workflow: checkouts, workflows, steps, signatures, comments
func generateDocPhase4(client *HCMClient, store *MockDataStore) error {
	checkouts := generateDocCheckouts(store)
	if err := runOp(client, "Checkouts", "/erp/45/DocChkout", &doc.DocCheckoutList{List: checkouts}, extractIDs(checkouts, func(e *doc.DocCheckout) string { return e.CheckoutId }), &store.DocCheckoutIDs); err != nil {
		return err
	}

	workflows := generateDocApprovalWorkflows(store)
	if err := runOp(client, "Approval Workflows", "/erp/45/DocAprvWf", &doc.DocApprovalWorkflowList{List: workflows}, extractIDs(workflows, func(e *doc.DocApprovalWorkflow) string { return e.WorkflowId }), &store.DocApprovalWorkflowIDs); err != nil {
		return err
	}

	steps := generateDocWorkflowSteps(store)
	if err := runOp(client, "Workflow Steps", "/erp/45/DocWfStep", &doc.DocWorkflowStepList{List: steps}, extractIDs(steps, func(e *doc.DocWorkflowStep) string { return e.StepId }), &store.DocWorkflowStepIDs); err != nil {
		return err
	}

	signatures := generateDocSignatures(store)
	if err := runOp(client, "Signatures", "/erp/45/DocSign", &doc.DocSignatureList{List: signatures}, extractIDs(signatures, func(e *doc.DocSignature) string { return e.SignatureId }), &store.DocSignatureIDs); err != nil {
		return err
	}

	comments := generateDocReviewComments(store)
	if err := runOp(client, "Review Comments", "/erp/45/DocReview", &doc.DocReviewCommentList{List: comments}, extractIDs(comments, func(e *doc.DocReviewComment) string { return e.CommentId }), &store.DocReviewCommentIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase5 creates integration: attachments, templates, fields, emails, scans
func generateDocPhase5(client *HCMClient, store *MockDataStore) error {
	attachments := generateDocAttachments(store)
	if err := runOp(client, "Attachments", "/erp/45/DocAttach", &doc.DocAttachmentList{List: attachments}, extractIDs(attachments, func(e *doc.DocAttachment) string { return e.AttachmentId }), &store.DocAttachmentIDs); err != nil {
		return err
	}

	templates := generateDocTemplates(store)
	if err := runOp(client, "Templates", "/erp/45/DocTmpl", &doc.DocTemplateList{List: templates}, extractIDs(templates, func(e *doc.DocTemplate) string { return e.TemplateId }), &store.DocTemplateIDs); err != nil {
		return err
	}

	fields := generateDocTemplateFields(store)
	if err := runOp(client, "Template Fields", "/erp/45/DocTmplFld", &doc.DocTemplateFieldList{List: fields}, extractIDs(fields, func(e *doc.DocTemplateField) string { return e.FieldId }), &store.DocTemplateFieldIDs); err != nil {
		return err
	}

	emails := generateDocEmailCaptures(store)
	if err := runOp(client, "Email Captures", "/erp/45/DocEmail", &doc.DocEmailCaptureList{List: emails}, extractIDs(emails, func(e *doc.DocEmailCapture) string { return e.CaptureId }), &store.DocEmailCaptureIDs); err != nil {
		return err
	}

	scans := generateDocScanJobs(store)
	if err := runOp(client, "Scan Jobs", "/erp/45/DocScan", &doc.DocScanJobList{List: scans}, extractIDs(scans, func(e *doc.DocScanJob) string { return e.ScanJobId }), &store.DocScanJobIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase6 creates remaining compliance: legal holds, access logs, archives, audits
func generateDocPhase6(client *HCMClient, store *MockDataStore) error {
	holds := generateDocLegalHolds(store)
	if err := runOp(client, "Legal Holds", "/erp/45/DocLglHold", &doc.DocLegalHoldList{List: holds}, extractIDs(holds, func(e *doc.DocLegalHold) string { return e.HoldId }), &store.DocLegalHoldIDs); err != nil {
		return err
	}

	logs := generateDocAccessLogs(store)
	if err := runOp(client, "Access Logs", "/erp/45/DocAccLog", &doc.DocAccessLogList{List: logs}, extractIDs(logs, func(e *doc.DocAccessLog) string { return e.LogId }), &store.DocAccessLogIDs); err != nil {
		return err
	}

	archives := generateDocArchiveJobs(store)
	if err := runOp(client, "Archive Jobs", "/erp/45/DocArchive", &doc.DocArchiveJobList{List: archives}, extractIDs(archives, func(e *doc.DocArchiveJob) string { return e.JobId }), &store.DocArchiveJobIDs); err != nil {
		return err
	}

	trails := generateDocAuditTrails(store)
	if err := runOp(client, "Audit Trails", "/erp/45/DocAudit", &doc.DocAuditTrailList{List: trails}, extractIDs(trails, func(e *doc.DocAuditTrail) string { return e.TrailId }), &store.DocAuditTrailIDs); err != nil {
		return err
	}

	return nil
}
