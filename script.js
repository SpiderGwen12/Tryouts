/**
 * Farmspherica - Client JavaScript Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Navigation
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('toggle-active');
            navMenu.classList.toggle('nav-active');
            // Toggle scroll lock on body
            document.body.style.overflow = navMenu.classList.contains('nav-active') ? 'hidden' : 'initial';
        });
        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('toggle-active');
                navMenu.classList.remove('nav-active');
                document.body.style.overflow = 'initial';
            });
        });
    }
    // 2. Header Scroll Visual Behavior
    const header = document.querySelector('.header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.height = '4.375';
            if (window.innerWidth > 768) {
                document.querySelector('.header-container').style.height = '4.375';
            }
        } else {
            header.style.boxShadow = 'none';
            header.style.height = '5';
            if (window.innerWidth > 768) {
                document.querySelector('.header-container').style.height = '5';
            }
        }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    // 3. Scroll Reveal Animations (Intersection Observer)
    const animSections = document.querySelectorAll('section');

    // Add default animation classes to sections
    animSections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve after showing to avoid repeat triggers
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: '0px 0px -3.125rem 0px' // Adjust trigger offset
    });
    animSections.forEach(section => {
        revealObserver.observe(section);
    });
    // 4. Smooth Anchor Scrolling Offset Adjustment
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            // Glow effect when clicking a step
            document.querySelectorAll('.step').forEach(step => {
                step.addEventListener('click', () => {
                    step.style.boxShadow = '0 0 1.25rem #00c853';
                    setTimeout(() => {
                        step.style.boxShadow = '0 0.375rem 0.75rem rgba(0,0,0,0.15)';
                    }, 500);
                });
            });
            document.addEventListener('DOMContentLoaded', () => {
                // Existing code...

                document.addEventListener('DOMContentLoaded', () => {
                    // Existing code...

                    // Tap-to-flip for mobile + button
                    const flipCards = document.querySelectorAll('.visual-card');

                    flipCards.forEach(card => {
                        const inner = card.querySelector('.flip-card-inner');
                        const btn = card.querySelector('.flip-btn');

                        // Tap anywhere on card
                        card.addEventListener('click', () => {
                            inner.classList.toggle('flipped');
                        });

                        // Tap button explicitly
                        if (btn) {
                            btn.addEventListener('click', (e) => {
                                e.stopPropagation(); // prevent double toggle
                                inner.classList.toggle('flipped');
                            });
                        }
                    });
                });

            });

        });
    });
});