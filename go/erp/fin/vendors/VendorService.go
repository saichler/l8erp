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

package vendors

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceName = "Vendor"
	ServiceArea = byte(40)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	common.ActivateService(common.ServiceConfig{
		ServiceName: ServiceName, ServiceArea: ServiceArea,
		PrimaryKey: "VendorId", Callback: newVendorServiceCallback(vnic),
	}, &fin.Vendor{}, &fin.VendorList{}, creds, dbname, vnic)
}

func Vendors(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func Vendor(vendorId string, vnic ifs.IVNic) (*fin.Vendor, error) {
	result, err := common.GetEntity(ServiceName, ServiceArea, &fin.Vendor{ VendorId: vendorId }, vnic)
	if err != nil || result == nil {
		return nil, err
	}
	return result.(*fin.Vendor), nil
}
