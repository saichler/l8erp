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
package hcmreports

import (
	"fmt"
	"time"

	common "github.com/saichler/l8common/go/generic"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func newHcmReportCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	generateOnPost := func(report *fin.FinReport, action ifs.Action, _ ifs.IVNic) error {
		if action != ifs.POST {
			return nil
		}
		report.GeneratedAt = time.Now().Unix()
		return generateHcmReport(report, vnic)
	}
	return common.NewServiceCallback("HcmReport",
		func(e *fin.FinReport) { common.GenerateID(&e.ReportId) },
		nil,
		generateOnPost,
	)
}

func generateHcmReport(report *fin.FinReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case fin.FinReportType_FIN_REPORT_TYPE_BALANCE_SHEET:
		report.Title = "Headcount by Department"
		return generateHeadcount(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_INCOME_STATEMENT:
		report.Title = "Compensation Summary"
		return generateCompensationSummary(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_TRIAL_BALANCE:
		report.Title = "Leave Balance Summary"
		return generateLeaveBalanceSummary(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_BUDGET_VS_ACTUAL:
		report.Title = "Performance Review Summary"
		return generatePerformanceSummary(report, vnic)
	default:
		return fmt.Errorf("unsupported HCM report type: %v", report.ReportType)
	}
}
