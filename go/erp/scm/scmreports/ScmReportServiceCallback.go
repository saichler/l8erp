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
package scmreports

import (
	"fmt"

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
)

// scmReportAccessors adapts ScmReport for the shared report service: the id is
// generated on POST, the generation time stamped, then the module's own
// dispatch fills the sections.
//
// vnic is the activating nic, captured here so a generator queries through the
// same connection the service was activated on.
func scmReportAccessors(vnic ifs.IVNic) common.ReportAccessors {
	return common.ReportAccessors{
		TypeName:       "ScmReport",
		Is:             func(v interface{}) bool { _, ok := v.(*scm.ScmReport); return ok },
		SetID:          func(v interface{}) { common.GenerateID(&v.(*scm.ScmReport).ReportId) },
		SetGeneratedAt: func(v interface{}, at int64) { v.(*scm.ScmReport).GeneratedAt = at },
		Generate: func(v interface{}, _ ifs.IVNic) error {
			return generateScmReport(v.(*scm.ScmReport), vnic)
		},
	}
}

func generateScmReport(report *scm.ScmReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case scm.ScmReportType_SCM_REPORT_TYPE_INVENTORY_VALUATION:
		report.Title = "Inventory Valuation"
		return generateInventoryValuation(report, vnic)
	case scm.ScmReportType_SCM_REPORT_TYPE_PURCHASE_ORDER_SUMMARY:
		report.Title = "Purchase Order Summary"
		return generatePurchaseOrderSummary(report, vnic)
	case scm.ScmReportType_SCM_REPORT_TYPE_STOCK_BY_WAREHOUSE:
		report.Title = "Stock by Warehouse"
		return generateStockByWarehouse(report, vnic)
	default:
		return fmt.Errorf("unsupported SCM report type: %v", report.ReportType)
	}
}
