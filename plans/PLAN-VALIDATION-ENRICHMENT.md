# Plan: Service Validation Enrichment

## Problem

318 non-HCM service callbacks use the simple `ValidationBuilder` pattern, validating only 1-3 required string fields (usually just the primary key). Meanwhile the protobuf types define **1,187 enum fields** and **1,023 foreign key Id fields** across these modules — almost none of which are validated.

A user can submit a SalesOrder with `Status = 99999` (invalid enum) or `CustomerId = "garbage"` (nonexistent reference) and the server will accept it.

### Current State (SalesOrder example)

```go
// Validates: SalesOrderId, CustomerId, CurrencyId — that's it
// Ignores: Status enum, SalespersonId, QuotationId, WarehouseId, etc.
func newSalesOrderServiceCallback() ifs.IServiceCallback {
    return common.NewValidation[sales.SalesOrder]("SalesOrder",
        func(e *sales.SalesOrder) { common.GenerateID(&e.SalesOrderId) }).
        Require(func(e *sales.SalesOrder) string { return e.SalesOrderId }, "SalesOrderId").
        Require(func(e *sales.SalesOrder) string { return e.CustomerId }, "CustomerId").
        Require(func(e *sales.SalesOrder) string { return e.CurrencyId }, "CurrencyId").
        Build()
}
```

### Target State

```go
func newSalesOrderServiceCallback() ifs.IServiceCallback {
    return common.NewValidation[sales.SalesOrder]("SalesOrder",
        func(e *sales.SalesOrder) { common.GenerateID(&e.SalesOrderId) }).
        Require(func(e *sales.SalesOrder) string { return e.SalesOrderId }, "SalesOrderId").
        Require(func(e *sales.SalesOrder) string { return e.CustomerId }, "CustomerId").
        Require(func(e *sales.SalesOrder) string { return e.CurrencyId }, "CurrencyId").
        Enum(func(e *sales.SalesOrder) int32 { return int32(e.Status) }, sales.SalesOrderStatus_name, "Status").
        Build()
}
```

---

## Scope

| Module | Services | Enum Fields | Id Fields | Enum Definitions |
|--------|----------|-------------|-----------|-----------------|
| FIN    | 49       | 135         | 154       | 28              |
| SCM    | 44       | 101         | 129       | 12              |
| Sales  | 33       | 94          | 110       | 20              |
| MFG    | 36       | 137         | 125       | 22              |
| CRM    | 36       | 151         | 117       | 31              |
| PRJ    | 36       | 162         | 121       | 22              |
| BI     | 24       | 106         | 65        | 20              |
| DOC    | 20       | 86          | 67        | 17              |
| ECOM   | 20       | 99          | 54        | 11              |
| COMP   | 20       | 116         | 81        | 13              |
| **Total** | **318** | **1,187** | **1,023** | **196**       |

---

## Approach

### Phase 1: Extend the ValidationBuilder

Add an `.Enum()` method to `VB[T]` in `validation_builder.go`. This is the highest-impact, lowest-risk addition — it doesn't need network access (unlike ValidateReference) and covers the largest gap (1,187 unvalidated fields).

**File**: `go/erp/common/validation_builder.go`

```go
// Enum adds an enum field validation using the protobuf _name map.
func (b *VB[T]) Enum(getter func(*T) int32, nameMap map[int32]string, name string) *VB[T] {
    b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
        return ValidateEnum(getter(e), nameMap, name)
    })
    return b
}
```

### Phase 2: Build an Automated Migration Tool

Create `tools/migrate_enums.go` — a code generation tool that:

1. **Reads each `.pb.go` file** to extract struct definitions and identify enum-typed fields
2. **Reads each `*Callback.go` file** to find the existing `NewValidation` chain
3. **Appends `.Enum()` calls** for every enum field in the struct
4. **Writes the updated callback** back to disk

This is the same pattern used successfully by `tools/migrate_callbacks.go` (which converted 319 files in Phase 15 Tier 4).

#### Detection Logic

For each protobuf struct field, determine if it's an enum by checking the protobuf tag:
```
protobuf:"varint,7,opt,name=status,proto3,enum=sales.SalesOrderStatus"
```

The `enum=<package>.<EnumType>` portion tells us:
- The Go enum type name: `SalesOrderStatus`
- The `_name` map: `sales.SalesOrderStatus_name`
- The field getter: `e.Status`

#### Migration Tool Steps per Callback File

1. Parse the existing `NewValidation[...](...).Require(...).Build()` chain
2. Find the corresponding protobuf struct in `.pb.go`
3. For each enum-typed field in the struct, append:
   ```go
   .Enum(func(e *<Type>) int32 { return int32(e.<Field>) }, <pkg>.<EnumType>_name, "<Field>")
   ```
4. Insert before `.Build()`
5. Write the file

### Phase 3: Execute Migration by Module

Run the tool module by module, verifying after each:

| Order | Module | Services | Est. Enum Calls Added |
|-------|--------|----------|----------------------|
| 1     | FIN    | 49       | ~135                 |
| 2     | SCM    | 44       | ~101                 |
| 3     | Sales  | 33       | ~94                  |
| 4     | MFG    | 36       | ~137                 |
| 5     | CRM    | 36       | ~151                 |
| 6     | PRJ    | 36       | ~162                 |
| 7     | BI     | 24       | ~106                 |
| 8     | DOC    | 20       | ~86                  |
| 9     | ECOM   | 20       | ~99                  |
| 10    | COMP   | 20       | ~116                 |

**Verification after each module:**
```bash
go build ./erp/<module>/...
go vet ./erp/<module>/...
```

### Phase 4: Add Required Id Field Validation

After enums, expand the existing `.Require()` coverage. Many callbacks only validate the primary key Id but not critical foreign keys that should be mandatory.

This phase is **manual, not automated** because determining which Id fields should be required vs optional is a domain decision. The approach:

1. For each protobuf type, identify Id fields that are clearly required based on the entity's semantics:
   - A `SalesOrderLine` always needs a `SalesOrderId` (parent)
   - A `SalesOrderLine` always needs an `ItemId` (what's being sold)
   - A `SalesOrder` always needs a `CustomerId` (who's buying)
2. Add `.Require()` calls for these fields
3. Verify mock data generators set all newly-required fields (otherwise mock data loading will fail)

#### Required Id Field Heuristics

| Pattern | Required? | Reasoning |
|---------|-----------|-----------|
| Parent entity Id (e.g., `SalesOrderId` on `SalesOrderLine`) | Yes | Child can't exist without parent |
| Primary actor Id (e.g., `CustomerId` on `SalesOrder`) | Yes | Core business requirement |
| Cross-module foundation (e.g., `CurrencyId`) | Yes | Financial data needs currency |
| Optional reference (e.g., `QuotationId` on `SalesOrder`) | No | Order can exist without prior quote |
| Assignee Ids (e.g., `SalespersonId`) | No | Can be assigned later |

### Phase 5: Verify Mock Data Compatibility

After adding new validations, mock data generators must set all validated fields. Run the full mock data generation to catch failures:

```bash
go build ./tests/mocks/ && go run ./tests/mocks/
```

Any failures indicate mock generators that don't set a newly-required field or set an invalid enum value. Fix those generators.

---

## Estimated Impact

| Metric | Before | After |
|--------|--------|-------|
| Enum fields validated | 0 (non-HCM) | ~1,187 |
| Required Id fields validated | ~500 (mostly PKs only) | ~800+ |
| Callbacks with enum validation | 0 (non-HCM) | 318 |
| Invalid enum values accepted | All | None |

---

## Risk Assessment

**Low risk:**
- `.Enum()` is a pure data validation (no network, no side effects)
- Automated tool follows proven pattern from `migrate_callbacks.go`
- Each module is independently verifiable with `go build` / `go vet`

**Medium risk (Phase 4 only):**
- Adding `.Require()` for Id fields may break mock data loading if generators don't set those fields
- Mitigation: Run mock data generation after each module, fix generators immediately

**Not in scope:**
- `ValidateReference` (remote entity existence checks) — too complex for automation, requires per-field knowledge of which service to call. Left for the MISSING-FEATURES business logic phases.
- Status transition enforcement — separate concern, covered in MISSING-FEATURES Phase A.

---

## File Changes Summary

| Change | Files |
|--------|-------|
| `validation_builder.go` — add `.Enum()` method | 1 |
| `tools/migrate_enums.go` — new migration tool | 1 |
| `*Callback.go` across 10 modules — add `.Enum()` calls | 318 |
| `*Callback.go` subset — add missing `.Require()` for key Ids | ~150-200 |
| Mock generator fixes (if needed) | TBD |
