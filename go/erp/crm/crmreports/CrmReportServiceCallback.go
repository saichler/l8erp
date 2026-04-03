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
package crmreports

import (
	"fmt"
	"time"

	common "github.com/saichler/l8common/go/generic"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

func newCrmReportServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	generateOnPost := func(report *fin.FinReport, action ifs.Action, _ ifs.IVNic) error {
		if action != ifs.POST {
			return nil
		}
		report.GeneratedAt = time.Now().Unix()
		return generateCrmReport(report, vnic)
	}
	return common.NewServiceCallback("FinReport",
		func(e *fin.FinReport) { common.GenerateID(&e.ReportId) },
		nil,
		generateOnPost,
	)
}

func generateCrmReport(report *fin.FinReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case fin.FinReportType(1):
		report.Title = "Lead Conversion Summary"
		return generateLeadConversion(report, vnic)
	case fin.FinReportType(2):
		report.Title = "Opportunity Pipeline"
		return generateOpportunityPipeline(report, vnic)
	case fin.FinReportType(3):
		report.Title = "Case Resolution Summary"
		return generateCaseResolution(report, vnic)
	default:
		return fmt.Errorf("unsupported CRM report type: %v", report.ReportType)
	}
}
