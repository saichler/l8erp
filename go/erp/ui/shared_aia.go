package ui

import (
	"github.com/saichler/l8agent/go/types/l8agent"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func registerAiaTypes(resources ifs.IResources) {
	common.RegisterType[l8agent.L8AgentConversation, l8agent.L8AgentConversationList](resources, "ConversationId")
	common.RegisterType[l8agent.L8AgentChatMessage, l8agent.L8AgentChatMessageList](resources, "ConversationId")
	common.RegisterType[l8agent.L8AgentChatConversation, l8agent.L8AgentChatConversationList](resources, "ConversationId")
	common.RegisterType[l8agent.L8AgentPrompt, l8agent.L8AgentPromptList](resources, "PromptId")
}
