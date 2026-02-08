/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

// Generates:
// - DocCheckout
// - DocApprovalWorkflow
// - DocWorkflowStep
// - DocSignature
// - DocReviewComment

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/doc"
)

// generateDocCheckouts creates checkout records
func generateDocCheckouts(store *MockDataStore) []*doc.DocCheckout {
	count := 15

	checkoutStatuses := []doc.DocCheckoutStatus{
		doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_OUT,
		doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_OUT,
		doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_IN,
		doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_IN,
		doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_IN,
		doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CANCELLED,
	}

	checkouts := make([]*doc.DocCheckout, count)
	for i := 0; i < count; i++ {
		documentID := pickRef(store.DocDocumentIDs, i)

		versionID := pickRef(store.DocVersionIDs, i)

		checkedOutBy := pickRef(store.EmployeeIDs, i)

		checkoutDate := time.Now().AddDate(0, 0, -rand.Intn(30))
		var checkinDate int64
		status := checkoutStatuses[i%len(checkoutStatuses)]
		if status == doc.DocCheckoutStatus_DOC_CHECKOUT_STATUS_CHECKED_IN {
			checkinDate = checkoutDate.Add(time.Duration(rand.Intn(72)) * time.Hour).Unix()
		}

		checkouts[i] = &doc.DocCheckout{
			CheckoutId:    genID("chk", i),
			DocumentId:    documentID,
			VersionId:     versionID,
			Status:        status,
			CheckedOutBy:  checkedOutBy,
			CheckoutDate:  checkoutDate.Unix(),
			CheckinDate:   checkinDate,
			CheckoutNotes: fmt.Sprintf("Editing document for review - checkout %d", i+1),
			CheckinNotes:  "Completed review and edits",
			AuditInfo:     createAuditInfo(),
		}
	}
	return checkouts
}

// generateDocApprovalWorkflows creates approval workflow records
func generateDocApprovalWorkflows(store *MockDataStore) []*doc.DocApprovalWorkflow {
	count := 10

	workflowStatuses := []doc.DocWorkflowStatus{
		doc.DocWorkflowStatus_DOC_WORKFLOW_STATUS_ACTIVE,
		doc.DocWorkflowStatus_DOC_WORKFLOW_STATUS_ACTIVE,
		doc.DocWorkflowStatus_DOC_WORKFLOW_STATUS_ACTIVE,
		doc.DocWorkflowStatus_DOC_WORKFLOW_STATUS_COMPLETED,
		doc.DocWorkflowStatus_DOC_WORKFLOW_STATUS_COMPLETED,
		doc.DocWorkflowStatus_DOC_WORKFLOW_STATUS_DRAFT,
		doc.DocWorkflowStatus_DOC_WORKFLOW_STATUS_CANCELLED,
	}

	workflows := make([]*doc.DocApprovalWorkflow, count)
	for i := 0; i < count; i++ {
		documentID := pickRef(store.DocDocumentIDs, i)

		initiatedBy := pickRef(store.EmployeeIDs, i)

		initiatedDate := time.Now().AddDate(0, 0, -rand.Intn(60))
		var completedDate int64
		status := workflowStatuses[i%len(workflowStatuses)]
		if status == doc.DocWorkflowStatus_DOC_WORKFLOW_STATUS_COMPLETED {
			completedDate = initiatedDate.Add(time.Duration(rand.Intn(168)) * time.Hour).Unix()
		}

		workflows[i] = &doc.DocApprovalWorkflow{
			WorkflowId:    genID("wfl", i),
			Name:          docWorkflowNames[i%len(docWorkflowNames)],
			Description:   fmt.Sprintf("Workflow for %s", docWorkflowNames[i%len(docWorkflowNames)]),
			DocumentId:    documentID,
			Status:        status,
			InitiatedBy:   initiatedBy,
			InitiatedDate: initiatedDate.Unix(),
			CompletedDate: completedDate,
			CurrentStep:   int32(rand.Intn(3) + 1),
			TotalSteps:    int32(rand.Intn(5) + 2),
			Comments:      fmt.Sprintf("Workflow %d comments and notes", i+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return workflows
}

// generateDocWorkflowSteps creates workflow step records
func generateDocWorkflowSteps(store *MockDataStore) []*doc.DocWorkflowStep {
	count := 25

	stepStatuses := []doc.DocStepStatus{
		doc.DocStepStatus_DOC_STEP_STATUS_APPROVED,
		doc.DocStepStatus_DOC_STEP_STATUS_APPROVED,
		doc.DocStepStatus_DOC_STEP_STATUS_APPROVED,
		doc.DocStepStatus_DOC_STEP_STATUS_PENDING,
		doc.DocStepStatus_DOC_STEP_STATUS_PENDING,
		doc.DocStepStatus_DOC_STEP_STATUS_IN_PROGRESS,
		doc.DocStepStatus_DOC_STEP_STATUS_REJECTED,
	}

	stepNames := []string{
		"Initial Review", "Manager Approval", "Legal Review",
		"Executive Sign-off", "Final Approval", "Notification",
	}

	actionsTaken := []string{
		"Approved", "Approved with comments", "Reviewed", "Signed", "Acknowledged",
	}

	steps := make([]*doc.DocWorkflowStep, count)
	for i := 0; i < count; i++ {
		workflowID := pickRef(store.DocApprovalWorkflowIDs, i)

		assigneeID := pickRef(store.EmployeeIDs, i)

		completedBy := ""
		status := stepStatuses[i%len(stepStatuses)]
		var completedDate int64
		actionTaken := ""
		if status == doc.DocStepStatus_DOC_STEP_STATUS_APPROVED {
			if len(store.EmployeeIDs) > 0 {
				completedBy = store.EmployeeIDs[(i+1)%len(store.EmployeeIDs)]
			}
			completedDate = time.Now().AddDate(0, 0, -rand.Intn(30)).Unix()
			actionTaken = actionsTaken[i%len(actionsTaken)]
		}

		steps[i] = &doc.DocWorkflowStep{
			StepId:        genID("stp", i),
			WorkflowId:    workflowID,
			StepNumber:    int32((i % 5) + 1),
			Name:          stepNames[i%len(stepNames)],
			Description:   fmt.Sprintf("Step: %s", stepNames[i%len(stepNames)]),
			Status:        status,
			AssigneeId:    assigneeID,
			DueDate:       time.Now().AddDate(0, 0, rand.Intn(14)+1).Unix(),
			CompletedDate: completedDate,
			CompletedBy:   completedBy,
			ActionTaken:   actionTaken,
			Comments:      fmt.Sprintf("Step %d comments", i+1),
			IsRequired:    i%3 == 0,
			AuditInfo:     createAuditInfo(),
		}
	}
	return steps
}

// generateDocSignatures creates signature records
func generateDocSignatures(store *MockDataStore) []*doc.DocSignature {
	count := 20

	signatureStatuses := []doc.DocSignatureStatus{
		doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_SIGNED,
		doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_SIGNED,
		doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_SIGNED,
		doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_PENDING,
		doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_PENDING,
		doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_DECLINED,
	}

	signatureTypes := []doc.DocSignatureType{
		doc.DocSignatureType_DOC_SIGNATURE_TYPE_ELECTRONIC,
		doc.DocSignatureType_DOC_SIGNATURE_TYPE_ELECTRONIC,
		doc.DocSignatureType_DOC_SIGNATURE_TYPE_DIGITAL,
		doc.DocSignatureType_DOC_SIGNATURE_TYPE_HANDWRITTEN,
	}

	signerNames := []string{
		"John Smith", "Jane Doe", "Robert Johnson", "Emily Williams",
		"Michael Brown", "Sarah Davis", "David Wilson", "Lisa Anderson",
	}

	signatures := make([]*doc.DocSignature, count)
	for i := 0; i < count; i++ {
		documentID := pickRef(store.DocDocumentIDs, i)

		versionID := pickRef(store.DocVersionIDs, i)

		signerID := pickRef(store.EmployeeIDs, i)

		signerName := signerNames[i%len(signerNames)]
		status := signatureStatuses[i%len(signatureStatuses)]
		requestedDate := time.Now().AddDate(0, 0, -rand.Intn(90))
		var signedDate int64
		if status == doc.DocSignatureStatus_DOC_SIGNATURE_STATUS_SIGNED {
			signedDate = requestedDate.Add(time.Duration(rand.Intn(168)) * time.Hour).Unix()
		}

		signatures[i] = &doc.DocSignature{
			SignatureId:   genID("sig", i),
			DocumentId:    documentID,
			VersionId:     versionID,
			SignatureType: signatureTypes[i%len(signatureTypes)],
			Status:        status,
			SignerId:      signerID,
			SignerName:    signerName,
			SignerEmail:   fmt.Sprintf("%s@company.com", signerName[:4]),
			RequestedDate: requestedDate.Unix(),
			SignedDate:    signedDate,
			ExpiryDate:    time.Now().AddDate(1, 0, 0).Unix(),
			SignatureData: fmt.Sprintf("sig_data_%03d", i+1),
			CertificateId: fmt.Sprintf("cert-%08x", rand.Int31()),
			IpAddress:     fmt.Sprintf("192.168.1.%d", rand.Intn(255)),
			Reason:        "Document approval signature",
			AuditInfo:     createAuditInfo(),
		}
	}
	return signatures
}

// generateDocReviewComments creates review comment records
func generateDocReviewComments(store *MockDataStore) []*doc.DocReviewComment {
	count := 30

	commentTexts := []string{
		"Please review this section for accuracy",
		"Suggest rephrasing for clarity",
		"Question about the data in this paragraph",
		"Minor typo needs correction",
		"This section needs more detail",
		"Approved as written",
		"Consider adding a diagram here",
		"Reference needs updating",
	}

	comments := make([]*doc.DocReviewComment, count)
	for i := 0; i < count; i++ {
		documentID := pickRef(store.DocDocumentIDs, i)

		versionID := pickRef(store.DocVersionIDs, i)

		workflowID := pickRef(store.DocApprovalWorkflowIDs, i)

		authorID := pickRef(store.EmployeeIDs, i)

		resolvedBy := ""
		var resolvedDate int64
		isResolved := i%3 == 0
		if isResolved && len(store.EmployeeIDs) > 0 {
			resolvedBy = store.EmployeeIDs[(i+1)%len(store.EmployeeIDs)]
			resolvedDate = time.Now().AddDate(0, 0, -rand.Intn(14)).Unix()
		}

		parentCommentID := ""
		if i > 10 && i%4 == 0 && len(store.DocReviewCommentIDs) > 0 {
			parentCommentID = store.DocReviewCommentIDs[(i-10)%len(store.DocReviewCommentIDs)]
		}

		comments[i] = &doc.DocReviewComment{
			CommentId:       genID("cmt", i),
			DocumentId:      documentID,
			VersionId:       versionID,
			WorkflowId:      workflowID,
			ParentCommentId: parentCommentID,
			AuthorId:        authorID,
			Content:         commentTexts[i%len(commentTexts)],
			PageNumber:      int32(rand.Intn(20) + 1),
			Position:        fmt.Sprintf("{\"x\": %d, \"y\": %d}", rand.Intn(500)+100, rand.Intn(700)+100),
			IsResolved:      isResolved,
			ResolvedBy:      resolvedBy,
			ResolvedDate:    resolvedDate,
			CreatedDate:     time.Now().AddDate(0, 0, -rand.Intn(60)).Unix(),
			AuditInfo:       createAuditInfo(),
		}
	}
	return comments
}
