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
package careerpaths

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/jobfamilies"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newCareerPathServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("CareerPath",
		func(e *hcm.CareerPath) { common.GenerateID(&e.CareerPathId) },
		validateCarPath)
}

func validateCarPath(entity *hcm.CareerPath, vnic ifs.IVNic) error {
	if err := validateCarPathRequiredFields(entity); err != nil {
		return err
	}
	if err := validateCarPathJobFamily(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateCarPathRequiredFields(entity *hcm.CareerPath) error {
	if err := common.ValidateRequired(entity.CareerPathId, "CareerPathId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateCarPathJobFamily(entity *hcm.CareerPath, vnic ifs.IVNic) error {
	if entity.JobFamilyId == "" {
		return nil
	}
	return common.ValidateReference(
		entity.JobFamilyId,
		"JobFamily",
		jobfamilies.ServiceName,
		jobfamilies.ServiceArea,
		jobfamilies.JobFamilies,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return jobfamilies.JobFamily(id, vnic) },
		hcm.JobFamily{JobFamilyId: entity.JobFamilyId},
		vnic,
	)
}
