/**
 * ERP Date Picker Component
 * A reusable calendar date picker with configurable date format support
 */
(function() {
    'use strict';

    // Month names for display
    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Day abbreviations (starting with Sunday)
    const DAYS_SUNDAY_START = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const DAYS_MONDAY_START = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    // Store attached pickers
    const attachedInputs = new WeakMap();
    let currentOverlay = null;
    let currentPicker = null;
    let currentInput = null;

    /**
     * Create the date picker DOM element
     * @param {object} options
     * @returns {HTMLElement}
     */
    function createPickerElement(options) {
        const picker = document.createElement('div');
        picker.className = 'erp-datepicker hidden';
        picker.innerHTML = `
            <div class="erp-datepicker-header">
                <div class="erp-datepicker-nav">
                    <button type="button" class="erp-datepicker-nav-btn prev-month" title="Previous Month">&lt;</button>
                </div>
                <div class="erp-datepicker-title">
                    <select class="erp-datepicker-month-select"></select>
                    <select class="erp-datepicker-year-select"></select>
                </div>
                <div class="erp-datepicker-nav">
                    <button type="button" class="erp-datepicker-nav-btn next-month" title="Next Month">&gt;</button>
                </div>
            </div>
            <div class="erp-datepicker-calendar">
                <div class="erp-datepicker-weekdays"></div>
                <div class="erp-datepicker-days"></div>
            </div>
            <div class="erp-datepicker-footer">
                <button type="button" class="erp-datepicker-clear-btn">Clear</button>
                <button type="button" class="erp-datepicker-today-btn">Today</button>
            </div>
        `;

        // Populate month select
        const monthSelect = picker.querySelector('.erp-datepicker-month-select');
        MONTHS.forEach((month, idx) => {
            const option = document.createElement('option');
            option.value = idx;
            option.textContent = month;
            monthSelect.appendChild(option);
        });

        // Populate year select (current year -100 to +20)
        const yearSelect = picker.querySelector('.erp-datepicker-year-select');
        const currentYear = new Date().getFullYear();
        for (let y = currentYear - 100; y <= currentYear + 20; y++) {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = y;
            yearSelect.appendChild(option);
        }

        // Populate weekday headers
        const weekdaysEl = picker.querySelector('.erp-datepicker-weekdays');
        const days = options.firstDayOfWeek === 1 ? DAYS_MONDAY_START : DAYS_SUNDAY_START;
        days.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'erp-datepicker-weekday';
            dayEl.textContent = day;
            weekdaysEl.appendChild(dayEl);
        });

        // Hide footer if no today button requested
        if (options.showTodayButton === false) {
            picker.querySelector('.erp-datepicker-footer').style.display = 'none';
        }

        return picker;
    }

    /**
     * Render the calendar for a specific month/year
     * @param {HTMLElement} picker
     * @param {number} year
     * @param {number} month
     * @param {number|null} selectedTimestamp
     * @param {object} options
     */
    function renderCalendar(picker, year, month, selectedTimestamp, options) {
        const daysContainer = picker.querySelector('.erp-datepicker-days');
        daysContainer.innerHTML = '';

        const firstDayOfWeek = options.firstDayOfWeek || 0;
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        // Calculate starting day (adjust for first day of week)
        let startDay = firstDayOfMonth.getDay() - firstDayOfWeek;
        if (startDay < 0) startDay += 7;

        // Get today's date for comparison
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();

        // Selected date for comparison
        let selectedDate = null;
        if (selectedTimestamp) {
            selectedDate = new Date(selectedTimestamp * 1000);
        }

        // Previous month days
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevMonthYear = month === 0 ? year - 1 : year;
        const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

        // Render previous month's trailing days
        for (let i = startDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const btn = createDayButton(day, prevMonthYear, prevMonth, {
                isOtherMonth: true,
                isToday: false,
                isSelected: false,
                isDisabled: isDateDisabled(new Date(prevMonthYear, prevMonth, day), options)
            });
            daysContainer.appendChild(btn);
        }

        // Render current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = year === todayYear && month === todayMonth && day === todayDate;
            const isSelected = selectedDate &&
                year === selectedDate.getFullYear() &&
                month === selectedDate.getMonth() &&
                day === selectedDate.getDate();

            const btn = createDayButton(day, year, month, {
                isOtherMonth: false,
                isToday,
                isSelected,
                isDisabled: isDateDisabled(new Date(year, month, day), options)
            });
            daysContainer.appendChild(btn);
        }

        // Fill remaining days from next month
        const totalCells = startDay + daysInMonth;
        const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextMonthYear = month === 11 ? year + 1 : year;

        for (let day = 1; day <= remainingCells; day++) {
            const btn = createDayButton(day, nextMonthYear, nextMonth, {
                isOtherMonth: true,
                isToday: false,
                isSelected: false,
                isDisabled: isDateDisabled(new Date(nextMonthYear, nextMonth, day), options)
            });
            daysContainer.appendChild(btn);
        }

        // Update selects
        picker.querySelector('.erp-datepicker-month-select').value = month;
        picker.querySelector('.erp-datepicker-year-select').value = year;
    }

    /**
     * Create a day button element
     * @param {number} day
     * @param {number} year
     * @param {number} month
     * @param {object} state
     * @returns {HTMLButtonElement}
     */
    function createDayButton(day, year, month, state) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'erp-datepicker-day';
        btn.textContent = day;
        btn.dataset.year = year;
        btn.dataset.month = month;
        btn.dataset.day = day;

        if (state.isOtherMonth) btn.classList.add('other-month');
        if (state.isToday) btn.classList.add('today');
        if (state.isSelected) btn.classList.add('selected');
        if (state.isDisabled) {
            btn.classList.add('disabled');
            btn.disabled = true;
        }

        return btn;
    }

    /**
     * Check if a date is disabled based on min/max options
     * @param {Date} date
     * @param {object} options
     * @returns {boolean}
     */
    function isDateDisabled(date, options) {
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
    }

    /**
     * Create the overlay element that contains the picker
     * @returns {HTMLElement}
     */
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'erp-datepicker-overlay';
        return overlay;
    }

    /**
     * Attach date picker to an input element
     * @param {HTMLElement} inputElement
     * @param {object} options
     */
    function attach(inputElement, options = {}) {
        if (attachedInputs.has(inputElement)) {
            return; // Already attached
        }

        const config = {
            minDate: options.minDate || null,
            maxDate: options.maxDate || null,
            onChange: options.onChange || null,
            showTodayButton: options.showTodayButton !== false,
            firstDayOfWeek: options.firstDayOfWeek || 0
        };

        attachedInputs.set(inputElement, config);

        // Update placeholder based on configured format
        if (typeof ERPUtils !== 'undefined' && ERPUtils.getDateInputPlaceholder) {
            inputElement.placeholder = ERPUtils.getDateInputPlaceholder();
        }

        // Handle input click
        inputElement.addEventListener('click', (e) => {
            e.stopPropagation();
            open(inputElement);
        });

        // Handle input focus
        inputElement.addEventListener('focus', () => {
            open(inputElement);
        });

        // Handle manual input
        inputElement.addEventListener('change', () => {
            if (currentPicker && currentInput === inputElement) {
                const timestamp = getDate(inputElement);
                if (timestamp) {
                    const date = new Date(timestamp * 1000);
                    renderCalendar(currentPicker, date.getFullYear(), date.getMonth(), timestamp, config);
                }
            }
        });

        // Handle keyboard navigation on input
        inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                close();
            } else if (e.key === 'Enter' && currentPicker) {
                e.preventDefault();
                close();
            }
        });
    }

    /**
     * Open the date picker for an input
     * @param {HTMLElement} inputElement
     */
    function open(inputElement) {
        const config = attachedInputs.get(inputElement);
        if (!config) return;

        // Don't reopen if already open for this input
        if (currentPicker && currentInput === inputElement) {
            return;
        }

        // Close any existing picker
        close();

        // Create overlay and picker
        const overlay = createOverlay();
        const picker = createPickerElement(config);
        overlay.appendChild(picker);
        document.body.appendChild(overlay);

        currentOverlay = overlay;
        currentPicker = picker;
        currentInput = inputElement;

        // Get initial date from input or use today
        let timestamp = getDate(inputElement);
        let displayDate;
        if (timestamp) {
            displayDate = new Date(timestamp * 1000);
        } else {
            displayDate = new Date();
            timestamp = null;
        }

        // Render calendar
        renderCalendar(picker, displayDate.getFullYear(), displayDate.getMonth(), timestamp, config);

        // Event handlers
        setupPickerEvents(picker, inputElement, config);

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                close();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', handleEscapeKey);
    }

    /**
     * Setup event handlers for the picker
     * @param {HTMLElement} picker
     * @param {HTMLElement} inputElement
     * @param {object} config
     */
    function setupPickerEvents(picker, inputElement, config) {
        // Day click
        picker.querySelector('.erp-datepicker-days').addEventListener('click', (e) => {
            const dayBtn = e.target.closest('.erp-datepicker-day');
            if (dayBtn && !dayBtn.disabled) {
                const year = parseInt(dayBtn.dataset.year, 10);
                const month = parseInt(dayBtn.dataset.month, 10);
                const day = parseInt(dayBtn.dataset.day, 10);

                const date = new Date(year, month, day);
                const timestamp = Math.floor(date.getTime() / 1000);

                setDate(inputElement, timestamp);

                if (config.onChange) {
                    config.onChange(timestamp, inputElement.value);
                }

                close();
            }
        });

        // Previous month
        picker.querySelector('.prev-month').addEventListener('click', () => {
            const monthSelect = picker.querySelector('.erp-datepicker-month-select');
            const yearSelect = picker.querySelector('.erp-datepicker-year-select');
            let month = parseInt(monthSelect.value, 10);
            let year = parseInt(yearSelect.value, 10);

            month--;
            if (month < 0) {
                month = 11;
                year--;
            }

            const timestamp = getDate(inputElement);
            renderCalendar(picker, year, month, timestamp, config);
        });

        // Next month
        picker.querySelector('.next-month').addEventListener('click', () => {
            const monthSelect = picker.querySelector('.erp-datepicker-month-select');
            const yearSelect = picker.querySelector('.erp-datepicker-year-select');
            let month = parseInt(monthSelect.value, 10);
            let year = parseInt(yearSelect.value, 10);

            month++;
            if (month > 11) {
                month = 0;
                year++;
            }

            const timestamp = getDate(inputElement);
            renderCalendar(picker, year, month, timestamp, config);
        });

        // Month select change
        picker.querySelector('.erp-datepicker-month-select').addEventListener('change', (e) => {
            const month = parseInt(e.target.value, 10);
            const year = parseInt(picker.querySelector('.erp-datepicker-year-select').value, 10);
            const timestamp = getDate(inputElement);
            renderCalendar(picker, year, month, timestamp, config);
        });

        // Year select change
        picker.querySelector('.erp-datepicker-year-select').addEventListener('change', (e) => {
            const year = parseInt(e.target.value, 10);
            const month = parseInt(picker.querySelector('.erp-datepicker-month-select').value, 10);
            const timestamp = getDate(inputElement);
            renderCalendar(picker, year, month, timestamp, config);
        });

        // Today button
        picker.querySelector('.erp-datepicker-today-btn').addEventListener('click', () => {
            const today = new Date();
            const timestamp = Math.floor(today.getTime() / 1000);

            setDate(inputElement, timestamp);

            if (config.onChange) {
                config.onChange(timestamp, inputElement.value);
            }

            close();
        });

        // Clear button
        picker.querySelector('.erp-datepicker-clear-btn').addEventListener('click', () => {
            inputElement.value = '';

            if (config.onChange) {
                config.onChange(null, '');
            }

            close();
        });

    }

    /**
     * Handle Escape key to close picker
     * @param {KeyboardEvent} e
     */
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            close();
        }
    }

    /**
     * Close any open date picker
     */
    function close() {
        document.removeEventListener('keydown', handleEscapeKey);

        if (currentOverlay) {
            currentOverlay.remove();
            currentOverlay = null;
        }
        currentPicker = null;
        currentInput = null;
    }

    /**
     * Set date on an input element
     * @param {HTMLElement} inputElement
     * @param {number} timestamp - Unix timestamp in seconds
     */
    function setDate(inputElement, timestamp) {
        if (typeof ERPUtils !== 'undefined' && ERPUtils.formatDate) {
            inputElement.value = ERPUtils.formatDate(timestamp);
        } else {
            // Fallback to ISO format
            const date = new Date(timestamp * 1000);
            inputElement.value = date.toISOString().split('T')[0];
        }
    }

    /**
     * Get date from an input element
     * @param {HTMLElement} inputElement
     * @returns {number|null} Unix timestamp in seconds, or null if invalid
     */
    function getDate(inputElement) {
        const value = inputElement.value;
        if (!value) return null;

        if (typeof ERPUtils !== 'undefined' && ERPUtils.parseDateToTimestamp) {
            return ERPUtils.parseDateToTimestamp(value);
        }

        // Fallback parsing
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : Math.floor(date.getTime() / 1000);
    }

    /**
     * Detach date picker from an input element
     * @param {HTMLElement} inputElement
     */
    function detach(inputElement) {
        if (currentInput === inputElement) {
            close();
        }
        attachedInputs.delete(inputElement);
    }

    // Export
    window.ERPDatePicker = {
        attach,
        open,
        close,
        setDate,
        getDate,
        detach
    };

})();
