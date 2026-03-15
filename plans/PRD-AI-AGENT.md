# PRD: AI Agent for the Layer 8 Ecosystem

**Status:** Draft — Awaiting Approval
**Date:** 2026-03-13
**Scope:** Two deliverables — `l8agent` (shared library) + L8ERP integration (first consumer)

---

## 1. Overview

### 1.1 Problem Statement

Layer 8 ecosystem projects (L8ERP, L8Bugs, L8ID, and future projects) share a common architecture: protobuf-defined models, L8Query, service endpoints with bearer token auth, and `l8reflect` introspection. Users of these systems must navigate complex module hierarchies, construct queries manually, and perform multi-step workflows. A conversational AI agent would dramatically simplify these interactions — and because the underlying architecture is shared, the agent infrastructure should be shared too.

### 1.2 Solution

**Two deliverables:**

1. **`l8agent`** — A new Layer 8 ecosystem shared library that provides the complete AI agent infrastructure: LLM client, data masking proxy, tool executor, schema provider, chat orchestration service, conversation/prompt CRUD services, and chat UI components (desktop + mobile). Any Layer 8 project can add an AI agent by importing this library and providing minimal configuration.

2. **L8ERP AIA module** — The first consumer of `l8agent`. A thin integration layer (~50 lines of config) that wires the shared agent into L8ERP with service area 120, ERP-specific prompt templates, and optional masking overrides.

### 1.3 Design Principles

- **Shared-first** — All agent logic lives in `l8agent`. Project-specific code is configuration only.
- **No new data paths** — The agent calls existing service endpoints via L8Query. It never bypasses the service layer or accesses the database directly.
- **Sensitive data never leaves the network** — A Data Masking Proxy intercepts all tool call results before they reach the LLM. Sensitive field values (PII, financial data) are replaced with opaque tokens. The LLM reasons about structure and relationships using masked data. Tokens are restored in the final response before it reaches the user.
- **Security-first** — The agent inherits the user's bearer token and permissions. It cannot do anything the user cannot do.
- **Prime Object rules apply** — The agent's own entities (conversations, prompts) follow Prime Object conventions. Agent entities that don't pass the Prime Object test are embedded as repeated fields.
- **Configuration-driven UI** — The agent's UI follows L8UI patterns: config, enums, columns, forms, init via `Layer8DModuleFactory.create()`.
- **L8Query aggregation for analytics** — Aggregation queries (`count`, `sum`, `avg`, `min`, `max`, `group by`) are handled server-side by L8Query in the `l8ql` project. The LLM receives only aggregate results, never individual records with sensitive values.

---

## 2. Architecture

### 2.1 Library vs Consumer Split

```
┌─────────────────────────────────────────────────────────┐
│                    l8agent (shared library)              │
│                                                         │
│  Go:                          JS/CSS:                   │
│  ├── llm/client.go            ├── l8agent-chat.js       │
│  ├── masking/proxy.go         ├── l8agent-chat.css      │
│  ├── masking/config.go        ├── l8agent-chat-m.js     │
│  ├── masking/tokenmap.go      └── l8agent-chat-m.css    │
│  ├── executor/tool_executor.go                          │
│  ├── schema/provider.go                                 │
│  ├── tools/definitions.go                               │
│  └── services/                                          │
│      ├── chat/AgentChatService.go                       │
│      ├── conversations/AgentConversationService.go      │
│      └── prompts/AgentPromptService.go                  │
│                                                         │
│  Proto:                                                 │
│  └── l8agent.proto (types, enums, request/response)     │
└────────────────────────┬────────────────────────────────┘
                         │ imports
┌────────────────────────▼────────────────────────────────┐
│              L8ERP (first consumer)                      │
│                                                         │
│  Go:                          JS:                       │
│  ├── erp/aia/                 ├── aia/aia-config.js     │
│  │   ├── activate.go          ├── aia/aia-init.js       │
│  │   └── masking_overrides.go ├── aia/agent-enums.js    │
│  └── erp/ui/shared.go        └── aia/agent-forms.js    │
│      (registerAiaTypes)                                 │
│                                                         │
│  Config only: service area, prompt templates,           │
│  section HTML, nav config, mock data                    │
└─────────────────────────────────────────────────────────┘

Future consumers (same thin integration):
  L8Bugs → service area X, bug-tracking prompts
  L8ID   → service area Y, identity management prompts
```

### 2.2 What Lives Where

| Component | `l8agent` (shared) | Consumer (e.g., L8ERP) |
|-----------|:---:|:---:|
| LLM Client (Claude API HTTP client) | Yes | |
| Data Masking Proxy (mask/unmask sensitive fields) | Yes | |
| Field classification from protobuf introspection | Yes | |
| Token Map (per-request masking state) | Yes | |
| Tool Executor (internal HTTP calls to services) | Yes | |
| Schema Provider (tier 1 + tier 2 from introspector) | Yes | |
| LLM tool definitions (l8query, create, update, delete, etc.) | Yes | |
| AgentChat orchestration service | Yes | |
| AgentConversation CRUD service | Yes | |
| AgentPrompt CRUD service | Yes | |
| Protobuf types (AgentConversation, AgentPrompt, etc.) | Yes | |
| Chat UI component — desktop (`l8agent-chat.js`) | Yes | |
| Chat UI component — mobile (`l8agent-chat-m.js`) | Yes | |
| Chat CSS — desktop + mobile | Yes | |
| Service activation (service area, registration) | | Yes |
| UI type registration | | Yes |
| Module config (`aia-config.js`) | | Yes |
| Module init (`aia-init.js`) | | Yes |
| Section HTML | | Yes |
| Nav config entries | | Yes |
| Built-in prompt templates (Financial Analyst, etc.) | | Yes |
| Masking config overrides for project-specific fields | | Yes (optional) |
| Mock data generators | | Yes |

### 2.3 High-Level Flow

```
User (natural language)
    → Frontend (l8agent Chat UI)
        → POST /{prefix}/{area}/AgntChat  (user message)
            → AgentChatServiceCallback.After()
                → Build context (system prompt + schema metadata)
                → Call Claude API (LLM)
                → LLM returns tool_use calls (L8Query, CRUD operations)
                → Tool Executor runs calls against local services
                → Data Masking Proxy masks sensitive fields in results
                → Masked results fed back to LLM
                → Loop until LLM returns final text response
                → Unmasking Proxy restores real values in final response
            → Return unmasked response + any data results to user
        → Frontend renders response (text + optional data tables/charts)
```

The flow is identical for every Layer 8 project — only the `{prefix}` and `{area}` change.

### 2.4 How the Agent Calls Services

The agent does NOT import or call service code directly. It uses the same HTTP interface the UI uses:

1. LLM returns a tool call: `{ "tool": "l8query", "input": { "query": "select * from Employee where departmentId=D001", "area": 30, "service": "Employee" } }`
2. The Tool Executor constructs an internal HTTP request to `/{prefix}/{area}/{service}?body=<encoded L8Query>`
3. The request carries the user's bearer token — same auth as if the user made the call from the UI
4. The response comes back with real data
5. **The Data Masking Proxy replaces sensitive values with tokens** (e.g., SSN `123-45-6789` → `[SSN_1]`, salary `8500000` → `[MONEY_1]`)
6. The masked response is fed to the LLM — **sensitive data never leaves the network**
7. The LLM reasons about structure using tokens, responds with tokens in place
8. **The Unmasking Proxy restores real values** in the final response before returning to the user

This means:
- The agent respects all existing service callbacks (validation, authorization)
- No new data access paths are introduced
- Any service the user can access via the UI, the agent can access via the same endpoint
- **The Claude API never sees real PII, financial data, or other sensitive values**

### 2.5 Data Masking Proxy

The Data Masking Proxy sits between the Tool Executor and the LLM. It uses the project's protobuf schema (available via `l8reflect` introspector in every Layer 8 project) to classify every field by sensitivity level.

#### 2.5.1 Field Sensitivity Classification

Since every Layer 8 project's model is fully known from protobuf definitions, every field can be pre-classified:

| Sensitivity | Field Types | Masking Action | Example |
|-------------|-------------|----------------|---------|
| **Always mask** | SSN, tax IDs, bank accounts, routing numbers | Replace with `[MASKED]` | `ssn: "123-45-6789"` → `ssn: "[MASKED]"` |
| **Mask with token** | Names, addresses, phone, email | Replace with indexed token | `firstName: "John"` → `firstName: "[NAME_1]"` |
| **Mask amounts** | Salary, invoice totals, payments, prices | Replace with indexed token | `salary: 8500000` → `salary: "[MONEY_1]"` |
| **Never mask** | IDs, enums, statuses, dates, counts, booleans, codes | Pass through | `departmentId: "D-001"` → unchanged |

#### 2.5.2 Classification Rules

Fields are classified automatically based on protobuf field type and name patterns:

```go
type FieldClassification struct {
    AlwaysMask   []string  // Field name patterns: "ssn", "nationalId", "bankAccount",
                           // "routingNumber", "taxId", "ein"
    MaskAsName   []string  // "firstName", "lastName", "name", "address", "email",
                           // "phone", "street", "city", "zip"
    MaskAsMoney  []string  // Fields with type *erp.Money, or name contains "salary",
                           // "amount", "price", "cost", "payment", "balance"
    NeverMask    []string  // "Id", enum fields, "status", "type", "code", "date",
                           // "createdAt", "updatedAt", booleans, int32 enums
}
```

These defaults cover most fields across any Layer 8 project. Projects can register overrides for edge cases via a configuration callback:

```go
// In l8agent — override hook
type MaskingOverrides func(modelName string, fieldName string) *string  // nil = use default

// In L8ERP — project-specific override
l8agent.RegisterMaskingOverrides(func(model, field string) *string {
    if model == "ScmItem" && field == "description" {
        neverMask := "never"
        return &neverMask  // Item descriptions are not sensitive
    }
    return nil  // Use default classification
})
```

#### 2.5.3 Token Map

Each chat request maintains a per-request token map:

```go
type TokenMap struct {
    tokens map[string]interface{}  // "[NAME_1]" → "John", "[MONEY_3]" → 8500000
    counters map[string]int        // "NAME" → 4, "MONEY" → 3 (next index)
}

func (m *TokenMap) Mask(fieldName string, value interface{}, classification string) string
func (m *TokenMap) Unmask(text string) string  // Replaces all tokens with real values
```

The token map lives only in server memory for the duration of the request. It is never sent to the LLM or stored.

#### 2.5.4 Masking Flow Example

```
User: "What is John Smith's salary?"

1. LLM constructs: l8query "select * from Employee where lastName=Smith"
   (user's input is NOT masked — it's the user's own words)

2. Tool Executor runs query against /erp/30/Employee, gets:
   { firstName: "John", lastName: "Smith", ssn: "123-45-6789",
     salary: {amount: 8500000, currencyCode: "USD"}, departmentId: "D-001",
     status: 1 }

3. Data Masking Proxy masks sensitive fields:
   { firstName: "[NAME_1]", lastName: "[NAME_2]", ssn: "[MASKED]",
     salary: "[MONEY_1]", departmentId: "D-001", status: 1 }
   Token map: { "[NAME_1]": "John", "[NAME_2]": "Smith", "[MONEY_1]": "$85,000.00" }

4. LLM sees masked data, responds:
   "[NAME_2], [NAME_1]'s salary is [MONEY_1]"

5. Unmasking Proxy restores values:
   "Smith, John's salary is $85,000.00"

6. User sees the real response. Claude API never saw "John", "Smith", or "$85,000".
```

#### 2.5.5 Aggregation Queries Bypass Masking

When the LLM uses L8Query aggregation functions (`count`, `sum`, `avg`, `min`, `max` with `group by`), the query is executed server-side by L8Query. The result contains only aggregate values — no individual records. Aggregate results are **not masked** because:

- They don't contain PII (no individual names, SSNs, etc.)
- The LLM needs actual numbers to reason about trends and comparisons
- Aggregate values are inherently anonymized

Example:
```
LLM: l8query "select departmentId, count(*), avg(salary) from Employee group by departmentId"

Result (NOT masked — aggregate data):
{ departmentId: "D-001", count: 45, avgSalary: 7500000 }
{ departmentId: "D-002", count: 32, avgSalary: 6800000 }
```

### 2.6 L8Query Aggregation Support (l8ql Project)

To support the agent's analytics use cases without exposing individual records, L8Query needs server-side aggregation. This is implemented in the `l8ql` project (not l8agent or l8erp), extending the existing query language.

#### 2.6.1 New L8Query Syntax

```sql
-- Count
select count(*) from Employee

-- Aggregation with group by
select departmentId, count(*), sum(salary) from Employee group by departmentId

-- Multiple aggregations
select status, count(*), avg(salary), min(salary), max(salary) from Employee group by status

-- Aggregation with WHERE
select vendorId, sum(amount) from PurchaseInvoice where status=2 group by vendorId

-- Aggregation with HAVING (filter on aggregate results)
select departmentId, count(*) from Employee group by departmentId having count > 10
```

#### 2.6.2 Supported Aggregation Functions

| Function | Description | Applicable Types |
|----------|-------------|------------------|
| `count(*)` | Count records | All |
| `count(field)` | Count non-null values | All |
| `sum(field)` | Sum of values | Numeric, Money |
| `avg(field)` | Average of values | Numeric, Money |
| `min(field)` | Minimum value | Numeric, Money, Date |
| `max(field)` | Maximum value | Numeric, Money, Date |

#### 2.6.3 Detailed l8ql Implementation Plan

This section details exactly how aggregation is added to the existing l8ql codebase at `../l8ql/`.

##### l8ql Current Architecture

The l8ql project has a two-layer design:

**Parser** (`go/gsql/parser/`) — converts L8QL strings to `l8api.L8Query` protobuf:
- `Query.go` — Entry point. Keywords defined as constants (`Select`, `From`, `Where`, etc.) in a `words` array. `split()` method extracts each clause using string boundary detection via `getTag()`. `init()` method populates the `L8Query` protobuf struct.
- `Expression.go` — Parses WHERE clause into `L8Expression` tree with nested bracket support.
- `Condition.go` — Parses AND/OR chains into `L8Condition` linked lists.
- `Comparator.go` — Parses individual comparisons (`field=value`) into `L8Comparator`.

**Interpreter** (`go/gsql/interpreter/`) — executes parsed queries against data:
- `Query.go` — Resolves property references via `l8reflect` introspector. `Match()` evaluates WHERE clause against objects. `Filter()` applies WHERE to a list. `SortByValue()` extracts sort keys.
- `Expression.go`, `Condition.go`, `Comparator.go` — Interpreted wrappers that evaluate parsed trees against live objects.
- `comparators/` — 8 comparison implementations (Equal, NotEqual, GreaterThan, etc.)

**Tests** (`go/tests/`):
- `Parser_test.go`, `Interpreter_test.go`, `TestSpecialCase_test.go`

##### L8Query Protobuf (l8types project)

The `L8Query` struct (in `l8types/go/types/l8api/api.pb.go`) currently has 11 fields:
```
Text, RootType, Properties, Criteria, SortBy, Descending, Limit, Page, MatchCase, Schema, MapReduce
```

New fields needed on the `L8Query` protobuf for aggregation metadata:

```protobuf
// In l8types proto/api.proto — add to existing L8Query message:
repeated string group_by = 12;            // Group-by field names
L8Expression having = 13;                 // HAVING clause (reuses L8Expression)
repeated L8AggregateFunction aggregates = 14;  // Parsed aggregate functions

// New message:
message L8AggregateFunction {
  string function = 1;  // "count", "sum", "avg", "min", "max"
  string field = 2;     // Field name ("*" for count(*))
  string alias = 3;     // Display alias (e.g., "count", "sumSalary")
}
```

##### Changes to l8ql Parser

**File: `parser/Query.go`** — 5 changes:

1. **Add keyword constants** (lines 68-79):
   ```go
   GroupBy  = "group-by"  // GROUP-BY clause keyword
   Having  = "having"     // HAVING clause keyword
   ```

2. **Add to `words` array** (line 82):
   ```go
   var words = []string{Select, From, Where, SortBy, Descending, Ascending, Limit, Page, MatchCase, MapReduce, GroupBy, Having}
   ```

3. **Add fields to `parsed` struct** (lines 54-65):
   ```go
   groupby_ string
   having_  string
   ```

4. **Extract new clauses in `split()` method** (lines 123-137):
   ```go
   data.groupby_ = getTag(sql, this.pquery.Text, GroupBy)
   data.having_ = getTag(sql, this.pquery.Text, Having)
   ```

5. **Process in `init()` method** (lines 178-224):
   - Parse `groupby_` into `this.pquery.GroupBy` (split by comma, trim each)
   - Detect aggregate functions in `Properties` — scan each SELECT column for patterns like `count(*)`, `sum(field)`, etc. Extract into `this.pquery.Aggregates` as `L8AggregateFunction` objects. Non-aggregate SELECT columns remain in `Properties`.
   - Parse `having_` into `this.pquery.Having` using existing `parseExpression()`

**New file: `parser/Aggregate.go`** (~80 lines):
- `parseAggregateFunction(col string) (*l8api.L8AggregateFunction, bool)` — Detects if a SELECT column is an aggregate function call. Regex: `^(count|sum|avg|min|max)\((.+)\)$`. Returns the parsed function and true, or nil and false for non-aggregate columns.
- `isAggregateQuery(properties []string) bool` — Returns true if any property is an aggregate function.

##### Changes to l8ql Interpreter

**File: `interpreter/Query.go`** — 4 changes:

1. **Add fields to `Query` struct** (lines 43-56):
   ```go
   groupBy         []string                    // Group-by field names
   groupByProps    []*properties.Property       // Resolved group-by properties
   aggregates      []*l8api.L8AggregateFunction // Parsed aggregate functions
   aggregateProps  map[string]*properties.Property // Field -> property for aggregated fields
   having          *Expression                  // HAVING clause expression
   isAggregate     bool                         // True if query has aggregate functions
   ```

2. **Initialize in `NewFromQuery()`** (lines 61-103):
   - Copy `query.GroupBy` into `iQuery.groupBy`
   - Resolve each group-by field to a property via `properties.PropertyOf()`
   - Copy `query.Aggregates` into `iQuery.aggregates`
   - Resolve each aggregate field to a property (except `count(*)`)
   - Set `iQuery.isAggregate = len(query.Aggregates) > 0`
   - Parse `query.Having` into `iQuery.having` (reuse `CreateExpression`)

3. **New method: `Aggregate(list []interface{}) []map[string]interface{}`** (~80 lines):
   - Groups filtered objects by group-by field values
   - For each group, computes each aggregate function:
     - `count(*)` — len(group)
     - `count(field)` — count non-nil values
     - `sum(field)` — accumulate numeric/money values
     - `avg(field)` — sum / count
     - `min(field)` / `max(field)` — track extremes
   - Returns array of result maps: `{ groupField: value, aggAlias: result, ... }`
   - If HAVING clause exists, filter result maps through it

4. **New method: `IsAggregate() bool`** — returns `this.isAggregate`

**New file: `interpreter/Accumulator.go`** (~100 lines):
- `type Accumulator struct` — Tracks running state for an aggregate function (count, sum, min, max)
- `func NewAccumulator(fn string) *Accumulator`
- `func (a *Accumulator) Add(value interface{})` — Adds a value (handles int32, int64, float64, `*erp.Money`)
- `func (a *Accumulator) Result() interface{}` — Returns final computed value (for avg: sum/count)

##### Changes to l8types Proto

**File: `l8types/proto/api.proto`**:
- Add `L8AggregateFunction` message
- Add `group_by`, `having`, `aggregates` fields to `L8Query`
- Regenerate bindings via `make-bindings.sh`

##### Test Additions

**File: `go/tests/Aggregate_test.go`** (~150 lines):
- Test parsing of aggregate functions in SELECT clause
- Test `group by` clause parsing
- Test `having` clause parsing
- Test aggregate execution: count, sum, avg, min, max
- Test aggregate with WHERE + group by
- Test aggregate with HAVING filter
- Test non-aggregate queries still work unchanged (regression)

##### Execution Flow

```
Query String → Parser (split, detect aggregates) → L8Query Protobuf
                                                        ↓
Interpreter ← NewFromQuery (resolve group-by props, aggregate props)
    ↓
Data → Filter(list) → WHERE filtering → filtered list
    ↓
    isAggregate?
    ├── No  → return filtered list (existing behavior, unchanged)
    └── Yes → Aggregate(filtered list) → group → accumulate → HAVING filter → result maps
```

#### 2.6.4 Why This Matters for the Agent

Without aggregation, the agent's analytics flow would be:
1. LLM requests `select * from Employee` (all records)
2. All records come back with masked sensitive fields
3. LLM tries to count/sum masked `[MONEY_1]`, `[MONEY_2]`... — **impossible**

With aggregation:
1. LLM requests `select departmentId, count(*), avg(salary) from Employee group by departmentId`
2. Server computes aggregates — result has no individual PII
3. LLM receives actual numbers, provides accurate analysis
4. **No masking needed** — aggregate results are inherently anonymized

### 2.7 LLM Tools Provided to the Agent

| Tool Name | Description | Maps To |
|-----------|-------------|---------|
| `l8query` | Execute an L8Query (including aggregations) against any service | GET `/{prefix}/{area}/{service}?body=...` |
| `create_record` | Create a new entity | POST `/{prefix}/{area}/{service}` |
| `update_record` | Update an existing entity | PUT `/{prefix}/{area}/{service}` |
| `delete_record` | Delete an entity | DELETE `/{prefix}/{area}/{service}` |
| `list_modules` | List available modules and services | Static metadata from schema provider |
| `describe_model` | Get field definitions for a model | Static metadata from introspector |

All tools are generic — they work with any Layer 8 project's services. The `{prefix}` is provided by the consumer at initialization.

### 2.8 Schema Provider

The Schema Provider generates a compressed representation of the project's schema for the LLM system prompt. It uses the existing introspector (`l8reflect`, available in every Layer 8 project) to enumerate:

- All registered model types and their fields (name, type, required)
- All active services (ServiceName, ServiceArea, primary key)
- Enum definitions (field → value map)
- Cross-module reference relationships (which fields reference which models)

This metadata is cached at startup and refreshed when services are activated. It enables the LLM to construct valid L8Query strings and understand the data model without hardcoding.

**Size management:** Large projects (e.g., L8ERP with 300+ models) would exceed context limits. The Schema Provider uses a two-tier approach:
1. **Tier 1 (always included):** Module list, service names/areas, model names, primary keys (~2KB)
2. **Tier 2 (on-demand):** Full field definitions for specific models, loaded when the LLM calls `describe_model`

Smaller projects (L8Bugs, L8ID) may fit entirely in Tier 1.

---

## 3. l8agent — Shared Library

### 3.1 Repository Structure

```
l8agent/
├── proto/
│   └── l8agent.proto              # Protobuf types, enums, request/response
├── go/
│   ├── go.mod
│   ├── go.sum
│   ├── vendor/
│   ├── types/
│   │   └── l8agent/               # Generated .pb.go files
│   ├── llm/
│   │   └── client.go              # Claude API HTTP client
│   ├── masking/
│   │   ├── proxy.go               # Data Masking Proxy — mask/unmask orchestration
│   │   ├── config.go              # Field classification from introspector
│   │   ├── tokenmap.go            # Per-request token map
│   │   └── overrides.go           # Override registration hook
│   ├── executor/
│   │   └── tool_executor.go       # Executes tool calls against L8 service endpoints
│   ├── schema/
│   │   └── provider.go            # Schema Provider (tier 1 + tier 2 from introspector)
│   ├── tools/
│   │   └── definitions.go         # LLM tool definitions (l8query, create, update, etc.)
│   └── services/
│       ├── chat/
│       │   ├── AgentChatService.go
│       │   └── AgentChatServiceCallback.go
│       ├── conversations/
│       │   ├── AgentConversationService.go
│       │   └── AgentConversationServiceCallback.go
│       └── prompts/
│           ├── AgentPromptService.go
│           └── AgentPromptServiceCallback.go
├── js/
│   ├── l8agent-chat.js            # Desktop chat UI component
│   ├── l8agent-chat.css           # Desktop chat styles
│   ├── l8agent-enums.js           # Conversation/prompt enums
│   ├── l8agent-columns.js         # Column definitions for conversations/prompts
│   ├── l8agent-forms.js           # Form definitions for prompts
│   └── m/
│       ├── l8agent-chat-m.js      # Mobile chat UI component
│       └── l8agent-chat-m.css     # Mobile chat styles
└── README.md
```

### 3.2 Protobuf Definitions

**File:** `l8agent/proto/l8agent.proto`

```protobuf
syntax = "proto3";
package l8agent;
option go_package = "github.com/saichler/l8agent/go/types/l8agent";

import "l8api.proto";

// AgentConversation - Prime Object
// Passes Prime Object test: independent lifecycle, queried directly,
// meaningful on its own (conversation history)
message L8AgentConversation {
    string conversation_id = 1;
    string user_id = 2;
    string title = 3;
    int32 status = 4;                    // L8_AGENT_CONVO_STATUS enum
    repeated L8AgentMessage messages = 5;  // Embedded child - not independent
    int64 created_at = 6;
    int64 updated_at = 7;
}

// L8AgentMessage - Embedded child (NOT a Prime Object)
// Fails Prime Object test: meaningless without a conversation,
// always created/viewed within conversation context
message L8AgentMessage {
    string message_id = 1;
    int32 role = 2;                      // L8_AGENT_MESSAGE_ROLE enum
    string content = 3;
    repeated L8AgentToolCall tool_calls = 4;
    repeated L8AgentToolResult tool_results = 5;
    int64 timestamp = 6;
    int32 token_count = 7;
}

// L8AgentToolCall - Embedded child within L8AgentMessage
message L8AgentToolCall {
    string tool_call_id = 1;
    string tool_name = 2;
    string tool_input = 3;               // JSON string
}

// L8AgentToolResult - Embedded child within L8AgentMessage
message L8AgentToolResult {
    string tool_call_id = 1;
    string result = 2;                   // JSON string
    bool is_error = 3;
}

// L8AgentPrompt - Prime Object
// Passes Prime Object test: independent lifecycle, queried across all users,
// reusable templates not tied to a single conversation
message L8AgentPrompt {
    string prompt_id = 1;
    string name = 2;
    string description = 3;
    string system_prompt = 4;            // The prompt template text
    int32 category = 5;                  // L8_AGENT_PROMPT_CATEGORY enum
    int32 status = 6;                    // L8_AGENT_PROMPT_STATUS enum
    repeated string allowed_modules = 7; // Module keys the prompt can access
    string created_by = 8;
}

// L8AgentChatRequest - NOT a Prime Object, not stored
// Transient request payload for the chat endpoint
message L8AgentChatRequest {
    string conversation_id = 1;          // Empty = new conversation
    string message = 2;                  // User's message
    string prompt_id = 3;               // Optional: use a specific prompt template
    repeated string allowed_modules = 4; // Optional: restrict modules for this request
}

// L8AgentChatResponse - NOT a Prime Object, not stored
// Transient response payload
message L8AgentChatResponse {
    string conversation_id = 1;
    string response = 2;                 // Agent's text response
    repeated L8AgentDataResult data_results = 3;
    int32 tool_calls_made = 4;
    int32 total_tokens = 5;
}

// L8AgentDataResult - Embedded in L8AgentChatResponse
message L8AgentDataResult {
    string model_name = 1;
    string query = 2;
    string data_json = 3;               // JSON array of results
    int32 total_count = 4;
}

// List types
message L8AgentConversationList {
    repeated L8AgentConversation list = 1;
    l8api.L8MetaData metadata = 2;
}

message L8AgentPromptList {
    repeated L8AgentPrompt list = 1;
    l8api.L8MetaData metadata = 2;
}

// Enums
enum L8AgentConvoStatus {
    L8_AGENT_CONVO_STATUS_UNSPECIFIED = 0;
    L8_AGENT_CONVO_STATUS_ACTIVE = 1;
    L8_AGENT_CONVO_STATUS_ARCHIVED = 2;
}

enum L8AgentMessageRole {
    L8_AGENT_MESSAGE_ROLE_UNSPECIFIED = 0;
    L8_AGENT_MESSAGE_ROLE_USER = 1;
    L8_AGENT_MESSAGE_ROLE_ASSISTANT = 2;
    L8_AGENT_MESSAGE_ROLE_SYSTEM = 3;
}

enum L8AgentPromptCategory {
    L8_AGENT_PROMPT_CATEGORY_UNSPECIFIED = 0;
    L8_AGENT_PROMPT_CATEGORY_GENERAL = 1;
    L8_AGENT_PROMPT_CATEGORY_REPORTING = 2;
    L8_AGENT_PROMPT_CATEGORY_WORKFLOW = 3;
    L8_AGENT_PROMPT_CATEGORY_ANALYSIS = 4;
}

enum L8AgentPromptStatus {
    L8_AGENT_PROMPT_STATUS_UNSPECIFIED = 0;
    L8_AGENT_PROMPT_STATUS_ACTIVE = 1;
    L8_AGENT_PROMPT_STATUS_INACTIVE = 2;
}
```

### 3.3 Proto Design Notes

- All types prefixed with `L8Agent` to avoid namespace collisions when imported into consumer projects
- No dependency on `erp-common.proto` — the library is project-agnostic (no `erp.AuditInfo`, `erp.Money`)
- `L8AgentMessage`, `L8AgentToolCall`, `L8AgentToolResult` are embedded children — they fail the Prime Object test
- `L8AgentChatRequest` and `L8AgentChatResponse` are transient — request/response payloads, not stored
- List types follow `repeated X list = 1; L8MetaData metadata = 2;` convention
- All enums have `_UNSPECIFIED = 0` zero values

### 3.4 Go Services

#### 3.4.1 AgentChat Service (Core)

The orchestration service. Does NOT store data — it coordinates the conversation:

**POST flow (`AgentChatServiceCallback.After`):**
1. Extract `L8AgentChatRequest` from request body
2. Load or create `L8AgentConversation` (via AgentConvo service)
3. Create a fresh `TokenMap` for this request (lives only in memory)
4. Build system prompt:
   - Load base system prompt (built-in or from L8AgentPrompt if `prompt_id` specified)
   - Append Tier 1 schema metadata (module list, service names)
   - Append conversation history (last N messages for context)
5. Call Claude API with messages + tool definitions
6. **Tool loop:**
   - If LLM returns `tool_use`, execute each tool call via Tool Executor
   - **Mask sensitive fields** in tool results using the Data Masking Proxy + TokenMap
   - Feed **masked** tool results back to LLM
   - Repeat until LLM returns a text response (max 10 iterations)
7. **Unmask** the LLM's final text response — replace tokens with real values from TokenMap
8. Save updated conversation (via AgentConvo service) — conversation stores **unmasked** data
9. Return `L8AgentChatResponse` with unmasked text + any data results

#### 3.4.2 Initialization API

Consumer projects initialize the agent with a single call:

```go
// In l8agent — initialization function
func Initialize(config AgentConfig) error

type AgentConfig struct {
    Resources       ifs.IResources    // Project's resources (has introspector, registry)
    Prefix          string            // API prefix (e.g., "/erp/", "/bugs/", "/l8id/")
    ServiceArea     byte              // Service area for agent services (e.g., 120)
    MaskingOverrides MaskingOverrides  // Optional: project-specific field overrides
    DefaultPrompts  []L8AgentPrompt   // Optional: built-in prompt templates
}
```

This registers the three services (AgentChat, AgentConvo, AgentPrompt), initializes the Schema Provider from the introspector, and sets up the masking configuration.

### 3.5 LLM Client (`llm/client.go`)

```go
type LLMClient struct {
    apiKey     string
    apiURL     string    // https://api.anthropic.com/v1/messages
    model      string    // claude-sonnet-4-6
    maxTokens  int       // 4096
}

func (c *LLMClient) SendMessage(systemPrompt string, messages []Message, tools []Tool) (*Response, error)
```

- API key loaded from environment variable `ANTHROPIC_API_KEY`
- Model configurable via environment variable `ANTHROPIC_MODEL` (default: `claude-sonnet-4-6`)
- Uses standard `net/http` — no SDK dependency needed
- Timeout: 60 seconds per request

### 3.6 Tool Executor (`executor/tool_executor.go`)

```go
type ToolExecutor struct {
    prefix     string    // e.g., "/erp/"
    resources  ifs.IResources
}

func NewToolExecutor(prefix string, resources ifs.IResources) *ToolExecutor
func (t *ToolExecutor) Execute(toolName string, input string, bearerToken string) (string, error)
```

- Uses the user's bearer token for all requests — same auth as UI
- Constructs L8Query strings from LLM tool inputs
- The `prefix` is provided by the consumer project
- Rate-limited: max 10 tool calls per chat request
- Timeout: 10 seconds per tool call

### 3.7 Schema Provider (`schema/provider.go`)

```go
type SchemaProvider struct {
    tier1Cache string
    resources  ifs.IResources
}

func NewSchemaProvider(resources ifs.IResources) *SchemaProvider
func (s *SchemaProvider) GetTier1Schema() string
func (s *SchemaProvider) DescribeModel(modelName string) string
```

Uses the existing introspector (`l8reflect`) available in every Layer 8 project. Caches Tier 1 at startup.

### 3.8 Configuration

**Environment Variables (shared across all consumers):**

| Variable | Default | Description |
|----------|---------|-------------|
| `ANTHROPIC_API_KEY` | (required) | Claude API key |
| `ANTHROPIC_MODEL` | `claude-sonnet-4-6` | Model to use |
| `L8AGENT_MAX_TOOL_CALLS` | `10` | Max tool calls per request |
| `L8AGENT_MAX_HISTORY` | `20` | Max messages to include as context |
| `L8AGENT_ENABLED` | `true` | Feature flag to disable agent |

### 3.9 Chat UI Components

#### 3.9.1 Desktop (`l8agent-chat.js`)

Global object: `window.L8AgentChat`

```js
L8AgentChat.init({
    containerId: 'agent-chat-container',  // DOM container ID
    chatEndpoint: '/erp/120/AgntChat',    // Project-specific endpoint
    convoEndpoint: '/erp/120/AgntConvo',  // Conversation CRUD endpoint
    promptEndpoint: '/erp/120/AgntPrmpt'  // Prompt CRUD endpoint
});

L8AgentChat.sendMessage(text)              // Send message, render response
L8AgentChat.loadConversation(id)           // Load existing conversation
L8AgentChat.newConversation()              // Start new conversation
```

- Messages rendered as chat bubbles with user/assistant distinction
- Data results rendered as inline tables using `Layer8DTable` (read-only, client-side data)
- Conversation selector dropdown
- Loading indicator while waiting for LLM response
- All styles use `--layer8d-*` CSS custom properties (l8ui theming)

#### 3.9.2 Mobile (`l8agent-chat-m.js`)

Global object: `window.L8AgentChatMobile`

Same API as desktop, adapted for mobile using `Layer8MPopup` and `Layer8MTable`.

---

## 4. L8ERP Integration (First Consumer)

### 4.1 Service Area and ServiceNames

| Service | ServiceName | ServiceArea | Primary Key |
|---------|-------------|-------------|-------------|
| AgentChat | `AgntChat` | 120 | N/A (transient) |
| AgentConversation | `AgntConvo` | 120 | `conversationId` |
| AgentPrompt | `AgntPrmpt` | 120 | `promptId` |

**ServiceName constraint:** All names are ≤10 characters.
**ServiceArea:** 120 (next available after COMP=110).

### 4.2 ERP-Specific Files

```
go/erp/aia/
├── activate.go                # Service activation — calls l8agent.Initialize()
└── masking_overrides.go       # Optional ERP-specific field overrides

go/erp/ui/web/aia/
├── aia-config.js              # Module config (Layer8ModuleConfigFactory)
├── aia-section-config.js      # Section generator config
├── agent/
│   ├── agent-enums.js         # Enums (extends l8agent-enums.js with ERP prompt categories)
│   ├── agent-columns.js       # Column definitions (imports l8agent-columns.js)
│   ├── agent-forms.js         # Form definitions (imports l8agent-forms.js)
│   └── agent-chat-init.js     # Initializes L8AgentChat with ERP-specific endpoints
├── aia-init.js                # Module init (Layer8DModuleFactory.create)
└── aia.css                    # Module accent color only

go/erp/ui/web/sections/aia.html
go/erp/ui/web/m/js/aia/       # Mobile integration
```

### 4.3 Activation (`activate.go`)

```go
package aia

import (
    "github.com/saichler/l8agent/go"
    "github.com/saichler/l8agent/go/types/l8agent"
)

func Activate(resources ifs.IResources) {
    l8agent.Initialize(l8agent.AgentConfig{
        Resources:   resources,
        Prefix:      "/erp/",
        ServiceArea: 120,
        DefaultPrompts: []l8agent.L8AgentPrompt{
            {Name: "Financial Analyst", SystemPrompt: "...", Category: 2,
             AllowedModules: []string{"fin"}},
            {Name: "HR Manager", SystemPrompt: "...", Category: 2,
             AllowedModules: []string{"hcm"}},
            {Name: "Operations", SystemPrompt: "...", Category: 3,
             AllowedModules: []string{"scm", "mfg"}},
            {Name: "Executive Summary", SystemPrompt: "...", Category: 4},
        },
    })
}
```

### 4.4 Module Config (`aia-config.js`)

```javascript
(function() {
    'use strict';
    const svc = Layer8ModuleConfigFactory.service;
    const mod = Layer8ModuleConfigFactory.module;

    Layer8ModuleConfigFactory.create({
        namespace: 'Aia',
        modules: {
            'agent': mod('Agent', '<!-- agent icon -->', [
                svc('chat', 'Chat', '<!-- chat icon -->', '/120/AgntChat', 'L8AgentChatRequest'),
                svc('conversations', 'Conversations', '<!-- history icon -->', '/120/AgntConvo', 'L8AgentConversation'),
                svc('prompts', 'Prompts', '<!-- prompt icon -->', '/120/AgntPrmpt', 'L8AgentPrompt')
            ])
        },
        submodules: ['AiaAgent']
    });
})();
```

### 4.5 Module Init (`aia-init.js`)

```javascript
(function() {
    'use strict';
    Layer8DModuleFactory.create({
        namespace: 'Aia',
        defaultModule: 'agent',
        defaultService: 'chat',
        sectionSelector: 'agent',
        initializerName: 'initializeAia',
        requiredNamespaces: ['AiaAgent']
    });
})();
```

### 4.6 Section HTML

**File:** `go/erp/ui/web/sections/aia.html`

```html
<div class="section-container l8-section">
    <div class="page-header"><h1>AI Agent</h1></div>
    <div class="l8-module-tabs">
        <button class="l8-module-tab active" data-module="agent">
            <span class="tab-icon"><!-- agent icon --></span>
            <span class="tab-label">Agent</span>
        </button>
    </div>
    <div class="l8-module-content active" data-module="agent">
        <div class="l8-subnav">
            <a class="l8-subnav-item active" data-service="chat">Chat</a>
            <a class="l8-subnav-item" data-service="conversations">Conversations</a>
            <a class="l8-subnav-item" data-service="prompts">Prompts</a>
        </div>
        <div class="l8-service-view active" data-service="chat">
            <div id="agent-chat-container"></div>
        </div>
        <div class="l8-service-view" data-service="conversations">
            <div class="l8-table-container" id="agent-conversations-table-container"></div>
        </div>
        <div class="l8-service-view" data-service="prompts">
            <div class="l8-table-container" id="agent-prompts-table-container"></div>
        </div>
    </div>
</div>
```

### 4.7 Integration into `app.html`

```html
<!-- CSS -->
<link rel="stylesheet" href="l8ui/l8agent/l8agent-chat.css">
<link rel="stylesheet" href="aia/aia.css">

<!-- JS: l8agent shared components -->
<script src="l8ui/l8agent/l8agent-enums.js"></script>
<script src="l8ui/l8agent/l8agent-columns.js"></script>
<script src="l8ui/l8agent/l8agent-forms.js"></script>
<script src="l8ui/l8agent/l8agent-chat.js"></script>

<!-- JS: ERP-specific module data -->
<script src="aia/aia-config.js"></script>
<script src="aia/agent/agent-enums.js"></script>
<script src="aia/agent/agent-columns.js"></script>
<script src="aia/agent/agent-forms.js"></script>
<script src="aia/agent/agent-chat-init.js"></script>
<script src="aia/aia-init.js"></script>
```

### 4.8 Integration into `sections.js`

```javascript
const sections = { ..., aia: 'sections/aia.html' };
const sectionInitializers = { ..., aia: () => { if (typeof initializeAia === 'function') initializeAia(); } };
```

### 4.9 Mobile Nav Config

Add to `erp-ui/m/nav-configs/layer8m-nav-config-prj-other.js`:

```javascript
LAYER8M_NAV_CONFIG.aia = {
    subModules: [
        { key: 'agent', label: 'Agent', icon: 'agent' }
    ],
    services: {
        'agent': [
            { key: 'chat', label: 'Chat', icon: 'agent',
              endpoint: '/120/AgntChat', model: 'L8AgentChatRequest', idField: 'conversationId' },
            { key: 'conversations', label: 'Conversations', icon: 'history',
              endpoint: '/120/AgntConvo', model: 'L8AgentConversation', idField: 'conversationId' },
            { key: 'prompts', label: 'Prompts', icon: 'settings',
              endpoint: '/120/AgntPrmpt', model: 'L8AgentPrompt', idField: 'promptId' }
        ]
    }
};
```

### 4.10 UI Type Registration

**File:** `go/erp/ui/shared.go` — add `registerAiaTypes()`:

```go
func registerAiaTypes(resources ifs.IResources) {
    common.RegisterType[l8agent.L8AgentConversation, l8agent.L8AgentConversationList](resources, "ConversationId")
    common.RegisterType[l8agent.L8AgentPrompt, l8agent.L8AgentPromptList](resources, "PromptId")
}
```

---

## 5. Adding the Agent to Another Layer 8 Project

This section demonstrates how minimal the integration is for any Layer 8 project.

### Example: Adding the agent to L8Bugs

**Backend (`go/bugs/agent/activate.go`):**
```go
func Activate(resources ifs.IResources) {
    l8agent.Initialize(l8agent.AgentConfig{
        Resources:   resources,
        Prefix:      "/bugs/",
        ServiceArea: 20,  // whatever area is available
        DefaultPrompts: []l8agent.L8AgentPrompt{
            {Name: "Bug Triage", SystemPrompt: "You help triage and prioritize bugs...",
             Category: 3},
            {Name: "Sprint Planning", SystemPrompt: "You help plan sprints...",
             Category: 3},
        },
    })
}
```

**UI:** Copy the same pattern as L8ERP's `aia/` directory — change endpoints from `/erp/120/` to `/bugs/20/`. Same section HTML, same init pattern, same chat component.

**Total project-specific code:** ~100 lines of configuration. All behavioral logic comes from `l8agent`.

---

## 6. Use Cases

### 6.1 Natural Language Queries

**User:** "How many employees are in the Engineering department?"

**Agent flow:**
1. Calls `describe_model("Employee")` to learn field names
2. Calls `describe_model("Department")` to find department by name
3. Calls `l8query({ query: "select * from Department where name=Engineering", area: 30, service: "Dept" })`
4. Gets department ID (not sensitive — passes through unmasked)
5. Calls `l8query({ query: "select count(*) from Employee where departmentId=<id>", area: 30, service: "Employee" })`
6. Returns: "There are 45 employees in the Engineering department."

### 6.2 Cross-Module Analysis (Aggregation — No Masking Needed)

**User:** "Compare our top 5 customers by revenue with their open support cases"

**Agent flow:**
1. Calls `l8query` with aggregation: `select customerId, sum(amount) from SalesInvoice group by customerId sort-by sum descending limit 5`
2. L8Query computes aggregates server-side — LLM receives aggregate totals (no individual invoice data)
3. Calls `l8query`: `select customerId, count(*) from CrmCase where status=1 group by customerId`
4. LLM correlates the two aggregate result sets by customerId
5. Returns a combined summary table — **no sensitive individual data was ever sent to Claude**

### 6.3 Data Entry Assistance

**User:** "Create a new employee: John Smith, Engineering department, starting March 15, salary $85,000"

**Agent flow:**
1. Looks up Engineering department ID (no sensitive data in department records)
2. Calls `create_record` with Employee data (fields verified against model)
3. The POST request goes to the ERP service directly — **no masking needed** because data flows from user → ERP, not through the LLM
4. Returns: "Created employee John Smith (EMP-1234) in Engineering, start date 03/15/2026, salary $85,000.00"

Note: For create/update operations, the data comes from the user's own message — the LLM constructs the request from what the user typed. No sensitive data from the database is involved.

### 6.4 Reporting (Aggregation — No Masking Needed)

**User:** "Show me AP aging by vendor for amounts over $10,000"

**Agent flow:**
1. Calls `l8query` with aggregation: `select vendorId, sum(amount), count(*) from PurchaseInvoice where status=1 group by vendorId having sum > 1000000`
2. L8Query computes aggregates server-side — result has vendor IDs and totals only
3. LLM formats into aging buckets based on date ranges
4. Returns formatted table — **only aggregate data, no individual invoice details sent to Claude**

### 6.5 ERP-Specific Prompt Templates

Pre-built prompts that users can select:
- **Financial Analyst** — Restricts to FIN module, focuses on GL/AP/AR analysis
- **HR Manager** — Restricts to HCM module, focuses on workforce metrics
- **Operations** — SCM + MFG modules, focuses on supply chain and production
- **Executive Summary** — All modules, provides high-level KPI summaries

---

## 7. Mock Data (L8ERP-specific)

### 7.1 Mock Data Structure

**File:** `go/tests/mocks/gen_aia.go`

Generate:
- 5 `L8AgentPrompt` records (the built-in prompt templates from 6.5)
- 3 `L8AgentConversation` records with sample messages showing different use cases

### 7.2 Phase Ordering

AIA mock data has no cross-module dependencies (it doesn't reference other module IDs). It can run in any phase after foundation data.

**Add to phase ordering:** After COMP (last current module), before summary.

### 7.3 Store

**File:** `go/tests/mocks/store.go` — add:
```go
PromptIDs       []string
ConversationIDs []string
```

---

## 8. Deployment

### 8.1 No New Deployable Service

The agent runs inside the existing backend binary and web UI image of each consumer project. No new Docker images, build scripts, or K8s manifests are needed.

### 8.2 Configuration

The only new deployment requirement is the `ANTHROPIC_API_KEY` environment variable:

```yaml
env:
  - name: ANTHROPIC_API_KEY
    valueFrom:
      secretKeyRef:
        name: anthropic-secret
        key: api-key
```

### 8.3 run-local.sh

Add `ANTHROPIC_API_KEY` export before starting the backend binary:
```bash
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-}"
```

If the key is not set, the AgentChat service returns a clear error message instead of failing silently.

---

## 9. Security Considerations

1. **Authentication:** Agent inherits user's bearer token. No additional auth layer.
2. **Authorization:** Tool Executor passes the bearer token to all service calls. If the user lacks permission for a service, the agent's call fails with the same error the UI would show.
3. **Data privacy — sensitive data never leaves the network:**
   - The Data Masking Proxy replaces all sensitive field values (PII, financial data) with opaque tokens before tool results are sent to the Claude API.
   - The LLM only sees structural tokens like `[NAME_1]`, `[MONEY_3]`, `[MASKED]` — never real SSNs, names, salaries, or bank accounts.
   - Token maps live only in server memory for the duration of the request and are never persisted or transmitted.
   - Aggregation queries (count, sum, avg) are computed server-side by L8Query — the LLM receives only aggregate results, which are inherently anonymized.
   - The masking configuration is derived from the protobuf schema, so new fields are automatically classified.
4. **Prompt injection:** The system prompt includes guardrails:
   - "You are an assistant for a Layer 8 application. Only use the provided tools to query data."
   - "Never execute destructive operations (DELETE) without explicit user confirmation."
   - "Never fabricate data. If you don't know, say so."
5. **Rate limiting:** Max 10 tool calls per request. Max 20 messages per conversation context.
6. **API key security:** Stored as K8s secret, never exposed to frontend.
7. **Data exfiltration:** The agent cannot send data anywhere except back to the user. All tool calls are internal HTTP calls to the same backend. Even if the LLM were compromised, it only has access to masked tokens — not real data.

---

## 10. Implementation Phases

### Phase 0: L8Query Aggregation (l8ql project — prerequisite)

**l8types changes (proto):**
1. Add `L8AggregateFunction` message to `api.proto` (fields: `function`, `field`, `alias`)
2. Add `group_by`, `having`, `aggregates` fields to existing `L8Query` message
3. Run `make-bindings.sh` to regenerate `.pb.go` files
4. Vendor updated `l8types` in both `l8ql` and `l8erp`

**l8ql parser changes (`go/gsql/parser/`):**
5. Add `GroupBy = "group-by"` and `Having = "having"` keyword constants to `Query.go`
6. Add `GroupBy` and `Having` to the `words` array for clause boundary detection
7. Add `groupby_` and `having_` fields to the `parsed` struct
8. Extract new clauses in `split()` via existing `getTag()` helper
9. Create `parser/Aggregate.go` — `parseAggregateFunction()` detects `count(*)`, `sum(field)`, etc. in SELECT columns
10. Update `init()` — parse group-by into `L8Query.GroupBy`, detect aggregates in Properties and extract to `L8Query.Aggregates`, parse having via existing `parseExpression()`

**l8ql interpreter changes (`go/gsql/interpreter/`):**
11. Add aggregate fields to `Query` struct: `groupBy`, `groupByProps`, `aggregates`, `aggregateProps`, `having`, `isAggregate`
12. Update `NewFromQuery()` — resolve group-by and aggregate field properties
13. Create `interpreter/Accumulator.go` — running state tracker for count/sum/avg/min/max with numeric and Money type support
14. Add `Aggregate(list []interface{}) []map[string]interface{}` method — groups, accumulates, applies HAVING filter
15. Add `IsAggregate() bool` method

**Tests (`go/tests/`):**
16. Create `Aggregate_test.go` — test parsing of aggregate functions, group-by, having, execution of all 5 aggregate functions, regression test for non-aggregate queries

### Phase 1: l8agent Shared Library — Backend
1. Create `l8agent` repository with Go module structure
2. Create `proto/l8agent.proto` and generate bindings
3. Implement `llm/client.go` — Claude API HTTP client
4. Implement `masking/proxy.go`, `config.go`, `tokenmap.go`, `overrides.go` — Data Masking Proxy
5. Implement `executor/tool_executor.go` — Tool Executor with prefix support
6. Implement `schema/provider.go` — Schema Provider (tier 1 + tier 2)
7. Implement `tools/definitions.go` — LLM tool definitions
8. Implement `services/chat/` — AgentChat orchestration service
9. Implement `services/conversations/` — AgentConversation CRUD
10. Implement `services/prompts/` — AgentPrompt CRUD
11. Implement `Initialize()` API for consumer projects
12. Verify: `go build ./...` and `go vet ./...`

### Phase 2: l8agent Shared Library — UI Components
1. Create `js/l8agent-chat.js` — Desktop chat UI component
2. Create `js/l8agent-chat.css` — Desktop chat styles
3. Create `js/l8agent-enums.js` — Shared enums
4. Create `js/l8agent-columns.js` — Shared column definitions
5. Create `js/l8agent-forms.js` — Shared form definitions
6. Create `js/m/l8agent-chat-m.js` — Mobile chat UI component
7. Create `js/m/l8agent-chat-m.css` — Mobile chat styles

### Phase 3: L8ERP Integration — Backend
1. Add `l8agent` as dependency in `go/go.mod`, vendor it
2. Create `go/erp/aia/activate.go` — calls `l8agent.Initialize()` with ERP config
3. Create `go/erp/aia/masking_overrides.go` — optional ERP field overrides
4. Add AIA activation to `activate_all.go`
5. Add `registerAiaTypes()` to `shared.go`
6. Verify: `cd go && go build ./...`

### Phase 4: L8ERP Integration — Desktop UI
1. Copy l8agent JS/CSS to `l8ui/l8agent/`
2. Create `aia-config.js`, `aia-section-config.js`
3. Create `agent-enums.js`, `agent-columns.js`, `agent-forms.js`, `agent-chat-init.js`
4. Create `aia-init.js`
5. Create `aia.css`
6. Create `sections/aia.html`
7. Update `sections.js`
8. Update `app.html` (CSS + JS includes)

### Phase 5: L8ERP Integration — Mobile UI
1. Create `m/js/aia/` — mobile integration files
2. Update mobile nav config
3. Update `m/app.html`

### Phase 6: L8ERP Mock Data
1. Create `gen_aia.go` — prompt templates and sample conversations
2. Add to `store.go`
3. Add AIA phase to `main_phases.go`
4. Verify: `cd go && go build ./tests/mocks/ && go vet ./tests/mocks/`

### Phase 7: End-to-End Verification

For every section affected by this plan:
1. Navigate to the AIA section
2. Verify Conversations table loads
3. Verify Prompts table loads with CRUD
4. Verify Chat interface renders
5. Send a test message, verify response
6. Verify conversation is saved and loadable
7. Verify data masking — confirm no sensitive data in Claude API logs
8. Verify aggregation queries return correct results
9. Verify on both desktop and mobile

Sections to verify:
- [ ] AIA > Agent > Chat
- [ ] AIA > Agent > Conversations
- [ ] AIA > Agent > Prompts
- [ ] Mobile AIA > Agent > Chat
- [ ] Mobile AIA > Agent > Conversations
- [ ] Mobile AIA > Agent > Prompts

---

## 11. Traceability Matrix

| # | Section | Gap / Action Item | Phase |
|---|---------|-------------------|-------|
| 1 | 2.6.3 | Add L8AggregateFunction message + aggregation fields to L8Query proto (l8types) | Phase 0 |
| 2 | 2.6.3 | Add GroupBy/Having keywords, parsed struct fields, split() extraction (parser/Query.go) | Phase 0 |
| 3 | 2.6.3 | Create parser/Aggregate.go — parseAggregateFunction() for SELECT column detection | Phase 0 |
| 4 | 2.6.3 | Update parser init() — group-by parsing, aggregate extraction, having parsing | Phase 0 |
| 5 | 2.6.3 | Add aggregate fields to interpreter Query struct, update NewFromQuery() | Phase 0 |
| 6 | 2.6.3 | Create interpreter/Accumulator.go — running state for count/sum/avg/min/max | Phase 0 |
| 7 | 2.6.3 | Implement Query.Aggregate() — group, accumulate, HAVING filter | Phase 0 |
| 8 | 2.6.3 | Create Aggregate_test.go — parsing, execution, regression tests | Phase 0 |
| 9 | 3.1 | Create l8agent repository with Go module structure | Phase 1 |
| 10 | 3.2 | Create l8agent.proto and generate bindings | Phase 1 |
| 11 | 3.5 | Implement LLM client (Claude API HTTP calls) | Phase 1 |
| 12 | 2.5 | Implement Data Masking Proxy (proxy, config, tokenmap, overrides) | Phase 1 |
| 13 | 3.6 | Implement Tool Executor with prefix support | Phase 1 |
| 14 | 3.7 | Implement Schema Provider (tier 1 + tier 2) | Phase 1 |
| 15 | 2.7 | Implement LLM tool definitions | Phase 1 |
| 16 | 3.4 | Implement AgentChat orchestration service | Phase 1 |
| 17 | 3.4 | Implement AgentConversation CRUD service | Phase 1 |
| 18 | 3.4 | Implement AgentPrompt CRUD service | Phase 1 |
| 19 | 3.4.2 | Implement Initialize() API for consumer projects | Phase 1 |
| 20 | 3.9 | Create l8agent-chat.js (desktop chat UI) | Phase 2 |
| 21 | 3.9 | Create l8agent-chat.css (desktop chat styles) | Phase 2 |
| 22 | 3.9 | Create l8agent-enums.js, l8agent-columns.js, l8agent-forms.js | Phase 2 |
| 23 | 3.9 | Create l8agent-chat-m.js + CSS (mobile chat UI) | Phase 2 |
| 24 | 4.3 | Create activate.go — l8agent.Initialize() with ERP config | Phase 3 |
| 25 | 4.3 | Create masking_overrides.go (optional) | Phase 3 |
| 26 | 4.3 | Add AIA activation to activate_all.go | Phase 3 |
| 27 | 4.10 | Add registerAiaTypes() to shared.go | Phase 3 |
| 28 | 4.2 | Vendor l8agent in go/go.mod | Phase 3 |
| 29 | 4.7 | Copy l8agent JS/CSS to l8ui/l8agent/ | Phase 4 |
| 30 | 4.4 | Create aia-config.js | Phase 4 |
| 31 | 4.5 | Create aia-init.js | Phase 4 |
| 32 | 4.6 | Create sections/aia.html | Phase 4 |
| 33 | 4.2 | Create agent-enums.js, agent-columns.js, agent-forms.js, agent-chat-init.js | Phase 4 |
| 34 | 4.7 | Update app.html with CSS + JS includes | Phase 4 |
| 35 | 4.8 | Update sections.js | Phase 4 |
| 36 | 4.9 | Create mobile JS files + update nav config | Phase 5 |
| 37 | 4.9 | Update m/app.html | Phase 5 |
| 38 | 7.1 | Create gen_aia.go mock data generator | Phase 6 |
| 39 | 7.3 | Add ID slices to store.go | Phase 6 |
| 40 | 7.2 | Add AIA phase to main_phases.go | Phase 6 |
| 41 | 10 | End-to-end verification on desktop and mobile | Phase 7 |

---

## 12. Future Enhancements (Out of Scope)

These are not part of this PRD but are natural extensions:

- **Scheduled agent tasks** — Run reports on a schedule and email results
- **Workflow automation** — "When a PO is approved, create a journal entry" — event-driven agent triggers
- **Multi-modal** — Upload images (receipts, invoices) for data extraction
- **Agent-to-agent** — Specialized agents per module that collaborate
- **Fine-tuned models** — Train on company-specific patterns
- **Audit trail** — Log all agent actions for compliance review (in `l8agent`)
- **Cost tracking** — Track token usage and API costs per user/department (in `l8agent`)
- **Local LLM support** — Pluggable LLM backend to support on-premise models when hardware allows
