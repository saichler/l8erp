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

// gen_comp_controls.go
// Generates:
// - CompApprovalMatrix (12 records) - references Department, Employee
//
// Note: CompControlAssessment and CompSegregationRule are now
// embedded in CompControl (see gen_comp_foundation.go)

import (
	"fmt"
	"math/rand"

	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8erp/go/types/erp"
)

// generateCompApprovalMatrices creates approval authority records
func generateCompApprovalMatrices(store *MockDataStore) []*comp.CompApprovalMatrix {
	count := minInt(len(compTransactionTypes), 12)
	matrices := make([]*comp.CompApprovalMatrix, count)

	for i := 0; i < count; i++ {
		departmentID := pickRef(store.DepartmentIDs, i)
		escalationToID := pickRef(store.ManagerIDs, i)

		thresholdMin := int64((i + 1) * 1000)                   // $1K to $12K
		thresholdMax := int64((i + 1) * 10000)                   // $10K to $120K
		requiredApprovals := int32(minInt(rand.Intn(3)+1, i+1))  // 1-3 approvals

		matrices[i] = &comp.CompApprovalMatrix{
			MatrixId:    genID("capm", i),
			Name:        fmt.Sprintf("%s Approval Matrix", compTransactionTypes[i]),
			Description: fmt.Sprintf("Approval authority matrix for %s transactions", compTransactionTypes[i]),
			TransactionType: compTransactionTypes[i],
			DepartmentId:    departmentID,
			ThresholdMin: &erp.Money{
				Amount:     thresholdMin * 100, // Convert to cents
				CurrencyId: pickRef(store.CurrencyIDs, i),
			},
			ThresholdMax:       money(store, thresholdMax*100),
			ApproverRoleIds:    []string{fmt.Sprintf("role-%03d", (i%5)+1), fmt.Sprintf("role-%03d", (i%5)+6)},
			RequiredApprovals:  requiredApprovals,
			RequiresSequential: i%3 == 0,
			EscalationDays:     int32(rand.Intn(5) + 2), // 2-6 days
			EscalationToId:     escalationToID,
			IsActive:           i < 10, // First 10 are active
			Priority:           int32(i + 1),
			AuditInfo:          createAuditInfo(),
		}
	}
	return matrices
}
