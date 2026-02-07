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

// Generates:
// - PrjResourcePool
// - PrjResource
// - PrjResourceSkill
// - PrjCapacityPlan

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/prj"
)

// generateResourcePools creates 10 resource pool records
func generateResourcePools(store *MockDataStore) []*prj.PrjResourcePool {
	pools := make([]*prj.PrjResourcePool, 10)

	for i := 0; i < 10; i++ {
		name := prjResourcePoolNames[i%len(prjResourcePoolNames)]

		// Manager assignment
		managerID := pickRef(store.ManagerIDs, i)

		// Department assignment
		departmentID := pickRef(store.DepartmentIDs, i)

		// IsActive: 90% active, 10% inactive
		isActive := i < 9

		// Total capacity hours: 160-400 hours per week per pool
		totalCapacityHours := float64(rand.Intn(241) + 160)

		pools[i] = &prj.PrjResourcePool{
			PoolId:             genID("pool", i),
			Name:               name,
			Description:        fmt.Sprintf("%s resource pool for project assignments", name),
			ManagerId:          managerID,
			DepartmentId:       departmentID,
			IsActive:           isActive,
			TotalCapacityHours: totalCapacityHours,
			AuditInfo:          createAuditInfo(),
		}
	}

	return pools
}

// generateResources creates 25 resource records
func generateResources(store *MockDataStore) []*prj.PrjResource {
	resources := make([]*prj.PrjResource, 25)

	jobTitles := []string{
		"Senior Developer", "Project Manager", "Business Analyst",
		"QA Engineer", "DevOps Engineer", "UI/UX Designer",
		"Data Engineer", "Security Analyst", "Solutions Architect",
	}

	locations := []string{
		"New York", "San Francisco", "Chicago", "Austin", "Seattle",
		"Denver", "Boston", "Los Angeles", "Portland", "Dallas",
	}

	timeZones := []string{
		"America/New_York", "America/Los_Angeles", "America/Chicago",
		"America/Denver", "America/Phoenix",
	}

	for i := 0; i < 25; i++ {
		// Resource type distribution: EMPLOYEE (60%), CONTRACTOR (25%), EQUIPMENT (10%), MATERIAL (5%)
		var resourceType prj.PrjResourceType
		switch {
		case i < 15:
			resourceType = prj.PrjResourceType_PRJ_RESOURCE_TYPE_EMPLOYEE
		case i < 21:
			resourceType = prj.PrjResourceType_PRJ_RESOURCE_TYPE_CONTRACTOR
		case i < 24:
			resourceType = prj.PrjResourceType_PRJ_RESOURCE_TYPE_EQUIPMENT
		default:
			resourceType = prj.PrjResourceType_PRJ_RESOURCE_TYPE_MATERIAL
		}

		// Pool assignment
		poolID := pickRef(store.PrjResourcePoolIDs, i)

		// Employee assignment (only for EMPLOYEE type)
		employeeID := ""
		if resourceType == prj.PrjResourceType_PRJ_RESOURCE_TYPE_EMPLOYEE && len(store.EmployeeIDs) > 0 {
			employeeID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		// Generate name based on resource type
		var name string
		switch resourceType {
		case prj.PrjResourceType_PRJ_RESOURCE_TYPE_EMPLOYEE, prj.PrjResourceType_PRJ_RESOURCE_TYPE_CONTRACTOR:
			name = fmt.Sprintf("%s %s", firstNames[i%len(firstNames)], lastNames[i%len(lastNames)])
		case prj.PrjResourceType_PRJ_RESOURCE_TYPE_EQUIPMENT:
			name = fmt.Sprintf("Equipment Unit %03d", i+1)
		default:
			name = fmt.Sprintf("Material Resource %03d", i+1)
		}

		// Hourly cost: $50 - $250 per hour (in cents)
		hourlyCost := int64(rand.Intn(20001) + 5000) // $50-$250 in cents

		// Billing rate: hourly cost * 1.5-2.5 markup
		billingRate := int64(float64(hourlyCost) * (1.5 + rand.Float64()))

		// Availability: 75-100%
		availabilityPercent := float64(rand.Intn(26) + 75)

		// Capacity hours per week: 20-40 hours
		capacityHoursPerWeek := float64(rand.Intn(21) + 20)

		// Available from/until dates
		availableFrom := time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC)
		availableUntil := time.Date(2026, 12, 31, 0, 0, 0, 0, time.UTC)

		// IsActive: 90% active
		isActive := i < 22

		resources[i] = &prj.PrjResource{
			ResourceId:           genID("res", i),
			Name:                 name,
			EmployeeId:           employeeID,
			PoolId:               poolID,
			ResourceType:         resourceType,
			JobTitle:             jobTitles[i%len(jobTitles)],
			HourlyCost:           money(store, hourlyCost),
			BillingRate:          money(store, billingRate),
			AvailabilityPercent:  availabilityPercent,
			CapacityHoursPerWeek: capacityHoursPerWeek,
			AvailableFrom:        availableFrom.Unix(),
			AvailableUntil:       availableUntil.Unix(),
			IsActive:             isActive,
			Location:             locations[i%len(locations)],
			TimeZone:             timeZones[i%len(timeZones)],
			AuditInfo:            createAuditInfo(),
		}
	}

	return resources
}

// generateResourceSkills creates 50 resource skill records
func generateResourceSkills(store *MockDataStore) []*prj.PrjResourceSkill {
	skills := make([]*prj.PrjResourceSkill, 50)

	skillCategories := []string{
		"Technical", "Business", "Management", "Design", "Analytics",
	}

	for i := 0; i < 50; i++ {
		// Resource assignment
		resourceID := pickRef(store.PrjResourceIDs, i)

		// Skill name from data array
		skillName := prjSkillNames[i%len(prjSkillNames)]

		// Proficiency level: 1-5 scale with distribution
		// Level 3-4 most common (60%), level 5 (20%), level 1-2 (20%)
		var proficiencyLevel int32
		switch {
		case i < 10:
			proficiencyLevel = int32(rand.Intn(2) + 1) // 1-2
		case i < 40:
			proficiencyLevel = int32(rand.Intn(2) + 3) // 3-4
		default:
			proficiencyLevel = 5
		}

		// Years of experience: 1-15 years, correlated with proficiency
		yearsExperience := int32(proficiencyLevel*2 + int32(rand.Intn(3)))

		// IsPrimary: 30% are primary skills
		isPrimary := i%3 == 0

		// Certification dates (for about 40% of skills)
		var certifiedDate int64
		var certificationExpiry int64
		if i%5 < 2 {
			certDate := time.Date(2023, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)
			certifiedDate = certDate.Unix()
			certificationExpiry = certDate.AddDate(2, 0, 0).Unix() // 2 years validity
		}

		skills[i] = &prj.PrjResourceSkill{
			SkillId:             genID("rskill", i),
			ResourceId:          resourceID,
			SkillName:           skillName,
			SkillCategory:       skillCategories[i%len(skillCategories)],
			ProficiencyLevel:    proficiencyLevel,
			YearsExperience:     yearsExperience,
			IsPrimary:           isPrimary,
			CertifiedDate:       certifiedDate,
			CertificationExpiry: certificationExpiry,
			AuditInfo:           createAuditInfo(),
		}
	}

	return skills
}

// generatePrjCapacityPlans creates 15 capacity plan records
func generatePrjCapacityPlans(store *MockDataStore) []*prj.PrjCapacityPlan {
	plans := make([]*prj.PrjCapacityPlan, 15)

	planNames := []string{
		"Q1 2025 Capacity Plan", "Q2 2025 Capacity Plan",
		"Q3 2025 Capacity Plan", "Q4 2025 Capacity Plan",
		"Annual Capacity Plan 2025", "Development Team Plan",
		"QA Team Plan", "DevOps Team Plan", "Design Team Plan",
		"Consulting Pool Plan", "Project Management Plan",
		"Data Engineering Plan", "Security Team Plan",
		"Support Team Plan", "Business Analysis Plan",
	}

	for i := 0; i < 15; i++ {
		// Pool assignment
		poolID := pickRef(store.PrjResourcePoolIDs, i)

		// Period dates: staggered quarterly periods
		quarter := (i % 4) + 1
		year := 2025
		if i >= 12 {
			year = 2026
		}
		periodStart := time.Date(year, time.Month((quarter-1)*3+1), 1, 0, 0, 0, 0, time.UTC)
		periodEnd := periodStart.AddDate(0, 3, -1) // End of quarter

		// Total capacity hours: 400-2000 hours per quarter
		totalCapacityHours := float64(rand.Intn(1601) + 400)

		// Allocated hours: 50-90% of total capacity
		allocationPercent := float64(rand.Intn(41)+50) / 100
		allocatedHours := totalCapacityHours * allocationPercent

		// Available hours: remaining capacity
		availableHours := totalCapacityHours - allocatedHours

		// Utilization target: 75-95%
		utilizationTarget := float64(rand.Intn(21) + 75)

		// IsActive: 85% active
		isActive := i < 13

		plans[i] = &prj.PrjCapacityPlan{
			PlanId:             genID("cplan", i),
			Name:               planNames[i%len(planNames)],
			Description:        fmt.Sprintf("Capacity planning for %s", planNames[i%len(planNames)]),
			PoolId:             poolID,
			PeriodStart:        periodStart.Unix(),
			PeriodEnd:          periodEnd.Unix(),
			TotalCapacityHours: totalCapacityHours,
			AllocatedHours:     allocatedHours,
			AvailableHours:     availableHours,
			UtilizationTarget:  utilizationTarget,
			IsActive:           isActive,
			AuditInfo:          createAuditInfo(),
		}
	}

	return plans
}
