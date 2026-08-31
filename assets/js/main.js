// Theme toggle.
// The <head> script has already applied any saved choice; this only handles
// clicks and keeps the button's label in sync.
(function () {
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    function currentTheme() {
        var explicit = root.getAttribute('data-theme');
        if (explicit === 'dark' || explicit === 'light') return explicit;
        return systemDark && systemDark.matches ? 'dark' : 'light';
    }

    function syncLabel() {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        var label = 'Switch to ' + next + ' mode';
        toggle.setAttribute('aria-label', label);
        toggle.setAttribute('title', label);
    }

    toggle.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) { /* storage blocked - the choice just won't persist */ }
        syncLabel();
    });

    // Follow the OS while the visitor has not made an explicit choice.
    if (systemDark && systemDark.addEventListener) {
        systemDark.addEventListener('change', function () {
            if (!root.getAttribute('data-theme')) syncLabel();
        });
    }

    syncLabel();
})();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close the menu when a link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);
revealOnScroll();

// Smooth scroll for in-page navigation, offset for the fixed nav bar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id);
    });
});
