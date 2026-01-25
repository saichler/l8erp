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

ERP by Layer 8 is a comprehensive Enterprise Resource Planning system designed for modern businesses. Built from the ground up with Go, it provides a unified platform for managing all aspects of your organization - from financial operations and human capital to supply chain and manufacturing.

Part of the **Layer 8 Ecosystem**, this ERP system benefits from shared components, consistent patterns, and a unified approach to enterprise software development.

## Features

- **Unified Data Model** - Single source of truth across all modules
- **Real-time Analytics** - Live dashboards and instant reporting
- **Workflow Automation** - Automated business processes and approvals
- **Role-based Access** - Granular security and permissions
- **Multi-currency Support** - Global financial operations
- **API-first Design** - RESTful APIs for easy integrations
- **Mobile Ready** - Responsive design for any device
- **Full Audit Trail** - Complete transaction history

## Modules

| Module | Description | Status |
|--------|-------------|--------|
| **Dashboard** | Real-time business insights and KPIs | Active |
| **Human Capital (HCM)** | Core HR, Payroll, Benefits, Talent, Learning | Active |
| **Financial Management** | GL, AP, AR, Budgeting, Asset Management | Planned |
| **Supply Chain** | Procurement, Inventory, Logistics | Planned |
| **Manufacturing** | Production Planning, Shop Floor, Quality | Planned |
| **Sales & Distribution** | Order Management, Pricing, Shipping | Planned |
| **CRM** | Customer Management, Opportunities, Support | Planned |
| **Project Management** | Projects, Resources, Time Tracking | Planned |
| **Business Intelligence** | Analytics, Reports, Dashboards | Planned |
| **Document Management** | Document Storage, Workflows, Signatures | Planned |
| **E-Commerce** | Online Store, Order Integration | Planned |
| **Compliance & Risk** | Regulatory, Audit, Risk Management | Planned |
| **System Administration** | Users, Settings, Integrations | Active |

## Quick Start

### Prerequisites

- Go 1.21 or later
- PostgreSQL 14 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/saichler/l8erp.git
cd l8erp

# Run the server
go run ./go/erp/main.go
```

### Access the Application

Open your browser and navigate to:
- **Marketing Page**: http://localhost:8080/
- **Login**: http://localhost:8080/login/
- **Application**: http://localhost:8080/app.html (after login)

### Demo Credentials

| Field | Value |
|-------|-------|
| Username | `operator` |
| Password | `Oper123!` |

## Project Structure

```
l8erp/
├── go/
│   ├── erp/
│   │   ├── common/           # Shared utilities
│   │   ├── hcm/              # Human Capital Management module
│   │   ├── ui/
│   │   │   └── web/          # Web application
│   │   │       ├── marketing/    # Marketing landing page
│   │   │       ├── login/        # Login page
│   │   │       ├── shared/       # Shared CSS/JS components
│   │   │       ├── hcm/          # HCM module UI
│   │   │       ├── popup/        # Popup component
│   │   │       ├── datepicker/   # Date picker component
│   │   │       ├── reference_picker/  # Reference picker
│   │   │       ├── edit_table/   # Editable table component
│   │   │       ├── notification/ # Notification component
│   │   │       └── app.html      # Main application
│   │   └── vnet/             # Virtual network layer
│   ├── types/
│   │   └── hcm/              # HCM type definitions
│   ├── tests/                # Test files
│   └── vendor/               # Go dependencies
├── proto/                    # Protocol buffer definitions
├── ERP_MODULES.md           # Detailed module documentation
└── README.md                # This file
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Web App     │  │ Mobile      │  │ API Clients │         │
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
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Backend | Go |
| Database | PostgreSQL |
| Frontend | Vanilla JavaScript, CSS |
| API | REST |
| Serialization | Protocol Buffers |

## Development

### Running Tests

```bash
go test ./go/tests/...
```

### Building

```bash
go build -o erp ./go/erp/main.go
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
