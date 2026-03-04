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
package expensereports

import (
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// computeExpenseTotals sums entry amounts into the report total.
func computeExpenseTotals(report *prj.PrjExpenseReport) error {
	if len(report.Entries) == 0 {
		return nil
	}
	total := int64(0)
	currencyId := "USD"
	for _, entry := range report.Entries {
		if entry.Amount != nil {
			total += entry.Amount.Amount
			if entry.Amount.CurrencyId != "" {
				currencyId = entry.Amount.CurrencyId
			}
		}
	}
	report.TotalAmount = &erp.Money{Amount: total, CurrencyId: currencyId}
	return nil
}

// rollUpExpenseCost updates project actual cost when an expense report is approved.
func rollUpExpenseCost(report *prj.PrjExpenseReport, action ifs.Action, vnic ifs.IVNic) error {
	if report.Status != prj.PrjExpenseStatus_PRJ_EXPENSE_STATUS_APPROVED {
		return nil
	}
	report.ApprovedDate = time.Now().Unix()
	report.ApprovedAmount = report.TotalAmount
	if report.ProjectId == "" || report.TotalAmount == nil {
		return nil
	}
	project, err := common.GetEntity("PrjProj", 90,
		&prj.PrjProject{ProjectId: report.ProjectId}, vnic)
	if err != nil || project == nil {
		return nil
	}
	project.ActualCost = common.MoneyAdd(project.ActualCost, report.TotalAmount)
	_ = common.PutEntity("PrjProj", 90, project, vnic)
	return nil
}

func expenseTransitions() *common.StatusTransitionConfig[prj.PrjExpenseReport] {
	return &common.StatusTransitionConfig[prj.PrjExpenseReport]{
		StatusGetter:  func(e *prj.PrjExpenseReport) int32 { return int32(e.Status) },
		StatusSetter:  func(e *prj.PrjExpenseReport, s int32) { e.Status = prj.PrjExpenseStatus(s) },
		FilterBuilder: func(e *prj.PrjExpenseReport) *prj.PrjExpenseReport {
			return &prj.PrjExpenseReport{ReportId: e.ReportId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2},       // DRAFT → SUBMITTED
			2: {3, 4},    // SUBMITTED → APPROVED, REJECTED
			3: {5},       // APPROVED → PAID
			4: {1},       // REJECTED → DRAFT
		},
		StatusNames: prj.PrjExpenseStatus_name,
	}
}
