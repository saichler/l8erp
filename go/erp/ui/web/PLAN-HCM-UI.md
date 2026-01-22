# HCM UI Implementation Plan

## Overview

Design a user-friendly UI for 57 HCM services organized into 7 functional modules. The UI follows the Probler app patterns with tabs, L8Table components, and consistent styling.

---

## HCM Services by Module (57 total)

| Module | Services | Count |
|--------|----------|-------|
| **Core HR** | Employee, Position, Job, JobFamily, Organization, Department, EmployeeDocument, ComplianceRecord | 8 |
| **Payroll** | PayStructure, PayComponent, PayrollRun, Payslip, TaxWithholding, DirectDeposit, Garnishment, YearEndDocument | 8 |
| **Benefits** | BenefitPlan, BenefitEnrollment, Carrier, Dependent, LifeEvent, COBRAEvent | 6 |
| **Time & Attendance** | Timesheet, LeaveRequest, LeaveBalance, LeavePolicy, Shift, Schedule, Holiday, Absence | 8 |
| **Talent** | PerformanceReview, Goal, Feedback, CareerPath, SuccessionPlan, JobRequisition, Applicant, Application, OnboardingTask | 9 |
| **Learning** | Course, CourseSession, CourseEnrollment, Certification, EmployeeCertification, Skill, EmployeeSkill, TrainingRecord | 8 |
| **Compensation** | SalaryGrade, SalaryStructure, EmployeeCompensation, MeritIncrease, MeritCycle, BonusPlan, BonusPayment, EquityGrant, CompensationStatement, MarketBenchmark | 10 |

---

## UI Structure

### Navigation Hierarchy

```
HCM Section (main sidebar)
├── Module Tabs (horizontal, top of section)
│   ├── Core HR
│   ├── Payroll
│   ├── Benefits
│   ├── Time
│   ├── Talent
│   ├── Learning
│   └── Compensation
│
└── Each Tab → Sub-navigation (left sidebar or pill nav)
    └── Service Views → L8Table with CRUD
```

### Layout Design

```
┌─────────────────────────────────────────────────────────────────┐
│  Human Capital Management                              👥       │
│  Manage your workforce across all HR functions                  │
├─────────────────────────────────────────────────────────────────┤
│ [Core HR] [Payroll] [Benefits] [Time] [Talent] [Learning] [Comp]│
├────────────┬────────────────────────────────────────────────────┤
│            │                                                    │
│  📋 Employees│  ┌─────────────────────────────────────────────┐ │
│  💼 Positions│  │  Employees                        [+ Add]   │ │
│  🏢 Jobs     │  ├─────────────────────────────────────────────┤ │
│  📁 Job Family│  │ ID | Name | Email | Dept | Status | Actions│ │
│  🏛️ Org Units│  │----|------|-------|------|--------|--------│ │
│  🏬 Departments│ │ .. | .... | ..... | .... | ...... | Ed|Del │ │
│  📄 Documents│  │ .. | .... | ..... | .... | ...... | Ed|Del │ │
│  ✓ Compliance│  └─────────────────────────────────────────────┘ │
│            │                                                    │
└────────────┴────────────────────────────────────────────────────┘
```

---

## Module Details

### 1. Core HR Tab
**Primary Focus**: Employee master data and organizational structure

| Sub-Section | Icon | Description | Primary Actions |
|-------------|------|-------------|-----------------|
| Employees | 👤 | Employee master records | View, Add, Edit, Terminate |
| Positions | 💼 | Position definitions | View, Add, Edit, Delete |
| Jobs | 📋 | Job catalog | View, Add, Edit, Delete |
| Job Families | 📁 | Job groupings | View, Add, Edit, Delete |
| Organizations | 🏛️ | Org hierarchy | View, Add, Edit, Delete |
| Departments | 🏬 | Department structure | View, Add, Edit, Delete |
| Documents | 📄 | Employee documents | View, Upload, Download, Delete |
| Compliance | ✓ | Compliance records | View, Add, Edit, Delete |

**Employee Detail View** (modal or dedicated page):
- Personal info, Employment info, Documents tab, Compliance tab

### 2. Payroll Tab
**Primary Focus**: Compensation processing and tax management

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Pay Structures | 💰 | Salary structures |
| Pay Components | 📊 | Earnings/deductions |
| Payroll Runs | ▶️ | Process payroll |
| Payslips | 📃 | Employee pay statements |
| Tax Withholdings | 🏛️ | Tax configurations |
| Direct Deposits | 🏦 | Bank accounts |
| Garnishments | ⚖️ | Court-ordered deductions |
| Year-End Docs | 📋 | W-2s, Tax forms |

### 3. Benefits Tab
**Primary Focus**: Benefits administration and enrollment

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Benefit Plans | 📦 | Available plans |
| Enrollments | ✅ | Employee enrollments |
| Carriers | 🏥 | Insurance providers |
| Dependents | 👨‍👩‍👧 | Employee dependents |
| Life Events | 🔄 | Qualifying events |
| COBRA Events | 📋 | COBRA administration |

### 4. Time & Attendance Tab
**Primary Focus**: Time tracking and leave management

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Timesheets | ⏱️ | Time entries |
| Leave Requests | 🏖️ | PTO requests |
| Leave Balances | 📊 | Accrual balances |
| Leave Policies | 📜 | Policy definitions |
| Shifts | 🔄 | Shift definitions |
| Schedules | 📅 | Work schedules |
| Holidays | 🎉 | Company holidays |
| Absences | 🚫 | Absence records |

### 5. Talent Tab
**Primary Focus**: Performance, recruiting, and career development

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Reviews | ⭐ | Performance reviews |
| Goals | 🎯 | Employee goals |
| Feedback | 💬 | 360 feedback |
| Career Paths | 📈 | Career progression |
| Succession Plans | 👑 | Leadership pipeline |
| Requisitions | 📝 | Job openings |
| Applicants | 👥 | Candidates |
| Applications | 📨 | Job applications |
| Onboarding | 🚀 | New hire tasks |

### 6. Learning Tab
**Primary Focus**: Training and skill development

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Courses | 📚 | Training courses |
| Sessions | 📅 | Course sessions |
| Enrollments | ✅ | Course enrollments |
| Certifications | 🏆 | Certification types |
| Emp. Certs | 📜 | Employee certifications |
| Skills | 💡 | Skill catalog |
| Emp. Skills | 🎓 | Employee skills |
| Training Records | 📋 | Completion records |

### 7. Compensation Tab
**Primary Focus**: Salary planning and rewards

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Salary Grades | 📊 | Grade levels |
| Salary Structures | 💰 | Pay ranges |
| Emp. Compensation | 💵 | Employee pay |
| Merit Increases | 📈 | Salary adjustments |
| Merit Cycles | 🔄 | Review cycles |
| Bonus Plans | 🎁 | Bonus structures |
| Bonus Payments | 💸 | Bonus payouts |
| Equity Grants | 📈 | Stock options |
| Comp. Statements | 📄 | Total rewards |
| Market Benchmarks | 📊 | Salary surveys |

---

## File Structure

```
go/erp/ui/web/
├── sections/
│   └── hcm.html                    # Main HCM section with module tabs
├── hcm/
│   ├── hcm.css                     # HCM-specific styles
│   ├── hcm.js                      # HCM module initialization
│   ├── hcm-common.js               # Shared utilities
│   │
│   ├── core-hr/
│   │   ├── index.html              # Core HR tab content
│   │   ├── core-hr.js              # Core HR logic
│   │   ├── employees.js            # Employee table & modals
│   │   ├── positions.js            # Position management
│   │   ├── jobs.js                 # Job catalog
│   │   ├── job-families.js         # Job families
│   │   ├── organizations.js        # Org units
│   │   ├── departments.js          # Departments
│   │   ├── documents.js            # Employee documents
│   │   └── compliance.js           # Compliance records
│   │
│   ├── payroll/
│   │   ├── index.html
│   │   ├── payroll.js
│   │   └── [service].js            # One JS per service
│   │
│   ├── benefits/
│   │   ├── index.html
│   │   ├── benefits.js
│   │   └── [service].js
│   │
│   ├── time/
│   │   ├── index.html
│   │   ├── time.js
│   │   └── [service].js
│   │
│   ├── talent/
│   │   ├── index.html
│   │   ├── talent.js
│   │   └── [service].js
│   │
│   ├── learning/
│   │   ├── index.html
│   │   ├── learning.js
│   │   └── [service].js
│   │
│   └── compensation/
│       ├── index.html
│       ├── compensation.js
│       └── [service].js
```

---

## Implementation Phases

### Phase 1: Foundation
1. Create HCM section structure with module tabs
2. Set up hcm.css with sub-navigation styles
3. Create hcm.js for tab switching logic
4. Copy edit_table component to ERP web directory

### Phase 2: Core HR Module (MVP)
1. Implement Employees service UI (full CRUD)
2. Implement Organizations & Departments
3. Implement Positions & Jobs
4. Add Employee detail view with related data

### Phase 3: Payroll Module
1. Pay Structures & Components
2. Payroll Runs with batch processing UI
3. Payslips with employee lookup
4. Tax and deduction management

### Phase 4: Benefits Module
1. Benefit Plans catalog
2. Enrollment workflow
3. Dependent management
4. Life events processing

### Phase 5: Time & Attendance Module
1. Timesheet entry and approval
2. Leave request workflow
3. Schedule management
4. Holiday calendar

### Phase 6: Talent Module
1. Performance review workflow
2. Goal setting and tracking
3. Recruiting pipeline
4. Onboarding checklist

### Phase 7: Learning Module
1. Course catalog
2. Enrollment management
3. Certification tracking
4. Skill matrix

### Phase 8: Compensation Module
1. Salary structure management
2. Merit cycle processing
3. Bonus administration
4. Total rewards statements

---

## L8Table Configuration Pattern

Each service will use the L8Table component with this pattern:

```javascript
// Example: Employees table
const employeeTable = new L8Table({
    containerId: 'employees-table',
    endpoint: '/erp/30/Employee',
    modelName: 'Employee',
    serverSide: true,
    columns: [
        { key: 'employeeId', label: 'ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'departmentId', label: 'Department',
          render: (item) => getDepartmentName(item.departmentId) },
        { key: 'status', label: 'Status',
          enumValues: { active: 1, inactive: 0, terminated: 2 },
          render: (item) => L8Table.statusTag(item.status === 1, 'Active', 'Inactive') }
    ],
    onAdd: () => openEmployeeModal(),
    onEdit: (id) => openEmployeeModal(id),
    onDelete: (id) => confirmDelete('Employee', id, () => deleteEmployee(id)),
    addButtonText: 'Add Employee'
});
employeeTable.init();
```

---

## API Endpoints Reference

All HCM services use ServiceArea = 30. Endpoint format: `/erp/30/<ServiceName>`

| Service | Endpoint |
|---------|----------|
| Employee | /erp/30/Employee |
| Position | /erp/30/Position |
| Job | /erp/30/Job |
| JobFamily | /erp/30/JobFamily |
| Org | /erp/30/Org |
| Dept | /erp/30/Dept |
| EmpDoc | /erp/30/EmpDoc |
| CompRec | /erp/30/CompRec |
| PayStruct | /erp/30/PayStruct |
| PayComp | /erp/30/PayComp |
| PayRun | /erp/30/PayRun |
| Payslip | /erp/30/Payslip |
| TaxWith | /erp/30/TaxWith |
| DirDep | /erp/30/DirDep |
| Garnish | /erp/30/Garnish |
| YrEndDoc | /erp/30/YrEndDoc |
| BenPlan | /erp/30/BenPlan |
| BenEnrol | /erp/30/BenEnrol |
| Carrier | /erp/30/Carrier |
| Dependent | /erp/30/Dependent |
| LifeEvent | /erp/30/LifeEvent |
| COBRAEvt | /erp/30/COBRAEvt |
| Timesheet | /erp/30/Timesheet |
| LeaveReq | /erp/30/LeaveReq |
| LeaveBal | /erp/30/LeaveBal |
| LeavePol | /erp/30/LeavePol |
| Shift | /erp/30/Shift |
| Schedule | /erp/30/Schedule |
| Holiday | /erp/30/Holiday |
| Absence | /erp/30/Absence |
| PerfRevw | /erp/30/PerfRevw |
| Goal | /erp/30/Goal |
| Feedback | /erp/30/Feedback |
| CarPath | /erp/30/CarPath |
| SuccPlan | /erp/30/SuccPlan |
| JobReq | /erp/30/JobReq |
| Applicant | /erp/30/Applicant |
| Applctn | /erp/30/Applctn |
| OnbrdTsk | /erp/30/OnbrdTsk |
| Course | /erp/30/Course |
| CrsSess | /erp/30/CrsSess |
| CrsEnrol | /erp/30/CrsEnrol |
| Cert | /erp/30/Cert |
| EmpCert | /erp/30/EmpCert |
| Skill | /erp/30/Skill |
| EmpSkill | /erp/30/EmpSkill |
| TrnRec | /erp/30/TrnRec |
| SalGrade | /erp/30/SalGrade |
| SalStrct | /erp/30/SalStrct |
| EmpComp | /erp/30/EmpComp |
| MeritInc | /erp/30/MeritInc |
| MrtCycle | /erp/30/MrtCycle |
| BonusPlan | /erp/30/BonusPlan |
| BonusPay | /erp/30/BonusPay |
| EqGrant | /erp/30/EqGrant |
| CompStmt | /erp/30/CompStmt |
| MktBench | /erp/30/MktBench |

---

## UX Considerations

1. **Progressive Disclosure**: Show most-used services first (Employees, Timesheets, Leave Requests)
2. **Contextual Navigation**: From Employee detail, link to their payslips, leave balances, etc.
3. **Quick Actions**: Common tasks accessible without deep navigation
4. **Search**: Global employee search across all modules
5. **Bulk Operations**: Multi-select for batch updates
6. **Responsive**: Mobile-friendly for manager approvals
7. **Keyboard Navigation**: Tab order and shortcuts for power users

---

## Dependencies

- `edit_table/table.js` - L8Table component
- `edit_table/table.css` - Table styles
- `popup/popup.js` - Modal dialogs
- `confirm/confirm.js` - Confirmation dialogs
- `css/base-core.css` - Base styles
- `css/components-modals.css` - Modal styles
