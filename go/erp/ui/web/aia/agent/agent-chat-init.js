/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// AI Agent - Chat Component Initialization for L8ERP
// Initializes L8AgentChat with ERP-specific endpoints

(function() {
    'use strict';

    window.AiaAgent = window.AiaAgent || {};

    AiaAgent.initChat = function() {
        if (typeof L8AgentChat !== 'undefined') {
            L8AgentChat.init({
                containerId: 'agent-chat-container',
                chatEndpoint: '/120/AgntChat',
                convoEndpoint: '/120/AgntConvo',
                promptEndpoint: '/120/AgntPrmpt'
            });
        }
    };

    // Hook into the module navigation to initialize chat when the chat service is shown
    var origInit = window.initializeAia;
    window._aiaPostInit = function() {
        if (origInit) origInit();
        // Initialize chat when the chat service view becomes active
        var chatView = document.querySelector('.l8-service-view[data-service="chat"]');
        if (chatView) {
            var observer = new MutationObserver(function(mutations) {
                if (chatView.classList.contains('active')) {
                    AiaAgent.initChat();
                    observer.disconnect();
                }
            });
            observer.observe(chatView, { attributes: true, attributeFilter: ['class'] });
            // If already active, init now
            if (chatView.classList.contains('active')) {
                AiaAgent.initChat();
                observer.disconnect();
            }
        }
    };
})();
