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

// gen_aia.go
// Generates:
// - L8AgentPrompt (5 records — built-in prompt templates)
// - L8AgentConversation (3 records — sample conversations with embedded messages)

import (
	"fmt"
	"time"

	"github.com/saichler/l8agent/go/types/l8agent"
)

// generateAgentPrompts creates built-in AI agent prompt templates
func generateAgentPrompts(store *MockDataStore) []*l8agent.L8AgentPrompt {
	prompts := []*l8agent.L8AgentPrompt{
		{
			PromptId:    genID("aprmt", 0),
			Name:        "Financial Analyst",
			Description: "Analyzes financial data across GL, AP, and AR modules",
			SystemPrompt: "You are a financial analyst assistant for this ERP system. " +
				"Focus on General Ledger, Accounts Payable, and Accounts Receivable data. " +
				"Provide analysis of financial trends, account balances, and cash flow patterns. " +
				"Always present monetary values in proper currency format.",
			Category:       int32(l8agent.L8AgentPromptCategory_L8_AGENT_PROMPT_CATEGORY_ANALYSIS),
			Status:         int32(l8agent.L8AgentPromptStatus_L8_AGENT_PROMPT_STATUS_ACTIVE),
			AllowedModules: []string{"fin"},
			CreatedBy:      pickRef(store.EmployeeIDs, 0),
		},
		{
			PromptId:    genID("aprmt", 1),
			Name:        "HR Manager",
			Description: "Provides workforce metrics and HR insights across HCM module",
			SystemPrompt: "You are an HR manager assistant for this ERP system. " +
				"Focus on Human Capital Management data including employees, departments, " +
				"payroll, benefits, and performance reviews. Help with workforce planning, " +
				"headcount analysis, and compensation benchmarking.",
			Category:       int32(l8agent.L8AgentPromptCategory_L8_AGENT_PROMPT_CATEGORY_REPORTING),
			Status:         int32(l8agent.L8AgentPromptStatus_L8_AGENT_PROMPT_STATUS_ACTIVE),
			AllowedModules: []string{"hcm"},
			CreatedBy:      pickRef(store.EmployeeIDs, 1),
		},
		{
			PromptId:    genID("aprmt", 2),
			Name:        "Operations",
			Description: "Monitors supply chain and manufacturing operations",
			SystemPrompt: "You are an operations assistant for this ERP system. " +
				"Focus on Supply Chain Management and Manufacturing data. " +
				"Help with inventory analysis, procurement tracking, production scheduling, " +
				"and logistics optimization. Flag any supply chain bottlenecks.",
			Category:       int32(l8agent.L8AgentPromptCategory_L8_AGENT_PROMPT_CATEGORY_WORKFLOW),
			Status:         int32(l8agent.L8AgentPromptStatus_L8_AGENT_PROMPT_STATUS_ACTIVE),
			AllowedModules: []string{"scm", "mfg"},
			CreatedBy:      pickRef(store.EmployeeIDs, 2),
		},
		{
			PromptId:    genID("aprmt", 3),
			Name:        "Executive Summary",
			Description: "High-level KPI summaries across all modules",
			SystemPrompt: "You are an executive assistant for this ERP system. " +
				"Provide high-level summaries and KPI dashboards across all modules. " +
				"Focus on key business metrics: revenue, headcount, inventory turns, " +
				"order fulfillment rates, and compliance status. Be concise and actionable.",
			Category:       int32(l8agent.L8AgentPromptCategory_L8_AGENT_PROMPT_CATEGORY_GENERAL),
			Status:         int32(l8agent.L8AgentPromptStatus_L8_AGENT_PROMPT_STATUS_ACTIVE),
			AllowedModules: []string{"fin", "hcm", "scm", "mfg", "sales", "crm"},
			CreatedBy:      pickRef(store.EmployeeIDs, 3),
		},
		{
			PromptId:    genID("aprmt", 4),
			Name:        "Sales Pipeline",
			Description: "Analyzes sales pipeline and CRM data",
			SystemPrompt: "You are a sales analyst assistant for this ERP system. " +
				"Focus on Sales and CRM modules. Analyze pipeline health, conversion rates, " +
				"territory performance, and customer engagement. Help forecast revenue " +
				"and identify at-risk opportunities.",
			Category:       int32(l8agent.L8AgentPromptCategory_L8_AGENT_PROMPT_CATEGORY_ANALYSIS),
			Status:         int32(l8agent.L8AgentPromptStatus_L8_AGENT_PROMPT_STATUS_INACTIVE),
			AllowedModules: []string{"sales", "crm"},
			CreatedBy:      pickRef(store.EmployeeIDs, 4),
		},
	}
	return prompts
}

// generateAgentConversations creates sample conversation records with embedded messages
func generateAgentConversations(store *MockDataStore) []*l8agent.L8AgentConversation {
	now := time.Now()

	conversations := []*l8agent.L8AgentConversation{
		{
			ConversationId: genID("aconv", 0),
			UserId:         pickRef(store.EmployeeIDs, 0),
			Title:          "Q4 Revenue Analysis",
			Status:         int32(l8agent.L8AgentConvoStatus_L8_AGENT_CONVO_STATUS_ACTIVE),
			CreatedAt:      now.AddDate(0, 0, -7).Unix(),
			UpdatedAt:      now.AddDate(0, 0, -7).Unix(),
			Messages: []*l8agent.L8AgentMessage{
				{
					MessageId:  fmt.Sprintf("msg-%03d", 1),
					Role:       int32(l8agent.L8AgentMessageRole_L8_AGENT_MESSAGE_ROLE_USER),
					Content:    "What is the total revenue for Q4 across all accounts?",
					Timestamp:  now.AddDate(0, 0, -7).Unix(),
					TokenCount: 15,
				},
				{
					MessageId:  fmt.Sprintf("msg-%03d", 2),
					Role:       int32(l8agent.L8AgentMessageRole_L8_AGENT_MESSAGE_ROLE_ASSISTANT),
					Content:    "Based on the General Ledger data, the total Q4 revenue across all revenue accounts is $2,450,000. This represents a 12% increase over Q3.",
					Timestamp:  now.AddDate(0, 0, -7).Add(time.Second * 3).Unix(),
					TokenCount: 42,
					ToolCalls: []*l8agent.L8AgentToolCall{
						{
							ToolCallId: "tc-001",
							ToolName:   "query_data",
							ToolInput:  `{"query":"select * from FinAccount where accountType=1","module":"fin"}`,
						},
					},
					ToolResults: []*l8agent.L8AgentToolResult{
						{
							ToolCallId: "tc-001",
							Result:     `{"totalRevenue":245000000,"accountCount":15}`,
							IsError:    false,
						},
					},
				},
			},
		},
		{
			ConversationId: genID("aconv", 1),
			UserId:         pickRef(store.EmployeeIDs, 1),
			Title:          "Department Headcount Report",
			Status:         int32(l8agent.L8AgentConvoStatus_L8_AGENT_CONVO_STATUS_ACTIVE),
			CreatedAt:      now.AddDate(0, 0, -3).Unix(),
			UpdatedAt:      now.AddDate(0, 0, -3).Unix(),
			Messages: []*l8agent.L8AgentMessage{
				{
					MessageId:  fmt.Sprintf("msg-%03d", 3),
					Role:       int32(l8agent.L8AgentMessageRole_L8_AGENT_MESSAGE_ROLE_USER),
					Content:    "Show me the headcount breakdown by department",
					Timestamp:  now.AddDate(0, 0, -3).Unix(),
					TokenCount: 12,
				},
				{
					MessageId:  fmt.Sprintf("msg-%03d", 4),
					Role:       int32(l8agent.L8AgentMessageRole_L8_AGENT_MESSAGE_ROLE_ASSISTANT),
					Content:    "Here is the headcount breakdown by department:\n- Engineering: 45\n- Sales: 32\n- Marketing: 18\n- Finance: 12\n- HR: 8\nTotal active employees: 115",
					Timestamp:  now.AddDate(0, 0, -3).Add(time.Second * 2).Unix(),
					TokenCount: 55,
				},
				{
					MessageId:  fmt.Sprintf("msg-%03d", 5),
					Role:       int32(l8agent.L8AgentMessageRole_L8_AGENT_MESSAGE_ROLE_USER),
					Content:    "Which department has the highest turnover rate?",
					Timestamp:  now.AddDate(0, 0, -3).Add(time.Minute).Unix(),
					TokenCount: 10,
				},
				{
					MessageId:  fmt.Sprintf("msg-%03d", 6),
					Role:       int32(l8agent.L8AgentMessageRole_L8_AGENT_MESSAGE_ROLE_ASSISTANT),
					Content:    "Sales has the highest turnover rate at 18% annually, followed by Marketing at 12%. Engineering has the lowest at 5%.",
					Timestamp:  now.AddDate(0, 0, -3).Add(time.Minute + time.Second*3).Unix(),
					TokenCount: 35,
				},
			},
		},
		{
			ConversationId: genID("aconv", 2),
			UserId:         pickRef(store.EmployeeIDs, 2),
			Title:          "Inventory Status Check",
			Status:         int32(l8agent.L8AgentConvoStatus_L8_AGENT_CONVO_STATUS_ARCHIVED),
			CreatedAt:      now.AddDate(0, 0, -14).Unix(),
			UpdatedAt:      now.AddDate(0, 0, -10).Unix(),
			Messages: []*l8agent.L8AgentMessage{
				{
					MessageId:  fmt.Sprintf("msg-%03d", 7),
					Role:       int32(l8agent.L8AgentMessageRole_L8_AGENT_MESSAGE_ROLE_USER),
					Content:    "Are there any items below reorder point?",
					Timestamp:  now.AddDate(0, 0, -14).Unix(),
					TokenCount: 10,
				},
				{
					MessageId:  fmt.Sprintf("msg-%03d", 8),
					Role:       int32(l8agent.L8AgentMessageRole_L8_AGENT_MESSAGE_ROLE_ASSISTANT),
					Content:    "There are 7 items currently below their reorder points. The most critical are: Raw Material A (12 units vs 50 minimum), Component B (3 units vs 25 minimum).",
					Timestamp:  now.AddDate(0, 0, -14).Add(time.Second * 4).Unix(),
					TokenCount: 48,
				},
			},
		},
	}
	return conversations
}
