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

	"github.com/saichler/l8erp/go/types/prj"
)

// generatePrjPhase1 creates foundation data: templates, expense categories, policies, approval rules
func generatePrjPhase1(client *HCMClient, store *MockDataStore) error {
	templates := generateProjectTemplates(store)
	if err := runOp(client, "Project Templates", "/erp/90/PrjProjTpl", &prj.PrjProjectTemplateList{List: templates}, extractIDs(templates, func(v interface{}) string { return v.(*prj.PrjProjectTemplate).TemplateId }), &store.PrjProjectTemplateIDs); err != nil {
		return err
	}

	categories := generateExpenseCategories(store)
	if err := runOp(client, "Expense Categories", "/erp/90/PrjExpCat", &prj.PrjExpenseCategoryList{List: categories}, extractIDs(categories, func(v interface{}) string { return v.(*prj.PrjExpenseCategory).CategoryId }), &store.PrjExpenseCategoryIDs); err != nil {
		return err
	}

	policies := generateExpensePolicies(store)
	if err := runOp(client, "Expense Policies", "/erp/90/PrjExpPol", &prj.PrjExpensePolicyList{List: policies}, extractIDs(policies, func(v interface{}) string { return v.(*prj.PrjExpensePolicy).PolicyId }), &store.PrjExpensePolicyIDs); err != nil {
		return err
	}

	rules := generateApprovalRules(store)
	if err := runOp(client, "Approval Rules", "/erp/90/PrjApprRl", &prj.PrjApprovalRuleList{List: rules}, extractIDs(rules, func(v interface{}) string { return v.(*prj.PrjApprovalRule).RuleId }), &store.PrjApprovalRuleIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase2 creates projects with embedded children:
// phases, tasks, milestones, deliverables, dependencies, risks, issues, earned values
func generatePrjPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate project shells and extract IDs for cross-references
	projects := generateProjects(store)
	store.PrjProjectIDs = extractIDs(projects, func(v interface{}) string { return v.(*prj.PrjProject).ProjectId })

	// Generate children in dependency order, extracting IDs for cross-refs
	phases := generatePhases(store)
	store.PrjPhaseIDs = extractIDs(phases, func(v interface{}) string { return v.(*prj.PrjPhase).PhaseId })
	fmt.Printf("  Generated %d phases\n", len(phases))

	risks := generateRisks(store)
	store.PrjRiskIDs = extractIDs(risks, func(v interface{}) string { return v.(*prj.PrjRisk).RiskId })
	fmt.Printf("  Generated %d risks\n", len(risks))

	tasks := generateTasks(store) // needs PhaseIDs
	store.PrjTaskIDs = extractIDs(tasks, func(v interface{}) string { return v.(*prj.PrjTask).TaskId })
	fmt.Printf("  Generated %d tasks\n", len(tasks))

	milestones := generateMilestones(store) // needs PhaseIDs
	store.PrjMilestoneIDs = extractIDs(milestones, func(v interface{}) string { return v.(*prj.PrjMilestone).MilestoneId })
	fmt.Printf("  Generated %d milestones\n", len(milestones))

	deliverables := generateDeliverables(store) // needs TaskIDs, MilestoneIDs
	fmt.Printf("  Generated %d deliverables\n", len(deliverables))

	dependencies := generateDependencies(store) // needs TaskIDs
	fmt.Printf("  Generated %d dependencies\n", len(dependencies))

	issues := generateProjectIssues(store) // needs TaskIDs, RiskIDs
	fmt.Printf("  Generated %d issues\n", len(issues))

	earnedValues := generateEarnedValues(store)
	fmt.Printf("  Generated %d earned values\n", len(earnedValues))

	// Distribute children into projects using same modulo logic as original generators
	n := len(projects)
	for i, c := range phases {
		projects[i%n].Phases = append(projects[i%n].Phases, c)
	}
	for i, c := range tasks {
		projects[i%n].Tasks = append(projects[i%n].Tasks, c)
	}
	for i, c := range milestones {
		projects[i%n].Milestones = append(projects[i%n].Milestones, c)
	}
	for i, c := range deliverables {
		projects[i%n].Deliverables = append(projects[i%n].Deliverables, c)
	}
	for i, c := range dependencies {
		projects[i%n].Dependencies = append(projects[i%n].Dependencies, c)
	}
	for i, c := range risks {
		projects[i%n].Risks = append(projects[i%n].Risks, c)
	}
	for i, c := range issues {
		projects[i%n].Issues = append(projects[i%n].Issues, c)
	}
	for i, c := range earnedValues {
		projects[i%n].EarnedValues = append(projects[i%n].EarnedValues, c)
	}

	// Post projects with all embedded children
	if err := runOp(client, "Projects", "/erp/90/PrjProj", &prj.PrjProjectList{List: projects}, store.PrjProjectIDs, nil); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase3 creates resource pools, resources (with embedded skills), and capacity plans
func generatePrjPhase3(client *HCMClient, store *MockDataStore) error {
	pools := generateResourcePools(store)
	if err := runOp(client, "Resource Pools", "/erp/90/PrjResPool", &prj.PrjResourcePoolList{List: pools}, extractIDs(pools, func(v interface{}) string { return v.(*prj.PrjResourcePool).PoolId }), &store.PrjResourcePoolIDs); err != nil {
		return err
	}

	// Generate resources and embed skills
	resources := generateResources(store)
	skills := generateResourceSkills(store)
	fmt.Printf("  Generated %d skills\n", len(skills))
	for i, s := range skills {
		resources[i%len(resources)].Skills = append(resources[i%len(resources)].Skills, s)
	}
	if err := runOp(client, "Resources", "/erp/90/PrjRes", &prj.PrjResourceList{List: resources}, extractIDs(resources, func(v interface{}) string { return v.(*prj.PrjResource).ResourceId }), &store.PrjResourceIDs); err != nil {
		return err
	}

	plans := generatePrjCapacityPlans(store)
	if err := runOp(client, "Capacity Plans", "/erp/90/PrjCapPlan", &prj.PrjCapacityPlanList{List: plans}, extractIDs(plans, func(v interface{}) string { return v.(*prj.PrjCapacityPlan).PlanId }), &store.PrjCapacityPlanIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase4 creates resource allocation data
func generatePrjPhase4(client *HCMClient, store *MockDataStore) error {
	allocations := generateAllocations(store)
	if err := runOp(client, "Allocations", "/erp/90/PrjAlloc", &prj.PrjAllocationList{List: allocations}, extractIDs(allocations, func(v interface{}) string { return v.(*prj.PrjAllocation).AllocationId }), &store.PrjAllocationIDs); err != nil {
		return err
	}

	bookings := generateBookings(store)
	if err := runOp(client, "Bookings", "/erp/90/PrjBooking", &prj.PrjBookingList{List: bookings}, extractIDs(bookings, func(v interface{}) string { return v.(*prj.PrjBooking).BookingId }), &store.PrjBookingIDs); err != nil {
		return err
	}

	utilizations := generateUtilizations(store)
	if err := runOp(client, "Utilizations", "/erp/90/PrjUtil", &prj.PrjUtilizationList{List: utilizations}, extractIDs(utilizations, func(v interface{}) string { return v.(*prj.PrjUtilization).UtilizationId }), &store.PrjUtilizationIDs); err != nil {
		return err
	}

	rates := generateBillingRates(store)
	if err := runOp(client, "Billing Rates", "/erp/90/PrjBillRt", &prj.PrjBillingRateList{List: rates}, extractIDs(rates, func(v interface{}) string { return v.(*prj.PrjBillingRate).RateId }), &store.PrjBillingRateIDs); err != nil {
		return err
	}

	return nil
}
