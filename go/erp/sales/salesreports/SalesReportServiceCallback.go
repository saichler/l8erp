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
package salesreports

import (
	"fmt"

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

// salesReportAccessors adapts SalesReport for the shared report service: the id is
// generated on POST, the generation time stamped, then the module's own
// dispatch fills the sections.
//
// vnic is the activating nic, captured here so a generator queries through the
// same connection the service was activated on.
func salesReportAccessors(vnic ifs.IVNic) common.ReportAccessors {
	return common.ReportAccessors{
		TypeName:       "SalesReport",
		Is:             func(v interface{}) bool { _, ok := v.(*sales.SalesReport); return ok },
		SetID:          func(v interface{}) { common.GenerateID(&v.(*sales.SalesReport).ReportId) },
		SetGeneratedAt: func(v interface{}, at int64) { v.(*sales.SalesReport).GeneratedAt = at },
		Generate: func(v interface{}, _ ifs.IVNic) error {
			return generateSalesReport(v.(*sales.SalesReport), vnic)
		},
	}
}

func generateSalesReport(report *sales.SalesReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case sales.SalesReportType_SALES_REPORT_TYPE_SALES_BY_CUSTOMER:
		report.Title = "Sales by Customer"
		return generateSalesByCustomer(report, vnic)
	case sales.SalesReportType_SALES_REPORT_TYPE_PIPELINE_SUMMARY:
		report.Title = "Pipeline Summary"
		return generatePipelineSummary(report, vnic)
	case sales.SalesReportType_SALES_REPORT_TYPE_TERRITORY_PERFORMANCE:
		report.Title = "Territory Performance"
		return generateTerritoryPerformance(report, vnic)
	default:
		return fmt.Errorf("unsupported Sales report type: %v", report.ReportType)
	}
}
