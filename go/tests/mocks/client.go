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
package mocks

import (
	"net/http"

	l8m "github.com/saichler/l8common/go/mocks"
)

// HCMClient is an alias for l8common's MockClient.
type HCMClient = l8m.MockClient

// NewHCMClient creates a new HCMClient with the given base URL and HTTP client.
func NewHCMClient(baseURL string, httpClient *http.Client) *HCMClient {
	return l8m.NewMockClient(baseURL, httpClient)
}
