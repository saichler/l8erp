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
	"github.com/saichler/l8common/go/common"
	"github.com/saichler/l8erp/go/erp/ui"
	"github.com/saichler/l8web/go/web/server"
)

func main() {
	// The agent chat (AgntChat, area 120 -- aia.ServiceArea) waits on the LLM:
	// the first message of a conversation alone takes ~30s to read, and tool
	// calls add rounds, so it gets longer than the default 30s per request.
	server.SetServiceTimeout("AgntChat", 120, 300)

	svr := common.CreateWebServer("web", ui.RegisterTypes)
	svr.Start()
}
