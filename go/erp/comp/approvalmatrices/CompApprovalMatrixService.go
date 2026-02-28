// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package approvalmatrices

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "CompAprvMx"
	ServiceArea = byte(110)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService[comp.CompApprovalMatrix, comp.CompApprovalMatrixList](common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "MatrixId", Callback: newCompApprovalMatrixServiceCallback(),
		Transactional: true, EnableCache: true,
	}, creds, dbname, vnic)
}

func CompApprovalMatrices(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func CompApprovalMatrix(matrixId string, vnic ifs.IVNic) (*comp.CompApprovalMatrix, error) {
	return common.GetEntity(ServiceName, ServiceArea, &comp.CompApprovalMatrix{MatrixId: matrixId}, vnic)
}
