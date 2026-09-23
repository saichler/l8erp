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

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

// hcmReportAccessors adapts HcmReport for the shared report service: the id is
// generated on POST, the generation time stamped, then the module's own
// dispatch fills the sections.
//
// vnic is the activating nic, captured here so a generator queries through the
// same connection the service was activated on.
func hcmReportAccessors(vnic ifs.IVNic) common.ReportAccessors {
	return common.ReportAccessors{
		TypeName:       "HcmReport",
		Is:             func(v interface{}) bool { _, ok := v.(*hcm.HcmReport); return ok },
		SetID:          func(v interface{}) { common.GenerateID(&v.(*hcm.HcmReport).ReportId) },
		SetGeneratedAt: func(v interface{}, at int64) { v.(*hcm.HcmReport).GeneratedAt = at },
		Generate: func(v interface{}, _ ifs.IVNic) error {
			return generateHcmReport(v.(*hcm.HcmReport), vnic)
		},
	}
}

func generateHcmReport(report *hcm.HcmReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case hcm.HcmReportType_HCM_REPORT_TYPE_HEADCOUNT:
		report.Title = "Headcount by Department"
		return generateHeadcount(report, vnic)
	case hcm.HcmReportType_HCM_REPORT_TYPE_COMPENSATION_SUMMARY:
		report.Title = "Compensation Summary"
		return generateCompensationSummary(report, vnic)
	case hcm.HcmReportType_HCM_REPORT_TYPE_LEAVE_BALANCE:
		report.Title = "Leave Balance Summary"
		return generateLeaveBalanceSummary(report, vnic)
	case hcm.HcmReportType_HCM_REPORT_TYPE_PERFORMANCE_SUMMARY:
		report.Title = "Performance Review Summary"
		return generatePerformanceSummary(report, vnic)
	default:
		return fmt.Errorf("unsupported HCM report type: %v", report.ReportType)
	}
}
