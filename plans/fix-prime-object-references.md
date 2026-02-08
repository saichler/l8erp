# Fix Prime Object Direct References

## Problem
Prime Objects (protobuf types with their own service) must reference each other ONLY via ID fields. Direct struct references (`*OtherPrime` or `[]*OtherPrime`) break the introspector's decorator system: when Type A embeds Type B, inspecting A registers B's node in `typeToNode` without B's primary key decorator. This causes "Decorator Not Found" errors on all Get-by-filter operations for B.

## Violations Found (2 total)

### Violation 1: BenefitEnrollment → Dependent
- **File**: `proto/hcm-benefits.proto`
- **Field**: `repeated Dependent covered_dependents = 15;`
- **Go**: `types/hcm/hcm-benefits.pb.go:1289`
- **Fix**: Change to `repeated string covered_dependent_ids = 15;`

### Violation 2: SalaryStructure → SalaryGrade
- **File**: `proto/hcm-compensation.proto`
- **Field**: `repeated SalaryGrade grades = 8;`
- **Go**: `types/hcm/hcm-compensation.pb.go:930`
- **Fix**: Change to `repeated string salary_grade_ids = 8;`

## Fix Steps (per violation)

### Step 1: Update Proto Definition
Change the field from a direct reference to an ID-only reference:
```protobuf
// Before
repeated Dependent covered_dependents = 15;
// After
repeated string covered_dependent_ids = 15;
```

### Step 2: Regenerate Protobuf Bindings
```bash
cd proto && ./make-bindings.sh
```

### Step 3: Update Mock Data Generators
- `go/tests/mocks/gen_hcm_benefits.go` — change generator to produce `CoveredDependentIds []string` instead of `CoveredDependents []*Dependent`
- `go/tests/mocks/gen_hcm_compensation.go` — change generator to produce `SalaryGradeIds []string` instead of `Grades []*SalaryGrade`

### Step 4: Update Service Callbacks
Check if any service callback reads/validates the nested objects and update to use ID-based lookups.

### Step 5: Update Desktop UI

#### Violation 1 (BenefitEnrollment → Dependent)
- **Columns**: `go/erp/ui/web/hcm/benefits/benefits-columns.js`
  - Add a column to BenefitEnrollment showing covered dependent count:
    `col.custom('coveredDependentIds', 'Dependents', (item) => item.coveredDependentIds ? item.coveredDependentIds.length : 0)`
- **Forms**: `go/erp/ui/web/hcm/benefits/benefits-forms.js`
  - The BenefitEnrollment form (line 40-58) is missing the covered dependents field entirely
  - Add a multi-reference field to the "Enrollment Details" section:
    `f.text('coveredDependentIds', 'Covered Dependent IDs')` (or a multi-reference picker when supported)

#### Violation 2 (SalaryStructure → SalaryGrade)
- **Columns**: `go/erp/ui/web/hcm/compensation/compensation-columns.js:39`
  - Currently: `col.custom('grades', 'Grades', (item) => item.grades ? item.grades.length : 0)`
  - Change to: `col.custom('salaryGradeIds', 'Grades', (item) => item.salaryGradeIds ? item.salaryGradeIds.length : 0)`
- **Forms**: `go/erp/ui/web/hcm/compensation/compensation-forms.js`
  - Check SalaryStructure form for `grades` field — add `salaryGradeIds` field if missing

### Step 6: Update Mobile UI

#### Violation 1 (BenefitEnrollment → Dependent)
- **Columns**: `go/erp/ui/web/m/js/hcm/benefits-columns.js`
  - Add a column to BenefitEnrollment showing covered dependent count (parity with desktop)
- **Forms**: `go/erp/ui/web/m/js/hcm/benefits-forms.js`
  - Add `coveredDependentIds` field to BenefitEnrollment form (parity with desktop)

#### Violation 2 (SalaryStructure → SalaryGrade)
- **Columns**: `go/erp/ui/web/m/js/hcm/compensation-columns.js:44`
  - Currently: `col.custom('grades', 'Grades', (item) => item.grades ? item.grades.length : 0)`
  - Change to: `col.custom('salaryGradeIds', 'Grades', (item) => item.salaryGradeIds ? item.salaryGradeIds.length : 0)`
- **Forms**: `go/erp/ui/web/m/js/hcm/compensation-forms.js`
  - Check SalaryStructure form for `grades` field — add `salaryGradeIds` field if missing (parity with desktop)

### Step 7: Revert Activation Order Workaround
Remove the workaround in `activate_hcm.go` that moved `dependents.Activate()` before `benefitenrollments.Activate()`. With the proto fix, activation order no longer matters for this case.

### Step 8: Build & Verify
```bash
go build ./...
go vet ./...
```

### Step 9: Run Tests
Run the full test suite to verify:
- No "Decorator Not Found" errors
- Mock data generators produce correct data with ID references
- Desktop and mobile column renders display correctly

## After Fix
- Both violations structurally eliminated at the proto level
- Desktop and mobile UI updated consistently
- Activation order no longer matters for these types
