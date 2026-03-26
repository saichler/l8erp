# Phase E: Integration — Email, Notifications & Webhooks

## Scope

Phase E covers the remaining two integration features from the roadmap (E.2 Data Import is already done):

- **E.1 — Email & In-App Notification System**
- **E.3 — Webhook/Event System for Cross-Module Triggers**

Both systems share a common event backbone: when something happens in the ERP (status change, entity creation, threshold breach), the system needs to (a) notify users in-app, (b) optionally send email, and (c) optionally fire webhooks to external systems. Rather than build three isolated systems, this plan designs a unified **Event → Dispatch** architecture.

---

## Current State

### What Exists
- **After() hooks** on `VB[T]` / `NewServiceCallbackWithAfter` — synchronous post-persistence hooks for cross-service cascading (10+ flows implemented in Phase B/F)
- **L8NotificationSet** in `l8types/l8notify` — property-change notification type (source, time, serviceName, serviceArea, modelType, modelKey, type, notificationList) — used for real-time data sync, NOT user-facing notifications
- **SYS module UI** — 5 tabs (Health, Security, Modules, Logs, Data Import) with room for more
- **SYS services** — ServiceArea=0, 2 services (ModConfig, ImprtTmpl)

### What Does NOT Exist
- No user-facing notification storage or delivery
- No email sending (SMTP/API)
- No email template system
- No webhook registration or dispatch
- No event bus or pub/sub beyond synchronous After() hooks
- No notification bell/badge in the UI

---

## Architecture

### Event Flow

```
  Service After() hook
         │
         ▼
  common.EmitEvent()  ───────────────────────────────────┐
         │                                                │
         ▼                                                ▼
  SysNotification service (persist)              SysWebhookDispatch
         │                                        (match rules → HTTP POST)
         ▼
  UI notification bell (poll or SSE)
         │
         ▼
  Email dispatch (if notification rule says email)
```

### Design Principles
1. **Non-blocking** — EmitEvent writes to the notification service asynchronously via goroutine; After() hooks don't wait for delivery
2. **Persistent** — All notifications are stored as SysNotification entities; users can view history
3. **Rule-based** — SysNotificationRule defines which events trigger which channels (in-app, email, webhook)
4. **Template-driven** — Email bodies use SysEmailTemplate with variable substitution
5. **Idempotent** — Webhook deliveries include an event ID for deduplication

---

## Protobuf Types

### New Proto File: `proto/sys-notifications.proto`

```protobuf
syntax = "proto3";
package sys;
option go_package = "./types/sys";

import "api.proto";
import "erp-common.proto";

// ─── Enums ───

enum SysNotificationStatus {
  SYS_NOTIFICATION_STATUS_UNSPECIFIED = 0;
  SYS_NOTIFICATION_STATUS_UNREAD = 1;
  SYS_NOTIFICATION_STATUS_READ = 2;
  SYS_NOTIFICATION_STATUS_DISMISSED = 3;
}

enum SysNotificationPriority {
  SYS_NOTIFICATION_PRIORITY_UNSPECIFIED = 0;
  SYS_NOTIFICATION_PRIORITY_LOW = 1;
  SYS_NOTIFICATION_PRIORITY_NORMAL = 2;
  SYS_NOTIFICATION_PRIORITY_HIGH = 3;
  SYS_NOTIFICATION_PRIORITY_URGENT = 4;
}

enum SysNotificationChannel {
  SYS_NOTIFICATION_CHANNEL_UNSPECIFIED = 0;
  SYS_NOTIFICATION_CHANNEL_IN_APP = 1;
  SYS_NOTIFICATION_CHANNEL_EMAIL = 2;
  SYS_NOTIFICATION_CHANNEL_WEBHOOK = 3;
}

enum SysWebhookStatus {
  SYS_WEBHOOK_STATUS_UNSPECIFIED = 0;
  SYS_WEBHOOK_STATUS_ACTIVE = 1;
  SYS_WEBHOOK_STATUS_INACTIVE = 2;
  SYS_WEBHOOK_STATUS_FAILED = 3;
}

enum SysDeliveryStatus {
  SYS_DELIVERY_STATUS_UNSPECIFIED = 0;
  SYS_DELIVERY_STATUS_PENDING = 1;
  SYS_DELIVERY_STATUS_SENT = 2;
  SYS_DELIVERY_STATUS_FAILED = 3;
  SYS_DELIVERY_STATUS_RETRYING = 4;
}

// ─── Prime Objects ───

// A user-facing notification (in-app inbox item)
message SysNotification {
  string notification_id = 1;
  string user_id = 2;              // recipient
  string title = 3;
  string message = 4;
  SysNotificationPriority priority = 5;
  SysNotificationStatus status = 6;
  string source_module = 7;        // e.g. "sales", "hcm"
  string source_service = 8;       // e.g. "SalesOrder"
  string source_entity_id = 9;     // ID of the entity that triggered this
  string event_type = 10;          // e.g. "status_change", "created", "threshold_breach"
  int64 created_at = 11;
  int64 read_at = 12;
  erp.AuditInfo audit_info = 20;
}

message SysNotificationList {
  repeated SysNotification list = 1;
  l8api.L8MetaData metadata = 2;
}

// Rule that maps events to notification channels
message SysNotificationRule {
  string rule_id = 1;
  string name = 2;
  string description = 3;
  bool is_active = 4;
  // Match criteria
  string source_module = 5;        // "*" for all
  string source_service = 6;       // "*" for all
  string event_type = 7;           // "status_change", "created", "deleted", "*"
  // Delivery
  repeated SysNotificationChannel channels = 8;
  SysNotificationPriority priority = 9;
  string email_template_id = 10;   // FK to SysEmailTemplate (if email channel)
  string webhook_id = 11;          // FK to SysWebhook (if webhook channel)
  // Recipients
  repeated string recipient_user_ids = 12;
  repeated string recipient_role_ids = 13;
  erp.AuditInfo audit_info = 20;
}

message SysNotificationRuleList {
  repeated SysNotificationRule list = 1;
  l8api.L8MetaData metadata = 2;
}

// Email template with variable substitution
message SysEmailTemplate {
  string template_id = 1;
  string name = 2;
  string subject_template = 3;     // "Order {{orderNumber}} status changed to {{status}}"
  string body_template = 4;        // HTML with {{variable}} placeholders
  string description = 5;
  erp.AuditInfo audit_info = 20;
}

message SysEmailTemplateList {
  repeated SysEmailTemplate list = 1;
  l8api.L8MetaData metadata = 2;
}

// SMTP configuration (singleton per deployment)
message SysSmtpConfig {
  string config_id = 1;
  string host = 2;
  int32 port = 3;
  string username = 4;
  string password = 5;             // stored encrypted
  bool use_tls = 6;
  string from_address = 7;
  string from_name = 8;
  erp.AuditInfo audit_info = 20;
}

message SysSmtpConfigList {
  repeated SysSmtpConfig list = 1;
  l8api.L8MetaData metadata = 2;
}

// Webhook endpoint registration
message SysWebhook {
  string webhook_id = 1;
  string name = 2;
  string url = 3;
  string secret = 4;              // HMAC signing secret
  SysWebhookStatus status = 5;
  string description = 6;
  int32 retry_count = 7;          // max retries on failure (default 3)
  int32 timeout_ms = 8;           // HTTP timeout (default 5000)
  int32 consecutive_failures = 9; // auto-incremented; resets on success
  int32 max_failures = 10;        // auto-disable after N consecutive failures (default 10)
  erp.AuditInfo audit_info = 20;
}

message SysWebhookList {
  repeated SysWebhook list = 1;
  l8api.L8MetaData metadata = 2;
}

// Webhook delivery log (child of SysWebhook, embedded)
message SysWebhookDelivery {
  string delivery_id = 1;
  string event_type = 2;
  string source_module = 3;
  string source_service = 4;
  string source_entity_id = 5;
  SysDeliveryStatus status = 6;
  int32 http_status = 7;
  string response_body = 8;
  int32 attempt = 9;
  int64 sent_at = 10;
  string error_message = 11;
}
```

**Type count: 7 messages + 6 enums + 6 List wrappers = 13 messages, 6 enums**

### Services (6 new)

| Service | ServiceName | ServiceArea | Primary Key | Proto Type |
|---------|-------------|-------------|-------------|------------|
| Notification | `Notify` | 0 | `NotificationId` | `SysNotification` |
| Notification Rule | `NtfyRule` | 0 | `RuleId` | `SysNotificationRule` |
| Email Template | `EmailTmpl` | 0 | `TemplateId` | `SysEmailTemplate` |
| SMTP Config | `SmtpConf` | 0 | `ConfigId` | `SysSmtpConfig` |
| Webhook | `Webhook` | 0 | `WebhookId` | `SysWebhook` |
| Webhook Delivery | `WbhkDlvry` | 0 | `DeliveryId` | `SysWebhookDelivery` |

All ServiceNames ≤ 10 characters. All ServiceArea = 0 (SYS).

---

## Implementation Phases

### Phase 1: Protobuf & Service Skeleton (~30 files)

**1.1 Proto file**
- Create `proto/sys-notifications.proto` with all types above
- Update `proto/make-bindings.sh` to include the new proto file
- Run `make-bindings.sh` to generate `go/types/sys/sys-notifications.pb.go`

**1.2 Service directories** (6 new)
Each follows the standard pattern (`*Service.go` + `*ServiceCallback.go`):

| Directory | Files |
|-----------|-------|
| `go/erp/sys/notification/` | `SysNotificationService.go`, `SysNotificationServiceCallback.go` |
| `go/erp/sys/notificationrule/` | `SysNotificationRuleService.go`, `SysNotificationRuleServiceCallback.go` |
| `go/erp/sys/emailtemplate/` | `SysEmailTemplateService.go`, `SysEmailTemplateServiceCallback.go` |
| `go/erp/sys/smtpconfig/` | `SysSmtpConfigService.go`, `SysSmtpConfigServiceCallback.go` |
| `go/erp/sys/webhook/` | `SysWebhookService.go`, `SysWebhookServiceCallback.go` |
| `go/erp/sys/webhookdelivery/` | `SysWebhookDeliveryService.go`, `SysWebhookDeliveryServiceCallback.go` |

**Validation rules:**
- SysNotification: Require userId, title, message
- SysNotificationRule: Require name, at least one channel
- SysEmailTemplate: Require name, subjectTemplate, bodyTemplate
- SysSmtpConfig: Require host, port, fromAddress
- SysWebhook: Require name, url; Default retryCount=3, timeoutMs=5000, maxFailures=10
- SysWebhookDelivery: Immutable (no PUT) — log entries only

**1.3 Service activation**
- Update `go/erp/services/activate_sys.go` — add 6 new activation entries

**1.4 Type registration**
- Update `go/erp/ui/shared_other.go` — add `RegisterType` for all 6 types in `registerSysTypes()`

**1.5 Build verification**
- `cd proto && ./make-bindings.sh`
- `cd go && go build ./...`

### Phase 2: Event Emission Infrastructure (~4 files)

**2.1 Event type**
- Create `go/erp/common/event.go`:
  ```go
  type ERPEvent struct {
      Module       string // "sales", "hcm", etc.
      Service      string // "SalesOrder", "Employee", etc.
      EntityID     string // primary key of affected entity
      EventType    string // "status_change", "created", "deleted", "threshold_breach"
      Title        string // human-readable summary
      Message      string // detailed description
      Priority     int32  // maps to SysNotificationPriority
      Metadata     map[string]string // extra key-value pairs for templates
  }
  ```

**2.2 Event emitter**
- Create `go/erp/common/event_emitter.go`:
  - `EmitEvent(event *ERPEvent, vnic ifs.IVNic)` — fire-and-forget goroutine that:
    1. Fetches all active SysNotificationRule entries matching the event (by module/service/eventType)
    2. For each matching rule with IN_APP channel: creates SysNotification per recipient user
    3. For each matching rule with EMAIL channel: fetches SysEmailTemplate, renders variables, sends via SMTP
    4. For each matching rule with WEBHOOK channel: fetches SysWebhook, dispatches HTTP POST
  - Errors are logged as warnings (non-fatal, non-blocking)
  - Uses `GetEntities` with filter for rule matching

**2.3 Email sender**
- Create `go/erp/common/email_sender.go`:
  - `SendEmail(to, subject, body string, vnic ifs.IVNic) error`
  - Fetches SysSmtpConfig (singleton) via `GetEntities`
  - Uses Go `net/smtp` with TLS support
  - Template variable substitution: `{{variable}}` → value from event metadata
  - Returns error on failure (caller logs it)

**2.4 Webhook dispatcher**
- Create `go/erp/common/webhook_dispatch.go`:
  - `DispatchWebhook(webhook *SysWebhook, event *ERPEvent, vnic ifs.IVNic)`
  - HTTP POST to webhook URL with JSON payload
  - HMAC-SHA256 signature in `X-L8-Signature` header using webhook.Secret
  - Retry with exponential backoff (up to webhook.RetryCount)
  - Creates SysWebhookDelivery log entry for each attempt
  - On consecutive failures ≥ maxFailures: auto-sets webhook status to FAILED

### Phase 3: Wire Up Existing After() Hooks (~15 files)

Add `common.EmitEvent()` calls to existing After() hooks that represent significant business events. These are non-breaking additions — the hooks already run; we just add event emission.

**Tier 1 — Order-to-Cash / Procure-to-Pay:**
- SalesOrder status change → emit "status_change"
- SalesDeliveryOrder DELIVERED → emit "delivery_completed"
- SalesInvoice created → emit "invoice_created"
- PurchaseRequisition APPROVED → emit "requisition_approved"
- ScmPurchaseOrder created → emit "purchase_order_created"
- CustomerPayment COMPLETED → emit "payment_received"
- VendorPayment COMPLETED → emit "payment_sent"

**Tier 2 — Production / CRM / HR:**
- MfgProductionOrder COMPLETED → emit "production_completed"
- CrmCase RESOLVED → emit "case_resolved"
- CrmCase SLA breach (escalation) → emit "sla_breach"
- Application HIRED → emit "employee_onboarded"
- BiKpi threshold breach → emit "kpi_threshold_breach"

**Tier 3 — Document / Compliance:**
- DocDocument new version → emit "document_version"
- CompFinding escalation → emit "finding_escalated"
- CompRisk high score → emit "risk_high"

Each After() hook addition is 3-5 lines:
```go
common.EmitEvent(&common.ERPEvent{
    Module: "sales", Service: "SalesOrder", EntityID: order.SalesOrderId,
    EventType: "status_change", Title: "Sales Order status changed",
    Message: fmt.Sprintf("Order %s changed to %s", order.OrderNumber, newStatus),
    Priority: int32(sys.SYS_NOTIFICATION_PRIORITY_NORMAL),
}, vnic)
```

### Phase 4: Desktop UI — Notification Bell & Admin Pages (~20 files)

**4.1 Notification Bell (global, always visible)**
- Create `go/erp/ui/web/l8ui/shared/layer8d-notification-bell.js`:
  - Bell icon in the top-right header area
  - Badge with unread count
  - Dropdown panel showing recent notifications (title, message, time, priority)
  - Click notification → navigate to source entity (module/service/entityID)
  - Mark as read on click; "Mark all read" button
  - Polls `/erp/0/Notify?body=...` every 30 seconds for unread notifications
- Create `go/erp/ui/web/l8ui/shared/layer8d-notification-bell.css`
- Update `go/erp/ui/web/app.html` — add bell script/css includes, add bell container to header

**4.2 SYS Notifications Tab**
- Add "Notifications" tab to `sections/system.html` (after Data Import)
- Add `data-module="notifications"` content area with sub-navigation:
  - **Inbox**: Full notification list (table with filters)
  - **Rules**: CRUD for SysNotificationRule
  - **Templates**: CRUD for SysEmailTemplate

**4.3 SYS Webhooks Tab**
- Add "Webhooks" tab to `sections/system.html`
- Add `data-module="webhooks"` content area with sub-navigation:
  - **Endpoints**: CRUD for SysWebhook
  - **Deliveries**: Read-only log of SysWebhookDelivery
  - **SMTP**: CRUD for SysSmtpConfig (singleton edit form)

**4.4 Config files**
- Update `l8ui/sys/l8sys-config.js` — add `notifications` and `webhooks` modules with services
- Add `L8Sys.submodules` entries for `L8Notifications` and `L8Webhooks`

**4.5 Enum/Column/Form files** (follow standard l8ui pattern):

| Sub-module | Files |
|------------|-------|
| Notifications | `l8notifications-enums.js`, `l8notifications-columns.js`, `l8notifications-forms.js`, `l8notifications.js` |
| Webhooks | `l8webhooks-enums.js`, `l8webhooks-columns.js`, `l8webhooks-forms.js`, `l8webhooks.js` |

**4.6 Init updates**
- Update `l8ui/sys/l8sys-init.js` — add Notifications and Webhooks to required namespaces and module initialization

**4.7 app.html updates**
- Add CSS includes for notification bell, notifications, webhooks
- Add JS includes for all new files (after existing SYS scripts, before l8sys-init.js)

### Phase 5: Mobile UI Parity (~10 files)

**5.1 Notification bell (mobile)**
- Create `go/erp/ui/web/l8ui/m/js/layer8m-notification-bell.js`
- Add bell icon to mobile header in `m/app.html`
- Notification list as full-screen panel (not dropdown)

**5.2 SYS mobile section updates**
- Update `m/sections/system.html` — add Notifications and Webhooks tabs
- Create `m/js/sys/sys-notifications-columns.js` and `sys-notifications-forms.js`
- Create `m/js/sys/sys-webhooks-columns.js` and `sys-webhooks-forms.js`
- Update `m/js/sys/sys-index.js` — register new models

**5.3 m/app.html updates**
- Add script includes for mobile notification bell and new SYS sub-module files

### Phase 6: Mock Data (~3 files)

**6.1 Mock data generators**
- Create `go/tests/mocks/gen_sys_notifications.go`:
  - 3 SysNotificationRule entries (order status changes, SLA breaches, high-risk findings)
  - 2 SysEmailTemplate entries (order confirmation, SLA breach alert)
  - 1 SysSmtpConfig (localhost:587 dev settings)
  - 2 SysWebhook entries (test endpoint 1, test endpoint 2)
  - 20 SysNotification entries (mix of read/unread, various modules)
  - 10 SysWebhookDelivery entries (mix of sent/failed)

**6.2 Phase orchestration**
- Create `go/tests/mocks/sys_notification_phases.go`:
  - Phase 1: SmtpConfig, EmailTemplates
  - Phase 2: Webhooks, NotificationRules
  - Phase 3: Notifications, WebhookDeliveries

**6.3 Update main_phases.go**
- Add SYS notification phases after existing SYS phases (at the end, since notifications reference entities from all modules)

### Phase 7: End-to-End Verification

1. **Build**: `cd go && go build ./...` — zero errors
2. **Proto**: All 13 messages + 6 enums generated correctly in `go/types/sys/`
3. **Services**: All 6 new services activate without errors
4. **Mock data**: Upload succeeds for all new entities
5. **Desktop UI**:
   - [ ] Notification bell visible in header
   - [ ] Bell badge shows unread count
   - [ ] Clicking bell shows notification dropdown
   - [ ] SYS → Notifications tab loads, Inbox/Rules/Templates sub-nav works
   - [ ] SYS → Webhooks tab loads, Endpoints/Deliveries/SMTP sub-nav works
   - [ ] CRUD works for Rules, Templates, SmtpConfig, Webhooks
   - [ ] Notification inbox shows read/unread with priority badges
   - [ ] Webhook deliveries are read-only
6. **Mobile UI**:
   - [ ] Notification bell visible in mobile header
   - [ ] Bell shows notification list panel
   - [ ] SYS section has Notifications and Webhooks tabs
   - [ ] CRUD parity with desktop
7. **Event flow** (manual test):
   - Change a SalesOrder status → verify SysNotification created (if matching rule exists)
   - Verify webhook delivery log entry created (if webhook rule active)

---

## Traceability Matrix

| # | Gap / Action Item | Phase |
|---|-------------------|-------|
| 1 | No protobuf types for notifications/webhooks/email | Phase 1.1 |
| 2 | No service directories for 6 new services | Phase 1.2 |
| 3 | Services not in activate_sys.go | Phase 1.3 |
| 4 | Types not registered for UI introspection | Phase 1.4 |
| 5 | No event emission infrastructure | Phase 2.1-2.2 |
| 6 | No email sending capability | Phase 2.3 |
| 7 | No webhook HTTP dispatch | Phase 2.4 |
| 8 | Existing After() hooks don't emit events | Phase 3 |
| 9 | No notification bell in desktop UI | Phase 4.1 |
| 10 | No SYS Notifications admin tab | Phase 4.2 |
| 11 | No SYS Webhooks admin tab | Phase 4.3 |
| 12 | SYS config doesn't include new modules | Phase 4.4 |
| 13 | No enum/column/form JS files for new services | Phase 4.5 |
| 14 | Init doesn't initialize new sub-modules | Phase 4.6 |
| 15 | app.html missing new script/CSS includes | Phase 4.7 |
| 16 | No mobile notification bell | Phase 5.1 |
| 17 | Mobile SYS section missing new tabs | Phase 5.2 |
| 18 | m/app.html missing new includes | Phase 5.3 |
| 19 | No mock data for new services | Phase 6 |
| 20 | No end-to-end verification | Phase 7 |

---

## File Summary

| Category | New Files | Modified Files |
|----------|-----------|----------------|
| Proto | 1 | 1 (make-bindings.sh) |
| Go services | 12 | 0 |
| Go infrastructure | 4 (event.go, event_emitter.go, email_sender.go, webhook_dispatch.go) | 0 |
| Go activation/registration | 0 | 2 (activate_sys.go, shared_other.go) |
| Go After() hooks | 0 | ~15 existing callback files |
| Desktop UI | ~12 (bell + notification + webhook JS/CSS) | 3 (system.html, l8sys-config.js, l8sys-init.js, app.html) |
| Mobile UI | ~8 (bell + columns + forms) | 3 (system.html, sys-index.js, m/app.html) |
| Mock data | 2 | 1 (main_phases.go) |
| **Total** | **~39 new** | **~25 modified** |
