# Phase 10: Mock Data Generation Deduplication

## Overview

Analysis of `go/tests/mocks/` reveals **~9,400 lines of duplicate patterns** across 73 generator files and 17 phase orchestration files. This plan introduces helper utilities to eliminate repetitive boilerplate while preserving the readability of each generator.

## Summary of Findings

| Area | Files | Total Lines | Duplicate Lines | Savings |
|------|-------|-------------|-----------------|---------|
| Phase orchestration boilerplate | 17 | 4,692 | 2,862 (61%) | 2,544 |
| Cross-reference lookups | 73 | — | ~3,000 | 2,000 |
| Status distribution logic | 73 | — | ~1,500 | 1,200 |
| Date generation patterns | 73 | — | ~1,600 | 800 |
| Money generation patterns | 73 | — | ~680 | 340 |
| Foundation entity builders | 73 | — | ~3,000 | 2,500 |
| **Total** | **90** | **25,740** | **~12,642** | **~9,384** |

---

## Tier 1: Phase Orchestration Helper (2,544 lines saved)

### Problem

Every phase operation repeats a 9-line block 318 times across 17 files:
```go
fmt.Printf("  Creating Entities...")
entities := generateEntities(store)
if err := client.post("/erp/XX/Service", &module.EntityList{List: entities}); err != nil {
    return fmt.Errorf("entities: %w", err)
}
for _, e := range entities {
    store.EntityIDs = append(store.EntityIDs, e.EntityId)
}
fmt.Printf(" %d created\n", len(entities))
```

### Solution

Create `go/tests/mocks/phase_helpers.go`:

```go
package main

import "fmt"

// PhaseOp represents a single phase operation (generate + post + store IDs)
type PhaseOp[T any] struct {
    Label     string
    Endpoint  string
    Generate  func() []*T
    WrapList  func([]*T) interface{}
    ExtractID func(*T) string
    StoreIDs  *[]string
}

// Run executes the phase operation
func (op PhaseOp[T]) Run(client *MockClient) error {
    fmt.Printf("  Creating %s...", op.Label)
    entities := op.Generate()
    if err := client.post(op.Endpoint, op.WrapList(entities)); err != nil {
        return fmt.Errorf("%s: %w", op.Label, err)
    }
    if op.StoreIDs != nil {
        for _, e := range entities {
            *op.StoreIDs = append(*op.StoreIDs, op.ExtractID(e))
        }
    }
    fmt.Printf(" %d created\n", len(entities))
    return nil
}
```

**Before (9 lines per entity):**
```go
fmt.Printf("  Creating Employees...")
employees := generateEmployees(store)
if err := client.post("/erp/10/Employee", &hcm.EmployeeList{List: employees}); err != nil {
    return fmt.Errorf("employees: %w", err)
}
for _, e := range employees {
    store.EmployeeIDs = append(store.EmployeeIDs, e.EmployeeId)
}
fmt.Printf(" %d created\n", len(employees))
```

**After (1 call):**
```go
PhaseOp[hcm.Employee]{
    Label: "Employees", Endpoint: "/erp/10/Employee",
    Generate: func() []*hcm.Employee { return generateEmployees(store) },
    WrapList: func(e []*hcm.Employee) interface{} { return &hcm.EmployeeList{List: e} },
    ExtractID: func(e *hcm.Employee) string { return e.EmployeeId },
    StoreIDs: &store.EmployeeIDs,
}.Run(client)
```

**Savings:** 318 operations × (9 - 5) lines = **~2,544 lines (or more with further simplification)**

---

## Tier 2: Field Generation Helpers (4,340 lines saved)

### 2.1 Cross-Reference Helper (2,000 lines saved)

**Problem:** ~1,000 instances of:
```go
relatedID := ""
if len(store.RelatedIDs) > 0 {
    relatedID = store.RelatedIDs[i%len(store.RelatedIDs)]
}
```

**Solution:** Add to `go/tests/mocks/utils.go`:
```go
// pickRef safely picks a reference ID by modulo index, returns "" if slice empty
func pickRef(ids []string, index int) string {
    if len(ids) == 0 {
        return ""
    }
    return ids[index%len(ids)]
}
```

**Usage:**
```go
relatedID := pickRef(store.RelatedIDs, i)
```

**Savings:** 3 lines → 1 line × ~1,000 instances = **~2,000 lines**

### 2.2 Money Helper (340 lines saved)

**Problem:** 340 instances of:
```go
amount := int64(rand.Intn(50000) + 5000)
field := &erp.Money{Amount: amount, CurrencyCode: "USD"}
```

**Solution:**
```go
// randomMoney generates a Money with random amount in [min, min+rangeSize) cents
func randomMoney(min, rangeSize int) *erp.Money {
    return &erp.Money{
        Amount:       int64(rand.Intn(rangeSize) + min),
        CurrencyCode: "USD",
    }
}
```

**Savings:** 2 lines → 1 line × 340 instances = **~340 lines**

### 2.3 Date Helper (800 lines saved)

**Problem:** 800+ instances of:
```go
date := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
field := date.Unix()
```

**Solution:**
```go
// randomPastDate returns a Unix timestamp randomly in the past (up to maxMonths months, maxDays days)
func randomPastDate(maxMonths, maxDays int) int64 {
    return time.Now().AddDate(0, -rand.Intn(maxMonths), -rand.Intn(maxDays)).Unix()
}

// randomFutureDate returns a Unix timestamp randomly in the future
func randomFutureDate(maxMonths, maxDays int) int64 {
    return time.Now().AddDate(0, rand.Intn(maxMonths), rand.Intn(maxDays)).Unix()
}
```

**Savings:** 2 lines → 1 line × 800 = **~800 lines**

### 2.4 Status Distribution Helper (1,200 lines saved)

**Problem:** 300+ instances of:
```go
var status module.StatusType
if i < count*6/10 {
    status = module.Status_APPROVED
} else if i < count*8/10 {
    status = module.Status_IN_PROGRESS
} else {
    status = statuses[i%len(statuses)]
}
```

**Solution:**
```go
// StatusDist defines a distribution: first N% get this value
type StatusDist[T any] struct {
    Percent int
    Value   T
}

// distribute picks a value based on index position within the total count
func distribute[T any](index, total int, dists []StatusDist[T], fallback []T) T {
    threshold := 0
    for _, d := range dists {
        threshold += total * d.Percent / 100
        if index < threshold {
            return d.Value
        }
    }
    if len(fallback) > 0 {
        return fallback[index%len(fallback)]
    }
    return dists[len(dists)-1].Value
}
```

**Usage:**
```go
status := distribute(i, count, []StatusDist[module.Status]{
    {60, module.Status_APPROVED},
    {20, module.Status_IN_PROGRESS},
}, []module.Status{module.Status_DRAFT, module.Status_CANCELLED})
```

**Savings:** 5-8 lines → 2-3 lines × 300 = **~1,200 lines**

---

## Tier 3: Foundation Entity Patterns (2,500 lines saved)

### Problem

30+ generators for foundation entities (categories, types, statuses) follow an identical pattern:
```go
func generateCategories() []*module.Category {
    categories := make([]*module.Category, len(categoryNames))
    for i, name := range categoryNames {
        categories[i] = &module.Category{
            CategoryId:  fmt.Sprintf("cat-%03d", i+1),
            Name:        name,
            Code:        fmt.Sprintf("CAT%03d", i+1),
            Description: fmt.Sprintf("%s category", name),
            IsActive:    true,
            AuditInfo:   createAuditInfo(),
        }
    }
    return categories
}
```

### Solution

```go
// genFromNames creates entities from a name list using a builder function
func genFromNames[T any](names []string, build func(i int, name string) *T) []*T {
    result := make([]*T, len(names))
    for i, name := range names {
        result[i] = build(i, name)
    }
    return result
}

// genID creates an ID like "prefix-001"
func genID(prefix string, index int) string {
    return fmt.Sprintf("%s-%03d", prefix, index+1)
}

// genCode creates a code like "PREFIX001"
func genCode(prefix string, index int) string {
    return fmt.Sprintf("%s%03d", prefix, index+1)
}
```

**Usage:**
```go
func generateCategories() []*module.Category {
    return genFromNames(categoryNames, func(i int, name string) *module.Category {
        return &module.Category{
            CategoryId:  genID("cat", i),
            Name:        name,
            Code:        genCode("CAT", i),
            Description: name + " category",
            IsActive:    true,
            AuditInfo:   createAuditInfo(),
        }
    })
}
```

**Savings:** Eliminates boilerplate slice allocation and loop setup across ~30+ generators = **~2,500 lines**

---

## Implementation Order

### Step 1: Add helpers to utils.go (no breaking changes)
1. Add `pickRef`, `randomMoney`, `randomPastDate`, `randomFutureDate` to `utils.go`
2. Add `distribute`, `genFromNames`, `genID`, `genCode` to `utils.go`
3. Build: `go build ./tests/mocks/`

### Step 2: Create phase_helpers.go
1. Add `PhaseOp` generic struct
2. Build and verify

### Step 3: Migrate one module as proof of concept (smallest first - Compliance)
1. Convert gen_comp_*.go to use new helpers
2. Convert comp_phases.go to use PhaseOp
3. Build and verify

### Step 4: Migrate remaining modules
- Each module is independent
- Can be done incrementally

---

## Risk Assessment

**Risk Level: LOW**

- All changes are additive (new helpers, no removed functionality)
- Existing generator logic is preserved, just wrapped in helpers
- Each module migration is independent
- `go build` validates correctness after each change
- No runtime behavior changes — output is identical

---

## Success Metrics

- Reduce mock data code from ~25,740 lines to ~16,350 lines (37% reduction)
- New mock generator requires ~60% fewer lines of boilerplate
- Consistent patterns across all modules
- Single point of change for common generation logic
