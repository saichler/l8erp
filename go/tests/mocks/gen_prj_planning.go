/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package main

// gen_prj_planning.go
// Generates:
// - PrjProject
// - PrjPhase
// - PrjTask
// - PrjMilestone
// - PrjDeliverable
// - PrjDependency
// - PrjRisk

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/prj"
)

// generateProjects creates project records
func generateProjects(store *MockDataStore) []*prj.PrjProject {
	count := 15
	projects := make([]*prj.PrjProject, count)

	projectTypes := []prj.PrjProjectType{
		prj.PrjProjectType_PRJ_PROJECT_TYPE_INTERNAL,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_CLIENT,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_FIXED_PRICE,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_TIME_AND_MATERIALS,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_RETAINER,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_CAPITAL,
	}

	billingTypes := []prj.PrjBillingType{
		prj.PrjBillingType_PRJ_BILLING_TYPE_FIXED_PRICE,
		prj.PrjBillingType_PRJ_BILLING_TYPE_TIME_AND_MATERIALS,
		prj.PrjBillingType_PRJ_BILLING_TYPE_MILESTONE,
		prj.PrjBillingType_PRJ_BILLING_TYPE_RETAINER,
		prj.PrjBillingType_PRJ_BILLING_TYPE_NOT_BILLABLE,
	}

	priorities := []prj.PrjProjectPriority{
		prj.PrjProjectPriority_PRJ_PROJECT_PRIORITY_LOW,
		prj.PrjProjectPriority_PRJ_PROJECT_PRIORITY_MEDIUM,
		prj.PrjProjectPriority_PRJ_PROJECT_PRIORITY_HIGH,
		prj.PrjProjectPriority_PRJ_PROJECT_PRIORITY_CRITICAL,
	}

	for i := 0; i < count; i++ {
		// Cross-module references
		customerID := ""
		if len(store.CustomerIDs) > 0 {
			customerID = store.CustomerIDs[i%len(store.CustomerIDs)]
		}
		accountID := ""
		if len(store.CrmAccountIDs) > 0 {
			accountID = store.CrmAccountIDs[i%len(store.CrmAccountIDs)]
		}
		managerID := ""
		if len(store.ManagerIDs) > 0 {
			managerID = store.ManagerIDs[i%len(store.ManagerIDs)]
		}
		departmentID := ""
		if len(store.DepartmentIDs) > 0 {
			departmentID = store.DepartmentIDs[i%len(store.DepartmentIDs)]
		}
		templateID := ""
		if len(store.PrjProjectTemplateIDs) > 0 {
			templateID = store.PrjProjectTemplateIDs[i%len(store.PrjProjectTemplateIDs)]
		}

		// Dates
		startDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(30))
		endDate := startDate.AddDate(0, rand.Intn(6)+3, rand.Intn(30))

		// Hours and completion
		estimatedHours := float64(rand.Intn(1000) + 200)
		percentComplete := int32(rand.Intn(100))
		actualHours := estimatedHours * (float64(percentComplete) / 100) * (0.9 + rand.Float64()*0.3)

		// Budget and cost
		budgetAmount := int64(rand.Intn(500000) + 50000)
		actualCost := int64(float64(budgetAmount) * (float64(percentComplete) / 100) * (0.85 + rand.Float64()*0.35))

		// Status distribution: 10% Draft, 15% Planned, 50% In Progress, 5% On Hold, 15% Completed, 5% Cancelled
		var status prj.PrjProjectStatus
		if i < count*10/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_DRAFT
		} else if i < count*25/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_PLANNED
		} else if i < count*75/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_IN_PROGRESS
		} else if i < count*80/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_ON_HOLD
		} else if i < count*95/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_COMPLETED
		} else {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_CANCELLED
		}

		// Priority distribution: 20% Low, 40% Medium, 30% High, 10% Critical
		var priority prj.PrjProjectPriority
		if i < count*2/10 {
			priority = priorities[0]
		} else if i < count*6/10 {
			priority = priorities[1]
		} else if i < count*9/10 {
			priority = priorities[2]
		} else {
			priority = priorities[3]
		}

		projects[i] = &prj.PrjProject{
			ProjectId:       fmt.Sprintf("prj-%03d", i+1),
			Code:            fmt.Sprintf("PRJ-%04d", 1000+i+1),
			Name:            prjProjectNames[i%len(prjProjectNames)],
			Description:     fmt.Sprintf("Description for project: %s", prjProjectNames[i%len(prjProjectNames)]),
			ProjectType:     projectTypes[i%len(projectTypes)],
			Status:          status,
			Priority:        priority,
			CustomerId:      customerID,
			AccountId:       accountID,
			ManagerId:       managerID,
			DepartmentId:    departmentID,
			TemplateId:      templateID,
			StartDate:       startDate.Unix(),
			EndDate:         endDate.Unix(),
			EstimatedHours:  estimatedHours,
			ActualHours:     actualHours,
			Budget:          &erp.Money{Amount: budgetAmount, CurrencyCode: "USD"},
			ActualCost:      &erp.Money{Amount: actualCost, CurrencyCode: "USD"},
			PercentComplete: percentComplete,
			BillingType:     billingTypes[i%len(billingTypes)],
			AuditInfo:       createAuditInfo(),
		}
	}
	return projects
}

// generatePhases creates project phase records
func generatePhases(store *MockDataStore) []*prj.PrjPhase {
	count := 50
	phases := make([]*prj.PrjPhase, count)

	for i := 0; i < count; i++ {
		// Reference to project (distribute phases across projects)
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		// Sequence within project (roughly 3-4 phases per project)
		sequence := int32((i % 4) + 1)

		// Dates based on sequence
		startDate := time.Now().AddDate(0, -3, 0).Add(time.Duration(sequence-1) * 30 * 24 * time.Hour)
		endDate := startDate.Add(30 * 24 * time.Hour)

		// Hours
		estimatedHours := float64(rand.Intn(200) + 50)
		percentComplete := int32(rand.Intn(100))
		actualHours := estimatedHours * (float64(percentComplete) / 100) * (0.9 + rand.Float64()*0.2)

		// Status distribution: 15% Draft, 20% Planned, 40% In Progress, 5% On Hold, 18% Completed, 2% Cancelled
		var status prj.PrjProjectStatus
		if i < count*15/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_DRAFT
		} else if i < count*35/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_PLANNED
		} else if i < count*75/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_IN_PROGRESS
		} else if i < count*80/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_ON_HOLD
		} else if i < count*98/100 {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_COMPLETED
		} else {
			status = prj.PrjProjectStatus_PRJ_PROJECT_STATUS_CANCELLED
		}

		phases[i] = &prj.PrjPhase{
			PhaseId:         fmt.Sprintf("phase-%03d", i+1),
			ProjectId:       projectID,
			Name:            prjPhaseNames[i%len(prjPhaseNames)],
			Description:     fmt.Sprintf("Phase: %s", prjPhaseNames[i%len(prjPhaseNames)]),
			Sequence:        sequence,
			StartDate:       startDate.Unix(),
			EndDate:         endDate.Unix(),
			EstimatedHours:  estimatedHours,
			ActualHours:     actualHours,
			PercentComplete: percentComplete,
			Status:          status,
			AuditInfo:       createAuditInfo(),
		}
	}
	return phases
}

// generateTasks creates project task records
func generateTasks(store *MockDataStore) []*prj.PrjTask {
	count := 100
	tasks := make([]*prj.PrjTask, count)

	priorities := []prj.PrjTaskPriority{
		prj.PrjTaskPriority_PRJ_TASK_PRIORITY_LOW,
		prj.PrjTaskPriority_PRJ_TASK_PRIORITY_MEDIUM,
		prj.PrjTaskPriority_PRJ_TASK_PRIORITY_HIGH,
		prj.PrjTaskPriority_PRJ_TASK_PRIORITY_CRITICAL,
	}

	for i := 0; i < count; i++ {
		// References
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}
		phaseID := ""
		if len(store.PrjPhaseIDs) > 0 {
			phaseID = store.PrjPhaseIDs[i%len(store.PrjPhaseIDs)]
		}
		assigneeID := ""
		if len(store.EmployeeIDs) > 0 {
			assigneeID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		// Dates
		startDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(30))
		dueDate := startDate.AddDate(0, 0, rand.Intn(14)+7)

		// Hours
		estimatedHours := float64(rand.Intn(40) + 4)
		percentComplete := int32(rand.Intn(100))
		actualHours := estimatedHours * (float64(percentComplete) / 100) * (0.8 + rand.Float64()*0.4)
		remainingHours := estimatedHours - actualHours
		if remainingHours < 0 {
			remainingHours = 0
		}

		// Status distribution: 20% Not Started, 45% In Progress, 5% On Hold, 28% Completed, 2% Cancelled
		var status prj.PrjTaskStatus
		if i < count*20/100 {
			status = prj.PrjTaskStatus_PRJ_TASK_STATUS_NOT_STARTED
		} else if i < count*65/100 {
			status = prj.PrjTaskStatus_PRJ_TASK_STATUS_IN_PROGRESS
		} else if i < count*70/100 {
			status = prj.PrjTaskStatus_PRJ_TASK_STATUS_ON_HOLD
		} else if i < count*98/100 {
			status = prj.PrjTaskStatus_PRJ_TASK_STATUS_COMPLETED
		} else {
			status = prj.PrjTaskStatus_PRJ_TASK_STATUS_CANCELLED
		}

		// Priority distribution: 25% Low, 40% Medium, 25% High, 10% Critical
		var priority prj.PrjTaskPriority
		if i < count*25/100 {
			priority = priorities[0]
		} else if i < count*65/100 {
			priority = priorities[1]
		} else if i < count*90/100 {
			priority = priorities[2]
		} else {
			priority = priorities[3]
		}

		// WBS code
		wbsCode := fmt.Sprintf("%d.%d.%d", (i%15)+1, (i%4)+1, (i%10)+1)

		tasks[i] = &prj.PrjTask{
			TaskId:          fmt.Sprintf("task-%03d", i+1),
			ProjectId:       projectID,
			PhaseId:         phaseID,
			WbsCode:         wbsCode,
			Name:            prjTaskNames[i%len(prjTaskNames)],
			Description:     fmt.Sprintf("Task: %s", prjTaskNames[i%len(prjTaskNames)]),
			Status:          status,
			Priority:        priority,
			AssigneeId:      assigneeID,
			StartDate:       startDate.Unix(),
			DueDate:         dueDate.Unix(),
			EstimatedHours:  estimatedHours,
			ActualHours:     actualHours,
			RemainingHours:  remainingHours,
			PercentComplete: percentComplete,
			IsBillable:      i%3 != 0,
			IsMilestone:     i%10 == 0,
			AuditInfo:       createAuditInfo(),
		}
	}
	return tasks
}

// generateMilestones creates project milestone records
func generateMilestones(store *MockDataStore) []*prj.PrjMilestone {
	count := 45
	milestones := make([]*prj.PrjMilestone, count)

	for i := 0; i < count; i++ {
		// References
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}
		phaseID := ""
		if len(store.PrjPhaseIDs) > 0 {
			phaseID = store.PrjPhaseIDs[i%len(store.PrjPhaseIDs)]
		}
		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		// Dates
		targetDate := time.Now().AddDate(0, 0, rand.Intn(90)-30)
		actualDate := int64(0)

		// Status distribution: 30% Pending, 45% Achieved, 15% Missed, 10% At Risk
		var status prj.PrjMilestoneStatus
		if i < count*30/100 {
			status = prj.PrjMilestoneStatus_PRJ_MILESTONE_STATUS_PENDING
		} else if i < count*75/100 {
			status = prj.PrjMilestoneStatus_PRJ_MILESTONE_STATUS_ACHIEVED
			actualDate = targetDate.AddDate(0, 0, rand.Intn(5)-2).Unix()
		} else if i < count*90/100 {
			status = prj.PrjMilestoneStatus_PRJ_MILESTONE_STATUS_MISSED
			actualDate = targetDate.AddDate(0, 0, rand.Intn(14)+1).Unix()
		} else {
			status = prj.PrjMilestoneStatus_PRJ_MILESTONE_STATUS_AT_RISK
		}

		// Billing
		isBillable := i%3 == 0
		var billingAmount *erp.Money
		if isBillable {
			billingAmount = &erp.Money{Amount: int64(rand.Intn(50000) + 5000), CurrencyCode: "USD"}
		}

		milestones[i] = &prj.PrjMilestone{
			MilestoneId:   fmt.Sprintf("mlstn-%03d", i+1),
			ProjectId:     projectID,
			PhaseId:       phaseID,
			Name:          prjMilestoneNames[i%len(prjMilestoneNames)],
			Description:   fmt.Sprintf("Milestone: %s", prjMilestoneNames[i%len(prjMilestoneNames)]),
			TargetDate:    targetDate.Unix(),
			ActualDate:    actualDate,
			Status:        status,
			IsBillable:    isBillable,
			BillingAmount: billingAmount,
			OwnerId:       ownerID,
			AuditInfo:     createAuditInfo(),
		}
	}
	return milestones
}

// generateDeliverables creates project deliverable records
func generateDeliverables(store *MockDataStore) []*prj.PrjDeliverable {
	count := 45
	deliverables := make([]*prj.PrjDeliverable, count)

	for i := 0; i < count; i++ {
		// References
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}
		milestoneID := ""
		if len(store.PrjMilestoneIDs) > 0 {
			milestoneID = store.PrjMilestoneIDs[i%len(store.PrjMilestoneIDs)]
		}
		taskID := ""
		if len(store.PrjTaskIDs) > 0 {
			taskID = store.PrjTaskIDs[i%len(store.PrjTaskIDs)]
		}
		acceptedBy := ""
		if len(store.EmployeeIDs) > 0 {
			acceptedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		// Dates
		dueDate := time.Now().AddDate(0, 0, rand.Intn(60)-15)

		// Delivery status distribution: 40% not delivered, 60% delivered
		isDelivered := i >= count*40/100
		deliveredDate := int64(0)
		acceptanceDate := int64(0)
		if isDelivered {
			deliveredDate = dueDate.AddDate(0, 0, rand.Intn(7)-3).Unix()
			// 80% of delivered items are accepted
			if i < count*88/100 {
				acceptanceDate = deliveredDate + int64(rand.Intn(5)*24*3600)
			} else {
				acceptedBy = "" // Not yet accepted
			}
		}

		deliverables[i] = &prj.PrjDeliverable{
			DeliverableId:  fmt.Sprintf("dlvrbl-%03d", i+1),
			ProjectId:      projectID,
			MilestoneId:    milestoneID,
			TaskId:         taskID,
			Name:           prjDeliverableNames[i%len(prjDeliverableNames)],
			Description:    fmt.Sprintf("Deliverable: %s", prjDeliverableNames[i%len(prjDeliverableNames)]),
			DueDate:        dueDate.Unix(),
			IsDelivered:    isDelivered,
			DeliveredDate:  deliveredDate,
			AcceptedBy:     acceptedBy,
			AcceptanceDate: acceptanceDate,
			Notes:          fmt.Sprintf("Notes for deliverable %d", i+1),
			AuditInfo:      createAuditInfo(),
		}
	}
	return deliverables
}

// generateDependencies creates task dependency records
func generateDependencies(store *MockDataStore) []*prj.PrjDependency {
	count := 50
	dependencies := make([]*prj.PrjDependency, count)

	dependencyTypes := []prj.PrjDependencyType{
		prj.PrjDependencyType_PRJ_DEPENDENCY_TYPE_FINISH_TO_START,
		prj.PrjDependencyType_PRJ_DEPENDENCY_TYPE_START_TO_START,
		prj.PrjDependencyType_PRJ_DEPENDENCY_TYPE_FINISH_TO_FINISH,
		prj.PrjDependencyType_PRJ_DEPENDENCY_TYPE_START_TO_FINISH,
	}

	for i := 0; i < count; i++ {
		// Reference to project
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}

		// Task references (ensure different tasks)
		predecessorTaskID := ""
		successorTaskID := ""
		if len(store.PrjTaskIDs) > 1 {
			predecessorIdx := i % len(store.PrjTaskIDs)
			successorIdx := (i + 1) % len(store.PrjTaskIDs)
			predecessorTaskID = store.PrjTaskIDs[predecessorIdx]
			successorTaskID = store.PrjTaskIDs[successorIdx]
		}

		// Dependency type distribution: 70% Finish-to-Start, 15% Start-to-Start, 10% Finish-to-Finish, 5% Start-to-Finish
		var depType prj.PrjDependencyType
		if i < count*70/100 {
			depType = dependencyTypes[0]
		} else if i < count*85/100 {
			depType = dependencyTypes[1]
		} else if i < count*95/100 {
			depType = dependencyTypes[2]
		} else {
			depType = dependencyTypes[3]
		}

		// Lag days (most are 0, some have positive lag)
		lagDays := int32(0)
		if i%5 == 0 {
			lagDays = int32(rand.Intn(5) + 1)
		}

		dependencies[i] = &prj.PrjDependency{
			DependencyId:      fmt.Sprintf("dep-%03d", i+1),
			ProjectId:         projectID,
			PredecessorTaskId: predecessorTaskID,
			SuccessorTaskId:   successorTaskID,
			DependencyType:    depType,
			LagDays:           lagDays,
			AuditInfo:         createAuditInfo(),
		}
	}
	return dependencies
}

// generateRisks creates project risk records
func generateRisks(store *MockDataStore) []*prj.PrjRisk {
	count := 30
	risks := make([]*prj.PrjRisk, count)

	riskCategories := []string{"Technical", "Resource", "Schedule", "Budget", "External", "Organizational"}

	severities := []prj.PrjRiskSeverity{
		prj.PrjRiskSeverity_PRJ_RISK_SEVERITY_LOW,
		prj.PrjRiskSeverity_PRJ_RISK_SEVERITY_MEDIUM,
		prj.PrjRiskSeverity_PRJ_RISK_SEVERITY_HIGH,
		prj.PrjRiskSeverity_PRJ_RISK_SEVERITY_CRITICAL,
	}

	mitigationPlans := []string{
		"Monitor closely and escalate if needed",
		"Implement backup plan if risk materializes",
		"Add additional resources to mitigate",
		"Establish contingency budget reserve",
		"Schedule regular reviews with stakeholders",
		"Document alternative approaches",
	}

	for i := 0; i < count; i++ {
		// Reference to project
		projectID := ""
		if len(store.PrjProjectIDs) > 0 {
			projectID = store.PrjProjectIDs[i%len(store.PrjProjectIDs)]
		}
		ownerID := ""
		if len(store.EmployeeIDs) > 0 {
			ownerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		// Probability (1-100)
		probability := int32(rand.Intn(80) + 10)

		// Potential impact
		potentialImpact := &erp.Money{Amount: int64(rand.Intn(100000) + 5000), CurrencyCode: "USD"}

		// Identified date
		identifiedDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(30))

		// Status distribution: 40% Identified, 25% Assessed, 20% Mitigated, 10% Closed, 5% Occurred
		var status prj.PrjRiskStatus
		if i < count*40/100 {
			status = prj.PrjRiskStatus_PRJ_RISK_STATUS_IDENTIFIED
		} else if i < count*65/100 {
			status = prj.PrjRiskStatus_PRJ_RISK_STATUS_ASSESSED
		} else if i < count*85/100 {
			status = prj.PrjRiskStatus_PRJ_RISK_STATUS_MITIGATED
		} else if i < count*95/100 {
			status = prj.PrjRiskStatus_PRJ_RISK_STATUS_CLOSED
		} else {
			status = prj.PrjRiskStatus_PRJ_RISK_STATUS_OCCURRED
		}

		// Severity distribution: 25% Low, 40% Medium, 25% High, 10% Critical
		var severity prj.PrjRiskSeverity
		if i < count*25/100 {
			severity = severities[0]
		} else if i < count*65/100 {
			severity = severities[1]
		} else if i < count*90/100 {
			severity = severities[2]
		} else {
			severity = severities[3]
		}

		risks[i] = &prj.PrjRisk{
			RiskId:            fmt.Sprintf("risk-%03d", i+1),
			ProjectId:         projectID,
			Name:              prjRiskNames[i%len(prjRiskNames)],
			Description:       fmt.Sprintf("Risk description: %s", prjRiskNames[i%len(prjRiskNames)]),
			Category:          riskCategories[i%len(riskCategories)],
			Severity:          severity,
			Probability:       probability,
			PotentialImpact:   potentialImpact,
			ImpactDescription: fmt.Sprintf("Impact if risk %d materializes", i+1),
			MitigationPlan:    mitigationPlans[i%len(mitigationPlans)],
			ContingencyPlan:   fmt.Sprintf("Contingency plan for risk %d", i+1),
			Status:            status,
			OwnerId:           ownerID,
			IdentifiedDate:    identifiedDate.Unix(),
			DueDate:           identifiedDate.AddDate(0, 1, 0).Unix(),
			AuditInfo:         createAuditInfo(),
		}
	}
	return risks
}
