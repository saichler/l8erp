// Layer 8 Ecosystem - L8Table Entry Point
// Reusable table component with pagination, sorting, filtering
//
// This file serves as the entry point. The L8Table class is split across:
//   - table-core.js    : Class definition, constructor, init, static utilities
//   - table-data.js    : Data handling, fetching, server communication
//   - table-render.js  : Rendering table, headers, rows, pagination
//   - table-events.js  : Event listeners and user interaction handling
//   - table-filter.js  : Sorting, filtering, and validation
//
// Load order: table-core.js -> table-data.js -> table-render.js -> table-events.js -> table-filter.js -> table.js

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = L8Table;
}
