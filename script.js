// Accordion functionality
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                content.classList.toggle('active');
                
                const icon = header.querySelector('i');
                if (content.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });
        
        // Plan toggle functionality
        const planToggleButtons = document.querySelectorAll('.bg-gray-900 button');
        planToggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                planToggleButtons.forEach(btn => btn.classList.remove('bg-neon-green', 'text-black'));
                button.classList.add('bg-neon-green', 'text-black');
                
                // Here you would update pricing based on monthly/yearly selection
            });
        });
        
        // Enhanced cursor effect for neon elements
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor-glow') || createCursor();
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        function createCursor() {
            const cursor = document.createElement('div');
            cursor.className = 'cursor-glow';
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(57, 255, 20, 0.3), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: screen;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(cursor);
            return cursor;
        }
        
        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.floating-element');
            const speed = 0.5;
            
            parallax.forEach(element => {
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
        
        // Stats counter animation
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.stats-counter').forEach(counter => {
            observer.observe(counter);
        });
        
        function animateCounter(element) {
            const text = element.textContent;
            
            // Special handling for "24/7" - don't animate this text
            if (text.includes('/')) {
                return;
            }
            
            const number = parseInt(text.replace(/[^\d]/g, ''));
            const suffix = text.replace(/[\d]/g, '');
            
            if (number && !element.hasAttribute('data-animated')) {
                element.setAttribute('data-animated', 'true');
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        element.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }
        }
        
        // Add hover sound effect (optional)
        const addHoverSound = () => {
            const hoverElements = document.querySelectorAll('.neon-button, .feature-card, .plan-card');
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    // Create a subtle hover feedback
                    element.style.filter = 'brightness(1.1)';
                });
                element.addEventListener('mouseleave', () => {
                    element.style.filter = 'brightness(1)';
                });
            });
        };
        
        // Initialize hover effects
        document.addEventListener('DOMContentLoaded', () => {
            addHoverSound();
            
            // Add tilt effect to cards
            const cards = document.querySelectorAll('.feature-card, .plan-card, .testimonial-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                });
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // VPS Plan Tab Switching
        const goldTab = document.getElementById('vps-gold-tab');
        const platinumTab = document.getElementById('vps-platinum-tab');
        const goldPlans = document.getElementById('vps-gold-plans');
        const platinumPlans = document.getElementById('vps-platinum-plans');

        function switchToGoldTab() {
            // Update tab buttons
            goldTab.classList.add('bg-neon-green', 'text-black');
            goldTab.classList.remove('text-white');
            platinumTab.classList.remove('bg-neon-green', 'text-black');
            platinumTab.classList.add('text-white');
            
            // Show/hide plan containers
            goldPlans.classList.remove('hidden');
            platinumPlans.classList.add('hidden');
        }

        function switchToPlatinumTab() {
            // Update tab buttons
            platinumTab.classList.add('bg-neon-green', 'text-black');
            platinumTab.classList.remove('text-white');
            goldTab.classList.remove('bg-neon-green', 'text-black');
            goldTab.classList.add('text-white');
            
            // Show/hide plan containers
            platinumPlans.classList.remove('hidden');
            goldPlans.classList.add('hidden');
        }

        // Add event listeners
        goldTab.addEventListener('click', switchToGoldTab);
        platinumTab.addEventListener('click', switchToPlatinumTab);
