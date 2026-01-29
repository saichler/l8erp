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

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/hcm"
)

// generateEmployeeDocuments creates employee document records
func generateEmployeeDocuments(store *MockDataStore) []*hcm.EmployeeDocument {
	docs := make([]*hcm.EmployeeDocument, 0)
	docTypes := []hcm.DocumentType{
		hcm.DocumentType_DOCUMENT_TYPE_RESUME,
		hcm.DocumentType_DOCUMENT_TYPE_CONTRACT,
		hcm.DocumentType_DOCUMENT_TYPE_ID_CARD,
	}

	// Create 1-2 documents per employee
	for i, empID := range store.EmployeeIDs {
		numDocs := rand.Intn(2) + 1
		for j := 0; j < numDocs; j++ {
			docType := docTypes[rand.Intn(len(docTypes))]
			docs = append(docs, &hcm.EmployeeDocument{
				DocumentId:   fmt.Sprintf("doc-%03d-%d", i+1, j+1),
				EmployeeId:   empID,
				DocumentType: docType,
				Name:         fmt.Sprintf("%s_%s", empID, docType.String()),
				Description:  fmt.Sprintf("Employee document: %s", docType.String()),
				UploadDate:   time.Now().AddDate(0, -rand.Intn(12), 0).Unix(),
				AuditInfo:    createAuditInfo(),
			})
		}
	}
	return docs
}

// generateTimesheets creates timesheet records
func generateTimesheets(store *MockDataStore) []*hcm.Timesheet {
	timesheets := make([]*hcm.Timesheet, 0)
	tsIdx := 1

	// Create 1 timesheet per employee for current week
	weekStart := time.Now().AddDate(0, 0, -int(time.Now().Weekday()))
	weekStart = time.Date(weekStart.Year(), weekStart.Month(), weekStart.Day(), 0, 0, 0, 0, time.UTC)

	for _, empID := range store.EmployeeIDs {
		entries := make([]*hcm.TimeEntry, 5) // Mon-Fri
		for d := 0; d < 5; d++ {
			entries[d] = &hcm.TimeEntry{
				EntryId:    fmt.Sprintf("te-%03d-%d", tsIdx, d+1),
				EmployeeId: empID,
				Date:       weekStart.AddDate(0, 0, d).Unix(),
				Hours:      8.0,
				EntryType:  hcm.TimeEntryType_TIME_ENTRY_TYPE_REGULAR,
			}
		}

		timesheets = append(timesheets, &hcm.Timesheet{
			TimesheetId: fmt.Sprintf("ts-%03d", tsIdx),
			EmployeeId:  empID,
			Period: &erp.DateRange{
				StartDate: weekStart.Unix(),
				EndDate:   weekStart.AddDate(0, 0, 6).Unix(),
			},
			Status:            hcm.TimesheetStatus_TIMESHEET_STATUS_SUBMITTED,
			TotalRegularHours: 40.0,
			TotalHours:        40.0,
			Entries:           entries,
			AuditInfo:         createAuditInfo(),
		})
		tsIdx++
	}
	return timesheets
}

// generateLeaveBalances creates leave balance records
func generateLeaveBalances(store *MockDataStore) []*hcm.LeaveBalance {
	balances := make([]*hcm.LeaveBalance, 0)
	balIdx := 1

	leaveTypes := []hcm.LeaveType{
		hcm.LeaveType_LEAVE_TYPE_PTO,
		hcm.LeaveType_LEAVE_TYPE_SICK,
	}

	for _, empID := range store.EmployeeIDs {
		for i, policyID := range store.LeavePolicyIDs {
			accrued := float64(rand.Intn(80) + 40)   // 40-120 hours
			used := float64(rand.Intn(20))
			carryover := float64(rand.Intn(16))

			balances = append(balances, &hcm.LeaveBalance{
				BalanceId:        fmt.Sprintf("lbal-%03d", balIdx),
				EmployeeId:       empID,
				LeavePolicyId:    policyID,
				LeaveType:        leaveTypes[i%len(leaveTypes)],
				Year:             2025,
				BeginningBalance: carryover,
				Accrued:          accrued,
				Used:             used,
				Pending:          float64(rand.Intn(8)),
				Available:        carryover + accrued - used,
				Carryover:        carryover,
				AnnualAllowance:  120,
				AuditInfo:        createAuditInfo(),
			})
			balIdx++
		}
	}
	return balances
}

// generateBenefitEnrollments creates benefit enrollment records
func generateBenefitEnrollments(store *MockDataStore) []*hcm.BenefitEnrollment {
	enrollments := make([]*hcm.BenefitEnrollment, 0)
	enrolIdx := 1

	// Each employee enrolls in 1-2 benefit plans
	for _, empID := range store.EmployeeIDs {
		numPlans := rand.Intn(2) + 1
		usedPlans := make(map[int]bool)

		for j := 0; j < numPlans; j++ {
			planIdx := rand.Intn(len(store.BenefitPlanIDs))
			if usedPlans[planIdx] {
				continue
			}
			usedPlans[planIdx] = true

			enrollments = append(enrollments, &hcm.BenefitEnrollment{
				EnrollmentId:      fmt.Sprintf("benrol-%03d", enrolIdx),
				EmployeeId:        empID,
				PlanId:            store.BenefitPlanIDs[planIdx],
				Status:            hcm.EnrollmentStatus_ENROLLMENT_STATUS_ACTIVE,
				Reason:            hcm.EnrollmentReason_ENROLLMENT_REASON_NEW_HIRE,
				EnrollmentDate:    time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				CoverageStartDate: time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				AuditInfo:         createAuditInfo(),
			})
			enrolIdx++
		}
	}
	return enrollments
}

// generateEmployeeSkills creates employee skill records
func generateEmployeeSkills(store *MockDataStore) []*hcm.EmployeeSkill {
	skills := make([]*hcm.EmployeeSkill, 0)
	skillIdx := 1

	// Each employee has 3-5 skills
	for _, empID := range store.EmployeeIDs {
		numSkills := rand.Intn(3) + 3
		usedSkills := make(map[int]bool)

		for j := 0; j < numSkills; j++ {
			skillIdxRand := rand.Intn(len(store.SkillIDs))
			if usedSkills[skillIdxRand] {
				continue
			}
			usedSkills[skillIdxRand] = true

			skills = append(skills, &hcm.EmployeeSkill{
				EmployeeSkillId:   fmt.Sprintf("empskill-%03d", skillIdx),
				EmployeeId:        empID,
				SkillId:           store.SkillIDs[skillIdxRand],
				ProficiencyLevel:  int32(rand.Intn(4) + 1), // 1-5 scale
				YearsOfExperience: int32(rand.Intn(10) + 1),
				IsPrimarySkill:    j == 0,
				AuditInfo:         createAuditInfo(),
			})
			skillIdx++
		}
	}
	return skills
}

// generatePerformanceReviews creates performance review records
func generatePerformanceReviews(store *MockDataStore) []*hcm.PerformanceReview {
	reviews := make([]*hcm.PerformanceReview, 0)
	reviewIdx := 1

	// Create a review for each non-manager employee
	for i, empID := range store.EmployeeIDs {
		if i < 10 {
			continue // Skip managers
		}

		managerID := store.ManagerIDs[i%len(store.ManagerIDs)]

		reviews = append(reviews, &hcm.PerformanceReview{
			ReviewId:   fmt.Sprintf("review-%03d", reviewIdx),
			EmployeeId: empID,
			ReviewerId: managerID,
			ReviewPeriod: &erp.DateRange{
				StartDate: time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				EndDate:   time.Date(2024, 12, 31, 0, 0, 0, 0, time.UTC).Unix(),
			},
			ReviewType:      hcm.ReviewType_REVIEW_TYPE_ANNUAL,
			Status:          hcm.PerformanceReviewStatus_PERFORMANCE_REVIEW_STATUS_COMPLETED,
			OverallRating:   int32(rand.Intn(3) + 2), // 2-4 rating (1-5 scale)
			ManagerComments: "Good performance throughout the year.",
			AuditInfo:       createAuditInfo(),
		})
		reviewIdx++
	}
	return reviews
}

// generateGoals creates goal records
func generateGoals(store *MockDataStore) []*hcm.Goal {
	goals := make([]*hcm.Goal, 0)
	goalIdx := 1
	goalTypes := []string{
		"Increase productivity by 15%",
		"Complete certification",
		"Lead project initiative",
		"Mentor junior team members",
		"Improve customer satisfaction scores",
	}

	for _, empID := range store.EmployeeIDs {
		numGoals := rand.Intn(2) + 2 // 2-3 goals
		for j := 0; j < numGoals; j++ {
			goalType := goalTypes[rand.Intn(len(goalTypes))]
			goals = append(goals, &hcm.Goal{
				GoalId:               fmt.Sprintf("goal-%03d", goalIdx),
				EmployeeId:           empID,
				Title:                goalType,
				Description:          fmt.Sprintf("Employee goal: %s", goalType),
				GoalType:             hcm.GoalType(rand.Intn(3) + 1),
				Priority:             hcm.GoalPriority(rand.Intn(3) + 1),
				Status:               hcm.GoalStatus_GOAL_STATUS_ACTIVE,
				CompletionPercentage: float64(rand.Intn(80) + 10),
				StartDate:            time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				DueDate:              time.Date(2025, 12, 31, 0, 0, 0, 0, time.UTC).Unix(),
				Weight:               float64(rand.Intn(30) + 20),
				AuditInfo:            createAuditInfo(),
			})
			goalIdx++
		}
	}
	return goals
}

// generateEmployeeCompensation creates employee compensation records
func generateEmployeeCompensation(store *MockDataStore) []*hcm.EmployeeCompensation {
	comps := make([]*hcm.EmployeeCompensation, 0)
	compIdx := 1

	baseSalaries := []float64{55000, 70000, 85000, 100000, 120000, 150000}

	for _, empID := range store.EmployeeIDs {
		baseSalary := baseSalaries[rand.Intn(len(baseSalaries))]
		gradeIdx := 0
		if len(store.SalaryGradeIDs) > 0 {
			gradeIdx = rand.Intn(len(store.SalaryGradeIDs))
		}

		comps = append(comps, &hcm.EmployeeCompensation{
			CompensationId: fmt.Sprintf("comp-%03d", compIdx),
			EmployeeId:     empID,
			SalaryGradeId:  store.SalaryGradeIDs[gradeIdx],
			BaseSalary: &erp.Money{
				Amount:       int64(baseSalary * 100), // Convert to cents
				CurrencyCode: "USD",
			},
			CurrencyCode:  "USD",
			PayFrequency:  hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY,
			EffectiveDate: time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			ChangeReason:  "Annual Compensation Review",
			AuditInfo:     createAuditInfo(),
		})
		compIdx++
	}
	return comps
}
