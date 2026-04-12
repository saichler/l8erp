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
	"github.com/saichler/l8bus/go/overlay/health"
	"github.com/saichler/l8erp/go/erp/ui"
	"github.com/saichler/l8services/go/services/csvexport"
	"github.com/saichler/l8services/go/services/dataimport"
	"github.com/saichler/l8services/go/services/filestore"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8utils/go/utils/ipsegment"
	"github.com/saichler/l8web/go/web/server"
)

func main() {
	startWebServer2()
}

func startWebServer2() {
	nic1 := ui.CreateVnic(false)
	nic2 := ui.CreateVnic(true)
	server.UpdateLoginJsonPrefix(nic1.Resources().SysConfig().WebConfig.EndPointPrefix)

	serverConfig := &server.RestServerConfig{
		Host:           ipsegment.MachineIP,
		Port:           int(nic1.Resources().SysConfig().WebConfig.WebPort),
		Authentication: true,
		CertName:       nic1.Resources().SysConfig().WebConfig.Cert,
		Prefix:         nic1.Resources().SysConfig().WebConfig.EndPointPrefix,
	}
	svr, err := server.NewRestServer(serverConfig)
	if err != nil {
		panic(err)
	}

	csvexport.Activate(nic1)
	filestore.Activate(nic1)
	dataimport.Activate(nic1)

	hs, ok := nic1.Resources().Services().ServiceHandler(health.ServiceName, 0)
	if ok {
		ws := hs.WebService()
		svr.RegisterWebService(ws, nic1)
	}

	//Activate the webpoints service
	sla := ifs.NewServiceLevelAgreement(&server.WebService{}, ifs.WebService, 0, false, nil)
	sla.SetArgs(svr, nic2)
	nic1.Resources().Services().Activate(sla, nic1)

	nic1.Resources().Logger().Info("Web Server Started!")

	svr.Start()
}
