// Main Application Entry Point

// Track current section
window.currentSection = 'hero';

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cPortfolio System Initialized', 'color: #4ade80; font-weight: bold; font-size: 14px;');
    console.log('%cType commands in the terminal or explore the UI', 'color: #94a3b8; font-size: 12px;');

    // Add fade-in animations to sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add keyboard shortcut for terminal (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const terminalOverlay = document.getElementById('terminal-overlay');
            if (terminalOverlay) {
                terminalOverlay.classList.toggle('minimized');
                if (!terminalOverlay.classList.contains('minimized')) {
                    document.getElementById('terminal-input')?.focus();
                }
            }
        }
    });

    // Handle resume download buttons
    const resumeButtons = ['download-resume', 'oneko-resume-btn'];
    resumeButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                window.open(portfolioData.contact.resume, '_blank');
            });
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    let isManualScrolling = false;

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');

            // Optional: Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinksContainer.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinksContainer.classList.remove('active');
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // Smooth scroll on click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEntry = document.querySelector(targetId);

            if (targetEntry) {
                isManualScrolling = true;

                // Update active state immediately
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                targetEntry.scrollIntoView({ behavior: 'smooth' });

                // Reset flag after scroll finishes (approximate)
                setTimeout(() => {
                    isManualScrolling = false;
                }, 1000); // 1s is usually enough for smooth scroll
            }
        });
    });

    // Scroll-Spy logic using Intersection Observer
    const navObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        if (isManualScrolling) return; // Skip updates during manual scroll

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Unified Typewriter Implementation
    class TypeWriter {
        constructor(element, roles) {
            this.element = element;
            this.roles = roles;
            this.roleIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.type();
        }

        type() {
            const currentRole = this.roles[this.roleIndex];
            let typeSpeed = 100;

            if (this.isDeleting) {
                this.charIndex--;
                typeSpeed = 50;
            } else {
                this.charIndex++;
                typeSpeed = 100;
            }

            // Boundary checks
            if (this.charIndex > currentRole.length) this.charIndex = currentRole.length;
            if (this.charIndex < 0) this.charIndex = 0;

            // Apply text
            this.element.textContent = currentRole.substring(0, this.charIndex);

            // Logic for switching states
            if (!this.isDeleting && this.charIndex === currentRole.length) {
                // Finished typing
                this.isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (this.isDeleting && this.charIndex === 0) {
                // Finished deleting
                this.isDeleting = false;
                this.roleIndex = (this.roleIndex + 1) % this.roles.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    const roleElement = document.querySelector('.terminal-role');
    if (roleElement) {
        new TypeWriter(roleElement, ["Backend Developer", "Designer", "Data Analyst"]);
    }

    // Mobile art gallery expand/collapse
    const expandArtBtn = document.querySelector('.mobile-expand-art');
    const artGallery = document.querySelector('.art-gallery-grid');

    if (expandArtBtn && artGallery) {
        // Show button on mobile
        if (window.innerWidth <= 768) {
            expandArtBtn.style.display = 'block';
        }

        expandArtBtn.addEventListener('click', () => {
            artGallery.classList.toggle('expanded');
            expandArtBtn.classList.toggle('expanded');

            if (expandArtBtn.classList.contains('expanded')) {
                expandArtBtn.textContent = 'Collapse Vault';
            } else {
                expandArtBtn.textContent = 'Expand Vault';
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                expandArtBtn.style.display = 'block';
            } else {
                expandArtBtn.style.display = 'none';
                artGallery.classList.remove('expanded');
            }
        });
    }
});

// Expose API for terminal commands
window.portfolioAPI = {
    getData: () => portfolioData,
    navigateToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.currentSection = sectionId;
            return true;
        }
        return false;
    },
    getCurrentSection: () => window.currentSection
};
