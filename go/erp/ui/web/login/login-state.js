// L8ERP - Login Page State and Initialization
// Part 1 of 4 - Load this file first

// State management
let isLoading = false;
let tfaRequired = false;
let tfaSetupRequired = false;
let pendingAuth = null;

// Initialize the login page
document.addEventListener('DOMContentLoaded', async () => {
    await loadConfig();
    applyConfiguration();
    setupEventListeners();
    checkExistingSession();
});

// Apply configuration from config.js
function applyConfiguration() {
    document.getElementById('app-title').textContent = LOGIN_CONFIG.appTitle;
    document.getElementById('app-description').textContent = LOGIN_CONFIG.appDescription;
    document.title = `Login - ${LOGIN_CONFIG.appTitle}`;

    const rememberMeSection = document.getElementById('remember-me-section');
    if (!LOGIN_CONFIG.showRememberMe) {
        rememberMeSection.style.display = 'none';
    }

    const registerLink = document.querySelector('.register-link');
    if (registerLink && !LOGIN_CONFIG.showRegister) {
        registerLink.style.display = 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    const loginForm = document.getElementById('login-form');
    const tfaForm = document.getElementById('tfa-form');
    const tfaSetupForm = document.getElementById('tfa-setup-form');
    const backLink = document.getElementById('back-to-login');
    const backLinkSetup = document.getElementById('back-to-login-setup');

    loginForm.addEventListener('submit', handleLogin);
    tfaForm.addEventListener('submit', handleTfaVerify);
    tfaSetupForm.addEventListener('submit', handleTfaSetupVerify);
    backLink.addEventListener('click', showLoginSection);
    backLinkSetup.addEventListener('click', showLoginSection);

    // Auto-focus username field
    document.getElementById('username').focus();

    // Enter key handling for TFA input
    document.getElementById('tfa-code').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            handleTfaVerify(e);
        }
    });

    // Enter key handling for TFA setup input
    document.getElementById('tfa-setup-code').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            handleTfaSetupVerify(e);
        }
    });
}

// Check for existing session
function checkExistingSession() {
    const token = sessionStorage.getItem('bearerToken');
    if (token && LOGIN_CONFIG.redirectUrl) {
        // Redirect if token exists - use mobile detection
        window.location.href = getRedirectUrl();
        return;
    }

    // Check for remembered username
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember-me').checked = true;
        document.getElementById('password').focus();
    }
}
