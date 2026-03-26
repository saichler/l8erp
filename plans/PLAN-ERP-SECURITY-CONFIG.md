# Plan: ERP Security Configuration

## Goal
Create a method in `go/sec/` that builds and returns an `*secure.L8SecureConfig` with ERP-specific users, roles, rules, and credentials. This replaces the current generic platform defaults (admin/operator/viewer) with granular, module-aware security for the 12 ERP modules.

## Outcome
```go
func ERPSecureConfig() *secure.L8SecureConfig
```
Returns a fully populated `L8SecureConfig` with ERP roles, users, and credentials. The existing `Defaults.go` platform defaults (admin/operator/viewer) remain unchanged — they are platform-level. The ERP config layers on top.

---

## Phase 1: Role Design

### 1.1 Platform Roles (existing, unchanged)
| Role | Purpose | Rules |
|------|---------|-------|
| `admin` | Full platform access | Allow all (`*`) on all actions |
| `operator` | Platform operator | Allow all, deny write on L8User/L8Role/L8Credentials |
| `viewer` | Read-only platform | Allow GET only, deny all on L8User/L8Role/L8Credentials |

### 1.2 ERP Roles (new)

Each role gets full CRUD on its primary modules, read-only on related modules, and deny on security types (L8User, L8Role, L8Credentials).

| Role ID | Role Name | Primary Modules (full CRUD) | Read-Only Modules | Denied Types |
|---------|-----------|----------------------------|-------------------|--------------|
| `erp-admin` | ERP Administrator | All 12 ERP modules | — | — (inherits platform admin deny rules for security) |
| `hr-manager` | HR Manager | HCM | FIN (compensation-related: PayslipLine, CompensationStatement) | Security types |
| `hr-clerk` | HR Clerk | HCM (subset: Employee, LeaveRequest, Timesheet, OnboardingTask, Absence) | — | Security types, HCM sensitive (CompensationStatement, Payslip, BonusPayment, SalaryGrade, SalaryStructure, PayGrade, EquityGrant, MeritCycle, MeritIncrease) |
| `accountant` | Accountant | FIN | Sales (SalesInvoice, SalesOrder — read-only), SCM (ScmPurchaseOrder — read-only) | Security types |
| `fin-clerk` | Finance Clerk | FIN (subset: JournalEntry, PurchaseInvoice, SalesInvoice, CustomerPayment, VendorPayment) | — | Security types, FIN sensitive (Budget, BudgetScenario, CashForecast, Forecast) |
| `sales-manager` | Sales Manager | Sales, CRM | FIN (SalesInvoice, Customer — read-only), SCM (ScmItem — read-only) | Security types |
| `sales-rep` | Sales Representative | Sales (SalesOrder, SalesQuotation, SalesDeliveryOrder), CRM (CrmLead, CrmOpportunity, CrmContact, CrmAccount, CrmInteraction) | — | Security types |
| `warehouse-mgr` | Warehouse Manager | SCM | Sales (SalesOrder, SalesDeliveryOrder — read-only), MFG (MfgProductionOrder, MfgWorkOrder — read-only) | Security types |
| `warehouse-clerk` | Warehouse Clerk | SCM (subset: ScmReceivingOrder, ScmShipment, ScmPickTask, ScmPackTask, ScmPutawayTask, ScmStockMovement, ScmWavePlan, ScmBin) | — | Security types |
| `production-mgr` | Production Manager | MFG | SCM (ScmItem, ScmBom — read-only), Sales (SalesOrder — read-only) | Security types |
| `project-mgr` | Project Manager | PRJ | FIN (Budget — read-only), HCM (Employee — read-only) | Security types |
| `bi-analyst` | BI Analyst | BI | All ERP modules (read-only) | Security types |
| `compliance-officer` | Compliance Officer | COMP | All ERP modules (read-only) | Security types |
| `doc-admin` | Document Administrator | DOC | — | Security types |
| `ecom-manager` | E-Commerce Manager | ECOM | Sales (read-only), SCM (ScmItem, ScmWarehouse — read-only) | Security types |

### 1.3 Composite Roles
Some users need multiple departments. Rather than creating combination roles, users can be assigned multiple roles. The deny-before-allow logic ensures the most restrictive rule wins.

---

## Phase 2: Rule Construction Helpers

### 2.1 New helper functions in `go/sec/`

Create `erp_rules.go` with helpers to reduce boilerplate:

```go
// allowAll creates an allow rule for all actions on a type
func allowAll(ruleId, elemType string) *secure.L8Rule

// allowGet creates an allow rule for GET only on a type
func allowGet(ruleId, elemType string) *secure.L8Rule

// denyAll creates a deny rule for all actions on a type
func denyAll(ruleId, elemType string) *secure.L8Rule

// denyWrite creates a deny rule for POST/PUT/PATCH/DELETE (allows GET)
func denyWrite(ruleId, elemType string) *secure.L8Rule

// moduleTypes returns all Prime Object type names for a module
func moduleTypes(module string) []string

// allowModule creates allow-all rules for every type in a module
func allowModule(prefix, module string) map[string]*secure.L8Rule

// readOnlyModule creates GET-only rules for every type in a module
func readOnlyModule(prefix, module string) map[string]*secure.L8Rule

// denyTypes creates deny-all rules for specific types
func denyTypes(prefix string, types []string) map[string]*secure.L8Rule
```

### 2.2 Module type registry

Create `erp_types.go` with a `map[string][]string` mapping module names to their Prime Object type names:

```go
var erpModuleTypes = map[string][]string{
    "hcm":   {"Employee", "Department", "Job", ...},  // 65 types
    "fin":   {"Account", "JournalEntry", ...},         // 45 types
    "scm":   {"ScmItem", "ScmWarehouse", ...},         // 47 types
    "sales": {"SalesOrder", "SalesQuotation", ...},    // 32 types
    "mfg":   {"MfgBom", "MfgWorkOrder", ...},          // 40 types
    "crm":   {"CrmLead", "CrmOpportunity", ...},       // 34 types
    "prj":   {"PrjProject", "PrjTask", ...},           // 31 types
    "bi":    {"BiDashboard", "BiReport", ...},          // 24 types
    "doc":   {"DocDocument", "DocFolder", ...},         // 20 types
    "ecom":  {"EcomProduct", "EcomOrder", ...},         // 19 types
    "comp":  {"CompRiskRegister", "CompControl", ...},  // 20 types
}
```

---

## Phase 3: Role Builders

### 3.1 File organization

One file per functional area to stay under 500 lines:

| File | Roles | Estimated Lines |
|------|-------|-----------------|
| `erp_types.go` | Module type registry | ~120 |
| `erp_rules.go` | Rule construction helpers | ~80 |
| `erp_roles_admin.go` | erp-admin | ~40 |
| `erp_roles_hr.go` | hr-manager, hr-clerk | ~100 |
| `erp_roles_fin.go` | accountant, fin-clerk | ~100 |
| `erp_roles_sales.go` | sales-manager, sales-rep | ~100 |
| `erp_roles_ops.go` | warehouse-mgr, warehouse-clerk, production-mgr | ~120 |
| `erp_roles_other.go` | project-mgr, bi-analyst, compliance-officer, doc-admin, ecom-manager | ~150 |
| `erp_config.go` | `ERPSecureConfig()` — assembles users + roles + credentials | ~80 |

### 3.2 Each role builder returns `*secure.L8Role`

```go
func erpAdminRole() *secure.L8Role
func hrManagerRole() *secure.L8Role
func hrClerkRole() *secure.L8Role
// ... etc
```

---

## Phase 4: Default Users

### 4.1 Demo users for each role

| User ID | Full Name | Roles | Password |
|---------|-----------|-------|----------|
| `erpadmin` | ERP Administrator | `erp-admin` | `erpadmin` |
| `hrmgr` | Helen Rodriguez (HR) | `hr-manager` | `hrmgr` |
| `hrclerk` | Hannah Clark (HR) | `hr-clerk` | `hrclerk` |
| `acct` | Alex Chen (Finance) | `accountant` | `acct` |
| `finclerk` | Fiona Liu (Finance) | `fin-clerk` | `finclerk` |
| `salesmgr` | Sam Martinez (Sales) | `sales-manager` | `salesmgr` |
| `salesrep` | Sarah Parker (Sales) | `sales-rep` | `salesrep` |
| `waremgr` | Warren Brooks (Warehouse) | `warehouse-mgr` | `waremgr` |
| `wareclerk` | Wendy Stone (Warehouse) | `warehouse-clerk` | `wareclerk` |
| `prodmgr` | Paul Mitchell (Production) | `production-mgr` | `prodmgr` |
| `projmgr` | Patricia Kim (Projects) | `project-mgr` | `projmgr` |
| `bianalyst` | Brian Nguyen (BI) | `bi-analyst` | `bianalyst` |
| `compoff` | Carlos Ortega (Compliance) | `compliance-officer` | `compoff` |
| `docadmin` | Diana Foster (Documents) | `doc-admin` | `docadmin` |
| `ecommgr` | Emma Walsh (E-Commerce) | `ecom-manager` | `ecommgr` |

### 4.2 Multi-role demo user
| User ID | Full Name | Roles | Password |
|---------|-----------|-------|----------|
| `cfo` | Christine Fontaine (CFO) | `accountant`, `bi-analyst`, `compliance-officer` | `cfo` |

---

## Phase 5: Credentials

ERP-specific credentials (same pattern as existing `defaultCredentials`):
- `postgres` — database credentials (existing)
- Additional credentials TBD based on deployment needs

---

## Phase 6: Assembly

### 6.1 `ERPSecureConfig()` in `erp_config.go`

```go
func ERPSecureConfig() *secure.L8SecureConfig {
    config := &secure.L8SecureConfig{
        Key:         aes.GenerateAES256Key(),
        Secret:      aes.GenerateAES256Key(),
        Users:       erpUsers(),
        Roles:       erpRoles(),
        Credentials: defaultCredentials(false),
    }
    return config
}
```

Where `erpUsers()` builds the user map (platform defaults + ERP demo users) and `erpRoles()` builds the role map (platform defaults + ERP roles).

---

## Phase 7: Verification

1. Build: `go build ./sec/` and `go vet ./sec/`
2. Verify every ERP module has at least one role with full CRUD
3. Verify every role denies security types (L8User, L8Role, L8Credentials)
4. Verify no file exceeds 500 lines
5. Verify all type names in `erp_types.go` match actual `.pb.go` type names

```bash
# Cross-check type names against protobuf
for mod in hcm fin scm sales mfg crm prj bi doc ecom comp; do
    grep "type .* struct {" go/types/$mod/*.pb.go | grep -v "List\|state\|sizeCache" | sed 's/.*type \(.*\) struct.*/\1/' | sort
done
```

---

## Traceability Matrix

| # | Item | Phase |
|---|------|-------|
| 1 | Module type registry (all 12 modules, ~377 types) | Phase 2.2 |
| 2 | Rule construction helpers (allowAll, allowGet, denyAll, etc.) | Phase 2.1 |
| 3 | erp-admin role | Phase 3 |
| 4 | hr-manager role | Phase 3 |
| 5 | hr-clerk role (subset + sensitive type deny) | Phase 3 |
| 6 | accountant role | Phase 3 |
| 7 | fin-clerk role (subset + sensitive type deny) | Phase 3 |
| 8 | sales-manager role | Phase 3 |
| 9 | sales-rep role (subset) | Phase 3 |
| 10 | warehouse-mgr role | Phase 3 |
| 11 | warehouse-clerk role (subset) | Phase 3 |
| 12 | production-mgr role | Phase 3 |
| 13 | project-mgr role | Phase 3 |
| 14 | bi-analyst role (read-only all ERP) | Phase 3 |
| 15 | compliance-officer role (read-only all ERP + CRUD COMP) | Phase 3 |
| 16 | doc-admin role | Phase 3 |
| 17 | ecom-manager role | Phase 3 |
| 18 | 16 demo users + 1 multi-role user | Phase 4 |
| 19 | ERPSecureConfig() assembly | Phase 6 |
| 20 | Build + vet + type name verification | Phase 7 |

---

## End-to-End Verification (Phase 7)

For each role:
- [ ] Role has at least one allow rule
- [ ] Role denies L8User, L8Role, L8Credentials
- [ ] Primary module types have full CRUD (POST/PUT/PATCH/DELETE/GET)
- [ ] Read-only module types have GET only
- [ ] `ERPSecureConfig()` returns a valid `*secure.L8SecureConfig`
- [ ] All type names in the registry match actual `.pb.go` type names
- [ ] No file exceeds 500 lines
- [ ] `go build ./sec/` passes
- [ ] `go vet ./sec/` passes
