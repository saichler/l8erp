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
package mocks

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/hcm"
)

// generateJobRequisitions creates job requisition records
func generateJobRequisitions(store *MockDataStore) []*hcm.JobRequisition {
	requisitions := make([]*hcm.JobRequisition, 0)
	idx := 1

	// Create 10-20 open requisitions
	numReqs := rand.Intn(10) + 10
	for i := 0; i < numReqs; i++ {
		requisitions = append(requisitions, &hcm.JobRequisition{
			RequisitionId:   fmt.Sprintf("req-%03d", idx),
			OrganizationId:  store.OrganizationIDs[rand.Intn(len(store.OrganizationIDs))],
			DepartmentId:    store.DepartmentIDs[rand.Intn(len(store.DepartmentIDs))],
			JobId:           store.JobIDs[rand.Intn(len(store.JobIDs))],
			PositionId:      store.PositionIDs[rand.Intn(len(store.PositionIDs))],
			HiringManagerId: store.ManagerIDs[rand.Intn(len(store.ManagerIDs))],
			Title:           fmt.Sprintf("Open Position %d", idx),
			RequisitionType: hcm.RequisitionType(rand.Intn(5) + 1),
			Status:          hcm.RequisitionStatus(rand.Intn(4) + 1),
			Openings:        int32(rand.Intn(3) + 1),
			TargetStartDate: time.Now().AddDate(0, rand.Intn(3)+1, 0).Unix(),
			AuditInfo:       createAuditInfo(),
		})
		idx++
	}
	return requisitions
}

// generateApplicants creates applicant records
func generateApplicants(store *MockDataStore) []*hcm.Applicant {
	applicants := make([]*hcm.Applicant, 0)
	idx := 1

	// Create 50-100 applicants
	numApplicants := rand.Intn(50) + 50
	for i := 0; i < numApplicants; i++ {
		gradYear := 2015 + rand.Intn(8)
		applicants = append(applicants, &hcm.Applicant{
			ApplicantId: fmt.Sprintf("app-%04d", idx),
			FirstName:   firstNames[rand.Intn(len(firstNames))],
			LastName:    lastNames[rand.Intn(len(lastNames))],
			Email:       fmt.Sprintf("applicant%d@email.com", idx),
			Phone:       randomPhone(),
			Source:      hcm.ApplicantSource(rand.Intn(6) + 1),
			CreatedDate: time.Now().AddDate(0, 0, -rand.Intn(60)).Unix(),
			Education: []*hcm.ApplicantEducation{
				{Institution: "State University", Degree: "Bachelor of Science", FieldOfStudy: "Computer Science",
					GraduationDate: time.Date(gradYear, 5, 15, 0, 0, 0, 0, time.UTC).Unix(), Gpa: float64(rand.Intn(15)+25) / 10},
			},
			Experience: []*hcm.ApplicantExperience{
				{Company: "Previous Corp", Title: "Software Engineer",
					StartDate: time.Date(gradYear, 6, 1, 0, 0, 0, 0, time.UTC).Unix(),
					EndDate:   time.Date(gradYear+2, 6, 1, 0, 0, 0, 0, time.UTC).Unix(),
					Description: "Developed enterprise applications"},
				{Company: "Current Inc", Title: "Senior Engineer",
					StartDate: time.Date(gradYear+2, 7, 1, 0, 0, 0, 0, time.UTC).Unix(),
					IsCurrent: true, Description: "Leading backend development team"},
			},
			AuditInfo: createAuditInfo(),
		})
		idx++
	}
	return applicants
}

// generateApplications creates application records
func generateApplications(store *MockDataStore) []*hcm.Application {
	applications := make([]*hcm.Application, 0)
	idx := 1

	if len(store.JobRequisitionIDs) == 0 || len(store.ApplicantIDs) == 0 {
		return applications
	}

	// Each applicant applies to 1-3 positions
	for _, appID := range store.ApplicantIDs {
		numApplications := rand.Intn(3) + 1
		for j := 0; j < numApplications; j++ {
			interviewDate := time.Now().AddDate(0, 0, -rand.Intn(14))
			applications = append(applications, &hcm.Application{
				ApplicationId: fmt.Sprintf("appl-%05d", idx),
				ApplicantId:   appID,
				RequisitionId: store.JobRequisitionIDs[rand.Intn(len(store.JobRequisitionIDs))],
				Status:            hcm.ApplicationStatus(rand.Intn(6) + 1),
				Stage:             hcm.ApplicationStage(rand.Intn(9) + 1),
				DispositionReason: hcm.DispositionReason(rand.Intn(11) + 1),
				AppliedDate:       time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
				Interviews: []*hcm.Interview{
					{InterviewId: fmt.Sprintf("intv-%05d", idx), ApplicationId: fmt.Sprintf("appl-%05d", idx),
						InterviewType: hcm.InterviewType(rand.Intn(4) + 1), ScheduledDate: interviewDate.Unix(),
						DurationMinutes: 60, Location: "Conference Room A",
						InterviewerIds: []string{store.ManagerIDs[rand.Intn(len(store.ManagerIDs))]},
						Status: hcm.InterviewStatus(rand.Intn(4) + 1), AuditInfo: createAuditInfo()},
				},
				AuditInfo: createAuditInfo(),
			})
			idx++
		}
	}
	return applications
}

// generateSuccessionPlans creates succession plan records
func generateSuccessionPlans(store *MockDataStore) []*hcm.SuccessionPlan {
	plans := make([]*hcm.SuccessionPlan, 0)
	idx := 1

	// Create succession plans for key positions (10% of positions)
	numPlans := len(store.PositionIDs) / 10
	if numPlans < 1 {
		numPlans = 1
	}

	for i := 0; i < numPlans; i++ {
		posID := store.PositionIDs[rand.Intn(len(store.PositionIDs))]
		incumbentID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]

		// Pick 2-3 candidates for each plan
		numCandidates := rand.Intn(2) + 2
		candidates := make([]*hcm.SuccessionCandidate, numCandidates)
		for c := 0; c < numCandidates; c++ {
			candidates[c] = &hcm.SuccessionCandidate{
				EmployeeId:       store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))],
				Readiness:        hcm.ReadinessLevel(rand.Intn(3) + 1),
				DevelopmentNeeds: "Leadership training, cross-functional experience",
				Ranking:          int32(c + 1),
			}
		}
		plans = append(plans, &hcm.SuccessionPlan{
			PlanId:         fmt.Sprintf("succ-%03d", idx),
			PositionId:     posID,
			IncumbentId:    incumbentID,
			Status:         hcm.SuccessionPlanStatus(rand.Intn(3) + 1),
			VacancyRisk:    hcm.RiskLevel(rand.Intn(3) + 1),
			ReviewDate:     time.Now().Unix(),
			NextReviewDate: time.Now().AddDate(0, 6, 0).Unix(),
			Candidates:     candidates,
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return plans
}

// generateCareerPaths creates career path records
func generateCareerPaths(store *MockDataStore) []*hcm.CareerPath {
	paths := make([]*hcm.CareerPath, 0)
	idx := 1

	// Create career paths for each job family
	for _, jfID := range store.JobFamilyIDs {
		numSteps := rand.Intn(3) + 3
		steps := make([]*hcm.CareerPathStep, numSteps)
		levels := []string{"Junior", "Mid-Level", "Senior", "Lead", "Principal"}
		for s := 0; s < numSteps; s++ {
			steps[s] = &hcm.CareerPathStep{
				StepOrder: int32(s + 1),
				JobId:     store.JobIDs[rand.Intn(len(store.JobIDs))],
				JobTitle:  fmt.Sprintf("%s Engineer", levels[s%len(levels)]),
				JobLevel:  fmt.Sprintf("L%d", s+1),
				TypicalTenureMonths: int32((s + 1) * 18),
			}
		}
		paths = append(paths, &hcm.CareerPath{
			CareerPathId: fmt.Sprintf("career-%03d", idx),
			JobFamilyId:  jfID,
			Name:         fmt.Sprintf("Career Path %d", idx),
			Description:  "Standard progression path within the job family",
			IsActive:     true,
			Steps:        steps,
			AuditInfo:    createAuditInfo(),
		})
		idx++
	}
	return paths
}
