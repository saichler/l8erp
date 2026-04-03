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
package mrpruns

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/mfg"
	common "github.com/saichler/l8erp/go/erp/common"
)

func newMfgMrpRunServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&mfg.MfgMrpRun{}, vnic).
		Require(func(v interface{}) string { return v.(*mfg.MfgMrpRun).RunId }, "RunId").
		Enum(func(v interface{}) int32 { return int32(v.(*mfg.MfgMrpRun).Status) }, mfg.MfgMrpStatus_name, "Status").
		Build()
}
