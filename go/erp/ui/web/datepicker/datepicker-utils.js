/**
 * ERP Date Picker - Utility Functions and Constants
 */
(function() {
    'use strict';

    // Create namespace
    window.ERPDatePicker = window.ERPDatePicker || {};
    ERPDatePicker._internal = {};

    // Month names for display
    ERPDatePicker._internal.MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Day abbreviations
    ERPDatePicker._internal.DAYS_SUNDAY_START = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    ERPDatePicker._internal.DAYS_MONDAY_START = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    // Store attached pickers
    ERPDatePicker._internal.attachedInputs = new WeakMap();
    ERPDatePicker._internal.currentOverlay = null;
    ERPDatePicker._internal.currentPicker = null;
    ERPDatePicker._internal.currentInput = null;

    /**
     * Check if a date is disabled based on min/max options
     */
    ERPDatePicker._internal.isDateDisabled = function(date, options) {
        if (options.minDate) {
            const min = new Date(options.minDate * 1000);
            min.setHours(0, 0, 0, 0);
            if (date < min) return true;
        }
        if (options.maxDate) {
            const max = new Date(options.maxDate * 1000);
            max.setHours(23, 59, 59, 999);
            if (date > max) return true;
        }
        return false;
    };

    /**
     * Create the overlay element
     */
    ERPDatePicker._internal.createOverlay = function() {
        const overlay = document.createElement('div');
        overlay.className = 'erp-datepicker-overlay';
        return overlay;
    };

    /**
     * Handle Escape key to close picker
     */
    ERPDatePicker._internal.handleEscapeKey = function(e) {
        if (e.key === 'Escape') {
            ERPDatePicker.close();
        }
    };

})();
