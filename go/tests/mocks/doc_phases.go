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
	if err := runOp(client, "Retention Policies", "/erp/45/DocRetPol", &doc.DocRetentionPolicyList{List: policies}, extractIDs(policies, func(v interface{}) string { return v.(*doc.DocRetentionPolicy).PolicyId }), &store.DocRetentionPolicyIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase2 creates storage foundation: folders, categories, tags
func generateDocPhase2(client *HCMClient, store *MockDataStore) error {
	folders := generateDocFolders(store)
	if err := runOp(client, "Folders", "/erp/45/DocFolder", &doc.DocFolderList{List: folders}, extractIDs(folders, func(v interface{}) string { return v.(*doc.DocFolder).FolderId }), &store.DocFolderIDs); err != nil {
		return err
	}

	categories := generateDocCategories(store)
	if err := runOp(client, "Categories", "/erp/45/DocCategry", &doc.DocCategoryList{List: categories}, extractIDs(categories, func(v interface{}) string { return v.(*doc.DocCategory).CategoryId }), &store.DocCategoryIDs); err != nil {
		return err
	}

	tags := generateDocTags()
	if err := runOp(client, "Tags", "/erp/45/DocTag", &doc.DocTagList{List: tags}, extractIDs(tags, func(v interface{}) string { return v.(*doc.DocTag).TagId }), &store.DocTagIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase3 creates documents (with embedded versions, checkouts, comments, signatures, attachments, access logs, audit trails)
func generateDocPhase3(client *HCMClient, store *MockDataStore) error {
	documents := generateDocDocuments(store)
	if err := runOp(client, "Documents (with embedded children)", "/erp/45/DocDoc", &doc.DocDocumentList{List: documents}, extractIDs(documents, func(v interface{}) string { return v.(*doc.DocDocument).DocumentId }), &store.DocDocumentIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase4 creates workflows (with embedded steps)
func generateDocPhase4(client *HCMClient, store *MockDataStore) error {
	workflows := generateDocApprovalWorkflows(store)
	if err := runOp(client, "Approval Workflows (with embedded steps)", "/erp/45/DocAprvWf", &doc.DocApprovalWorkflowList{List: workflows}, extractIDs(workflows, func(v interface{}) string { return v.(*doc.DocApprovalWorkflow).WorkflowId }), &store.DocApprovalWorkflowIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase5 creates integration: templates (with embedded fields), emails, scans
func generateDocPhase5(client *HCMClient, store *MockDataStore) error {
	templates := generateDocTemplates(store)
	if err := runOp(client, "Templates (with embedded fields)", "/erp/45/DocTmpl", &doc.DocTemplateList{List: templates}, extractIDs(templates, func(v interface{}) string { return v.(*doc.DocTemplate).TemplateId }), &store.DocTemplateIDs); err != nil {
		return err
	}

	emails := generateDocEmailCaptures(store)
	if err := runOp(client, "Email Captures", "/erp/45/DocEmail", &doc.DocEmailCaptureList{List: emails}, extractIDs(emails, func(v interface{}) string { return v.(*doc.DocEmailCapture).CaptureId }), &store.DocEmailCaptureIDs); err != nil {
		return err
	}

	scans := generateDocScanJobs(store)
	if err := runOp(client, "Scan Jobs", "/erp/45/DocScan", &doc.DocScanJobList{List: scans}, extractIDs(scans, func(v interface{}) string { return v.(*doc.DocScanJob).ScanJobId }), &store.DocScanJobIDs); err != nil {
		return err
	}

	return nil
}

// generateDocPhase6 creates remaining compliance: legal holds, archives
func generateDocPhase6(client *HCMClient, store *MockDataStore) error {
	holds := generateDocLegalHolds(store)
	if err := runOp(client, "Legal Holds", "/erp/45/DocLglHold", &doc.DocLegalHoldList{List: holds}, extractIDs(holds, func(v interface{}) string { return v.(*doc.DocLegalHold).HoldId }), &store.DocLegalHoldIDs); err != nil {
		return err
	}

	archives := generateDocArchiveJobs(store)
	if err := runOp(client, "Archive Jobs", "/erp/45/DocArchive", &doc.DocArchiveJobList{List: archives}, extractIDs(archives, func(v interface{}) string { return v.(*doc.DocArchiveJob).JobId }), &store.DocArchiveJobIDs); err != nil {
		return err
	}

	return nil
}
