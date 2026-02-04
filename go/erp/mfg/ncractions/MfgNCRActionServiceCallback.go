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

package ncractions

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

type MfgNCRActionServiceCallback struct{}

func newMfgNCRActionServiceCallback() *MfgNCRActionServiceCallback {
	return &MfgNCRActionServiceCallback{}
}

func (this *MfgNCRActionServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*mfg.MfgNCRAction)
	if !ok {
		return nil, false, errors.New("invalid MfgNCRAction type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ActionId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *MfgNCRActionServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *mfg.MfgNCRAction, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ActionId, "ActionId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.NcrId, "NcrId"); err != nil {
		return err
	}
	return nil
}
