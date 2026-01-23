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
