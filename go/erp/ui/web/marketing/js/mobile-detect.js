/**
 * Mobile Device Detection and Redirect
 * Redirects mobile users to the mobile-optimized version
 */
(function() {
    'use strict';

    // Check if user prefers desktop version
    if (localStorage.getItem('preferDesktop') === 'true') {
        return;
    }

    // Detect mobile devices
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var isSmallScreen = window.innerWidth <= 768;

    // Redirect to mobile version
    if (isMobile || isSmallScreen) {
        var currentPath = window.location.pathname;

        // Only redirect if not already on mobile version
        if (currentPath.indexOf('/m/') === -1) {
            window.location.href = 'm/index.html';
        }
    }
})();
