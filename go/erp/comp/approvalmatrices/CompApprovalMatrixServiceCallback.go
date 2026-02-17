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
package approvalmatrices

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/comp"
)

func newCompApprovalMatrixServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[comp.CompApprovalMatrix]("CompApprovalMatrix",
		func(e *comp.CompApprovalMatrix) { common.GenerateID(&e.MatrixId) }).
		Require(func(e *comp.CompApprovalMatrix) string { return e.MatrixId }, "MatrixId").
		OptionalMoney(func(e *comp.CompApprovalMatrix) *erp.Money { return e.ThresholdMin }, "ThresholdMin").
		OptionalMoney(func(e *comp.CompApprovalMatrix) *erp.Money { return e.ThresholdMax }, "ThresholdMax").
		Build()
}
