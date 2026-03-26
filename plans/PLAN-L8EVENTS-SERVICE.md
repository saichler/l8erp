# Plan: Generic Event & Alarm Services in l8events

## Goal
Add generic `EventRecord` and `AlarmRecord` services to the `l8events` project so any consuming project (l8erp, l8bugs, l8id, etc.) can activate them on its vnic — same pattern as l8secure's `ActivateUsers`/`ActivateRoles`.

## Current State

### What l8events already has
- **Proto types**: `EventRecord`, `AlarmRecord`, `AlarmNote`, `AlarmStateChange`, `ArchiveInfo`, `MaintenanceWindow`
- **Enums**: `Severity`, `AlarmState`, `EventState`, `EventCategory`, `MaintenanceStatus`, `RecurrenceType`
- **State machine**: `state.Transition()`, `Acknowledge()`, `Clear()`, `Suppress()` — validates alarm state transitions
- **Archive logic**: `archive.Archiver` with pluggable `Store` interface
- **Event converters**: `convert` package for category-specific event parsing

### What l8events is missing
- **No List types** — `EventRecordList` and `AlarmRecordList` don't exist in proto
- **No services** — no `*Service.go` files, no `Activate*` functions
- **No web endpoints** — no HTTP API for CRUD on events/alarms

### Reference pattern: l8secure
```
l8secure/go/secure/provider/
├── SecurityProvider.go      ← Activate() calls all sub-service activators
├── UserService.go           ← ActivateUsers(vnic) — SLA + callback + web endpoints
├── RoleService.go           ← ActivateRoles(vnic)
├── TokenService.go          ← ActivateTokens(vnic)
└── CredentialsService.go    ← ActivateCredentials(vnic)
```

Each `Activate*` function:
1. Creates an `ifs.ServiceLevelAgreement` with name, area, item type, list type, primary key
2. Sets a callback for Before/After hooks
3. Defines web endpoints (POST/PUT/PATCH/DELETE for mutations, GET with L8Query for reads)
4. Calls `base.Activate(serviceConfig, vnic)`

---

## Phase 1: Proto — Add List Types

**Location**: `l8events/proto/l8events.proto`

Add after existing messages:

```protobuf
message EventRecordList {
  repeated EventRecord list = 1;
  l8api.L8MetaData metadata = 2;
}

message AlarmRecordList {
  repeated AlarmRecord list = 1;
  l8api.L8MetaData metadata = 2;
}

message MaintenanceWindowList {
  repeated MaintenanceWindow list = 1;
  l8api.L8MetaData metadata = 2;
}
```

**Note**: This requires importing `l8api.proto` (or the project's `api.proto`). Check `make-bindings.sh` to see if `api.proto` is already a dependency — if not, add the download step (same as l8erp's `make-bindings.sh`).

Run `make-bindings.sh` to regenerate `.pb.go` files.

---

## Phase 2: Event Service

**Location**: `l8events/go/services/EventService.go`

Create new `services` package under `l8events/go/`.

```
l8events/go/services/
├── EventService.go          ← ActivateEvents(vnic)
├── AlarmService.go          ← ActivateAlarms(vnic)
└── MaintenanceService.go    ← ActivateMaintenanceWindows(vnic) (optional)
```

### EventService

| Property | Value |
|----------|-------|
| ServiceName | `"Events"` |
| ServiceArea | `byte(75)` (next after l8secure's 73/74) |
| PrimaryKey | `"EventId"` |
| Item | `&l8events.EventRecord{}` |
| ItemList | `&l8events.EventRecordList{}` |

**Callback behavior**:
- **Before POST**: Auto-generate `EventId`, set `ReceivedAt` = now, set `State` = `EVENT_STATE_NEW`
- **Before PUT**: Reject — events are immutable after creation (proto comment says so)
- **Before PATCH**: Only allow `State` field updates (e.g., marking as PROCESSED/DISCARDED/ARCHIVED)
- **Before DELETE**: Allow (for archival/cleanup)

**Web endpoints**:
```go
webSv.AddEndpoint(&l8events.EventRecord{}, ifs.POST, &l8web.L8Empty{})
webSv.AddEndpoint(&l8events.EventRecord{}, ifs.PATCH, &l8web.L8Empty{})
webSv.AddEndpoint(&l8api.L8Query{}, ifs.GET, &l8events.EventRecordList{})
```

No PUT endpoint — events are immutable.

---

## Phase 3: Alarm Service (in l8alarms)

The AlarmService belongs in the **l8alarms** project, not l8events. Alarms are a separate concern — l8events provides event types and the event service; l8alarms provides alarm correlation, state machine, and the alarm service.

**This phase is out of scope for this plan** — it will be planned separately in the l8alarms project. The AlarmRecord types and AlarmRecordList are already defined in l8events proto (shared types), so l8alarms can import and use them.

---

## Phase 4: Top-Level Activator

**Location**: `l8events/go/services/Activate.go`

```go
func ActivateEvents(vnic ifs.IVNic)
```

Consuming projects call `services.ActivateEvents(vnic)` to activate the Events service on their vnic. The alarm service activation will be provided by l8alarms separately.

---

## Phase 4b: Event Helper API

**Location**: `l8events/go/services/api.go`

Static helper functions so consuming projects can emit events with a single call instead of manually constructing protobuf structs and POSTing to the service.

```go
package services

// PostEvent creates and posts an EventRecord to the Events service.
// Auto-sets eventId, receivedAt, and state=NEW.
func PostEvent(vnic ifs.IVNic, category EventCategory, eventType string,
    severity Severity, sourceId, sourceName, sourceType, message string,
    attributes map[string]string)

// PostAuditEvent is a convenience for audit trail events (category=AUDIT).
func PostAuditEvent(vnic ifs.IVNic, eventType string, severity Severity,
    userId, action, target, message string)

// PostSecurityEvent is a convenience for security events (category=SECURITY).
func PostSecurityEvent(vnic ifs.IVNic, eventType string, severity Severity,
    userId, action, message string)
```

### Usage by l8secure

Once l8secure vendors the updated l8events, it can emit audit events from its SecurityProvider:

```go
// In SecurityProvider.CanDoAction — on deny:
services.PostSecurityEvent(vnic, "ACCESS_DENIED", Severity_SEVERITY_WARNING,
    userId, "CanDoAction", "Access denied to "+elemType)

// In SecurityProvider.Authenticate — on success:
services.PostAuditEvent(vnic, "LOGIN_SUCCESS", Severity_SEVERITY_INFO,
    username, "Authenticate", "L8User", "User logged in")

// In SecurityProvider.Authenticate — on failure:
services.PostSecurityEvent(vnic, "LOGIN_FAILED", Severity_SEVERITY_WARNING,
    username, "Authenticate", "Failed login attempt")
```

### Implementation

Each helper:
1. Constructs an `EventRecord` with the provided fields
2. Sets `OccurredAt` = `time.Now().Unix()`
3. Looks up the Events service handler via `vnic.Resources().Services().ServiceHandler(EventsServiceName, EventsServiceArea)`
4. Calls `handler.Post()` to persist the event
5. If the service is not activated (handler not found), logs a warning and returns silently — this ensures projects that don't activate l8events don't crash

---

## Phase 5: l8erp Integration

After the l8events services are built and vendored:

1. **Vendor refresh** in l8erp: `go mod tidy && go mod vendor`
2. **Activate in vnet or erp main**: Call `services.ActivateEventServices(vnic)` — determine the right place based on whether events need to be on the vnet (replicated) or on the ERP node only
3. **UI type registration**: Add `EventRecord` and `AlarmRecord` to `go/erp/ui/main.go` type registration
4. **Security config**: Add ScopeView rules for `EventRecord` and `AlarmRecord` in `go/sec/Defaults.go`

---

## Phase 6: Audit Events UI in l8ui (Shared Library)

The Audit Events UI belongs in the **l8ui shared library** (`l8ui/sys/security/`), not in l8erp-specific code — same as Users, Roles, and Credentials. This way any project that uses l8ui and activates l8events services gets the Audit Events tab automatically.

### New files in `l8ui/sys/security/`

| File | Purpose |
|------|---------|
| `l8security-events-enums.js` | `EventCategory`, `EventState`, `Severity` enum mappings + status renderers |
| `l8security-events-columns.js` | Column definitions for `EventRecord` and `AlarmRecord` tables |
| `l8security-events-tab.js` | Tab initialization, table setup, read-only mode (no Add/Edit/Delete — events are immutable) |

### Enums (`l8security-events-enums.js`)

Map the l8events protobuf enums to UI display:

```javascript
// EventCategory: 0=Unspecified, 1=Audit, 2=System, 3=Monitoring, 4=Security, 5=Integration, 6=Custom, ...
// EventState: 0=Unspecified, 1=New, 2=Processed, 3=Discarded, 4=Archived
// Severity: 0=Unspecified, 1=Info, 2=Warning, 3=Minor, 4=Major, 5=Critical
// AlarmState: 0=Unspecified, 1=Active, 2=Acknowledged, 3=Cleared, 4=Suppressed
```

### Columns (`l8security-events-columns.js`)

**EventRecord columns:**
- `eventId` — Event ID
- `category` — Category (enum renderer)
- `eventType` — Event Type
- `severity` — Severity (status renderer with color classes)
- `state` — State (enum renderer)
- `sourceName` — Source
- `message` — Message
- `occurredAt` — Occurred At (date renderer)

**AlarmRecord columns:**
- `alarmId` — Alarm ID
- `name` — Name
- `severity` — Severity (status renderer)
- `state` — State (status renderer with color: Active=red, Acknowledged=amber, Cleared=green, Suppressed=gray)
- `sourceName` — Source
- `occurrenceCount` — Count
- `firstOccurrence` — First Seen (date renderer)
- `lastOccurrence` — Last Seen (date renderer)
- `acknowledgedBy` — Ack By

### Tab initialization (`l8security-events-tab.js`)

- Adds "Events" and "Alarms" sub-tabs within the Security section (alongside Users, Roles, Credentials)
- Events table: **read-only** — no Add/Edit/Delete buttons. Events are created by the system, not by users.
- Alarms table: read-only for the table, but alarm detail popup can show:
  - State history (child `stateHistory` entries — read-only inline table)
  - Notes (`notes` — read-only inline table)
  - Action buttons: Acknowledge, Clear (PATCH alarm state via existing `state.Transition()`)

### Integration into existing security tab system

The main security tab controller (`l8security.js` or the SYS section HTML) needs to register the Events/Alarms tabs. This should be done in a way that is **conditional** — the tabs only appear if the Events service endpoint is configured/available. This way projects that don't activate l8events services don't see empty tabs.

Pattern:
```javascript
// In l8security-events-tab.js
// Only register if events service area is known
L8Security.events = {
    eventsServiceArea: 75,
    alarmsServiceArea: 76,
    init: function(container) { /* create tables */ }
};
```

### Desktop
- Security section HTML gets two new tab buttons: "Events" and "Alarms"
- Each tab renders a read-only `Layer8DTable` pointing to the Events/Alarms service endpoint
- Alarm detail popup shows state history + notes + action buttons

### Mobile
- Mobile security nav config gets "Events" and "Alarms" entries
- Read-only card-based list view for both
- Alarm detail shows same info as desktop

### Script includes
Add the 3 new JS files to the l8ui security script loading (both desktop `app.html` and mobile `m/app.html` in consuming projects).

---

## Traceability Matrix

| # | Item | Phase |
|---|------|-------|
| 1 | EventRecordList / AlarmRecordList missing from proto | Phase 1 |
| 2 | No EventService with Activate function | Phase 2 |
| 3 | AlarmService belongs in l8alarms (out of scope) | Phase 3 (deferred — separate l8alarms plan) |
| 4 | No top-level ActivateEventServices entry point | Phase 4 |
| 5 | No helper API for emitting events (PostEvent, PostAuditEvent, PostSecurityEvent) | Phase 4b |
| 6 | Graceful no-op when events service not activated | Phase 4b |
| 7 | l8erp needs to vendor and activate the services | Phase 5 |
| 8 | l8erp needs UI type registration for EventRecord/AlarmRecord | Phase 5 |
| 9 | l8erp needs ScopeView rules for events/alarms | Phase 5 |
| 10 | EventCategory/EventState/Severity/AlarmState enum UI mappings missing | Phase 6 |
| 11 | No EventRecord column definitions in l8ui | Phase 6 |
| 12 | No AlarmRecord column definitions in l8ui | Phase 6 |
| 13 | No Events/Alarms tab registration in security section | Phase 6 |
| 14 | Events tab must be read-only (immutable events) | Phase 6 |
| 15 | Alarm detail popup with state history + notes + action buttons | Phase 6 |
| 16 | Conditional tab display (only if events service is active) | Phase 6 |
| 17 | Desktop security section HTML needs Events/Alarms tabs | Phase 6 |
| 18 | Mobile security nav needs Events/Alarms entries | Phase 6 |
| 19 | Script includes in app.html / m/app.html for new JS files | Phase 6 |

---

## Phase 7: End-to-End Verification

1. Build l8events: `cd l8events/go && go build ./...`
2. Vendor refresh in l8erp
3. Build l8erp: `cd l8erp/go && go build ./...`
4. Start locally via `run-local.sh`
5. Verify:
   - [ ] Events service responds to GET with L8Query
   - [ ] Events service accepts POST (creates event with auto-generated ID)
   - [ ] Events service rejects PUT (immutable)
   - [ ] Alarms service responds to GET, POST, PATCH
   - [ ] Alarm state transitions work via PATCH (ACTIVE → ACKNOWLEDGED → CLEARED)
   - [ ] SYS Security → Audit Events tab loads and displays events table
   - [ ] Admin user can see all events
   - [ ] Operator user can see events (read-only)
   - [ ] Mobile audit events view works

---

## Notes

- **ServiceArea 75/76**: Verify these don't collide with any existing service areas in l8secure or l8erp. l8secure uses 73 (users) and 74 (roles). l8erp uses areas starting from 10.
- **MaintenanceWindow service**: Optional — can be added later if needed. The type exists but may not need a service until maintenance window suppression is wired.
- **Event immutability**: EventRecord rejects PUT per the proto comment. Only PATCH for state transitions is allowed.
