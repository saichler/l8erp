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
package projectkpis

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/prj"
)

func newPrjProjectKPIServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[prj.PrjProjectKPI]("PrjProjectKPI",
		func(e *prj.PrjProjectKPI) { common.GenerateID(&e.KpiId) }).
		Require(func(e *prj.PrjProjectKPI) string { return e.KpiId }, "KpiId").
		Enum(func(e *prj.PrjProjectKPI) int32 { return int32(e.Status) }, prj.PrjHealthIndicator_name, "Status").
		Build()
}
