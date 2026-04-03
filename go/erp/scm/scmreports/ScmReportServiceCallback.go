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
	"time"

	common "github.com/saichler/l8common/go/generic"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func newScmReportCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	generateOnPost := func(report *fin.FinReport, action ifs.Action, _ ifs.IVNic) error {
		if action != ifs.POST {
			return nil
		}
		report.GeneratedAt = time.Now().Unix()
		return generateScmReport(report, vnic)
	}
	return common.NewServiceCallback("ScmReport",
		func(e *fin.FinReport) { common.GenerateID(&e.ReportId) },
		nil,
		generateOnPost,
	)
}

func generateScmReport(report *fin.FinReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case fin.FinReportType_FIN_REPORT_TYPE_BALANCE_SHEET:
		report.Title = "Inventory Valuation"
		return generateInventoryValuation(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_INCOME_STATEMENT:
		report.Title = "Purchase Order Summary"
		return generatePurchaseOrderSummary(report, vnic)
	case fin.FinReportType_FIN_REPORT_TYPE_TRIAL_BALANCE:
		report.Title = "Stock by Warehouse"
		return generateStockByWarehouse(report, vnic)
	default:
		return fmt.Errorf("unsupported SCM report type: %v", report.ReportType)
	}
}
