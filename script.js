/* =========================================
   APP CONTROLLER - INITIALIZE ALL SYSTEMS
   Wraps logic to ensure DOM is ready
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize All Systems
    console.log('🚀 Initializing Full Stack Portfolio...');

    // 1. Particle Background Animation
    const particleSystem = new ParticleNetwork('particleCanvas');
    particleSystem.init();

    // 2. Theme CSS Variable Editor
    const themeEditor = new ThemeEditor();
    themeEditor.init();

    // 3. Role Toggle & Task Manager
    const appManager = new AppManager();
    window.appManager = appManager;
    appManager.init();

    // 4. Financial Calculator
    const calculator = new LoanCalculator();
    calculator.init();

    // 5. Array Methods Demo (NEW)
    const arrayDemo = new ArrayDemo();
    arrayDemo.init();

    // 6. Typewriter Effect in Hero
    initTypewriter();

    // 7. Initialize remaining components
    const scrollObserver = new ScrollObserver();
    scrollObserver.init();

    const apiFetcher = new APIDataFetcher();
    apiFetcher.init();

    const kanban = new KanbanBoard();
    kanban.init();

    const chart = new CanvasChart();
    chart.init();
    
    // 11. Custom Cursor (Premium feel)
    const cursor = new CustomCursor();
    cursor.init();

    // 12. Scroll Progress Bar
    const scrollProgress = new ScrollProgress();
    scrollProgress.init();

    // 13. Live HTML Editor
    const htmlEditor = new LiveHTMLEditor();
    htmlEditor.init();

    console.log('✓ All systems initialized successfully!');
});

/* =========================================
   NEW: PREMIUM JS UI EFFECTS
   ========================================= */

class LiveHTMLEditor {
    init() {
        const input = document.getElementById('htmlEditorInput');
        const output = document.getElementById('htmlEditorOutput');
        if (!input || !output) return;

        const updateHTML = () => {
            output.innerHTML = input.value;
        };
        
        input.addEventListener('input', updateHTML);
        updateHTML(); // Initial render
    }
}

class ScrollProgress {
    init() {
        const bar = document.createElement('div');
        bar.id = 'scrollProgressBar';
        document.body.appendChild(bar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            bar.style.width = scrolled + '%';
        });
    }
}

class CustomCursor {
    init() {
        // Don't show custom cursor on mobile touch devices
        if (window.matchMedia("(max-width: 768px)").matches) return;

        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            // Using transform for 60fps hardware acceleration
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        });

        // Add hovering effect to interactive elements
        const iteractives = document.querySelectorAll('a, button, .arch-node, .kanban-item, input');
        iteractives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }
}

/* =========================================
   6. ARRAY METHODS & FILTERING DEMO
   Demonstrates modern JavaScript array methods
   ========================================= */
class ArrayDemo {
    constructor() {
        this.originalData = [15, 32, 48, 56, 72, 88, 95, 12, 45, 78];
        this.originalDisplay = document.getElementById('originalArray');
        this.resultDisplay = document.getElementById('filteredResult');
        
        this.filterBtn = document.getElementById('filterBtn');
        this.doubleBtn = document.getElementById('doubleBtn');
        this.sumBtn = document.getElementById('sumBtn');
        this.sortBtn = document.getElementById('sortBtn');
    }

    init() {
        // Display original array
        if (this.originalDisplay) {
            this.originalDisplay.innerHTML = `[${this.originalData.join(', ')}]`;
        }

        // Attach event listeners
        if (this.filterBtn) this.filterBtn.addEventListener('click', () => this.filter());
        if (this.doubleBtn) this.doubleBtn.addEventListener('click', () => this.double());
        if (this.sumBtn) this.sumBtn.addEventListener('click', () => this.sum());
        if (this.sortBtn) this.sortBtn.addEventListener('click', () => this.sort());
    }

    filter() {
        // Use array.filter() method
        const filtered = this.originalData.filter(num => num > 50);
        this.displayResult(`Filtered (>50): [${filtered.join(', ')}]`);
    }

    double() {
        // Use array.map() method
        const doubled = this.originalData.map(num => num * 2);
        this.displayResult(`Doubled: [${doubled.join(', ')}]`);
    }

    sum() {
        // Use array.reduce() method
        const total = this.originalData.reduce((acc, num) => acc + num, 0);
        this.displayResult(`Sum: ${total}`);
    }

    sort() {
        // Use array.sort() method
        const sorted = [...this.originalData].sort((a, b) => a - b);
        this.displayResult(`Sorted: [${sorted.join(', ')}]`);
    }

    displayResult(text) {
        if (this.resultDisplay) {
            this.resultDisplay.innerHTML = text;
        }
    }
}

/* =========================================
   1. PARTICLE BACKGROUND SYSTEM
   Creates a network of connecting dots
   ========================================= */
class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 80;
        this.connectionDistance = 120;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initParticles();
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            this.ctx.fill();

            // Draw connections
            for (let j = index + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                
                if (dist < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(13, 110, 253, ${1 - dist/this.connectionDistance})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }

    init() {
        this.animate();
    }
}

/* =========================================
   2. THEME EDITOR (CSS Variables)
   ========================================= */
class ThemeEditor {
    constructor() {
        this.colorRange = document.getElementById('colorRange');
        this.radiusRange = document.getElementById('radiusRange');
        this.box = document.getElementById('dynamicBox');
        this.root = document.documentElement;
    }

    init() {
        if (!this.colorRange || !this.box) return;

        this.colorRange.addEventListener('input', (e) => {
            const hue = e.target.value;
            this.root.style.setProperty('--primary-hue', hue);
        });

        this.radiusRange.addEventListener('input', (e) => {
            const radius = e.target.value + 'px';
            this.box.style.borderRadius = radius;
        });
    }
}

/* =========================================
   3. MAIN APPLICATION LOGIC
   Handles Role Toggle, Task Manager, Form Validation
   ========================================= */
class AppManager {
    constructor() {
        this.roleBtn = document.getElementById('roleBtn');
        this.roleIcon = document.getElementById('roleIcon');
        this.roleTitle = document.getElementById('roleTitle');
        this.roleDesc = document.getElementById('roleDesc');
        this.isFrontend = true;

        // Task Elements
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
        this.taskCount = document.getElementById('taskCount');
        this.tasks = [];

        // Form Elements
        this.contactForm = document.getElementById('contactForm');
    }

    init() {
        this.initRoleToggle();
        this.initTaskManager();
        this.initFormValidation();
    }

    // --- Role Toggle Logic ---
    initRoleToggle() {
        if(!this.roleBtn) return;
        
        this.roleBtn.addEventListener('click', () => {
            this.isFrontend = !this.isFrontend;
            this.updateRoleUI();
        });
    }

    updateRoleUI() {
        // Icon Animation
        this.roleIcon.classList.add('rotate-icon');
        setTimeout(() => this.roleIcon.classList.remove('rotate-icon'), 500);

        if (this.isFrontend) {
            this.roleIcon.innerHTML = '<i class="fas fa-paint-brush"></i>';
            this.roleTitle.innerText = 'Frontend';
            this.roleTitle.className = 'fw-bold text-primary';
            this.roleDesc.innerText = "Focuses on what the user sees. Handles UI/UX, HTML structure, CSS styling, and basic interactions.";
            this.roleBtn.innerText = "Switch to Backend View";
        } else {
            this.roleIcon.innerHTML = '<i class="fas fa-server"></i>';
            this.roleTitle.innerText = 'Backend';
            this.roleTitle.className = 'fw-bold text-success';
            this.roleDesc.innerText = "Handles the server, application logic, and database interactions. Ensures security, performance, and API connectivity.";
            this.roleBtn.innerText = "Switch to Frontend View";
        }
    }

    // --- Task Manager Logic ---
    initTaskManager() {
        if(!this.addTaskBtn) return;

        const addTask = () => {
            const text = this.taskInput.value.trim();
            if (!text) return;

            this.tasks.push({ id: Date.now(), text, completed: false });
            this.renderTasks();
            this.taskInput.value = '';
            this.showToast('Task added successfully');
        };

        this.addTaskBtn.addEventListener('click', addTask);
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        this.taskCount.innerText = `${this.tasks.length} Task${this.tasks.length !== 1 ? 's' : ''}`;

        if (this.tasks.length === 0) {
            this.taskList.innerHTML = '<li class="list-group-item bg-transparent text-secondary text-center fst-italic py-4">No tasks yet...</li>';
            return;
        }

        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `list-group-item bg-transparent border-secondary d-flex justify-content-between align-items-center ${task.completed ? 'text-muted text-decoration-line-through' : 'text-white'}`;
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="btn btn-sm btn-outline-success me-2" onclick="appManager.toggleTask(${task.id})"><i class="fas fa-check"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="appManager.deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
                </div>
            `;
            this.taskList.appendChild(li);
        });
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.renderTasks();
        this.showToast('Task deleted');
    }

    // --- Form Validation Logic ---
    initFormValidation() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                event.stopPropagation();

                if (this.contactForm.checkValidity()) {
                    this.showToast('Form validated successfully! (Simulated Submit)', 'success');
                    this.contactForm.reset();
                    this.contactForm.classList.remove('was-validated');
                } else {
                    this.contactForm.classList.add('was-validated');
                    // Add shake animation to the form
                    this.contactForm.style.animation = 'shake 0.5s';
                    setTimeout(() => this.contactForm.style.animation = '', 500);
                }
            }, false);
        }

        // HTML Form Validation Demo
        const htmlFormDemo = document.getElementById('htmlFormDemo');
        if (htmlFormDemo) {
            htmlFormDemo.addEventListener('submit', (e) => {
                e.preventDefault();
                if (htmlFormDemo.checkValidity() === false) {
                    e.stopPropagation();
                    htmlFormDemo.classList.add('was-validated');
                } else {
                    this.showToast('HTML Form validated successfully!', 'success');
                    htmlFormDemo.classList.remove('was-validated');
                    htmlFormDemo.reset();
                }
            });
        }
    }

    showToast(message, type = 'info') {
        const toastEl = document.getElementById('liveToast');
        if (!toastEl) return;
        const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
        const toastBody = document.getElementById('toastMessage');
        const toastHeader = toastEl.querySelector('.toast-header');
        
        if (toastHeader) {
            if (type === 'success') {
                toastHeader.classList.remove('bg-dark');
                toastHeader.classList.add('bg-success');
            } else {
                toastHeader.classList.remove('bg-success');
                toastHeader.classList.add('bg-dark');
            }
        }
        
        toastBody.innerText = message;
        toast.show();
    }
}

/* =========================================
   4. LOAN CALCULATOR LOGIC
   ========================================= */
class LoanCalculator {
    constructor() {
        this.amountInput = document.getElementById('loanAmount');
        this.rateInput = document.getElementById('interestRate');
        this.yearsInput = document.getElementById('loanYears');
        this.calcBtn = document.getElementById('calcBtn');
        this.monthDisplay = document.getElementById('monthlyPayment');
        this.totalDisplay = document.getElementById('totalPayment');
        this.interestDisplay = document.getElementById('totalInterest');
    }

    init() {
        if(!this.calcBtn) return;
        this.calcBtn.addEventListener('click', () => this.calculate());
    }

    calculate() {
        const principal = parseFloat(this.amountInput.value);
        const calculatedInterest = parseFloat(this.rateInput.value) / 100 / 12;
        const calculatedPayments = parseFloat(this.yearsInput.value) * 12;

        // Compute monthly payment
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        if(isFinite(monthly)) {
            this.monthDisplay.innerText = '$' + monthly.toFixed(2);
            this.totalDisplay.innerText = '$' + (monthly * calculatedPayments).toFixed(2);
            this.interestDisplay.innerText = '$' + ((monthly * calculatedPayments) - principal).toFixed(2);
        } else {
            this.monthDisplay.innerText = 'Error';
        }
    }
}

/* =========================================
   5. UTILITIES
   ========================================= */

// Typewriter Effect
function initTypewriter() {
    const el = document.getElementById('typewriter');
    const words = ["Modern Web", "Full Stack", "User Experience"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            el.innerText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.innerText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Architecture Interaction
function highlightNode(type) {
    const desc = document.getElementById('arch-desc');
    const nodes = document.querySelectorAll('.arch-node');
    
    // Reset
    nodes.forEach(n => n.classList.remove('active'));

    // Set Active
    if(type === 'client') {
        nodes[0].classList.add('active');
        desc.innerText = "The Client (Browser) renders HTML/CSS and executes JavaScript to interact with the user.";
    } else if (type === 'server') {
        nodes[1].classList.add('active');
        desc.innerText = "The Server receives requests, processes business logic, authenticates users, and queries the database.";
    } else if (type === 'db') {
        nodes[2].classList.add('active');
        desc.innerText = "The Database stores persistent data (User profiles, posts, inventory) securely.";
    }
}

/* =========================================
   6. API DATA FETCHER (async/await)
   Demonstrates consuming data from a REST API
   ========================================= */
class APIDataFetcher {
    constructor() {
        // Cache DOM elements
        this.fetchBtn = document.getElementById('fetchUsersBtn');
        this.container = document.getElementById('userCardsContainer');
        this.spinner = document.getElementById('apiLoadingSpinner');
        
        // API endpoint (public API for demo)
        this.apiUrl = 'https://jsonplaceholder.typicode.com/users';
        this.users = [];
    }

    /**
     * Initialize the API fetcher
     * Attaches event listeners to the fetch button
     */
    init() {
        // Only initialize if elements exist
        if (!this.fetchBtn) return;

        // Add click event to fetch button
        this.fetchBtn.addEventListener('click', () => this.fetchUsers());
    }

    /**
     * Main function: Fetch users from API using modern async/await syntax
     * This demonstrates Full Stack integration: Frontend consuming Backend API data
     */
    async fetchUsers() {
        try {
            // Show loading spinner
            this.showLoading(true);

            // Modern approach: async/await (cleaner than .then() chains)
            // FETCH is the modern JavaScript API for HTTP requests
            const response = await fetch(this.apiUrl);

            // Check if response is ok (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            // Parse JSON response body
            const data = await response.json();

            // Limit to first 6 users for cleaner display
            this.users = data.slice(0, 6);

            // Render the user cards
            this.renderUserCards();

        } catch (error) {
            // Handle errors gracefully
            console.error('Error fetching users:', error);
            this.container.innerHTML = `
                <div class="col-12 text-center text-danger py-5">
                    <i class="fas fa-exclamation-circle fa-2x mb-3"></i>
                    <p>Error loading users. ${error.message}</p>
                </div>
            `;
        } finally {
            // Always hide loading spinner, whether success or error
            this.showLoading(false);
        }
    }

    /**
     * Render user cards in a responsive grid
     * Each card displays user info in an attractive glassmorphic style
     */
    renderUserCards() {
        // Clear container
        this.container.innerHTML = '';

        // Create a card for each user
        this.users.forEach(user => {
            // Extract first letter for avatar
            const avatarLetter = user.name.charAt(0).toUpperCase();
            
            // Build HTML card structure
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
                <div class="user-card">
                    <!-- User Avatar with Initial -->
                    <div class="user-avatar">
                        ${avatarLetter}
                    </div>
                    
                    <!-- User Information -->
                    <h6 class="user-name">${user.name}</h6>
                    <p class="user-email" title="${user.email}">${user.email}</p>
                    <p class="user-city">
                        <i class="fas fa-map-marker-alt me-1"></i>${user.address?.city || 'N/A'}
                    </p>
                    
                    <!-- Optional: Company info -->
                    <small class="text-info d-block mt-2">
                        ${user.company?.name || 'Freelance'}
                    </small>
                </div>
            `;
            
            // Add card to container
            this.container.appendChild(card);
        });
    }

    /**
     * Toggle loading spinner visibility
     * @param {boolean} show - Whether to show or hide the spinner
     */
    showLoading(show) {
        if (show) {
            this.spinner.style.display = 'block';
        } else {
            this.spinner.style.display = 'none';
        }
    }
}

/* =========================================
   7. KANBAN BOARD WITH DRAG & DROP
   Demonstrates HTML5 Drag and Drop API + State Management
   ========================================= */
class KanbanBoard {
    constructor() {
        // Cache all draggable items and drop zones
        this.items = document.querySelectorAll('.kanban-item');
        this.dropZones = document.querySelectorAll('.kanban-items');
        
        // Track which item is being dragged
        this.draggedItem = null;
    }

    /**
     * Initialize all event listeners for drag and drop
     * HTML5 Drag and Drop requires multiple events to work properly
     */
    init() {
        // Only initialize if elements exist
        if (this.items.length === 0) return;

        // Attach drag listeners to all items
        this.items.forEach(item => {
            // Event 1: dragstart - fires when user starts dragging
            item.addEventListener('dragstart', (e) => this.handleDragStart(e));
            
            // Event 2: dragend - fires when drag operation ends
            item.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });

        // Attach drop listeners to all drop zones
        this.dropZones.forEach(zone => {
            // Event 3: dragover - fires when dragged item moves over drop zone
            // IMPORTANT: Must call preventDefault() to allow drop!
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            
            // Event 4: dragleave - fires when dragged item leaves drop zone
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            
            // Event 5: drop - fires when item is dropped on zone
            zone.addEventListener('drop', (e) => this.handleDrop(e));
        });
    }

    /**
     * Handle dragstart event
     * Save reference to dragged item and update UI
     */
    handleDragStart(e) {
        // Store the item being dragged
        this.draggedItem = e.target;
        
        // Add visual feedback
        e.target.classList.add('dragging');
        
        // Set drag image data (helps with visual feedback)
        e.dataTransfer.effectAllowed = 'move';
        
        console.log('🎯 Dragging:', e.target.innerText);
    }

    /**
     * Handle dragend event
     * Clean up dragging styles and state
     */
    handleDragEnd(e) {
        // Remove dragging class from all items
        this.items.forEach(item => item.classList.remove('dragging'));
        
        // Remove drag-over class from all zones
        this.dropZones.forEach(zone => zone.classList.remove('drag-over'));
        
        // Clear dragged item reference
        this.draggedItem = null;
    }

    /**
     * Handle dragover event
     * Provide visual feedback and allow drop
     */
    handleDragOver(e) {
        // CRITICAL: preventDefault() makes this a valid drop target!
        e.preventDefault();
        
        // Specify allowed drop effect
        e.dataTransfer.dropEffect = 'move';
        
        // Add visual feedback to drop zone
        e.currentTarget.classList.add('drag-over');
    }

    /**
     * Handle dragleave event
     * Remove visual feedback when item leaves drop zone
     */
    handleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }

    /**
     * Handle drop event
     * Move the item to the new column and update state
     */
    handleDrop(e) {
        // Prevent default browser behavior (open as link, etc)
        e.preventDefault();
        
        const dropZone = e.currentTarget;
        
        // Only drop if we have a dragged item
        if (this.draggedItem && dropZone.contains(this.draggedItem) === false) {
            // Move the item to new column
            dropZone.appendChild(this.draggedItem);
            
            // Get the column status for console log
            const columnStatus = dropZone.parentElement.dataset.dropZone;
            const itemText = this.draggedItem.innerText;
            
            console.log(`✅ Moved: "${itemText}" to "${columnStatus.toUpperCase()}" column`);
            
            // Show toast notification
            if (window.appManager) {
                window.appManager.showToast(`Task moved to ${columnStatus.toUpperCase()}!`);
            }
        }
        
        // Remove drag-over class
        dropZone.classList.remove('drag-over');
    }
}

/* =========================================
   8. CANVAS CHART VISUALIZATION (Raw Drawing)
   Demonstrates HTML5 Canvas API without libraries like Chart.js
   ========================================= */
class CanvasChart {
    constructor() {
        // Get canvas element
        this.canvas = document.getElementById('chartCanvas');
        
        if (!this.canvas) return; // Exit if canvas doesn't exist
        
        // Get 2D drawing context
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas resolution to match display size (prevents blurring)
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Sample data for the chart
        this.data = [
            { label: 'HTML', value: 85 },
            { label: 'CSS', value: 78 },
            { label: 'JS', value: 92 },
            { label: 'React', value: 88 },
            { label: 'Canvas', value: 75 }
        ];
        
        // Animation properties
        this.animationProgress = 0; // 0 to 1
        this.animationDuration = 1500; // milliseconds
        this.startTime = null;
    }

    /**
     * Initialize chart animation on page load
     */
    init() {
        if (!this.canvas) return;
        
        // Start animation loop
        this.startTime = Date.now();
        this.animate();
    }

    /**
     * Animate the chart bars growing from 0 to full height
     * Uses requestAnimationFrame for smooth 60fps animation
     */
    animate() {
        // Calculate elapsed time
        const elapsed = Date.now() - this.startTime;
        
        // Calculate animation progress (0 to 1)
        this.animationProgress = Math.min(elapsed / this.animationDuration, 1);
        
        // Redraw chart with current animation state
        this.draw();
        
        // Continue animation if not finished
        if (this.animationProgress < 1) {
            requestAnimationFrame(() => this.animate());
        }
    }

    /**
     * Draw the complete chart on canvas
     * This is where all the math and drawing happens
     */
    draw() {
        const padding = 40;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        // Clear canvas with semi-transparent background
        this.ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
        this.ctx.fillRect(0, 0, width, height);

        // Calculate bar dimensions
        const barWidth = chartWidth / (this.data.length * 1.5);
        const barSpacing = chartWidth / this.data.length;
        
        // Find max value for scaling
        const maxValue = Math.max(...this.data.map(d => d.value));
        
        // Draw Y-axis label
        this.ctx.fillStyle = '#94a3b8';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'right';
        this.ctx.fillText('100', padding - 5, padding + 10);
        this.ctx.fillText('50', padding - 5, padding + chartHeight / 2 + 10);
        this.ctx.fillText('0', padding - 5, padding + chartHeight + 10);

        // Draw each bar
        this.data.forEach((item, index) => {
            // Calculate position
            const x = padding + barSpacing * (index + 0.5) - barWidth / 2;
            const barHeightFull = (item.value / maxValue) * chartHeight;
            
            // Apply animation: bars grow from bottom to top
            const barHeightAnimated = barHeightFull * this.animationProgress;
            
            const y = padding + chartHeight - barHeightAnimated;

            // Draw gradient fill for bar
            const gradient = this.ctx.createLinearGradient(x, y, x, y + barHeightAnimated);
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.6)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, y, barWidth, barHeightAnimated);
            
            // Draw bar border
            this.ctx.strokeStyle = '#3b82f6';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, barWidth, barHeightAnimated);
            
            // Draw label below bar
            this.ctx.fillStyle = '#cbd5e1';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(item.label, x + barWidth / 2, padding + chartHeight + 20);
            
            // Draw value on top of bar (only if animated enough)
            if (this.animationProgress > 0.5) {
                this.ctx.fillStyle = '#f8fafc';
                this.ctx.font = '11px Arial';
                this.ctx.fillText(item.value, x + barWidth / 2, y - 5);
            }
        });

        // Draw X-axis line
        this.ctx.strokeStyle = '#475569';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding + chartHeight);
        this.ctx.lineTo(width - padding, padding + chartHeight);
        this.ctx.stroke();

        // Draw Y-axis line
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, padding + chartHeight);
        this.ctx.stroke();
    }
}

/* =========================================
   9. INTERSECTION OBSERVER (Scroll Animations)
   Detects when elements enter viewport and triggers animations
   ========================================= */
class ScrollObserver {
    constructor() {
        // Configuration for IntersectionObserver
        this.options = {
            // Trigger when element is 10% visible in viewport
            threshold: 0.1,
            // Trigger animation 50px before element enters viewport
            rootMargin: '50px'
        };

        // Create observer with callback
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.options
        );
    }

    /**
     * Initialize observer by watching all demo-card elements
     * These will fade in as user scrolls down the page
     */
    init() {
        // Add scroll-fade-in class to all section cards
        const cards = document.querySelectorAll('.demo-card');
        cards.forEach(card => {
            // Add scroll animation class
            card.classList.add('scroll-fade-in');
            
            // Start observing this card
            this.observer.observe(card);
        });
        
        console.log('✓ Scroll animations activated for', cards.length, 'cards');
    }

    /**
     * Handle intersection events
     * Fired when observed element enters/leaves viewport
     * @param {IntersectionObserverEntry[]} entries - Array of observed elements
     */
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is visible in viewport
                // Add 'visible' class to trigger CSS animation
                entry.target.classList.add('visible');
                
                // Optional: Stop observing after animation (performance optimization)
                // this.observer.unobserve(entry.target);
            }
        });
    }

    /**
     * Cleanup method (not used here, but good practice)
     */
    destroy() {
        this.observer.disconnect();
    }
}

/* =========================================
   APP CONTROLLER - INITIALIZE ALL SYSTEMS
   ========================================= */