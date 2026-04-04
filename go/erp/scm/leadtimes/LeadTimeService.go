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

package leadtimes

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "LeadTime"
	ServiceArea = byte(50)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService(common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "LeadTimeId", Callback: newLeadTimeServiceCallback(vnic),
	}, &scm.ScmLeadTime{}, &scm.ScmLeadTimeList{}, creds, dbname, vnic)
}

func LeadTimes(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func LeadTime(leadTimeId string, vnic ifs.IVNic) (*scm.ScmLeadTime, error) {
	result, err := common.GetEntity(ServiceName, ServiceArea, &scm.ScmLeadTime{ LeadTimeId: leadTimeId }, vnic)
	if err != nil || result == nil {
		return nil, err
	}
	return result.(*scm.ScmLeadTime), nil
}
