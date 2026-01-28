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
 * ERP Reference Picker - Utility Functions and Constants
 * A reusable dropdown picker for selecting referenced entities
 */
(function() {
    'use strict';

    // Create namespace
    window.ERPReferencePicker = window.ERPReferencePicker || {};
    ERPReferencePicker._internal = {};

    // Store attached pickers
    ERPReferencePicker._internal.attachedInputs = new WeakMap();
    ERPReferencePicker._internal.currentOverlay = null;
    ERPReferencePicker._internal.currentPicker = null;
    ERPReferencePicker._internal.currentInput = null;
    ERPReferencePicker._internal.currentConfig = null;
    ERPReferencePicker._internal.currentState = null;

    /**
     * Create the overlay element
     */
    ERPReferencePicker._internal.createOverlay = function() {
        const overlay = document.createElement('div');
        overlay.className = 'erp-refpicker-overlay';
        return overlay;
    };

    /**
     * Handle Escape key to close picker
     */
    ERPReferencePicker._internal.handleEscapeKey = function(e) {
        if (e.key === 'Escape') {
            ERPReferencePicker.close();
        }
    };

    /**
     * Debounce utility for filtering
     */
    ERPReferencePicker._internal.debounce = function(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    /**
     * Escape HTML to prevent XSS
     */
    ERPReferencePicker._internal.escapeHtml = function(text) {
        if (typeof ERPUtils !== 'undefined' && ERPUtils.escapeHtml) {
            return ERPUtils.escapeHtml(text);
        }
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

})();
