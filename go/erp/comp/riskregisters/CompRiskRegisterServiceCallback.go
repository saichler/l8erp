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
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/comp"
)

func newCompRiskRegisterServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[comp.CompRiskRegister]("CompRiskRegister",
		func(e *comp.CompRiskRegister) { common.GenerateID(&e.RiskId) }).
		Require(func(e *comp.CompRiskRegister) string { return e.RiskId }, "RiskId").
		Enum(func(e *comp.CompRiskRegister) int32 { return int32(e.Category) }, comp.CompRiskCategory_name, "Category").
		Enum(func(e *comp.CompRiskRegister) int32 { return int32(e.Status) }, comp.CompRiskStatus_name, "Status").
		OptionalMoney(func(e *comp.CompRiskRegister) *erp.Money { return e.PotentialFinancialImpact }, "PotentialFinancialImpact").
		Build()
}
