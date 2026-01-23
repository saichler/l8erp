# HCM Prime Object Dependency Map

This document provides a comprehensive map of all Prime Object dependencies in the HCM (Human Capital Management) module. A **Prime Object Dependency** is where a Prime Object attribute (or nested attribute) references another Prime Object instance via its ID attribute.

## Table of Contents

1. [Overview](#overview)
2. [Dependency Summary](#dependency-summary)
3. [Module Dependencies](#module-dependencies)
   - [Core HR](#core-hr)
   - [Payroll](#payroll)
   - [Benefits](#benefits)
   - [Time & Attendance](#time--attendance)
   - [Talent Management](#talent-management)
   - [Learning Management](#learning-management)
   - [Compensation Management](#compensation-management)
4. [Dependency Graph](#dependency-graph)
5. [Circular Dependencies](#circular-dependencies)
6. [Mock Data Generation Guidelines](#mock-data-generation-guidelines)

---

## Overview

The HCM module contains **57 Prime Objects** across 7 sub-modules. These objects form a complex web of dependencies that must be respected when:
- Creating mock data for testing
- Seeding databases
- Validating data integrity
- Building UI lookup fields

### Statistics

| Module | Prime Objects | Total Dependencies | Cross-Module Dependencies |
|--------|---------------|-------------------|---------------------------|
| Core HR | 8 | 15 | 0 |
| Payroll | 8 | 9 | 3 |
| Benefits | 6 | 8 | 1 |
| Time & Attendance | 8 | 11 | 1 |
| Talent Management | 9 | 22 | 5 |
| Learning Management | 8 | 12 | 1 |
| Compensation Management | 10 | 16 | 3 |
| **Total** | **57** | **93** | **14** |

---

## Dependency Summary

### Foundational Objects (No Dependencies)

These Prime Objects have no dependencies on other Prime Objects and should be created first:

| Object | Module | Primary Key |
|--------|--------|-------------|
| JobFamily | Core HR | `job_family_id` |
| Carrier | Benefits | `carrier_id` |
| Certification | Learning | `certification_id` |
| Skill | Learning | `skill_id` |

### Most Referenced Objects

Objects that are most frequently referenced by other Prime Objects:

| Object | Times Referenced | Referenced By |
|--------|-----------------|---------------|
| **Employee** | 38 | Almost all employee-related objects |
| **Organization** | 12 | Department, Position, BenefitPlan, PayStructure, etc. |
| **Department** | 4 | Employee, Position, JobRequisition |
| **Position** | 4 | Employee, JobRequisition, SuccessionPlan |
| **Job** | 4 | Employee, Position, JobRequisition, MarketBenchmark |
| **Course** | 3 | CourseSession, CourseEnrollment, TrainingRecord |

---

## Module Dependencies

### Core HR

#### Employee
**Primary Key:** `employee_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |
| `department_id` | Department | No |
| `position_id` | Position | No |
| `job_id` | Job | No |
| `manager_id` | Employee (self) | No |
| `work_location_id` | (External) | No |
| `cost_center_id` | (External) | No |

#### Organization
**Primary Key:** `organization_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `parent_organization_id` | Organization (self) | No |

#### Department
**Primary Key:** `department_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |
| `parent_department_id` | Department (self) | No |
| `manager_id` | Employee | No |
| `cost_center_id` | (External) | No |

#### Position
**Primary Key:** `position_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `job_id` | Job | No |
| `department_id` | Department | No |
| `organization_id` | Organization | No |
| `reports_to_position_id` | Position (self) | No |
| `work_location_id` | (External) | No |
| `cost_center_id` | (External) | No |

#### Job
**Primary Key:** `job_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `job_family_id` | JobFamily | No |

#### JobFamily
**Primary Key:** `job_family_id`

| Attribute | References | Required |
|-----------|------------|----------|
| *(none)* | - | - |

#### EmployeeDocument
**Primary Key:** `document_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### ComplianceRecord
**Primary Key:** `record_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `document_id` | EmployeeDocument | No |

---

### Payroll

#### PayStructure
**Primary Key:** `pay_structure_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |

#### PayComponent
**Primary Key:** `component_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `pay_structure_id` | PayStructure | No |

#### PayrollRun
**Primary Key:** `payroll_run_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |

#### Payslip
**Primary Key:** `payslip_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `payroll_run_id` | PayrollRun | Yes |

#### TaxWithholding
**Primary Key:** `withholding_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### DirectDeposit
**Primary Key:** `direct_deposit_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### Garnishment
**Primary Key:** `garnishment_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### YearEndDocument
**Primary Key:** `document_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

---

### Benefits

#### BenefitPlan
**Primary Key:** `plan_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |
| `carrier_id` | Carrier | No |

#### BenefitEnrollment
**Primary Key:** `enrollment_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `plan_id` | BenefitPlan | Yes |
| `life_event_id` | LifeEvent | No |

#### Carrier
**Primary Key:** `carrier_id`

| Attribute | References | Required |
|-----------|------------|----------|
| *(none)* | - | - |

#### Dependent
**Primary Key:** `dependent_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### LifeEvent
**Primary Key:** `life_event_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### COBRAEvent
**Primary Key:** `cobra_event_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

---

### Time & Attendance

#### Timesheet
**Primary Key:** `timesheet_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### LeaveRequest
**Primary Key:** `request_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `leave_policy_id` | LeavePolicy | No |

#### LeaveBalance
**Primary Key:** `balance_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `leave_policy_id` | LeavePolicy | No |

#### LeavePolicy
**Primary Key:** `policy_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |

#### Shift
**Primary Key:** `shift_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |

#### Schedule
**Primary Key:** `schedule_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### Holiday
**Primary Key:** `holiday_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |

#### Absence
**Primary Key:** `absence_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `leave_request_id` | LeaveRequest | No |
| `pay_component_id` | PayComponent | No |

---

### Talent Management

#### JobRequisition
**Primary Key:** `requisition_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |
| `department_id` | Department | No |
| `position_id` | Position | No |
| `job_id` | Job | No |
| `hiring_manager_id` | Employee | No |
| `recruiter_id` | Employee | No |
| `work_location_id` | (External) | No |

#### Applicant
**Primary Key:** `applicant_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `referrer_employee_id` | Employee | No |

#### Application
**Primary Key:** `application_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `applicant_id` | Applicant | Yes |
| `requisition_id` | JobRequisition | Yes |
| `offer_id` | (External) | No |

#### OnboardingTask
**Primary Key:** `task_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `assigned_to` | Employee | No |
| `template_id` | (External) | No |

#### PerformanceReview
**Primary Key:** `review_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `reviewer_id` | Employee | Yes |
| `hr_reviewer_id` | Employee | No |

#### Goal
**Primary Key:** `goal_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `parent_goal_id` | Goal (self) | No |
| `review_id` | PerformanceReview | No |

#### SuccessionPlan
**Primary Key:** `plan_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `position_id` | Position | Yes |
| `incumbent_id` | Employee | No |

**Nested: SuccessionCandidate**

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### CareerPath
**Primary Key:** `career_path_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `job_family_id` | JobFamily | No |

**Nested: CareerPathStep**

| Attribute | References | Required |
|-----------|------------|----------|
| `job_id` | Job | No |

#### Feedback
**Primary Key:** `feedback_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `provider_id` | Employee | Yes |
| `review_cycle_id` | (External) | No |

---

### Learning Management

#### Course
**Primary Key:** `course_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |
| `instructor_id` | Employee | No |

#### CourseSession
**Primary Key:** `session_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `course_id` | Course | Yes |
| `instructor_id` | Employee | No |

#### CourseEnrollment
**Primary Key:** `enrollment_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `course_id` | Course | Yes |
| `session_id` | CourseSession | No |
| `manager_id` | Employee | No |
| `approved_by` | (string, not ID ref) | No |

#### Certification
**Primary Key:** `certification_id`

| Attribute | References | Required |
|-----------|------------|----------|
| *(none)* | - | - |

#### EmployeeCertification
**Primary Key:** `employee_certification_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `certification_id` | Certification | Yes |

#### Skill
**Primary Key:** `skill_id`

| Attribute | References | Required |
|-----------|------------|----------|
| *(none)* | - | - |

#### EmployeeSkill
**Primary Key:** `employee_skill_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `skill_id` | Skill | Yes |

#### TrainingRecord
**Primary Key:** `record_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `course_id` | Course | No |

---

### Compensation Management

#### SalaryGrade
**Primary Key:** `grade_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |
| `salary_structure_id` | SalaryStructure | No |

#### SalaryStructure
**Primary Key:** `structure_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |

#### EmployeeCompensation
**Primary Key:** `compensation_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `salary_grade_id` | SalaryGrade | No |

#### MeritIncrease
**Primary Key:** `increase_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `merit_cycle_id` | MeritCycle | Yes |
| `review_id` | PerformanceReview | No |

#### MeritCycle
**Primary Key:** `cycle_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |

#### BonusPlan
**Primary Key:** `plan_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |

#### BonusPayment
**Primary Key:** `payment_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `bonus_plan_id` | BonusPlan | No |
| `payroll_run_id` | PayrollRun | No |

#### EquityGrant
**Primary Key:** `grant_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |
| `plan_id` | (External equity plan) | No |

#### CompensationStatement
**Primary Key:** `statement_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `employee_id` | Employee | Yes |

#### MarketBenchmark
**Primary Key:** `benchmark_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `organization_id` | Organization | No |
| `job_id` | Job | No |

---

## Dependency Graph

```
                                    ┌─────────────┐
                                    │  JobFamily  │
                                    └──────┬──────┘
                                           │
                        ┌──────────────────┼──────────────────┐
                        │                  │                  │
                        ▼                  ▼                  ▼
                  ┌─────────┐        ┌─────────┐       ┌───────────┐
                  │   Job   │        │CareerPath│      │           │
                  └────┬────┘        └─────────┘       │           │
                       │                               │           │
         ┌─────────────┼─────────────┐                │           │
         │             │             │                │           │
         ▼             ▼             ▼                │           │
   ┌──────────┐  ┌──────────┐  ┌───────────┐         │           │
   │ Position │  │ Market   │  │JobRequisit│         │           │
   └────┬─────┘  │Benchmark │  │   ion     │         │           │
        │        └──────────┘  └─────┬─────┘         │           │
        │                            │               │           │
        ▼                            ▼               │           │
   ┌──────────┐              ┌─────────────┐        │           │
   │Succession│              │ Application │        │           │
   │  Plan    │              └──────┬──────┘        │           │
   └──────────┘                     │               │           │
                                    ▼               │           │
                              ┌───────────┐         │           │
                              │ Applicant │         │           │
                              └───────────┘         │           │
                                                    │           │
┌──────────────┐                                    │           │
│Organization  │◄───────────────────────────────────┘           │
└──────┬───────┘                                                │
       │                                                        │
       ├────────────────┬────────────────┬──────────────┐      │
       │                │                │              │      │
       ▼                ▼                ▼              ▼      │
┌────────────┐   ┌───────────┐   ┌────────────┐  ┌──────────┐ │
│ Department │   │PayStructure│  │BenefitPlan │  │MeritCycle│ │
└─────┬──────┘   └─────┬─────┘   └─────┬──────┘  └────┬─────┘ │
      │                │               │              │       │
      │                ▼               │              │       │
      │         ┌────────────┐        │              │       │
      │         │PayComponent│        │              │       │
      │         └────────────┘        │              │       │
      │                               │              │       │
      │    ┌──────────────────────────┼──────────────┘       │
      │    │                          │                      │
      ▼    ▼                          ▼                      │
┌──────────────────────────────────────────────────────────┐ │
│                        EMPLOYEE                          │◄┘
│  (Central hub - referenced by 38 other Prime Objects)    │
└────────────────────────────┬─────────────────────────────┘
                             │
    ┌────────────┬───────────┼───────────┬────────────┬────────────┐
    │            │           │           │            │            │
    ▼            ▼           ▼           ▼            ▼            ▼
┌────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌─────────┐
│Timesheet│ │LeaveReq │ │Payslip  │ │BenefitEnr│ │PerfRevw │ │EmpComp  │
└────────┘ └─────────┘ └─────────┘ └──────────┘ └─────────┘ └─────────┘
```

---

## Circular Dependencies

The following self-referential (circular) dependencies exist:

| Object | Attribute | Description |
|--------|-----------|-------------|
| Organization | `parent_organization_id` | Organizational hierarchy |
| Department | `parent_department_id` | Departmental hierarchy |
| Position | `reports_to_position_id` | Reporting structure |
| Employee | `manager_id` | Management hierarchy |
| Goal | `parent_goal_id` | Cascading goals |

**Handling Circular Dependencies in Mock Data:**
1. Create root-level objects first (where parent_id is null)
2. Create child objects in subsequent passes
3. Use a maximum depth limit (recommended: 5 levels)

---

## Mock Data Generation Guidelines

### Creation Order

To ensure referential integrity, create mock data in the following order:

#### Phase 1: Foundation Objects (No Dependencies)
```
1. JobFamily
2. Carrier
3. Certification
4. Skill
```

#### Phase 2: Core Organizational Structure
```
5. Organization (create root first, then children)
6. Job
7. Department (create root first, then children)
8. Position (create root first, then children)
```

#### Phase 3: Employee & Related Configuration
```
9. Employee (create managers first, then direct reports)
10. PayStructure
11. PayComponent
12. LeavePolicy
13. Shift
14. Holiday
15. BenefitPlan
16. SalaryStructure
17. SalaryGrade
18. BonusPlan
19. MeritCycle
20. Course
21. CourseSession
```

#### Phase 4: Employee-Dependent Objects
```
22. EmployeeDocument
23. ComplianceRecord
24. TaxWithholding
25. DirectDeposit
26. Garnishment
27. Dependent
28. LifeEvent
29. COBRAEvent
30. Timesheet
31. LeaveRequest
32. LeaveBalance
33. Schedule
34. Absence
35. EmployeeCompensation
36. EmployeeCertification
37. EmployeeSkill
38. TrainingRecord
39. CourseEnrollment
40. PerformanceReview
41. Goal
42. Feedback
43. OnboardingTask
44. CompensationStatement
45. EquityGrant
```

#### Phase 5: Transaction Objects
```
46. PayrollRun
47. Payslip
48. YearEndDocument
49. MeritIncrease
50. BonusPayment
```

#### Phase 6: Talent Acquisition
```
51. JobRequisition
52. Applicant
53. Application
```

#### Phase 7: Planning Objects
```
54. SuccessionPlan
55. CareerPath
56. MarketBenchmark
```

### ID Generation Strategy

For consistent mock data, use the following ID patterns:

| Object Type | ID Pattern | Example |
|-------------|------------|---------|
| Organization | `ORG-{4-digit}` | `ORG-0001` |
| Department | `DEPT-{4-digit}` | `DEPT-0001` |
| Employee | `EMP-{6-digit}` | `EMP-000001` |
| Position | `POS-{4-digit}` | `POS-0001` |
| Job | `JOB-{4-digit}` | `JOB-0001` |
| Other | `{PREFIX}-{UUID-short}` | `ENROLL-a1b2c3` |

### Recommended Mock Data Quantities

For a realistic test dataset:

| Object | Recommended Count | Notes |
|--------|-------------------|-------|
| Organization | 5-10 | Include hierarchy |
| Department | 20-30 | ~3-6 per org |
| Job | 50-100 | Various levels |
| Position | 100-200 | Multiple per job |
| Employee | 500-1000 | Mix of statuses |
| BenefitPlan | 10-20 | Various types |
| Course | 50-100 | Various categories |

### Consistency Rules

1. **Date Consistency**: Ensure `effective_date` <= `end_date`
2. **Hierarchy Consistency**: Parent objects must exist before children
3. **Status Consistency**: Terminated employees shouldn't have active enrollments
4. **Manager Consistency**: Manager's `hire_date` should precede their reports'
5. **Org Consistency**: Department's org should match employee's org

---

## Cross-Module Reference Summary

| From Module | To Module | Objects Involved |
|-------------|-----------|------------------|
| Payroll | Core HR | Employee, Organization |
| Benefits | Core HR | Employee, Organization |
| Time & Attendance | Core HR | Employee, Organization |
| Time & Attendance | Payroll | PayComponent |
| Talent | Core HR | Employee, Organization, Department, Position, Job, JobFamily |
| Learning | Core HR | Employee, Organization |
| Compensation | Core HR | Employee, Organization, Job |
| Compensation | Payroll | PayrollRun |
| Compensation | Talent | PerformanceReview |

---

*Document generated for L8ERP HCM Module*
*Version: 1.0*
*Last Updated: 2026-01-22*
