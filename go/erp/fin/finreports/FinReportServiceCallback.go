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
package finreports

import (
	"fmt"

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

// finReportAccessors adapts FinReport for the shared report service: the id is
// generated on POST, the generation time stamped, then generateReport() fills
// the sections.
//
// vnic is the activating nic, captured here so a generator queries through the
// same connection the service was activated on.
func finReportAccessors(vnic ifs.IVNic) common.ReportAccessors {
	return common.ReportAccessors{
		TypeName:       "FinReport",
		Is:             func(v interface{}) bool { _, ok := v.(*fin.FinReport); return ok },
		SetID:          func(v interface{}) { common.GenerateID(&v.(*fin.FinReport).ReportId) },
		SetGeneratedAt: func(v interface{}, at int64) { v.(*fin.FinReport).GeneratedAt = at },
		Generate: func(v interface{}, _ ifs.IVNic) error {
			return generateReport(v.(*fin.FinReport), vnic)
		},
	}
}

func generateReport(report *fin.FinReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case fin.FinReportType_FIN_REPORT_TYPE_BALANCE_SHEET:
		report.Title = "Balance Sheet"
		return generateBalanceSheet(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_INCOME_STATEMENT:
		report.Title = "Income Statement"
		return generateIncomeStatement(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_TRIAL_BALANCE:
		report.Title = "Trial Balance"
		return generateTrialBalance(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_BUDGET_VS_ACTUAL:
		report.Title = "Budget vs Actual"
		return generateBudgetVsActual(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_AGED_RECEIVABLES:
		report.Title = "Aged Receivables"
		return generateAgedReceivables(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_AGED_PAYABLES:
		report.Title = "Aged Payables"
		return generateAgedPayables(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_GL_DETAIL:
		report.Title = "General Ledger Detail"
		return generateGLDetail(report, vnic)
	default:
		return fmt.Errorf("unsupported report type: %v", report.ReportType)
	}
}
