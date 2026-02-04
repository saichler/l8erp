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

package testresults

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

type MfgTestResultServiceCallback struct{}

func newMfgTestResultServiceCallback() *MfgTestResultServiceCallback {
	return &MfgTestResultServiceCallback{}
}

func (this *MfgTestResultServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*mfg.MfgTestResult)
	if !ok {
		return nil, false, errors.New("invalid MfgTestResult type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ResultId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *MfgTestResultServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *mfg.MfgTestResult, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ResultId, "ResultId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.InspectionId, "InspectionId"); err != nil {
		return err
	}
	return nil
}
