# ERP by Layer 8

<p align="center">
  <img src="go/erp/ui/web/l8ui/images/logo.gif" alt="ERP by Layer 8 Logo" width="120">
</p>

<p align="center">
  <strong>Enterprise Resource Planning System</strong><br>
  with an AI agent that never sees your sensitive data
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Go%201.25-00ADD8?style=flat-square&logo=go" alt="Go">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript" alt="JavaScript">
  <img src="https://img.shields.io/badge/Serialization-Protobuf-4285F4?style=flat-square&logo=google" alt="Protobuf">
  <img src="https://img.shields.io/badge/Deploy-Kubernetes-326CE5?style=flat-square&logo=kubernetes" alt="Kubernetes">
  <img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square" alt="License">
</p>

<h1 align="center">
  🚀 <a href="https://www.l8erp.one">TRY THE LIVE DEMO → www.l8erp.one</a>
</h1>

<p align="center">
  <a href="https://www.l8erp.one"><img src="https://img.shields.io/badge/%E2%96%B6%20LIVE%20DEMO-www.l8erp.one-0070f3?style=for-the-badge&labelColor=111111" alt="Live demo" height="44"></a>
</p>

<p align="center">
  <strong>Username:</strong> <code>operator</code> &nbsp;·&nbsp; <strong>Password:</strong> <code>Oper123!</code><br>
  Log in, open the chat bubble at the bottom right, and ask <strong>Tanto</strong> about the company.
</p>

---

## Why the AI is different

Most AI assistants send your records to the model. **Tanto (Layer8)**, the AI agent built into ERP by Layer 8, sends tokens.

Tanto is a participant in the ERP's built-in team chat ([l8ai](https://github.com/saichler/l8ai)). It answers questions with live queries against the ERP and can create and update records on request. It is designed so that a leaked prompt, a curious model provider or an over-eager agent never exposes what it should not:

| | Typical bolt-on AI assistant | Tanto in ERP by Layer 8 |
|---|---|---|
| **Sensitive values** | Sent to the model provider in clear text | Replaced with tokens before the model; restored only in the answer shown to you |
| **What is sensitive** | Guessed from field names, or not considered | Declared in the data model, enforced from the compiled schema |
| **Identity** | A service account or broad API key | The requesting user, with their permissions |
| **Agent credentials** | A bot account that can be stolen | None: the agent is not a user |
| **Data volume** | Whatever the tool returns | Bounded lists; totals use aggregates |
| **Model choice** | One vendor's cloud | Any provider, including self-hosted, per conversation |

### How sensitive data is kept from the AI

1. **Declared in the data model.** A sensitive field carries one annotation in its `.proto`: `[(l8ai.AIMask) = true]`. The ERP marks **237 fields** this way: names and dates of birth, national IDs and SSNs, emails, phones and addresses, bank account and routing numbers, salaries and payroll totals, equity grants, performance ratings, signatures, IP addresses and data-source credentials. The agent reads the annotation from the generated descriptors at run time. It never guesses from field names. `go/tests/aimask` fails if a known sensitive field loses its annotation.
2. **Masked before the model.** In every tool result, a masked value (and any aggregate over it, such as `sum(salary.amount)`) is replaced with a deterministic token, `[MASK_<HMAC(secret, conversation|value)>]`. The same value gets the same token throughout a conversation, across turns and agent instances, so the model can still compare and group values it cannot read.
3. **Typed text is masked too.** SSNs, money amounts, emails and phone numbers in user messages and conversation summaries are tokenized by their shape.
4. **Restored only for you.** Tokens in the model's reply are swapped back to the real values only in the message shown to the user, who is already allowed to see them. The unmask map is built per call and is never shared or persisted.
5. **Tool results are not replayed.** Raw query results are not carried from turn to turn; only the assistant's final text is kept.

### AI security model

- **Runs as you.** Every tool call carries the requesting user's identity, so row scope and deny rules apply exactly as they do in the UI. If the session has expired, the turn ends with a message asking the user to sign in again. It never falls back to another identity.
- **The agent is not a user.** Tanto has no login, password or role, so there are no credentials to steal. A reply is accepted only from a verified `ChatAgent` instance carrying the conversation's current turn id, so no browser token can post as Tanto.
- **No bulk extraction.** An unbounded `select *` is rejected: lists need an id filter or a `limit` of at most 100, and totals must use aggregates (`count`, `sum`, `avg`, `min`, `max`).
- **Your model, centrally managed.** LLM providers and profiles, including their API keys, live in the security service (l8secure). Use Anthropic or any OpenAI-compatible endpoint, including models on your own servers. Users pick the profile per conversation. The demo runs on self-hosted open-weight models.
- **Masking is not access control.** Masking keeps values from the LLM. What a user may see is still decided by l8secure.

### The chat

- Direct messages, groups, presence (online, away, custom), file sharing and Markdown answers with copy, in a bubble on every screen, on desktop and mobile
- Live over websockets, applied in order, with automatic gap filling after a reconnect
- Scalable services, designed for 20,000 users: `chat-router`, in-memory `chat` instances, a transactional `chat-orm`, `chat-users` for presence and groups, and horizontally scaled `chat-agent` instances

---

## Overview

ERP by Layer 8 is a comprehensive Enterprise Resource Planning system built from the ground up with Go. It provides a unified platform for managing all aspects of an organization — from financial operations and human capital to supply chain, manufacturing, sales, and beyond.

With **13 modules**, **256 business services**, and **79 protobuf schemas** defining **673 message types** and **300 enums**, the system covers the complete enterprise lifecycle:

- **Financial Management** — GL, AP, AR, Cash, Fixed Assets, Budgeting, Tax
- **Human Capital** — Core HR, Payroll, Benefits, Talent, Learning, Compensation, Time & Attendance
- **Supply Chain** — Procurement, Inventory, Warehouse, Logistics, Planning
- **Manufacturing** — Engineering, Production, Planning, Quality, Costing, Shopfloor
- **Sales & Distribution** — Customers, Orders, Pricing, Shipping, Billing, Analytics
- **CRM** — Accounts, Leads, Opportunities, Campaigns, Field Service
- **Project Management** — Planning, Resources, Time & Expense, Billing, Analytics
- **Business Intelligence** — Dashboards, Reports, Analytics, KPIs, Data Management
- **Document Management** — Storage, Workflows, Signatures, Compliance, Integration
- **E-Commerce** — Catalog, Orders, Customers, Promotions
- **Compliance & Risk** — Regulatory, Controls, Risk, Audit
- **Lending** — Loan Products, Applications, Credit Lines, Collateral, Payments
- **System Administration** — Module Selection, Dependencies, Configuration

Part of the **Layer 8 Ecosystem**, this ERP system benefits from shared infrastructure components including ORM, serialization, service framework, virtual networking, and web server.

## Features

- **256 Business Services** across 13 integrated modules
- **6 Role-Based Portals** — Employee Self-Service, Manager, Customer, Vendor, Partner, and Project Client portals (desktop + mobile)
- **8 Data View Types** — Table, Chart, Kanban, Calendar, Timeline, Gantt, Tree Grid, and Wizard with per-service view switching
- **Desktop + Mobile Apps** — full-featured web and mobile interfaces with complete view parity
- **Tanto AI Agent** — answers from live ERP data with sensitive fields masked before the LLM, running as the requesting user (see [Why the AI is different](#why-the-ai-is-different))
- **Team Chat** — direct messages, groups, presence and files on every screen, desktop and mobile, with the AI agent as one participant
- **Live Updates** — open tables, dashboard KPIs and chat update over websockets as data changes
- **Dashboard** — cross-module statistics and KPI overview
- **Module Selection** — enable/disable modules at runtime with automatic dependency management
- **System Dependency Map** — visual module dependency graph for configuration
- **Data Import** — CSV, JSON, and XML import with AI-assisted column mapping
- **Multi-Currency Support** — real-time exchange rate conversion across all financial fields
- **Protobuf Data Model** — 79 schema files defining 673 message types with cross-module references
- **Mock Data Generation** — realistic test data generators covering all 256 services with phased dependency ordering
- **Validation Framework** — declarative validation builder with required fields, enums, and reference checks
- **Factory-Driven UI** — shared factories for forms, columns, enums, references, sections, and SVG
- **Full Audit Trail** — complete transaction history across all modules
- **Marketing Site** — product landing page with architecture, modules, proof, and getting started pages
- **API-First Design** — RESTful APIs for all services with L8Query language
- **Kubernetes Native** — deploy on any K8s cluster with 6 included manifests
- **Zero Frontend Dependencies** — pure vanilla JavaScript, no build step required
- **Comprehensive Tests** — 770 Playwright end-to-end tests (desktop + mobile) against the real images on a Kubernetes (KIND) cluster, plus Go service tests

## Modules

| Module | Services | Description |
|--------|----------|-------------|
| **Human Capital (HCM)** | 58 | Core HR, Payroll, Benefits, Talent, Learning, Compensation, Time & Attendance |
| **Supply Chain (SCM)** | 30 | Procurement, Inventory, Warehouse, Logistics, Planning |
| **Financial Management (FIN)** | 29 | GL, AP, AR, Cash, Fixed Assets, Budgeting, Tax |
| **CRM** | 23 | Accounts, Leads, Opportunities, Campaigns, Marketing, Field Service |
| **Project Management (PRJ)** | 22 | Planning, Resources, Time & Expense, Billing, Analytics |
| **Manufacturing (MFG)** | 19 | Engineering, Production, Planning, Quality, Costing, Shopfloor |
| **Sales & Distribution** | 18 | Customers, Orders, Pricing, Shipping, Billing, Analytics |
| **Business Intelligence (BI)** | 14 | Dashboards, Reports, Analytics, KPIs, Data Sources |
| **E-Commerce (ECOM)** | 13 | Catalog, Orders, Customers, Promotions |
| **Document Management (DOC)** | 11 | Storage, Workflows, Signatures, Compliance, Integration |
| **Compliance & Risk (COMP)** | 11 | Regulatory, Controls, Risk, Audit |
| **Lending (LEND)** | 6 | Loan Products, Applications, Credit Lines, Collateral, Payments |
| **System Administration (SYS)** | 2 | Module Configuration & Dependencies |
| **Total** | **256** | |

## Quick Start

### Prerequisites

- Go 1.25 or later
- Docker (for PostgreSQL and deployment)

### Run Locally (KIND)

```bash
# Clone the repository
git clone https://github.com/saichler/l8erp.git
cd l8erp/k8s

# Create the KIND cluster, deploy l8erp and seed mock data
./kind-start.sh

# Tear it down
./kind-stop.sh
```

All testing runs end-to-end against this cluster with Playwright; see `e2e/README.md`.

### Access the Application

| Page | URL |
|------|-----|
| Marketing Site | http://localhost:2773/ |
| Login | http://localhost:2773/login/ |
| Desktop App | http://localhost:2773/app.html |
| Mobile App | http://localhost:2773/m/ |
| ESS Portal | http://localhost:2773/ess.html |
| Manager Portal | http://localhost:2773/mgr.html |
| Customer Portal | http://localhost:2773/customer.html |
| Vendor Portal | http://localhost:2773/vendor.html |
| Partner Portal | http://localhost:2773/partner.html |
| Project Client Portal | http://localhost:2773/projclient.html |

### Demo Credentials

| Field | Value |
|-------|-------|
| Username | `operator` |
| Password | `Oper123!` |

### Docker Deployment

```bash
# Build all images
./go/build-all-images.sh

# Or build individually
docker build -t erp-main -f go/erp/main/Dockerfile go/
docker build -t erp-web -f go/erp/ui/Dockerfile go/
```

### Kubernetes Deployment

```bash
# Deploy all components
cd k8s && ./deploy.sh

# Components:
#   erp-vnet        — Virtual network overlay
#   erp-logs-vnet   — Log aggregation vnet
#   erp-log-agent   — Log collection agent
#   erp             — ERP backend services
#   erp-chat-orm    — Chat database (transactional)
#   erp-chat        — Chat instances (in-memory, conversation owners)
#   erp-chat-router — Routes each conversation to its owning instance
#   erp-chat-users  — Presence and groups
#   erp-chat-agent  — Tanto, the AI agent
#   erp-web         — Web UI

# Teardown
./undeploy.sh
```

## Project Structure

```
l8erp/
├── proto/                       # 79 Protocol Buffer definitions (~14,800 lines)
│   ├── erp-common.proto         #   Shared types (Money, Address, AuditInfo, DateRange)
│   ├── hcm-*.proto              #   HCM module (8 schemas)
│   ├── fin-*.proto              #   Financial module (8 schemas)
│   ├── scm-*.proto              #   SCM module (7 schemas)
│   ├── mfg-*.proto              #   Manufacturing module (7 schemas)
│   ├── sales-*.proto            #   Sales module (7 schemas)
│   ├── crm-*.proto              #   CRM module (7 schemas)
│   ├── prj-*.proto              #   Projects module (6 schemas)
│   ├── bi-*.proto               #   BI module (5 schemas)
│   ├── doc-*.proto              #   Documents module (5 schemas)
│   ├── ecom-*.proto             #   E-Commerce module (5 schemas)
│   ├── comp-*.proto             #   Compliance module (5 schemas)
│   ├── lend-*.proto             #   Lending module (7 schemas)
│   └── make-bindings.sh         #   Generates Go types from proto files
├── go/
│   ├── erp/
│   │   ├── common/              # Shared: validation builder, service factory, defaults
│   │   ├── services/            # Module activation (activate_hcm.go, activate_fin.go, ...)
│   │   ├── chat/                # Chat instances (l8ai) + Dockerfile
│   │   ├── chat-router/         # Chat router + Dockerfile
│   │   ├── chat-users/          # Presence and groups + Dockerfile
│   │   ├── chat-orm/            # Chat database service + Dockerfile
│   │   ├── chat-agent/          # Tanto, the AI agent (system prompt, help docs) + Dockerfile
│   │   ├── hcm/                 # Human Capital Management (58 services)
│   │   ├── fin/                 # Financial Management (29 services)
│   │   ├── scm/                 # Supply Chain Management (30 services)
│   │   ├── mfg/                 # Manufacturing (19 services)
│   │   ├── sales/               # Sales & Distribution (18 services)
│   │   ├── crm/                 # CRM (23 services)
│   │   ├── prj/                 # Project Management (22 services)
│   │   ├── bi/                  # Business Intelligence (14 services)
│   │   ├── doc/                 # Document Management (11 services)
│   │   ├── ecom/                # E-Commerce (13 services)
│   │   ├── comp/                # Compliance & Risk (11 services)
│   │   ├── lend/                # Lending (6 services)
│   │   ├── sys/                 # System Administration (2 services)
│   │   ├── main/                # ERP backend entry point + Dockerfile
│   │   ├── ui/                  # Web server + UI assets
│   │   │   ├── main1/           #   Web server entry point
│   │   │   └── web/             #   Web application root
│   │   │       ├── app.html     #     Desktop application shell
│   │   │       ├── ess.html     #     Employee Self-Service portal
│   │   │       ├── mgr.html     #     Manager portal
│   │   │       ├── customer.html #    Customer portal
│   │   │       ├── vendor.html  #     Vendor portal
│   │   │       ├── partner.html #     Partner portal
│   │   │       ├── projclient.html #  Project Client portal
│   │   │       ├── l8ui/        #     Shared UI library (submodule)
│   │   │       ├── erp-ui/      #     ERP-specific UI (SVG templates, section configs)
│   │   │       ├── sections/    #     Section HTML files (15 sections)
│   │   │       ├── dashboard/   #     Cross-module dashboard
│   │   │       ├── hcm/         #     HCM UI (config, enums, columns, forms per submodule)
│   │   │       ├── fin/         #     Financial UI
│   │   │       ├── scm/         #     SCM UI
│   │   │       ├── mfg/         #     Manufacturing UI
│   │   │       ├── sales/       #     Sales UI
│   │   │       ├── crm/         #     CRM UI
│   │   │       ├── prj/         #     Projects UI
│   │   │       ├── bi/          #     BI UI
│   │   │       ├── documents/   #     Documents UI
│   │   │       ├── ecom/        #     E-Commerce UI
│   │   │       ├── comp/        #     Compliance UI
│   │   │       ├── lending/     #     Lending UI
│   │   │       ├── js/          #     Shared JS (reference registries, sections, utils)
│   │   │       ├── marketing/   #     Marketing site (architecture, modules, proof, start, about)
│   │   │       ├── m/           #     Mobile app + portals (full view parity with desktop)
│   │   │       └── login/       #     Login page
│   │   └── vnet/                # Virtual network layer + Dockerfile
│   ├── logs/                    # Log infrastructure
│   │   ├── agent/               #   Log collection agent + Dockerfile
│   │   └── vnet/                #   Log aggregation vnet + Dockerfile
│   ├── maint/                   # Maintenance service + Dockerfile
│   ├── types/                   # Generated Go types from protobuf (~138,900 lines)
│   ├── tests/                   # Test suite
│   │   ├── *_test.go            #   27 test files (getters + handlers per module)
│   │   └── mocks/               #   Mock data generators (130 files)
│   │       ├── data_*.go        #     Curated name/data arrays per module
│   │       ├── gen_*.go         #     Entity generators (80 files)
│   │       ├── *_phases*.go     #     Phase orchestration
│   │       ├── store*.go        #     Shared mock data store (ID slices per module)
│   │       └── utils.go         #     Helpers (pickRef, randomMoney, genID, genLines, ...)
│   └── vendor/                  # Vendored Go dependencies
├── e2e/                         # Playwright end-to-end suite (desktop + mobile)
├── k8s/                         # Kubernetes manifests (KIND, local, bare metal, GKE) + scripts
└── tools/                       # Dev tools (REST client, migration scripts)
```

## Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                     Presentation Layer                         │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│   │ Desktop App │  │ Mobile App  │  │ REST API    │          │
│   │ (Vanilla JS)│  │ (Vanilla JS)│  │ Clients     │          │
│   └─────────────┘  └─────────────┘  └─────────────┘          │
├───────────────────────────────────────────────────────────────┤
│                     Application Layer                          │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│   │ Service  │ │ Validate │ │ Business │ │ Type     │        │
│   │ Framework│ │ Builder  │ │ Logic    │ │ Registry │        │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├───────────────────────────────────────────────────────────────┤
│                       Data Layer                               │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│   │ L8 ORM   │ │ Protobuf │ │ L8 Query │ │PostgreSQL│        │
│   │          │ │ Srlz     │ │ Language │ │          │        │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├───────────────────────────────────────────────────────────────┤
│                   Infrastructure Layer                         │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│   │Kubernetes│ │ Docker   │ │ L8 Bus   │ │ L8 Web   │        │
│   │          │ │          │ │ (VNet)   │ │ Server   │        │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
└───────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Backend | Go 1.25 |
| Database | PostgreSQL 14+ |
| Frontend | Vanilla JavaScript (zero dependencies, no build step) |
| AI | l8ai agent; Anthropic or any OpenAI-compatible LLM, hosted or self-hosted |
| UI Library | [l8ui](https://github.com/saichler/l8ui) (shared component framework) |
| API | REST with L8Query language |
| Serialization | Protocol Buffers |
| Container | Docker |
| Orchestration | Kubernetes |
| Networking | Layer 8 Bus (Virtual Network Overlay) |
| ORM | Layer 8 ORM with L8 Query Language |

## Layer 8 Ecosystem

This ERP is built on top of the Layer 8 open-source infrastructure:

| Component | Purpose |
|-----------|---------|
| [l8ai](https://github.com/saichler/l8ai) | Scalable chat and the Tanto AI agent with sensitive-field masking |
| l8secure | Security: users, roles, permissions, LLM providers and profiles |
| [l8ui](https://github.com/saichler/l8ui) | Shared UI component library (tables, forms, charts, kanban, chat, etc.) |
| [l8bus](https://github.com/saichler/l8bus) | Message bus and virtual network overlay |
| [l8orm](https://github.com/saichler/l8orm) | Object-relational mapping |
| [l8services](https://github.com/saichler/l8services) | Service framework (activation, callbacks, routing) |
| [l8web](https://github.com/saichler/l8web) | Web server framework |
| [l8reflect](https://github.com/saichler/l8reflect) | Reflection and introspection utilities |
| [l8srlz](https://github.com/saichler/l8srlz) | Serialization (protobuf-based) |
| [l8types](https://github.com/saichler/l8types) | Common types and interfaces |
| [l8utils](https://github.com/saichler/l8utils) | Shared utilities |
| [l8test](https://github.com/saichler/l8test) | Testing framework |

## Codebase Statistics

| Category | Files | Lines |
|----------|-------|-------|
| Go source (hand-written) | 771 | ~59,400 |
| Go types (generated from protobuf) | — | ~138,900 |
| JavaScript (ERP-specific) | 379 | ~29,600 |
| JavaScript (l8ui shared library) | 150 | ~30,600 |
| CSS (ERP-specific) | 50 | ~7,600 |
| CSS (l8ui shared library) | 56 | ~12,200 |
| HTML | 46 | — |
| Protobuf schemas | 79 | ~14,800 |
| Protobuf enums | 300 | — |
| Mock data generators | 80 | — |
| Mock data files (total) | 130 | — |
| Test files | 27 | — |

## UI Architecture

The frontend is a zero-dependency vanilla JavaScript application with full desktop and mobile parity.

### Shared UI Library (l8ui)

The [l8ui](https://github.com/saichler/l8ui) submodule provides reusable components for both desktop and mobile:

- **Table** — paginated data grid with sorting, filtering, and inline editing
- **Chart** — bar, line, pie, and area charts with theme-aware colors
- **Kanban** — drag-and-drop lane-based board
- **Calendar** — month/week/day event views
- **Timeline** — chronological event visualization
- **Gantt** — project scheduling and dependency charts
- **Tree Grid** — hierarchical data display
- **Wizard** — multi-step guided workflows
- **Dashboard** — configurable widget grid with stats cards
- **Forms** — field factory with 15+ field types (text, select, money, date, reference, inline table, etc.)
- **Reference Picker** — searchable lookup for cross-entity references
- **Popup** — stacking modal system with scoped DOM queries
- **Navigation** — module/submodule/service card-based navigation

### Factory-Driven Module Pattern

Each ERP module's UI consists of configuration-only files — all behavioral logic lives in shared factories:

```
<module>/
├── <module>-config.js          # Service definitions and endpoints
├── <module>-init.js            # ~10 lines: Layer8DModuleFactory.create() call
└── <submodule>/
    ├── <submodule>-enums.js    # Status/type/priority enums via Layer8EnumFactory
    ├── <submodule>-columns.js  # Table columns via Layer8ColumnFactory
    └── <submodule>-forms.js    # Form fields via Layer8FormFactory
```

## Development

### Running Tests

```bash
cd go

# Run all service tests
go test ./tests/...

# Generate mock data (requires running server)
go run ./tests/mocks/cmd/
```

### Building

```bash
cd go

# Build all packages
go build ./...

# Regenerate protobuf types (after modifying .proto files)
cd ../proto && ./make-bindings.sh
```

### UI Development

The frontend uses no build tools. Edit files in `go/erp/ui/web/` and refresh the browser.

### Local Development and Testing

Local runs and all testing use a KIND cluster plus the Playwright suite:

1. `k8s/kind-start.sh` creates the cluster, loads the local images, deploys every service and seeds mock data (`k8s/seed-mocks.sh`)
2. `cd e2e && npm test` runs the desktop and mobile end-to-end suites
3. `k8s/kind-stop.sh` deletes the cluster

## License

This project is licensed under the Apache License 2.0 — see the [LICENSE](LICENSE) file for details.

## Powered By

<p align="center">
  <img src="go/erp/ui/web/l8ui/images/Layer8Logo.gif" alt="Layer 8 Ecosystem" width="80">
  <br>
  <strong>Layer 8 Ecosystem</strong>
</p>

---

<p align="center">
  <sub>Built with care by Layer 8</sub>
</p>
