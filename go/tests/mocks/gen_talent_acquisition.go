package main

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
		applicants = append(applicants, &hcm.Applicant{
			ApplicantId: fmt.Sprintf("app-%04d", idx),
			FirstName:   firstNames[rand.Intn(len(firstNames))],
			LastName:    lastNames[rand.Intn(len(lastNames))],
			Email:       fmt.Sprintf("applicant%d@email.com", idx),
			Phone:       randomPhone(),
			Source:      hcm.ApplicantSource(rand.Intn(6) + 1),
			CreatedDate: time.Now().AddDate(0, 0, -rand.Intn(60)).Unix(),
			AuditInfo:   createAuditInfo(),
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
			applications = append(applications, &hcm.Application{
				ApplicationId: fmt.Sprintf("appl-%05d", idx),
				ApplicantId:   appID,
				RequisitionId: store.JobRequisitionIDs[rand.Intn(len(store.JobRequisitionIDs))],
				Status:        hcm.ApplicationStatus(rand.Intn(6) + 1),
				AppliedDate:   time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
				AuditInfo:     createAuditInfo(),
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

		plans = append(plans, &hcm.SuccessionPlan{
			PlanId:         fmt.Sprintf("succ-%03d", idx),
			PositionId:     posID,
			IncumbentId:    incumbentID,
			Status:         hcm.SuccessionPlanStatus(rand.Intn(3) + 1),
			VacancyRisk:    hcm.RiskLevel(rand.Intn(3) + 1),
			ReviewDate:     time.Now().Unix(),
			NextReviewDate: time.Now().AddDate(0, 6, 0).Unix(),
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
		paths = append(paths, &hcm.CareerPath{
			CareerPathId: fmt.Sprintf("career-%03d", idx),
			JobFamilyId:  jfID,
			Name:         fmt.Sprintf("Career Path %d", idx),
			Description:  "Standard progression path within the job family",
			IsActive:     true,
			AuditInfo:    createAuditInfo(),
		})
		idx++
	}
	return paths
}
