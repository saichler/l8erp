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
package violationrecords

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8erp/go/erp/common"
)

func newCompViolationRecordServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[comp.CompViolationRecord]("CompViolationRecord",
		func(e *comp.CompViolationRecord) { common.GenerateID(&e.ViolationId) }).
		Require(func(e *comp.CompViolationRecord) string { return e.ViolationId }, "ViolationId").
		Enum(func(e *comp.CompViolationRecord) int32 { return int32(e.Severity) }, comp.CompSeverityLevel_name, "Severity").
		Enum(func(e *comp.CompViolationRecord) int32 { return int32(e.Status) }, comp.CompFindingStatus_name, "Status").
		Build()
}
