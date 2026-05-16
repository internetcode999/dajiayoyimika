const navLinks = document.querySelectorAll('.bottom-nav a');
const sections = document.querySelectorAll('section, .hero-section');
const themeToggle = document.getElementById('themeToggle');
const themeKey = 'portfolio-theme';

const setActiveLink = (id) => {
    navLinks.forEach((link) => {
        const target = link.getAttribute('href');
        link.classList.toggle('active', target === `#${id}`);
    });
};

const observerOptions = {
    root: null,
    rootMargin: '-30% 0% -40% 0%',
    threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.target.id) return;
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            setActiveLink(entry.target.id);
        }
    });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const anchor = event.currentTarget.getAttribute('href');
        const target = document.querySelector(anchor);
        if (!target) return;

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        setActiveLink(anchor.replace('#', ''));
    });
});

const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    if (themeToggle) {
        themeToggle.classList.toggle('active', isDark);
        themeToggle.setAttribute('aria-pressed', isDark);
    }
    localStorage.setItem(themeKey, theme);
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme === 'dark' || savedTheme === 'light') {
        applyTheme(savedTheme);
        return;
    }

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(systemPrefersDark ? 'dark' : 'light');
};

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}

loadTheme();