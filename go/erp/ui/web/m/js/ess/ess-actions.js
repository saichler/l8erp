/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile ESS Portal Custom Actions — uses Layer8MNavCrud pattern for mobile popups
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    ESS.mobileActions = {
        // Open a leave request form popup (add new)
        requestTimeOff: function() {
            var formDef = MobileESS._getFormDef('LeaveRequest');
            if (!formDef) return;
            var serviceConfig = {
                label: 'Leave Request',
                model: 'LeaveRequest',
                endpoint: '/30/LeaveReq',
                idField: 'requestId'
            };
            window._Layer8MNavActiveTable = MobileESS._currentTable;
            Layer8MNavCrud.openServiceForm(serviceConfig, formDef, null);
        },

        // Update goal progress via edit form
        updateGoalProgress: function(goal) {
            if (!goal || !goal.goalId) return;
            var formDef = MobileESS._getFormDef('Goal');
            if (!formDef) return;
            var serviceConfig = {
                label: 'Goal',
                model: 'Goal',
                endpoint: '/30/Goal',
                idField: 'goalId'
            };
            window._Layer8MNavActiveTable = MobileESS._currentTable;
            Layer8MNavCrud.openServiceForm(serviceConfig, formDef, goal);
        }
    };
})();
