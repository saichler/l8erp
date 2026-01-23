// Layer 8 Ecosystem - L8Table Filtering & Sorting
// Methods for sorting, filtering, and validation

// Sort by column
L8Table.prototype.sort = function(column) {
    if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
    }

    // Server-side sorting
    if (this.serverSide) {
        this.currentPage = 1;
        this.fetchData(this.currentPage, this.pageSize);
        return;
    }

    // Client-side sorting
    const columnConfig = this.columns.find(col => col.key === column);
    const sortKey = columnConfig && columnConfig.sortKey ? columnConfig.sortKey : column;

    this.filteredData.sort((a, b) => {
        let aVal = this.getNestedValue(a, sortKey);
        let bVal = this.getNestedValue(b, sortKey);

        // Handle numbers
        if (!isNaN(aVal) && !isNaN(bVal)) {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }

        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    this.currentPage = 1;
    this.render();
};

// Filter data by column value
L8Table.prototype.filter = function(column, value) {
    this.filters[column] = value;

    this.filteredData = this.data.filter(row => {
        for (let col in this.filters) {
            const filterValue = this.filters[col].toLowerCase();
            if (filterValue) {
                const cellValue = String(this.getNestedValue(row, col)).toLowerCase();
                if (!cellValue.includes(filterValue)) {
                    return false;
                }
            }
        }
        return true;
    });

    this.currentPage = 1;
    this.render();
};

// Mark filter inputs as invalid (for server-side validation)
L8Table.prototype.setInvalidFilters = function(invalidColumns) {
    if (!this.container) return;

    this.container.querySelectorAll('.l8-filter-input').forEach(input => {
        input.classList.remove('invalid');
    });

    invalidColumns.forEach(columnKey => {
        const input = this.container.querySelector(`.l8-filter-input[data-column="${columnKey}"]`);
        if (input) {
            input.classList.add('invalid');
        }
    });
};
