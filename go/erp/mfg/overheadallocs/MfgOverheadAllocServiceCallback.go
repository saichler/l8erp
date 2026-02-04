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

package overheadallocs

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

type MfgOverheadAllocServiceCallback struct{}

func newMfgOverheadAllocServiceCallback() *MfgOverheadAllocServiceCallback {
	return &MfgOverheadAllocServiceCallback{}
}

func (this *MfgOverheadAllocServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*mfg.MfgOverheadAlloc)
	if !ok {
		return nil, false, errors.New("invalid MfgOverheadAlloc type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.AllocationId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *MfgOverheadAllocServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *mfg.MfgOverheadAlloc, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.AllocationId, "AllocationId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.OverheadId, "OverheadId"); err != nil {
		return err
	}
	return nil
}
