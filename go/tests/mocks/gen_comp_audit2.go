/*
(C) 2025 Sharon Aicler (saichler@gmail.com)

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

// gen_comp_audit2.go
// Generates:
// - CompComplianceReport (6 records) - references CompRegulation
//
// Note: CompRemediationAction is now embedded in CompAuditFinding (see gen_comp_audit.go)
// Note: CompAuditReport is now embedded in CompAuditSchedule (see gen_comp_audit.go)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompComplianceReports creates compliance report records
func generateCompComplianceReports(store *MockDataStore) []*comp.CompComplianceReport {
	reportTypes := []string{"Quarterly", "Annual", "Ad-hoc"}
	statusOptions := []string{"Draft", "Under Review", "Final"}

	count := 6
	reports := make([]*comp.CompComplianceReport, count)

	for i := 0; i < count; i++ {
		regulationID := pickRef(store.CompRegulationIDs, i)
		preparedByID := pickRef(store.EmployeeIDs, i)
		approvedByID := pickRef(store.ManagerIDs, i)

		// Calculate period based on report type
		periodEnd := time.Now().AddDate(0, -rand.Intn(3), 0)
		var periodStart time.Time
		if reportTypes[i%len(reportTypes)] == "Annual" {
			periodStart = periodEnd.AddDate(-1, 0, 0)
		} else {
			periodStart = periodEnd.AddDate(0, -3, 0)
		}

		reportDate := periodEnd.AddDate(0, 0, rand.Intn(14)+7)

		// Compliance metrics
		requirementsTotal := int32(rand.Intn(30) + 20)
		requirementsCompliant := int32(float64(requirementsTotal) * (0.6 + rand.Float64()*0.3))
		requirementsPartial := int32(rand.Intn(int(requirementsTotal-requirementsCompliant)/2 + 1))
		requirementsNonCompliant := requirementsTotal - requirementsCompliant - requirementsPartial

		overallComplianceRate := float64(requirementsCompliant) / float64(requirementsTotal) * 100

		// Status distribution
		var status string
		if i < 1 {
			status = "Draft"
		} else if i < 3 {
			status = "Under Review"
		} else {
			status = statusOptions[i%len(statusOptions)]
		}

		reports[i] = &comp.CompComplianceReport{
			ReportId:                 genID("ccmp", i),
			ReportNumber:             fmt.Sprintf("COMP-%04d-%02d", time.Now().Year(), i+1),
			Title:                    fmt.Sprintf("%s Compliance Report - Q%d %d", reportTypes[i%len(reportTypes)], (int(periodEnd.Month())-1)/3+1, periodEnd.Year()),
			ReportType:               reportTypes[i%len(reportTypes)],
			RegulationId:             regulationID,
			PeriodStart:              periodStart.Unix(),
			PeriodEnd:                periodEnd.Unix(),
			Status:                   status,
			ExecutiveSummary:         "This report summarizes the organization's compliance status for the reporting period.",
			OverallComplianceRate:    overallComplianceRate,
			RequirementsTotal:        requirementsTotal,
			RequirementsCompliant:    requirementsCompliant,
			RequirementsPartial:      requirementsPartial,
			RequirementsNonCompliant: requirementsNonCompliant,
			OpenViolations:           int32(rand.Intn(5)),
			OpenFindings:             int32(rand.Intn(8) + 2),
			OverdueRemediations:      int32(rand.Intn(4)),
			KeyAchievements:          "Improved compliance posture through enhanced controls and monitoring",
			AreasOfConcern:           "Some control gaps identified requiring attention in next quarter",
			Recommendations:          "Continue strengthening compliance program and address identified gaps",
			ReportDate:               reportDate.Unix(),
			PreparedById:             preparedByID,
			ApprovedById:             approvedByID,
			DistributionList:         []string{"Compliance Committee", "Executive Management", "Board of Directors"},
			AuditInfo:                createAuditInfo(),
		}
	}
	return reports
}
