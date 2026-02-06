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
package jobfamilies

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newJobFamilyServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("JobFamily",
		func(e *hcm.JobFamily) { common.GenerateID(&e.JobFamilyId) },
		nil)
}

func validateJobFam(entity *hcm.JobFamily) error {
	if err := validateJobFamRequiredFields(entity); err != nil {
		return err
	}
	return nil
}

func validateJobFamRequiredFields(entity *hcm.JobFamily) error {
	if err := common.ValidateRequired(entity.JobFamilyId, "JobFamilyId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}
