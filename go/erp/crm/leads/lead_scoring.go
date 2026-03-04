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
package leads

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
	"strings"
)

// computeLeadScore calculates a lead's score based on active scoring rules
// and sets the rating (HOT/WARM/COLD) accordingly.
func computeLeadScore(lead *crm.CrmLead, vnic ifs.IVNic) error {
	rules, err := common.GetEntities("CrmLdScore", 80,
		&crm.CrmLeadScore{IsActive: true}, vnic)
	if err != nil || len(rules) == 0 {
		return nil
	}
	score := int32(0)
	for _, rule := range rules {
		if matchesRule(lead, rule) {
			score += rule.ScoreValue
		}
	}
	if score > 100 {
		score = 100
	}
	lead.Score = score
	// Set rating based on score thresholds
	switch {
	case score >= 80:
		lead.Rating = crm.CrmLeadRating_CRM_LEAD_RATING_HOT
	case score >= 40:
		lead.Rating = crm.CrmLeadRating_CRM_LEAD_RATING_WARM
	default:
		lead.Rating = crm.CrmLeadRating_CRM_LEAD_RATING_COLD
	}
	return nil
}

// matchesRule checks if a lead's field value matches a scoring rule.
func matchesRule(lead *crm.CrmLead, rule *crm.CrmLeadScore) bool {
	if rule.FieldName == "" || rule.FieldValue == "" {
		return false
	}
	var fieldVal string
	switch strings.ToLower(rule.FieldName) {
	case "industry":
		fieldVal = lead.Industry
	case "company":
		fieldVal = lead.Company
	case "title":
		fieldVal = lead.Title
	case "source", "sourceid":
		fieldVal = lead.SourceId
	default:
		return false
	}
	return strings.EqualFold(fieldVal, rule.FieldValue)
}
