// Terminal Management

class Terminal {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.currentPath = 'home';
        this.isMinimized = false;
        this.isMaximized = false;
        this.isDragging = false;
        this.isResizing = false;
        this.dragOffset = { x: 0, y: 0 };
        this.resizeData = { startX: 0, startY: 0, startWidth: 0, startHeight: 0, startTop: 0, startLeft: 0, handle: null };

        this.initElements();
        this.initEventListeners();
        this.initResizeHandles();
    }

    initElements() {
        this.overlay = document.getElementById('terminal-overlay');
        this.bgPenguin = document.getElementById('terminal-bg-penguin');
        this.output = document.querySelector('.terminal-output');
        this.input = document.getElementById('terminal-input');
        this.pathDisplay = document.querySelector('.terminal-input-path');
        this.titlebar = document.querySelector('.terminal-titlebar');
        this.minimizedIcon = document.getElementById('terminal-minimized-icon');
        this.container = document.getElementById('terminal-container');
    }

    initResizeHandles() {
        const container = document.getElementById('terminal-container');
        const handles = container?.querySelectorAll('.resize-handle') || [];
        handles.forEach(handle => {
            handle.addEventListener('mousedown', (e) => this.startResize(e, handle));
            handle.addEventListener('touchstart', (e) => this.startResize(e.touches[0], handle));
        });

        document.addEventListener('mousemove', (e) => this.resize(e));
        document.addEventListener('mouseup', () => this.endResize());
        document.addEventListener('touchmove', (e) => this.resize(e.touches[0]));
        document.addEventListener('touchend', () => this.endResize());
    }

    initEventListeners() {
        // Input handling
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Elastic Draggable logic
        this.dragX = 0;
        this.dragY = 0;
        this.startX = 0;
        this.startY = 0;
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.titlebar.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());

        // Touch support
        this.titlebar.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        document.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
        document.addEventListener('touchend', () => this.endDrag());
    }

    show() {
        this.overlay.style.display = 'block';
        this.overlay.style.opacity = '1';
        this.input.focus();
    }

    close() {
        // Closed by user is disabled
        this.overlay.style.display = 'none';
    }

    startDrag(e) {
        // Prevent dragging if interacting with buttons
        if (e.target.closest('.terminal-controls')) return;

        this.isDragging = true;
        this.startX = e.clientX - this.dragX;
        this.startY = e.clientY - this.dragY;
        this.overlay.style.transition = 'none';
        this.overlay.classList.add('dragging');
    }

    drag(e) {
        if (!this.isDragging) return;
        this.dragX = e.clientX - this.startX;
        this.dragY = e.clientY - this.startY;
        this.overlay.style.transform = `translate(${this.dragX}px, ${this.dragY}px)`;
    }

    endDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.overlay.classList.remove('dragging');

        // Elastic spring back to its CSS position
        this.overlay.style.transition = this.reducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        this.overlay.style.transform = 'translate(0, 0)';
        this.dragX = 0;
        this.dragY = 0;
    }

    // Methods disabled as per user request
    minimize() { }
    maximize() { }
    restore() { }

    startResize(e, handle) {
        e.preventDefault();
        e.stopPropagation();

        this.isResizing = true;
        this.overlay.classList.add('resizing');

        const rect = this.overlay.getBoundingClientRect();

        this.resizeData = {
            startX: e.clientX,
            startY: e.clientY,
            startWidth: rect.width,
            startHeight: rect.height,
            startTop: rect.top,
            startLeft: rect.left,
            handle: handle.className.replace('resize-handle ', '')
        };
    }

    resize(e) {
        if (!this.isResizing) return;

        e.preventDefault();

        const deltaX = e.clientX - this.resizeData.startX;
        const deltaY = e.clientY - this.resizeData.startY;
        const handle = this.resizeData.handle;

        let newWidth = this.resizeData.startWidth;
        let newHeight = this.resizeData.startHeight;
        let newTop = this.resizeData.startTop;
        let newLeft = this.resizeData.startLeft;

        // Handle horizontal resizing
        if (handle.includes('right')) {
            newWidth = Math.max(400, this.resizeData.startWidth + deltaX);
        } else if (handle.includes('left')) {
            newWidth = Math.max(400, this.resizeData.startWidth - deltaX);
            if (newWidth > 400) {
                newLeft = this.resizeData.startLeft + deltaX;
            }
        }

        // Handle vertical resizing
        if (handle.includes('bottom')) {
            newHeight = Math.max(300, this.resizeData.startHeight + deltaY);
        } else if (handle.includes('top')) {
            newHeight = Math.max(300, this.resizeData.startHeight - deltaY);
            if (newHeight > 300) {
                newTop = this.resizeData.startTop + deltaY;
            }
        }

        // Constrain to viewport
        const maxWidth = window.innerWidth - 40; // 40px total margin
        const maxHeight = window.innerHeight - 40;

        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);

        // Ensure terminal doesn't go beyond viewport edges
        newTop = Math.max(20, Math.min(newTop, window.innerHeight - newHeight - 20));
        newLeft = Math.max(20, Math.min(newLeft, window.innerWidth - newWidth - 20));

        // Apply new dimensions
        this.overlay.style.width = `${newWidth}px`;
        this.overlay.style.height = `${newHeight}px`;
        this.overlay.style.top = `${newTop}px`;
        this.overlay.style.left = `${newLeft}px`;
        this.overlay.style.bottom = 'auto';
        this.overlay.style.right = 'auto';
    }

    endResize() {
        if (!this.isResizing) return;

        this.isResizing = false;
        this.overlay.classList.remove('resizing');
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory(1);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // TODO: Implement autocomplete
        }
    }

    executeCommand() {
        const input = this.input.value.trim();
        if (!input) return;

        // Add to history
        this.history.push(input);
        this.historyIndex = this.history.length;

        // Display command
        this.addLine(`
      <div class="terminal-prompt-line">
        <span class="terminal-prompt-symbol">❯</span>
        <span class="terminal-prompt-path">~/${this.currentPath}</span>
        <span class="terminal-command">${this.escapeHtml(input)}</span>
      </div>
    `);

        // Execute command
        const output = executeCommand(input);
        if (output !== null) {
            this.addLine(`<div class="terminal-output-text">${output}</div>`);
        }

        // Clear input
        this.input.value = '';

        // Scroll to bottom
        this.scrollToBottom();
    }

    navigateHistory(direction) {
        const newIndex = this.historyIndex + direction;

        if (newIndex >= 0 && newIndex < this.history.length) {
            this.historyIndex = newIndex;
            this.input.value = this.history[this.historyIndex];
        } else if (newIndex === this.history.length) {
            this.historyIndex = newIndex;
            this.input.value = '';
        }
    }

    addLine(html) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = html;
        this.output.appendChild(line);
    }

    scrollToBottom() {
        const content = document.querySelector('.terminal-content');
        content.scrollTop = content.scrollHeight;
    }

    showWelcomeMessage() {
        this.addLine(`
      <div class="terminal-welcome">
        <div class="terminal-welcome-title">Welcome to Portfolio Terminal</div>
        <div>Type <span class="terminal-success">help</span> to see available commands.</div>
        <div>Type <span class="terminal-success">about</span> to learn more about me.</div>
      </div>
    `);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize terminal when DOM is ready
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    // Boot screen logic
    const bootScreen = document.getElementById('boot-screen');
    const bootInput = document.getElementById('boot-input');
    const terminalContainer = document.getElementById('terminal-container');

    // Handle boot input
    bootInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = bootInput.value.trim().toLowerCase();

            if (command === 'start') {
                // Boot the terminal
                bootTerminal();
            } else {
                // Show error if not 'start'
                const inputLine = bootInput.closest('.boot-input-line');
                if (inputLine) {
                    inputLine.classList.remove('shake');
                    void inputLine.offsetWidth; // Trigger reflow
                    inputLine.classList.add('shake');

                    // Remove shake class after animation
                    setTimeout(() => {
                        inputLine.classList.remove('shake');
                    }, 500);
                }

                bootInput.value = '';
                bootInput.placeholder = "Invalid command. Type 'start' to boot.";
                setTimeout(() => {
                    bootInput.placeholder = '';
                }, 2000);
            }
        }
    });

    function bootTerminal() {
        // Add fade-out animation to boot screen
        bootScreen.style.transition = 'opacity 0.5s ease-out';
        bootScreen.style.opacity = '0';

        setTimeout(() => {
            // Hide boot screen and show terminal
            bootScreen.classList.add('hidden');
            terminalContainer.style.display = 'block';
            terminalContainer.classList.add('show');

            const bgPenguin = document.getElementById('terminal-bg-penguin');
            if (bgPenguin) {
                bgPenguin.classList.add('show');
            }

            // Fade in terminal
            terminalContainer.style.opacity = '0';
            terminalContainer.style.transition = 'opacity 0.5s ease-in';

            setTimeout(() => {
                terminalContainer.style.opacity = '1';

                // Initialize terminal
                terminal = new Terminal();

                // Update terminal title
                const titleElement = terminalContainer.querySelector('.terminal-title');
                if (titleElement) {
                    titleElement.textContent = 'mahesh@portfolio';
                }

                terminal.showWelcomeMessage();
                terminal.input.focus();
            }, 50);
        }, 500);
    }
});

// ASCII Portrait Swap Effect (removed old inversion effect to prevent conflicts)
document.addEventListener('DOMContentLoaded', function () {
    const asciiPortrait = document.querySelector('.ascii-portrait');

    if (asciiPortrait) {
        const defaultPortrait = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣤⣤⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⢿⣿⣿⣿⣿⡟⣛⠛⡿⢻⢟⠿⣫⠟⣏⢏⡳⣉⠖⣠⠻⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠘⣾⣿⣿⣿⠋⡐⠠⣉⠒⡍⢎⡱⢡⢋⡜⢢⠕⣊⠞⣡⠓⡼⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢻⣿⣿⠏⠁⠀⠐⠀⠡⠘⡀⢣⠑⡊⢌⠡⠊⠔⡈⢆⡹⠜⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠸⣿⢏⢀⣠⣶⣦⣧⣴⣤⣴⡄⣂⢁⢦⣴⣥⣾⣵⣶⣦⣙⠶⣹⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢿⠀⠿⠛⢉⣩⣭⣛⣟⣻⠓⣬⢋⣾⣛⣿⣫⣭⣉⡉⠛⢟⠦⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⡄⠹⢿⠀⠀⣼⢿⣺⣿⣿⣻⣿⠓⠠⠟⣾⣿⣟⣿⣿⣿⡿⢷⡞⡒⡿⢄⣰⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠸⠏⢀⡘⠐⠀⠀⠠⠭⢹⢋⠧⠋⠀⡀⡄⠘⣯⢛⢮⡭⢭⠄⠘⢀⠣⢹⣎⢌⢾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢰⣻⠣⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠁⠀⠈⠱⠌⠘⠈⠀⠀⠀⠉⠸⢻⡞⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⡴⢷⣴⠀⠀⠀⠀⠀⢠⢱⠂⠀⡀⢀⢠⢀⡀⠘⡆⡄⠀⠀⠀⠀⢀⢒⡶⢛⡍⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⣠⠎⡀⠀⠀⠀⡌⢢⠌⠈⣘⢟⣦⣻⣽⣇⠃⠘⡱⢖⡀⠀⠀⠀⡎⢆⠨⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⠈⠴⠇⠀⠀⠐⢠⣧⡖⣎⠤⣭⢞⣣⣭⣌⣀⣠⣷⡆⠁⢠⠞⣀⡗⠀⡴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⡆⠀⠀⠸⡿⢏⠹⢉⡉⣉⢉⣉⢏⠉⣹⡿⣿⠀⡸⢆⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠑⠀⠀⢁⠣⠀⠠⠌⡱⣋⣏⡏⠞⠁⠉⠚⢡⢻⡑⣺⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠁⡄⠀⠀⡀⠀⠀⠀⠃⠁⠐⠀⠀⠀⣀⢞⡧⢜⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠡⡁⠔⡨⢓⡜⢪⠄⣄⡜⣎⢡⡰⣏⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⡐⢌⠒⡥⢓⡬⢣⣛⡼⣸⢥⡓⠧⡜⣂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣴⡧⠀⠀⠀⠂⠉⡜⣣⢟⣣⢛⡴⡍⠶⣉⠳⣌⢭⡷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⣿⡀⠄⡠⠀⠠⠐⡥⢪⠔⡫⣔⠩⢖⡩⢖⣼⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⢻⣶⠱⣠⢁⠣⢌⠣⡭⣑⠮⣙⢦⣙⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠙⢷⣚⣬⢳⡡⣏⣾⠟⠁⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢠⣦⠉⠛⠳⢿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠐⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡀⠔⡻⢷⣝⣧⣶⣤⣀⡐⠲⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠻⢿⣆⡠⠚⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢦⡀⡉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⢂⡴⣥⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢁⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡿⠃⢠⣶⡥⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠊⠀⣴⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠟⠁⣠⣾⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠`;

        // Initialize content
        asciiPortrait.textContent = defaultPortrait;

        const hoverPortrait = `⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠛⠛⠛⠛⠛⠛⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣷⡀⠀⠀⠀⠀⢠⠤⣤⢀⡄⡠⣀⠔⣠⠰⡰⢌⠶⣩⠟⣄⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣧⠁⠀⠀⠀⣴⢯⣟⠶⣭⢲⡱⢎⡞⡴⢣⡝⣪⠵⣡⠞⣬⢃⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡄⠀⠀⣰⣾⣿⣯⣿⣞⣧⢿⡜⣮⢵⡳⣞⣵⣫⢷⡹⢆⣣⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣇⠀⡰⡿⠟⠉⠙⠘⠋⠛⠋⢻⠽⡾⡙⠋⠚⠁⠊⠉⠙⠦⣉⠆⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡀⣿⣀⣤⡶⠖⠒⠤⠠⠄⣬⠓⡴⠁⠤⠀⠔⠒⠶⢶⣤⡠⣙⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⢻⣆⡀⣿⣿⠃⡀⠅⠀⠀⠄⠀⣬⣟⣠⠁⠀⠠⠀⠀⠀⢀⡈⢡⢭⢀⡻⠏⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣇⣰⡿⢧⣯⣿⣿⣟⣒⡆⡴⣘⣴⣿⢿⢻⣧⠐⡤⡑⢒⡒⣻⣧⡿⣜⡆⠱⡳⡁⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⡏⠄⣜⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣾⣿⣷⣎⣳⣧⣷⣿⣿⣿⣶⣇⡄⢡⢡⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⢋⡈⠋⣿⣿⣿⣿⣿⡟⡎⣽⣿⢿⡿⡟⡿⢿⣧⢹⢻⣿⣿⣿⣿⡿⡭⢉⡤⢲⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣷⠟⣱⢿⣿⣿⣿⢳⡝⣳⣷⠧⡠⠙⠄⠂⠸⣼⣧⢎⡩⢿⣿⣿⣿⢱⡹⣗⢽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣷⣷⣋⣸⣿⣿⣯⡟⠘⢩⠱⣛⠒⡡⠜⠒⠳⠿⠟⠈⢹⣾⡟⣡⠿⢨⣿⢋⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣷⢹⣿⣿⣇⢀⡰⣆⡶⢶⠶⡶⠶⡰⣶⠆⢀⠀⣿⢇⡹⢁⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣮⣿⣿⡾⣜⣿⣟⣳⢎⠴⠰⢰⣡⣾⣶⣥⡞⡄⢮⠅⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣾⢻⣿⣿⢿⣿⣿⣿⣼⣾⣯⣿⣿⣿⠿⡡⢘⡣⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣞⢾⣫⢗⡬⢣⡕⣻⠻⢣⠱⡞⢏⠰⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⢯⡳⣭⢚⡬⢓⡜⠤⢃⠇⡚⢬⣘⢣⠽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠋⢘⣿⣿⣿⣽⣶⢣⠜⡠⠜⡤⢋⢲⣉⠶⣌⠳⡒⢈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣦⠀⢿⣻⢟⣿⣟⣯⢚⡕⣫⢔⠫⣖⡩⢖⡩⠃⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣷⡄⠉⣎⠟⡾⣜⡳⣜⢒⠮⣑⠦⡙⠦⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⢩⠜⣱⠳⣌⠏⡶⣉⠖⠉⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣦⡈⠥⠓⡌⢞⠰⠁⣠⣾⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⡟⠙⣶⣤⣌⡀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣯⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⢿⣫⢄⡈⠢⠘⠉⠛⠿⢯⣍⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣄⡀⠹⢟⣥⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⡙⢿⢶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⡽⢋⠚⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡾⠁⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⢀⣼⡟⠉⢚⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣵⣿⠋⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⣠⣾⠟⠁⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟`;

        asciiPortrait.addEventListener('mouseenter', function () {
            asciiPortrait.textContent = hoverPortrait;
        });

        asciiPortrait.addEventListener('mouseleave', function () {
            asciiPortrait.textContent = defaultPortrait;
        });
    }


});
