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
package main

// gen_comp_foundation.go
// Generates:
// - CompRegulation (10 records)
// - CompControl (15 records)
// - CompPolicyDocument (10 records)
// - CompInsurancePolicy (8 records)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompRegulations creates compliance regulation records (foundation - no store needed)
func generateCompRegulations() []*comp.CompRegulation {
	regulationTypes := []comp.CompRegulationType{
		comp.CompRegulationType_COMP_REGULATION_TYPE_SOX,
		comp.CompRegulationType_COMP_REGULATION_TYPE_GDPR,
		comp.CompRegulationType_COMP_REGULATION_TYPE_HIPAA,
		comp.CompRegulationType_COMP_REGULATION_TYPE_PCI_DSS,
		comp.CompRegulationType_COMP_REGULATION_TYPE_FDA,
		comp.CompRegulationType_COMP_REGULATION_TYPE_INDUSTRY_SPECIFIC,
		comp.CompRegulationType_COMP_REGULATION_TYPE_INTERNAL_POLICY,
		comp.CompRegulationType_COMP_REGULATION_TYPE_ENVIRONMENTAL,
		comp.CompRegulationType_COMP_REGULATION_TYPE_EXPORT_CONTROL,
		comp.CompRegulationType_COMP_REGULATION_TYPE_OTHER,
	}

	count := minInt(len(compRegulationNames), 10)
	regulations := make([]*comp.CompRegulation, count)

	for i := 0; i < count; i++ {
		effectiveDate := time.Now().AddDate(-rand.Intn(3), -rand.Intn(12), 0)
		sunsetDate := effectiveDate.AddDate(5, 0, 0) // 5 years validity

		regulations[i] = &comp.CompRegulation{
			RegulationId:         genID("creg", i),
			Code:                 fmt.Sprintf("REG-%04d", 1000+i+1),
			Name:                 compRegulationNames[i],
			Description:          fmt.Sprintf("Compliance requirements for %s framework", compRegulationNames[i]),
			RegulationType:       regulationTypes[i%len(regulationTypes)],
			Jurisdiction:         compJurisdictions[i%len(compJurisdictions)],
			IssuingBody:          compIssuingBodies[i%len(compIssuingBodies)],
			EffectiveDate:        effectiveDate.Unix(),
			SunsetDate:           sunsetDate.Unix(),
			Version:              fmt.Sprintf("%d.%d", rand.Intn(3)+1, rand.Intn(5)),
			SourceUrl:            fmt.Sprintf("https://regulations.example.com/%s", genID("reg", i)),
			IsActive:             i < 8, // First 8 are active
			ApplicableIndustries: compIndustries[:rand.Intn(4)+2],
			ApplicableRegions:    compJurisdictions[:rand.Intn(3)+1],
			AuditInfo:            createAuditInfo(),
		}
	}
	return regulations
}

// generateCompControls creates internal control records
func generateCompControls(store *MockDataStore) []*comp.CompControl {
	controlTypes := []comp.CompControlType{
		comp.CompControlType_COMP_CONTROL_TYPE_PREVENTIVE,
		comp.CompControlType_COMP_CONTROL_TYPE_DETECTIVE,
		comp.CompControlType_COMP_CONTROL_TYPE_CORRECTIVE,
		comp.CompControlType_COMP_CONTROL_TYPE_COMPENSATING,
		comp.CompControlType_COMP_CONTROL_TYPE_DIRECTIVE,
	}

	count := minInt(len(compControlNames), 15)
	controls := make([]*comp.CompControl, count)

	for i := 0; i < count; i++ {
		// Assign owner
		ownerID := pickRef(store.EmployeeIDs, i)

		// Assign department
		departmentID := pickRef(store.DepartmentIDs, i)

		controls[i] = &comp.CompControl{
			ControlId:         genID("cctl", i),
			Code:              fmt.Sprintf("CTL-%04d", 2000+i+1),
			Name:              compControlNames[i],
			Description:       fmt.Sprintf("Internal control for %s", compControlNames[i]),
			ControlType:       controlTypes[i%len(controlTypes)],
			ControlObjective:  fmt.Sprintf("Ensure %s is properly managed and monitored", compControlNames[i]),
			ProcessArea:       compProcessAreas[i%len(compProcessAreas)],
			DepartmentId:      departmentID,
			OwnerId:           ownerID,
			IsKeyControl:      i < 8, // First 8 are key controls
			IsAutomated:       i%3 == 0,
			TestFrequencyDays: int32((rand.Intn(4) + 1) * 30), // 30, 60, 90, or 120 days
			TestProcedure:     fmt.Sprintf("Review and test %s control effectiveness through sampling and walkthrough", compControlNames[i]),
			IsActive:          i < 13, // First 13 are active
			AuditInfo:         createAuditInfo(),
		}
	}
	return controls
}

// generateCompPolicyDocuments creates policy document records
func generateCompPolicyDocuments(store *MockDataStore) []*comp.CompPolicyDocument {
	policyStatuses := []string{"Draft", "Under Review", "Approved", "Retired"}

	count := minInt(len(compPolicyTitles), 10)
	policies := make([]*comp.CompPolicyDocument, count)

	for i := 0; i < count; i++ {
		ownerID := pickRef(store.EmployeeIDs, i)

		approverID := pickRef(store.ManagerIDs, i)

		departmentID := pickRef(store.DepartmentIDs, i)

		effectiveDate := time.Now().AddDate(-rand.Intn(2), -rand.Intn(6), 0)
		reviewDate := effectiveDate.AddDate(0, 6, 0)
		nextReviewDate := time.Now().AddDate(0, rand.Intn(6)+1, 0)

		// Status distribution: 70% Approved, 15% Under Review, 10% Draft, 5% Retired
		var status string
		if i < 7 {
			status = "Approved"
		} else if i < 9 {
			status = "Under Review"
		} else {
			status = policyStatuses[i%len(policyStatuses)]
		}

		policies[i] = &comp.CompPolicyDocument{
			PolicyId:               genID("cpol", i),
			Code:                   fmt.Sprintf("POL-%04d", 3000+i+1),
			Title:                  compPolicyTitles[i],
			Description:            fmt.Sprintf("Organizational policy governing %s", compPolicyTitles[i]),
			PolicyType:             compPolicyTypes[i%len(compPolicyTypes)],
			DepartmentId:           departmentID,
			OwnerId:                ownerID,
			ApproverId:             approverID,
			Version:                fmt.Sprintf("%d.%d", rand.Intn(5)+1, rand.Intn(3)),
			EffectiveDate:          effectiveDate.Unix(),
			ReviewDate:             reviewDate.Unix(),
			NextReviewDate:         nextReviewDate.Unix(),
			ReviewFrequencyDays:    int32(365), // Annual review
			Status:                 status,
			RequiresAcknowledgment: i%2 == 0,
			AuditInfo:              createAuditInfo(),
		}
	}
	return policies
}

// generateCompInsurancePolicies creates insurance policy records
func generateCompInsurancePolicies(store *MockDataStore) []*comp.CompInsurancePolicy {
	premiumFrequencies := []string{"Annual", "Monthly", "Quarterly"}
	insuranceStatuses := []string{"Active", "Active", "Active", "Pending Renewal", "Expired"}

	count := minInt(len(compInsuranceTypes), 8)
	insurances := make([]*comp.CompInsurancePolicy, count)

	for i := 0; i < count; i++ {
		responsibleID := pickRef(store.EmployeeIDs, i)

		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0) // 1 year policy

		coverageAmount := int64((rand.Intn(9)+1) * 1000000) // $1M to $10M
		deductible := int64((rand.Intn(5) + 1) * 10000)     // $10K to $50K
		premium := int64((rand.Intn(50) + 10) * 1000)       // $10K to $60K

		insurances[i] = &comp.CompInsurancePolicy{
			InsuranceId:  genID("cins", i),
			PolicyNumber: fmt.Sprintf("INS-%06d", 100000+rand.Intn(900000)),
			Name:         fmt.Sprintf("%s Policy", compInsuranceTypes[i]),
			Description:  fmt.Sprintf("Insurance coverage for %s risks", compInsuranceTypes[i]),
			PolicyType:   compInsuranceTypes[i],
			Provider:     compInsuranceProviders[i%len(compInsuranceProviders)],
			Broker:       fmt.Sprintf("%s Insurance Brokers", lastNames[i%len(lastNames)]),
			CoverageAmount: money(coverageAmount),
			Deductible: money(deductible),
			Premium: money(premium),
			PremiumFrequency: premiumFrequencies[i%len(premiumFrequencies)],
			EffectiveDate:    effectiveDate.Unix(),
			ExpiryDate:       expiryDate.Unix(),
			Status:           insuranceStatuses[i%len(insuranceStatuses)],
			CoveredRisks:     compRiskTitles[:rand.Intn(4)+2],
			ContactName:      randomName(),
			ContactPhone:     randomPhone(),
			ContactEmail:     fmt.Sprintf("insurance%d@%s.com", i+1, compInsuranceProviders[i%len(compInsuranceProviders)]),
			RenewalLeadDays:  int32(60),
			ResponsibleId:    responsibleID,
			AuditInfo:        createAuditInfo(),
		}
	}
	return insurances
}
