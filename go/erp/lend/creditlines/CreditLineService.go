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

package creditlines

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/lend"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "CreditLn"
	ServiceArea = byte(130)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService(common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "CreditLineId", Callback: newCreditLineServiceCallback(vnic),
	}, &lend.CreditLine{}, &lend.CreditLineList{}, creds, dbname, vnic)
}

func CreditLines(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func CreditLineById(creditLineId string, vnic ifs.IVNic) (*lend.CreditLine, error) {
	result, err := common.GetEntity(ServiceName, ServiceArea, &lend.CreditLine{CreditLineId: creditLineId}, vnic)
	if err != nil || result == nil {
		return nil, err
	}
	return result.(*lend.CreditLine), nil
}
