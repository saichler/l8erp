/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package main

// Generates:
// - DocFolder
// - DocCategory
// - DocTag
// - DocDocument
// - DocDocumentVersion

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
		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		departmentID := ""
		if len(store.DepartmentIDs) > 0 {
			departmentID = store.DepartmentIDs[i%len(store.DepartmentIDs)]
		}

		parentFolderID := ""
		if i > 3 && len(store.DocFolderIDs) > 0 {
			parentFolderID = store.DocFolderIDs[i%len(store.DocFolderIDs)]
		}

		folders[i] = &doc.DocFolder{
			FolderId:       fmt.Sprintf("fld-%03d", i+1),
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

		retentionPolicyID := ""
		if len(store.DocRetentionPolicyIDs) > 0 {
			retentionPolicyID = store.DocRetentionPolicyIDs[i%len(store.DocRetentionPolicyIDs)]
		}

		categories[i] = &doc.DocCategory{
			CategoryId:        fmt.Sprintf("cat-%03d", i+1),
			Name:              docCategoryNames[i%len(docCategoryNames)],
			Description:       fmt.Sprintf("Category for %s documents", docCategoryNames[i%len(docCategoryNames)]),
			ParentCategoryId:  parentCategoryID,
			Code:              fmt.Sprintf("CAT%03d", i+1),
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
			TagId:       fmt.Sprintf("tag-%03d", i+1),
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

// generateDocDocuments creates document records
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

	documents := make([]*doc.DocDocument, count)
	for i := 0; i < count; i++ {
		folderID := ""
		if len(store.DocFolderIDs) > 0 {
			folderID = store.DocFolderIDs[i%len(store.DocFolderIDs)]
		}

		categoryID := ""
		if len(store.DocCategoryIDs) > 0 {
			categoryID = store.DocCategoryIDs[i%len(store.DocCategoryIDs)]
		}

		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		fileFormat := fileFormats[i%len(fileFormats)]
		ext := map[doc.DocFileFormat]string{
			doc.DocFileFormat_DOC_FILE_FORMAT_PDF:        "pdf",
			doc.DocFileFormat_DOC_FILE_FORMAT_WORD:       "docx",
			doc.DocFileFormat_DOC_FILE_FORMAT_EXCEL:      "xlsx",
			doc.DocFileFormat_DOC_FILE_FORMAT_POWERPOINT: "pptx",
		}

		documents[i] = &doc.DocDocument{
			DocumentId:     fmt.Sprintf("doc-%03d", i+1),
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
		}
	}
	return documents
}

// generateDocDocumentVersions creates document version records
func generateDocDocumentVersions(store *MockDataStore) []*doc.DocDocumentVersion {
	count := 30

	fileExtensions := []string{"pdf", "docx", "xlsx", "pptx"}

	versions := make([]*doc.DocDocumentVersion, count)
	for i := 0; i < count; i++ {
		documentID := ""
		if len(store.DocDocumentIDs) > 0 {
			documentID = store.DocDocumentIDs[i%len(store.DocDocumentIDs)]
		}

		createdBy := ""
		if len(store.EmployeeIDs) > 0 {
			createdBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		versionNum := (i % 5) + 1
		ext := fileExtensions[i%len(fileExtensions)]

		versions[i] = &doc.DocDocumentVersion{
			VersionId:      fmt.Sprintf("ver-%03d", i+1),
			DocumentId:     documentID,
			VersionNumber:  int32(versionNum),
			ChangeNotes:    fmt.Sprintf("Version %d changes and updates", versionNum),
			FileName:       fmt.Sprintf("document_v%d.%s", versionNum, ext),
			FileSize:       int64(rand.Intn(5000000) + 50000),
			StoragePath:    fmt.Sprintf("/storage/versions/%s/ver-%03d", time.Now().Format("2006/01"), i+1),
			Checksum:       fmt.Sprintf("sha256-%08x%08x", rand.Int31(), rand.Int31()),
			IsMajorVersion: versionNum == 1 || i%3 == 0,
			CreatedBy:      createdBy,
			CreatedDate:    time.Now().AddDate(0, 0, -rand.Intn(180)).Unix(),
			AuditInfo:      createAuditInfo(),
		}
	}
	return versions
}
