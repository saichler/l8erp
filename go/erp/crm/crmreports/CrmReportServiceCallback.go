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

	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

// crmReportAccessors adapts CrmReport for the shared report service: the id is
// generated on POST, the generation time stamped, then the module's own
// dispatch fills the sections.
//
// vnic is the activating nic, captured here so a generator queries through the
// same connection the service was activated on.
func crmReportAccessors(vnic ifs.IVNic) common.ReportAccessors {
	return common.ReportAccessors{
		TypeName:       "CrmReport",
		Is:             func(v interface{}) bool { _, ok := v.(*crm.CrmReport); return ok },
		SetID:          func(v interface{}) { common.GenerateID(&v.(*crm.CrmReport).ReportId) },
		SetGeneratedAt: func(v interface{}, at int64) { v.(*crm.CrmReport).GeneratedAt = at },
		Generate: func(v interface{}, _ ifs.IVNic) error {
			return generateCrmReport(v.(*crm.CrmReport), vnic)
		},
	}
}

func generateCrmReport(report *crm.CrmReport, vnic ifs.IVNic) error {
	switch report.ReportType {
	case crm.CrmReportType_CRM_REPORT_TYPE_LEAD_CONVERSION:
		report.Title = "Lead Conversion Summary"
		return generateLeadConversion(report, vnic)
	case crm.CrmReportType_CRM_REPORT_TYPE_OPPORTUNITY_PIPELINE:
		report.Title = "Opportunity Pipeline"
		return generateOpportunityPipeline(report, vnic)
	case crm.CrmReportType_CRM_REPORT_TYPE_CASE_RESOLUTION:
		report.Title = "Case Resolution Summary"
		return generateCaseResolution(report, vnic)
	default:
		return fmt.Errorf("unsupported CRM report type: %v", report.ReportType)
	}
}
