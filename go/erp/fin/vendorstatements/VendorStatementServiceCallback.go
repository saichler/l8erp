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

package vendorstatements

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type VendorStatementServiceCallback struct{}

func newVendorStatementServiceCallback() *VendorStatementServiceCallback {
	return &VendorStatementServiceCallback{}
}

func (this *VendorStatementServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	vendorStatement, ok := any.(*fin.VendorStatement)
	if !ok {
		return nil, false, errors.New("invalid vendorStatement type")
	}
	if action == ifs.POST {
		common.GenerateID(&vendorStatement.StatementId)
	}
	err := validate(vendorStatement, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *VendorStatementServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(vendorStatement *fin.VendorStatement, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(vendorStatement.StatementId, "StatementId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(vendorStatement.VendorId, "VendorId"); err != nil {
		return err
	}
	return nil
}
