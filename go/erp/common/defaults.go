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

package common

import (
	l8c "github.com/saichler/l8common/go/common"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ERP_VNET      = 49001
	ERP_LOGS_VNET = 49005
	PREFIX        = "/erp/"
)

var DB_CREDS = "postgres"
var DB_NAME = "erp"

func CreateResources(alias string) ifs.IResources {
	return l8c.CreateResources(alias, "/data/logs/erp", uint32(ERP_VNET))
}

var WaitForSignal = l8c.WaitForSignal
var OpenDBConection = l8c.OpenDBConection
