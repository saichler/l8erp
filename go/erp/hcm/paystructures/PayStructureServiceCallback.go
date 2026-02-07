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
package paystructures

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newPayStructureServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("PayStructure",
		func(e *hcm.PayStructure) { common.GenerateID(&e.PayStructureId) },
		nil)
}

func validatePayStruct(entity *hcm.PayStructure) error {
	if err := common.ValidateRequired(entity.PayStructureId, "PayStructureId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.CurrencyId, "CurrencyId"); err != nil {
		return err
	}
	if err := validatePayStructDates(entity); err != nil {
		return err
	}
	return nil
}

func validatePayStructDates(entity *hcm.PayStructure) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}
