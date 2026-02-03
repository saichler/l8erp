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
package jobs

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/jobfamilies"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type JobServiceCallback struct {
}

func newJobServiceCallback() *JobServiceCallback {
	return &JobServiceCallback{}
}

func (this *JobServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Job)
	if !ok {
		return nil, false, errors.New("invalid job type")
	}
	if action == ifs.POST {
		common.GenerateID(&entity.JobId)
	}
	err := validateJob(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *JobServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateJob(entity *hcm.Job, vnic ifs.IVNic) error {
	if err := validateJobRequiredFields(entity); err != nil {
		return err
	}
	if err := validateJobDates(entity); err != nil {
		return err
	}
	if err := validateJobFamily(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateJobRequiredFields(entity *hcm.Job) error {
	if err := common.ValidateRequired(entity.JobId, "JobId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Title, "Title"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.JobCode, "JobCode"); err != nil {
		return err
	}
	return nil
}

func validateJobDates(entity *hcm.Job) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateJobFamily(entity *hcm.Job, vnic ifs.IVNic) error {
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
