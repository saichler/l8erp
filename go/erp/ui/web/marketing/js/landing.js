(function() {
    'use strict';

    const modalContainer = document.getElementById('modal-container');
    const modalCache = {};

    function parseMarkdown(markdown) {
        return markdown
            .replace(/^#\s*<div[^>]*>.*<\/div>\s*\n?/, '')
            .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
            .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
            .replace(/^---+$/gm, '<hr>')
            .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .split(/\n\n+/)
            .map(function(para) {
                para = para.trim();
                if (!para) return '';
                if (para.startsWith('<h') || para.startsWith('<hr')) return para;
                return '<p>' + para.replace(/\n/g, '<br>') + '</p>';
            })
            .filter(Boolean)
            .join('\n');
    }

    async function loadDeveloperMarkdown() {
        try {
            const response = await fetch('AboutTheDeveloper.md');
            if (!response.ok) throw new Error('Could not load AboutTheDeveloper.md');
            const container = document.getElementById('developer-markdown-content');
            if (container) {
                container.innerHTML = parseMarkdown(await response.text());
            }
        } catch (error) {
            console.error(error);
        }
    }

    function initCopyButtons(container) {
        container.querySelectorAll('.copy-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const code = btn.previousElementSibling;
                if (!code) return;
                navigator.clipboard.writeText(code.textContent.trim());
            });
        });
    }

    async function openModal(modalName) {
        if (!modalContainer) return;
        let modalContent = modalCache[modalName];
        if (!modalContent) {
            const response = await fetch('modals/' + modalName + '-modal.html');
            if (!response.ok) return;
            modalContent = await response.text();
            modalCache[modalName] = modalContent;
        }

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = modalContent;
        modalContainer.innerHTML = '';
        modalContainer.appendChild(overlay);
        requestAnimationFrame(function() {
            overlay.classList.add('active');
        });
        document.body.style.overflow = 'hidden';

        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) closeModal();
        });

        overlay.querySelectorAll('.modal-close, [data-close-modal]').forEach(function(btn) {
            btn.addEventListener('click', closeModal);
        });

        initCopyButtons(overlay);

        if (modalName === 'developer') {
            loadDeveloperMarkdown();
        }
    }

    function closeModal() {
        const overlay = modalContainer && modalContainer.querySelector('.modal-overlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(function() {
            if (modalContainer) modalContainer.innerHTML = '';
        }, 200);
    }

    function initAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(event) {
                const href = anchor.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function initModals() {
        document.querySelectorAll('[data-modal]').forEach(function(trigger) {
            trigger.addEventListener('click', function(event) {
                event.preventDefault();
                openModal(trigger.getAttribute('data-modal'));
            });
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') closeModal();
        });
    }

    window.dismissDemoBanner = function() {
        const banner = document.getElementById('demoBanner');
        if (banner) {
            banner.classList.add('hidden');
            sessionStorage.setItem('demoBannerDismissed', 'true');
        }
    };

    if (sessionStorage.getItem('demoBannerDismissed') === 'true') {
        const banner = document.getElementById('demoBanner');
        if (banner) banner.classList.add('hidden');
    }

    initAnchors();
    initModals();
})();
