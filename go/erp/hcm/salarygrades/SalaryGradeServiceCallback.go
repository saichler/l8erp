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
package salarygrades

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/erp/common"
)

func newSalaryGradeServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("SalaryGrade",
		func(e *hcm.SalaryGrade) { common.GenerateID(&e.GradeId) },
		nil)
}

func validateSalGrade(entity *hcm.SalaryGrade) error {
	if err := validateSalGradeRequiredFields(entity); err != nil {
		return err
	}
	return nil
}

func validateSalGradeRequiredFields(entity *hcm.SalaryGrade) error {
	if err := common.ValidateRequired(entity.GradeId, "GradeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}
