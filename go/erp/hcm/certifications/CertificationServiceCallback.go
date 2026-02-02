// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package certifications

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type CertificationServiceCallback struct {
}

func newCertificationServiceCallback() *CertificationServiceCallback {
	return &CertificationServiceCallback{}
}

func (this *CertificationServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Certification)
	if !ok {
		return nil, false, errors.New("invalid certification type")
	}
	err := validateCertification(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CertificationServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCertification(entity *hcm.Certification, vnic ifs.IVNic) error {
	if err := validateCertRequiredFields(entity); err != nil {
		return err
	}
	if err := validateCertEnums(entity); err != nil {
		return err
	}
	return nil
}

func validateCertRequiredFields(entity *hcm.Certification) error {
	if err := common.ValidateRequired(entity.CertificationId, "CertificationId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateCertEnums(entity *hcm.Certification) error {
	if err := common.ValidateEnum(int32(entity.CertificationType), hcm.CertificationType_name, "CertificationType"); err != nil {
		return err
	}
	return nil
}
