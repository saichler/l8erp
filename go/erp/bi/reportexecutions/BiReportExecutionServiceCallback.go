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
package reportexecutions

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/bi"
)

func newBiReportExecutionServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[bi.BiReportExecution]("BiReportExecution",
		func(e *bi.BiReportExecution) { common.GenerateID(&e.ExecutionId) }).
		Require(func(e *bi.BiReportExecution) string { return e.ExecutionId }, "ExecutionId").
		Enum(func(e *bi.BiReportExecution) int32 { return int32(e.OutputFormat) }, bi.BiExportFormat_name, "OutputFormat").
		Enum(func(e *bi.BiReportExecution) int32 { return int32(e.Status) }, bi.BiExecutionStatus_name, "Status").
		Build()
}
