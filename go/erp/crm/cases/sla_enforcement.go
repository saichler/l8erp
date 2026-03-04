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
package cases

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// applySLADeadline sets the case DueDate based on SLA resolution time
// when a case is created or assigned an SLA.
func applySLADeadline(c *crm.CrmCase, vnic ifs.IVNic) error {
	if c.SlaId == "" || c.DueDate != 0 {
		return nil
	}
	sla, err := common.GetEntity("CrmSLA", 80,
		&crm.CrmSLA{SlaId: c.SlaId}, vnic)
	if err != nil || sla == nil || !sla.IsActive {
		return nil
	}
	baseTime := time.Now()
	if c.OpenedDate != 0 {
		baseTime = time.Unix(c.OpenedDate, 0)
	}
	if sla.ResolutionMinutes > 0 {
		c.DueDate = baseTime.Add(time.Duration(sla.ResolutionMinutes) * time.Minute).Unix()
	}
	return nil
}

// checkSLABreach marks a case as escalated if it's past the SLA deadline.
func checkSLABreach(c *crm.CrmCase, action ifs.Action, vnic ifs.IVNic) error {
	if c.DueDate == 0 || c.IsEscalated {
		return nil
	}
	// Only check open/in-progress cases
	if c.Status == crm.CrmCaseStatus_CRM_CASE_STATUS_RESOLVED ||
		c.Status == crm.CrmCaseStatus_CRM_CASE_STATUS_CLOSED {
		return nil
	}
	if time.Now().Unix() > c.DueDate {
		c.IsEscalated = true
		c.EscalationLevel++
		if err := common.PutEntity("CrmCase", 80, c, vnic); err != nil {
			return err
		}
	}
	return nil
}
