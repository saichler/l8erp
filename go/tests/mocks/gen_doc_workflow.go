/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

// Generates:
// - DocApprovalWorkflow (with embedded steps)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/doc"
)

// generateDocApprovalWorkflows creates approval workflow records with embedded steps
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

		totalSteps := int32(rand.Intn(5) + 2)

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
			TotalSteps:    totalSteps,
			Comments:      fmt.Sprintf("Workflow %d comments and notes", i+1),
			AuditInfo:     createAuditInfo(),
			Steps:         genDocWorkflowSteps(store, i, int(totalSteps)),
		}
	}
	return workflows
}

// genDocWorkflowSteps generates embedded workflow step records
func genDocWorkflowSteps(store *MockDataStore, wfIdx int, stepCount int) []*doc.DocWorkflowStep {
	stepStatuses := []doc.DocStepStatus{
		doc.DocStepStatus_DOC_STEP_STATUS_APPROVED,
		doc.DocStepStatus_DOC_STEP_STATUS_APPROVED,
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

	steps := make([]*doc.DocWorkflowStep, stepCount)
	for j := 0; j < stepCount; j++ {
		assigneeID := pickRef(store.EmployeeIDs, wfIdx*10+j)
		status := stepStatuses[(wfIdx+j)%len(stepStatuses)]

		completedBy := ""
		var completedDate int64
		actionTaken := ""
		if status == doc.DocStepStatus_DOC_STEP_STATUS_APPROVED {
			if len(store.EmployeeIDs) > 0 {
				completedBy = store.EmployeeIDs[(wfIdx+j+1)%len(store.EmployeeIDs)]
			}
			completedDate = time.Now().AddDate(0, 0, -rand.Intn(30)).Unix()
			actionTaken = actionsTaken[(wfIdx+j)%len(actionsTaken)]
		}

		steps[j] = &doc.DocWorkflowStep{
			StepId:        genID("stp", wfIdx*10+j),
			StepNumber:    int32(j + 1),
			Name:          stepNames[(wfIdx+j)%len(stepNames)],
			Description:   fmt.Sprintf("Step: %s", stepNames[(wfIdx+j)%len(stepNames)]),
			Status:        status,
			AssigneeId:    assigneeID,
			DueDate:       time.Now().AddDate(0, 0, rand.Intn(14)+1).Unix(),
			CompletedDate: completedDate,
			CompletedBy:   completedBy,
			ActionTaken:   actionTaken,
			Comments:      fmt.Sprintf("Step %d comments", j+1),
			IsRequired:    j%3 == 0,
			AuditInfo:     createAuditInfo(),
		}
	}
	return steps
}
