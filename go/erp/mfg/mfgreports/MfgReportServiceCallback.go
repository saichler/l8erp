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
package mfgreports

import (
	"fmt"

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

// mfgReportAccessors adapts MfgReport for the shared report service: the id is
// generated on POST, the generation time stamped, then the module's own
// dispatch fills the sections.
//
// vnic is the activating nic, captured here so a generator queries through the
// same connection the service was activated on.
func mfgReportAccessors(vnic ifs.IVNic) common.ReportAccessors {
	return common.ReportAccessors{
		TypeName:       "MfgReport",
		Is:             func(v interface{}) bool { _, ok := v.(*mfg.MfgReport); return ok },
		SetID:          func(v interface{}) { common.GenerateID(&v.(*mfg.MfgReport).ReportId) },
		SetGeneratedAt: func(v interface{}, at int64) { v.(*mfg.MfgReport).GeneratedAt = at },
		Generate: func(v interface{}, _ ifs.IVNic) error {
			return generateMfgReport(v.(*mfg.MfgReport), vnic)
		},
	}
}

func generateMfgReport(report *mfg.MfgReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case mfg.MfgReportType_MFG_REPORT_TYPE_PRODUCTION_EFFICIENCY:
		report.Title = "Production Efficiency"
		return generateProductionEfficiency(report, vnic)
	case mfg.MfgReportType_MFG_REPORT_TYPE_WORK_ORDER_STATUS:
		report.Title = "Work Order Status Summary"
		return generateWorkOrderStatus(report, vnic)
	case mfg.MfgReportType_MFG_REPORT_TYPE_SCRAP_RATE:
		report.Title = "Scrap Rate Analysis"
		return generateScrapRate(report, vnic)
	default:
		return fmt.Errorf("unsupported MFG report type: %v", report.ReportType)
	}
}
