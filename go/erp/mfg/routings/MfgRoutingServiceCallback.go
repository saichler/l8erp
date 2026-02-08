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
package routings

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgRoutingServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[mfg.MfgRouting]("MfgRouting",
		func(e *mfg.MfgRouting) { common.GenerateID(&e.RoutingId) }).
		Require(func(e *mfg.MfgRouting) string { return e.RoutingId }, "RoutingId").
		Require(func(e *mfg.MfgRouting) string { return e.ItemId }, "ItemId").
		Build()
}
