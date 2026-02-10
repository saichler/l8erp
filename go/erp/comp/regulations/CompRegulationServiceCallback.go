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
package regulations

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/comp"
)

func newCompRegulationServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[comp.CompRegulation]("CompRegulation",
		func(e *comp.CompRegulation) { common.GenerateID(&e.RegulationId) }).
		Require(func(e *comp.CompRegulation) string { return e.RegulationId }, "RegulationId").
		Enum(func(e *comp.CompRegulation) int32 { return int32(e.RegulationType) }, comp.CompRegulationType_name, "RegulationType").
		Build()
}
