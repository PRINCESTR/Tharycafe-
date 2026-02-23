import Lenis from '@studio-freight/lenis';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. Intersection Observer for fade-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: Run once
            }
        });
    }, observerOptions);

    // Initial check for newly added elements
    function initializeAnimations() {
        const animatedElements = document.querySelectorAll('.fade-up-element');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Call init after a small delay to ensure DOM is ready
    setTimeout(initializeAnimations, 100);

    // 3. Mobile Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const navTexts = document.querySelectorAll('.nav-text');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // Open Menu
            lenis.stop(); // Prevent scrolling back
            document.body.classList.add('menu-opened');
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');

            // Hamburger to X animation
            if (line1 && line2) {
                line1.classList.remove('w-8');
                line1.classList.add('w-10', 'rotate-45', 'translate-y-[5px]');
                line2.classList.remove('w-6');
                line2.classList.add('w-10', '-rotate-45', '-translate-y-[5px]');
            }

            // Text stagger animation
            navTexts.forEach(el => el.classList.remove('translate-y-full'));
        } else {
            // Close Menu
            lenis.start();
            document.body.classList.remove('menu-opened');
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');

            // X to Hamburger animation
            if (line1 && line2) {
                line1.classList.remove('w-10', 'rotate-45', 'translate-y-[5px]');
                line1.classList.add('w-8');
                line2.classList.remove('w-10', '-rotate-45', '-translate-y-[5px]');
                line2.classList.add('w-6');
            }

            // Reset text stagger
            navTexts.forEach(el => el.classList.add('translate-y-full'));
        }
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // 4. Subtle Parallax and Navbar Scroll Effect
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    const navbar = document.getElementById('navbar');

    lenis.on('scroll', (e) => {
        parallaxBgs.forEach(bg => {
            const speed = bg.dataset.speed || 0.2;
            const yPos = e.scroll * speed;
            bg.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.1)`;
        });

        // Navbar Styling
        if (navbar && !isMenuOpen) {
            if (e.scroll > 50) {
                navbar.classList.remove('text-cream');
                navbar.classList.add('bg-cream/95', 'backdrop-blur-md', 'text-charcoal', 'shadow-sm');
            } else {
                navbar.classList.add('text-cream');
                navbar.classList.remove('bg-cream/95', 'backdrop-blur-md', 'text-charcoal', 'shadow-sm');
            }
        }
    });
});

