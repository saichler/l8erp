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
package shifts

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newShiftServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Shift",
		func(e *hcm.Shift) { common.GenerateID(&e.ShiftId) },
		nil)
}

func validateShift(entity *hcm.Shift) error {
	if err := validateShiftRequiredFields(entity); err != nil {
		return err
	}
	if err := validateShiftEnums(entity); err != nil {
		return err
	}
	return nil
}

func validateShiftRequiredFields(entity *hcm.Shift) error {
	if err := common.ValidateRequired(entity.ShiftId, "ShiftId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateShiftEnums(entity *hcm.Shift) error {
	if err := common.ValidateEnum(entity.ShiftType, hcm.ShiftType_name, "ShiftType"); err != nil {
		return err
	}
	return nil
}
