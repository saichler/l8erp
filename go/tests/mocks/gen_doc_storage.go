/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

// Generates:
// - DocFolder
// - DocCategory
// - DocTag
// - DocDocument (with embedded versions, checkouts, comments, signatures, attachments, access logs, audit trails)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/doc"
)

// generateDocFolders creates folder records
func generateDocFolders(store *MockDataStore) []*doc.DocFolder {
	count := 12

	accessLevels := []doc.DocAccessLevel{
		doc.DocAccessLevel_DOC_ACCESS_LEVEL_PUBLIC,
		doc.DocAccessLevel_DOC_ACCESS_LEVEL_INTERNAL,
		doc.DocAccessLevel_DOC_ACCESS_LEVEL_INTERNAL,
		doc.DocAccessLevel_DOC_ACCESS_LEVEL_RESTRICTED,
		doc.DocAccessLevel_DOC_ACCESS_LEVEL_CONFIDENTIAL,
	}

	folders := make([]*doc.DocFolder, count)
	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)

		departmentID := pickRef(store.DepartmentIDs, i)

		parentFolderID := ""
		if i > 3 && len(store.DocFolderIDs) > 0 {
			parentFolderID = store.DocFolderIDs[i%len(store.DocFolderIDs)]
		}

		folders[i] = &doc.DocFolder{
			FolderId:       genID("fld", i),
			Name:           docFolderNames[i%len(docFolderNames)],
			Description:    fmt.Sprintf("Folder for %s documents", docFolderNames[i%len(docFolderNames)]),
			ParentFolderId: parentFolderID,
			Path:           fmt.Sprintf("/documents/%s", docFolderNames[i%len(docFolderNames)]),
			AccessLevel:    accessLevels[i%len(accessLevels)],
			OwnerId:        ownerID,
			DepartmentId:   departmentID,
			IsSystem:       i < 3,
			DocumentCount:  int32(rand.Intn(50) + 5),
			SubfolderCount: int32(rand.Intn(5)),
			AuditInfo:      createAuditInfo(),
		}
	}
	return folders
}

// generateDocCategories creates category records
func generateDocCategories(store *MockDataStore) []*doc.DocCategory {
	count := 10

	categories := make([]*doc.DocCategory, count)
	for i := 0; i < count; i++ {
		parentCategoryID := ""
		if i > 4 && len(store.DocCategoryIDs) > 0 {
			parentCategoryID = store.DocCategoryIDs[i%len(store.DocCategoryIDs)]
		}

		retentionPolicyID := pickRef(store.DocRetentionPolicyIDs, i)

		categories[i] = &doc.DocCategory{
			CategoryId:        genID("cat", i),
			Name:              docCategoryNames[i%len(docCategoryNames)],
			Description:       fmt.Sprintf("Category for %s documents", docCategoryNames[i%len(docCategoryNames)]),
			ParentCategoryId:  parentCategoryID,
			Code:              genCode("CAT", i),
			SortOrder:         int32(i + 1),
			IsActive:          i < 8,
			RetentionPolicyId: retentionPolicyID,
			AuditInfo:         createAuditInfo(),
		}
	}
	return categories
}

// generateDocTags creates tag records
func generateDocTags() []*doc.DocTag {
	count := 14

	tags := make([]*doc.DocTag, count)
	for i := 0; i < count; i++ {
		colors := []string{"#FF5733", "#33FF57", "#3357FF", "#FF33F5", "#F5FF33", "#33FFF5"}
		tags[i] = &doc.DocTag{
			TagId:       genID("tag", i),
			Name:        docTagNames[i%len(docTagNames)],
			Description: fmt.Sprintf("Tag for %s documents", docTagNames[i%len(docTagNames)]),
			Color:       colors[i%len(colors)],
			IsActive:    i < 12,
			UsageCount:  int32(rand.Intn(100) + 10),
			AuditInfo:   createAuditInfo(),
		}
	}
	return tags
}

// generateDocDocuments creates document records with embedded children
func generateDocDocuments(store *MockDataStore) []*doc.DocDocument {
	count := 20

	// Flavorable status distributions: 40% PUBLISHED, 25% APPROVED, 20% DRAFT, 10% UNDER_REVIEW, 5% ARCHIVED
	docStatuses := []doc.DocDocumentStatus{
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_PUBLISHED,
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_PUBLISHED,
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_PUBLISHED,
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_PUBLISHED,
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_APPROVED,
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_APPROVED,
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_APPROVED,
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_DRAFT,
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_DRAFT,
		doc.DocDocumentStatus_DOC_DOCUMENT_STATUS_UNDER_REVIEW,
	}

	docTypes := []doc.DocDocumentType{
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_CONTRACT,
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_INVOICE,
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_REPORT,
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_POLICY,
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_PROCEDURE,
		doc.DocDocumentType_DOC_DOCUMENT_TYPE_FORM,
	}

	fileFormats := []doc.DocFileFormat{
		doc.DocFileFormat_DOC_FILE_FORMAT_PDF,
		doc.DocFileFormat_DOC_FILE_FORMAT_WORD,
		doc.DocFileFormat_DOC_FILE_FORMAT_EXCEL,
		doc.DocFileFormat_DOC_FILE_FORMAT_POWERPOINT,
	}

	accessLevels := []doc.DocAccessLevel{
		doc.DocAccessLevel_DOC_ACCESS_LEVEL_PUBLIC,
		doc.DocAccessLevel_DOC_ACCESS_LEVEL_INTERNAL,
		doc.DocAccessLevel_DOC_ACCESS_LEVEL_INTERNAL,
		doc.DocAccessLevel_DOC_ACCESS_LEVEL_RESTRICTED,
	}

	mimeTypes := map[doc.DocFileFormat]string{
		doc.DocFileFormat_DOC_FILE_FORMAT_PDF:        "application/pdf",
		doc.DocFileFormat_DOC_FILE_FORMAT_WORD:       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		doc.DocFileFormat_DOC_FILE_FORMAT_EXCEL:      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		doc.DocFileFormat_DOC_FILE_FORMAT_POWERPOINT: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	}

	ext := map[doc.DocFileFormat]string{
		doc.DocFileFormat_DOC_FILE_FORMAT_PDF:        "pdf",
		doc.DocFileFormat_DOC_FILE_FORMAT_WORD:       "docx",
		doc.DocFileFormat_DOC_FILE_FORMAT_EXCEL:      "xlsx",
		doc.DocFileFormat_DOC_FILE_FORMAT_POWERPOINT: "pptx",
	}

	documents := make([]*doc.DocDocument, count)
	for i := 0; i < count; i++ {
		folderID := pickRef(store.DocFolderIDs, i)
		categoryID := pickRef(store.DocCategoryIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)
		fileFormat := fileFormats[i%len(fileFormats)]
		docID := genID("doc", i)

		documents[i] = &doc.DocDocument{
			DocumentId:     docID,
			Name:           docDocumentNames[i%len(docDocumentNames)],
			Description:    fmt.Sprintf("Document: %s", docDocumentNames[i%len(docDocumentNames)]),
			DocumentType:   docTypes[i%len(docTypes)],
			Status:         docStatuses[i%len(docStatuses)],
			FileFormat:     fileFormat,
			FileName:       fmt.Sprintf("%s.%s", docDocumentNames[i%len(docDocumentNames)], ext[fileFormat]),
			MimeType:       mimeTypes[fileFormat],
			FileSize:       int64(rand.Intn(5000000) + 50000),
			StoragePath:    fmt.Sprintf("/storage/documents/%s/doc-%03d.%s", time.Now().Format("2006/01"), i+1, ext[fileFormat]),
			FolderId:       folderID,
			CategoryId:     categoryID,
			AccessLevel:    accessLevels[i%len(accessLevels)],
			OwnerId:        ownerID,
			IsPublic:       i%4 == 0,
			CurrentVersion: int32(rand.Intn(5) + 1),
			AuditInfo:      createAuditInfo(),
			Versions:       genDocVersions(store, i),
			Checkouts:      genDocCheckouts(store, i),
			Comments:       genDocComments(store, i),
			Signatures:     genDocSignatures(store, i),
			Attachments:    genDocAttachments(store, i),
			AccessLogs:     genDocAccessLogs(store, i),
			AuditTrails:    genDocAuditTrails(store, i),
		}
	}
	return documents
}

// genDocVersions generates embedded version records for a document
func genDocVersions(store *MockDataStore, docIdx int) []*doc.DocDocumentVersion {
	count := 1 + docIdx%3 // 1-3 versions per document
	fileExtensions := []string{"pdf", "docx", "xlsx", "pptx"}

	versions := make([]*doc.DocDocumentVersion, count)
	for j := 0; j < count; j++ {
		createdBy := pickRef(store.EmployeeIDs, docIdx*10+j)
		ext := fileExtensions[(docIdx+j)%len(fileExtensions)]
		versionNum := j + 1

		versions[j] = &doc.DocDocumentVersion{
			VersionId:      genID("ver", docIdx*10+j),
			VersionNumber:  int32(versionNum),
			ChangeNotes:    fmt.Sprintf("Version %d changes and updates", versionNum),
			FileName:       fmt.Sprintf("document_v%d.%s", versionNum, ext),
			FileSize:       int64(rand.Intn(5000000) + 50000),
			StoragePath:    fmt.Sprintf("/storage/versions/%s/ver-%03d", time.Now().Format("2006/01"), docIdx*10+j+1),
			Checksum:       fmt.Sprintf("sha256-%08x%08x", rand.Int31(), rand.Int31()),
			IsMajorVersion: versionNum == 1 || j%3 == 0,
			CreatedBy:      createdBy,
			CreatedDate:    time.Now().AddDate(0, 0, -rand.Intn(180)).Unix(),
			AuditInfo:      createAuditInfo(),
		}
	}
	return versions
}

// genDocCheckouts generates embedded checkout records for a document
func genDocCheckouts(store *MockDataStore, docIdx int) []*doc.DocCheckout {
	if docIdx%3 != 0 { // Only some documents have checkouts
		return nil
	}
	count := 1 + docIdx%2

	checkoutStatuses := []doc.DocCheckoutStatus{
		doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_OUT,
		doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_IN,
		doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_IN,
	}

	checkouts := make([]*doc.DocCheckout, count)
	for j := 0; j < count; j++ {
		checkedOutBy := pickRef(store.EmployeeIDs, docIdx*10+j)
		checkoutDate := time.Now().AddDate(0, 0, -rand.Intn(30))
		status := checkoutStatuses[(docIdx+j)%len(checkoutStatuses)]

		var checkinDate int64
		if status == doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_IN {
			checkinDate = checkoutDate.Add(time.Duration(rand.Intn(72)) * time.Hour).Unix()
		}

		checkouts[j] = &doc.DocCheckout{
			CheckoutId:    genID("chk", docIdx*10+j),
			Status:        status,
			CheckedOutBy:  checkedOutBy,
			CheckoutDate:  checkoutDate.Unix(),
			CheckinDate:   checkinDate,
			CheckoutNotes: fmt.Sprintf("Editing document for review - checkout %d", j+1),
			CheckinNotes:  "Completed review and edits",
			AuditInfo:     createAuditInfo(),
		}
	}
	return checkouts
}

// genDocComments generates embedded review comment records for a document
func genDocComments(store *MockDataStore, docIdx int) []*doc.DocReviewComment {
	if docIdx%2 != 0 { // Only some documents have comments
		return nil
	}
	count := 1 + docIdx%3

	commentTexts := []string{
		"Please review this section for accuracy",
		"Suggest rephrasing for clarity",
		"Minor typo needs correction",
		"This section needs more detail",
		"Approved as written",
	}

	comments := make([]*doc.DocReviewComment, count)
	for j := 0; j < count; j++ {
		authorID := pickRef(store.EmployeeIDs, docIdx*10+j)
		isResolved := j%3 == 0
		resolvedBy := ""
		var resolvedDate int64
		if isResolved && len(store.EmployeeIDs) > 0 {
			resolvedBy = store.EmployeeIDs[(docIdx+j+1)%len(store.EmployeeIDs)]
			resolvedDate = time.Now().AddDate(0, 0, -rand.Intn(14)).Unix()
		}

		comments[j] = &doc.DocReviewComment{
			CommentId:    genID("cmt", docIdx*10+j),
			AuthorId:     authorID,
			Content:      commentTexts[(docIdx+j)%len(commentTexts)],
			PageNumber:   int32(rand.Intn(20) + 1),
			Position:     fmt.Sprintf("{\"x\": %d, \"y\": %d}", rand.Intn(500)+100, rand.Intn(700)+100),
			IsResolved:   isResolved,
			ResolvedBy:   resolvedBy,
			ResolvedDate: resolvedDate,
			CreatedDate:  time.Now().AddDate(0, 0, -rand.Intn(60)).Unix(),
			AuditInfo:    createAuditInfo(),
		}
	}
	return comments
}

// genDocSignatures generates embedded signature records for a document
func genDocSignatures(store *MockDataStore, docIdx int) []*doc.DocSignature {
	if docIdx%4 != 0 { // Only some documents have signatures
		return nil
	}
	count := 1 + docIdx%2

	signatureStatuses := []doc.DocSignatureStatus{
		doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_SIGNED,
		doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_SIGNED,
		doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_PENDING,
	}

	signatureTypes := []doc.DocSignatureType{
		doc.DocSignatureType_DOC_SIGNATURE_TYPE_ELECTRONIC,
		doc.DocSignatureType_DOC_SIGNATURE_TYPE_DIGITAL,
		doc.DocSignatureType_DOC_SIGNATURE_TYPE_HANDWRITTEN,
	}

	signerNames := []string{"John Smith", "Jane Doe", "Robert Johnson", "Emily Williams"}

	signatures := make([]*doc.DocSignature, count)
	for j := 0; j < count; j++ {
		signerID := pickRef(store.EmployeeIDs, docIdx*10+j)
		signerName := signerNames[(docIdx+j)%len(signerNames)]
		status := signatureStatuses[(docIdx+j)%len(signatureStatuses)]
		requestedDate := time.Now().AddDate(0, 0, -rand.Intn(90))

		var signedDate int64
		if status == doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_SIGNED {
			signedDate = requestedDate.Add(time.Duration(rand.Intn(168)) * time.Hour).Unix()
		}

		signatures[j] = &doc.DocSignature{
			SignatureId:   genID("sig", docIdx*10+j),
			SignatureType: signatureTypes[(docIdx+j)%len(signatureTypes)],
			Status:        status,
			SignerId:      signerID,
			SignerName:    signerName,
			SignerEmail:   fmt.Sprintf("%s@company.com", signerName[:4]),
			RequestedDate: requestedDate.Unix(),
			SignedDate:    signedDate,
			ExpiryDate:    time.Now().AddDate(1, 0, 0).Unix(),
			SignatureData: fmt.Sprintf("sig_data_%03d_%d", docIdx+1, j+1),
			CertificateId: fmt.Sprintf("cert-%08x", rand.Int31()),
			IpAddress:     fmt.Sprintf("192.168.1.%d", rand.Intn(255)),
			Reason:        "Document approval signature",
			AuditInfo:     createAuditInfo(),
		}
	}
	return signatures
}

// genDocAttachments generates embedded attachment records for a document
func genDocAttachments(store *MockDataStore, docIdx int) []*doc.DocAttachment {
	if docIdx%3 != 1 { // Only some documents have attachments
		return nil
	}
	count := 1 + docIdx%2

	entityTypes := []string{"SalesOrder", "Invoice", "Project", "Customer", "Vendor"}
	modules := []string{"sales", "fin", "prj", "crm", "hcm"}
	relationshipTypes := []string{"primary", "supporting", "reference"}

	attachments := make([]*doc.DocAttachment, count)
	for j := 0; j < count; j++ {
		attachedBy := pickRef(store.EmployeeIDs, docIdx*10+j)

		attachments[j] = &doc.DocAttachment{
			AttachmentId:     genID("att", docIdx*10+j),
			EntityType:       entityTypes[(docIdx+j)%len(entityTypes)],
			EntityId:         genID("ent", docIdx*10+j),
			Module:           modules[(docIdx+j)%len(modules)],
			RelationshipType: relationshipTypes[(docIdx+j)%len(relationshipTypes)],
			Description:      fmt.Sprintf("Attachment for %s entity", entityTypes[(docIdx+j)%len(entityTypes)]),
			SortOrder:        int32(j + 1),
			AttachedBy:       attachedBy,
			AttachedDate:     time.Now().AddDate(0, 0, -rand.Intn(90)).Unix(),
			AuditInfo:        createAuditInfo(),
		}
	}
	return attachments
}

// genDocAccessLogs generates embedded access log records for a document
func genDocAccessLogs(store *MockDataStore, docIdx int) []*doc.DocAccessLog {
	count := 2 + docIdx%3 // 2-4 logs per document

	accessActions := []doc.DocAccessAction{
		doc.DocAccessAction_DOC_ACCESS_ACTION_VIEW,
		doc.DocAccessAction_DOC_ACCESS_ACTION_VIEW,
		doc.DocAccessAction_DOC_ACCESS_ACTION_EDIT,
		doc.DocAccessAction_DOC_ACCESS_ACTION_DOWNLOAD,
	}

	userAgents := []string{
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
		"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0)",
	}

	logs := make([]*doc.DocAccessLog, count)
	for j := 0; j < count; j++ {
		userID := pickRef(store.EmployeeIDs, docIdx*10+j)
		success := (docIdx+j)%10 != 0
		failureReason := ""
		if !success {
			failureReason = "Access denied"
		}

		logs[j] = &doc.DocAccessLog{
			LogId:         genID("log", docIdx*10+j),
			Action:        accessActions[(docIdx+j)%len(accessActions)],
			UserId:        userID,
			UserName:      fmt.Sprintf("User %d", docIdx*10+j+1),
			AccessDate:    time.Now().AddDate(0, 0, -rand.Intn(90)).Add(time.Duration(-rand.Intn(24)) * time.Hour).Unix(),
			IpAddress:     fmt.Sprintf("192.168.%d.%d", rand.Intn(255), rand.Intn(255)),
			UserAgent:     userAgents[(docIdx+j)%len(userAgents)],
			SessionId:     fmt.Sprintf("sess-%08x", rand.Int31()),
			Success:       success,
			FailureReason: failureReason,
			Details:       fmt.Sprintf("Access log entry %d", docIdx*10+j+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return logs
}

// genDocAuditTrails generates embedded audit trail records for a document
func genDocAuditTrails(store *MockDataStore, docIdx int) []*doc.DocAuditTrail {
	count := 2 + docIdx%3 // 2-4 trails per document

	auditActions := []string{"created", "modified", "viewed", "approved", "shared"}

	trails := make([]*doc.DocAuditTrail, count)
	for j := 0; j < count; j++ {
		userID := pickRef(store.EmployeeIDs, docIdx*10+j)

		trails[j] = &doc.DocAuditTrail{
			TrailId:       genID("aud", docIdx*10+j),
			Action:        auditActions[(docIdx+j)%len(auditActions)],
			EntityType:    "document",
			EntityId:      genID("doc", docIdx),
			UserId:        userID,
			UserName:      fmt.Sprintf("User %d", docIdx*10+j+1),
			Timestamp:     time.Now().AddDate(0, 0, -rand.Intn(180)).Add(time.Duration(-rand.Intn(24)) * time.Hour).Unix(),
			OldValues:     fmt.Sprintf(`{"status": "old_%d"}`, docIdx*10+j),
			NewValues:     fmt.Sprintf(`{"status": "new_%d"}`, docIdx*10+j),
			ChangeSummary: fmt.Sprintf("Audit trail entry %d", docIdx*10+j+1),
			IpAddress:     fmt.Sprintf("192.168.%d.%d", rand.Intn(255), rand.Intn(255)),
			SessionId:     fmt.Sprintf("sess-%08x", rand.Int31()),
			AuditInfo:     createAuditInfo(),
		}
	}
	return trails
}
