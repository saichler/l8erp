/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package main

// Generates:
// - DocRetentionPolicy
// - DocLegalHold
// - DocAccessLog
// - DocArchiveJob
// - DocAuditTrail

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/doc"
)

// generateDocRetentionPolicies creates retention policy records
func generateDocRetentionPolicies() []*doc.DocRetentionPolicy {
	count := 8

	retentionActions := []doc.DocRetentionAction{
		doc.DocRetentionAction_DOC_RETENTION_ACTION_ARCHIVE,
		doc.DocRetentionAction_DOC_RETENTION_ACTION_ARCHIVE,
		doc.DocRetentionAction_DOC_RETENTION_ACTION_DELETE,
		doc.DocRetentionAction_DOC_RETENTION_ACTION_REVIEW,
	}

	docTypes := []doc.DocDocumentType{
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_CONTRACT,
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_INVOICE,
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_REPORT,
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_POLICY,
	}

	retentionDays := []int32{365, 730, 1095, 1825, 2555, 3650}

	policies := make([]*doc.DocRetentionPolicy, count)
	for i := 0; i < count; i++ {
		policies[i] = &doc.DocRetentionPolicy{
			PolicyId:       fmt.Sprintf("rtp-%03d", i+1),
			Name:           docRetentionPolicyNames[i%len(docRetentionPolicyNames)],
			Description:    fmt.Sprintf("Retention policy: %s", docRetentionPolicyNames[i%len(docRetentionPolicyNames)]),
			Code:           fmt.Sprintf("RET%03d", i+1),
			RetentionDays:  retentionDays[i%len(retentionDays)],
			ActionOnExpiry: retentionActions[i%len(retentionActions)],
			DocumentType:   docTypes[i%len(docTypes)],
			IsActive:       i < 6,
			IsMandatory:    i%3 == 0,
			LegalBasis:     fmt.Sprintf("Regulation %d compliance", i+1),
			EffectiveDate:  time.Now().AddDate(-2, 0, 0).Unix(),
			ExpiryDate:     time.Now().AddDate(5, 0, 0).Unix(),
			AuditInfo:      createAuditInfo(),
		}
	}
	return policies
}

// generateDocLegalHolds creates legal hold records
func generateDocLegalHolds(store *MockDataStore) []*doc.DocLegalHold {
	count := 12

	holdStatuses := []doc.DocLegalHoldStatus{
		doc.DocLegalHoldStatus_DOC_LEGAL_HOLD_STATUS_ACTIVE,
		doc.DocLegalHoldStatus_DOC_LEGAL_HOLD_STATUS_ACTIVE,
		doc.DocLegalHoldStatus_DOC_LEGAL_HOLD_STATUS_ACTIVE,
		doc.DocLegalHoldStatus_DOC_LEGAL_HOLD_STATUS_RELEASED,
		doc.DocLegalHoldStatus_DOC_LEGAL_HOLD_STATUS_RELEASED,
		doc.DocLegalHoldStatus_DOC_LEGAL_HOLD_STATUS_EXPIRED,
	}

	matterNames := []string{
		"Litigation - Contract Dispute",
		"Regulatory Investigation",
		"Internal Audit Hold",
		"Compliance Review",
		"Insurance Claim",
		"Patent Dispute",
	}

	holds := make([]*doc.DocLegalHold, count)
	for i := 0; i < count; i++ {
		custodianID := ""
		if len(store.EmployeeIDs) > 0 {
			custodianID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		status := holdStatuses[i%len(holdStatuses)]
		var releaseDate int64
		var releasedBy string
		var releaseReason string
		if status == doc.DocLegalHoldStatus_DOC_LEGAL_HOLD_STATUS_RELEASED {
			releaseDate = time.Now().AddDate(0, -rand.Intn(6), 0).Unix()
			releaseReason = "Matter resolved"
			if len(store.EmployeeIDs) > 0 {
				releasedBy = store.EmployeeIDs[(i+1)%len(store.EmployeeIDs)]
			}
		}

		holds[i] = &doc.DocLegalHold{
			HoldId:        fmt.Sprintf("lgh-%03d", i+1),
			Name:          fmt.Sprintf("Legal Hold %03d", i+1),
			Description:   fmt.Sprintf("Legal hold for matter %d", i+1),
			MatterId:      fmt.Sprintf("MTR-%04d", rand.Intn(9999)+1000),
			MatterName:    matterNames[i%len(matterNames)],
			Status:        status,
			CustodianId:   custodianID,
			LegalCounsel:  fmt.Sprintf("Legal Counsel %d", i+1),
			EffectiveDate: time.Now().AddDate(0, -rand.Intn(12), 0).Unix(),
			ReleaseDate:   releaseDate,
			ReleaseReason: releaseReason,
			ReleasedBy:    releasedBy,
			DocumentCount: int32(rand.Intn(100) + 10),
			Notes:         fmt.Sprintf("Legal hold notes for matter %d", i+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return holds
}

// generateDocAccessLogs creates access log records
func generateDocAccessLogs(store *MockDataStore) []*doc.DocAccessLog {
	count := 50

	accessActions := []doc.DocAccessAction{
		doc.DocAccessAction_DOC_ACCESS_ACTION_VIEW,
		doc.DocAccessAction_DOC_ACCESS_ACTION_VIEW,
		doc.DocAccessAction_DOC_ACCESS_ACTION_VIEW,
		doc.DocAccessAction_DOC_ACCESS_ACTION_EDIT,
		doc.DocAccessAction_DOC_ACCESS_ACTION_EDIT,
		doc.DocAccessAction_DOC_ACCESS_ACTION_DOWNLOAD,
		doc.DocAccessAction_DOC_ACCESS_ACTION_SHARE,
		doc.DocAccessAction_DOC_ACCESS_ACTION_DELETE,
	}

	userAgents := []string{
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
		"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0)",
		"Mozilla/5.0 (Linux; Android 13)",
	}

	logs := make([]*doc.DocAccessLog, count)
	for i := 0; i < count; i++ {
		documentID := ""
		if len(store.DocDocumentIDs) > 0 {
			documentID = store.DocDocumentIDs[i%len(store.DocDocumentIDs)]
		}

		versionID := ""
		if len(store.DocVersionIDs) > 0 {
			versionID = store.DocVersionIDs[i%len(store.DocVersionIDs)]
		}

		userID := ""
		userName := fmt.Sprintf("User %d", i+1)
		if len(store.EmployeeIDs) > 0 {
			userID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		success := i%10 != 0
		failureReason := ""
		if !success {
			failureReason = "Access denied"
		}

		logs[i] = &doc.DocAccessLog{
			LogId:         fmt.Sprintf("log-%03d", i+1),
			DocumentId:    documentID,
			VersionId:     versionID,
			Action:        accessActions[i%len(accessActions)],
			UserId:        userID,
			UserName:      userName,
			AccessDate:    time.Now().AddDate(0, 0, -rand.Intn(90)).Add(time.Duration(-rand.Intn(24)) * time.Hour).Unix(),
			IpAddress:     fmt.Sprintf("192.168.%d.%d", rand.Intn(255), rand.Intn(255)),
			UserAgent:     userAgents[i%len(userAgents)],
			SessionId:     fmt.Sprintf("sess-%08x", rand.Int31()),
			Success:       success,
			FailureReason: failureReason,
			Details:       fmt.Sprintf("Access log entry %d", i+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return logs
}

// generateDocArchiveJobs creates archive job records
func generateDocArchiveJobs(store *MockDataStore) []*doc.DocArchiveJob {
	count := 15

	archiveStatuses := []doc.DocArchiveStatus{
		doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_COMPLETED,
		doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_COMPLETED,
		doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_COMPLETED,
		doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_IN_PROGRESS,
		doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_PENDING,
		doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_FAILED,
	}

	archiveLocations := []string{
		"s3://company-archive/documents/2024",
		"s3://company-archive/documents/2023",
		"glacier://company-cold-storage/legal",
		"azure-blob://archive-storage/compliance",
	}

	jobs := make([]*doc.DocArchiveJob, count)
	for i := 0; i < count; i++ {
		folderID := ""
		if len(store.DocFolderIDs) > 0 {
			folderID = store.DocFolderIDs[i%len(store.DocFolderIDs)]
		}

		policyID := ""
		if len(store.DocRetentionPolicyIDs) > 0 {
			policyID = store.DocRetentionPolicyIDs[i%len(store.DocRetentionPolicyIDs)]
		}

		initiatedBy := ""
		if len(store.EmployeeIDs) > 0 {
			initiatedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		status := archiveStatuses[i%len(archiveStatuses)]
		var completedDate int64
		var errorMessage string
		if status == doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_COMPLETED {
			completedDate = time.Now().AddDate(0, -rand.Intn(6), 0).Unix()
		} else if status == doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_FAILED {
			errorMessage = "Archive operation failed: storage unavailable"
		}

		jobs[i] = &doc.DocArchiveJob{
			JobId:             fmt.Sprintf("arc-%03d", i+1),
			Name:              fmt.Sprintf("Archive Job %03d", i+1),
			Description:       fmt.Sprintf("Archive job for documents in folder %d", i+1),
			Status:            status,
			SourceFolderId:    folderID,
			ArchiveLocation:   archiveLocations[i%len(archiveLocations)],
			RetentionPolicyId: policyID,
			SearchCriteria:    `{"status": "archived", "age": ">365d"}`,
			DocumentCount:     int32(rand.Intn(500) + 10),
			TotalSize:         int64(rand.Intn(100000000) + 1000000),
			InitiatedBy:       initiatedBy,
			InitiatedDate:     time.Now().AddDate(0, -rand.Intn(12), 0).Unix(),
			CompletedDate:     completedDate,
			ErrorMessage:      errorMessage,
			AuditInfo:         createAuditInfo(),
		}
	}
	return jobs
}

// generateDocAuditTrails creates audit trail records
func generateDocAuditTrails(store *MockDataStore) []*doc.DocAuditTrail {
	count := 60

	auditActions := []string{
		"created", "modified", "modified", "viewed", "viewed", "viewed",
		"approved", "deleted", "rejected", "shared", "downloaded",
	}

	entityTypes := []string{"document", "folder", "template", "workflow", "signature"}

	trails := make([]*doc.DocAuditTrail, count)
	for i := 0; i < count; i++ {
		documentID := ""
		if len(store.DocDocumentIDs) > 0 {
			documentID = store.DocDocumentIDs[i%len(store.DocDocumentIDs)]
		}

		versionID := ""
		if len(store.DocVersionIDs) > 0 {
			versionID = store.DocVersionIDs[i%len(store.DocVersionIDs)]
		}

		userID := ""
		userName := fmt.Sprintf("User %d", i+1)
		if len(store.EmployeeIDs) > 0 {
			userID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		entityType := entityTypes[i%len(entityTypes)]
		var entityID string
		switch entityType {
		case "document":
			if len(store.DocDocumentIDs) > 0 {
				entityID = store.DocDocumentIDs[i%len(store.DocDocumentIDs)]
			}
		case "folder":
			if len(store.DocFolderIDs) > 0 {
				entityID = store.DocFolderIDs[i%len(store.DocFolderIDs)]
			}
		case "template":
			if len(store.DocTemplateIDs) > 0 {
				entityID = store.DocTemplateIDs[i%len(store.DocTemplateIDs)]
			}
		case "workflow":
			if len(store.DocApprovalWorkflowIDs) > 0 {
				entityID = store.DocApprovalWorkflowIDs[i%len(store.DocApprovalWorkflowIDs)]
			}
		case "signature":
			if len(store.DocSignatureIDs) > 0 {
				entityID = store.DocSignatureIDs[i%len(store.DocSignatureIDs)]
			}
		}
		if entityID == "" {
			entityID = fmt.Sprintf("ent-%03d", i+1)
		}

		trails[i] = &doc.DocAuditTrail{
			TrailId:       fmt.Sprintf("aud-%03d", i+1),
			DocumentId:    documentID,
			VersionId:     versionID,
			Action:        auditActions[i%len(auditActions)],
			EntityType:    entityType,
			EntityId:      entityID,
			UserId:        userID,
			UserName:      userName,
			Timestamp:     time.Now().AddDate(0, 0, -rand.Intn(180)).Add(time.Duration(-rand.Intn(24)) * time.Hour).Unix(),
			OldValues:     fmt.Sprintf(`{"status": "old_%d"}`, i),
			NewValues:     fmt.Sprintf(`{"status": "new_%d"}`, i),
			ChangeSummary: fmt.Sprintf("Audit trail entry %d", i+1),
			IpAddress:     fmt.Sprintf("192.168.%d.%d", rand.Intn(255), rand.Intn(255)),
			SessionId:     fmt.Sprintf("sess-%08x", rand.Int31()),
			AuditInfo:     createAuditInfo(),
		}
	}
	return trails
}
