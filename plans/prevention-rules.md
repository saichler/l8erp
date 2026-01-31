# Rules to Prevent Module Duplication

These rules are extracted from a real codebase where 3 modules accumulated ~2,800 lines of near-identical code in under 2 days. Each module was created by copying the previous one and changing namespace prefixes. The duplication was entirely preventable.

---

## Rule 1: The Second Instance Rule

**When you create a second instance of any pattern, extract a shared abstraction immediately.**

Do not wait for a third instance. The moment you find yourself copying a file and replacing a namespace or identifier, stop and refactor the original into a parameterized shared component. The second consumer is the forcing function for abstraction.

**What went wrong:** HCM was built with 6 module-level files. When FIN was built, all 6 were copied with `HCM` → `FIN` replacements. By the time SCM arrived, the copy-paste pattern was established and 15 duplicate files existed.

---

## Rule 2: Copy-Paste Detection

**If the only differences between two files are identifiers, names, or configuration values, the logic must be extracted into a shared component that accepts those values as parameters.**

Before creating a new module/feature file, run a diff against the nearest equivalent. If the diff shows only:
- Namespace/variable name changes (e.g., `HCM` → `FIN`)
- String literal changes (e.g., `'core-hr'` → `'general-ledger'`)
- Array/object data differences (e.g., different sub-module lists)

Then the logic is generic and must live in a shared location. The module file should only contain configuration data and a call to the shared component.

---

## Rule 3: Configuration vs. Logic Separation

**Module-specific files should contain only data (configuration, definitions, mappings). All behavioral logic should live in shared components.**

A well-structured module consists of:
- **Config file**: Declares what exists (services, endpoints, sub-modules, labels) — unique per module
- **Data files**: Defines domain-specific schemas (columns, forms, enums) — unique per sub-module
- **Init file**: Calls a shared factory with the config — ~10 lines, identical structure

If a module file contains `if/else`, loops, DOM manipulation, fetch calls, or event handlers, that logic almost certainly belongs in a shared component.

---

## Rule 4: Shared Components Must Exist Before the Second Module

**The shared abstraction layer must be created as part of building the first module, or at latest before the second module ships.**

Do not create shared utilities after the fact. When building the first module:
- Identify which parts are domain-specific (config, data) vs. generic (CRUD, navigation, service lookup)
- Build the generic parts as shared components from day one
- Have the first module consume those shared components as a proof of concept

If this wasn't done for the first module, the second module's implementation must include refactoring the first module's generic logic into shared components.

---

## Rule 5: New Module Checklist

**Before creating a new module, verify it only needs configuration files.**

Ask these questions:
1. Does the new module need its own navigation logic? → No, use the shared navigation component
2. Does the new module need its own CRUD handlers? → No, use the shared CRUD component
3. Does the new module need its own form wrapper? → No, use the shared form framework
4. Does the new module need its own service lookup? → No, use the shared service registry

If any answer is "yes," the shared component has a gap that should be fixed — not worked around with a module-specific copy.

---

## Rule 6: Audit on Every Module Addition

**When adding a new module, diff all existing module-level files. Any file with >80% similarity across modules is a refactoring candidate that must be addressed before the new module ships.**

This prevents the "we'll refactor later" trap. The cost of refactoring grows with each new module, while the cost of doing it now stays constant.

---

## Rule 7: Façade Files Are a Code Smell

**If a wrapper file delegates 100% of its calls to another component, it should not exist.**

In our case, `hcm-forms.js` (491 lines) contained functions like:
```js
function openAddForm(serviceConfig, formDef, onSuccess) {
    if (typeof ERPForms !== 'undefined' && ERPForms.openAddForm) {
        return ERPForms.openAddForm(serviceConfig, formDef, onSuccess);
    }
    // fallback implementation...
}
```

Every function checked for `ERPForms` and delegated to it. The fallback code was dead weight. This entire file should have been replaced by a one-line alias: `window.HCMForms = ERPForms;`

**Rule:** If a file exists only to re-export or delegate to another component, delete it and reference the shared component directly.

---

## Rule 8: Improve Patterns Forward, Backport Immediately

**When a newer module improves on a pattern from an older module, the improvement must be backported to all existing modules immediately.**

In our case, SCM improved the service lookup from 7 repetitive `if`-blocks (224 lines) to a loop-based helper (97 lines). But HCM and FIN were never updated. This created three different implementations of the same logic.

When you spot a better pattern while building a new module, refactor the shared component to use the better pattern and update all consumers.

---

## Rule 9: Measure Duplication as a Metric

**Track per-module boilerplate line count. If adding a new module requires more than 50 lines of structural code (excluding domain-specific data), the shared abstraction layer needs improvement.**

Targets:
- Module config file: unique data, acceptable at any size
- Module init file: <30 lines (factory call)
- Sub-module data files (enums, columns, forms): unique data, acceptable at any size
- Module-level behavioral code: 0 lines (all in shared components)

---

## Rule 10: Document the Module Creation Recipe

**Maintain a "How to Add a New Module" guide that specifies exactly which files to create and which shared components to use.**

This guide should be the first thing a developer reads before creating a new module. If the guide says "copy an existing module," the architecture has failed. The guide should say:

1. Create `module-config.js` with your module's services and sub-module list
2. Create sub-module data files (enums, columns, forms)
3. Create `module-init.js` with a single factory call
4. Add script tags to `app.html`
5. Add entry to `sections.js`

No copying. No behavioral code. Configuration only.
