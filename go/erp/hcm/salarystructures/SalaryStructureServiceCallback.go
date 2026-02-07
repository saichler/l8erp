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
package salarystructures

import (
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newSalaryStructureServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("SalaryStructure",
		func(e *hcm.SalaryStructure) { common.GenerateID(&e.StructureId) },
		nil)
}

func validateSalStruct(entity *hcm.SalaryStructure) error {
	if err := validateSalStructRequiredFields(entity); err != nil {
		return err
	}
	if err := validateSalStructDates(entity); err != nil {
		return err
	}
	return nil
}

func validateSalStructRequiredFields(entity *hcm.SalaryStructure) error {
	if err := common.ValidateRequired(entity.StructureId, "StructureId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.CurrencyId, "CurrencyId"); err != nil {
		return err
	}
	return nil
}

func validateSalStructDates(entity *hcm.SalaryStructure) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}
