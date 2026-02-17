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
package mocks

// gen_comp_regulatory.go
// Generates:
// - CompCertification (8 records) - references CompRegulation
//
// Note: CompRequirement, CompComplianceStatus, CompViolationRecord are now
// embedded in CompRegulation (see gen_comp_foundation.go)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/comp"
)

// generateCompCertifications creates certification records
func generateCompCertifications(store *MockDataStore) []*comp.CompCertification {
	certStatuses := []comp.CompCertificationStatus{
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_ACTIVE,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_ACTIVE,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_ACTIVE,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_PENDING,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_UNDER_RENEWAL,
		comp.CompCertificationStatus_COMP_CERTIFICATION_STATUS_EXPIRED,
	}

	locations := []string{"Headquarters", "Data Center East", "Data Center West", "Regional Office"}
	processes := []string{"IT Operations", "Customer Service", "Finance", "HR", "Engineering"}

	count := minInt(len(compCertificationNames), 8)
	certifications := make([]*comp.CompCertification, count)

	for i := 0; i < count; i++ {
		regulationID := pickRef(store.CompRegulationIDs, i)
		responsibleID := pickRef(store.EmployeeIDs, i)

		issueDate := time.Now().AddDate(-rand.Intn(2), -rand.Intn(6), 0)
		expiryDate := issueDate.AddDate(3, 0, 0) // 3 year validity

		certCost := int64((rand.Intn(50) + 10) * 1000) // $10K to $60K

		certifications[i] = &comp.CompCertification{
			CertificationId:   genID("ccrt", i),
			Name:              compCertificationNames[i],
			Description:       fmt.Sprintf("Organizational certification for %s compliance", compCertificationNames[i]),
			IssuingBody:       compIssuingBodies[i%len(compIssuingBodies)],
			CertificateNumber: fmt.Sprintf("CERT-%06d", 500000+rand.Intn(500000)),
			Status:            certStatuses[i%len(certStatuses)],
			IssueDate:         issueDate.Unix(),
			ExpiryDate:        expiryDate.Unix(),
			Scope:             fmt.Sprintf("All operations related to %s", compCertificationNames[i]),
			CoveredLocations:  locations[:rand.Intn(3)+1],
			CoveredProcesses:  processes[:rand.Intn(4)+1],
			RegulationId:      regulationID,
			ResponsibleId:     responsibleID,
			CertificationCost: money(store, certCost),
			RenewalLeadDays:   int32(90),
			AuditInfo:         createAuditInfo(),
		}
	}
	return certifications
}
