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

// generateSalaryStructures creates salary structure records
func generateSalaryStructures(store *MockDataStore) []*hcm.SalaryStructure {
	structures := []*hcm.SalaryStructure{
		{
			StructureId:    "sstr-001",
			OrganizationId: store.OrganizationIDs[0],
			Name:           "2025 Salary Structure",
			Code:           "SAL2025",
			Description:    "Salary structure for fiscal year 2025",
			CurrencyId:     pickRef(store.CurrencyIDs, 0),
			PayFrequency:   hcm.PayFrequency_PAY_FREQUENCY_ANNUALLY,
			EffectiveDate:  time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:       true,
			AuditInfo:      createAuditInfo(),
		},
	}
	return structures
}

// generateSalaryGrades creates salary grade records
func generateSalaryGrades(store *MockDataStore) []*hcm.SalaryGrade {
	grades := make([]*hcm.SalaryGrade, 0)
	baseRanges := []struct {
		level string
		min   int64 // In cents
		mid   int64
		max   int64
	}{
		{"L1", 4000000, 5000000, 6000000},    // $40k-$60k
		{"L2", 5500000, 7000000, 8500000},    // $55k-$85k
		{"L3", 7500000, 9500000, 11500000},   // $75k-$115k
		{"L4", 10000000, 13000000, 16000000}, // $100k-$160k
		{"L5", 14000000, 18000000, 22000000}, // $140k-$220k
		{"L6", 19000000, 25000000, 31000000}, // $190k-$310k
	}

	for i, r := range baseRanges {
		grades = append(grades, &hcm.SalaryGrade{
			GradeId:           genID("grade", i),
			OrganizationId:    store.OrganizationIDs[0],
			SalaryStructureId: store.SalaryStructureIDs[0],
			Name:              fmt.Sprintf("Grade %s", r.level),
			GradeCode:         r.level,
			Level:             int32(i + 1),
			Minimum:           money(store, r.min),
			Midpoint:          money(store, r.mid),
			Maximum:           money(store, r.max),
			CurrencyId:        pickRef(store.CurrencyIDs, i),
			PayFrequency:      hcm.PayFrequency_PAY_FREQUENCY_ANNUALLY,
			IsActive:          true,
			EffectiveDate:     time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:         createAuditInfo(),
		})
	}
	return grades
}

// generateBonusPlans creates bonus plan records
func generateBonusPlans(store *MockDataStore) []*hcm.BonusPlan {
	plans := []*hcm.BonusPlan{
		{
			PlanId:            "bonus-001",
			OrganizationId:    store.OrganizationIDs[0],
			Name:              "Annual Performance Bonus",
			Code:              "APB",
			Description:       "Annual bonus based on individual and company performance",
			PlanType:          hcm.BonusPlanType_BONUS_PLAN_TYPE_PERFORMANCE,
			FundingType:       hcm.BonusFundingType_BONUS_FUNDING_TYPE_PERCENTAGE_OF_PROFITS,
			PlanYear:          2025,
			Frequency:         hcm.BonusFrequency_BONUS_FREQUENCY_ANNUAL,
			TargetPercentage:  10.0,
			MaximumPercentage: 20.0,
			EffectiveDate:     time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		},
		{
			PlanId:            "bonus-002",
			OrganizationId:    store.OrganizationIDs[0],
			Name:              "Quarterly Sales Bonus",
			Code:              "QSB",
			Description:       "Quarterly bonus for sales team based on targets",
			PlanType:          hcm.BonusPlanType_BONUS_PLAN_TYPE_SALES_COMMISSION,
			FundingType:       hcm.BonusFundingType_BONUS_FUNDING_TYPE_PERCENTAGE_OF_REVENUE,
			PlanYear:          2025,
			Frequency:         hcm.BonusFrequency_BONUS_FREQUENCY_QUARTERLY,
			TargetPercentage:  15.0,
			MaximumPercentage: 30.0,
			EffectiveDate:     time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		},
	}
	return plans
}

// generateMeritCycles creates merit cycle records
func generateMeritCycles(store *MockDataStore) []*hcm.MeritCycle {
	cycles := []*hcm.MeritCycle{
		{
			CycleId:           "mcycle-001",
			OrganizationId:    store.OrganizationIDs[0],
			Name:              "2025 Merit Cycle",
			Year:              2025,
			PlanningStartDate: time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			PlanningEndDate:   time.Date(2025, 3, 31, 0, 0, 0, 0, time.UTC).Unix(),
			EffectiveDate:     time.Date(2025, 4, 1, 0, 0, 0, 0, time.UTC).Unix(),
			BudgetPercentage:  3.5,
			Status:            hcm.MeritCycleStatus_MERIT_CYCLE_STATUS_PLANNING,
			Notes:             "Annual merit increase cycle for 2025",
			AuditInfo:         createAuditInfo(),
		},
	}
	return cycles
}

// generateCourses creates course records
func generateCourses(store *MockDataStore) []*hcm.Course {
	courses := make([]*hcm.Course, len(courseNames))
	deliveryMethods := []hcm.CourseDeliveryMethod{
		hcm.CourseDeliveryMethod_COURSE_DELIVERY_METHOD_INSTRUCTOR_LED,
		hcm.CourseDeliveryMethod_COURSE_DELIVERY_METHOD_E_LEARNING,
		hcm.CourseDeliveryMethod_COURSE_DELIVERY_METHOD_BLENDED,
	}
	courseTypes := []hcm.CourseType{
		hcm.CourseType_COURSE_TYPE_TRAINING,
		hcm.CourseType_COURSE_TYPE_CERTIFICATION,
		hcm.CourseType_COURSE_TYPE_COMPLIANCE,
		hcm.CourseType_COURSE_TYPE_ONBOARDING,
		hcm.CourseType_COURSE_TYPE_LEADERSHIP,
		hcm.CourseType_COURSE_TYPE_SKILLS,
		hcm.CourseType_COURSE_TYPE_SAFETY,
	}
	courseCategories := []hcm.CourseCategory{
		hcm.CourseCategory_COURSE_CATEGORY_TECHNICAL,
		hcm.CourseCategory_COURSE_CATEGORY_SOFT_SKILLS,
		hcm.CourseCategory_COURSE_CATEGORY_LEADERSHIP,
		hcm.CourseCategory_COURSE_CATEGORY_COMPLIANCE,
		hcm.CourseCategory_COURSE_CATEGORY_SAFETY,
		hcm.CourseCategory_COURSE_CATEGORY_PRODUCT,
	}
	courseLevels := []hcm.CourseLevel{
		hcm.CourseLevel_COURSE_LEVEL_BEGINNER,
		hcm.CourseLevel_COURSE_LEVEL_INTERMEDIATE,
		hcm.CourseLevel_COURSE_LEVEL_ADVANCED,
		hcm.CourseLevel_COURSE_LEVEL_EXPERT,
	}

	for i, name := range courseNames {
		courses[i] = &hcm.Course{
			CourseId:        genID("course", i),
			OrganizationId:  store.OrganizationIDs[0],
			Title:           name,
			Code:            genCode("CRS", i),
			Description:     fmt.Sprintf("Training course: %s", name),
			CourseType:      courseTypes[i%len(courseTypes)],
			DeliveryMethod:  deliveryMethods[i%len(deliveryMethods)],
			Category:        courseCategories[i%len(courseCategories)],
			Level:           courseLevels[i%len(courseLevels)],
			DurationMinutes: int32((rand.Intn(4) + 1) * 60), // 1-4 hours
			IsActive:        true,
			AuditInfo:       createAuditInfo(),
		}
	}
	return courses
}

// generateCourseSessions creates course session records
func generateCourseSessions(store *MockDataStore) []*hcm.CourseSession {
	sessions := make([]*hcm.CourseSession, 0)
	sessionIdx := 1

	// Create 2 sessions per course
	for _, courseID := range store.CourseIDs {
		for j := 0; j < 2; j++ {
			startDate := time.Now().AddDate(0, j+1, 0)
			sessions = append(sessions, &hcm.CourseSession{
				SessionId:    fmt.Sprintf("sess-%03d", sessionIdx),
				CourseId:     courseID,
				StartDate:    startDate.Unix(),
				EndDate:      startDate.Add(4 * time.Hour).Unix(),
				Location:     cities[rand.Intn(len(cities))],
				MaxEnrollees: int32(rand.Intn(15) + 10),
				Status:       hcm.SessionStatus_SESSION_STATUS_SCHEDULED,
				AuditInfo:    createAuditInfo(),
			})
			sessionIdx++
		}
	}
	return sessions
}
