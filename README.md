# ERP by Layer 8

<p align="center">
  <img src="go/erp/ui/web/images/logo.gif" alt="ERP by Layer 8 Logo" width="120">
</p>

<p align="center">
  <strong>Enterprise Resource Planning System</strong><br>
  Built for the Modern Enterprise
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Go-00ADD8?style=flat-square&logo=go" alt="Go">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript" alt="JavaScript">
  <img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square" alt="License">
</p>

---

## Overview

ERP by Layer 8 is a comprehensive Enterprise Resource Planning system designed for modern businesses. Built from the ground up with Go, it provides a unified platform for managing all aspects of your organization - from financial operations and human capital to supply chain, manufacturing, sales, and more.

With **12 fully implemented modules** and **371+ business services**, this ERP covers the complete enterprise lifecycle including:
- **Financial Management** - GL, AP, AR, Cash, Assets, Budgeting, Tax
- **Human Capital** - Core HR, Payroll, Benefits, Talent, Learning, Compensation
- **Supply Chain** - Procurement, Inventory, Warehouse, Logistics, Planning
- **Manufacturing** - Engineering, Production, Quality, Costing
- **Sales** - Customers, Orders, Pricing, Shipping, Billing
- **CRM** - Accounts, Contacts, Opportunities, Campaigns, Support
- **Projects** - Planning, Resources, Time Tracking, Budgets
- **Business Intelligence** - Dashboards, Reports, Analytics, KPIs
- **Documents** - Storage, Workflows, Signatures, Compliance
- **E-Commerce** - Catalog, Orders, Customers, Promotions
- **Compliance & Risk** - Regulatory, Controls, Risk, Audit

Part of the **Layer 8 Ecosystem**, this ERP system benefits from shared components, consistent patterns, and a unified approach to enterprise software development.

## Features

- **12 Integrated Modules** - HCM, Finance, SCM, Manufacturing, Sales, CRM, Projects, BI, Documents, E-Commerce, Compliance
- **371+ Business Services** - Comprehensive coverage of enterprise operations
- **Unified Data Model** - Single source of truth across all modules with cross-references
- **Real-time Analytics** - Live dashboards, KPIs, and instant reporting via BI module
- **Document Management** - Storage, workflows, approvals, signatures, and compliance
- **Module Selection** - Enable/disable modules with dependency-aware configuration
- **System Dependency Map** - Visual module dependency graph for configuration management
- **Workflow Automation** - Automated business processes, approvals, and notifications
- **Role-based Access** - Granular security and permissions
- **Multi-currency Support** - Global financial operations with real-time exchange rate conversion
- **API-first Design** - RESTful APIs for easy integrations
- **Mobile App** - Full-featured mobile application with all modules
- **Full Audit Trail** - Complete transaction history across all modules
- **Mock Data Generation** - Realistic test data generators for all modules
- **Kubernetes Native** - Deploy on any K8s cluster with included manifests
- **Zero Frontend Dependencies** - Pure vanilla JavaScript for maximum performance

## Modules

| Module | Description | Status |
|--------|-------------|--------|
| **Dashboard** | Real-time business insights and KPIs | ✅ Active |
| **Human Capital (HCM)** | Core HR, Payroll, Benefits, Talent, Learning, Compensation | ✅ Active |
| **Financial Management** | GL, AP, AR, Cash, Fixed Assets, Budgeting, Tax | ✅ Active |
| **Supply Chain (SCM)** | Procurement, Inventory, Warehouse, Logistics, Planning | ✅ Active |
| **Manufacturing (MFG)** | Engineering, Production, Planning, Quality, Costing | ✅ Active |
| **Sales & Distribution** | Customers, Orders, Pricing, Shipping, Billing, Analytics | ✅ Active |
| **CRM** | Accounts, Contacts, Opportunities, Campaigns, Support | ✅ Active |
| **Project Management** | Projects, Resources, Time Tracking, Budgets | ✅ Active |
| **Business Intelligence** | Dashboards, Reports, Analytics, KPIs, Data Sources | ✅ Active |
| **Document Management** | Storage, Workflows, Signatures, Compliance, Integration | ✅ Active |
| **E-Commerce** | Catalog, Orders, Customers, Promotions | ✅ Active |
| **Compliance & Risk** | Regulatory, Controls, Risk, Audit | ✅ Active |
| **System Administration** | Users, Settings, Security, Integrations | ✅ Active |

## Recent Updates

- **Module Selection & Dependencies** - Enable/disable modules at runtime with automatic dependency management and visual dependency map
- **Multi-Currency Exchange** - Real-time currency conversion when switching currencies on money fields
- **E-Commerce Module** - Complete online commerce: catalog management, orders, customers, and promotions
- **Compliance & Risk Module** - Regulatory tracking, controls management, risk assessment, and audit trails
- **Document Management Module** - Complete document lifecycle: storage, workflows, approvals, signatures, compliance
- **Business Intelligence Module** - Dashboards, reports, KPIs, analytics, and data source management
- **Project Management Module** - Projects, resources, time tracking, budgets, and milestones
- **CRM Module** - Customer accounts, contacts, opportunities, campaigns, and support tickets
- **Sales Module** - Complete order-to-cash: customers, orders, pricing, shipping, billing, and analytics
- **Manufacturing Module** - Engineering, production, planning, quality control, and costing
- **Supply Chain Module** - Procurement, inventory, warehouse, logistics, and demand/supply planning
- **Financial Module** - GL, AP, AR, cash management, fixed assets, budgeting, and tax
- **Mobile App** - Full mobile application with all 12 modules, responsive design, and floating headers
- **UI Factory Framework** - Shared factories for forms, columns, enums, references, and sections

## Quick Start

### Prerequisites

- Go 1.25 or later
- PostgreSQL 14 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/saichler/l8erp.git
cd l8erp

# Run the web server
go run ./go/erp/ui/main.go
```

### Access the Application

Open your browser and navigate to:
- **Marketing Page**: http://localhost:2773/
- **Login**: http://localhost:2773/login/
- **Application**: http://localhost:2773/app.html (after login)
- **Mobile App**: http://localhost:2773/m/ (mobile-optimized)

### Demo Credentials

| Field | Value |
|-------|-------|
| Username | `operator` |
| Password | `Oper123!` |

### Docker Deployment

```bash
# Build HCM service
docker build -t erp-hcm ./go/erp/hcm/

# Build web UI
docker build -t erp-web ./go/erp/ui/
```

### Kubernetes Deployment

```bash
# Apply all manifests
kubectl apply -f k8s/

# Components deployed:
# - erp-web (DaemonSet) - Web UI on all nodes
# - erp-hcm (StatefulSet) - HCM service with persistent storage
# - vnet (DaemonSet) - Virtual network overlay
```

## Project Structure

```
l8erp/
├── go/
│   ├── erp/
│   │   ├── common/           # Shared utilities (defaults, validation)
│   │   ├── hcm/              # Human Capital Management (57 services)
│   │   ├── fin/              # Financial Management (49 services)
│   │   ├── scm/              # Supply Chain Management (44 services)
│   │   ├── mfg/              # Manufacturing (36 services)
│   │   ├── sales/            # Sales & Distribution (33 services)
│   │   ├── crm/              # Customer Relationship Management (36 services)
│   │   ├── prj/              # Project Management (36 services)
│   │   ├── bi/               # Business Intelligence (24 services)
│   │   ├── doc/              # Document Management (20 services)
│   │   ├── ecom/             # E-Commerce (20 services)
│   │   ├── comp/             # Compliance & Risk (20 services)
│   │   ├── sys/              # System Administration
│   │   ├── ui/
│   │   │   ├── main.go       # Web server entry point
│   │   │   └── web/          # Web application
│   │   │       ├── marketing/    # Marketing landing page
│   │   │       ├── login/        # Login page
│   │   │       ├── l8ui/         # Shared UI framework
│   │   │       ├── erp-ui/      # ERP-specific UI (SVG templates, section configs)
│   │   │       ├── hcm/          # HCM module UI
│   │   │       ├── fin/          # Financial module UI
│   │   │       ├── scm/          # SCM module UI
│   │   │       ├── mfg/          # Manufacturing module UI
│   │   │       ├── sales/        # Sales module UI
│   │   │       ├── crm/          # CRM module UI
│   │   │       ├── prj/          # Project module UI
│   │   │       ├── bi/           # BI module UI
│   │   │       ├── documents/    # Documents module UI
│   │   │       ├── ecom/         # E-Commerce module UI
│   │   │       ├── comp/         # Compliance module UI
│   │   │       ├── m/            # Mobile app version
│   │   │       └── app.html      # Main application
│   │   └── vnet/             # Virtual network layer
│   ├── types/                # Protocol Buffer generated types
│   │   ├── hcm/              # HCM types
│   │   ├── fin/              # Financial types
│   │   ├── scm/              # SCM types
│   │   ├── mfg/              # Manufacturing types
│   │   ├── sales/            # Sales types
│   │   ├── crm/              # CRM types
│   │   ├── prj/              # Project types
│   │   ├── bi/               # BI types
│   │   ├── doc/              # Document types
│   │   ├── ecom/             # E-Commerce types
│   │   └── comp/             # Compliance types
│   ├── tests/                # Test files and mock data generators
│   └── vendor/               # Go dependencies
├── k8s/                      # Kubernetes deployment manifests
├── proto/                    # Protocol buffer definitions
├── ERP_MODULES.md           # Detailed module documentation
└── README.md                # This file
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Web App     │  │ Mobile App  │  │ API Clients │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Auth        │  │ Business    │  │ Workflow    │         │
│  │ Service     │  │ Logic       │  │ Engine      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                      Data Layer                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ PostgreSQL  │  │ Cache       │  │ File        │         │
│  │             │  │ Layer       │  │ Storage     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                  Infrastructure Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Kubernetes  │  │ Docker      │  │ L8 Virtual  │         │
│  │             │  │             │  │ Network     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Backend | Go 1.25+ |
| Database | PostgreSQL 14+ |
| Frontend | Vanilla JavaScript, CSS |
| API | REST |
| Serialization | Protocol Buffers |
| Container | Docker |
| Orchestration | Kubernetes |
| Networking | Layer 8 Bus (Virtual Network Overlay) |

## Development

### Running Tests

```bash
go test ./go/tests/...
```

### Building

```bash
# Build web server
go build -o erp-web ./go/erp/ui/main.go

# Build HCM service
go build -o erp-hcm ./go/erp/hcm/main.go

# Build virtual network
go build -o erp-vnet ./go/erp/vnet/main.go
```

### Code Style

- Go code follows standard Go formatting (`go fmt`)
- JavaScript uses vanilla JS (no frameworks)
- CSS follows BEM-like naming conventions

## Documentation

- [Module Specifications](ERP_MODULES.md) - Detailed breakdown of all ERP modules
- [Marketing Site README](go/erp/ui/web/marketing/README.md) - Marketing website documentation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Powered By

<p align="center">
  <img src="go/erp/ui/web/images/Layer8Logo.gif" alt="Layer 8 Ecosystem" width="80">
  <br>
  <strong>Layer 8 Ecosystem</strong>
</p>

---

<p align="center">
  <sub>Built with ❤️ by Layer 8</sub>
</p>
