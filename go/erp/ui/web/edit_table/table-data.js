// Layer 8 Ecosystem - L8Table Data Management
// Methods for data handling, fetching, and server communication

// Debounce utility for server-side filtering
L8Table.prototype.debounce = function(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Build L8Query with filter and sort conditions
L8Table.prototype.buildQuery = function(page, pageSize) {
    const pageIndex = page - 1;
    const invalidFilters = [];
    const filterConditions = [];

    // Start with base where clause if provided
    if (this.baseWhereClause) {
        filterConditions.push(this.baseWhereClause);
    }

    // Add filter conditions
    for (const [columnKey, filterValue] of Object.entries(this.filters)) {
        if (!filterValue) continue;

        const column = this.columns.find(c => c.key === columnKey);
        if (!column) continue;

        const filterKey = column.filterKey || column.key;

        let queryValue;
        if (column.enumValues) {
            // Enum column: validate and convert to enum value
            const enumValue = ERPUtils.matchEnumValue(filterValue, column.enumValues);
            if (enumValue === null) {
                // No match - mark as invalid, skip this filter
                invalidFilters.push(columnKey);
                continue;
            }
            queryValue = enumValue;
        } else {
            // Non-enum column: use text with wildcard
            queryValue = `${filterValue}*`;
        }

        filterConditions.push(`${filterKey}=${queryValue}`);
    }

    // Build query - only add WHERE clause if there are conditions
    let query = `select * from ${this.modelName}`;
    if (filterConditions.length > 0) {
        query += ` where ${filterConditions.join(' and ')}`;
    }
    query += ` limit ${pageSize} page ${pageIndex}`;

    // Add sort clause
    if (this.sortColumn) {
        const column = this.columns.find(c => c.key === this.sortColumn);
        const sortKey = column?.sortKey || column?.filterKey || this.sortColumn;
        const desc = this.sortDirection === 'desc' ? ' descending' : '';
        query += ` sort-by ${sortKey}${desc}`;
    }

    return { query, invalidFilters };
};

// Fetch data from server
L8Table.prototype.fetchData = async function(page, pageSize) {
    if (!this.endpoint || !this.modelName) {
        console.error('Table requires endpoint and modelName for server-side mode');
        return;
    }

    const { query, invalidFilters } = this.buildQuery(page, pageSize);

    try {
        const body = encodeURIComponent(JSON.stringify({ text: query }));
        const response = await fetch(this.endpoint + '?body=' + body, {
            method: 'GET',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // Extract total count from metadata
        let totalCount = 0;
        if (data.metadata?.keyCount?.counts) {
            totalCount = data.metadata.keyCount.counts.Total || 0;
        }

        // Transform data if transformer provided
        let items = data.list || [];
        if (this.transformData) {
            items = items.map(item => this.transformData(item));
        }

        // Update table
        this.setServerData(items, totalCount);
        this.setInvalidFilters(invalidFilters);

        // Call optional callback for additional processing
        if (this.onDataLoaded) {
            this.onDataLoaded(data, items, totalCount);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        this.showError('Failed to load data');
    }
};

// Update base where clause and re-fetch
L8Table.prototype.setBaseWhereClause = function(whereClause) {
    this.baseWhereClause = whereClause;
    this.filters = {};  // Clear filters when base clause changes
    this.currentPage = 1;
    this.fetchData(this.currentPage, this.pageSize);
};

// Show error message in table container
L8Table.prototype.showError = function(message) {
    if (this.container) {
        this.container.innerHTML = `<div style="padding: 20px; color: #718096; text-align: center;">${message}</div>`;
    }
};

// Set data and re-render (for client-side pagination)
L8Table.prototype.setData = function(data) {
    this.data = Array.isArray(data) ? data : Object.values(data);
    this.filteredData = [...this.data];
    if (!this.serverSide) {
        this.currentPage = 1;
    }
    this.render();
};

// Set data with server-side pagination metadata
L8Table.prototype.setServerData = function(data, totalItems) {
    this.data = Array.isArray(data) ? data : Object.values(data);
    this.totalItems = totalItems || 0;
    this.render();
};

// Get paginated data
L8Table.prototype.getPaginatedData = function() {
    if (this.serverSide) {
        // Server-side: data is already paginated
        return this.data;
    }
    // Client-side: use filteredData if filtering is enabled
    const dataSource = this.filterable ? this.filteredData : this.data;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return dataSource.slice(start, end);
};

// Get total items count
L8Table.prototype.getTotalItems = function() {
    if (this.serverSide) return this.totalItems;
    return this.filterable ? this.filteredData.length : this.data.length;
};

// Get total pages
L8Table.prototype.getTotalPages = function() {
    const total = this.getTotalItems();
    return Math.ceil(total / this.pageSize);
};

// Get item ID from primary key or common ID field patterns
L8Table.prototype.getItemId = function(item) {
    // Use configured primary key if available
    if (this.primaryKey && item[this.primaryKey] !== undefined) {
        return item[this.primaryKey];
    }
    // Fall back to common patterns (Core HR + Payroll + Benefits)
    return item.id || item.userId || item.roleId || item.targetId ||
           item.credId || item.employeeId || item.organizationId ||
           item.departmentId || item.positionId || item.jobId ||
           item.jobFamilyId || item.documentId || item.recordId ||
           // Payroll primary keys
           item.payStructureId || item.componentId || item.payrollRunId ||
           item.payslipId || item.withholdingId || item.directDepositId ||
           item.garnishmentId ||
           // Benefits primary keys
           item.planId || item.enrollmentId || item.carrierId ||
           item.dependentId || item.lifeEventId || item.cobraEventId ||
           // Time & Attendance primary keys
           item.timesheetId || item.requestId || item.balanceId ||
           item.policyId || item.shiftId || item.scheduleId ||
           item.holidayId || item.absenceId ||
           // Talent primary keys
           item.reviewId || item.goalId || item.feedbackId ||
           item.careerPathId || item.requisitionId || item.applicantId ||
           item.applicationId || item.taskId ||
           // Learning primary keys
           item.courseId || item.sessionId || item.certificationId ||
           item.employeeCertificationId || item.skillId || item.employeeSkillId ||
           item.recordId ||
           // Compensation primary keys
           item.gradeId || item.structureId || item.compensationId ||
           item.increaseId || item.cycleId || item.grantId ||
           item.statementId || item.benchmarkId ||
           item.key || JSON.stringify(item);
};

// Get nested value from object (e.g., 'user.name')
L8Table.prototype.getNestedValue = function(obj, key) {
    if (!key) return '';
    const keys = key.split('.');
    let value = obj;
    for (const k of keys) {
        if (value === null || value === undefined) return '';
        value = value[k];
    }
    return value !== null && value !== undefined ? value : '';
};
