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

package vendors

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type VendorServiceCallback struct{}

func newVendorServiceCallback() *VendorServiceCallback {
	return &VendorServiceCallback{}
}

func (this *VendorServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	vendor, ok := any.(*fin.Vendor)
	if !ok {
		return nil, false, errors.New("invalid vendor type")
	}
	err := validate(vendor, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *VendorServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(vendor *fin.Vendor, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(vendor.Name, "Name"); err != nil {
		return err
	}
	return nil
}
