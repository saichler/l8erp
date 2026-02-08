/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package mocks

// gen_prj_planning.go
// Generates:
// - PrjProject
// - PrjPhase
// - PrjTask
// - PrjMilestone

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
		customerID := pickRef(store.CustomerIDs, i)
		accountID := pickRef(store.CrmAccountIDs, i)
		managerID := pickRef(store.ManagerIDs, i)
		departmentID := pickRef(store.DepartmentIDs, i)
		templateID := pickRef(store.PrjProjectTemplateIDs, i)

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
			ProjectId:       genID("prj", i),
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
			Budget:          money(store, budgetAmount),
			ActualCost:      money(store, actualCost),
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
		projectID := pickRef(store.PrjProjectIDs, i)

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
			PhaseId:         genID("phase", i),
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
		projectID := pickRef(store.PrjProjectIDs, i)
		phaseID := pickRef(store.PrjPhaseIDs, i)
		assigneeID := pickRef(store.EmployeeIDs, i)

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
			TaskId:          genID("task", i),
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
		projectID := pickRef(store.PrjProjectIDs, i)
		phaseID := pickRef(store.PrjPhaseIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)

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
			billingAmount = randomMoney(store, 5000, 50000)
		}

		milestones[i] = &prj.PrjMilestone{
			MilestoneId:   genID("mlstn", i),
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
