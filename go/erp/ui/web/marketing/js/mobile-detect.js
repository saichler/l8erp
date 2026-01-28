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
