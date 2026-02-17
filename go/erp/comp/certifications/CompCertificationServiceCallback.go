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
package certifications

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/comp"
)

func newCompCertificationServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[comp.CompCertification]("CompCertification",
		func(e *comp.CompCertification) { common.GenerateID(&e.CertificationId) }).
		Require(func(e *comp.CompCertification) string { return e.CertificationId }, "CertificationId").
		Enum(func(e *comp.CompCertification) int32 { return int32(e.Status) }, comp.CompCertificationStatus_name, "Status").
		OptionalMoney(func(e *comp.CompCertification) *erp.Money { return e.CertificationCost }, "CertificationCost").
		Build()
}
