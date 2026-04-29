// ============================================
// KINDLE SERENITY — main.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ======= NAV SCROLL EFFECT =======
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.padding = '0.8rem 5%';
      nav.style.boxShadow = '0 2px 20px rgba(123,59,42,0.08)';
    } else {
      nav.style.padding = '1.2rem 5%';
      nav.style.boxShadow = 'none';
    }
  });

  // ======= HAMBURGER MENU =======
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  const overlay = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.close-menu');

  const openMenu = () => {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav-mobile-menu a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // ======= SCROLL ANIMATIONS =======
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ======= SMOOTH SCROLL =======
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ======= CONTACT FORM =======
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      // Roobens: replace REPLACE_WITH_YOUR_ID with your Formspree form ID
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_ID', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#5C8A4A';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  });

  // ======= TAGLINE DUPLICATION FOR SEAMLESS SCROLL =======
  const scrollTrack = document.querySelector('.tagline-scroll');
  if (scrollTrack) {
    scrollTrack.innerHTML += scrollTrack.innerHTML;
  }

});
