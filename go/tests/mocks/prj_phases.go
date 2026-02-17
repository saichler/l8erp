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
	if err := runOp(client, "Project Templates", "/erp/90/PrjProjTpl", &prj.PrjProjectTemplateList{List: templates}, extractIDs(templates, func(e *prj.PrjProjectTemplate) string { return e.TemplateId }), &store.PrjProjectTemplateIDs); err != nil {
		return err
	}

	categories := generateExpenseCategories(store)
	if err := runOp(client, "Expense Categories", "/erp/90/PrjExpCat", &prj.PrjExpenseCategoryList{List: categories}, extractIDs(categories, func(e *prj.PrjExpenseCategory) string { return e.CategoryId }), &store.PrjExpenseCategoryIDs); err != nil {
		return err
	}

	policies := generateExpensePolicies(store)
	if err := runOp(client, "Expense Policies", "/erp/90/PrjExpPol", &prj.PrjExpensePolicyList{List: policies}, extractIDs(policies, func(e *prj.PrjExpensePolicy) string { return e.PolicyId }), &store.PrjExpensePolicyIDs); err != nil {
		return err
	}

	rules := generateApprovalRules(store)
	if err := runOp(client, "Approval Rules", "/erp/90/PrjApprRl", &prj.PrjApprovalRuleList{List: rules}, extractIDs(rules, func(e *prj.PrjApprovalRule) string { return e.RuleId }), &store.PrjApprovalRuleIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase2 creates projects with embedded children:
// phases, tasks, milestones, deliverables, dependencies, risks, issues, earned values
func generatePrjPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate project shells and extract IDs for cross-references
	projects := generateProjects(store)
	store.PrjProjectIDs = extractIDs(projects, func(e *prj.PrjProject) string { return e.ProjectId })

	// Generate children in dependency order, extracting IDs for cross-refs
	phases := generatePhases(store)
	store.PrjPhaseIDs = extractIDs(phases, func(e *prj.PrjPhase) string { return e.PhaseId })
	fmt.Printf("  Generated %d phases\n", len(phases))

	risks := generateRisks(store)
	store.PrjRiskIDs = extractIDs(risks, func(e *prj.PrjRisk) string { return e.RiskId })
	fmt.Printf("  Generated %d risks\n", len(risks))

	tasks := generateTasks(store) // needs PhaseIDs
	store.PrjTaskIDs = extractIDs(tasks, func(e *prj.PrjTask) string { return e.TaskId })
	fmt.Printf("  Generated %d tasks\n", len(tasks))

	milestones := generateMilestones(store) // needs PhaseIDs
	store.PrjMilestoneIDs = extractIDs(milestones, func(e *prj.PrjMilestone) string { return e.MilestoneId })
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
	if err := runOp(client, "Resource Pools", "/erp/90/PrjResPool", &prj.PrjResourcePoolList{List: pools}, extractIDs(pools, func(e *prj.PrjResourcePool) string { return e.PoolId }), &store.PrjResourcePoolIDs); err != nil {
		return err
	}

	// Generate resources and embed skills
	resources := generateResources(store)
	skills := generateResourceSkills(store)
	fmt.Printf("  Generated %d skills\n", len(skills))
	for i, s := range skills {
		resources[i%len(resources)].Skills = append(resources[i%len(resources)].Skills, s)
	}
	if err := runOp(client, "Resources", "/erp/90/PrjRes", &prj.PrjResourceList{List: resources}, extractIDs(resources, func(e *prj.PrjResource) string { return e.ResourceId }), &store.PrjResourceIDs); err != nil {
		return err
	}

	plans := generatePrjCapacityPlans(store)
	if err := runOp(client, "Capacity Plans", "/erp/90/PrjCapPlan", &prj.PrjCapacityPlanList{List: plans}, extractIDs(plans, func(e *prj.PrjCapacityPlan) string { return e.PlanId }), &store.PrjCapacityPlanIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase4 creates resource allocation data
func generatePrjPhase4(client *HCMClient, store *MockDataStore) error {
	allocations := generateAllocations(store)
	if err := runOp(client, "Allocations", "/erp/90/PrjAlloc", &prj.PrjAllocationList{List: allocations}, extractIDs(allocations, func(e *prj.PrjAllocation) string { return e.AllocationId }), &store.PrjAllocationIDs); err != nil {
		return err
	}

	bookings := generateBookings(store)
	if err := runOp(client, "Bookings", "/erp/90/PrjBooking", &prj.PrjBookingList{List: bookings}, extractIDs(bookings, func(e *prj.PrjBooking) string { return e.BookingId }), &store.PrjBookingIDs); err != nil {
		return err
	}

	utilizations := generateUtilizations(store)
	if err := runOp(client, "Utilizations", "/erp/90/PrjUtil", &prj.PrjUtilizationList{List: utilizations}, extractIDs(utilizations, func(e *prj.PrjUtilization) string { return e.UtilizationId }), &store.PrjUtilizationIDs); err != nil {
		return err
	}

	rates := generateBillingRates(store)
	if err := runOp(client, "Billing Rates", "/erp/90/PrjBillRt", &prj.PrjBillingRateList{List: rates}, extractIDs(rates, func(e *prj.PrjBillingRate) string { return e.RateId }), &store.PrjBillingRateIDs); err != nil {
		return err
	}

	return nil
}
