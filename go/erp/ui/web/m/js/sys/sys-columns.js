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

    const col = window.Layer8ColumnFactory;

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

    // Health columns - use custom() for columns with non-standard sortKey/filterKey
    MobileSysHealth.columns = {
        L8Health: [
            ...col.custom('service', 'Service', null, { sortKey: 'alias', filterKey: 'alias' }),
            ...col.custom('cpuPercent', 'CPU %', null, { sortKey: 'stats.cpuUsage', filterKey: 'stats.cpuUsage' }),
            ...col.custom('memory', 'Memory', null, { sortKey: 'stats.memoryUsage', filterKey: 'stats.memoryUsage' }),
            ...col.custom('rx', 'RX', null, { sortKey: 'stats.rxMsgCount', filterKey: 'stats.rxMsgCount' }),
            ...col.custom('tx', 'TX', null, { sortKey: 'stats.txMsgCount', filterKey: 'stats.txMsgCount' }),
            ...col.custom('upTime', 'Up Time', null, { sortKey: 'startTime', filterKey: 'startTime' }),
            ...col.custom('lastPulse', 'Last Pulse', null, { sortKey: 'stats.lastMsgTime', filterKey: 'stats.lastMsgTime' })
        ]
    };

    // Security columns
    MobileSysSecurity.columns = {
        L8User: [
            ...col.col('userId', 'User ID'),
            ...col.col('fullName', 'Full Name')
        ],
        L8Role: [
            ...col.col('roleId', 'Role ID'),
            ...col.col('roleName', 'Role Name')
        ],
        L8Credentials: [
            ...col.col('id', 'ID'),
            ...col.col('name', 'Name')
        ]
    };

})();
