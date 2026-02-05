/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package main

import (
	"fmt"

	"github.com/saichler/l8erp/go/types/doc"
)

// generateDocPhase1 creates compliance foundation: retention policies
// This runs first because categories reference retention policies
func generateDocPhase1(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Retention Policies...")
	policies := generateDocRetentionPolicies()
	if err := client.post("/erp/45/DocRetPol", &doc.DocRetentionPolicyList{List: policies}); err != nil {
		return fmt.Errorf("retention policies: %w", err)
	}
	for _, p := range policies {
		store.DocRetentionPolicyIDs = append(store.DocRetentionPolicyIDs, p.PolicyId)
	}
	fmt.Printf(" %d created\n", len(policies))

	return nil
}

// generateDocPhase2 creates storage foundation: folders, categories, tags
func generateDocPhase2(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Folders...")
	folders := generateDocFolders(store)
	if err := client.post("/erp/45/DocFolder", &doc.DocFolderList{List: folders}); err != nil {
		return fmt.Errorf("folders: %w", err)
	}
	for _, f := range folders {
		store.DocFolderIDs = append(store.DocFolderIDs, f.FolderId)
	}
	fmt.Printf(" %d created\n", len(folders))

	fmt.Printf("  Creating Categories...")
	categories := generateDocCategories(store)
	if err := client.post("/erp/45/DocCategry", &doc.DocCategoryList{List: categories}); err != nil {
		return fmt.Errorf("categories: %w", err)
	}
	for _, c := range categories {
		store.DocCategoryIDs = append(store.DocCategoryIDs, c.CategoryId)
	}
	fmt.Printf(" %d created\n", len(categories))

	fmt.Printf("  Creating Tags...")
	tags := generateDocTags()
	if err := client.post("/erp/45/DocTag", &doc.DocTagList{List: tags}); err != nil {
		return fmt.Errorf("tags: %w", err)
	}
	for _, t := range tags {
		store.DocTagIDs = append(store.DocTagIDs, t.TagId)
	}
	fmt.Printf(" %d created\n", len(tags))

	return nil
}

// generateDocPhase3 creates documents and versions
func generateDocPhase3(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Documents...")
	documents := generateDocDocuments(store)
	if err := client.post("/erp/45/DocDoc", &doc.DocDocumentList{List: documents}); err != nil {
		return fmt.Errorf("documents: %w", err)
	}
	for _, d := range documents {
		store.DocDocumentIDs = append(store.DocDocumentIDs, d.DocumentId)
	}
	fmt.Printf(" %d created\n", len(documents))

	fmt.Printf("  Creating Document Versions...")
	versions := generateDocDocumentVersions(store)
	if err := client.post("/erp/45/DocVersion", &doc.DocDocumentVersionList{List: versions}); err != nil {
		return fmt.Errorf("document versions: %w", err)
	}
	for _, v := range versions {
		store.DocVersionIDs = append(store.DocVersionIDs, v.VersionId)
	}
	fmt.Printf(" %d created\n", len(versions))

	return nil
}

// generateDocPhase4 creates workflow: checkouts, workflows, steps, signatures, comments
func generateDocPhase4(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Checkouts...")
	checkouts := generateDocCheckouts(store)
	if err := client.post("/erp/45/DocChkout", &doc.DocCheckoutList{List: checkouts}); err != nil {
		return fmt.Errorf("checkouts: %w", err)
	}
	for _, c := range checkouts {
		store.DocCheckoutIDs = append(store.DocCheckoutIDs, c.CheckoutId)
	}
	fmt.Printf(" %d created\n", len(checkouts))

	fmt.Printf("  Creating Approval Workflows...")
	workflows := generateDocApprovalWorkflows(store)
	if err := client.post("/erp/45/DocAprvWf", &doc.DocApprovalWorkflowList{List: workflows}); err != nil {
		return fmt.Errorf("approval workflows: %w", err)
	}
	for _, w := range workflows {
		store.DocApprovalWorkflowIDs = append(store.DocApprovalWorkflowIDs, w.WorkflowId)
	}
	fmt.Printf(" %d created\n", len(workflows))

	fmt.Printf("  Creating Workflow Steps...")
	steps := generateDocWorkflowSteps(store)
	if err := client.post("/erp/45/DocWfStep", &doc.DocWorkflowStepList{List: steps}); err != nil {
		return fmt.Errorf("workflow steps: %w", err)
	}
	for _, s := range steps {
		store.DocWorkflowStepIDs = append(store.DocWorkflowStepIDs, s.StepId)
	}
	fmt.Printf(" %d created\n", len(steps))

	fmt.Printf("  Creating Signatures...")
	signatures := generateDocSignatures(store)
	if err := client.post("/erp/45/DocSign", &doc.DocSignatureList{List: signatures}); err != nil {
		return fmt.Errorf("signatures: %w", err)
	}
	for _, s := range signatures {
		store.DocSignatureIDs = append(store.DocSignatureIDs, s.SignatureId)
	}
	fmt.Printf(" %d created\n", len(signatures))

	fmt.Printf("  Creating Review Comments...")
	comments := generateDocReviewComments(store)
	if err := client.post("/erp/45/DocReview", &doc.DocReviewCommentList{List: comments}); err != nil {
		return fmt.Errorf("review comments: %w", err)
	}
	for _, c := range comments {
		store.DocReviewCommentIDs = append(store.DocReviewCommentIDs, c.CommentId)
	}
	fmt.Printf(" %d created\n", len(comments))

	return nil
}

// generateDocPhase5 creates integration: attachments, templates, fields, emails, scans
func generateDocPhase5(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Attachments...")
	attachments := generateDocAttachments(store)
	if err := client.post("/erp/45/DocAttach", &doc.DocAttachmentList{List: attachments}); err != nil {
		return fmt.Errorf("attachments: %w", err)
	}
	for _, a := range attachments {
		store.DocAttachmentIDs = append(store.DocAttachmentIDs, a.AttachmentId)
	}
	fmt.Printf(" %d created\n", len(attachments))

	fmt.Printf("  Creating Templates...")
	templates := generateDocTemplates(store)
	if err := client.post("/erp/45/DocTmpl", &doc.DocTemplateList{List: templates}); err != nil {
		return fmt.Errorf("templates: %w", err)
	}
	for _, t := range templates {
		store.DocTemplateIDs = append(store.DocTemplateIDs, t.TemplateId)
	}
	fmt.Printf(" %d created\n", len(templates))

	fmt.Printf("  Creating Template Fields...")
	fields := generateDocTemplateFields(store)
	if err := client.post("/erp/45/DocTmplFld", &doc.DocTemplateFieldList{List: fields}); err != nil {
		return fmt.Errorf("template fields: %w", err)
	}
	for _, f := range fields {
		store.DocTemplateFieldIDs = append(store.DocTemplateFieldIDs, f.FieldId)
	}
	fmt.Printf(" %d created\n", len(fields))

	fmt.Printf("  Creating Email Captures...")
	emails := generateDocEmailCaptures(store)
	if err := client.post("/erp/45/DocEmail", &doc.DocEmailCaptureList{List: emails}); err != nil {
		return fmt.Errorf("email captures: %w", err)
	}
	for _, e := range emails {
		store.DocEmailCaptureIDs = append(store.DocEmailCaptureIDs, e.CaptureId)
	}
	fmt.Printf(" %d created\n", len(emails))

	fmt.Printf("  Creating Scan Jobs...")
	scans := generateDocScanJobs(store)
	if err := client.post("/erp/45/DocScan", &doc.DocScanJobList{List: scans}); err != nil {
		return fmt.Errorf("scan jobs: %w", err)
	}
	for _, s := range scans {
		store.DocScanJobIDs = append(store.DocScanJobIDs, s.ScanJobId)
	}
	fmt.Printf(" %d created\n", len(scans))

	return nil
}

// generateDocPhase6 creates remaining compliance: legal holds, access logs, archives, audits
func generateDocPhase6(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Legal Holds...")
	holds := generateDocLegalHolds(store)
	if err := client.post("/erp/45/DocLglHold", &doc.DocLegalHoldList{List: holds}); err != nil {
		return fmt.Errorf("legal holds: %w", err)
	}
	for _, h := range holds {
		store.DocLegalHoldIDs = append(store.DocLegalHoldIDs, h.HoldId)
	}
	fmt.Printf(" %d created\n", len(holds))

	fmt.Printf("  Creating Access Logs...")
	logs := generateDocAccessLogs(store)
	if err := client.post("/erp/45/DocAccLog", &doc.DocAccessLogList{List: logs}); err != nil {
		return fmt.Errorf("access logs: %w", err)
	}
	for _, l := range logs {
		store.DocAccessLogIDs = append(store.DocAccessLogIDs, l.LogId)
	}
	fmt.Printf(" %d created\n", len(logs))

	fmt.Printf("  Creating Archive Jobs...")
	archives := generateDocArchiveJobs(store)
	if err := client.post("/erp/45/DocArchive", &doc.DocArchiveJobList{List: archives}); err != nil {
		return fmt.Errorf("archive jobs: %w", err)
	}
	for _, a := range archives {
		store.DocArchiveJobIDs = append(store.DocArchiveJobIDs, a.JobId)
	}
	fmt.Printf(" %d created\n", len(archives))

	fmt.Printf("  Creating Audit Trails...")
	trails := generateDocAuditTrails(store)
	if err := client.post("/erp/45/DocAudit", &doc.DocAuditTrailList{List: trails}); err != nil {
		return fmt.Errorf("audit trails: %w", err)
	}
	for _, t := range trails {
		store.DocAuditTrailIDs = append(store.DocAuditTrailIDs, t.TrailId)
	}
	fmt.Printf(" %d created\n", len(trails))

	return nil
}
