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
package scheduleblocks

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgScheduleBlockServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("MfgScheduleBlock",
		func(e *mfg.MfgScheduleBlock) { common.GenerateID(&e.BlockId) },
		validate)
}

func validate(item *mfg.MfgScheduleBlock, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.BlockId, "BlockId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.ScheduleId, "ScheduleId"); err != nil {
		return err
	}
	return nil
}
