/**
 * MobileConfirm - Confirmation dialog for ERP mobile
 */
(function() {
    'use strict';

    window.MobileConfirm = {
        /**
         * Show confirmation dialog
         * @returns {Promise<boolean>}
         */
        show(options) {
            return new Promise((resolve) => {
                const config = {
                    title: options.title || 'Confirm',
                    message: options.message || 'Are you sure?',
                    confirmText: options.confirmText || 'Confirm',
                    cancelText: options.cancelText || 'Cancel',
                    destructive: options.destructive || false
                };

                const overlay = document.createElement('div');
                overlay.className = 'mobile-confirm-overlay';

                overlay.innerHTML = `
                    <div class="mobile-confirm">
                        <div class="mobile-confirm-content">
                            <h3 class="mobile-confirm-title">${MobileUtils.escapeHtml(config.title)}</h3>
                            <p class="mobile-confirm-message">${MobileUtils.escapeHtml(config.message)}</p>
                        </div>
                        <div class="mobile-confirm-actions">
                            <button class="mobile-confirm-btn mobile-confirm-btn-cancel">
                                ${MobileUtils.escapeHtml(config.cancelText)}
                            </button>
                            <button class="mobile-confirm-btn ${config.destructive ? 'mobile-confirm-btn-danger' : 'mobile-confirm-btn-primary'}">
                                ${MobileUtils.escapeHtml(config.confirmText)}
                            </button>
                        </div>
                    </div>
                `;

                document.body.appendChild(overlay);
                document.body.style.overflow = 'hidden';

                requestAnimationFrame(() => {
                    overlay.classList.add('open');
                });

                const close = (result) => {
                    overlay.classList.remove('open');
                    setTimeout(() => {
                        overlay.remove();
                        document.body.style.overflow = '';
                        resolve(result);
                    }, 200);
                };

                overlay.querySelector('.mobile-confirm-btn-cancel').addEventListener('click', () => close(false));
                overlay.querySelector('.mobile-confirm-btn-primary, .mobile-confirm-btn-danger').addEventListener('click', () => close(true));
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) close(false);
                });
            });
        },

        /**
         * Show delete confirmation
         */
        async confirmDelete(itemName = 'this item') {
            return this.show({
                title: 'Delete',
                message: `Are you sure you want to delete ${itemName}? This action cannot be undone.`,
                confirmText: 'Delete',
                cancelText: 'Cancel',
                destructive: true
            });
        },

        /**
         * Show save confirmation
         */
        async confirmSave() {
            return this.show({
                title: 'Save Changes',
                message: 'Do you want to save your changes?',
                confirmText: 'Save',
                cancelText: 'Cancel'
            });
        },

        /**
         * Show discard confirmation
         */
        async confirmDiscard() {
            return this.show({
                title: 'Discard Changes',
                message: 'You have unsaved changes. Are you sure you want to discard them?',
                confirmText: 'Discard',
                cancelText: 'Keep Editing',
                destructive: true
            });
        }
    };

})();
