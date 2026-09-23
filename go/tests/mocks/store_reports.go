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

// ReportsStore holds the generated IDs for the seven report services.
//
// A report is POSTed with parameters only -- the service callback runs that
// module's generator against the live tables and fills in the sections. So
// these run LAST within each module, after the data they summarise exists.
type ReportsStore struct {
	FinReportIDs   []string
	HcmReportIDs   []string
	ScmReportIDs   []string
	MfgReportIDs   []string
	SalesReportIDs []string
	CrmReportIDs   []string
	PrjReportIDs   []string
}
