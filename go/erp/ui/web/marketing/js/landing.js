/**
 * ERP by Layer 8 - Marketing Landing Page JavaScript
 */
(function() {
    'use strict';

    // DOM Elements
    const header = document.querySelector('.landing-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const modalContainer = document.getElementById('modal-container');

    // Modal cache
    const modalCache = {};

    /**
     * Initialize all functionality
     */
    function init() {
        initScrollHeader();
        initMobileMenu();
        initSmoothScroll();
        initScrollAnimations();
        initParallax();
        initModalTriggers();
        initCopyButtons();
    }

    /**
     * Header scroll effect
     */
    function initScrollHeader() {
        if (!header) return;

        let lastScroll = 0;

        function onScroll() {
            const currentScroll = window.pageYOffset;

            // Add scrolled class when past threshold
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // Initial check
    }

    /**
     * Mobile menu toggle
     */
    function initMobileMenu() {
        if (!mobileMenuToggle || !mobileNav) return;

        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        mobileNav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Scroll-triggered animations using Intersection Observer
     */
    function initScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal, .stagger-item');

        if (!revealElements.length) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed', 'visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    /**
     * Parallax effect for hero section
     */
    function initParallax() {
        const heroBackground = document.querySelector('.hero-background');
        const floatingShapes = document.querySelectorAll('.shape');

        if (!heroBackground || !floatingShapes.length) return;

        // Only enable parallax on desktop
        if (window.innerWidth < 1024) return;

        function onScroll() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            // Move hero background
            heroBackground.style.transform = 'translateY(' + rate + 'px)';

            // Move floating shapes at different rates
            floatingShapes.forEach(function(shape, index) {
                const shapeRate = scrolled * (0.1 + index * 0.05);
                shape.style.transform = 'translateY(' + shapeRate + 'px)';
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /**
     * Modal system
     */
    function initModalTriggers() {
        // Modal trigger buttons
        document.querySelectorAll('[data-modal]').forEach(function(trigger) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalName = this.getAttribute('data-modal');
                openModal(modalName);
            });
        });

        // Close modal on overlay click
        if (modalContainer) {
            modalContainer.addEventListener('click', function(e) {
                if (e.target === modalContainer || e.target.classList.contains('modal-overlay')) {
                    closeModal();
                }
            });
        }

        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    /**
     * Simple markdown to HTML parser
     */
    function parseMarkdown(markdown) {
        var html = markdown
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
            .filter(function(p) { return p; })
            .join('\n');
        return html;
    }

    /**
     * Load and render AboutTheDeveloper.md into the developer modal
     */
    async function loadDeveloperMarkdown() {
        try {
            var response = await fetch('AboutTheDeveloper.md');
            if (!response.ok) throw new Error('Could not load AboutTheDeveloper.md');
            var markdown = await response.text();
            var html = parseMarkdown(markdown);
            var container = document.getElementById('developer-markdown-content');
            if (container) container.innerHTML = html;
        } catch (error) {
            console.error('Error loading developer markdown:', error);
            var container = document.getElementById('developer-markdown-content');
            if (container) container.innerHTML = '<p>Content could not be loaded.</p>';
        }
    }

    /**
     * Open modal by name
     */
    async function openModal(modalName) {
        if (!modalContainer) return;

        try {
            // Check cache first
            let modalContent = modalCache[modalName];

            if (!modalContent) {
                // Fetch modal content
                const response = await fetch('modals/' + modalName + '-modal.html');
                if (!response.ok) throw new Error('Modal not found');
                modalContent = await response.text();
                modalCache[modalName] = modalContent;
            }

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.innerHTML = modalContent;

            // Clear and add to container
            modalContainer.innerHTML = '';
            modalContainer.appendChild(overlay);

            // Trigger animation
            requestAnimationFrame(function() {
                overlay.classList.add('active');
            });

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Initialize close buttons in modal
            overlay.querySelectorAll('.modal-close, [data-close-modal]').forEach(function(btn) {
                btn.addEventListener('click', closeModal);
            });

            // Initialize copy buttons in modal
            initCopyButtons(overlay);

            // Load developer markdown if this is the developer modal
            if (modalName === 'developer') {
                loadDeveloperMarkdown();
            }

        } catch (error) {
            console.error('Failed to load modal:', error);
        }
    }

    /**
     * Close active modal
     */
    function closeModal() {
        if (!modalContainer) return;

        const overlay = modalContainer.querySelector('.modal-overlay');
        if (!overlay) return;

        overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Remove after animation
        setTimeout(function() {
            modalContainer.innerHTML = '';
        }, 300);
    }

    /**
     * Copy to clipboard functionality
     */
    function initCopyButtons(container) {
        container = container || document;

        container.querySelectorAll('.copy-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const target = this.getAttribute('data-copy');
                const text = target ? document.querySelector(target)?.textContent : this.previousElementSibling?.textContent;

                if (!text) return;

                navigator.clipboard.writeText(text.trim()).then(function() {
                    const originalText = btn.textContent;
                    btn.textContent = 'Copied!';
                    btn.style.background = 'var(--erp-primary)';
                    btn.style.color = 'white';

                    setTimeout(function() {
                        btn.textContent = originalText;
                        btn.style.background = '';
                        btn.style.color = '';
                    }, 2000);
                }).catch(function(err) {
                    console.error('Failed to copy:', err);
                });
            });
        });
    }

    /**
     * Demo banner dismiss
     */
    window.dismissDemoBanner = function() {
        var banner = document.getElementById('demoBanner');
        if (banner) {
            banner.classList.add('hidden');
            sessionStorage.setItem('demoBannerDismissed', 'true');
        }
    };

    // Restore banner state on load
    (function() {
        if (sessionStorage.getItem('demoBannerDismissed') === 'true') {
            var banner = document.getElementById('demoBanner');
            if (banner) banner.classList.add('hidden');
        }
    })();

    /**
     * Set preference to view desktop version
     */
    window.setDesktopPreference = function(prefer) {
        localStorage.setItem('preferDesktop', prefer ? 'true' : 'false');
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
