/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 *
 * Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package main

import (
	"github.com/saichler/l8bus/go/overlay/vnet"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8logfusion/go/agent/logserver"
)

func main() {
	logsDbDirectory := "/data/logsdb/erp"
	resources := common.CreateResources("erp-log-vnet")
	resources.SysConfig().VnetPort = common.ERP_LOGS_VNET
	net := vnet.NewVNet(resources, true)
	net.Start()
	logserver.ActivateLogService(logsDbDirectory, net.VnetVnic())
	resources.Logger().Info("logs vnet started!")
	common.WaitForSignal(resources)
}
