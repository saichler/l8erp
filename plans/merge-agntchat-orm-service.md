# Plan: Restructure AI Agent as Three-Service Architecture

## Context

AgntChat is currently a stateless `IServiceHandler` that orchestrates LLM calls and saves conversations via a separate `AgntConvo` OrmService. The UI config registers AgntChat as a standard service, so `Layer8DModuleFactory` tries to GET from it — which fails because AgntChat has no real GET implementation.

The goal: make it work like ChatGPT with a clean three-service architecture. Two internal OrmServices handle persistence (conversations and messages separately), and one stateless facade service exposes the web API, reconstructing the full conversation from the two stores when needed.

## Architecture

### Service 1: L8AgentConversation (OrmService, internal — no web API)
- Stores conversation **metadata only** (no messages)
- `conversation_id` = UUID, primary key
- `user_id` = non-unique index (set via SLA)
- Used by Service 3 to create/query conversations

### Service 2: L8AgentChatMessage (OrmService, internal — no web API)
- Stores individual chat messages
- `conversation_id` + `sequence` as composite key
- `is_llm` flag distinguishes user vs assistant messages
- Used by Service 3 to persist and retrieve messages

### Service 3: AgntChat (stateless IServiceHandler, web API)
- Exposes a **facade/pseudo model**: `L8AgentConversation` with `repeated L8AgentChatMessage`
- **POST** (first message — no `conversation_id`):
  1. Create conversation via Service 1
  2. Store user message via Service 2 (sequence=1)
  3. Send to LLM (with allowed_modules context)
  4. Store LLM response via Service 2 (sequence=2)
  5. Return LLM reply as chat message
- **POST** (subsequent message — has `conversation_id`):
  1. Store user message via Service 2 (next sequence)
  2. Reconstruct history from Service 2 for LLM context
  3. Send to LLM
  4. Store LLM response via Service 2 (next sequence)
  5. Return LLM reply as chat message
- **GET**: Reconstruct full conversation (metadata from Service 1 + messages from Service 2), return pseudo model with repeated messages list
- This is the **only service the UI talks to**

## Proto Changes

**File: `proto/l8agent.proto`**

### L8AgentConversation — remove embedded messages
```protobuf
// L8AgentConversation - Prime Object (metadata only, no messages)
message L8AgentConversation {
    string conversation_id = 1;
    string user_id = 2;
    string title = 3;
    int32 status = 4;                    // L8AgentConvoStatus enum
    int64 created_at = 5;
    int64 updated_at = 6;
}
```

### L8AgentChatMessage — new Prime Object (replaces embedded L8AgentMessage)
```protobuf
// L8AgentChatMessage - Prime Object
// Individual chat message, stored separately for efficiency
message L8AgentChatMessage {
    string conversation_id = 1;          // FK to conversation
    int32 sequence = 2;                  // Order within conversation
    bool is_llm = 3;                     // true = assistant, false = user
    string message = 4;                  // Message content
    repeated string allowed_modules = 5; // Modules context (for user messages)
    int64 timestamp = 6;
    int32 token_count = 7;              // LLM token usage (for assistant messages)
}

message L8AgentChatMessageList {
    repeated L8AgentChatMessage list = 1;
    l8api.L8MetaData metadata = 2;
}
```

### L8AgentChatConversation — facade/pseudo model for web API
```protobuf
// L8AgentChatConversation - Pseudo model (NOT stored directly)
// Facade returned by AgntChat service, assembled from Service 1 + Service 2
message L8AgentChatConversation {
    string conversation_id = 1;
    string user_id = 2;
    string title = 3;
    int32 status = 4;
    repeated L8AgentChatMessage messages = 5;
    int64 created_at = 6;
    int64 updated_at = 7;
}

message L8AgentChatConversationList {
    repeated L8AgentChatConversation list = 1;
    l8api.L8MetaData metadata = 2;
}
```

### Remove old types
- Delete `L8AgentMessage`, `L8AgentToolCall`, `L8AgentToolResult` (replaced by `L8AgentChatMessage`)
- Delete `L8AgentChatRequest`, `L8AgentChatResponse` (the facade model replaces these)
- Delete `L8AgentDataResult`

### Keep unchanged
- `L8AgentPrompt`, `L8AgentPromptList`, all prompt enums
- `L8AgentConvoStatus` enum
- Remove `L8AgentMessageRole` enum (replaced by `is_llm` bool)

## Backend Changes (l8agent)

### Service 1: Conversation store
**File: `go/services/conversations/AgentConversationService.go`** — Simplify

- Keep as OrmService on `L8AgentConversation` (now without messages)
- Remove web endpoint setup (no `ws := web.New(...)`, no `sla.SetWebService()`)
- Keep `Conversation()` and `SaveConversation()` helper functions for Service 3
- SLA config: primary key `ConversationId`, non-unique index on `UserId`

**File: `go/services/conversations/AgentConversationServiceCallback.go`** — Simplify
- Auto-ID, timestamps, status defaults

### Service 2: Message store
**New file: `go/services/messages/AgentChatMessageService.go`**

- OrmService on `L8AgentChatMessage`
- No web endpoints (internal only)
- SLA config: primary keys `ConversationId` + `Sequence`
- Helper functions: `SaveMessage()`, `GetMessages(conversationId)` for Service 3

**New file: `go/services/messages/AgentChatMessageServiceCallback.go`**
- Set timestamp on POST

### Service 3: Chat facade
**File: `go/services/chat/AgentChatService.go`** — Rewrite

- Stateless `IServiceHandler` (keep current pattern)
- `ServiceName = "AgntChat"`
- Web endpoints:
  - `L8AgentChatConversation` POST → `L8AgentChatMessage` (send message, get LLM reply)
  - `L8Query` GET → `L8AgentChatConversationList` (list/query conversations with messages)
  - `L8Query` DELETE → `L8Empty` (delete conversation + its messages)

**File: `go/services/chat/handler.go`** — Rewrite

- `Post()`: handles the chat flow
  - First message (empty `conversation_id`): create conversation via Service 1, store user message via Service 2, call LLM, store response via Service 2
  - Subsequent message: store user message via Service 2, reconstruct history from Service 2, call LLM, store response via Service 2
  - Return the LLM's `L8AgentChatMessage`
- `Get()`: query conversations from Service 1, for each attach messages from Service 2, return `L8AgentChatConversationList`
- `Delete()`: delete messages via Service 2, then conversation via Service 1

**File: `go/services/chat/orchestrate.go`** — Update
- Remove `conversations` package dependency
- Accept messages list directly instead of loading from conversation object
- Return LLM response as `L8AgentChatMessage`

### Delete old files
- `go/services/chat/AgentChatServiceCallback.go` — not needed (stateless handler)

### Init
**File: `go/init.go`** — Update
- Activate Service 1 (conversations)
- Activate Service 2 (messages) — new
- Activate Service 3 (chat) — pass refs to Service 1 and 2
- Register new types (`L8AgentChatMessage`, `L8AgentChatConversation`)

## UI Changes (l8erp)

**File: `go/erp/ui/web/aia/aia-config.js`**
```javascript
// Change model from L8AgentChatRequest to L8AgentChatConversation
{ key: 'chat', label: 'Chat', icon: '💬', endpoint: '/120/AgntChat', model: 'L8AgentChatConversation' }
// Remove conversations service (no longer exposed)
// Keep prompts service unchanged
```

**File: `go/erp/ui/web/aia/agent/agent-chat-init.js`**
- Single endpoint for everything: `/120/AgntChat`

**File: `go/erp/ui/web/l8ui/l8agent/l8agent-chat.js`**
- Conversation picker queries GET `/120/AgntChat` → returns conversations with messages
- POST sends `L8AgentChatConversation` with new message, gets back `L8AgentChatMessage` (LLM reply)
- Selecting a past conversation loads its messages into the chat panel

**Mobile files** — Same changes as desktop equivalents.

**File: `go/erp/ui/main.go`** — Update `registerAiaTypes`
- Register `L8AgentChatMessage`, `L8AgentChatConversation` and their list types
- Remove old `L8AgentChatRequest`/`L8AgentChatResponse` registrations

## Files Summary

### Proto
| File | Action |
|------|--------|
| `proto/l8agent.proto` | Restructure: split messages out, add facade model, remove old transient types |

### l8agent (backend)
| File | Action |
|------|--------|
| `go/services/conversations/AgentConversationService.go` | Simplify — remove web endpoints, keep as internal OrmService |
| `go/services/conversations/AgentConversationServiceCallback.go` | Simplify |
| `go/services/messages/AgentChatMessageService.go` | New — internal OrmService for messages |
| `go/services/messages/AgentChatMessageServiceCallback.go` | New — timestamp callback |
| `go/services/chat/AgentChatService.go` | Rewrite — facade with web endpoints |
| `go/services/chat/handler.go` | Rewrite — Post/Get/Delete using Service 1 + 2 |
| `go/services/chat/orchestrate.go` | Update — accept message list, return L8AgentChatMessage |
| `go/services/chat/AgentChatServiceCallback.go` | Delete |
| `go/init.go` | Update — activate all 3 services, register new types |

### l8erp (UI)
| File | Action |
|------|--------|
| `go/erp/ui/web/aia/aia-config.js` | Change model, remove conversations service |
| `go/erp/ui/web/aia/agent/agent-chat-init.js` | Single endpoint |
| `go/erp/ui/web/l8ui/l8agent/l8agent-chat.js` | Conversation picker + updated endpoints |
| `go/erp/ui/web/l8ui/l8agent/m/l8agent-chat-m.js` | Same for mobile |
| `go/erp/ui/web/m/js/aia/agent-chat-init.js` | Update endpoint |
| `go/erp/ui/main.go` | Register new types |

## Verification

1. Run `cd proto && ./make-bindings.sh` — regenerate proto bindings
2. Build l8agent: `go build ./...`
3. Start system via `run-local.sh`
4. Navigate to AIA → Chat: GET returns conversation list (facade model with messages)
5. Send first message: creates conversation + message, LLM responds, response stored
6. Send follow-up: appends to existing conversation, LLM has full history context
7. Conversation picker: browse past conversations, select one to continue
8. AIA → Prompts: still works (unchanged)
