/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

// Generates:
// - DocRetentionPolicy
// - DocLegalHold
// - DocArchiveJob

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
			PolicyId:       genID("rtp", i),
			Name:           docRetentionPolicyNames[i%len(docRetentionPolicyNames)],
			Description:    fmt.Sprintf("Retention policy: %s", docRetentionPolicyNames[i%len(docRetentionPolicyNames)]),
			Code:           genCode("RET", i),
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
		custodianID := pickRef(store.EmployeeIDs, i)

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
			HoldId:        genID("lgh", i),
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
		folderID := pickRef(store.DocFolderIDs, i)
		policyID := pickRef(store.DocRetentionPolicyIDs, i)
		initiatedBy := pickRef(store.EmployeeIDs, i)

		status := archiveStatuses[i%len(archiveStatuses)]
		var completedDate int64
		var errorMessage string
		if status == doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_COMPLETED {
			completedDate = time.Now().AddDate(0, -rand.Intn(6), 0).Unix()
		} else if status == doc.DocArchiveStatus_DOC_ARCHIVE_STATUS_FAILED {
			errorMessage = "Archive operation failed: storage unavailable"
		}

		jobs[i] = &doc.DocArchiveJob{
			JobId:             genID("arc", i),
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
