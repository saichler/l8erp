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
package hcmreports

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "HcmReport"
	ServiceArea = byte(30)
)

// The service owns HcmReport -- its own protobuf type, not fin.FinReport. Seven
// report services sharing one message meant seven ORM services over one table
// and one cache (SingleOwnerDatabaseTable).
func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateReportService(ServiceName, ServiceArea, creds, dbname, vnic,
		hcmReportAccessors(vnic), &hcm.HcmReport{}, &hcm.HcmReportList{})
}
