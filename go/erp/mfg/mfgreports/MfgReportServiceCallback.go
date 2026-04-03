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
	"time"

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func newMfgReportServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	generateOnPost := func(vi interface{}, action ifs.Action, _ ifs.IVNic) error { report := vi.(*fin.FinReport);
		if action != ifs.POST {
			return nil
		}
		report.GeneratedAt = time.Now().Unix()
		return generateMfgReport(report, vnic)
	}
	return common.NewServiceCallback("FinReport",
		func(v interface{}) bool { _, ok := v.(*fin.FinReport); return ok },
		func(v interface{}) { common.GenerateID(&v.(*fin.FinReport).ReportId) },
		nil,
		func(v interface{}, action ifs.Action, vnic ifs.IVNic) error { return generateOnPost(v.(*fin.FinReport), action, vnic) },
	)
}

func generateMfgReport(report *fin.FinReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case fin.FinReportType(1):
		report.Title = "Production Efficiency"
		return generateProductionEfficiency(report, vnic)
	case fin.FinReportType(2):
		report.Title = "Work Order Status Summary"
		return generateWorkOrderStatus(report, vnic)
	case fin.FinReportType(3):
		report.Title = "Scrap Rate Analysis"
		return generateScrapRate(report, vnic)
	default:
		return fmt.Errorf("unsupported MFG report type: %v", report.ReportType)
	}
}
