/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package main

// Generates:
// - DocAttachment
// - DocTemplate
// - DocTemplateField
// - DocEmailCapture
// - DocScanJob

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/doc"
)

// generateDocAttachments creates attachment records
func generateDocAttachments(store *MockDataStore) []*doc.DocAttachment {
	count := 25

	entityTypes := []string{"SalesOrder", "Invoice", "Project", "Customer", "Vendor", "Employee"}
	modules := []string{"sales", "fin", "prj", "crm", "hcm"}
	relationshipTypes := []string{"primary", "supporting", "reference"}

	attachments := make([]*doc.DocAttachment, count)
	for i := 0; i < count; i++ {
		documentID := ""
		if len(store.DocDocumentIDs) > 0 {
			documentID = store.DocDocumentIDs[i%len(store.DocDocumentIDs)]
		}

		attachedBy := ""
		if len(store.EmployeeIDs) > 0 {
			attachedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		attachments[i] = &doc.DocAttachment{
			AttachmentId:     fmt.Sprintf("att-%03d", i+1),
			DocumentId:       documentID,
			EntityType:       entityTypes[i%len(entityTypes)],
			EntityId:         fmt.Sprintf("ent-%03d", i+1),
			Module:           modules[i%len(modules)],
			RelationshipType: relationshipTypes[i%len(relationshipTypes)],
			Description:      fmt.Sprintf("Attachment for %s entity", entityTypes[i%len(entityTypes)]),
			SortOrder:        int32(i + 1),
			AttachedBy:       attachedBy,
			AttachedDate:     time.Now().AddDate(0, 0, -rand.Intn(90)).Unix(),
			AuditInfo:        createAuditInfo(),
		}
	}
	return attachments
}

// generateDocTemplates creates template records
func generateDocTemplates(store *MockDataStore) []*doc.DocTemplate {
	count := 10

	templateTypes := []doc.DocTemplateType{
		doc.DocTemplateType_DOC_TEMPLATE_TYPE_DOCUMENT,
		doc.DocTemplateType_DOC_TEMPLATE_TYPE_DOCUMENT,
		doc.DocTemplateType_DOC_TEMPLATE_TYPE_EMAIL,
		doc.DocTemplateType_DOC_TEMPLATE_TYPE_FORM,
		doc.DocTemplateType_DOC_TEMPLATE_TYPE_REPORT,
		doc.DocTemplateType_DOC_TEMPLATE_TYPE_CONTRACT,
	}

	outputFormats := []doc.DocFileFormat{
		doc.DocFileFormat_DOC_FILE_FORMAT_PDF,
		doc.DocFileFormat_DOC_FILE_FORMAT_WORD,
		doc.DocFileFormat_DOC_FILE_FORMAT_HTML,
	}

	categories := []string{"Legal", "Financial", "HR", "Operations", "Marketing"}

	templates := make([]*doc.DocTemplate, count)
	for i := 0; i < count; i++ {
		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		templates[i] = &doc.DocTemplate{
			TemplateId:   fmt.Sprintf("tpl-%03d", i+1),
			Name:         docTemplateNames[i%len(docTemplateNames)],
			Description:  fmt.Sprintf("Template for %s", docTemplateNames[i%len(docTemplateNames)]),
			TemplateType: templateTypes[i%len(templateTypes)],
			Category:     categories[i%len(categories)],
			OutputFormat: outputFormats[i%len(outputFormats)],
			Content:      fmt.Sprintf("<template>Content for %s</template>", docTemplateNames[i%len(docTemplateNames)]),
			StoragePath:  fmt.Sprintf("/templates/%s/tpl-%03d", time.Now().Format("2006"), i+1),
			OwnerId:      ownerID,
			IsActive:     i < 8,
			IsSystem:     i < 2,
			Version:      int32(rand.Intn(10) + 1),
			LastUsedDate: time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
			UsageCount:   int32(rand.Intn(500) + 10),
			AuditInfo:    createAuditInfo(),
		}
	}
	return templates
}

// generateDocTemplateFields creates template field records
func generateDocTemplateFields(store *MockDataStore) []*doc.DocTemplateField {
	count := 30

	fieldTypes := []doc.DocFieldType{
		doc.DocFieldType_DOC_FIELD_TYPE_TEXT,
		doc.DocFieldType_DOC_FIELD_TYPE_TEXT,
		doc.DocFieldType_DOC_FIELD_TYPE_NUMBER,
		doc.DocFieldType_DOC_FIELD_TYPE_DATE,
		doc.DocFieldType_DOC_FIELD_TYPE_BOOLEAN,
		doc.DocFieldType_DOC_FIELD_TYPE_SELECT,
		doc.DocFieldType_DOC_FIELD_TYPE_REFERENCE,
	}

	fieldNames := []string{
		"Name", "Title", "Description", "Amount", "Date",
		"Status", "Category", "Reference", "Notes", "Quantity",
	}

	fields := make([]*doc.DocTemplateField, count)
	for i := 0; i < count; i++ {
		templateID := ""
		if len(store.DocTemplateIDs) > 0 {
			templateID = store.DocTemplateIDs[i%len(store.DocTemplateIDs)]
		}

		fieldType := fieldTypes[i%len(fieldTypes)]
		var defaultValue string
		switch fieldType {
		case doc.DocFieldType_DOC_FIELD_TYPE_TEXT:
			defaultValue = ""
		case doc.DocFieldType_DOC_FIELD_TYPE_NUMBER:
			defaultValue = "0"
		case doc.DocFieldType_DOC_FIELD_TYPE_BOOLEAN:
			defaultValue = "false"
		}

		fields[i] = &doc.DocTemplateField{
			FieldId:      fmt.Sprintf("fld-%03d", i+1),
			TemplateId:   templateID,
			Name:         fieldNames[i%len(fieldNames)],
			Label:        fieldNames[i%len(fieldNames)],
			Description:  fmt.Sprintf("Field for %s", fieldNames[i%len(fieldNames)]),
			FieldType:    fieldType,
			IsRequired:   i%3 == 0,
			DefaultValue: defaultValue,
			Placeholder:  fmt.Sprintf("Enter %s", fieldNames[i%len(fieldNames)]),
			SortOrder:    int32(i%10 + 1),
			AuditInfo:    createAuditInfo(),
		}
	}
	return fields
}

// generateDocEmailCaptures creates email capture records
func generateDocEmailCaptures(store *MockDataStore) []*doc.DocEmailCapture {
	count := 20

	captureStatuses := []doc.DocEmailCaptureStatus{
		doc.DocEmailCaptureStatus_DOC_EMAIL_CAPTURE_STATUS_RECEIVED,
		doc.DocEmailCaptureStatus_DOC_EMAIL_CAPTURE_STATUS_PROCESSED,
		doc.DocEmailCaptureStatus_DOC_EMAIL_CAPTURE_STATUS_PROCESSED,
		doc.DocEmailCaptureStatus_DOC_EMAIL_CAPTURE_STATUS_FILED,
		doc.DocEmailCaptureStatus_DOC_EMAIL_CAPTURE_STATUS_FILED,
		doc.DocEmailCaptureStatus_DOC_EMAIL_CAPTURE_STATUS_FAILED,
	}

	subjects := []string{
		"Invoice #12345", "Contract Amendment", "Purchase Order Confirmation",
		"Meeting Notes", "Project Update", "Quarterly Report",
		"Vendor Agreement", "Customer Request", "Legal Document",
	}

	emails := make([]*doc.DocEmailCapture, count)
	for i := 0; i < count; i++ {
		documentID := ""
		if len(store.DocDocumentIDs) > 0 {
			documentID = store.DocDocumentIDs[i%len(store.DocDocumentIDs)]
		}

		folderID := ""
		if len(store.DocFolderIDs) > 0 {
			folderID = store.DocFolderIDs[i%len(store.DocFolderIDs)]
		}

		processedBy := ""
		var processedDate int64
		status := captureStatuses[i%len(captureStatuses)]
		if status != doc.DocEmailCaptureStatus_DOC_EMAIL_CAPTURE_STATUS_RECEIVED && len(store.EmployeeIDs) > 0 {
			processedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
			processedDate = time.Now().AddDate(0, 0, -rand.Intn(30)).Unix()
		}

		emails[i] = &doc.DocEmailCapture{
			CaptureId:       fmt.Sprintf("eml-%03d", i+1),
			DocumentId:      documentID,
			Status:          status,
			FromAddress:     fmt.Sprintf("sender%d@external.com", i+1),
			ToAddresses:     "documents@company.com",
			CcAddresses:     "",
			Subject:         subjects[i%len(subjects)],
			BodyPreview:     fmt.Sprintf("Email body preview for %s...", subjects[i%len(subjects)]),
			ReceivedDate:    time.Now().AddDate(0, 0, -rand.Intn(60)).Unix(),
			ProcessedDate:   processedDate,
			FolderId:        folderID,
			ProcessedBy:     processedBy,
			AttachmentCount: int32(rand.Intn(5)),
			AuditInfo:       createAuditInfo(),
		}
	}
	return emails
}

// generateDocScanJobs creates scan job records
func generateDocScanJobs(store *MockDataStore) []*doc.DocScanJob {
	count := 15

	scanStatuses := []doc.DocScanStatus{
		doc.DocScanStatus_DOC_SCAN_STATUS_COMPLETED,
		doc.DocScanStatus_DOC_SCAN_STATUS_COMPLETED,
		doc.DocScanStatus_DOC_SCAN_STATUS_COMPLETED,
		doc.DocScanStatus_DOC_SCAN_STATUS_PROCESSING,
		doc.DocScanStatus_DOC_SCAN_STATUS_PENDING,
		doc.DocScanStatus_DOC_SCAN_STATUS_FAILED,
	}

	scannerIDs := []string{
		"SCANNER-MAIN", "SCANNER-RECEPTION", "SCANNER-FINANCE",
		"MFP-FLOOR1", "MFP-FLOOR2", "MOBILE-APP",
	}

	scanJobs := make([]*doc.DocScanJob, count)
	for i := 0; i < count; i++ {
		folderID := ""
		if len(store.DocFolderIDs) > 0 {
			folderID = store.DocFolderIDs[i%len(store.DocFolderIDs)]
		}

		categoryID := ""
		if len(store.DocCategoryIDs) > 0 {
			categoryID = store.DocCategoryIDs[i%len(store.DocCategoryIDs)]
		}

		initiatedBy := ""
		if len(store.EmployeeIDs) > 0 {
			initiatedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		status := scanStatuses[i%len(scanStatuses)]
		var completedDate int64
		var errorMessage string
		if status == doc.DocScanStatus_DOC_SCAN_STATUS_COMPLETED {
			completedDate = time.Now().AddDate(0, 0, -rand.Intn(30)).Unix()
		} else if status == doc.DocScanStatus_DOC_SCAN_STATUS_FAILED {
			errorMessage = "Scan failed: device offline"
		}

		scanJobs[i] = &doc.DocScanJob{
			ScanJobId:     fmt.Sprintf("scn-%03d", i+1),
			Name:          fmt.Sprintf("Scan Job %03d", i+1),
			Status:        status,
			ScannerId:     scannerIDs[i%len(scannerIDs)],
			FolderId:      folderID,
			CategoryId:    categoryID,
			PageCount:     int32(rand.Intn(50) + 1),
			DocumentCount: int32(rand.Intn(5) + 1),
			InitiatedBy:   initiatedBy,
			InitiatedDate: time.Now().AddDate(0, 0, -rand.Intn(60)).Unix(),
			CompletedDate: completedDate,
			OcrEnabled:    i%2 == 0,
			OcrLanguage:   "en",
			ErrorMessage:  errorMessage,
			AuditInfo:     createAuditInfo(),
		}
	}
	return scanJobs
}
