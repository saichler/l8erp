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
package kpis

import (
	"github.com/saichler/l8erp/go/types/bi"
	"time"
)

// computeKPIStatus evaluates KPI thresholds and sets status/trend accordingly.
func computeKPIStatus(kpi *bi.BiKPI) error {
	// Compute trend from current vs previous
	if kpi.PreviousValue != 0 {
		if kpi.CurrentValue > kpi.PreviousValue {
			kpi.Trend = bi.BiTrendDirection_BI_TREND_DIRECTION_UP
		} else if kpi.CurrentValue < kpi.PreviousValue {
			kpi.Trend = bi.BiTrendDirection_BI_TREND_DIRECTION_DOWN
		} else {
			kpi.Trend = bi.BiTrendDirection_BI_TREND_DIRECTION_FLAT
		}
	}
	// Default status is ON_TARGET
	kpi.Status = bi.BiKPIStatus_BI_KPI_STATUS_ON_TARGET
	// Check thresholds in order — highest severity wins
	now := time.Now().Unix()
	for _, t := range kpi.Thresholds {
		if !t.IsActive {
			continue
		}
		if thresholdTriggered(kpi.CurrentValue, t) {
			switch t.Severity {
			case "CRITICAL":
				kpi.Status = bi.BiKPIStatus_BI_KPI_STATUS_OFF_TARGET
				t.LastTriggered = now
			case "WARNING":
				if kpi.Status != bi.BiKPIStatus_BI_KPI_STATUS_OFF_TARGET {
					kpi.Status = bi.BiKPIStatus_BI_KPI_STATUS_AT_RISK
				}
				t.LastTriggered = now
			}
		}
	}
	return nil
}

func thresholdTriggered(value float64, t *bi.BiKPIThreshold) bool {
	switch t.Operator {
	case bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_GREATER_THAN:
		return value > t.Value
	case bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_LESS_THAN:
		return value < t.Value
	case bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_EQUAL:
		return value == t.Value
	case bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_GREATER_EQUAL:
		return value >= t.Value
	case bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_LESS_EQUAL:
		return value <= t.Value
	case bi.BiThresholdOperator_BI_THRESHOLD_OPERATOR_BETWEEN:
		return value >= t.Value && value <= t.ValueUpper
	default:
		return false
	}
}
