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

	"github.com/saichler/l8erp/go/types/hcm"
)

// generateCourseEnrollments creates course enrollment records
func generateCourseEnrollments(store *MockDataStore) []*hcm.CourseEnrollment {
	enrollments := make([]*hcm.CourseEnrollment, 0)
	idx := 1

	// 40% of employees enrolled in courses
	for i := 0; i < len(store.EmployeeIDs)*4/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		enrollDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		enrollments = append(enrollments, &hcm.CourseEnrollment{
			EnrollmentId: fmt.Sprintf("crsenrol-%04d", idx),
			EmployeeId:   empID,
			CourseId:     store.CourseIDs[rand.Intn(len(store.CourseIDs))],
			SessionId:    store.CourseSessionIDs[rand.Intn(len(store.CourseSessionIDs))],
			EnrolledDate: enrollDate.Unix(),
			Status:       hcm.CourseEnrollmentStatus(rand.Intn(4) + 1),
			AuditInfo:    createAuditInfo(),
		})
		idx++
	}
	return enrollments
}

// generateEmployeeCertifications creates employee certification records
func generateEmployeeCertifications(store *MockDataStore) []*hcm.EmployeeCertification {
	certs := make([]*hcm.EmployeeCertification, 0)
	idx := 1

	// 30% of employees have certifications
	for i := 0; i < len(store.EmployeeIDs)*3/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		issueDate := time.Date(2024-rand.Intn(5), time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		certs = append(certs, &hcm.EmployeeCertification{
			EmployeeCertificationId: fmt.Sprintf("empcert-%04d", idx),
			EmployeeId:              empID,
			CertificationId:         store.CertificationIDs[rand.Intn(len(store.CertificationIDs))],
			IssueDate:               issueDate.Unix(),
			ExpirationDate:          issueDate.AddDate(3, 0, 0).Unix(),
			Status:                  hcm.CertificationStatus_CERTIFICATION_STATUS_ACTIVE,
			AuditInfo:               createAuditInfo(),
		})
		idx++
	}
	return certs
}

// generateTrainingRecords creates training record records
func generateTrainingRecords(store *MockDataStore) []*hcm.TrainingRecord {
	records := make([]*hcm.TrainingRecord, 0)
	idx := 1
	trainingTypes := []hcm.TrainingType{
		hcm.TrainingType_TRAINING_TYPE_COMPLIANCE,
		hcm.TrainingType_TRAINING_TYPE_SAFETY,
		hcm.TrainingType_TRAINING_TYPE_SECURITY,
		hcm.TrainingType_TRAINING_TYPE_DIVERSITY,
	}

	// 50% of employees have training records
	for i := 0; i < len(store.EmployeeIDs)/2; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		completedDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		records = append(records, &hcm.TrainingRecord{
			RecordId:      fmt.Sprintf("train-%04d", idx),
			EmployeeId:    empID,
			CourseId:      store.CourseIDs[rand.Intn(len(store.CourseIDs))],
			TrainingType:  trainingTypes[rand.Intn(len(trainingTypes))],
			CompletedDate: completedDate.Unix(),
			IsCompliant:   true,
			Score:         int32(rand.Intn(30) + 70),
			Passed:        true,
			AuditInfo:     createAuditInfo(),
		})
		idx++
	}
	return records
}

// generateFeedback creates feedback records
func generateFeedback(store *MockDataStore) []*hcm.Feedback {
	feedbacks := make([]*hcm.Feedback, 0)
	idx := 1
	feedbackTypes := []hcm.FeedbackType{
		hcm.FeedbackType_FEEDBACK_TYPE_PEER,
		hcm.FeedbackType_FEEDBACK_TYPE_UPWARD,
		hcm.FeedbackType_FEEDBACK_TYPE_CONTINUOUS,
	}
	relationships := []hcm.FeedbackRelationship{
		hcm.FeedbackRelationship_FEEDBACK_RELATIONSHIP_MANAGER,
		hcm.FeedbackRelationship_FEEDBACK_RELATIONSHIP_PEER,
		hcm.FeedbackRelationship_FEEDBACK_RELATIONSHIP_DIRECT_REPORT,
		hcm.FeedbackRelationship_FEEDBACK_RELATIONSHIP_CROSS_FUNCTIONAL,
	}

	// Create feedback between employees
	for i := 0; i < len(store.EmployeeIDs)/3; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		providerID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		if empID == providerID {
			continue
		}

		feedbacks = append(feedbacks, &hcm.Feedback{
			FeedbackId:      fmt.Sprintf("fb-%04d", idx),
			EmployeeId:      empID,
			ProviderId:      providerID,
			FeedbackType:    feedbackTypes[rand.Intn(len(feedbackTypes))],
			Relationship:    relationships[rand.Intn(len(relationships))],
			GeneralComments: "Great collaboration and teamwork.",
			SubmittedDate:   time.Now().AddDate(0, -rand.Intn(6), 0).Unix(),
			Status:          hcm.FeedbackStatus_FEEDBACK_STATUS_SUBMITTED,
			AuditInfo:       createAuditInfo(),
		})
		idx++
	}
	return feedbacks
}

// generateOnboardingTasks creates onboarding task records
func generateOnboardingTasks(store *MockDataStore) []*hcm.OnboardingTask {
	tasks := make([]*hcm.OnboardingTask, 0)
	idx := 1
	taskNames := []string{
		"Complete I-9 Form",
		"Setup Direct Deposit",
		"Complete Benefits Enrollment",
		"Review Employee Handbook",
		"Complete IT Security Training",
		"Setup Workstation",
	}

	// Recent hires (10% of employees)
	numNewHires := len(store.EmployeeIDs) / 10
	if numNewHires < 1 {
		numNewHires = 1
	}

	taskCategories := []hcm.OnboardingTaskCategory{
		hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_PAPERWORK,
		hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_BENEFITS,
		hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_BENEFITS,
		hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_COMPLIANCE,
		hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_TRAINING,
		hcm.OnboardingTaskCategory_ONBOARDING_TASK_CATEGORY_IT_SETUP,
	}

	for i := 0; i < numNewHires; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		for j, taskName := range taskNames {
			tasks = append(tasks, &hcm.OnboardingTask{
				TaskId:        fmt.Sprintf("onb-%05d", idx),
				EmployeeId:    empID,
				Name:          taskName,
				Description:   fmt.Sprintf("Complete: %s", taskName),
				DueDate:       time.Now().AddDate(0, 0, rand.Intn(30)).Unix(),
				Category:      taskCategories[j%len(taskCategories)],
				Status:        hcm.OnboardingTaskStatus(rand.Intn(3) + 1),
				SequenceOrder: int32(j + 1),
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return tasks
}
