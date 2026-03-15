/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile AIA Agent Module - Column Definitions
 * Delegates to shared L8Agent columns from l8ui/l8agent/
 */
(function() {
    'use strict';

    window.MobileAiaAgent = window.MobileAiaAgent || {};

    // Add mobile-specific primary/secondary markers
    var cols = L8Agent.columns;

    MobileAiaAgent.columns = {
        L8AgentConversation: cols.L8AgentConversation.map(function(col) {
            if (col.key === 'title') return Object.assign({}, col, { primary: true });
            if (col.key === 'status') return Object.assign({}, col, { secondary: true });
            return col;
        }),
        L8AgentPrompt: cols.L8AgentPrompt.map(function(col) {
            if (col.key === 'name') return Object.assign({}, col, { primary: true });
            if (col.key === 'category') return Object.assign({}, col, { secondary: true });
            return col;
        })
    };

    MobileAiaAgent.primaryKeys = L8Agent.primaryKeys;
})();
