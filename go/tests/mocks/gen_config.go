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
	"time"

	"github.com/saichler/l8erp/go/types/hcm"
)

// generatePayStructures creates pay structure records
func generatePayStructures(store *MockDataStore) []*hcm.PayStructure {
	structures := []*hcm.PayStructure{
		{
			PayStructureId: "pstr-001",
			OrganizationId: store.OrganizationIDs[0],
			Name:           "Standard Pay Structure",
			Code:           "PSTR001",
			Description:    "Standard compensation structure for all employees",
			CurrencyId: pickRef(store.CurrencyIDs, 0),
			PayFrequency:   hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:       true,
			Grades:         generatePayGrades(store, 40000, 10000, 5),
			AuditInfo:      createAuditInfo(),
		},
		{
			PayStructureId: "pstr-002",
			OrganizationId: store.OrganizationIDs[0],
			Name:           "Executive Pay Structure",
			Code:           "PSTR002",
			Description:    "Compensation structure for executives",
			CurrencyId: pickRef(store.CurrencyIDs, 1),
			PayFrequency:   hcm.PayFrequency_PAY_FREQUENCY_MONTHLY,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:       true,
			Grades:         generatePayGrades(store, 100000, 25000, 4),
			AuditInfo:      createAuditInfo(),
		},
	}
	return structures
}

// generatePayComponents creates pay component records
func generatePayComponents(store *MockDataStore) []*hcm.PayComponent {
	components := []*hcm.PayComponent{
		{
			ComponentId:   "pc-001",
			Name:          "Base Salary",
			Code:          "BASE",
			ComponentType: hcm.PayComponentType_PAY_COMPONENT_TYPE_EARNING,
			Description:   "Base salary component",
			IsTaxable:     true,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		},
		{
			ComponentId:   "pc-002",
			Name:          "Performance Bonus",
			Code:          "BONUS",
			ComponentType: hcm.PayComponentType_PAY_COMPONENT_TYPE_EARNING,
			Description:   "Annual performance bonus",
			IsTaxable:     true,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		},
		{
			ComponentId:   "pc-003",
			Name:          "401k Deduction",
			Code:          "401K",
			ComponentType: hcm.PayComponentType_PAY_COMPONENT_TYPE_DEDUCTION,
			Description:   "401k retirement contribution",
			IsPreTax:      true,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		},
		{
			ComponentId:   "pc-004",
			Name:          "Health Insurance",
			Code:          "HEALTH",
			ComponentType: hcm.PayComponentType_PAY_COMPONENT_TYPE_EMPLOYER_CONTRIBUTION,
			Description:   "Health insurance premium - employer contribution",
			IsPreTax:      true,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		},
	}
	return components
}

// generateLeavePolicies creates leave policy records
func generateLeavePolicies(store *MockDataStore) []*hcm.LeavePolicy {
	policies := []*hcm.LeavePolicy{
		{
			PolicyId:         "lp-001",
			OrganizationId:   store.OrganizationIDs[0],
			Name:             "Standard PTO Policy",
			Code:             "PTO-STD",
			LeaveType:        hcm.LeaveType_LEAVE_TYPE_PTO,
			Description:      "Standard paid time off policy",
			MaximumAccrual:   120, // 15 days * 8 hours
			AllowCarryover:   true,
			MaximumCarryover: 40, // 5 days * 8 hours
			AccrualRate:      10, // hours per month
			AccrualMethod:    hcm.AccrualMethod_ACCRUAL_METHOD_FIXED,
			AccrualFrequency: hcm.AccrualFrequency_ACCRUAL_FREQUENCY_MONTHLY,
			RequireApproval:  true,
			AuditInfo:        createAuditInfo(),
		},
		{
			PolicyId:         "lp-002",
			OrganizationId:   store.OrganizationIDs[0],
			Name:             "Sick Leave Policy",
			Code:             "SICK-STD",
			LeaveType:        hcm.LeaveType_LEAVE_TYPE_SICK,
			Description:      "Standard sick leave policy",
			MaximumAccrual:   80, // 10 days * 8 hours
			AllowCarryover:   true,
			MaximumCarryover: 24, // 3 days * 8 hours
			AccrualRate:      6.67, // hours per month
			AccrualMethod:    hcm.AccrualMethod_ACCRUAL_METHOD_HOURS_WORKED,
			AccrualFrequency: hcm.AccrualFrequency_ACCRUAL_FREQUENCY_MONTHLY,
			RequireApproval:  true,
			AuditInfo:        createAuditInfo(),
		},
	}
	return policies
}

// generateShifts creates shift records
func generateShifts() []*hcm.Shift {
	// Helper to convert hour to Unix timestamp (seconds from midnight)
	hourToSeconds := func(hour int) int64 {
		return int64(hour * 3600)
	}

	shifts := []*hcm.Shift{
		{
			ShiftId:              "shift-001",
			Name:                 "Day Shift",
			Code:                 "DAY",
			Description:          "Standard day shift 9am-5pm",
			StartTime:            hourToSeconds(9),  // 9:00 AM
			EndTime:              hourToSeconds(17), // 5:00 PM
			DurationHours:        8.0,
			BreakDurationMinutes: 60,
			ShiftType:            hcm.ShiftType_SHIFT_TYPE_DAY,
			IsActive:             true,
			AuditInfo:            createAuditInfo(),
		},
		{
			ShiftId:              "shift-002",
			Name:                 "Swing Shift",
			Code:                 "SWING",
			Description:          "Swing shift 4pm-12am",
			StartTime:            hourToSeconds(16), // 4:00 PM
			EndTime:              hourToSeconds(0),  // 12:00 AM
			DurationHours:        8.0,
			BreakDurationMinutes: 60,
			ShiftType:            hcm.ShiftType_SHIFT_TYPE_DAY,
			IsOvernight:          true,
			IsActive:             true,
			AuditInfo:            createAuditInfo(),
		},
		{
			ShiftId:              "shift-003",
			Name:                 "Night Shift",
			Code:                 "NIGHT",
			Description:          "Night shift 12am-8am",
			StartTime:            hourToSeconds(0), // 12:00 AM
			EndTime:              hourToSeconds(8), // 8:00 AM
			DurationHours:        8.0,
			BreakDurationMinutes: 60,
			ShiftType:            hcm.ShiftType_SHIFT_TYPE_NIGHT,
			IsActive:             true,
			AuditInfo:            createAuditInfo(),
		},
	}
	return shifts
}

// generateHolidays creates holiday records
func generateHolidays(store *MockDataStore) []*hcm.Holiday {
	holidays := []*hcm.Holiday{
		{HolidayId: "hol-001", OrganizationId: store.OrganizationIDs[0], Name: "New Year's Day", Date: time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-002", OrganizationId: store.OrganizationIDs[0], Name: "MLK Day", Date: time.Date(2025, 1, 20, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-003", OrganizationId: store.OrganizationIDs[0], Name: "Presidents Day", Date: time.Date(2025, 2, 17, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-004", OrganizationId: store.OrganizationIDs[0], Name: "Memorial Day", Date: time.Date(2025, 5, 26, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-005", OrganizationId: store.OrganizationIDs[0], Name: "Independence Day", Date: time.Date(2025, 7, 4, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-006", OrganizationId: store.OrganizationIDs[0], Name: "Labor Day", Date: time.Date(2025, 9, 1, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-007", OrganizationId: store.OrganizationIDs[0], Name: "Thanksgiving", Date: time.Date(2025, 11, 27, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-008", OrganizationId: store.OrganizationIDs[0], Name: "Christmas Day", Date: time.Date(2025, 12, 25, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
	}
	return holidays
}

// generateBenefitPlans creates benefit plan records
func generateBenefitPlans(store *MockDataStore) []*hcm.BenefitPlan {
	plans := []*hcm.BenefitPlan{
		{
			PlanId:         "bplan-001",
			OrganizationId: store.OrganizationIDs[0],
			CarrierId:      store.CarrierIDs[0],
			Name:           "Gold Health Plan",
			Code:           "HEALTH-GOLD",
			PlanType:       hcm.BenefitPlanType_BENEFIT_PLAN_TYPE_MEDICAL,
			Category:       hcm.BenefitPlanCategory_BENEFIT_PLAN_CATEGORY_HEALTH,
			Description:    "Premium health coverage with low deductibles",
			PlanYear:       2025,
			IsActive:       true,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			CoverageOptions: []*hcm.CoverageOption{
				{OptionId: "copt-001", CoverageLevel: hcm.CoverageLevel_COVERAGE_LEVEL_EMPLOYEE_ONLY, Name: "Employee Only"},
				{OptionId: "copt-002", CoverageLevel: hcm.CoverageLevel_COVERAGE_LEVEL_EMPLOYEE_SPOUSE, Name: "Employee + Spouse"},
				{OptionId: "copt-003", CoverageLevel: hcm.CoverageLevel_COVERAGE_LEVEL_EMPLOYEE_FAMILY, Name: "Family"},
			},
			Costs: []*hcm.PlanCost{
				{CoverageOptionId: "copt-001", EmployeeCost: money(store, 15000), EmployerCost: money(store, 45000), TotalCost: money(store, 60000), PayFrequency: hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY},
				{CoverageOptionId: "copt-002", EmployeeCost: money(store, 30000), EmployerCost: money(store, 60000), TotalCost: money(store, 90000), PayFrequency: hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY},
				{CoverageOptionId: "copt-003", EmployeeCost: money(store, 45000), EmployerCost: money(store, 75000), TotalCost: money(store, 120000), PayFrequency: hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY},
			},
		},
		{
			PlanId:         "bplan-002",
			OrganizationId: store.OrganizationIDs[0],
			CarrierId:      store.CarrierIDs[0],
			Name:           "Silver Health Plan",
			Code:           "HEALTH-SILVER",
			PlanType:       hcm.BenefitPlanType_BENEFIT_PLAN_TYPE_MEDICAL,
			Category:       hcm.BenefitPlanCategory_BENEFIT_PLAN_CATEGORY_HEALTH,
			Description:    "Standard health coverage",
			PlanYear:       2025,
			IsActive:       true,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			CoverageOptions: []*hcm.CoverageOption{
				{OptionId: "copt-004", CoverageLevel: hcm.CoverageLevel_COVERAGE_LEVEL_EMPLOYEE_ONLY, Name: "Employee Only"},
				{OptionId: "copt-005", CoverageLevel: hcm.CoverageLevel_COVERAGE_LEVEL_EMPLOYEE_FAMILY, Name: "Family"},
			},
			Costs: []*hcm.PlanCost{
				{CoverageOptionId: "copt-004", EmployeeCost: money(store, 10000), EmployerCost: money(store, 30000), TotalCost: money(store, 40000), PayFrequency: hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY},
				{CoverageOptionId: "copt-005", EmployeeCost: money(store, 35000), EmployerCost: money(store, 55000), TotalCost: money(store, 90000), PayFrequency: hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY},
			},
		},
		{
			PlanId:         "bplan-003",
			OrganizationId: store.OrganizationIDs[0],
			CarrierId:      store.CarrierIDs[7],
			Name:           "Dental Plan",
			Code:           "DENTAL-STD",
			PlanType:       hcm.BenefitPlanType_BENEFIT_PLAN_TYPE_DENTAL,
			Category:       hcm.BenefitPlanCategory_BENEFIT_PLAN_CATEGORY_HEALTH,
			Description:    "Standard dental coverage",
			PlanYear:       2025,
			IsActive:       true,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			CoverageOptions: []*hcm.CoverageOption{
				{OptionId: "copt-006", CoverageLevel: hcm.CoverageLevel_COVERAGE_LEVEL_EMPLOYEE_ONLY, Name: "Employee Only"},
				{OptionId: "copt-007", CoverageLevel: hcm.CoverageLevel_COVERAGE_LEVEL_EMPLOYEE_FAMILY, Name: "Family"},
			},
			Costs: []*hcm.PlanCost{
				{CoverageOptionId: "copt-006", EmployeeCost: money(store, 2500), EmployerCost: money(store, 7500), TotalCost: money(store, 10000), PayFrequency: hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY},
				{CoverageOptionId: "copt-007", EmployeeCost: money(store, 5000), EmployerCost: money(store, 10000), TotalCost: money(store, 15000), PayFrequency: hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY},
			},
		},
		{
			PlanId:         "bplan-004",
			OrganizationId: store.OrganizationIDs[0],
			CarrierId:      store.CarrierIDs[8],
			Name:           "Vision Plan",
			Code:           "VISION-STD",
			PlanType:       hcm.BenefitPlanType_BENEFIT_PLAN_TYPE_VISION,
			Category:       hcm.BenefitPlanCategory_BENEFIT_PLAN_CATEGORY_HEALTH,
			Description:    "Standard vision coverage",
			PlanYear:       2025,
			IsActive:       true,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			CoverageOptions: []*hcm.CoverageOption{
				{OptionId: "copt-008", CoverageLevel: hcm.CoverageLevel_COVERAGE_LEVEL_EMPLOYEE_ONLY, Name: "Employee Only"},
			},
			Costs: []*hcm.PlanCost{
				{CoverageOptionId: "copt-008", EmployeeCost: money(store, 1000), EmployerCost: money(store, 4000), TotalCost: money(store, 5000), PayFrequency: hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY},
			},
		},
	}
	return plans
}

func generatePayGrades(store *MockDataStore, baseMin, stepSize int64, count int) []*hcm.PayGradeDefinition {
	grades := make([]*hcm.PayGradeDefinition, count)
	for i := 0; i < count; i++ {
		min := (baseMin + int64(i)*stepSize) * 100
		mid := min + stepSize*50
		max := min + stepSize*100
		steps := make([]*hcm.PayStep, 3)
		for s := 0; s < 3; s++ {
			steps[s] = &hcm.PayStep{StepNumber: int32(s + 1), Amount: money(store, min+int64(s)*(max-min)/2)}
		}
		grades[i] = &hcm.PayGradeDefinition{
			GradeCode: fmt.Sprintf("G%d", i+1), GradeName: fmt.Sprintf("Grade %d", i+1),
			GradeLevel: int32(i + 1), Minimum: money(store, min), Midpoint: money(store, mid),
			Maximum: money(store, max), Steps: steps,
		}
	}
	return grades
}
