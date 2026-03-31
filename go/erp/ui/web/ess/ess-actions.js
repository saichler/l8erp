/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal Custom Actions — interactive features for employees
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    ESS.actions = {
        // Open a leave request form popup
        requestTimeOff: function() {
            var formDef = ESS._getFormDef('LeaveRequest');
            if (!formDef) return;
            var serviceConfig = ESS._getServiceConfig({ endpoint: '/30/LeaveReq', model: 'LeaveRequest' });
            Layer8DFormsModal.openAddForm(serviceConfig, formDef, function() {
                Layer8DNotification.success('Leave request submitted successfully.');
                ESS.loadSection('timeoff');
            });
        },

        // Update goal progress via edit form
        updateGoalProgress: function(goal) {
            if (!goal || !goal.goalId) return;
            var formDef = ESS._getFormDef('Goal');
            if (!formDef) return;
            var serviceConfig = ESS._getServiceConfig({ endpoint: '/30/Goal', model: 'Goal' });
            Layer8DFormsModal.openEditForm(serviceConfig, formDef, goal.goalId, function() {
                Layer8DNotification.success('Goal updated successfully.');
                ESS.loadSection('performance');
            });
        }
    };
})();
