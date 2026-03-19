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

// aia_phases.go
// AIA Module ServiceArea = 120
// Phase orchestration for AI Agent module mock data generation

import (
	"fmt"

	"github.com/saichler/l8agent/go/types/l8agent"
)

// generateAIAPhase1 generates prompts, conversations, and messages
func generateAIAPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate L8AgentPrompts
	prompts := generateAgentPrompts(store)
	_, err := client.Post("/erp/120/AgntPrmpt", &l8agent.L8AgentPromptList{List: prompts})
	if err != nil {
		return fmt.Errorf("failed to create L8AgentPrompts: %w", err)
	}
	for _, p := range prompts {
		store.PromptIDs = append(store.PromptIDs, p.PromptId)
	}
	fmt.Printf("  Created %d L8AgentPrompts\n", len(prompts))

	// Generate L8AgentConversations (metadata only)
	conversations := generateAgentConversations(store)
	_, err = client.Post("/erp/120/AgntConvo", &l8agent.L8AgentConversationList{List: conversations})
	if err != nil {
		return fmt.Errorf("failed to create L8AgentConversations: %w", err)
	}
	for _, c := range conversations {
		store.ConversationIDs = append(store.ConversationIDs, c.ConversationId)
	}
	fmt.Printf("  Created %d L8AgentConversations\n", len(conversations))

	// Generate L8AgentChatMessages (separate from conversations)
	messages := generateAgentChatMessages(store)
	_, err = client.Post("/erp/120/AgntMsg", &l8agent.L8AgentChatMessageList{List: messages})
	if err != nil {
		return fmt.Errorf("failed to create L8AgentChatMessages: %w", err)
	}
	fmt.Printf("  Created %d L8AgentChatMessages\n", len(messages))

	return nil
}
