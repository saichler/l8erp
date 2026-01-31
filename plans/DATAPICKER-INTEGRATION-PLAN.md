# Data Picker (Reference Picker) Integration Plan for HCM Modules

## Executive Summary

This plan outlines the conversion of all `type: 'lookup'` fields to `type: 'reference'` fields across HCM modules, enabling the new Data Picker component (`ERPReferencePicker`) for selecting related entities.

**Current State:**
- **5 fields** use `type: 'reference'` (data picker) - all in Employee form
- **91 fields** use `type: 'lookup'` (plain text input) - need conversion

**Goal:** Convert all 91 lookup fields to use the data picker component.

---

## Global Rules Compliance

### File Size (< 500 lines)
Current form file sizes:
- `compensation-forms.js`: 426 lines
- `payroll.js`: 446 lines
- `talent-forms.js`: 331 lines

**Risk:** Adding verbose inline `referenceConfig` blocks (8-10 lines each) would push files over 500 lines.

**Solution:** Use a centralized Reference Registry instead of inline configs.

### No Duplicate Code
**Risk:** 37 Employee references, 18 Organization references would duplicate the same config.

**Solution:** One config per model in the registry, referenced by all fields.

### Future-Proof Design
**Solution:** Registry at ERP level (`shared/`), not HCM level. Future modules (Financial, SCM, Manufacturing, etc.) will reuse the same registry.

---

## 1. Data Picker Component Deep Dive

### Location
`/go/erp/ui/web/reference_picker/` (6 files)

### Public API (`window.ERPReferencePicker`)

```javascript
ERPReferencePicker.attach(inputElement, options)  // Attach picker to input
ERPReferencePicker.open(inputElement)             // Open picker
ERPReferencePicker.close()                        // Close picker
ERPReferencePicker.getValue(inputElement)         // Get selected ID
ERPReferencePicker.getItem(inputElement)          // Get selected item data
ERPReferencePicker.setValue(inputElement, id, displayValue, item)  // Set value
ERPReferencePicker.detach(inputElement)           // Detach picker
```

### Endpoint Discovery (Already Implemented!)

**Key insight:** Endpoints are auto-discovered from `HCM.modules` - no need to specify them!

```javascript
// In erp-forms.js:337-354
function getEndpointForModel(modelName) {
    for (const moduleKey in HCM.modules) {
        const module = HCM.modules[moduleKey];
        if (module.services) {
            for (const service of module.services) {
                if (service.model === modelName) {
                    return service.endpoint;  // e.g., '/erp/30/Employee'
                }
            }
        }
    }
    return null;
}
```

**HCM.modules structure** (from `hcm-config.js`):
```javascript
HCM.modules = {
    'core-hr': {
        services: [
            { key: 'employees', model: 'Employee', endpoint: '/erp/30/Employee' },
            { key: 'positions', model: 'Position', endpoint: '/erp/30/Position' },
            // ...
        ]
    },
    // ... 7 modules, 57 services total
};
```

### L8Query Construction (reference-picker-data.js:14-49)

```sql
select <columns> from <modelName> [where <conditions>] limit <pageSize> page <pageIndex> sort-by <sortColumn> [descending]
```

**Example query:**
```sql
select employeeId,lastName,firstName from Employee where lastName=Smi* limit 10 page 0 sort-by lastName
```

**Components:**
| Part | Source | Example |
|------|--------|---------|
| Columns | `config.selectColumns` | `employeeId,lastName,firstName` |
| Model | `config.modelName` | `Employee` |
| Base filter | `config.baseWhereClause` | `isActive=true` |
| Search filter | `state.filterValue` + `*` | `lastName=Smi*` (prefix match) |
| Page size | `config.pageSize` (default: 10) | `limit 10` |
| Page index | `state.currentPage` (0-indexed) | `page 0` |
| Sort | `config.sortColumn` + direction | `sort-by lastName descending` |

### API Request Format

```
GET <endpoint>?body=<URL-encoded JSON>

// JSON payload:
{ "text": "select employeeId,lastName,firstName from Employee limit 10 page 0 sort-by lastName" }
```

### Response Structure

```javascript
{
    list: [
        { employeeId: "E001", lastName: "Smith", firstName: "John" },
        { employeeId: "E002", lastName: "Jones", firstName: "Jane" }
    ],
    metadata: {
        keyCount: {
            counts: { Total: 150 }  // Total matching records (for pagination)
        }
    }
}
```

### Required vs Optional Config

| Property | Required | Description |
|----------|----------|-------------|
| `modelName` | Yes | Must match `HCM.modules[].services[].model` |
| `idColumn` | Yes | Primary key column to return |
| `displayColumn` | Yes | Column for display text |
| `endpoint` | **No!** | Auto-discovered from `HCM.modules` |
| `selectColumns` | No | Defaults to `[idColumn, displayColumn]` |
| `displayFormat` | No | Function `(item) => string` for custom formatting |
| `displayLabel` | No | Sort header label (defaults to displayColumn) |
| `title` | No | Popup title (defaults to "Select {modelName}") |
| `baseWhereClause` | No | Static filter (e.g., `isActive=true`) |
| `filterColumn` | No | Column to search (defaults to displayColumn) |
| `sortColumn` | No | Column to sort (defaults to displayColumn) |
| `pageSize` | No | Items per page (default: 10) |
| `filterDebounceMs` | No | Filter debounce (default: 500ms) |

---

## 2. Current Data Picker Usage (5 fields)

All in `core-hr/core-hr-forms.js` Employee form:

| Field | Model | Display |
|-------|-------|---------|
| `organizationId` | Organization | name |
| `departmentId` | Department | name |
| `positionId` | Position | title |
| `jobId` | Job | title |
| `managerId` | Employee | lastName, firstName (custom format) |

---

## 3. Fields Requiring Conversion (91 fields)

### Summary by Module

| Module | File | Lookup Fields | Priority |
|--------|------|---------------|----------|
| Core HR | `core-hr-forms.js` | 11 | High |
| Time & Attendance | `time-forms.js` | 12 | High |
| Benefits | `benefits-forms.js` | 8 | Medium |
| Talent Management | `talent-forms.js` | 20 | Medium |
| Learning | `learning-forms.js` | 14 | Medium |
| Compensation | `compensation-forms.js` | 13 | Medium |
| Payroll | `payroll.js` | 13 | Low |
| **Total** | | **91** | |

---

### 3.1 Core HR Module (11 fields)

**File:** `core-hr/core-hr-forms.js`

| Form | Field | Model | Display Column | Notes |
|------|-------|-------|----------------|-------|
| Organization | `parentOrganizationId` | Organization | name | Self-reference |
| Department | `organizationId` | Organization | name | Required |
| Department | `parentDepartmentId` | Department | name | Self-reference |
| Department | `managerId` | Employee | lastName, firstName | Custom format |
| Position | `jobId` | Job | title | Required |
| Position | `departmentId` | Department | name | Required |
| Position | `organizationId` | Organization | name | |
| Position | `reportsToPositionId` | Position | title | Self-reference |
| Job | `jobFamilyId` | JobFamily | name | |
| EmployeeDocument | `employeeId` | Employee | lastName, firstName | Required, custom format |
| ComplianceRecord | `employeeId` | Employee | lastName, firstName | Required, custom format |
| ComplianceRecord | `documentId` | EmployeeDocument | name | |

---

### 3.2 Time & Attendance Module (12 fields)

**File:** `time/time-forms.js`

| Form | Field | Model | Display Column |
|------|-------|-------|----------------|
| Timesheet | `employeeId` | Employee | lastName, firstName |
| LeaveRequest | `employeeId` | Employee | lastName, firstName |
| LeaveRequest | `leavePolicyId` | LeavePolicy | name |
| LeaveBalance | `employeeId` | Employee | lastName, firstName |
| LeaveBalance | `leavePolicyId` | LeavePolicy | name |
| LeavePolicy | `organizationId` | Organization | name |
| Shift | `organizationId` | Organization | name |
| Schedule | `employeeId` | Employee | lastName, firstName |
| Holiday | `organizationId` | Organization | name |
| Absence | `employeeId` | Employee | lastName, firstName |
| Absence | `leaveRequestId` | LeaveRequest | reason (or ID) |
| Absence | `payComponentId` | PayComponent | name |

---

### 3.3 Benefits Module (8 fields)

**File:** `benefits/benefits-forms.js`

| Form | Field | Model | Display Column |
|------|-------|-------|----------------|
| BenefitPlan | `organizationId` | Organization | name |
| BenefitPlan | `carrierId` | Carrier | name |
| BenefitEnrollment | `employeeId` | Employee | lastName, firstName |
| BenefitEnrollment | `planId` | BenefitPlan | name |
| BenefitEnrollment | `lifeEventId` | LifeEvent | eventType |
| Dependent | `employeeId` | Employee | lastName, firstName |
| LifeEvent | `employeeId` | Employee | lastName, firstName |
| COBRAEvent | `employeeId` | Employee | lastName, firstName |

---

### 3.4 Talent Management Module (20 fields)

**File:** `talent/talent-forms.js`

| Form | Field | Model | Display Column |
|------|-------|-------|----------------|
| PerformanceReview | `employeeId` | Employee | lastName, firstName |
| PerformanceReview | `reviewerId` | Employee | lastName, firstName |
| Goal | `employeeId` | Employee | lastName, firstName |
| Goal | `parentGoalId` | Goal | title |
| Feedback | `employeeId` | Employee | lastName, firstName |
| Feedback | `providerId` | Employee | lastName, firstName |
| CareerPath | `jobFamilyId` | JobFamily | name |
| SuccessionPlan | `positionId` | Position | title |
| SuccessionPlan | `incumbentId` | Employee | lastName, firstName |
| JobRequisition | `organizationId` | Organization | name |
| JobRequisition | `departmentId` | Department | name |
| JobRequisition | `positionId` | Position | title |
| JobRequisition | `jobId` | Job | title |
| JobRequisition | `hiringManagerId` | Employee | lastName, firstName |
| JobRequisition | `recruiterId` | Employee | lastName, firstName |
| Applicant | `referrerEmployeeId` | Employee | lastName, firstName |
| Application | `applicantId` | Applicant | lastName, firstName |
| Application | `requisitionId` | JobRequisition | title |
| OnboardingTask | `employeeId` | Employee | lastName, firstName |
| OnboardingTask | `assignedTo` | Employee | lastName, firstName |

---

### 3.5 Learning Module (14 fields)

**File:** `learning/learning-forms.js`

| Form | Field | Model | Display Column |
|------|-------|-------|----------------|
| Course | `organizationId` | Organization | name |
| Course | `instructorId` | Employee | lastName, firstName |
| CourseSession | `courseId` | Course | title |
| CourseSession | `instructorId` | Employee | lastName, firstName |
| CourseEnrollment | `employeeId` | Employee | lastName, firstName |
| CourseEnrollment | `courseId` | Course | title |
| CourseEnrollment | `sessionId` | CourseSession | (composite) |
| CourseEnrollment | `managerId` | Employee | lastName, firstName |
| EmployeeCertification | `employeeId` | Employee | lastName, firstName |
| EmployeeCertification | `certificationId` | Certification | name |
| EmployeeSkill | `employeeId` | Employee | lastName, firstName |
| EmployeeSkill | `skillId` | Skill | name |
| TrainingRecord | `employeeId` | Employee | lastName, firstName |
| TrainingRecord | `courseId` | Course | title |

---

### 3.6 Compensation Module (13 fields)

**File:** `compensation/compensation-forms.js`

| Form | Field | Model | Display Column |
|------|-------|-------|----------------|
| SalaryGrade | `organizationId` | Organization | name |
| SalaryGrade | `salaryStructureId` | SalaryStructure | name |
| SalaryStructure | `organizationId` | Organization | name |
| EmployeeCompensation | `employeeId` | Employee | lastName, firstName |
| EmployeeCompensation | `salaryGradeId` | SalaryGrade | name |
| MeritIncrease | `employeeId` | Employee | lastName, firstName |
| MeritIncrease | `meritCycleId` | MeritCycle | name |
| MeritIncrease | `reviewId` | PerformanceReview | (composite) |
| MeritCycle | `organizationId` | Organization | name |
| BonusPlan | `organizationId` | Organization | name |
| BonusPayment | `employeeId` | Employee | lastName, firstName |
| BonusPayment | `bonusPlanId` | BonusPlan | name |
| EquityGrant | `employeeId` | Employee | lastName, firstName |
| CompensationStatement | `employeeId` | Employee | lastName, firstName |
| MarketBenchmark | `organizationId` | Organization | name |
| MarketBenchmark | `jobId` | Job | title |

---

### 3.7 Payroll Module (13 fields)

**File:** `payroll/payroll.js`

| Form | Field | Model | Display Column |
|------|-------|-------|----------------|
| PayStructure | `organizationId` | Organization | name |
| PayComponent | `organizationId` | Organization | name |
| PayrollRun | `organizationId` | Organization | name |
| Payslip | `employeeId` | Employee | lastName, firstName |
| Payslip | `payrollRunId` | PayrollRun | (composite) |
| TaxWithholding | `employeeId` | Employee | lastName, firstName |
| DirectDeposit | `employeeId` | Employee | lastName, firstName |
| Garnishment | `employeeId` | Employee | lastName, firstName |
| YearEndDocument | `employeeId` | Employee | lastName, firstName |
| YearEndDocument | `organizationId` | Organization | name |

---

## 4. Reference Configuration Patterns

### 4.1 Standard Model References

Most references follow this pattern:

```javascript
{
    key: 'organizationId',
    label: 'Organization',
    type: 'reference',
    referenceConfig: {
        modelName: 'Organization',
        idColumn: 'organizationId',
        displayColumn: 'name',
        title: 'Select Organization'
    }
}
```

### 4.2 Employee References (Custom Display)

Employee references need custom formatting for "Last, First" display:

```javascript
{
    key: 'managerId',
    label: 'Manager',
    type: 'reference',
    referenceConfig: {
        modelName: 'Employee',
        idColumn: 'employeeId',
        displayColumn: 'lastName',
        selectColumns: ['employeeId', 'lastName', 'firstName'],
        displayFormat: function(item) {
            return item.lastName + ', ' + item.firstName;
        },
        displayLabel: 'Name',
        title: 'Select Manager'
    }
}
```

### 4.3 Self-References

For hierarchical models (Organization, Department, Position, Goal):

```javascript
{
    key: 'parentOrganizationId',
    label: 'Parent Organization',
    type: 'reference',
    referenceConfig: {
        modelName: 'Organization',
        idColumn: 'organizationId',
        displayColumn: 'name',
        title: 'Select Parent Organization'
    }
}
```

---

## 5. Model Reference Summary (from HCM Dependency Map)

| Referenced Model | Times Referenced | Display Column |
|-----------------|------------------|----------------|
| Employee | 37 | lastName, firstName (custom) |
| Organization | 18 | name |
| Department | 4 | name |
| Position | 5 | title |
| Job | 5 | title |
| JobFamily | 3 | name |
| LeavePolicy | 3 | name |
| Course | 4 | title |
| BenefitPlan | 1 | name |
| Carrier | 1 | name |
| Others | 10 | varies |

---

## 6. Implementation Order

### Phase 0: Infrastructure (Required First)
1. **Create** `shared/reference-registry.js` with all model configs
2. **Modify** `shared/erp-forms.js` to lookup configs from registry
3. **Add** script tag in `app.html` (before erp-forms.js)
4. **Test** with existing Employee form (already uses `type: 'reference'`)

### Phase 1: Core HR (Priority: High)
1. Convert `core-hr-forms.js` 11 lookup fields: change `type: 'lookup'` → `type: 'reference'`
2. Test all Core HR forms

### Phase 2: Time & Attendance (Priority: High)
1. Convert `time-forms.js` 12 lookup fields
2. Test all Time forms

### Phase 3: Benefits (Priority: Medium)
1. Convert `benefits-forms.js` 8 lookup fields
2. Test all Benefits forms

### Phase 4: Talent Management (Priority: Medium)
1. Convert `talent-forms.js` 20 lookup fields
2. Test all Talent forms

### Phase 5: Learning (Priority: Medium)
1. Convert `learning-forms.js` 14 lookup fields
2. Test all Learning forms

### Phase 6: Compensation (Priority: Medium)
1. Convert `compensation-forms.js` 13 lookup fields
2. Test all Compensation forms

### Phase 7: Payroll (Priority: Low)
1. Convert `payroll.js` 13 lookup fields
2. Test all Payroll forms

### Phase 8: Cleanup (Optional)
1. Refactor existing 5 verbose Employee referenceConfigs to use registry
2. Remove inline referenceConfig from Employee form fields

---

## 7. Reference Registry Architecture (Compliant Approach)

### Problem with Inline Configs
The current Employee form uses verbose inline `referenceConfig` (8-10 lines per field).
Converting 91 fields this way would:
- Bloat form files past 500 lines
- Duplicate the same config 37 times for Employee, 18 times for Organization, etc.

### Solution: Centralized Reference Registry

**New file:** `shared/reference-registry.js`

**Key insight:** `endpoint` is NOT needed - it's auto-discovered from `HCM.modules`!

```javascript
/**
 * ERP Reference Registry
 * Central configuration for all reference/lookup fields.
 * Used by erp-forms.js to auto-configure reference pickers.
 *
 * NOTE: Endpoints are NOT stored here - they are auto-discovered
 * from HCM.modules (or future Financial.modules, SCM.modules, etc.)
 * based on the modelName.
 *
 * Future modules (Financial, SCM, etc.) add their models here.
 */
window.ERPReferenceRegistry = {
    // ========================================
    // Core HR Models
    // ========================================
    Employee: {
        idColumn: 'employeeId',
        displayColumn: 'lastName',
        selectColumns: ['employeeId', 'lastName', 'firstName'],
        displayFormat: (item) => item.lastName + ', ' + item.firstName,
        displayLabel: 'Name'
    },
    Organization: {
        idColumn: 'organizationId',
        displayColumn: 'name'
    },
    Department: {
        idColumn: 'departmentId',
        displayColumn: 'name'
    },
    Position: {
        idColumn: 'positionId',
        displayColumn: 'title'
    },
    Job: {
        idColumn: 'jobId',
        displayColumn: 'title'
    },
    JobFamily: {
        idColumn: 'jobFamilyId',
        displayColumn: 'name'
    },
    EmployeeDocument: {
        idColumn: 'documentId',
        displayColumn: 'name'
    },

    // ========================================
    // Time & Attendance Models
    // ========================================
    LeavePolicy: {
        idColumn: 'policyId',
        displayColumn: 'name'
    },
    LeaveRequest: {
        idColumn: 'requestId',
        displayColumn: 'requestId'  // May need custom displayFormat
    },

    // ========================================
    // Benefits Models
    // ========================================
    BenefitPlan: {
        idColumn: 'planId',
        displayColumn: 'name'
    },
    Carrier: {
        idColumn: 'carrierId',
        displayColumn: 'name'
    },
    LifeEvent: {
        idColumn: 'eventId',
        displayColumn: 'eventType'
    },

    // ========================================
    // Learning Models
    // ========================================
    Course: {
        idColumn: 'courseId',
        displayColumn: 'title'
    },
    CourseSession: {
        idColumn: 'sessionId',
        displayColumn: 'sessionId'  // May need custom displayFormat with date
    },
    Certification: {
        idColumn: 'certificationId',
        displayColumn: 'name'
    },
    Skill: {
        idColumn: 'skillId',
        displayColumn: 'name'
    },

    // ========================================
    // Compensation Models
    // ========================================
    SalaryStructure: {
        idColumn: 'structureId',
        displayColumn: 'name'
    },
    SalaryGrade: {
        idColumn: 'gradeId',
        displayColumn: 'name'
    },
    MeritCycle: {
        idColumn: 'cycleId',
        displayColumn: 'name'
    },
    BonusPlan: {
        idColumn: 'planId',
        displayColumn: 'name'
    },
    PerformanceReview: {
        idColumn: 'reviewId',
        displayColumn: 'reviewId'  // May need custom displayFormat
    },

    // ========================================
    // Talent Models
    // ========================================
    Goal: {
        idColumn: 'goalId',
        displayColumn: 'title'
    },
    JobRequisition: {
        idColumn: 'requisitionId',
        displayColumn: 'title'
    },
    Applicant: {
        idColumn: 'applicantId',
        displayColumn: 'lastName',
        selectColumns: ['applicantId', 'lastName', 'firstName'],
        displayFormat: (item) => item.lastName + ', ' + item.firstName,
        displayLabel: 'Name'
    },

    // ========================================
    // Payroll Models
    // ========================================
    PayrollRun: {
        idColumn: 'payrollRunId',
        displayColumn: 'payrollRunId'  // May need custom displayFormat with date
    },
    PayComponent: {
        idColumn: 'componentId',
        displayColumn: 'name'
    }

    // ========================================
    // Future: Financial, SCM, Manufacturing models
    // ========================================
};
```

### Modified Form Field Syntax (Compact)

**Before (verbose inline config):**
```javascript
{
    key: 'managerId',
    label: 'Manager',
    type: 'reference',
    referenceConfig: {
        modelName: 'Employee',
        idColumn: 'employeeId',
        displayColumn: 'lastName',
        selectColumns: ['employeeId', 'lastName', 'firstName'],
        displayFormat: function(item) {
            return item.lastName + ', ' + item.firstName;
        },
        displayLabel: 'Name',
        title: 'Select Manager'
    }
}
```

**After (compact with registry):**
```javascript
{ key: 'managerId', label: 'Manager', type: 'reference', lookupModel: 'Employee' }
```

Same size as current `type: 'lookup'` fields!

### Modified erp-forms.js Logic

Two locations need modification:

#### 1. generateFieldHtml() - Build config from registry (lines ~104-129)

```javascript
case 'reference':
    // Build reference config - check registry first, then inline config
    let refConfig = field.referenceConfig || {};

    // If lookupModel specified, get base config from registry
    if (field.lookupModel && typeof ERPReferenceRegistry !== 'undefined') {
        const registryConfig = ERPReferenceRegistry[field.lookupModel];
        if (registryConfig) {
            refConfig = {
                modelName: field.lookupModel,
                ...registryConfig,           // Base from registry
                ...field.referenceConfig,    // Field-specific overrides
                title: field.referenceConfig?.title || `Select ${field.label}`
            };
        }
    }

    // Store serializable config (without functions - they're handled separately)
    const serializableConfig = {
        modelName: refConfig.modelName,
        idColumn: refConfig.idColumn,
        displayColumn: refConfig.displayColumn,
        selectColumns: refConfig.selectColumns,
        baseWhereClause: refConfig.baseWhereClause,
        title: refConfig.title,
        displayLabel: refConfig.displayLabel,
        placeholder: refConfig.placeholder
    };
    // ... rest of rendering
```

#### 2. attachReferencePickers() - Get displayFormat from registry (lines ~403-463)

```javascript
// In attachReferencePickers(), after parsing config from data attribute:
if (config.modelName && typeof ERPReferenceRegistry !== 'undefined') {
    const registryConfig = ERPReferenceRegistry[config.modelName];
    if (registryConfig) {
        // Get displayFormat function from registry (can't serialize to data attr)
        if (registryConfig.displayFormat && !config.displayFormat) {
            config.displayFormat = registryConfig.displayFormat;
        }
        // Get selectColumns from registry if not in serialized config
        if (registryConfig.selectColumns && !config.selectColumns) {
            config.selectColumns = registryConfig.selectColumns;
        }
    }
}
```

#### Flow Summary

1. Form definition: `{ key: 'managerId', type: 'reference', lookupModel: 'Employee' }`
2. `generateFieldHtml()`: Looks up `Employee` in registry → gets `idColumn`, `displayColumn`, `selectColumns`
3. Renders `<input>` with `data-ref-config` containing serializable config
4. `attachReferencePickers()`: Parses config, adds `displayFormat` function from registry
5. `getEndpointForModel()`: Finds `/erp/30/Employee` from `HCM.modules`
6. `ERPReferencePicker.attach()`: Full config ready for picker

---

## 8. Testing Checklist

For each converted form:

- [ ] Picker opens on input click
- [ ] Search/filter works
- [ ] Pagination works
- [ ] Sort toggle works
- [ ] Selection is highlighted
- [ ] Select button populates field
- [ ] Clear button clears selection
- [ ] Escape closes picker
- [ ] Form save captures correct ID
- [ ] Edit mode shows existing selection
- [ ] View mode displays value correctly

---

## 9. Files to Modify

| File | Action | Lines Changed |
|------|--------|---------------|
| `shared/reference-registry.js` | **Create** - Central registry | ~100 new |
| `shared/erp-forms.js` | Modify - Registry lookup logic | ~20 changed |
| `hcm/core-hr/core-hr-forms.js` | Modify - Change 11 `lookup` → `reference` | ~11 (minimal) |
| `hcm/time/time-forms.js` | Modify - Change 12 `lookup` → `reference` | ~12 (minimal) |
| `hcm/benefits/benefits-forms.js` | Modify - Change 8 `lookup` → `reference` | ~8 (minimal) |
| `hcm/talent/talent-forms.js` | Modify - Change 20 `lookup` → `reference` | ~20 (minimal) |
| `hcm/learning/learning-forms.js` | Modify - Change 14 `lookup` → `reference` | ~14 (minimal) |
| `hcm/compensation/compensation-forms.js` | Modify - Change 13 `lookup` → `reference` | ~13 (minimal) |
| `hcm/payroll/payroll.js` | Modify - Change 13 `lookup` → `reference` | ~13 (minimal) |
| `app.html` | Modify - Add reference-registry.js script | ~1 line |

**Note:** Form file changes are minimal - just changing `type: 'lookup'` to `type: 'reference'`.
File sizes remain the same thanks to the registry approach.

---

## 10. Conclusion

The Data Picker component (`ERPReferencePicker`) is fully implemented and working. The task is to convert **91 lookup fields** across **7 HCM modules** to use the data picker.

### Global Rules Compliance Summary

| Rule | Compliance | How |
|------|------------|-----|
| File Size < 500 | ✅ | Registry approach keeps form files compact |
| No Duplicate Code | ✅ | One config per model in registry |
| Future-Proof Design | ✅ | Registry at ERP level, not HCM level |
| Check Existing Utils | ✅ | Building on existing erp-forms.js |
| Single Responsibility | ✅ | Registry handles config, forms handle structure |

### Key Benefits
- Consistent UX for selecting related entities
- Search and filter capability
- Pagination for large datasets
- Proper display of selected values
- Validation of foreign key references

### Estimated Scope
- **2 files to create/modify** (infrastructure)
  - `shared/reference-registry.js` (~100 lines)
  - `shared/erp-forms.js` (~20 lines modified)
- **7 form files** - minimal changes (just `type:` value)
- **91 field conversions** - simple text replacement
- **Net line change**: ~120 new lines total (not 800+ with inline configs)
