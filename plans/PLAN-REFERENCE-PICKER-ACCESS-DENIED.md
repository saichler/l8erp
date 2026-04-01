# Plan: Fix Reference Picker Access Denied in ESS Portal

## Root Cause

**File:** `l8secure/go/secure/plugin/erp/erp_roles_ess.go`, lines 29-35

The ESS employee role's `readOnlyEss` list grants GET access to `Department` but is missing three types used as reference fields in the Employee form:
- `Organization` — Employee form's `organizationId` field
- `Position` — Employee form's `positionId` field
- `Job` — Employee form's `jobId` field

When the reference picker calls `fetchReferenceDisplayValue` to resolve these IDs to display names, the security provider denies access (400 "access denied"). The UI then silently falls back to showing raw IDs.

The detail popup in the main ERP app works because the admin/HR user has full HCM module access (all types).

## Fix

### Phase 1: Add missing types to ESS readOnlyEss list

**File:** `l8secure/go/secure/plugin/erp/erp_roles_ess.go`

Add `Organization`, `Position`, and `Job` to the `readOnlyEss` slice (line 29-35):

```go
readOnlyEss := []string{
    "Payslip", "PayslipLine", "LeaveBalance", "BenefitEnrollment",
    "BenefitPlan", "Dependent", "PerformanceReview", "EmployeeSkill",
    "EmployeeCertification", "TrainingRecord", "CourseEnrollment",
    "CompensationStatement", "YearEndDocument", "Holiday",
    "Department", "EmployeeDocument",
    "Organization", "Position", "Job",
}
```

These are reference/lookup types. The ESS user only needs GET access to resolve IDs to display names. No write access needed.

### Phase 2: Remove silent fallbacks in fetchReferenceDisplayValue

**File:** `l8ui/shared/layer8d-forms-pickers.js`, lines 102-138

Current code silently returns `null` on 400 errors (line 119-120: `if (!response.ok) return null`), hiding "access denied" from developers. Change to log the error visibly:

```javascript
if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    console.error(`fetchReferenceDisplayValue: ${response.status} for ${config.modelName} (${idValue}): ${errorText}`);
    return null;
}
```

The `return null` after logging is not a silent fallback — the error is now visible in the console. The caller leaves the raw ID in the input, which is the correct degraded behavior when access is denied. The key difference: now the developer sees WHY.

### Phase 3: Verification

1. Rebuild the security provider
2. Login as ESS user
3. Navigate to My Profile → Organizational Placement tab
4. Verify Organization shows "Engineering" (not "org-001")
5. Verify Position and Job show display names
6. Verify no 400 errors in console
7. Login as admin — verify no regression

## Traceability

| # | Field | Type Missing from ESS Role | Fix |
|---|-------|---------------------------|-----|
| 1 | Organization | `Organization` | Add to `readOnlyEss` |
| 2 | Position | `Position` | Add to `readOnlyEss` |
| 3 | Job | `Job` | Add to `readOnlyEss` |
| 4 | Silent 400 errors | N/A | Log error in `fetchReferenceDisplayValue` |

## Files Modified

```
l8secure/go/secure/plugin/erp/erp_roles_ess.go   (add Organization, Position, Job to readOnlyEss)
l8ui/shared/layer8d-forms-pickers.js              (log errors visibly in fetchReferenceDisplayValue)
```
