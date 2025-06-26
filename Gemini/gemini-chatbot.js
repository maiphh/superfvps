/**
 * Gemini Chatbot Integration Script
 * 
 * This script automatically loads and initializes the Gemini chatbot
 * Usage: Add this single line to your HTML:
 * <script src="./Gemini/gemini-chatbot.js"></script>
 */

(function() {
    'use strict';
    
    // Get the current script tag to determine the base path
    const currentScript = document.currentScript;
    const basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1);
    
    // Function to load external resources
    function loadResource(type, src, callback) {
        let element;
        
        if (type === 'css') {
            element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = src;
        } else if (type === 'js') {
            element = document.createElement('script');
            element.src = src;
            element.async = true;
        }
        
        if (callback) {
            element.onload = callback;
            element.onerror = () => {
                console.error(`Failed to load ${type}: ${src}`);
            };
        }
        
        document.head.appendChild(element);
    }
    
    // Function to load the chatbot HTML
    function loadChatbotHTML() {
        console.log('Gemini Chatbot: Loading HTML from', basePath + 'chatbot.html');
        
        fetch(basePath + 'chatbot.html')
            .then(response => {
                console.log('Gemini Chatbot: HTML response received');
                return response.text();
            })
            .then(html => {
                console.log('Gemini Chatbot: HTML content loaded, injecting into page');
                
                // Extract the body content from the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const bodyContent = doc.body.innerHTML;
                
                // Create a container div and inject the chatbot
                const chatbotContainer = document.createElement('div');
                chatbotContainer.id = 'gemini-chatbot-wrapper';
                chatbotContainer.innerHTML = bodyContent;
                
                // Append to body
                document.body.appendChild(chatbotContainer);
                console.log('Gemini Chatbot: HTML injected, loading JavaScript');
                
                // Load the chatbot JavaScript and initialize
                loadResource('js', basePath + 'chatbot.js', () => {
                    console.log('Gemini Chatbot: JavaScript loaded, initializing...');
                    // Initialize chatbot after script loads
                    if (window.initializeGeminiChatbot) {
                        window.initializeGeminiChatbot();
                    }
                });
            })
            .catch(error => {
                console.error('Failed to load chatbot HTML:', error);
            });
    }
    
    // Load resources when DOM is ready
    function initializeChatbot() {
        console.log('Gemini Chatbot: Starting initialization...');
        
        // Load Font Awesome if not already loaded
        if (!document.querySelector('link[href*="font-awesome"]')) {
            loadResource('css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        }
        
        // Try to load config file (optional)
        loadResource('js', basePath + 'config.js', () => {
            console.log('Config file loaded');
        });
        
        // Load chatbot CSS
        loadResource('css', basePath + 'chatbot.css');
        
        // Load chatbot HTML and JS
        loadChatbotHTML();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChatbot);
    } else {
        initializeChatbot();
    }
    
    // Expose global functions for manual control (optional)
    window.GeminiChatbot = {
        remove: function() {
            const wrapper = document.getElementById('gemini-chatbot-wrapper');
            if (wrapper) {
                wrapper.remove();
            }
        },
        
        reload: function() {
            this.remove();
            setTimeout(initializeChatbot, 100);
        }
    };
})();
