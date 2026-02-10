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
package kpis

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8erp/go/erp/common"
)

func newBiKPIServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[bi.BiKPI]("BiKPI",
		func(e *bi.BiKPI) { common.GenerateID(&e.KpiId) }).
		Require(func(e *bi.BiKPI) string { return e.KpiId }, "KpiId").
		Enum(func(e *bi.BiKPI) int32 { return int32(e.Status) }, bi.BiKPIStatus_name, "Status").
		Enum(func(e *bi.BiKPI) int32 { return int32(e.Trend) }, bi.BiTrendDirection_name, "Trend").
		Build()
}
