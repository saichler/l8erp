/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Manager Portal Actions
(function() {
    'use strict';

    var MGR = window.MGR = window.MGR || {};

    MGR.mobileActions = {
        approveLeaveRequest: function(request) {
            if (!request || !request.requestId) return;
            MGR._patchStatus('/30/LeaveReq', { requestId: request.requestId, status: 3 }, 'Leave request approved.');
        },

        rejectLeaveRequest: function(request) {
            if (!request || !request.requestId) return;
            MGR._patchStatus('/30/LeaveReq', { requestId: request.requestId, status: 4 }, 'Leave request rejected.');
        },

        approveTimesheet: function(timesheet) {
            if (!timesheet || !timesheet.timesheetId) return;
            MGR._patchStatus('/30/Timesheet', { timesheetId: timesheet.timesheetId, status: 3 }, 'Timesheet approved.');
        }
    };

    // Shared PATCH helper (works for both desktop and mobile)
    if (!MGR._patchStatus) {
        MGR._patchStatus = function(endpoint, data, successMsg) {
            var headers;
            if (typeof getAuthHeaders === 'function') {
                headers = getAuthHeaders();
            } else {
                var token = Layer8MAuth.getBearerToken();
                headers = { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' };
            }
            fetch(Layer8DConfig.resolveEndpoint(endpoint), {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(data)
            }).then(function(r) {
                if (r.ok) {
                    if (typeof Layer8DNotification !== 'undefined') Layer8DNotification.success(successMsg);
                } else {
                    if (typeof Layer8DNotification !== 'undefined') Layer8DNotification.error('Action failed.');
                }
            }).catch(function() {
                if (typeof Layer8DNotification !== 'undefined') Layer8DNotification.error('Network error.');
            });
        };
    }
})();
