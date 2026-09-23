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
package prjreports

import (
	"fmt"

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
)

// prjReportAccessors adapts PrjReport for the shared report service: the id is
// generated on POST, the generation time stamped, then the module's own
// dispatch fills the sections.
//
// vnic is the activating nic, captured here so a generator queries through the
// same connection the service was activated on.
func prjReportAccessors(vnic ifs.IVNic) common.ReportAccessors {
	return common.ReportAccessors{
		TypeName:       "PrjReport",
		Is:             func(v interface{}) bool { _, ok := v.(*prj.PrjReport); return ok },
		SetID:          func(v interface{}) { common.GenerateID(&v.(*prj.PrjReport).ReportId) },
		SetGeneratedAt: func(v interface{}, at int64) { v.(*prj.PrjReport).GeneratedAt = at },
		Generate: func(v interface{}, _ ifs.IVNic) error {
			return generatePrjReport(v.(*prj.PrjReport), vnic)
		},
	}
}

func generatePrjReport(report *prj.PrjReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case prj.PrjReportType_PRJ_REPORT_TYPE_PROJECT_BUDGET:
		report.Title = "Project Budget Summary"
		return generateProjectBudget(report, vnic)
	case prj.PrjReportType_PRJ_REPORT_TYPE_RESOURCE_UTILIZATION:
		report.Title = "Resource Utilization"
		return generateResourceUtilization(report, vnic)
	case prj.PrjReportType_PRJ_REPORT_TYPE_MILESTONE_TRACKING:
		report.Title = "Milestone Tracking"
		return generateMilestoneTracking(report, vnic)
	default:
		return fmt.Errorf("unsupported PRJ report type: %v", report.ReportType)
	}
}
