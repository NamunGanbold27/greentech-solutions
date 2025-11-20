/*
  Author: Namun Ganbold
  Date: 10/20/2025
  Description: Basic interactivity for GreenTech Solutions:
    - makes the navigation sticky
    - highlights the active link
    - toggles the intro paragraph
    - shows product details
    - updates the footer year
    - validates the newsletter email form
*/

document.addEventListener('DOMContentLoaded', function () {
    // Sticky nav
    const nav = document.getElementById('mainNav');
    const stickyScrollPx = 120;
    let spacer = null;

    function handleSticky() {
        if (window.scrollY > stickyScrollPx) {
            if (!nav.classList.contains('sticky')) {
                nav.classList.add('sticky');
                spacer = document.createElement('div');
                spacer.className = 'nav-spacer';
                nav.parentNode.insertBefore(spacer, nav.nextSibling);
            }
        } else {
            nav.classList.remove('sticky');
            if (spacer && spacer.parentNode) {
                spacer.parentNode.removeChild(spacer);
                spacer = null;
            }
        }
    }
    window.addEventListener('scroll', handleSticky);
    handleSticky();

    // Active nav link by scroll
    const links = document.querySelectorAll('.nav-link');
    const sectionIds = ['home', 'about', 'products', 'services', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id));

    function setActiveLinkByScroll() {
        let current = 'home';
        const offset = 140;

        sections.forEach(sec => {
            const r = sec.getBoundingClientRect();
            if (r.top <= offset && r.bottom > offset) current = sec.id;
        });

        links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }
    window.addEventListener('scroll', setActiveLinkByScroll);
    setActiveLinkByScroll();

    // Keyboard focus mirrors active class
    links.forEach(a => {
        a.addEventListener('focus', () => {
            links.forEach(x => x.classList.remove('active'));
            a.classList.add('active');
        });
        a.addEventListener('blur', setActiveLinkByScroll);
    });

    // Toggle Intro
    const introPara = document.getElementById('introPara');
    const toggleBtn = document.getElementById('toggleIntroBtn');
    if (toggleBtn && introPara) {
        toggleBtn.addEventListener('click', function () {
            const hidden = introPara.classList.toggle('hidden');
            toggleBtn.textContent = hidden ? 'Show Intro' : 'Hide Intro';
        });
    }

    // Product "Learn More" toggles
    document.querySelectorAll('.learn-more').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = btn.closest('.product-card');
            const more = card ? card.querySelector('.more') : null;
            if (more) {
                const hidden = more.classList.toggle('hidden');
                btn.textContent = hidden ? 'Learn More' : 'Hide Details';
            } else {
                alert('More details coming soon!');
            }
        });
    });

    // Dynamic year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Newsletter validation
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const message = document.getElementById('newsletterMsg');

    if (form && emailInput && message) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!valid) {
                message.textContent = 'Please enter a valid email address.';
                message.style.color = 'crimson';
                emailInput.focus();
            } else {
                message.textContent = 'Thanks! You are subscribed.';
                message.style.color = 'green';
                form.reset();
            }
        });
    }
});
