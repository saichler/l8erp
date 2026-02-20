# ERP by Layer 8

<p align="center">
  <img src="go/erp/ui/web/l8ui/images/logo.gif" alt="ERP by Layer 8 Logo" width="120">
</p>

<p align="center">
  <strong>Enterprise Resource Planning System</strong><br>
  Built for the Modern Enterprise
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Go%201.25-00ADD8?style=flat-square&logo=go" alt="Go">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript" alt="JavaScript">
  <img src="https://img.shields.io/badge/Serialization-Protobuf-4285F4?style=flat-square&logo=google" alt="Protobuf">
  <img src="https://img.shields.io/badge/Deploy-Kubernetes-326CE5?style=flat-square&logo=kubernetes" alt="Kubernetes">
  <img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square" alt="License">
</p>

<p align="center">
  <a href="https://www.l8erp.one"><strong>Live Site</strong></a>
</p>

---

## Overview

ERP by Layer 8 is a comprehensive Enterprise Resource Planning system built from the ground up with Go. It provides a unified platform for managing all aspects of an organization — from financial operations and human capital to supply chain, manufacturing, sales, and beyond.

With **12 modules**, **242 business services**, and **72 protobuf schemas** defining **410 entity types**, the system covers the complete enterprise lifecycle:

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
- **System Administration** — Module Selection, Dependencies, Configuration

Part of the **Layer 8 Ecosystem**, this ERP system benefits from shared infrastructure components including ORM, serialization, service framework, virtual networking, and web server.

## Features

- **242 Business Services** across 12 integrated modules
- **8 Data View Types** — Table, Chart, Kanban, Calendar, Timeline, Gantt, Tree Grid, and Wizard with per-service view switching
- **Desktop + Mobile Apps** — full-featured web and mobile interfaces with complete view parity
- **Module Selection** — enable/disable modules at runtime with automatic dependency management
- **System Dependency Map** — visual module dependency graph for configuration
- **Multi-Currency Support** — real-time exchange rate conversion across all financial fields
- **Protobuf Data Model** — 72 schema files defining 410 entity types with cross-module references
- **Mock Data Generation** — realistic test data generators for all services with phased dependency ordering
- **Validation Framework** — declarative validation builder with required fields, enums, and reference checks
- **Factory-Driven UI** — shared factories for forms, columns, enums, references, sections, and SVG
- **Full Audit Trail** — complete transaction history across all modules
- **API-First Design** — RESTful APIs for all services
- **Kubernetes Native** — deploy on any K8s cluster with included manifests
- **Zero Frontend Dependencies** — pure vanilla JavaScript, no build step required
- **Comprehensive Tests** — 25 test files covering service getters and handlers

## Modules

| Module | Services | Description |
|--------|----------|-------------|
| **Human Capital (HCM)** | 57 | Core HR, Payroll, Benefits, Talent, Learning, Compensation, Time & Attendance |
| **Supply Chain (SCM)** | 29 | Procurement, Inventory, Warehouse, Logistics, Planning |
| **Financial Management (FIN)** | 28 | GL, AP, AR, Cash, Fixed Assets, Budgeting, Tax |
| **CRM** | 22 | Accounts, Leads, Opportunities, Campaigns, Marketing, Field Service |
| **Project Management (PRJ)** | 21 | Planning, Resources, Time & Expense, Billing, Analytics |
| **Manufacturing (MFG)** | 18 | Engineering, Production, Planning, Quality, Costing, Shopfloor |
| **Sales & Distribution** | 17 | Customers, Orders, Pricing, Shipping, Billing, Analytics |
| **Business Intelligence (BI)** | 14 | Dashboards, Reports, Analytics, KPIs, Data Sources |
| **E-Commerce (ECOM)** | 13 | Catalog, Orders, Customers, Promotions |
| **Document Management (DOC)** | 11 | Storage, Workflows, Signatures, Compliance, Integration |
| **Compliance & Risk (COMP)** | 11 | Regulatory, Controls, Risk, Audit |
| **System Administration (SYS)** | 1 | Module Configuration & Dependencies |
| **Total** | **242** | |

## Quick Start

### Prerequisites

- Go 1.25 or later
- PostgreSQL 14 or later

### Run Locally

```bash
# Clone the repository
git clone https://github.com/saichler/l8erp.git
cd l8erp

# Run the web server
go run ./go/erp/ui/main1/

# Generate mock data (optional, in a separate terminal)
go run ./go/tests/mocks/
```

### Access the Application

| Page | URL |
|------|-----|
| Marketing Site | http://localhost:2773/ |
| Login | http://localhost:2773/login/ |
| Desktop App | http://localhost:2773/app.html |
| Mobile App | http://localhost:2773/m/ |

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
kubectl apply -f k8s/

# Components:
#   erp-web  (DaemonSet)    — Web UI on all nodes
#   erp-main (StatefulSet)  — ERP services with persistent storage
#   vnet     (DaemonSet)    — Virtual network overlay
```

## Project Structure

```
l8erp/
├── proto/                       # 72 Protocol Buffer definitions (~14,200 lines)
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
│   └── make-bindings.sh         #   Generates Go types from proto files
├── go/
│   ├── erp/
│   │   ├── common/              # Shared: validation builder, service factory, defaults
│   │   ├── services/            # Module activation (activate_hcm.go, activate_fin.go, ...)
│   │   ├── hcm/                 # Human Capital Management (57 services)
│   │   ├── fin/                 # Financial Management (28 services)
│   │   ├── scm/                 # Supply Chain Management (29 services)
│   │   ├── mfg/                 # Manufacturing (18 services)
│   │   ├── sales/               # Sales & Distribution (17 services)
│   │   ├── crm/                 # CRM (22 services)
│   │   ├── prj/                 # Project Management (21 services)
│   │   ├── bi/                  # Business Intelligence (14 services)
│   │   ├── doc/                 # Document Management (11 services)
│   │   ├── ecom/                # E-Commerce (13 services)
│   │   ├── comp/                # Compliance & Risk (11 services)
│   │   ├── sys/                 # System Administration (1 service)
│   │   ├── main/                # ERP service entry point + Dockerfile
│   │   ├── ui/                  # Web server + UI assets
│   │   │   ├── main1/           #   Web server entry point
│   │   │   └── web/             #   Web application root
│   │   │       ├── app.html     #     Desktop application shell
│   │   │       ├── l8ui/        #     Shared UI framework (factories, navigation, CRUD, forms)
│   │   │       ├── erp-ui/      #     ERP-specific UI (SVG templates, section configs)
│   │   │       ├── sections/    #     Section HTML files (13 sections)
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
│   │   │       ├── js/          #     Shared JS (reference registries, sections, utils)
│   │   │       ├── marketing/   #     Marketing landing page
│   │   │       ├── m/           #     Mobile app (239 JS files, full view parity with desktop)
│   │   │       └── login/       #     Login page
│   │   └── vnet/                # Virtual network layer + Dockerfile
│   ├── types/                   # Generated Go types from protobuf (~134,000 lines)
│   ├── tests/                   # Test suite
│   │   ├── *_test.go            #   25 test files (getters + handlers per module)
│   │   └── mocks/               #   Mock data generators (118 files)
│   │       ├── data_*.go        #     Curated name/data arrays per module
│   │       ├── gen_*.go         #     Entity generators (74 files)
│   │       ├── *_phases*.go     #     Phase orchestration
│   │       ├── store*.go        #     Shared mock data store
│   │       └── utils.go         #     Helpers (pickRef, randomMoney, genID, genLines, ...)
│   └── vendor/                  # Vendored Go dependencies
├── k8s/                         # Kubernetes manifests (erp, web, vnet)
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
| API | REST |
| Serialization | Protocol Buffers |
| Container | Docker |
| Orchestration | Kubernetes |
| Networking | Layer 8 Bus (Virtual Network Overlay) |
| ORM | Layer 8 ORM with L8 Query Language |

## Layer 8 Ecosystem

This ERP is built on top of the Layer 8 open-source infrastructure:

| Component | Purpose |
|-----------|---------|
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
| Go source (hand-written) | 663 | ~49,500 |
| Go types (generated from protobuf) | — | ~133,500 |
| JavaScript | 566 | ~67,600 |
| CSS | 82 | ~18,500 |
| HTML | 51 | — |
| Protobuf schemas | 72 | ~14,200 |
| Mock data generators | 74 | — |
| Test files | 25 | — |

## Development

### Running Tests

```bash
# Run all service tests
go test ./go/tests/...

# Generate mock data
go run ./go/tests/mocks/
```

### Building

```bash
# Build web server
go build -o erp-web ./go/erp/ui/main1/

# Build ERP service
go build -o erp-main ./go/erp/main/

# Build virtual network
go build -o erp-vnet ./go/erp/vnet/

# Regenerate protobuf types (after modifying .proto files)
cd proto && sed 's/-it /-i /g' make-bindings.sh | bash
```

### UI Development

The frontend uses no build tools. Edit files in `go/erp/ui/web/` and refresh the browser.

Each module's UI follows a consistent pattern:
- `<module>-config.js` — service definitions and endpoints
- `<submodule>-enums.js` — status/type/priority enums
- `<submodule>-columns.js` — table column definitions
- `<submodule>-forms.js` — form field definitions
- `<module>-init.js` — module initialization via `Layer8DModuleFactory.create()`

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
