/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Dashboard Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('dashboard', {
        title: 'Dashboard',
        subtitle: 'Enterprise Overview',
        icon: '📊',
        svgContent: Layer8SvgFactory.generate('dashboard'),
        initFn: 'initializeDashboard',
        customContent: `
        <div class="dashboard-stats-container">
            <div class="dashboard-section-header">
                <span class="dashboard-section-icon">📈</span>
                <h2 class="dashboard-section-title">Key Performance Indicators</h2>
            </div>
            <div class="dashboard-stats-grid" id="dashboard-stats-grid"></div>
        </div>`
    });
})();
