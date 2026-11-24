/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 *
 * Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

// Startup dependency check (FailFastNoSilentFallback). Lists every global the
// ERP shells rely on: the l8ui globals defined by the scripts app.html /
// m/app.html load, plus the project's chat endpoints. A missing one means a
// script tag is missing (or an l8ui bump dropped a file) -- fail loudly at
// boot, naming all of them, instead of a ReferenceError deep in a render.
// Never trim an entry to make the check pass: add the script tag instead.
// Loaded right before js/app.js / js/app-core.js so its DOMContentLoaded
// listener runs before the app's.
(function() {
    'use strict';

    var REQUIRED_DESKTOP = [
        'DashboardConfig', 'DashboardStats', 'ErpLiveKpis',
        'ERP_CHAT_ENDPOINTS', 'L8ChatApi', 'L8ChatBubble', 'L8ChatComposer', 'L8ChatConvDialog',
        'L8ChatConvList', 'L8ChatFiles', 'L8ChatGroupDialog', 'L8ChatLive', 'L8ChatSession',
        'L8ChatSidebar', 'L8ChatStatus', 'L8ChatStore', 'L8ChatThread', 'L8DIExecute',
        'L8DITemplates', 'L8DITransfer', 'L8DataImport', 'L8Health', 'L8Logs', 'L8Security',
        'L8SecurityChangePassword', 'L8SecurityPasswordStrength', 'L8Sys',
        'L8SysCredentialsCRUD', 'L8SysDependencyGraph', 'L8SysIntegrationCRUD', 'L8SysModules', 'L8SysModulesMap',
        'L8SysRolesCRUD', 'L8SysUsersCRUD', 'Layer8ColumnFactory', 'Layer8CsvExport',
        'Layer8DCalendar', 'Layer8DCalendarEvents', 'Layer8DCalendarRender', 'Layer8DChart',
        'Layer8DChartBar', 'Layer8DChartLine', 'Layer8DChartPie', 'Layer8DConfig',
        'Layer8DDataSource', 'Layer8DDatePicker', 'Layer8DForms', 'Layer8DFormsData',
        'Layer8DFormsFields', 'Layer8DFormsInline', 'Layer8DFormsModal', 'Layer8DFormsPickers',
        'Layer8DGantt', 'Layer8DGanttEvents', 'Layer8DGanttRender', 'Layer8DInputFormatter',
        'Layer8DInputFormatterValidators', 'Layer8DKanban', 'Layer8DKanbanEvents',
        'Layer8DKanbanRender', 'Layer8DModuleCRUD', 'Layer8DModuleFactory',
        'Layer8DModuleFilter', 'Layer8DModuleNavigation', 'Layer8DNotification',
        'Layer8DPermissionFilter', 'Layer8DPopup', 'Layer8DPortalSwitcher',
        'Layer8DReferencePicker', 'Layer8DReferenceRegistry', 'Layer8DRenderers',
        'Layer8DServiceRegistry', 'Layer8DThemeSwitcher', 'Layer8DTimeline',
        'Layer8DToggleTree', 'Layer8DTreeGrid', 'Layer8DTreeGridEvents',
        'Layer8DTreeGridRender', 'Layer8DUtils', 'Layer8DViewFactory', 'Layer8DWebSocket',
        'Layer8DWidget', 'Layer8DWizard', 'Layer8DWizardRender', 'Layer8DatepickerGrid',
        'Layer8EnumFactory', 'Layer8ExcelExport', 'Layer8ExportHelper', 'Layer8FieldParsers',
        'Layer8FileUpload', 'Layer8FormChips', 'Layer8FormFactory', 'Layer8FormatDisplay',
        'Layer8InlineTableState', 'Layer8Markdown', 'Layer8ModuleConfigFactory',
        'Layer8ModuleFactoryCore', 'Layer8PdfExport', 'Layer8PeriodSelector',
        'Layer8QueryBuilder', 'Layer8RefFactory', 'Layer8ReferenceConfigResolver',
        'Layer8SectionConfigs', 'Layer8SectionGenerator', 'Layer8SvgFactory',
        'Layer8ViewSwitcher'
    ];

    var REQUIRED_MOBILE = [
        'DashboardConfig', 'ErpLiveKpis',
        'ERP_CHAT_ENDPOINTS', 'L8ChatApi', 'L8ChatBubbleMobile', 'L8ChatComposer',
        'L8ChatConvDialog', 'L8ChatConvList', 'L8ChatFiles', 'L8ChatGroupDialog', 'L8ChatLive',
        'L8ChatMobile', 'L8ChatSession', 'L8ChatSidebar', 'L8ChatStatus', 'L8ChatStore',
        'L8ChatThread', 'L8DIExecute', 'L8DITemplates', 'L8DITransfer', 'L8DataImport',
        'L8Security', 'L8SysDependencyGraph', 'L8SysModules', 'L8SysModulesMap',
        'Layer8ColumnFactory', 'Layer8CsvExport', 'Layer8DCalendar', 'Layer8DCalendarEvents',
        'Layer8DCalendarRender', 'Layer8DChart', 'Layer8DChartBar', 'Layer8DChartLine',
        'Layer8DChartPie', 'Layer8DConfig', 'Layer8DDataSource', 'Layer8DGantt',
        'Layer8DGanttEvents', 'Layer8DGanttRender', 'Layer8DKanban', 'Layer8DKanbanEvents',
        'Layer8DKanbanRender', 'Layer8DModuleFilter', 'Layer8DPermissionFilter',
        'Layer8DReferenceRegistry', 'Layer8DRenderers', 'Layer8DThemeSwitcher',
        'Layer8DTimeline', 'Layer8DToggleTree', 'Layer8DTreeGrid', 'Layer8DTreeGridEvents',
        'Layer8DTreeGridRender', 'Layer8DUtils', 'Layer8DViewFactory', 'Layer8DWebSocket',
        'Layer8DWidget', 'Layer8DWizard', 'Layer8DWizardRender', 'Layer8DatepickerGrid',
        'Layer8EnumFactory', 'Layer8ExcelExport', 'Layer8ExportHelper', 'Layer8FieldParsers',
        'Layer8FileUpload', 'Layer8FormChips', 'Layer8FormFactory', 'Layer8FormatDisplay',
        'Layer8InlineTableState', 'Layer8MAuth', 'Layer8MCalendar', 'Layer8MChart',
        'Layer8MConfig', 'Layer8MConfirm', 'Layer8MDataSource', 'Layer8MDatePicker',
        'Layer8MEditTable', 'Layer8MFormFields', 'Layer8MForms', 'Layer8MGantt',
        'Layer8MKanban', 'Layer8MModuleRegistry', 'Layer8MNav', 'Layer8MNavCrud',
        'Layer8MNavData', 'Layer8MPopup', 'Layer8MPortalSwitcher', 'Layer8MReferencePicker',
        'Layer8MReferenceRegistry', 'Layer8MRenderers', 'Layer8MTable', 'Layer8MTimeline',
        'Layer8MTreeGrid', 'Layer8MUtils', 'Layer8MViewFactory', 'Layer8MWizard',
        'Layer8Markdown', 'Layer8PdfExport', 'Layer8PeriodSelector', 'Layer8QueryBuilder',
        'Layer8RefFactory', 'Layer8ReferenceConfigResolver', 'Layer8ViewSwitcher'
    ];

    // Run at DOM-ready, not synchronously: some l8ui modules (e.g.
    // l8ui/popup/layer8d-popup.js) assign their global in an immediate init(),
    // so a synchronous check could report a false missing.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', check);
    } else {
        check();
    }

    function check() {
        var isMobile = /(^|\/)m\//.test(window.location.pathname);
        var required = isMobile ? REQUIRED_MOBILE : REQUIRED_DESKTOP;
        var missing = required.filter(function(name) {
            return typeof window[name] === 'undefined';
        });
        window.ERP_DEPS_CHECK = { shell: isMobile ? 'mobile' : 'desktop', checked: required.length, missing: missing };
        if (missing.length === 0) return;

        var msg = 'ERP ' + window.ERP_DEPS_CHECK.shell + ' shell: ' + missing.length +
            ' required global(s) not loaded: ' + missing.join(', ') +
            '. A script tag is missing from ' + (isMobile ? 'm/app.html' : 'app.html') +
            ', or the l8ui submodule no longer provides the file that defines it.';
        console.error(msg);
        try {
            var banner = document.createElement('div');
            banner.id = 'erp-deps-check-error';
            banner.setAttribute('style', [
                'position:fixed', 'inset:0', 'z-index:2147483647',
                'background:#1a0000', 'color:#ff9b9b', 'padding:24px',
                'font:13px/1.5 monospace', 'overflow:auto', 'white-space:pre-wrap'
            ].join(';'));
            banner.textContent = 'Startup dependency check failed\n\n' + msg;
            (document.body || document.documentElement).appendChild(banner);
        } catch (e) {
            // The throw below still surfaces it.
        }
        throw new Error(msg);
    }
})();
