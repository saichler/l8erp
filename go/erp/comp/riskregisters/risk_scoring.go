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
package riskregisters

import (
	"github.com/saichler/l8erp/go/types/comp"
)

// computeRiskScores calculates inherent and residual risk scores from
// likelihood and impact ratings, and scores embedded assessments.
func computeRiskScores(risk *comp.CompRiskRegister) error {
	// Compute inherent risk = likelihood × impact
	risk.InherentRiskScore = risk.InherentLikelihood * risk.InherentImpact
	// Compute residual risk = residual likelihood × residual impact
	risk.ResidualRiskScore = risk.ResidualLikelihood * risk.ResidualImpact
	// Score each embedded assessment
	for _, a := range risk.Assessments {
		a.RiskScore = a.LikelihoodRating * a.ImpactRating
	}
	return nil
}
