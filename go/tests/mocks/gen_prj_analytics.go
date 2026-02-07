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

// gen_prj_analytics.go
// Generates:
// - PrjStatusReport
// - PrjEarnedValue
// - PrjBudgetVariance
// - PrjResourceForecast

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/prj"
)

// generateStatusReports creates status report records for projects
func generateStatusReports(store *MockDataStore) []*prj.PrjStatusReport {
	count := 45 // ~3 per project

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

	accomplishments := []string{
		"Completed sprint deliverables ahead of schedule",
		"Successfully deployed to production environment",
		"All test cases passed with 100% coverage",
		"Stakeholder review completed with positive feedback",
		"Major milestone achieved on time",
		"Resource allocation optimized for next phase",
		"Integration testing completed successfully",
		"Documentation updated and approved",
	}

	plannedActivities := []string{
		"Begin next sprint planning and backlog grooming",
		"Continue development of core features",
		"Conduct user acceptance testing",
		"Prepare for production deployment",
		"Complete security audit requirements",
		"Finalize resource allocation for next phase",
		"Begin integration with external systems",
		"Start performance optimization phase",
	}

	reports := make([]*prj.PrjStatusReport, count)
	for i := 0; i < count; i++ {
		projectID := pickRef(store.PrjProjectIDs, i)

		reportedBy := pickRef(store.EmployeeIDs, i)

		reportDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		periodStart := reportDate.AddDate(0, 0, -14)
		periodEnd := reportDate

		reports[i] = &prj.PrjStatusReport{
			StatusId:          genID("psr", i),
			ProjectId:         projectID,
			ReportDate:        reportDate.Unix(),
			PeriodStart:       periodStart.Unix(),
			PeriodEnd:         periodEnd.Unix(),
			OverallHealth:     healthIndicators[i%len(healthIndicators)],
			ScheduleHealth:    healthIndicators[(i+1)%len(healthIndicators)],
			BudgetHealth:      healthIndicators[(i+2)%len(healthIndicators)],
			ScopeHealth:       healthIndicators[(i+3)%len(healthIndicators)],
			ResourceHealth:    healthIndicators[(i+4)%len(healthIndicators)],
			PercentComplete:   int32(rand.Intn(80) + 10),
			Accomplishments:   accomplishments[i%len(accomplishments)],
			PlannedActivities: plannedActivities[i%len(plannedActivities)],
			IssuesSummary:     fmt.Sprintf("Issue summary for report period %d", i+1),
			RisksSummary:      fmt.Sprintf("Risk assessment for period %d", i+1),
			DecisionsNeeded:   fmt.Sprintf("Decisions needed for phase %d", (i%5)+1),
			ReportedBy:        reportedBy,
			AuditInfo:         createAuditInfo(),
		}
	}
	return reports
}

// generateEarnedValues creates earned value metrics for projects
func generateEarnedValues(store *MockDataStore) []*prj.PrjEarnedValue {
	count := 15

	earnedValues := make([]*prj.PrjEarnedValue, count)
	for i := 0; i < count; i++ {
		projectID := pickRef(store.PrjProjectIDs, i)

		asOfDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(28))

		// Generate realistic EVM data
		bac := int64(rand.Intn(500000000) + 100000000) // $1M - $6M Budget at Completion
		percentComplete := float64(rand.Intn(80)+10) / 100
		percentSpent := percentComplete * (0.85 + rand.Float64()*0.3) // +/- 15% variance

		pv := int64(float64(bac) * percentComplete)
		ev := int64(float64(pv) * (0.9 + rand.Float64()*0.2))  // EV within 10% of PV
		ac := int64(float64(ev) * (0.85 + rand.Float64()*0.3)) // AC with variance

		sv := ev - pv
		cv := ev - ac

		var spi, cpi float64
		if pv > 0 {
			spi = float64(ev) / float64(pv)
		}
		if ac > 0 {
			cpi = float64(ev) / float64(ac)
		}

		var eac int64
		if cpi > 0 {
			eac = int64(float64(bac) / cpi)
		} else {
			eac = bac
		}

		etc := eac - ac
		vac := bac - eac

		var tcpi float64
		if bac-ev > 0 {
			tcpi = float64(bac-ev) / float64(bac-ac)
		}

		earnedValues[i] = &prj.PrjEarnedValue{
			EarnedValueId:              genID("pev", i),
			ProjectId:                  projectID,
			AsOfDate:                   asOfDate.Unix(),
			BudgetAtCompletion:         money(store, bac),
			PlannedValue:               money(store, pv),
			EarnedValue:                money(store, ev),
			ActualCost:                 money(store, ac),
			ScheduleVariance:           money(store, sv),
			CostVariance:               money(store, cv),
			SchedulePerformanceIndex:   spi,
			CostPerformanceIndex:       cpi,
			EstimateAtCompletion:       money(store, eac),
			EstimateToComplete:         money(store, etc),
			VarianceAtCompletion:       money(store, vac),
			ToCompletePerformanceIndex: tcpi,
			PercentComplete:            percentComplete * 100,
			PercentSpent:               percentSpent * 100,
			AuditInfo:                  createAuditInfo(),
		}
	}
	return earnedValues
}

// generateBudgetVariances creates budget variance records for projects
func generateBudgetVariances(store *MockDataStore) []*prj.PrjBudgetVariance {
	count := 30

	categories := []string{"Labor", "Materials", "Equipment", "Travel", "Software", "Consulting"}
	explanations := []string{
		"Additional resources required for accelerated timeline",
		"Scope change approved by steering committee",
		"Market rate increases for specialized skills",
		"Unexpected technical complexity",
		"Vendor pricing adjustment",
		"Efficiency improvements reduced costs",
	}
	correctiveActions := []string{
		"Reallocate budget from contingency reserve",
		"Submit change request for additional funding",
		"Negotiate with vendor for better rates",
		"Optimize resource utilization",
		"Defer non-critical activities",
		"No action required - within tolerance",
	}

	variances := make([]*prj.PrjBudgetVariance, count)
	for i := 0; i < count; i++ {
		projectID := pickRef(store.PrjProjectIDs, i)

		budgetID := pickRef(store.PrjProjectBudgetIDs, i)

		phaseID := pickRef(store.PrjPhaseIDs, i)

		asOfDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))

		budgetedAmount := int64(rand.Intn(100000000) + 10000000) // $100k - $1.1M
		variancePercent := (rand.Float64()*40 - 20)             // -20% to +20% variance
		actualAmount := int64(float64(budgetedAmount) * (1 + variancePercent/100))
		varianceAmount := actualAmount - budgetedAmount

		budgetedHours := float64(rand.Intn(500) + 100)
		actualHours := budgetedHours * (1 + variancePercent/100)
		hoursVariance := actualHours - budgetedHours

		variances[i] = &prj.PrjBudgetVariance{
			VarianceId:          genID("pbv", i),
			ProjectId:           projectID,
			BudgetId:            budgetID,
			PhaseId:             phaseID,
			AsOfDate:            asOfDate.Unix(),
			Category:            categories[i%len(categories)],
			BudgetedAmount:      money(store, budgetedAmount),
			ActualAmount:        money(store, actualAmount),
			VarianceAmount:      money(store, varianceAmount),
			VariancePercent:     variancePercent,
			BudgetedHours:       budgetedHours,
			ActualHours:         actualHours,
			HoursVariance:       hoursVariance,
			VarianceExplanation: explanations[i%len(explanations)],
			CorrectiveAction:    correctiveActions[i%len(correctiveActions)],
			AuditInfo:           createAuditInfo(),
		}
	}
	return variances
}

// generateResourceForecasts creates resource forecast records
func generateResourceForecasts(store *MockDataStore) []*prj.PrjResourceForecast {
	count := 20

	skillCategories := []string{"Development", "Testing", "Design", "Architecture", "Management", "Analysis"}
	roles := []string{"Developer", "QA Engineer", "UI Designer", "Solution Architect", "Project Manager", "Business Analyst"}

	forecasts := make([]*prj.PrjResourceForecast, count)
	for i := 0; i < count; i++ {
		projectID := pickRef(store.PrjProjectIDs, i)

		resourceID := pickRef(store.PrjResourceIDs, i)

		poolID := pickRef(store.PrjResourcePoolIDs, i)

		periodStart := time.Now().AddDate(0, rand.Intn(3), 0)
		periodEnd := periodStart.AddDate(0, 1, 0)

		forecastedHours := float64(rand.Intn(200) + 40)
		confirmedHours := forecastedHours * (0.5 + rand.Float64()*0.5)
		gapHours := forecastedHours - confirmedHours

		headcountNeeded := int32(rand.Intn(5) + 1)
		headcountAvailable := int32(float64(headcountNeeded) * (0.6 + rand.Float64()*0.6))

		forecasts[i] = &prj.PrjResourceForecast{
			ForecastId:         genID("prf", i),
			ProjectId:          projectID,
			ResourceId:         resourceID,
			PoolId:             poolID,
			SkillCategory:      skillCategories[i%len(skillCategories)],
			Role:               roles[i%len(roles)],
			PeriodStart:        periodStart.Unix(),
			PeriodEnd:          periodEnd.Unix(),
			ForecastedHours:    forecastedHours,
			ConfirmedHours:     confirmedHours,
			GapHours:           gapHours,
			HeadcountNeeded:    headcountNeeded,
			HeadcountAvailable: headcountAvailable,
			ConfidenceLevel:    float64(rand.Intn(40) + 60), // 60-100%
			Notes:              fmt.Sprintf("Resource forecast for %s role", roles[i%len(roles)]),
			AuditInfo:          createAuditInfo(),
		}
	}
	return forecasts
}
