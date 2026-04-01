# Plan: Employee Self-Service Portal (ESS)

## Context

MISSING-FEATURES.md §9.1 identifies an Employee Self-Service Portal as a missing feature. The portal routing infrastructure is now in place (L8Portal Prime Object, portal field on L8User, post-login redirect based on portal suffix). This plan creates the ESS portal — a separate, simplified UI for employees who don't need full back-office access.

### What Exists
- **Portal routing**: Login redirects to `/<portal>` based on L8User.portal field
- **HCM data types**: 57 services across Core HR, Payroll, Benefits, Time & Attendance, Talent, Learning, Compensation
- **AAA infrastructure**: Bearer token auth, `ScopeView()` for data filtering, `AllowedActions()` for permission control, `/permissions` endpoint
- **l8ui components**: Table, forms, popups, charts, dashboards — all reusable
- **Expense Reports**: Live in PRJ module (`PrjExpenseReport`), not HCM

### What's Missing
- No `ess.html` / `m/ess.html` portal pages
- No employee-scoped data filtering (ScopeView returns all data today)
- No ESS-specific simplified UI configuration
- No ESS role in security config

### Design Principles
1. **Reuse l8ui components** — no custom table/form/popup implementations
2. **Read-only by default** — employees view their data; only specific actions (submit leave, update profile) are writable
3. **Employee-scoped** — backend `ScopeView()` filters all queries by the logged-in employee's ID
4. **Minimal footprint** — ESS is a thin config layer on top of existing services, not a new backend

---

## Phase 1: ESS Security Role & Scoping

**Goal:** Create an ESS role with limited permissions and implement employee-scoped data filtering.

### 1.1 ESS Role Definition (l8secure)

New file: `../l8secure/go/secure/plugin/erp/erp_roles_ess.go`

Define an `essEmployeeRole()` that grants:

| Service (Area 30) | GET | POST | PUT | PATCH | DELETE |
|---|---|---|---|---|---|
| Employee | Yes (own) | No | No | Yes (own profile fields) | No |
| Payslip | Yes (own) | No | No | No | No |
| LeaveReq | Yes (own) | Yes | No | No | No |
| LeaveBal | Yes (own) | No | No | No | No |
| BenEnrol | Yes (own) | No | No | No | No |
| BenPlan | Yes (all) | No | No | No | No |
| Dependent | Yes (own) | No | No | No | No |
| PerfRevw | Yes (own) | No | No | Yes (self-assessment) | No |
| Goal | Yes (own) | No | No | Yes (self-assessment) | No |
| Timesheet | Yes (own) | Yes | No | Yes (submit) | No |
| EmpCert | Yes (own) | No | No | No | No |
| EmpSkill | Yes (own) | No | No | No | No |
| TrnRec | Yes (own) | No | No | No | No |
| CompStmt | Yes (own) | No | No | No | No |
| YrEndDoc | Yes (own) | No | No | No | No |
| Holiday | Yes (all) | No | No | No | No |
| Dept | Yes (all) | No | No | No | No |

"Own" means filtered by `ScopeView()` to records where `employeeId` matches the logged-in user's AAA ID.

### 1.2 ScopeView Implementation (l8secure)

In `../l8secure/go/secure/provider/SecurityProvider.go`, the `ScopeView()` method currently returns `nil` (no filtering). For the ESS role, it must:

1. Check if the user's role has scope restrictions (a new `Scope` field on role rules)
2. If scope is "self", filter the returned elements to only those where `employeeId` == the user's AAA ID
3. This requires the AAA system to maintain a mapping: `userId → employeeId`

**Approach:** Add a `selfEmployeeId` field to L8User (or derive from userId convention). When `ScopeView()` is called for an ESS-role user, use the introspector to check if the element type has an `employeeId` field and filter accordingly.

**Note:** This is the most complex part. If the current AAA infrastructure doesn't support field-level scoping, a simpler Phase 1 approach is to use L8Query `where employeeId = '<userId>'` on the client side, enforced by the role's type-level permissions (ESS users can only GET, not modify others' data). Backend scoping can be added as a hardening step later.

### 1.3 Portal & User Config (l8secure)

In `erp_config.go`:
- Add `"ess-employee"` role to `erpRoles()`
- Add ESS demo user in `erpUsers()`:
  ```go
  erpUser("hcm", "HCM Employee", "ess-employee", "Hcm123!", "ess.html"),
  ```
  This user has no two-factor auth (default `fa` is `invalid_need_Fa` / unset, which means no TFA requirement since `Fa` is not set to `Need_FA_Need_Fa`).
- Add `"ess.html": "Employee Self-Service"` to the default L8Portal portals map

In `erp.json`, add the corresponding user entry:
```json
"hcm": {
  "fullName": "HCM Employee",
  "userId": "hcm",
  "password": { "solt": "", "hash": "Hcm123!" },
  "passwordHistory": [],
  "roles": { "ess-employee": true },
  "newPassword": "",
  "fa": "invalid_need_Fa",
  "tfa": null,
  "faVerified": "Invalid_Verify_State",
  "email": "",
  "accountStatus": "ACCOUNT_STATUS_UNSPECIFIED",
  "lastLogin": "0",
  "lastFailedLogin": "0",
  "failedLoginCount": 0,
  "passwordChangedAt": "0",
  "mustChangePassword": "invalid_must_change",
  "lockoutUntil": "0",
  "portal": "ess.html"
}
```

### 1.4 Register ESS Portal Page (l8erp)

In `go/erp/ui/main.go` (or wherever web routes are registered), ensure `ess.html` and `m/ess.html` are served as static pages from the web directory.

---

## Phase 2: ESS Desktop Portal Page

**Goal:** Create `ess.html` — a simplified single-page app for employees.

### 2.1 HTML Shell

New file: `go/erp/ui/web/ess.html`

Structure (following app.html pattern but simplified):
- **Header**: Company logo, employee name, logout button
- **Left nav**: Dashboard, My Profile, Pay, Time Off, Benefits, Performance, Learning
- **Content area**: Dynamic section loading

CSS includes: Reuse l8ui theme, table, forms, popup, chart CSS. No module-specific CSS (HCM admin styles not needed).

JS includes:
- l8ui shared components (config, utils, auth, table, forms, popup, notification, renderers, data-source, pagination, csv-export, reference-picker)
- ESS-specific config/columns/forms/enums files (new, see below)
- ESS app.js (initialization)

### 2.2 ESS App Initialization

New file: `go/erp/ui/web/ess/ess-app.js`

- Check bearer token, redirect to login if missing
- Fetch `/permissions` to get allowed types/actions
- Load ESS nav from config
- Initialize first section (Dashboard)
- Set up logout handler

### 2.3 ESS Navigation Config

New file: `go/erp/ui/web/ess/ess-nav-config.js`

Seven sections, each with a simple card-based nav:

1. **Dashboard** — Summary widgets (leave balance, next paydate, pending actions)
2. **My Profile** — View/edit personal info, emergency contacts, documents
3. **Pay** — Payslips, year-end documents, direct deposit, compensation statement
4. **Time Off** — Leave requests (submit new, view history), leave balances, holiday calendar
5. **Benefits** — Current enrollments, benefit plans, dependents
6. **Performance** — Reviews, goals, feedback, skills
7. **Learning** — Training records, certifications, course enrollments

### 2.4 ESS Section Configs

New file: `go/erp/ui/web/ess/ess-config.js`

Service definitions per section, mapping to existing HCM endpoints:

```javascript
ESS.sections = {
    'profile': {
        services: [
            { key: 'myprofile', label: 'Personal Info', endpoint: '/30/Employee', model: 'Employee', readOnly: true },
            { key: 'documents', label: 'My Documents', endpoint: '/30/EmpDoc', model: 'EmployeeDocument', readOnly: true }
        ]
    },
    'pay': {
        services: [
            { key: 'payslips', label: 'Pay Stubs', endpoint: '/30/Payslip', model: 'Payslip', readOnly: true },
            { key: 'yearend', label: 'Tax Documents', endpoint: '/30/YrEndDoc', model: 'YearEndDocument', readOnly: true },
            { key: 'directdeposit', label: 'Direct Deposit', endpoint: '/30/DirDep', model: 'DirectDeposit', readOnly: true },
            { key: 'compensation', label: 'Total Compensation', endpoint: '/30/CompStmt', model: 'CompensationStatement', readOnly: true }
        ]
    },
    'timeoff': {
        services: [
            { key: 'requests', label: 'My Requests', endpoint: '/30/LeaveReq', model: 'LeaveRequest' },
            { key: 'balances', label: 'Balances', endpoint: '/30/LeaveBal', model: 'LeaveBalance', readOnly: true },
            { key: 'holidays', label: 'Holidays', endpoint: '/30/Holiday', model: 'Holiday', readOnly: true }
        ]
    },
    'benefits': {
        services: [
            { key: 'enrollments', label: 'My Benefits', endpoint: '/30/BenEnrol', model: 'BenefitEnrollment', readOnly: true },
            { key: 'plans', label: 'Available Plans', endpoint: '/30/BenPlan', model: 'BenefitPlan', readOnly: true },
            { key: 'dependents', label: 'Dependents', endpoint: '/30/Dependent', model: 'Dependent', readOnly: true }
        ]
    },
    'performance': {
        services: [
            { key: 'reviews', label: 'My Reviews', endpoint: '/30/PerfRevw', model: 'PerformanceReview', readOnly: true },
            { key: 'goals', label: 'My Goals', endpoint: '/30/Goal', model: 'Goal' },
            { key: 'skills', label: 'My Skills', endpoint: '/30/EmpSkill', model: 'EmployeeSkill', readOnly: true }
        ]
    },
    'learning': {
        services: [
            { key: 'training', label: 'Training History', endpoint: '/30/TrnRec', model: 'TrainingRecord', readOnly: true },
            { key: 'certs', label: 'Certifications', endpoint: '/30/EmpCert', model: 'EmployeeCertification', readOnly: true },
            { key: 'enrollments', label: 'Course Enrollments', endpoint: '/30/CrsEnrol', model: 'CourseEnrollment', readOnly: true }
        ]
    }
};
```

### 2.5 ESS Columns (Simplified)

New file: `go/erp/ui/web/ess/ess-columns.js`

Subset of HCM columns relevant to employees. Example:

- **Payslip**: Payment Date, Pay Period, Gross Pay, Net Pay, Total Deductions
- **LeaveRequest**: Leave Type, Start Date, End Date, Total Days, Status
- **LeaveBalance**: Leave Type, Available, Used, Pending, Accrued
- **BenefitEnrollment**: Plan Name (via reference), Coverage Level, Status, Employee Cost
- **PerformanceReview**: Review Period, Status, Overall Rating
- **Goal**: Goal Name, Status, Completion %

### 2.6 ESS Forms (Simplified)

New file: `go/erp/ui/web/ess/ess-forms.js`

Only writable forms:
- **LeaveRequest** (submit new): Leave Type, Start Date, End Date, Reason, Is Partial Day
- **Goal** (update progress): Completion %, Comments
- **Employee** (profile update): Phone, Email, Emergency Contacts, Address — other fields read-only

### 2.7 ESS Enums

New file: `go/erp/ui/web/ess/ess-enums.js`

Subset of HCM enums: LeaveType, LeaveRequestStatus, EnrollmentStatus, PerformanceReviewStatus, TimesheetStatus, GoalStatus.

### 2.8 ESS Dashboard

New file: `go/erp/ui/web/ess/ess-dashboard.js`

Simple dashboard with summary cards (not full Layer8DDashboard, just HTML cards):
- **Leave Balances** — Top 3 leave types with available/used bars
- **Next Pay Date** — From latest payslip or pay period
- **Pending Actions** — Count of pending leave requests, unsigned reviews
- **Quick Links** — Submit Leave, View Pay Stub, Update Profile

Data fetched via standard L8Query with `where employeeId = '<currentUser>'` filter.

---

## Phase 3: ESS Mobile Portal Page

**Goal:** Create `m/ess.html` — mobile-optimized ESS.

### 3.1 Mobile HTML Shell

New file: `go/erp/ui/web/m/ess.html`

Following `m/app.html` pattern:
- Mobile viewport meta tags, PWA support
- Hamburger menu with sidebar nav
- Mobile-specific CSS (layer8m-* components)
- Mobile JS components (layer8m-table, layer8m-forms, layer8m-popup)

### 3.2 Mobile ESS Config

New files under `go/erp/ui/web/m/js/ess/`:
- `ess-nav-config.js` — Mobile nav card layout (same 7 sections)
- `ess-columns.js` — Mobile-optimized columns (fewer columns per table for small screens)
- `ess-forms.js` — Same writable forms as desktop
- `ess-enums.js` — Same enums as desktop (or shared)
- `ess-app.js` — Mobile app init

### 3.3 Desktop/Mobile Parity

Both portals must support:
- All 7 sections with identical data
- Leave request submission
- Profile viewing
- Pay stub viewing
- Read-only benefits/performance/learning views

---

## Phase 4: Employee-Scoped Data Queries

**Goal:** Ensure ESS users only see their own data.

### 4.1 Client-Side Filtering

In ESS app initialization, determine the current employee's ID:
- Option A: `sessionStorage.getItem('currentUser')` matches `L8User.userId` which maps to `Employee.employeeId`
- Option B: Fetch employee record by userId on app load, cache the employeeId

In every ESS table/data-source, set a base `where` clause:
```javascript
table.setBaseWhereClause("employeeId='" + ESS.employeeId + "'");
```

For tables without `employeeId` (Holiday, BenefitPlan), no filter — these are shared reference data.

### 4.2 Backend Hardening (Optional Enhancement)

If `ScopeView()` is enhanced in l8secure to support role-based field filtering:
- ESS role rules would include `scope: "self"`
- `ScopeView()` would automatically filter by `employeeId` matching the AAA user
- Client-side where clause becomes a belt-and-suspenders safeguard

This is a separate l8secure enhancement and not required for Phase 1 of ESS.

---

## Phase 5: ESS-Specific Actions

**Goal:** Implement the interactive features unique to ESS.

### 5.1 Submit Leave Request

Custom handler in `ess-actions.js`:
- "Request Time Off" button on Time Off section
- Opens form popup with: Leave Type, Start Date, End Date, Reason, Partial Day option
- POSTs to `/30/LeaveReq` with `employeeId` pre-filled
- Status defaults to PENDING

### 5.2 View Pay Stub Detail

Custom handler:
- Click a payslip row → opens read-only detail popup
- Shows earnings breakdown, deductions, taxes, net pay
- YTD totals displayed
- "Download PDF" button (reuses existing PDF export service if available)

### 5.3 Profile Update

Custom handler:
- "Edit Profile" button on My Profile section
- Opens form with only editable fields: phone, email, address, emergency contacts
- PATCHes to `/30/Employee` with limited field set

### 5.4 Performance Self-Assessment

Custom handler:
- For reviews in "Self-Assessment" status
- Opens review detail with editable `employeeComments` field
- PATCHes to `/30/PerfRevw`

### 5.5 Goal Progress Update

Custom handler:
- Click goal → edit `completionPercentage` and add comment
- PATCHes to `/30/Goal`

---

## Phase 6: Mock Data & Portal Config

**Goal:** Ensure ESS works end-to-end with demo data.

### 6.1 Update erp_config.go & erp.json

- Add ESS role (from Phase 1.1)
- Add `"hcm"` user (userId: `"hcm"`, password: `"Hcm123!"`, role: `"ess-employee"`, portal: `"ess.html"`, no TFA) — already specified in Phase 1.3
- Add `"ess.html": "Employee Self-Service"` to L8Portal portals map
- Update `erp.json` with the matching user entry (see Phase 1.3 for exact JSON)

### 6.2 Link Users to Employees

The ESS user's `userId` must match an `Employee.employeeId` in mock data. Either:
- Create ESS users whose userId matches existing mock employee IDs (e.g., `"EMP-001"`)
- Or add a mapping mechanism

### 6.3 Update run-local.sh

Ensure `ess.html` and `m/ess.html` are copied to the demo web directory.

---

## Phase 7: End-to-End Verification

### Desktop ESS
1. Login as ESS user → verify redirect to `/ess.html`
2. Dashboard loads with leave balances and summary cards
3. My Profile → shows employee info (read-only)
4. Pay → Payslips table filtered to employee, click opens detail
5. Time Off → Leave requests visible, submit new request works
6. Benefits → Enrollments visible, plans browsable
7. Performance → Reviews visible, self-assessment editable
8. Learning → Training/certifications visible
9. No admin nav, no access to other employees' data

### Mobile ESS
1. Login on mobile → verify redirect to `/m/ess.html`
2. All 7 sections accessible via sidebar
3. Leave request submission works
4. Profile view works
5. Data identical to desktop

### Security
1. ESS user cannot access `/app.html` (admin portal) — permissions block it
2. ESS user's API calls return only their own data
3. ESS user cannot POST/PUT/DELETE to unauthorized services

---

## Traceability Matrix

| # | Gap (from MISSING-FEATURES.md §9.1) | Phase |
|---|--------------------------------------|-------|
| 1 | View/update personal information | Phase 2 (profile section) + Phase 5.3 (edit) |
| 2 | View pay stubs and tax documents | Phase 2 (pay section) + Phase 5.2 (detail) |
| 3 | Submit/track leave requests | Phase 2 (timeoff section) + Phase 5.1 (submit) |
| 4 | View benefits enrollment | Phase 2 (benefits section) |
| 5 | Access company directory | Deferred — requires directory search component (read-only Employee list with limited fields) |
| 6 | Performance review self-assessment | Phase 2 (performance section) + Phase 5.4 (edit) |
| 7 | Submit expense reports | Deferred — Expense Reports are in PRJ module (PrjExpenseReport), not HCM. Requires cross-module portal access. |
| 8 | ESS role & permissions | Phase 1 |
| 9 | Employee-scoped data filtering | Phase 4 |
| 10 | Mobile ESS | Phase 3 |
| 11 | Dashboard | Phase 2.8 |
| 12 | Mock data & demo users | Phase 6 |

**Deferred items:**
- **Company directory**: Requires a search/browse component showing limited Employee fields (name, department, phone, email) for all employees. Could be a Phase 8 addition.
- **Expense reports**: `PrjExpenseReport` is in the PRJ module (area 90). Adding it to ESS requires cross-module endpoint access. Could be added later by including PRJ endpoints in ESS config.

---

## Dependencies & Ordering

```
Phase 1 (Security Role) ──→ Phase 2 (Desktop UI) ──→ Phase 5 (Actions)
                          ──→ Phase 3 (Mobile UI)  ──→ Phase 5 (Actions)
                          ──→ Phase 4 (Data Scoping)
                                                    ──→ Phase 6 (Mock Data)
                                                    ──→ Phase 7 (Verification)
```

Phase 1 is a prerequisite for all others. Phases 2, 3, 4 can proceed in parallel. Phase 5 depends on 2+3. Phase 6 depends on 1. Phase 7 depends on all.

---

## Key Files to Create/Modify

### Upstream (l8secure)
- `go/secure/plugin/erp/erp_roles_ess.go` — New ESS role definition
- `go/secure/plugin/erp/erp_config.go` — Add ESS role, users, portal entry

### This Repo (l8erp)

**Desktop ESS portal:**
- `go/erp/ui/web/ess.html` — ESS HTML shell
- `go/erp/ui/web/ess/ess-app.js` — App initialization
- `go/erp/ui/web/ess/ess-nav-config.js` — Navigation sections
- `go/erp/ui/web/ess/ess-config.js` — Service/endpoint config
- `go/erp/ui/web/ess/ess-columns.js` — Table column definitions
- `go/erp/ui/web/ess/ess-forms.js` — Form definitions
- `go/erp/ui/web/ess/ess-enums.js` — Enum definitions
- `go/erp/ui/web/ess/ess-dashboard.js` — Dashboard widgets
- `go/erp/ui/web/ess/ess-actions.js` — Custom action handlers

**Mobile ESS portal:**
- `go/erp/ui/web/m/ess.html` — Mobile ESS HTML shell
- `go/erp/ui/web/m/js/ess/ess-app.js` — Mobile app init
- `go/erp/ui/web/m/js/ess/ess-nav-config.js` — Mobile nav config
- `go/erp/ui/web/m/js/ess/ess-columns.js` — Mobile columns
- `go/erp/ui/web/m/js/ess/ess-forms.js` — Mobile forms
- `go/erp/ui/web/m/js/ess/ess-enums.js` — Mobile enums

**Existing files to modify:**
- `go/erp/ui/main.go` — Ensure ess.html is served
- `go/run-local.sh` — Include ESS pages in demo copy
