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
package main

// gen_prj_planning2.go
// Generates:
// - PrjDeliverable
// - PrjDependency
// - PrjRisk

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/prj"
)

// generateDeliverables creates project deliverable records
func generateDeliverables(store *MockDataStore) []*prj.PrjDeliverable {
	count := 45
	deliverables := make([]*prj.PrjDeliverable, count)

	for i := 0; i < count; i++ {
		// References
		projectID := pickRef(store.PrjProjectIDs, i)
		milestoneID := pickRef(store.PrjMilestoneIDs, i)
		taskID := pickRef(store.PrjTaskIDs, i)
		acceptedBy := pickRef(store.EmployeeIDs, i)

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
			DeliverableId:  genID("dlvrbl", i),
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
		projectID := pickRef(store.PrjProjectIDs, i)

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
			DependencyId:      genID("dep", i),
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
		projectID := pickRef(store.PrjProjectIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)

		// Probability (1-100)
		probability := int32(rand.Intn(80) + 10)

		// Potential impact
		potentialImpact := randomMoney(store, 5000, 100000)

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
			RiskId:            genID("risk", i),
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
