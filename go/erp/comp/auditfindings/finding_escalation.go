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
package auditfindings

import (
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

const escalationThresholdDays = 30

// escalateCriticalFindings auto-creates a compliance incident when a critical
// finding has been open for longer than the escalation threshold.
func escalateCriticalFindings(finding *comp.CompAuditFinding, action ifs.Action, vnic ifs.IVNic) error {
	if finding.Severity != comp.CompSeverityLevel_COMP_SEVERITY_CRITICAL {
		return nil
	}
	if finding.Status != comp.CompFindingStatus_COMP_FINDING_STATUS_OPEN {
		return nil
	}
	if finding.DiscoveryDate == 0 {
		return nil
	}
	daysSince := (time.Now().Unix() - finding.DiscoveryDate) / (24 * 3600)
	if daysSince < escalationThresholdDays {
		return nil
	}
	_, err := common.PostEntity("CompIncdnt", 110, &comp.CompIncident{
		Title:          "Escalated Finding: " + finding.Title,
		Description:    "Auto-escalated from audit finding " + finding.FindingNumber + ": " + finding.Description,
		Severity:       finding.Severity,
		Status:         comp.CompIncidentStatus_COMP_INCIDENT_STATUS_REPORTED,
		AssignedToId:   finding.ResponsibleId,
		DiscoveredDate: finding.DiscoveryDate,
		ReportedDate:   time.Now().Unix(),
		AuditInfo:      &erp.AuditInfo{},
	}, vnic)
	return err
}
