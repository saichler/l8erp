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

// gen_prj_analytics2.go
// Generates:
// - PrjPortfolioView
// - PrjProjectKPI
// - PrjProjectIssue

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/prj"
)

// generatePortfolioViews creates portfolio view records
func generatePortfolioViews(store *MockDataStore) []*prj.PrjPortfolioView {
	count := 5

	names := []string{
		"Enterprise Portfolio Overview",
		"IT Project Portfolio",
		"Strategic Initiatives",
		"Product Development Portfolio",
		"Infrastructure Projects",
	}
	descriptions := []string{
		"Overview of all active enterprise projects",
		"Information technology project portfolio",
		"Strategic business initiatives dashboard",
		"Product development and innovation projects",
		"Infrastructure and facilities projects",
	}

	views := make([]*prj.PrjPortfolioView, count)
	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)

		departmentID := pickRef(store.DepartmentIDs, i)

		// Assign 3-5 projects to each portfolio view
		var projectIds []string
		if len(store.PrjProjectIDs) > 0 {
			numProjects := rand.Intn(3) + 3
			for j := 0; j < numProjects && j < len(store.PrjProjectIDs); j++ {
				idx := (i*3 + j) % len(store.PrjProjectIDs)
				projectIds = append(projectIds, store.PrjProjectIDs[idx])
			}
		}

		totalProjects := int32(len(projectIds))
		onTrackCount := int32(float64(totalProjects) * 0.6)   // 60% on track
		atRiskCount := int32(float64(totalProjects) * 0.25)   // 25% at risk
		offTrackCount := totalProjects - onTrackCount - atRiskCount

		totalBudget := int64(rand.Intn(1000000000)+500000000) * int64(totalProjects) / 5
		actualCost := int64(float64(totalBudget) * (0.4 + rand.Float64()*0.3))
		totalRevenue := int64(float64(totalBudget) * (0.7 + rand.Float64()*0.4))
		totalProfit := totalRevenue - actualCost

		views[i] = &prj.PrjPortfolioView{
			ViewId:          genID("ppv", i),
			Name:            names[i%len(names)],
			Description:     descriptions[i%len(descriptions)],
			ProjectIds:      projectIds,
			OwnerId:         ownerID,
			DepartmentId:    departmentID,
			TotalBudget:     money(totalBudget),
			TotalActualCost: money(actualCost),
			TotalRevenue:    money(totalRevenue),
			TotalProfit:     money(totalProfit),
			TotalProjects:   totalProjects,
			OnTrackCount:    onTrackCount,
			AtRiskCount:     atRiskCount,
			OffTrackCount:   offTrackCount,
			AvgUtilization:  float64(rand.Intn(30)+60) / 100, // 60-90%
			AvgMargin:       float64(rand.Intn(20)+10) / 100, // 10-30%
			AsOfDate:        time.Now().Unix(),
			AuditInfo:       createAuditInfo(),
		}
	}
	return views
}

// generateProjectKPIs creates KPI records for projects
func generateProjectKPIs(store *MockDataStore) []*prj.PrjProjectKPI {
	count := 60 // ~4 per project

	// Flavorable health distributions: 60% GREEN, 25% YELLOW, 15% RED
	healthIndicators := []prj.PrjHealthIndicator{
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_GREEN,
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_GREEN,
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_GREEN,
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_GREEN,
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_GREEN,
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_GREEN,
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_YELLOW,
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_YELLOW,
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_YELLOW,
		prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_RED,
	}

	kpiCategories := []string{"Schedule", "Cost", "Quality", "Scope", "Resource", "Customer"}
	units := []string{"%", "index", "defects/KLOC", "days", "FTE", "score"}
	trends := []string{"improving", "stable", "declining"}
	measurementPeriods := []string{"Weekly", "Bi-weekly", "Monthly", "Quarterly"}

	kpis := make([]*prj.PrjProjectKPI, count)
	for i := 0; i < count; i++ {
		projectID := pickRef(store.PrjProjectIDs, i)

		kpiName := prjKPINames[i%len(prjKPINames)]
		category := kpiCategories[i%len(kpiCategories)]
		unit := units[i%len(units)]

		targetValue := float64(rand.Intn(100) + 50)
		variancePercent := (rand.Float64()*30 - 15) // -15% to +15%
		actualValue := targetValue * (1 + variancePercent/100)
		variance := actualValue - targetValue

		// Determine status based on variance
		var status prj.PrjHealthIndicator
		if variancePercent >= -5 && variancePercent <= 5 {
			status = prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_GREEN
		} else if variancePercent >= -15 && variancePercent <= 15 {
			status = prj.PrjHealthIndicator_PRJ_HEALTH_INDICATOR_YELLOW
		} else {
			status = healthIndicators[i%len(healthIndicators)]
		}

		measurementDate := time.Now().AddDate(0, 0, -rand.Intn(30))

		kpis[i] = &prj.PrjProjectKPI{
			KpiId:             genID("pkpi", i),
			ProjectId:         projectID,
			KpiName:           kpiName,
			KpiCategory:       category,
			Description:       fmt.Sprintf("Measures %s for the project", kpiName),
			TargetValue:       targetValue,
			ActualValue:       actualValue,
			UnitOfMeasure:     unit,
			Status:            status,
			Variance:          variance,
			VariancePercent:   variancePercent,
			MeasurementDate:   measurementDate.Unix(),
			MeasurementPeriod: measurementPeriods[i%len(measurementPeriods)],
			Trend:             trends[i%len(trends)],
			Notes:             fmt.Sprintf("KPI tracking for %s", kpiName),
			AuditInfo:         createAuditInfo(),
		}
	}
	return kpis
}

// generateProjectIssues creates issue records for projects
func generateProjectIssues(store *MockDataStore) []*prj.PrjProjectIssue {
	count := 40

	// Flavorable status distributions: 30% OPEN, 35% IN_PROGRESS, 20% RESOLVED, 15% CLOSED
	issueStatuses := []prj.PrjIssueStatus{
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_OPEN,
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_OPEN,
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_OPEN,
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_IN_PROGRESS,
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_IN_PROGRESS,
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_IN_PROGRESS,
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_IN_PROGRESS,
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_RESOLVED,
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_RESOLVED,
		prj.PrjIssueStatus_PRJ_ISSUE_STATUS_CLOSED,
	}

	// Flavorable priority distributions: 40% MEDIUM, 30% HIGH, 20% LOW, 10% CRITICAL
	issuePriorities := []prj.PrjIssuePriority{
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_LOW,
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_LOW,
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_MEDIUM,
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_MEDIUM,
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_MEDIUM,
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_MEDIUM,
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_HIGH,
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_HIGH,
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_HIGH,
		prj.PrjIssuePriority_PRJ_ISSUE_PRIORITY_CRITICAL,
	}

	issueTitles := []string{
		"Resource availability conflict",
		"Integration test failures",
		"Environment setup delays",
		"Vendor delivery delay",
		"Requirements clarification needed",
		"Performance degradation detected",
		"Security vulnerability identified",
		"Data migration issues",
		"Third-party API changes",
		"Scope creep concerns",
	}

	resolutions := []string{
		"Implemented workaround solution",
		"Root cause identified and fixed",
		"Vendor issue resolved",
		"Additional resources allocated",
		"Requirements updated and approved",
		"",
		"",
		"",
	}

	issues := make([]*prj.PrjProjectIssue, count)
	for i := 0; i < count; i++ {
		projectID := pickRef(store.PrjProjectIDs, i)

		taskID := pickRef(store.PrjTaskIDs, i)

		reportedBy := pickRef(store.EmployeeIDs, i)

		assignedTo := pickRef(store.EmployeeIDs, (i+5))

		riskID := ""
		if len(store.PrjRiskIDs) > 0 && i%4 == 0 { // 25% linked to risks
			riskID = store.PrjRiskIDs[i%len(store.PrjRiskIDs)]
		}

		reportedDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))
		dueDate := reportedDate.AddDate(0, 0, rand.Intn(30)+7)

		status := issueStatuses[i%len(issueStatuses)]
		var resolvedDate int64
		resolution := ""
		if status == prj.PrjIssueStatus_PRJ_ISSUE_STATUS_RESOLVED ||
			status == prj.PrjIssueStatus_PRJ_ISSUE_STATUS_CLOSED {
			resolvedDate = reportedDate.AddDate(0, 0, rand.Intn(20)+3).Unix()
			resolution = resolutions[i%len(resolutions)]
		}

		issues[i] = &prj.PrjProjectIssue{
			IssueId:       genID("pis", i),
			ProjectId:     projectID,
			TaskId:        taskID,
			IssueNumber:   fmt.Sprintf("ISS-%04d", i+1),
			Title:         issueTitles[i%len(issueTitles)],
			Description:   fmt.Sprintf("Detailed description of issue: %s", issueTitles[i%len(issueTitles)]),
			Category:      prjIssueCategories[i%len(prjIssueCategories)],
			Status:        status,
			Priority:      issuePriorities[i%len(issuePriorities)],
			ReportedBy:    reportedBy,
			AssignedTo:    assignedTo,
			ReportedDate:  reportedDate.Unix(),
			DueDate:       dueDate.Unix(),
			ResolvedDate:  resolvedDate,
			Resolution:    resolution,
			RootCause:     fmt.Sprintf("Root cause analysis for issue %d", i+1),
			ImpactCost:    randomMoney(5000, 100000),
			ImpactDays:    int32(rand.Intn(10) + 1),
			RelatedRiskId: riskID,
			AuditInfo:     createAuditInfo(),
		}
	}
	return issues
}
