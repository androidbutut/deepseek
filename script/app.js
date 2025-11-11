class ThreeAIFrontend {
    constructor() {
        this.currentChat = [];
        this.isLoading = false;
        this.backendUrl = 'https://your-worker.your-account.workers.dev';
        
        this.initializeEventListeners();
        this.autoResizeTextarea();
    }

    initializeEventListeners() {
        // Chat controls
        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick actions
        document.querySelectorAll('.quick-action').forEach(action => {
            action.addEventListener('click', () => {
                const prompt = action.getAttribute('data-prompt');
                document.getElementById('messageInput').value = prompt;
                this.sendMessage();
            });
        });

        // Suggestion tags
        document.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const prompt = tag.getAttribute('data-prompt');
                document.getElementById('messageInput').value = prompt;
            });
        });

        // Action buttons
        document.getElementById('upload3DBtn').addEventListener('click', () => this.openUploadModal());
        document.getElementById('generateCodeBtn').addEventListener('click', () => this.generateCode());
        document.getElementById('optimizeBtn').addEventListener('click', () => this.optimizeCode());
        document.getElementById('analyzeBtn').addEventListener('click', () => this.analyzePerformance());

        // Modal controls
        document.getElementById('preview3DBtn').addEventListener('click', () => this.openPreviewModal());
        document.getElementById('closePreview').addEventListener('click', () => this.closePreviewModal());
        document.getElementById('closeUpload').addEventListener('click', () => this.closeUploadModal());

        // File upload
        document.getElementById('browseBtn').addEventListener('click', () => document.getElementById('fileInput').click());
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileSelect(e));
        document.getElementById('uploadArea').addEventListener('click', () => document.getElementById('fileInput').click());
        
        // Drag and drop
        this.setupDragAndDrop();

        // New chat
        document.getElementById('newChatBtn').addEventListener('click', () => this.startNewChat());

        // Mobile sidebar
        document.getElementById('sidebarToggle').addEventListener('click', () => this.toggleSidebar());
    }

    autoResizeTextarea() {
        const textarea = document.getElementById('messageInput');
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }

    async sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (!message || this.isLoading) return;

        this.showMessagesContainer();
        this.addMessage('user', message);
        input.value = '';
        this.resetTextareaHeight();

        this.showTypingIndicator();
        this.setLoadingState(true);

        try {
            const context = document.getElementById('contextSelect').value;
            const response = await this.callBackend('/api/chat', {
                message,
                context
            });

            this.removeTypingIndicator();
            this.addMessage('ai', response.response);
            
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage('ai', 'Sorry, I encountered an error. Please try again.');
            console.error('Error:', error);
        }

        this.setLoadingState(false);
    }

    async generateCode() {
        const input = document.getElementById('messageInput');
        const prompt = input.value.trim() || "Generate a basic Three.js scene with a rotating cube";
        
        this.showMessagesContainer();
        this.addMessage('user', `Generate code: ${prompt}`);
        input.value = '';
        this.resetTextareaHeight();

        this.showTypingIndicator();
        this.setLoadingState(true);

        try {
            const response = await this.callBackend('/api/generate-code', {
                prompt,
                type: 'threejs-scene',
                complexity: 'intermediate'
            });

            this.removeTypingIndicator();
            this.addMessage('ai', `Here's your Three.js code:\n\n\`\`\`javascript\n${response.code}\n\`\`\``);
            
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage('ai', 'Sorry, I encountered an error generating code.');
            console.error('Error:', error);
        }

        this.setLoadingState(false);
    }

    async optimizeCode() {
        const lastAIMessage = this.getLastAIMessage();
        if (!lastAIMessage) {
            this.addMessage('ai', 'Please generate some code first that I can optimize.');
            return;
        }

        this.showTypingIndicator();
        this.setLoadingState(true);

        try {
            const response = await this.callBackend('/api/optimize', {
                code: lastAIMessage,
                issue: 'performance',
                target: 'web'
            });

            this.removeTypingIndicator();
            this.addMessage('ai', `Optimized code:\n\n\`\`\`javascript\n${response.optimizedCode}\n\`\`\`\n\n**Improvements:**\n${response.explanation}`);
            
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage('ai', 'Sorry, I encountered an error optimizing the code.');
            console.error('Error:', error);
        }

        this.setLoadingState(false);
    }

    async analyzePerformance() {
        const input = document.getElementById('messageInput');
        const prompt = input.value.trim() || "Analyze Three.js performance best practices";
        
        this.showMessagesContainer();
        this.addMessage('user', `Performance analysis: ${prompt}`);
        input.value = '';
        this.resetTextareaHeight();

        this.showTypingIndicator();
        this.setLoadingState(true);

        try {
            const response = await this.callBackend('/api/chat', {
                message: `Performance analysis: ${prompt}`,
                context: 'threejs'
            });

            this.removeTypingIndicator();
            this.addMessage('ai', response.response);
            
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage('ai', 'Sorry, I encountered an error during analysis.');
            console.error('Error:', error);
        }

        this.setLoadingState(false);
    }

    async callBackend(endpoint, data) {
        const response = await fetch(`${this.backendUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    addMessage(role, content) {
        const messagesContainer = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        const avatar = role === 'user' ? 
            '<div class="message-avatar user-avatar"><i class="fas fa-user"></i></div>' :
            '<div class="message-avatar ai-avatar"><i class="fas fa-robot"></i></div>';

        const formattedContent = this.formatMessageContent(content);
        
        messageDiv.innerHTML = `
            ${avatar}
            <div class="message-content">
                ${formattedContent}
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.currentChat.push({ role, content });
    }

    formatMessageContent(content) {
        // Convert code blocks
        content = content.replace(/```javascript\n?([\s\S]*?)```/g, '<pre><code class="language-javascript">$1</code></pre>');
        content = content.replace(/```js\n?([\s\S]*?)```/g, '<pre><code class="language-javascript">$1</code></pre>');
        content = content.replace(/```html\n?([\s\S]*?)```/g, '<pre><code class="language-html">$1</code></pre>');
        content = content.replace(/```css\n?([\s\S]*?)```/g, '<pre><code class="language-css">$1</code></pre>');
        
        // Convert inline code
        content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Convert line breaks
        content = content.replace(/\n/g, '<br>');
        
        return content;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('messagesContainer');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar ai-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    showMessagesContainer() {
        document.getElementById('welcomeSection').style.display = 'none';
        document.getElementById('messagesContainer').style.display = 'block';
    }

    setLoadingState(loading) {
        this.isLoading = loading;
        const sendBtn = document.getElementById('sendBtn');
        const input = document.getElementById('messageInput');
        
        if (loading) {
            sendBtn.disabled = true;
            input.disabled = true;
        } else {
            sendBtn.disabled = false;
            input.disabled = false;
            input.focus();
        }
    }

    resetTextareaHeight() {
        const textarea = document.getElementById('messageInput');
        textarea.style.height = 'auto';
    }

    getLastAIMessage() {
        for (let i = this.currentChat.length - 1; i >= 0; i--) {
            if (this.currentChat[i].role === 'ai') {
                return this.currentChat[i].content;
            }
        }
        return null;
    }

    // Modal methods
    openUploadModal() {
        document.getElementById('uploadModal').classList.add('show');
    }

    closeUploadModal() {
        document.getElementById('uploadModal').classList.remove('show');
    }

    openPreviewModal() {
        document.getElementById('previewModal').classList.add('show');
        // Initialize Three.js preview here
    }

    closePreviewModal() {
        document.getElementById('previewModal').classList.remove('show');
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('uploadArea');
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--accent-blue)';
            uploadArea.style.backgroundColor = 'var(--bg-hover)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.backgroundColor = '';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.handleFileUpload(file);
        }
    }

    async handleFileUpload(file) {
        // Implement file upload logic here
        console.log('Uploading file:', file.name);
        // You would typically upload to your backend here
    }

    startNewChat() {
        this.currentChat = [];
        document.getElementById('messagesContainer').innerHTML = '';
        document.getElementById('welcomeSection').style.display = 'flex';
        document.getElementById('messagesContainer').style.display = 'none';
    }

    toggleSidebar() {
        document.querySelector('.sidebar').classList.toggle('open');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeAIFrontend();
});