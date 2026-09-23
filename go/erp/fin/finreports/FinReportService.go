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

package finreports

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "FinReport"
	ServiceArea = byte(40)
)

// The seventh and last report service on the shared scaffolding in
// erp/common/report_service.go. The six module report services used to point at
// fin.FinReport too, so all seven activated an ORM service over this one table
// (SingleOwnerDatabaseTable); each owns its own type now.
func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateReportService(ServiceName, ServiceArea, creds, dbname, vnic,
		finReportAccessors(vnic), &fin.FinReport{}, &fin.FinReportList{})
}
