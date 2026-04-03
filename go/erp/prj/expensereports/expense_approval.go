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
	common "github.com/saichler/l8erp/go/erp/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// computeExpenseTotals sums entry amounts into the report total.
func computeExpenseTotals(v interface{}) error {
	report := v.(*prj.PrjExpenseReport)
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
	report.TotalAmount = &l8common.Money{Amount: total, CurrencyId: currencyId}
	return nil
}

// rollUpExpenseCost updates project actual cost when an expense report is approved.
func rollUpExpenseCost(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
	report := v.(*prj.PrjExpenseReport)
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
	projectTyped := project.(*prj.PrjProject)
	projectTyped.ActualCost = common.MoneyAdd(projectTyped.ActualCost, report.TotalAmount)
	_ = common.PutEntity("PrjProj", 90, project, vnic)
	return nil
}

func expenseTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*prj.PrjExpenseReport).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*prj.PrjExpenseReport).Status = prj.PrjExpenseStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*prj.PrjExpenseReport);
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
