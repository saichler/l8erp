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
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type JobFamilyServiceCallback struct {
}

func newJobFamilyServiceCallback() *JobFamilyServiceCallback {
	return &JobFamilyServiceCallback{}
}

func (this *JobFamilyServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.JobFamily)
	if !ok {
		return nil, false, errors.New("invalid job family type")
	}
	err := validateJobFam(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *JobFamilyServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateJobFam(entity *hcm.JobFamily) error {
	if err := validateJobFamRequiredFields(entity); err != nil {
		return err
	}
	return nil
}

func validateJobFamRequiredFields(entity *hcm.JobFamily) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}
