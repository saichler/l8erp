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
package paycomponents

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newPayComponentServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("PayComponent",
		func(e *hcm.PayComponent) { common.GenerateID(&e.ComponentId) },
		nil)
}

func validatePayComp(entity *hcm.PayComponent) error {
	if err := validatePayCompRequiredFields(entity); err != nil {
		return err
	}
	return nil
}

func validatePayCompRequiredFields(entity *hcm.PayComponent) error {
	if err := common.ValidateRequired(entity.ComponentId, "ComponentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}
