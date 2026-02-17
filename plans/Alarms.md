# Layer 8 RCA / Event–Alarm–Correlation System — Functional Requirements (Competitive Baseline)

> Context: This requirements set assumes you will implement this system under your existing Layer 8 “global rules” (maintainability, Prime Object boundaries, no duplication, etc.). :contentReference[oaicite:0]{index=0}

---

## 1. What “competitive” means in this space (capability baseline)

Leading products in event/incident intelligence consistently provide:

- **High-volume ingestion + normalization** of heterogeneous signals (events, alerts, syslog, traps, audit, changes) into a common schema. :contentReference[oaicite:1]{index=1}
- **Noise reduction** via deduplication, suppression/muting, and intelligent grouping. :contentReference[oaicite:2]{index=2}
- **Correlation into “cases/episodes/incidents”** so responders work one situation, not 200 alerts. :contentReference[oaicite:3]{index=3}
- **Root-cause identification** (rule-based and/or ML/causal/topology-based) and “primary vs secondary” alert grouping. :contentReference[oaicite:4]{index=4}
- **Context enrichment** (CI/service ownership, topology, recent changes, runbooks) to accelerate triage. :contentReference[oaicite:5]{index=5}
- **Actioning + integrations** (incident creation, ticketing, on-call, automation) based on correlated situations. :contentReference[oaicite:6]{index=6}

This document translates those into concrete functional requirements.

---

## 2. Goals and non-goals

### 2.1 Goals
- Detect and ingest operational signals (syslog/traps/audit/app alerts/etc.)
- Convert signals into **Events → Alarms → Correlated Situations (Cases)**
- Identify likely **root cause** and impacted services/entities
- Enable humans and automation to resolve faster (lower MTTD/MTTR)

### 2.2 Non-goals (initially)
- Full CMDB/discovery replacement (but you must integrate with one)
- Full observability (metrics/traces/log analytics) replacement (but correlate with them)

---

## 3. Core domain objects (conceptual)

> Your Layer 8 Prime Object rule implies: **Event**, **Alarm**, **Case/Situation**, **CorrelationRule/Policy**, **EnrichmentSource**, **TopologyEntity**, **Incident/WorkItem** should be Prime Objects; “Alarm annotations”, “state transitions”, “match evidence” are typically embedded children. :contentReference[oaicite:7]{index=7}

- **Event**: raw-ish incoming signal (syslog line, SNMP trap, audit record, monitor alert, change event)
- **Alarm**: normalized, deduplicated alert object suitable for paging/triage
- **Case (Situation/Episode)**: correlated collection of alarms/events representing one operational issue
- **Correlation Evidence**: why alarms are related (same entity, topology, pattern, time window, rule hit)
- **Root Cause Candidate**: entity + reasoning + confidence + supporting alarms/events
- **Topology Entity**: service/CI/pod/node/router/etc. with relationships
- **Change Event**: deploy/config change used for enrichment and RCA acceleration :contentReference[oaicite:8]{index=8}

---

## 4. Functional requirements

### 4.1 Inges:contentReference[oaicite:9]{index=9}1 — Multi-source ingestion**
- System SHALL ingest signals from:
    - Syslog (RFC5424/3164)
    - SNMP traps (v2c/v3)
    - Webhook/HTTP (generic)
    - Message bus (Kafka/NATS/etc.)
    - File/agent forwarder (optional)
    - “Change” streams (CI/CD, ITSM change, config mgmt) :contentReference[oaicite:10]{index=10}

**FR-ING-02 — Ingestion reliability**
- SHALL support at-least-once ingestion with idempotency keys.
- SHALL persist raw payload + parsing metadata for forensics.

**FR-ING-03 — Connector framework**
- SHALL provide a plugin model for new source types (parsers + mappers + auth + backpressure).

**FR-ING-04 — Multi-tenant ingestion isolation**
- SHALL isolate tenants (routing, storage, RBAC) and prevent cross-tenant correlation.

---

### 4.2 Normalization and enrichment

**FR-NORM-01 — Canonical event model**
- System SHALL normalize all inputs into a canonical Event with at minimum:
    - eventId, sourceType, receivedAt, occurredAt
    - producer (host/device/app), environment, region/cluster
    - entity identifiers (CI/service/resource IDs)
    - severity, category, message, tags/attributes map
    - rawPayload reference

**FR-NORM-02 — Parsing pipeline**
- SHALL support:
    - Grok/regex parsing
    - JSON extraction
    - Key/value extraction
    - Vendor-specific syslog/trap parsers

**FR-ENR-01 — Context enrichment**
- System SHALL enrich Events/Alarms with:
    - ownership (team/on-call), service mapping
    - topology/relationships
    - runbook links
    - recent changes (deploy/config) where available :contentReference[oaicite:11]{index=11}

**FR-ENR-02 — Enrichment sources**
- SHALL integrate with one or more of:
    - CMDB / service catalog
    - Kubernetes API
    - Cloud resource APIs (AWS/Azure/GCP)
    - Git/CI/CD and change management tools

**FR-ENR-03 — Enrichment explainability**
- SHALL store enrichment provenance (which source, what version/time, what fields changed).

---

### 4.3 Alarm generation, deduplication, suppression (noise reduction)

**FR-ALM-01 — Alarm creation**
- System SHALL create/maintain Alarm objects derived from Events according to configurable rules.

**FR-ALM-02 — Deduplication**
- SHALL deduplicate repeated events into the same Alarm using an “aggregation/dedup key” (configurable), reducing noise. :contentReference[oaicite:12]{index=12}

**FR-ALM-03 — Suppression / muting**
- SHALL support suppression rules (drop from notification flow but retain for forensics). :contentReference[oaicite:13]{index=13}

**FR-ALM-04 — Alert grouping assistance**
- SHALL provide “intelligent grouping” options (rule-based initially; ML optional) to reduce alert fatigue. :contentReference[oaicite:14]{index=14}

**FR-ALM-05 — Alarm lifecycle**
- SHALL support states: New, Acknowledged, In-Progress, Suppressed, Resolved, Closed
- SHALL capture who/when/why for each transition (audit trail)

---

### 4.4 Correlation into Cases (Situations / Episodes)

**FR-COR-01 — Case creation**
- System SHALL correlate Alarms into a Case (Situation/Episode) representing one operational issue. :contentReference[oaicite:15]{index=15}

**FR-COR-02 — Correlation strategies**
The system SHALL support multiple correlation strategies, composable per tenant:
1. **Attribute-based** (same entity/service/app, same error signature)
2. **Time-window** (burst within N minutes)
3. **Topology-based** (related entities via dependency graph)
4. **Rule-based primary/secondary** (designate root alarm and group symptom alarms) :contentReference[oaicite:16]{index=16}
5. **Statistical/ML grouping** (optional/phase 2) :contentReference[oaicite:17]{index=17}

**FR-COR-03 — Case membership operations**
- SHALL automatically add/remove alarms to cases as conditions change.
- SHALL allow manual move/merge/split of alarms between cases (with audit).

**FR-COR-04 — Correlation evidence**
- SHALL store evidence for each membership decision:
    - strategy used, fields matched, topology path, time window, score/confidence

**FR-COR-05 — Case deduplication**
- SHALL prevent duplicate cases for the same underlying issue when new alarms arrive (configurable similarity).

---

### 4.5 Root cause analysis (RCA)

**FR-RCA-01 — Root cause candidate**
- System SHALL compute at least one root-cause candidate per Case:
    - candidate entity, confidence, explanation, supporting alarms/events

**FR-RCA-02 — Primary/secondary model**
- SHALL support “primary alert = root cause; secondary alerts = symptoms” groupings. :contentReference[oaicite:18]{index=18}

**FR-RCA-03 — Topology/causal RCA**
- SHALL support topology-aware RCA when dependency graph is available (identify causal topology and likely origin). :contentReference[oaicite:19]{index=19}

**FR-RCA-04 — Change-aware RCA**
- SHALL correlate recent change events (deploy/config) to cases and surface likely triggering changes. :contentReference[oaicite:20]{index=20}

**FR-RCA-05 — RCA input fusion**
- SHALL allow linking external telemetry references (logs/metrics/traces URLs or IDs) into the Case and RCA workflow. :contentReference[oaicite:21]{index=21}

**FR-RCA-06 — Human override**
- SHALL allow an operator to set/override root cause and record justification.

---

### 4.6 Operator workflow (triage → incident → resolution)

**FR-OPS-01 — Case console**
- SHALL provide a real-time console for:
    - Cases list (severity, impacted service, confidence, age, owner)
    - Case timeline (chronological alarms/events)
    - Root cause view + evidence
    - Impacted entities/services

**FR-OPS-02 — Episode/Case lifecycle**
- SHALL support auto-close when all alarms clear (configurable), and manual close. :contentReference[oaicite:22]{index=22}

**FR-OPS-03 — Assignment and ownership**
- SHALL assign cases to teams/users based on rules (service ownership, tags, schedules).
- SHALL support “watchers” and notes.

**FR-OPS-04 — Notifications**
- SHALL notify via: email, SMS, Slack/Teams, webhook, PagerDuty-like flows.
- SHALL support escalation policies and quiet hours.

**FR-OPS-05 — Runbooks and actions**
- SHALL attach runbooks/playbooks to services/case types.
- SHALL support action buttons (call automation/webhook) with RBAC.

---

### 4.7 Integrations (ITSM / On-call / automation)

**FR-INT-01 — Incident/ticket creation**
- SHALL create/update incidents in external systems (e.g., ServiceNow/Jira/etc.) from a Case and sync state bi-directionally where possible. (Competitive baseline: cases/episodes can trigger incident creation.) :contentReference[oaicite:23]{index=23}

**FR-INT-02 — On-call integration**
- SHALL integrate with on-call tooling for routing and incident creation/updates. :contentReference[oaicite:24]{index=24}

**FR-INT-03 — ChatOps**
- SHALL post Case updates into channels and accept commands (ack, assign, link, close) subject to RBAC.

**FR-INT-04 — Automation hooks**
- SHALL support event/case-based triggers (webhooks, workflows) with guardrails and audit logging.

---

### 4.8 Search, reporting, and analytics

**FR-ANA-01 — Query and search**
- SHALL support fast search across Events/Alarms/Cases by:
    - time range, entity, service, severity, tag filters
    - free-text over message
    - correlation/case id

**FR-ANA-02 — KPIs**
- SHALL compute operational KPIs:
    - noise reduction ratio (events→alarms→cases)
    - MTTD/MTTA/MTTR per service/team
    - top recurring case signatures, top root causes
    - suppression/dedup effectiveness (preview mode is a competitive pattern) :contentReference[oaicite:25]{index=25}

**FR-ANA-03 — Audit and compliance reporting**
- SHALL provide immutable audit trails for:
    - alarm/case state changes
    - manual correlation edits
    - RCA overrides
    - notification delivery and acknowledgments

---

### 4.9 Administration and configuration

**FR-ADM-01 — Policy management**
- SHALL provide CRUD for:
    - dedup policies (keys, windows)
    - suppression policies
    - correlation policies (strategies, weights, thresholds)
    - routing policies (team mapping)

**FR-ADM-02 — Rule testing / simulation**
- SHALL provide “dry run / preview” for dedup/grouping/correlation against historical data. :contentReference[oaicite:26]{index=26}

**FR-ADM-03 — Versioned configuration**
- SHALL version policies and support rollback.

**FR-ADM-04 — Tenancy and quotas**
- SHALL support per-tenant limits (ingest rate, retention, case volume) and metering.

---

### 4.10 Security and access control

**FR-SEC-01 — Authentication**
- SHALL support SSO (OIDC/SAML) and API tokens for ingestion.

**FR-SEC-02 — Authorization**
- SHALL support RBAC with least privilege:
    - viewer, operator, admin
    - scoped by tenant, service, environment

**FR-SEC-03 — Data protection**
- SHALL support encryption in transit and at rest.
- SHALL support PII/secret redaction in event payloads (configurable patterns).

---

## 5. Minimum “v1” that is still competitive

A viable competitive v1 (not “nice”, but real) should include:
1. Ingestion + canonical model + enrichment hooks :contentReference[oaicite:27]{index=27}
2. Dedup + suppression + basic grouping :contentReference[oaicite:28]{index=28}
3. Case correlation (attribute + time-window + topology-aware if topology exists) :contentReference[oaicite:29]{index=29}
4. Root-cause “primary/secondary” and at least one explainable RCA heuristic :contentReference[oaicite:30]{index=30}
5. Operator workflow (case console, assignment, notifications, incident creation) :contentReference[oaicite:31]{index=31}

---

## 6. Layer 8 alignment notes (implementation-guiding constraints)

- Keep Prime Objects strict (Event/Alarm/Case/Policy/etc.) and avoid cross-Prime deep object nesting; reference by IDs. :contentReference[oaicite:32]{index=32}
- Enforce “no duplicate code” and shared factories for ingestion pipelines, correlation strategies, and UI components. :contentReference[oaicite:33]{index=33}
- Keep files <500 LOC and split by responsibility (connector, normalize, correlate, RCA, workflow). :contentReference[oaicite:34]{index=34}

---

## 7. Glossary (short)

- **Event**: incoming signal
- **Alarm**: normalized, deduped actionable alert
- **Case/Situation/Episode**: correlated set representing one issue :contentReference[oaicite:35]{index=35}
- **Primary/Secondary**: root vs symptom alert grouping :contentReference[oaicite:36]{index=36}  
