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

package ncrs

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "MfgNCR"
	ServiceArea = byte(70)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService[mfg.MfgNCR, mfg.MfgNCRList](common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "NcrId", Callback: newMfgNCRServiceCallback(),
		Transactional: true,
	}, creds, dbname, vnic)
}

func MfgNCRs(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func MfgNCR(ncrId string, vnic ifs.IVNic) (*mfg.MfgNCR, error) {
	return common.GetEntity(ServiceName, ServiceArea, &mfg.MfgNCR{NcrId: ncrId}, vnic)
}
