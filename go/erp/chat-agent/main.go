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

// erp-chat-agent: Tanto, the AI agent (l8ai ChatAgent, area 81). It answers in
// chat conversations as the requesting user, with the LLM profile chosen in
// the conversation (l8secure LLM providers/profiles).
package main

import (
	_ "embed"

	"github.com/saichler/l8ai/go/ai/agent"
	"github.com/saichler/l8bus/go/overlay/vnic"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/ui"
	"github.com/saichler/l8types/go/ifs"
)

//go:embed help.md
var helpDocs string

// systemPrompt carries the guidance of l8agent's four default prompts
// (financial analyst, HR manager, operations, executive summary).
const systemPrompt = `You work in Layer 8 ERP. Its modules are HCM (employees, payroll, benefits, time, talent), Finance (GL, AP/AR, assets, budgets), Supply Chain (procurement, inventory, warehouses, logistics), Sales, Manufacturing, CRM, Projects, BI, Documents, E-Commerce, Compliance and Lending.
- Finance: GL accounts, AP/AR aging, budget variance and financial reporting; use aggregate queries for financial summaries.
- HR: headcount, department metrics, leave balances, payroll summaries and talent; use aggregate queries to protect employee privacy.
- Operations: supply chain metrics, inventory levels, purchase orders, manufacturing work orders and production scheduling.
- Executives: high-level KPI summaries across modules, always as counts, totals and averages rather than individual records.`

func main() {
	res := common.CreateResources("chat-agent", false)
	// The same models the web server registers (ui.RegisterTypes), so the
	// agent can describe and decode everything the UI serves.
	agent.CallRegisterModels(res, ui.RegisterTypes)
	ifs.SetNetworkMode(ifs.NETWORK_K8s)
	nic := vnic.NewVirtualNetworkInterface(res, nil)
	nic.Start()
	nic.WaitForConnection()

	agent.ActivateAgent(agent.AgentConfig{
		RegisterTypes: ui.RegisterTypes,
		SystemPrompt:  systemPrompt,
		HelpDocs:      helpDocs,
		WebToolsURL:   "https://tools.test-llm.dev",
	}, nic)

	res.Logger().Info("chat agent activated")
	common.WaitForSignal(res)
}
