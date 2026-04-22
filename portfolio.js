/* ─────────────────────────────────────────
   portfolio.js — TheGeekedNerd Portfolio
   ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // ── 0. ENTRY FADE-IN (seamless from crawl's fade-to-black) ─────
  const entryFade = document.getElementById('entry-fade');
  if (entryFade) {
    // Start fully black, then fade out to reveal the page
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        entryFade.style.opacity = '0';
      });
    });
  }

  // ── 0b. DEEP-SPACE STARFIELD CANVAS (matches intro.html feel) ──
  const canvas = document.getElementById('portfolio-stars');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const STAR_COUNT = 260;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:       Math.random(),
      y:       Math.random(),
      r:       Math.random() * 1.4 + 0.2,
      base:    Math.random() * 0.55 + 0.05,
      phase:   Math.random() * Math.PI * 2,
      speed:   0.0004 + Math.random() * 0.0008,
    }));

    function drawStars(ts) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const opacity = s.base + Math.sin(ts * s.speed + s.phase) * (s.base * 0.5);
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
        ctx.fill();
      });
      requestAnimationFrame(drawStars);
    }
    requestAnimationFrame(drawStars);
  }

  // ── 1. GENERATE STAR FIELD ──────────────────────────────────────
  const starsContainer = document.querySelector('.stars');
  if (starsContainer) {
    const count = 80;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.style.setProperty('--dur',    (3 + Math.random() * 5).toFixed(1) + 's');
      star.style.setProperty('--delay',  (Math.random() * 6).toFixed(1) + 's');
      star.style.setProperty('--bright', (0.2 + Math.random() * 0.5).toFixed(2));
      star.style.left   = Math.random() * 100 + '%';
      star.style.top    = Math.random() * 100 + '%';
      starsContainer.appendChild(star);
    }
  }

  // ── 2. ACTIVE NAV LINK ON SCROLL ───────────────────────────────
  const navLinks = document.querySelectorAll('nav ul a');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const matches = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', matches);
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── 3. FADE-IN SECTIONS ON SCROLL ──────────────────────────────
  const fadeTargets = document.querySelectorAll(
    '.exp-item, .project-card, .skill-item, .fact-box, .contact-card'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.style.transition = `opacity 0.5s ${i * 0.04}s ease, transform 0.5s ${i * 0.04}s ease`;
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
      fadeObserver.unobserve(el);
    });
  }, { threshold: 0.12 });

  fadeTargets.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(14px)';
    fadeObserver.observe(el);
  });

  // ── 4. SMOOTH NAV SCROLL ───────────────────────────────────────
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const offset = 56; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── 5. CURRENT YEAR IN FOOTER ─────────────────────────────────
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});