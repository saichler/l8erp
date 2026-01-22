# HCM Services Implementation Plan

## Overview

Create service files for all HCM Prime Objects, using `go/erp/hcm/employees/EmployeeService.go` as the template. Each service will be in its own package directory under `go/erp/hcm/`.

## Service Template Pattern

Based on `EmployeeService.go`, each service follows this pattern:

```go
package <lowercase_name>

import (
    "errors"
    _ "github.com/lib/pq"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/hcm"
    "github.com/saichler/l8orm/go/orm/persist"
    "github.com/saichler/l8orm/go/orm/plugins/postgres"
    "github.com/saichler/l8srlz/go/serialize/object"
    "github.com/saichler/l8types/go/ifs"
    "github.com/saichler/l8types/go/types/l8api"
    "github.com/saichler/l8types/go/types/l8web"
    "github.com/saichler/l8utils/go/utils/web"
)

const (
    ServiceName = "<ObjectName>"
    ServiceArea = byte(<unique_number>)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
    // ... setup code
    sla.SetServiceItem(&hcm.<ObjectName>{})
    sla.SetServiceItemList(&hcm.<ObjectName>List{})
    sla.SetPrimaryKeys("<primary_key_field>")
    // ... endpoint setup
}

func <PluralName>(vnic ifs.IVNic) (ifs.IServiceHandler, bool) { ... }
func <SingularName>(<key> string, vnic ifs.IVNic) (*hcm.<ObjectName>, error) { ... }
```

## Prime Objects by Module (56 new services + 1 existing)

### Core HR Module (8 objects) - ServiceArea: 0-7
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 1 | Employee | employees/ | 0 | EmployeeId | (EXISTS)
| 2 | Organization | organizations/ | 1 | OrganizationId |
| 3 | Department | departments/ | 2 | DepartmentId |
| 4 | Position | positions/ | 3 | PositionId |
| 5 | Job | jobs/ | 4 | JobId |
| 6 | JobFamily | jobfamilies/ | 5 | JobFamilyId |
| 7 | EmployeeDocument | employeedocuments/ | 6 | DocumentId |
| 8 | ComplianceRecord | compliancerecords/ | 7 | RecordId |

### Payroll Module (8 objects) - ServiceArea: 10-17
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 9 | PayStructure | paystructures/ | 10 | PayStructureId |
| 10 | PayComponent | paycomponents/ | 11 | ComponentId |
| 11 | PayrollRun | payrollruns/ | 12 | PayrollRunId |
| 12 | Payslip | payslips/ | 13 | PayslipId |
| 13 | TaxWithholding | taxwithholdings/ | 14 | WithholdingId |
| 14 | DirectDeposit | directdeposits/ | 15 | DirectDepositId |
| 15 | Garnishment | garnishments/ | 16 | GarnishmentId |
| 16 | YearEndDocument | yearenddocuments/ | 17 | DocumentId |

### Benefits Module (6 objects) - ServiceArea: 20-25
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 17 | BenefitPlan | benefitplans/ | 20 | PlanId |
| 18 | BenefitEnrollment | benefitenrollments/ | 21 | EnrollmentId |
| 19 | Dependent | dependents/ | 22 | DependentId |
| 20 | LifeEvent | lifeevents/ | 23 | LifeEventId |
| 21 | Carrier | carriers/ | 24 | CarrierId |
| 22 | COBRAEvent | cobraevents/ | 25 | CobraEventId |

### Time & Attendance Module (8 objects) - ServiceArea: 30-37
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 23 | Timesheet | timesheets/ | 30 | TimesheetId |
| 24 | LeaveRequest | leaverequests/ | 31 | RequestId |
| 25 | LeaveBalance | leavebalances/ | 32 | BalanceId |
| 26 | LeavePolicy | leavepolicies/ | 33 | PolicyId |
| 27 | Shift | shifts/ | 34 | ShiftId |
| 28 | Schedule | schedules/ | 35 | ScheduleId |
| 29 | Holiday | holidays/ | 36 | HolidayId |
| 30 | Absence | absences/ | 37 | AbsenceId |

### Talent Module (9 objects) - ServiceArea: 40-48
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 31 | JobRequisition | jobrequisitions/ | 40 | RequisitionId |
| 32 | Applicant | applicants/ | 41 | ApplicantId |
| 33 | Application | applications/ | 42 | ApplicationId |
| 34 | OnboardingTask | onboardingtasks/ | 43 | TaskId |
| 35 | PerformanceReview | performancereviews/ | 44 | ReviewId |
| 36 | Goal | goals/ | 45 | GoalId |
| 37 | SuccessionPlan | successionplans/ | 46 | PlanId |
| 38 | CareerPath | careerpaths/ | 47 | CareerPathId |
| 39 | Feedback | feedbacks/ | 48 | FeedbackId |

### Learning Module (8 objects) - ServiceArea: 50-57
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 40 | Course | courses/ | 50 | CourseId |
| 41 | CourseSession | coursesessions/ | 51 | SessionId |
| 42 | CourseEnrollment | courseenrollments/ | 52 | EnrollmentId |
| 43 | Certification | certifications/ | 53 | CertificationId |
| 44 | EmployeeCertification | employeecertifications/ | 54 | EmployeeCertificationId |
| 45 | Skill | skills/ | 55 | SkillId |
| 46 | EmployeeSkill | employeeskills/ | 56 | EmployeeSkillId |
| 47 | TrainingRecord | trainingrecords/ | 57 | RecordId |

### Compensation Module (10 objects) - ServiceArea: 60-69
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 48 | SalaryGrade | salarygrades/ | 60 | GradeId |
| 49 | SalaryStructure | salarystructures/ | 61 | StructureId |
| 50 | EmployeeCompensation | employeecompensations/ | 62 | CompensationId |
| 51 | MeritIncrease | meritincreases/ | 63 | IncreaseId |
| 52 | MeritCycle | meritcycles/ | 64 | CycleId |
| 53 | BonusPlan | bonusplans/ | 65 | PlanId |
| 54 | BonusPayment | bonuspayments/ | 66 | PaymentId |
| 55 | EquityGrant | equitygrants/ | 67 | GrantId |
| 56 | CompensationStatement | compensationstatements/ | 68 | StatementId |
| 57 | MarketBenchmark | marketbenchmarks/ | 69 | BenchmarkId |

---

## Directory Structure

```
go/erp/hcm/
├── hcm_main.go
├── employees/
│   └── EmployeeService.go          # EXISTS
├── organizations/
│   └── OrganizationService.go
├── departments/
│   └── DepartmentService.go
├── positions/
│   └── PositionService.go
├── jobs/
│   └── JobService.go
├── jobfamilies/
│   └── JobFamilyService.go
├── employeedocuments/
│   └── EmployeeDocumentService.go
├── compliancerecords/
│   └── ComplianceRecordService.go
├── paystructures/
│   └── PayStructureService.go
├── paycomponents/
│   └── PayComponentService.go
├── payrollruns/
│   └── PayrollRunService.go
├── payslips/
│   └── PayslipService.go
├── taxwithholdings/
│   └── TaxWithholdingService.go
├── directdeposits/
│   └── DirectDepositService.go
├── garnishments/
│   └── GarnishmentService.go
├── yearenddocuments/
│   └── YearEndDocumentService.go
├── benefitplans/
│   └── BenefitPlanService.go
├── benefitenrollments/
│   └── BenefitEnrollmentService.go
├── dependents/
│   └── DependentService.go
├── lifeevents/
│   └── LifeEventService.go
├── carriers/
│   └── CarrierService.go
├── cobraevents/
│   └── COBRAEventService.go
├── timesheets/
│   └── TimesheetService.go
├── leaverequests/
│   └── LeaveRequestService.go
├── leavebalances/
│   └── LeaveBalanceService.go
├── leavepolicies/
│   └── LeavePolicyService.go
├── shifts/
│   └── ShiftService.go
├── schedules/
│   └── ScheduleService.go
├── holidays/
│   └── HolidayService.go
├── absences/
│   └── AbsenceService.go
├── jobrequisitions/
│   └── JobRequisitionService.go
├── applicants/
│   └── ApplicantService.go
├── applications/
│   └── ApplicationService.go
├── onboardingtasks/
│   └── OnboardingTaskService.go
├── performancereviews/
│   └── PerformanceReviewService.go
├── goals/
│   └── GoalService.go
├── successionplans/
│   └── SuccessionPlanService.go
├── careerpaths/
│   └── CareerPathService.go
├── feedbacks/
│   └── FeedbackService.go
├── courses/
│   └── CourseService.go
├── coursesessions/
│   └── CourseSessionService.go
├── courseenrollments/
│   └── CourseEnrollmentService.go
├── certifications/
│   └── CertificationService.go
├── employeecertifications/
│   └── EmployeeCertificationService.go
├── skills/
│   └── SkillService.go
├── employeeskills/
│   └── EmployeeSkillService.go
├── trainingrecords/
│   └── TrainingRecordService.go
├── salarygrades/
│   └── SalaryGradeService.go
├── salarystructures/
│   └── SalaryStructureService.go
├── employeecompensations/
│   └── EmployeeCompensationService.go
├── meritincreases/
│   └── MeritIncreaseService.go
├── meritcycles/
│   └── MeritCycleService.go
├── bonusplans/
│   └── BonusPlanService.go
├── bonuspayments/
│   └── BonusPaymentService.go
├── equitygrants/
│   └── EquityGrantService.go
├── compensationstatements/
│   └── CompensationStatementService.go
└── marketbenchmarks/
    └── MarketBenchmarkService.go
```

---

## Updated hcm_main.go activateServices Function

```go
func activateServices(nic ifs.IVNic) {
    // Core HR
    employees.Activate(common.DB_CREDS, common.DB_NAME, nic)
    organizations.Activate(common.DB_CREDS, common.DB_NAME, nic)
    departments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    positions.Activate(common.DB_CREDS, common.DB_NAME, nic)
    jobs.Activate(common.DB_CREDS, common.DB_NAME, nic)
    jobfamilies.Activate(common.DB_CREDS, common.DB_NAME, nic)
    employeedocuments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    compliancerecords.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Payroll
    paystructures.Activate(common.DB_CREDS, common.DB_NAME, nic)
    paycomponents.Activate(common.DB_CREDS, common.DB_NAME, nic)
    payrollruns.Activate(common.DB_CREDS, common.DB_NAME, nic)
    payslips.Activate(common.DB_CREDS, common.DB_NAME, nic)
    taxwithholdings.Activate(common.DB_CREDS, common.DB_NAME, nic)
    directdeposits.Activate(common.DB_CREDS, common.DB_NAME, nic)
    garnishments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    yearenddocuments.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Benefits
    benefitplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    benefitenrollments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    dependents.Activate(common.DB_CREDS, common.DB_NAME, nic)
    lifeevents.Activate(common.DB_CREDS, common.DB_NAME, nic)
    carriers.Activate(common.DB_CREDS, common.DB_NAME, nic)
    cobraevents.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Time & Attendance
    timesheets.Activate(common.DB_CREDS, common.DB_NAME, nic)
    leaverequests.Activate(common.DB_CREDS, common.DB_NAME, nic)
    leavebalances.Activate(common.DB_CREDS, common.DB_NAME, nic)
    leavepolicies.Activate(common.DB_CREDS, common.DB_NAME, nic)
    shifts.Activate(common.DB_CREDS, common.DB_NAME, nic)
    schedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
    holidays.Activate(common.DB_CREDS, common.DB_NAME, nic)
    absences.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Talent
    jobrequisitions.Activate(common.DB_CREDS, common.DB_NAME, nic)
    applicants.Activate(common.DB_CREDS, common.DB_NAME, nic)
    applications.Activate(common.DB_CREDS, common.DB_NAME, nic)
    onboardingtasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
    performancereviews.Activate(common.DB_CREDS, common.DB_NAME, nic)
    goals.Activate(common.DB_CREDS, common.DB_NAME, nic)
    successionplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    careerpaths.Activate(common.DB_CREDS, common.DB_NAME, nic)
    feedbacks.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Learning
    courses.Activate(common.DB_CREDS, common.DB_NAME, nic)
    coursesessions.Activate(common.DB_CREDS, common.DB_NAME, nic)
    courseenrollments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    certifications.Activate(common.DB_CREDS, common.DB_NAME, nic)
    employeecertifications.Activate(common.DB_CREDS, common.DB_NAME, nic)
    skills.Activate(common.DB_CREDS, common.DB_NAME, nic)
    employeeskills.Activate(common.DB_CREDS, common.DB_NAME, nic)
    trainingrecords.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Compensation
    salarygrades.Activate(common.DB_CREDS, common.DB_NAME, nic)
    salarystructures.Activate(common.DB_CREDS, common.DB_NAME, nic)
    employeecompensations.Activate(common.DB_CREDS, common.DB_NAME, nic)
    meritincreases.Activate(common.DB_CREDS, common.DB_NAME, nic)
    meritcycles.Activate(common.DB_CREDS, common.DB_NAME, nic)
    bonusplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    bonuspayments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    equitygrants.Activate(common.DB_CREDS, common.DB_NAME, nic)
    compensationstatements.Activate(common.DB_CREDS, common.DB_NAME, nic)
    marketbenchmarks.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
```

---

## Implementation Steps

1. **Create 56 service directories** under `go/erp/hcm/`
2. **Create 56 service files** following the EmployeeService.go template
3. **Update hcm_main.go** with:
   - Import statements for all 56 new packages
   - activateServices function calling all Activate functions
4. **Test compilation** with `go build`

---

## Service File Template

Each service file (e.g., `OrganizationService.go`) follows this pattern:

```go
// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.

package organizations

import (
    "errors"
    _ "github.com/lib/pq"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/hcm"
    "github.com/saichler/l8orm/go/orm/persist"
    "github.com/saichler/l8orm/go/orm/plugins/postgres"
    "github.com/saichler/l8srlz/go/serialize/object"
    "github.com/saichler/l8types/go/ifs"
    "github.com/saichler/l8types/go/types/l8api"
    "github.com/saichler/l8types/go/types/l8web"
    "github.com/saichler/l8utils/go/utils/web"
)

const (
    ServiceName = "Organization"
    ServiceArea = byte(1)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
    _, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
    if err != nil {
        panic(err)
    }
    db := common.OpenDBConection(dbname, user, pass)
    p := postgres.NewPostgres(db, vnic.Resources())

    sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true, nil)
    sla.SetServiceItem(&hcm.Organization{})
    sla.SetServiceItemList(&hcm.OrganizationList{})
    sla.SetPrimaryKeys("OrganizationId")
    sla.SetArgs(p)

    ws := web.New(ServiceName, ServiceArea, 0)
    ws.AddEndpoint(&hcm.Organization{}, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&hcm.OrganizationList{}, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&hcm.Organization{}, ifs.PUT, &l8web.L8Empty{})
    ws.AddEndpoint(&hcm.Organization{}, ifs.PATCH, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &hcm.OrganizationList{})
    sla.SetWebService(ws)

    vnic.Resources().Services().Activate(sla, vnic)
}

func Organizations(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
    return vnic.Resources().Services().ServiceHandler(ServiceName, ServiceArea)
}

func Organization(organizationId string, vnic ifs.IVNic) (*hcm.Organization, error) {
    this, ok := Organizations(vnic)
    if !ok {
        return nil, errors.New("No Organization Service Found")
    }
    filter := &hcm.Organization{OrganizationId: organizationId}
    resp := this.Get(object.New(nil, filter), vnic)
    if resp.Error() != nil {
        return nil, resp.Error()
    }
    return resp.Element().(*hcm.Organization), nil
}
```

---

## Summary

- **Total Prime Objects**: 57
- **Existing Services**: 1 (Employee)
- **New Services to Create**: 56
- **Modules**: 7 (Core HR, Payroll, Benefits, Time & Attendance, Talent, Learning, Compensation)
