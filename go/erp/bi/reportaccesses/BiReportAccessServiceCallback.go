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
package reportaccesses

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/bi"
)

func newBiReportAccessServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[bi.BiReportAccess]("BiReportAccess",
		func(e *bi.BiReportAccess) { common.GenerateID(&e.AccessId) }).
		Require(func(e *bi.BiReportAccess) string { return e.AccessId }, "AccessId").
		Enum(func(e *bi.BiReportAccess) int32 { return int32(e.AccessLevel) }, bi.BiAccessLevel_name, "AccessLevel").
		Build()
}
