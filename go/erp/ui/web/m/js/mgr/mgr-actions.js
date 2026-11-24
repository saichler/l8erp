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

    // Mobile PATCH helper. Feedback uses the mobile toasts (Layer8MUtils);
    // Layer8DNotification is not loaded in the mobile shell, so the old
    // typeof-guarded calls silently showed nothing.
    if (!MGR._patchStatus) {
        MGR._patchStatus = function(endpoint, data, successMsg) {
            var token = Layer8MAuth.getBearerToken();
            fetch(Layer8DConfig.resolveEndpoint(endpoint), {
                method: 'PATCH',
                headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(function(r) {
                if (r.ok) {
                    Layer8MUtils.showSuccess(successMsg);
                } else {
                    Layer8MUtils.showError('Action failed (HTTP ' + r.status + ').');
                }
            }).catch(function(e) {
                Layer8MUtils.showError('Network error: ' + e.message);
            });
        };
    }
})();
