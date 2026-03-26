/* =============================================
   ROHAN KUMAR RAJU — PORTFOLIO SCRIPTS
   Handles: Navbar scroll, mobile menu,
            fade-in animations on scroll
   ============================================= */

// -------- NAVBAR: Add shadow on scroll --------
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// -------- MOBILE HAMBURGER MENU --------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger bars
  hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// -------- SMOOTH SCROLL (fallback for older browsers) --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// -------- INTERSECTION OBSERVER: Fade-in on scroll --------
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Un-observe after first appearance for performance
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,     // Trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'
  }
);

fadeEls.forEach(el => observer.observe(el));

// -------- ACTIVE NAV LINK highlight on scroll --------
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100; // offset for navbar

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--red-2)';
        link.style.fontWeight = '900';
      } else {
        link.style.color = '';
        link.style.fontWeight = '700';
      }
    }
  });
});

// -------- HAMBURGER BAR ANIMATION --------
// Additional CSS for the active state (applied via JS class)
const style = document.createElement('style');
style.textContent = `
  .hamburger.active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger.active span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .hamburger.active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
`;
document.head.appendChild(style);

// -------- PAGE LOAD: Trigger home section fade-ins immediately --------
window.addEventListener('DOMContentLoaded', () => {
  // Trigger visible for any fade-in elements already in viewport
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add('visible');
    }
  });
});
