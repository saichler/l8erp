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
package loadplans

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/scm"
)

func newLoadPlanServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("ScmLoadPlan",
		func(e *scm.ScmLoadPlan) { common.GenerateID(&e.LoadPlanId) },
		validate)
}

func validate(item *scm.ScmLoadPlan, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.LoadPlanId, "LoadPlanId"); err != nil {
		return err
	}
	return nil
}
