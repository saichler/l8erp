/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
 * Mobile System Module - Column Configurations & Health Transform
 * Desktop Equivalent: l8ui/sys/health/l8health.js, l8ui/sys/security/
 */
(function() {
    'use strict';

    window.MobileSysHealth = window.MobileSysHealth || {};
    window.MobileSysSecurity = window.MobileSysSecurity || {};

    // Health data formatters
    function formatBytes(bytes) {
        if (!bytes || bytes === 0) return '0 B';
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        if (i === 0) return bytes + ' B';
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    }

    function formatUptime(startTime) {
        if (!startTime || startTime === 0 || startTime === '0') return '00:00:00';
        var startMs = typeof startTime === 'string' ? parseInt(startTime, 10) : startTime;
        var s = Math.floor((Date.now() - startMs) / 1000);
        if (s < 0) return '00:00:00';
        return String(Math.floor(s / 3600)).padStart(2, '0') + ':' +
               String(Math.floor((s % 3600) / 60)).padStart(2, '0') + ':' +
               String(s % 60).padStart(2, '0');
    }

    function formatLastPulse(lastMsgTime) {
        if (!lastMsgTime || lastMsgTime === 0 || lastMsgTime === '0') return '00:00:00';
        var ms = typeof lastMsgTime === 'string' ? parseInt(lastMsgTime, 10) : lastMsgTime;
        var s = Math.floor((Date.now() - ms) / 1000);
        if (s < 0) return '00:00:00';
        return String(Math.floor(s / 3600)).padStart(2, '0') + ':' +
               String(Math.floor((s % 3600) / 60)).padStart(2, '0') + ':' +
               String(s % 60).padStart(2, '0');
    }

    // Health transform function - converts raw API data to table format
    MobileSysHealth.transformData = function(item) {
        if (!item.stats) return null;
        return {
            service: item.alias || 'Unknown',
            rx: (item.stats.rxMsgCount || 0).toLocaleString(),
            tx: (item.stats.txMsgCount || 0).toLocaleString(),
            memory: formatBytes(item.stats.memoryUsage || 0),
            cpuPercent: (item.stats.cpuUsage || 0).toFixed(2) + '%',
            upTime: formatUptime(item.startTime),
            lastPulse: formatLastPulse(item.stats.lastMsgTime)
        };
    };

    // Health columns
    MobileSysHealth.columns = {
        L8Health: [
            { key: 'service', label: 'Service', primary: true, filterKey: 'alias', sortKey: 'alias' },
            { key: 'cpuPercent', label: 'CPU %', secondary: true, filterKey: 'stats.cpuUsage', sortKey: 'stats.cpuUsage' },
            { key: 'memory', label: 'Memory', filterKey: 'stats.memoryUsage', sortKey: 'stats.memoryUsage' },
            { key: 'rx', label: 'RX', filterKey: 'stats.rxMsgCount', sortKey: 'stats.rxMsgCount' },
            { key: 'tx', label: 'TX', filterKey: 'stats.txMsgCount', sortKey: 'stats.txMsgCount' },
            { key: 'upTime', label: 'Up Time', filterKey: 'startTime', sortKey: 'startTime' },
            { key: 'lastPulse', label: 'Last Pulse', filterKey: 'stats.lastMsgTime', sortKey: 'stats.lastMsgTime' }
        ]
    };

    // Security columns - field names match desktop l8security-columns.js
    MobileSysSecurity.columns = {
        L8User: [
            { key: 'userId', label: 'User ID', primary: true, sortKey: 'userId', filterKey: 'userId' },
            { key: 'fullName', label: 'Full Name', secondary: true, sortKey: 'fullName', filterKey: 'fullName' }
        ],
        L8Role: [
            { key: 'roleId', label: 'Role ID', primary: true, sortKey: 'roleId', filterKey: 'roleId' },
            { key: 'roleName', label: 'Role Name', secondary: true, sortKey: 'roleName', filterKey: 'roleName' }
        ],
        L8Credentials: [
            { key: 'id', label: 'ID', primary: true, sortKey: 'id', filterKey: 'id' },
            { key: 'name', label: 'Name', secondary: true, sortKey: 'name', filterKey: 'name' }
        ]
    };

})();
