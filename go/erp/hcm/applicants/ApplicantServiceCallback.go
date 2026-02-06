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
package applicants

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newApplicantServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Applicant",
		func(e *hcm.Applicant) { common.GenerateID(&e.ApplicantId) },
		nil)
}

func validateApplicant(entity *hcm.Applicant) error {
	if err := validateApplicantRequiredFields(entity); err != nil {
		return err
	}
	if err := validateApplicantEnums(entity); err != nil {
		return err
	}
	return nil
}

func validateApplicantRequiredFields(entity *hcm.Applicant) error {
	if err := common.ValidateRequired(entity.ApplicantId, "ApplicantId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.FirstName, "FirstName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.LastName, "LastName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Email, "Email"); err != nil {
		return err
	}
	return nil
}

func validateApplicantEnums(entity *hcm.Applicant) error {
	if err := common.ValidateEnum(entity.Source, hcm.ApplicantSource_name, "Source"); err != nil {
		return err
	}
	return nil
}
