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

package scanjobs

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "DocScan"
	ServiceArea = byte(45)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService(common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "ScanJobId", Callback: newDocScanJobServiceCallback(vnic),
	}, &doc.DocScanJob{}, &doc.DocScanJobList{}, creds, dbname, vnic)
}

func DocScanJobs(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func DocScanJob(scanJobId string, vnic ifs.IVNic) (*doc.DocScanJob, error) {
	result, err := common.GetEntity(ServiceName, ServiceArea, &doc.DocScanJob{ ScanJobId: scanJobId }, vnic)
	if err != nil || result == nil {
		return nil, err
	}
	return result.(*doc.DocScanJob), nil
}
