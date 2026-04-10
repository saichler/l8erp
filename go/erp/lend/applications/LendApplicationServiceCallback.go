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
package applications

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/lend"
	"github.com/saichler/l8types/go/ifs"
)

func newLendApplicationServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&lend.LendApplication{}, vnic).
		Require(func(v interface{}) string { return v.(*lend.LendApplication).ApplicationId }, "ApplicationId").
		Require(func(v interface{}) string { return v.(*lend.LendApplication).CustomerId }, "CustomerId").
		Enum(func(v interface{}) int32 { return int32(v.(*lend.LendApplication).Status) }, lend.LendApplicationStatus_name, "Status").
		Build()
}
