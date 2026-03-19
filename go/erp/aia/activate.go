/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package aia

import (
	agent "github.com/saichler/l8agent/go"
	"github.com/saichler/l8agent/go/types/l8agent"
	"github.com/saichler/l8types/go/ifs"
)

const (
	ServiceArea = byte(120)
)

func AgentConfig(creds, dbname string, vnic ifs.IVNic) agent.AgentConfig {
	return agent.AgentConfig{
		Resources:   vnic.Resources(),
		ServiceArea: ServiceArea,
		DBCreds:     creds,
		DBName:      dbname,
		DefaultPrompts: []*l8agent.L8AgentPrompt{
			{
				Name:           "Financial Analyst",
				Description:    "Analyze financial data including GL, AP, AR, and budgets",
				SystemPrompt:   "You are a financial analyst assistant. Focus on GL accounts, AP/AR aging, budget variance analysis, and financial reporting. Use aggregate queries for financial summaries.",
				Category:       int32(l8agent.L8AgentPromptCategory_L8_AGENT_PROMPT_CATEGORY_REPORTING),
				AllowedModules: []string{"fin"},
			},
			{
				Name:           "HR Manager",
				Description:    "Workforce analytics, headcount, and HR metrics",
				SystemPrompt:   "You are an HR management assistant. Focus on employee headcount, department metrics, leave balances, payroll summaries, and talent management. Use aggregate queries to protect employee privacy.",
				Category:       int32(l8agent.L8AgentPromptCategory_L8_AGENT_PROMPT_CATEGORY_REPORTING),
				AllowedModules: []string{"hcm"},
			},
			{
				Name:           "Operations",
				Description:    "Supply chain and manufacturing operations analysis",
				SystemPrompt:   "You are an operations assistant. Focus on supply chain metrics, inventory levels, purchase orders, manufacturing work orders, and production scheduling.",
				Category:       int32(l8agent.L8AgentPromptCategory_L8_AGENT_PROMPT_CATEGORY_WORKFLOW),
				AllowedModules: []string{"scm", "mfg"},
			},
			{
				Name:           "Executive Summary",
				Description:    "Cross-module KPI summaries for executives",
				SystemPrompt:   "You are an executive assistant. Provide high-level KPI summaries across all modules. Always use aggregate queries to present counts, totals, and averages rather than individual records.",
				Category:       int32(l8agent.L8AgentPromptCategory_L8_AGENT_PROMPT_CATEGORY_ANALYSIS),
			},
		},
	}
}

// Activate activates the ORM services (conversations, messages, prompts).
func Activate(creds, dbname string, vnic ifs.IVNic) {
	config := AgentConfig(creds, dbname, vnic)
	agent.Initialize(config, vnic)
}

// ActivateChat activates the Chat orchestration service.
// Must be called after all other services are activated.
func ActivateChat(creds, dbname string, vnic ifs.IVNic) {
	config := AgentConfig(creds, dbname, vnic)
	agent.InitializeChat(config, vnic)
}
