/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manager Portal Custom Actions — approval workflows
(function() {
    'use strict';

    var MGR = window.MGR = window.MGR || {};

    MGR.actions = {
        // Approve a leave request (PATCH status to 3 = Approved)
        approveLeaveRequest: function(request) {
            if (!request || !request.requestId) return;
            MGR._patchStatus('/30/LeaveReq', { requestId: request.requestId, status: 3 }, 'Leave request approved.');
        },

        // Reject a leave request (PATCH status to 4 = Rejected)
        rejectLeaveRequest: function(request) {
            if (!request || !request.requestId) return;
            MGR._patchStatus('/30/LeaveReq', { requestId: request.requestId, status: 4 }, 'Leave request rejected.');
        },

        // Approve a timesheet (PATCH status to 3 = Approved)
        approveTimesheet: function(timesheet) {
            if (!timesheet || !timesheet.timesheetId) return;
            MGR._patchStatus('/30/Timesheet', { timesheetId: timesheet.timesheetId, status: 3 }, 'Timesheet approved.');
        }
    };

    // Helper: PATCH an entity status
    MGR._patchStatus = function(endpoint, data, successMsg) {
        fetch(Layer8DConfig.resolveEndpoint(endpoint), {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        }).then(function(r) {
            if (r.ok) {
                Layer8DNotification.success(successMsg);
                if (MGR._currentTable) MGR._currentTable.refresh();
            } else {
                Layer8DNotification.error('Action failed.');
            }
        }).catch(function() {
            Layer8DNotification.error('Network error.');
        });
    };
})();
