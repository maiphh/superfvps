class GeminiChatbot {
    constructor() {
        // Get API key from environment variable or prompt user
        this.apiKey = this.getApiKey();
        this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;
        
        this.isOpen = false;
        this.isMinimized = false;
        
        // Initialize elements and only proceed if successful
        if (this.initializeElements()) {
            this.bindEvents();
            this.initializeContext();
            console.log('Gemini Chatbot initialized successfully');
        } else {
            console.error('Gemini Chatbot initialization failed');
        }
    }

    getApiKey() {
        // Try to get from environment variable first (for production)
        if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
            return process.env.GEMINI_API_KEY;
        }
        
        // Try to get from localStorage (for development)
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            return storedKey;
        }
        
        // Try to get from a config file (if exists)
        if (window.GEMINI_CONFIG && window.GEMINI_CONFIG.apiKey) {
            return window.GEMINI_CONFIG.apiKey;
        }
        
        // Prompt user to enter API key
        const apiKey = prompt('Please enter your Gemini API Key:');
        if (apiKey) {
            // Store in localStorage for future use
            localStorage.setItem('gemini_api_key', apiKey);
            return apiKey;
        }
        
        return 'YOUR_GEMINI_API_KEY_HERE';
    }

    initializeElements() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.container = document.getElementById('chatbot-container');
        this.messages = document.getElementById('chatbot-messages');
        this.inputField = document.getElementById('chatbot-input-field');
        this.sendBtn = document.getElementById('chatbot-send');
        this.minimizeBtn = document.getElementById('chatbot-minimize');
        this.closeBtn = document.getElementById('chatbot-close');
        
        // Check if all elements were found
        if (!this.toggle || !this.container || !this.messages || !this.inputField || !this.sendBtn) {
            console.error('Gemini Chatbot: Could not find required elements. Make sure the chatbot HTML is loaded.');
            return false;
        }
        
        return true;
    }

    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.minimizeBtn.addEventListener('click', () => this.minimizeChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.inputField.addEventListener('input', () => {
            this.autoResizeTextarea();
        });
    }

    initializeContext() {
        this.context = `Bạn là trợ lý AI chuyên nghiệp của VPS Siêu Tốc, một công ty cung cấp dịch vụ VPS và Cloud Server hàng đầu Việt Nam. 

Thông tin về công ty:
- Tên: VPS Siêu Tốc (SUPERFVPS)
- Công ty: DIGI GROUP
- Địa chỉ: 309 Bạch Đằng, Phường 2, Quận Bình Thạnh, TP.HCM
- Hotline: 0822 719 531

Sản phẩm chính:
1. VPS Gold:
   - VPS Gold Giá Rẻ: 50,000đ/tháng (1 CPU Core, 1GB RAM, 20GB SSD NVMe, Intel Xeon Gold 6148)
   - VPS Gold: 75,000đ/tháng (2 CPU Cores, 2GB RAM, 40GB SSD NVMe, Full Root Access)

2. VPS Platinum:
   - VPS Platinum Giá Rẻ: 70,000đ/tháng (1 CPU Core, 1GB RAM, 25GB SSD NVMe, Intel Xeon Platinum 8272CL)
   - VPS Platinum: 95,000đ/tháng (2 CPU Cores, 2GB RAM, 50GB SSD NVMe, hiệu suất cao hơn 25%)

Tính năng nổi bật:
- CPU Intel Xeon Gold 6148 và Platinum 8272CL
- SSD NVMe U.2 tốc độ cao
- Công nghệ ảo hóa KVM
- Khởi tạo tự động trong 1 phút
- Full Root Access
- Hỗ trợ 24/7
- Uptime 99.9%
- Chính sách hoàn tiền 7 ngày

Các dịch vụ khác:
- VPS GPU
- Dedicated Server
- Proxy VN-US-SIN-HK-JP
- VPS đa quốc gia

Hãy trả lời một cách thân thiện, chuyên nghiệp và hữu ích. Luôn đề xuất giải pháp phù hợp với nhu cầu của khách hàng. Trả lời bằng tiếng Việt.`;
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.container.classList.add('open');
            this.toggle.style.display = 'none';
            this.inputField.focus();
        } else {
            this.container.classList.remove('open');
            this.toggle.style.display = 'flex';
        }
    }

    minimizeChat() {
        this.isMinimized = !this.isMinimized;
        if (this.isMinimized) {
            this.container.classList.add('minimized');
        } else {
            this.container.classList.remove('minimized');
            this.inputField.focus();
        }
    }

    closeChat() {
        this.isOpen = false;
        this.container.classList.remove('open', 'minimized');
        this.toggle.style.display = 'flex';
    }

    autoResizeTextarea() {
        this.inputField.style.height = 'auto';
        this.inputField.style.height = Math.min(this.inputField.scrollHeight, 100) + 'px';
    }

    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;

        // Disable send button
        this.sendBtn.disabled = true;
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        this.inputField.value = '';
        this.autoResizeTextarea();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            const response = await this.callGeminiAPI(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ hotline 0822 719 531 để được hỗ trợ trực tiếp.', 'bot');
            console.error('Error calling Gemini API:', error);
        }
        
        // Re-enable send button
        this.sendBtn.disabled = false;
        this.inputField.focus();
    }

    async callGeminiAPI(message) {
        if (this.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
            return 'Xin chào! Để sử dụng trợ lý AI, vui lòng cấu hình API key của Google Gemini trong file chatbot.js. Trong thời gian này, bạn có thể liên hệ trực tiếp qua hotline 0822 719 531 để được hỗ trợ.';
        }

        const requestBody = {
            contents: [{
                parts: [{
                    text: `${this.context}\n\nKhách hàng hỏi: ${message}`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format from Gemini API');
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="${avatar} message-avatar"></i>
                <div class="message-text">${this.formatMessage(text)}</div>
            </div>
        `;
        
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(text) {
        // Convert markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-robot message-avatar"></i>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        this.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingMessage = this.messages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messages.scrollTop = this.messages.scrollHeight;
        }, 100);
    }
}

// Initialize chatbot when elements are available
function initializeGeminiChatbot() {
    // Check if elements exist
    const toggle = document.getElementById('chatbot-toggle');
    if (toggle) {
        new GeminiChatbot();
    } else {
        // Wait and try again
        setTimeout(initializeGeminiChatbot, 100);
    }
}

// Start initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGeminiChatbot();
});

// Also expose global initialization function
window.initializeGeminiChatbot = initializeGeminiChatbot;
